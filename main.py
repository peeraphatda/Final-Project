"""
File: main.py
Description: Entry Point หลักสำหรับสลับโหมดการทำงาน (--cli, --batch)
"""
import sys
import argparse
from src.emotion_client import EmotionClient
from src.palette_engine import PaletteEngine
from src.visualizer import PaletteVisualizer
from src.data_store import DataStore
from src.cli_app import CLIApp
from src.report_generator import ReportGenerator

def main():
    parser = argparse.ArgumentParser(description="Smart Art & Palette Sentiment Analyzer")
    parser.add_argument("--cli", action="store_true", help="เปิดใช้งาน Interactive CLI Mode")
    parser.add_argument("--batch", type=str, help="รันโหมดประมวลผลไฟล์ CSV (ระบุ path ของไฟล์ เช่น data/sample_batch.csv)")
    
    args = parser.parse_args()

    print("กำลังเริ่มต้นโหลดโมเดล NLP และระบบ...")
    # Initialize Core Modules
    client = EmotionClient()
    engine = PaletteEngine()
    viz = PaletteVisualizer()
    db = DataStore()

    if args.batch:
        print(f"\n[Batch Mode] กำลังประมวลผลไฟล์: {args.batch}...")
        try:
            df_result = ReportGenerator.process_batch_csv(args.batch, client, engine)
            output_path = "data/batch_output.csv"
            df_result.to_csv(output_path, index=False)
            print(f"✅ ประมวลผลสำเร็จ! บันทึกผลลัพธ์ไว้ที่ {output_path}")
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการประมวลผลไฟล์ Batch: {e}")
    else:
        # Default Run: Interactive CLI Application Loop
        app = CLIApp(client, engine, viz, db)
        app.run()

if __name__ == "__main__":
    main()