import sqlite3
import json
from datetime import datetime

class DataStore:
    def __init__(self, db_path="data/palette_history.db"):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        """สร้างตารางเก็บบันทึกประวัติหากยังไม่มี"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS palette_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    input_text TEXT NOT NULL,
                    predicted_emotion TEXT NOT NULL,
                    confidence_score REAL NOT NULL,
                    hex_colors TEXT NOT NULL, -- เก็บเป็น JSON List เช่น ["#1A1A2E", "#16213E", ...]
                    palette_size INTEGER DEFAULT 8,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()

    def save_palette(self, input_text: str, emotion: str, confidence: float, hex_colors: list):
        """บันทึกประวัติจานสีใหม่ลง Database"""
        colors_json = json.dumps(hex_colors)
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO palette_history (input_text, predicted_emotion, confidence_score, hex_colors, palette_size)
                VALUES (?, ?, ?, ?, ?)
            """, (input_text, emotion, confidence, colors_json, len(hex_colors)))
            conn.commit()

    def get_history(self, limit=10):
        """ดึงประวัติย้อนหลังมาแสดงผล"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, input_text, predicted_emotion, confidence_score, hex_colors, created_at
                FROM palette_history
                ORDER BY created_at DESC
                LIMIT ?
            """, (limit,))
            rows = cursor.fetchall()
            
            history = []
            for row in rows:
                history.append({
                    "id": row[0],
                    "input_text": row[1],
                    "emotion": row[2],
                    "confidence": row[3],
                    "hex_colors": json.loads(row[4]), # แปลง JSON String กลับเป็น List
                    "created_at": row[5]
                })
            return history