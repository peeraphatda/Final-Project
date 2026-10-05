"""
Module: data_store.py
Description: SQLite Persistence (data/palette_history.db) + Cloud Sync
"""
import json
import os
import sqlite3
import urllib.request
from contextlib import closing, contextmanager


class HttpUploader:
    """ตัวส่งข้อมูลขึ้น Cloud ผ่าน HTTP POST (JSON)  — endpoint กำหนดผ่าน CLOUD_SYNC_URL"""

    def __init__(self, url: str, timeout: float = 10.0):
        self.url = url
        self.timeout = timeout

    def __call__(self, records: list) -> bool:
        req = urllib.request.Request(
            self.url,
            data=json.dumps({"records": records}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=self.timeout) as resp:
            return 200 <= resp.status < 300


class DataStore:
    def __init__(self, db_path: str = "data/palette_history.db"):
        self.db_path = db_path
        folder = os.path.dirname(db_path)
        if folder:
            os.makedirs(folder, exist_ok=True)
        self._init_db()

    @contextmanager
    def _connect(self):
        with closing(sqlite3.connect(self.db_path)) as conn:
            with conn:  # commit / rollback อัตโนมัติ
                yield conn

    def _init_db(self):
        """สร้างตารางหากยังไม่มี + migrate คอลัมน์ synced ให้ DB เก่าจาก Sprint 1"""
        with self._connect() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS palette_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    input_text TEXT NOT NULL,
                    predicted_emotion TEXT NOT NULL,
                    confidence_score REAL NOT NULL,
                    hex_colors TEXT NOT NULL,   -- JSON list เช่น ["#1A1A2E", ...]
                    palette_size INTEGER DEFAULT 8,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    synced INTEGER NOT NULL DEFAULT 0
                )
            """)
            cols = [r[1] for r in conn.execute("PRAGMA table_info(palette_history)")]
            if "synced" not in cols:
                conn.execute("ALTER TABLE palette_history ADD COLUMN synced INTEGER NOT NULL DEFAULT 0")

    # ---------------- Create ----------------
    def save_palette(self, input_text: str, emotion: str, confidence: float, hex_colors: list) -> int:
        """บันทึกจานสีใหม่ ส่งคืน id ของแถวที่เพิ่ม"""
        if not input_text or not input_text.strip():
            raise ValueError("input_text must not be empty")
        if not hex_colors:
            raise ValueError("hex_colors must not be empty")
        with self._connect() as conn:
            cur = conn.execute("""
                INSERT INTO palette_history
                    (input_text, predicted_emotion, confidence_score, hex_colors, palette_size)
                VALUES (?, ?, ?, ?, ?)
            """, (input_text, emotion, confidence, json.dumps(hex_colors), len(hex_colors)))
            return cur.lastrowid

    # ---------------- Read ----------------
    @staticmethod
    def _row_to_dict(row) -> dict:
        return {
            "id": row[0],
            "input_text": row[1],
            "emotion": row[2],
            "confidence": row[3],
            "hex_colors": json.loads(row[4]),
            "created_at": row[5],
            "synced": bool(row[6]),
        }

    _COLS = "id, input_text, predicted_emotion, confidence_score, hex_colors, created_at, synced"

    def get_history(self, limit: int = 10) -> list:
        """ประวัติล่าสุดก่อน (เรียงตาม id เพื่อไม่ให้สลับลำดับเมื่อบันทึกในวินาทีเดียวกัน)"""
        with self._connect() as conn:
            rows = conn.execute(
                f"SELECT {self._COLS} FROM palette_history ORDER BY id DESC LIMIT ?", (limit,)
            ).fetchall()
        return [self._row_to_dict(r) for r in rows]

    # ---------------- Cloud Sync ----------------
    def get_unsynced(self, limit: int = None) -> list:
        sql = f"SELECT {self._COLS} FROM palette_history WHERE synced = 0 ORDER BY id ASC"
        params = ()
        if limit:
            sql += " LIMIT ?"
            params = (limit,)
        with self._connect() as conn:
            return [self._row_to_dict(r) for r in conn.execute(sql, params).fetchall()]

    def mark_synced(self, ids: list):
        if not ids:
            return
        marks = ",".join("?" * len(ids))
        with self._connect() as conn:
            conn.execute(f"UPDATE palette_history SET synced = 1 WHERE id IN ({marks})", list(ids))

    def sync_to_cloud(self, uploader=None, batch_size: int = 50) -> dict:
        """
        ส่งข้อมูลที่ยังไม่ sync ขึ้น Cloud ทีละ batch
        - uploader: callable(records) -> bool  (ไม่ระบุ = อ่าน URL จากตัวแปรสภาพแวดล้อม CLOUD_SYNC_URL)
        - Defensive: ถ้าส่งไม่สำเร็จ ข้อมูลยังอยู่ใน SQLite และจะถูกส่งใหม่ในรอบถัดไป โปรแกรมไม่พัง
        """
        if uploader is None:
            url = os.environ.get("CLOUD_SYNC_URL")
            if not url:
                return {"ok": False, "attempted": 0, "synced": 0,
                        "message": "ยังไม่ได้ตั้งค่า CLOUD_SYNC_URL — ข้ามการ Sync"}
            uploader = HttpUploader(url)

        attempted = synced = 0
        while True:
            batch = self.get_unsynced(limit=batch_size)
            if not batch:
                break
            attempted += len(batch)
            try:
                ok = uploader(batch)
            except Exception as e:
                return {"ok": False, "attempted": attempted, "synced": synced,
                        "message": f"Sync ล้มเหลว: {e}"}
            if not ok:
                return {"ok": False, "attempted": attempted, "synced": synced,
                        "message": "Cloud ตอบกลับไม่สำเร็จ"}
            self.mark_synced([r["id"] for r in batch])
            synced += len(batch)

        return {"ok": True, "attempted": attempted, "synced": synced,
                "message": f"Sync สำเร็จ {synced} รายการ" if synced else "ไม่มีข้อมูลค้าง Sync"}
