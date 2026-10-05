"""
Entry Point
  python main.py                              # โหมด Interactive
  python main.py --batch in.csv --output out.csv
  python main.py --history 10                 # ดูประวัติจาก SQLite
  python main.py --sync                       # Sync ขึ้น Cloud (ตั้ง CLOUD_SYNC_URL)
  python main.py --export-dir exports/        # Export palette.json / palette.css ทุกครั้งที่วิเคราะห์
"""
import argparse
from Sprint4.src.emotion_client import EmotionClient
from Sprint4.src.palette_engine import PaletteEngine
from Sprint4.src.visualizer import PaletteVisualizer
from Sprint4.src.data_store import DataStore
from Sprint4.src.ai_advisory import AIAdvisory
from Sprint4.src.cli_app import CLIApp


def main():
    p = argparse.ArgumentParser(description="Smart Art & Palette Sentiment Analyzer")
    p.add_argument("--batch", metavar="CSV", help="ประมวลผลไฟล์ CSV (คอลัมน์ text)")
    p.add_argument("--output", metavar="CSV", help="ไฟล์ผลลัพธ์สำหรับ --batch")
    p.add_argument("--history", type=int, metavar="N", help="แสดงประวัติ N รายการล่าสุด")
    p.add_argument("--sync", action="store_true", help="Sync ข้อมูลที่ค้างขึ้น Cloud")
    p.add_argument("--export-dir", metavar="DIR", help="โฟลเดอร์ Export JSON/CSS")
    p.add_argument("--db", default="data/palette_history.db", help="path ของไฟล์ SQLite")
    args = p.parse_args()

    db = DataStore(args.db)

    if args.history:
        CLIApp(None, PaletteEngine, None, db).show_history(args.history)
        return
    if args.sync:
        print(db.sync_to_cloud()["message"])
        return

    app = CLIApp(EmotionClient(), PaletteEngine(), PaletteVisualizer(),
                 data_store=db, advisory=AIAdvisory, export_dir=args.export_dir)
    if args.batch:
        app.run_batch(args.batch, args.output)
    else:
        app.run()


if __name__ == "__main__":
    main()
