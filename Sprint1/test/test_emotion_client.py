import pytest
from src.emotion_client import EmotionClient
from src.palette_engine import PaletteEngine
from src.cli_app import CLIApp


def fake(result):
    return lambda text: result


def offline_client():
    c = EmotionClient(classifier=fake([]))
    c.classifier = None
    return c


def test_flat_list_result():
    c = EmotionClient(classifier=fake([{"label": "JOY", "score": 0.91234}]))
    assert c.get_emotion("hello") == {"label": "joy", "score": 0.9123, "fallback": False}


def test_nested_list_picks_highest_score():
    nested = [[{"label": "sadness", "score": 0.1}, {"label": "anger", "score": 0.8}]]
    assert EmotionClient(classifier=fake(nested)).get_emotion("x")["label"] == "anger"


def test_empty_text_raises():
    with pytest.raises(ValueError):
        EmotionClient(classifier=fake([])).get_emotion("   ")


def test_classifier_error_falls_back():
    def boom(_):
        raise RuntimeError("down")
    r = EmotionClient(classifier=boom).get_emotion("I am so happy")
    assert r["fallback"] is True and r["label"] == "joy"


def test_no_model_falls_back_to_neutral():
    assert offline_client().get_emotion("table")["label"] == "neutral"


def test_palette_has_8_colors_and_defaults_to_neutral():
    assert len(PaletteEngine.get_palette("joy")) == 8
    assert PaletteEngine.get_palette("surprise") == PaletteEngine.get_palette("neutral")


def test_wcag_contrast_black_white():
    assert PaletteEngine.calculate_contrast_ratio("#000000", "#FFFFFF") == 21.0


def test_batch_csv(tmp_path):
    src = tmp_path / "in.csv"
    src.write_text("text\nI am happy\n\nI hate this\n", encoding="utf-8")
    out = tmp_path / "out.csv"
    app = CLIApp(offline_client(), PaletteEngine, None)
    res = app.run_batch(str(src), str(out))
    assert [r["label"] for r in res] == ["joy", "anger"]
    assert out.exists()
