"""
Module: cli_app.py
Role: Debugger (ภีม) & Coder 2 (ปลั๊ก)
Description: CLI Loop + Input Validation หน้างาน
"""
class CLIApp:
    def __init__(self, emotion_client, palette_engine, visualizer, data_store):
        self.client = emotion_client
        self.engine = palette_engine
        self.viz = visualizer
        self.db = data_store

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

                # Processing
                res = self.client.get_emotion(user_input)
                pal = self.engine.get_palette(res['label'])
                
                print(f"\nผลการวิเคราะห์: {res['label'].upper()} (Confidence: {res['score']*100:.2f}%)")
                print(f"จานสีที่แนะนำ: {pal}")
                
                # Save & Display
                self.db.save_analysis(user_input, res['label'], res['score'], pal)
                self.viz.plot_palette(res['label'], pal, res['score'])

            except KeyboardInterrupt:
                print("\n\nยกเลิกการทำงานอย่างสุภาพเรียบร้อยครับ")
                break
            except Exception as e:
                print(f"❌ เกิดข้อผิดพลาดที่ไม่คาดคิด: {e}")