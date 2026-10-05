import pytest
from src.ai_advisory import AIAdvisory as AI
from src.palette_engine import PaletteEngine


@pytest.mark.parametrize("emotion", list(PaletteEngine.EMOTION_PALETTES))
def test_every_palette_emotion_has_complete_advice(emotion):
    a = AI.get_advice(emotion)
    assert emotion in AI.ADVISORY_RULES
    assert all(a[k] for k in ("theme", "concept", "usage"))
    assert a["font_pairing"]["heading"] and a["font_pairing"]["body"]


def test_unknown_or_bad_input_falls_back_to_neutral():
    for bad in ("surprise", "", None, 123):
        assert AI.get_advice(bad)["theme"] == "Modern Neutral"


def test_case_and_whitespace_insensitive():
    assert AI.get_advice("  JOY ")["theme"] == "Vibrant Sunburst"


def test_returns_copy_not_original():
    a = AI.get_advice("joy")
    a["font_pairing"]["heading"] = "HACKED"
    assert AI.get_advice("joy")["font_pairing"]["heading"] == "Poppins (Bold)"


def test_format_advice_mentions_fonts():
    txt = AI.format_advice("love")
    assert "Playfair Display" in txt and "Lato" in txt
