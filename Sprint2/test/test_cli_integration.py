import json
from src.cli_app import CLIApp
from src.data_store import DataStore
from src.palette_engine import PaletteEngine
from src.ai_advisory import AIAdvisory
from tests.test_emotion_client import offline_client


class FakeViz:
    def __init__(self): self.calls = 0
    def plot_palette(self, *a, **k): self.calls += 1


def feed(monkeypatch, lines):
    it = iter(lines)
    monkeypatch.setattr("builtins.input", lambda _="": next(it))


def test_interactive_saves_exports_and_advises(tmp_path, monkeypatch, capsys):
    db = DataStore(str(tmp_path / "h.db"))
    viz = FakeViz()
    app = CLIApp(offline_client(), PaletteEngine, viz, db, AIAdvisory, str(tmp_path / "exp"))
    feed(monkeypatch, ["", "I am so happy", "quit"])
    app.run()
    out = capsys.readouterr().out
    assert "ข้อความต้องไม่เป็นค่าว่าง" in out           # validation ของ Sprint 1 ยังทำงาน
    assert "Vibrant Sunburst" in out and "WCAG" in out
    assert db.get_history()[0]["emotion"] == "joy" and viz.calls == 1
    assert json.load(open(tmp_path / "exp" / "palette.json", encoding="utf-8"))["emotion"] == "joy"
    assert (tmp_path / "exp" / "palette.css").exists()


def test_db_failure_does_not_crash(tmp_path, monkeypatch, capsys):
    class BrokenDB:
        def save_palette(self, *a): raise RuntimeError("disk full")
    app = CLIApp(offline_client(), PaletteEngine, FakeViz(), BrokenDB())
    feed(monkeypatch, ["I am happy", "quit"])
    app.run()
    assert "บันทึกฐานข้อมูลไม่สำเร็จ" in capsys.readouterr().out


def test_batch_saves_to_db_and_show_history(tmp_path, capsys):
    db = DataStore(str(tmp_path / "h.db"))
    f = tmp_path / "in.csv"
    f.write_text("text\nI am happy\nI hate this\n", encoding="utf-8")
    app = CLIApp(offline_client(), PaletteEngine, None, db)
    app.run_batch(str(f), str(tmp_path / "out.csv"))
    rows = app.show_history(10)
    assert [r["emotion"] for r in rows] == ["anger", "joy"]
