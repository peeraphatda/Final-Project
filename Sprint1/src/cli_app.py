"""
Module: cli_app.py
Role: Debugger (ภีม) & Coder 2 (ปลั๊ก)
Description: CLI Loop + Input Validation หน้างาน + โหมด Batch (CSV)
"""
import csv


class CLIApp:
    def __init__(self, emotion_client, palette_engine, visualizer):
        self.client = emotion_client
        self.engine = palette_engine
        self.viz = visualizer

    def analyze(self, text: str) -> dict:
        """วิเคราะห์ข้อความ 1 ชิ้น -> dict ผลลัพธ์"""
        res = self.client.get_emotion(text)
        pal = self.engine.get_palette(res['label'])
        return {"text": text, "label": res['label'], "score": res['score'],
                "palette": pal, "fallback": res.get('fallback', False)}

    def run(self):
        print("==================================================")
        print("  Smart Art & Palette Sentiment Analyzer (CLI)")
        print("==================================================")

        while True:
            try:
                user_input = input("\nกรอกข้อความภาษาอังกฤษ (หรือพิมพ์ 'quit' เพื่อออก): ").strip()

                # 🐛 Debugger Fix: Input Validation
                if not user_input:
                    print("⚠️ คำเตือน: ข้อความต้องไม่เป็นค่าว่าง!")
                    continue

                if user_input.lower() in ['quit', 'exit']:
                    print("ขอบคุณที่ใช้งานระบบ! ปิดการทำงานเรียบร้อยครับ")
                    break

                r = self.analyze(user_input)
                print(f"\nผลการวิเคราะห์: {r['label'].upper()} (Confidence: {r['score']*100:.2f}%)")
                if r['fallback']:
                    print("ℹ️ ผลนี้มาจากโหมด Fallback (ไม่ได้ใช้โมเดลจริง)")
                print(f"จานสีที่แนะนำ: {r['palette']}")
                self.viz.plot_palette(r['label'], r['palette'], r['score'])

            except KeyboardInterrupt:
                print("\n\nยกเลิกการทำงานอย่างสุภาพเรียบร้อยครับ")
                break
            except Exception as e:
                print(f"❌ เกิดข้อผิดพลาดที่ไม่คาดคิด: {e}")

    def run_batch(self, filepath: str, output_path: str = None) -> list:
        """ประมวลผลไฟล์ CSV (ต้องมีคอลัมน์ 'text') ทีละแถว"""
        results = []
        with open(filepath, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            if not reader.fieldnames or 'text' not in reader.fieldnames:
                raise ValueError("CSV ต้องมีคอลัมน์ชื่อ 'text'")
            for row in reader:
                text = (row.get('text') or "").strip()
                if not text:
                    continue  # ข้ามแถวว่าง
                r = self.analyze(text)
                print(f"[{r['label'].upper():8}] {r['score']*100:6.2f}%  {text}")
                results.append(r)

        if output_path:
            with open(output_path, "w", newline="", encoding="utf-8") as f:
                w = csv.writer(f)
                w.writerow(["text", "emotion", "score", "palette"])
                for r in results:
                    w.writerow([r['text'], r['label'], r['score'], ", ".join(r['palette'])])
            print(f"\n💾 บันทึกผลลัพธ์ที่ {output_path}")
        return results
