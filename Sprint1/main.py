"""Entry Point: python main.py [--batch FILE.csv [--output OUT.csv]]"""
import argparse
from src.emotion_client import EmotionClient
from src.palette_engine import PaletteEngine
from src.visualizer import PaletteVisualizer
from src.cli_app import CLIApp


def main():
    parser = argparse.ArgumentParser(description="Smart Art & Palette Sentiment Analyzer")
    parser.add_argument("--batch", metavar="CSV", help="ประมวลผลไฟล์ CSV (คอลัมน์ text)")
    parser.add_argument("--output", metavar="CSV", help="ไฟล์ผลลัพธ์สำหรับโหมด --batch")
    args = parser.parse_args()

    app = CLIApp(EmotionClient(), PaletteEngine(), PaletteVisualizer())
    if args.batch:
        app.run_batch(args.batch, args.output)
    else:
        app.run()


if __name__ == "__main__":
    main()
