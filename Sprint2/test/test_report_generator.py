import json
import pytest
from src.report_generator import ReportGenerator as RG
from src.palette_engine import PaletteEngine
from tests.test_emotion_client import offline_client

PAL = PaletteEngine.get_palette("joy")


def test_export_json(tmp_path):
    f = RG.export_to_json("joy", PAL, str(tmp_path / "x" / "p.json"), score=0.9)
    d = json.loads(open(f, encoding="utf-8").read())
    assert d == {"emotion": "joy", "colors": PAL, "confidence": 0.9}


def test_export_css(tmp_path):
    css = open(RG.export_to_css(PAL, str(tmp_path / "p.css"), "joy"), encoding="utf-8").read()
    assert ":root {" in css and "/* Emotion: joy */" in css
    assert "--color-1: #FFD166;" in css and "--color-8: #264653;" in css
    assert css.count("--color-") == 8


def test_batch_skips_blank_rows(tmp_path):
    f = tmp_path / "in.csv"
    f.write_text("text\nI am happy\n\n   \nI hate this\n", encoding="utf-8")
    res = RG.process_batch_csv(str(f), offline_client(), PaletteEngine)
    assert [r["label"] for r in res] == ["joy", "anger"]
    assert res[0]["palette"] == PAL


def test_batch_requires_text_column(tmp_path):
    f = tmp_path / "bad.csv"
    f.write_text("msg\nhello\n", encoding="utf-8")
    with pytest.raises(ValueError):
        RG.process_batch_csv(str(f), offline_client(), PaletteEngine)


def test_batch_continues_after_row_error(tmp_path):
    class Flaky:
        def get_emotion(self, text):
            if text == "bad":
                raise RuntimeError("x")
            return {"label": "joy", "score": 0.5}
    f = tmp_path / "in.csv"
    f.write_text("text\nok\nbad\nok2\n", encoding="utf-8")
    assert len(RG.process_batch_csv(str(f), Flaky(), PaletteEngine)) == 2


def test_write_batch_csv(tmp_path):
    res = [{"text": "hi", "label": "joy", "score": 0.5, "palette": ["#1", "#2"]}]
    out = RG.write_batch_csv(res, str(tmp_path / "o" / "r.csv"))
    lines = open(out, encoding="utf-8").read().splitlines()
    assert lines[0] == "text,emotion,score,palette" and lines[1].startswith("hi,joy,0.5,")
