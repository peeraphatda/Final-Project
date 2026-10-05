import sqlite3
import pytest
from src.data_store import DataStore

PAL = ["#111111", "#222222"]


@pytest.fixture
def db(tmp_path):
    return DataStore(str(tmp_path / "sub" / "h.db"))   # ทดสอบสร้างโฟลเดอร์ให้อัตโนมัติ


def test_save_and_read_roundtrip(db):
    rid = db.save_palette("I am happy", "joy", 0.9, PAL)
    h = db.get_history()
    assert h[0]["id"] == rid and h[0]["emotion"] == "joy"
    assert h[0]["hex_colors"] == PAL and h[0]["synced"] is False


def test_history_newest_first_and_limit(db):
    for i in range(5):
        db.save_palette(f"t{i}", "joy", 0.5, PAL)
    h = db.get_history(limit=3)
    assert [x["input_text"] for x in h] == ["t4", "t3", "t2"]


def test_rejects_empty_input(db):
    with pytest.raises(ValueError):
        db.save_palette("  ", "joy", 0.5, PAL)
    with pytest.raises(ValueError):
        db.save_palette("x", "joy", 0.5, [])


def test_sync_success_marks_all(db):
    for i in range(3):
        db.save_palette(f"t{i}", "joy", 0.5, PAL)
    sent = []
    res = db.sync_to_cloud(uploader=lambda recs: sent.extend(recs) or True, batch_size=2)
    assert res["ok"] and res["synced"] == 3 and len(sent) == 3
    assert db.get_unsynced() == []


def test_sync_failure_keeps_data_for_retry(db):
    db.save_palette("a", "joy", 0.5, PAL)
    assert db.sync_to_cloud(uploader=lambda r: False)["ok"] is False
    assert len(db.get_unsynced()) == 1

    def boom(_):
        raise ConnectionError("offline")
    res = db.sync_to_cloud(uploader=boom)
    assert res["ok"] is False and "offline" in res["message"]
    assert len(db.get_unsynced()) == 1
    assert db.sync_to_cloud(uploader=lambda r: True)["synced"] == 1   # retry สำเร็จ


def test_sync_without_url_is_skipped(db, monkeypatch):
    monkeypatch.delenv("CLOUD_SYNC_URL", raising=False)
    db.save_palette("a", "joy", 0.5, PAL)
    res = db.sync_to_cloud()
    assert res["ok"] is False and res["attempted"] == 0
    assert len(db.get_unsynced()) == 1


def test_migrates_sprint1_database(tmp_path):
    path = str(tmp_path / "old.db")
    with sqlite3.connect(path) as c:   # สกีมาแบบไม่มีคอลัมน์ synced
        c.execute("""CREATE TABLE palette_history (id INTEGER PRIMARY KEY AUTOINCREMENT,
            input_text TEXT NOT NULL, predicted_emotion TEXT NOT NULL, confidence_score REAL NOT NULL,
            hex_colors TEXT NOT NULL, palette_size INTEGER DEFAULT 8,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")
        c.execute("INSERT INTO palette_history (input_text,predicted_emotion,confidence_score,hex_colors) "
                  "VALUES ('old','sadness',0.7,'[\"#000000\"]')")
    db = DataStore(path)
    assert db.get_history()[0]["synced"] is False
