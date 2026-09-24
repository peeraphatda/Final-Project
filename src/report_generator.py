"""
Module: report_generator.py
Role: Coder 2 (ปลั๊ก)
Description: ส่งออกจานสีเป็นไฟล์ (.json, .css) และรองรับ Batch File Processing
"""
import json
import pandas as pd

class ReportGenerator:
    @staticmethod
    def export_to_css(palette: list, filename: str = "palette.css"):
        css_content = ":root {\n"
        for i, color in enumerate(palette):
            css_content += f"  --color-{i+1}: {color};\n"
        css_content += "}\n"
        
        with open(filename, "w") as f:
            f.write(css_content)
        return filename

    @staticmethod
    def export_to_json(emotion: str, palette: list, filename: str = "palette.json"):
        data = {"emotion": emotion, "colors": palette}
        with open(filename, "w") as f:
            json.dump(data, f, indent=2)
        return filename

    @staticmethod
    def process_batch_csv(filepath: str, emotion_client, palette_engine) -> pd.DataFrame:
        df = pd.read_csv(filepath)
        results = []
        for text in df['text']:
            res = emotion_client.get_emotion(text)
            pal = palette_engine.get_palette(res['label'])
            results.append({
                "text": text,
                "emotion": res['label'],
                "score": res['score'],
                "palette": ", ".join(pal)
            })
        return pd.DataFrame(results)