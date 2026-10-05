"""
Module: report_generator.py
Description: Export จานสี (.json, .css) และประมวลผล Batch CSV
"""
import csv
import json
import os


class ReportGenerator:
    @staticmethod
    def export_to_css(palette: list, filename: str = "palette.css", emotion: str = None) -> str:
        lines = []
        if emotion:
            lines.append(f"/* Emotion: {emotion} */")
        lines.append(":root {")
        for i, color in enumerate(palette):
            lines.append(f"  --color-{i + 1}: {color};")
        lines.append("}")
        ReportGenerator._write(filename, "\n".join(lines) + "\n")
        return filename

    @staticmethod
    def export_to_json(emotion: str, palette: list, filename: str = "palette.json",
                       score: float = None) -> str:
        data = {"emotion": emotion, "colors": palette}
        if score is not None:
            data["confidence"] = score
        ReportGenerator._write(filename, json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        return filename

    @staticmethod
    def process_batch_csv(filepath: str, emotion_client, palette_engine) -> list:
        """อ่าน CSV (คอลัมน์ 'text') -> list ของ dict; ข้ามแถวว่าง และไม่หยุดเมื่อบางแถวพัง"""
        results = []
        with open(filepath, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            if not reader.fieldnames or "text" not in reader.fieldnames:
                raise ValueError("CSV ต้องมีคอลัมน์ชื่อ 'text'")
            for row in reader:
                text = (row.get("text") or "").strip()
                if not text:
                    continue
                try:
                    res = emotion_client.get_emotion(text)
                except Exception as e:
                    print(f"⚠️ ข้ามแถว '{text[:30]}': {e}")
                    continue
                results.append({
                    "text": text,
                    "label": res["label"],
                    "score": res["score"],
                    "palette": palette_engine.get_palette(res["label"]),
                    "fallback": res.get("fallback", False),
                })
        return results

    @staticmethod
    def write_batch_csv(results: list, filename: str) -> str:
        folder = os.path.dirname(filename)
        if folder:
            os.makedirs(folder, exist_ok=True)
        with open(filename, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["text", "emotion", "score", "palette"])
            for r in results:
                w.writerow([r["text"], r["label"], r["score"], ", ".join(r["palette"])])
        return filename

    @staticmethod
    def _write(filename: str, content: str):
        folder = os.path.dirname(filename)
        if folder:
            os.makedirs(folder, exist_ok=True)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
