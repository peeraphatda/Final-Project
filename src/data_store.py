"""
Module: data_store.py
Role: Debugger (ภีม) & Planner (กาย)
Description: ระบบบันทึกประวัติย้อนหลังด้วย SQLite และรองรับ Cloud Migration
"""
import sqlite3
import json
from datetime import datetime

class DataStore:
    def __init__(self, db_path: str = "data/palette_history.db"):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    text TEXT NOT NULL,
                    emotion TEXT NOT NULL,
                    score REAL NOT NULL,
                    palette TEXT NOT NULL,
                    timestamp TEXT NOT NULL
                )
            """)
            conn.commit()

    def save_analysis(self, text: str, emotion: str, score: float, palette: list):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO history (text, emotion, score, palette, timestamp)
                VALUES (?, ?, ?, ?, ?)
            """, (text, emotion, score, json.dumps(palette), datetime.now().isoformat()))
            conn.commit()

    def get_history(self, limit: int = 5) -> list:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT text, emotion, score, palette, timestamp FROM history ORDER BY id DESC LIMIT ?", (limit,))
            rows = cursor.fetchall()
            return [
                {"text": r[0], "emotion": r[1], "score": r[2], "palette": json.loads(r[3]), "timestamp": r[4]}
                for r in rows
            ]