import pytest
from src.palette_engine import PaletteEngine as PE


def test_black_white_is_21():
    assert PE.calculate_contrast_ratio("#000000", "#FFFFFF") == 21.0


def test_same_color_is_1():
    assert PE.calculate_contrast_ratio("#118AB2", "#118AB2") == 1.0


def test_ratio_is_symmetric():
    assert PE.calculate_contrast_ratio("#073B4C", "#FFFCF9") == PE.calculate_contrast_ratio("#FFFCF9", "#073B4C")


def test_hex_to_rgb_and_invalid():
    assert PE.hex_to_rgb("#FFD166") == (255, 209, 102)
    with pytest.raises(ValueError):
        PE.hex_to_rgb("#FFF")


def test_evaluate_levels():
    assert PE.evaluate_wcag_compliance("#000000", "#FFFFFF")["status"] == "PASS (AAA)"
    assert PE.evaluate_wcag_compliance("#767676", "#FFFFFF")["status"] == "PASS (AA)"   # 4.54
    r = PE.evaluate_wcag_compliance("#949494", "#FFFFFF")                               # 3.03
    assert r["status"] == "FAIL" and r["is_compliant"] is False


def test_best_contrast_pair_puts_dark_as_foreground():
    pair = PE.best_contrast_pair(["#FFFFFF", "#777777", "#000000"])
    assert (pair["foreground"], pair["background"]) == ("#000000", "#FFFFFF")
    assert pair["contrast_ratio"] == 21.0


def test_best_contrast_pair_needs_two_colors():
    with pytest.raises(ValueError):
        PE.best_contrast_pair(["#FFFFFF"])


@pytest.mark.parametrize("emotion", list(PE.EMOTION_PALETTES))
def test_every_palette_has_a_readable_pair(emotion):
    rep = PE.accessibility_report(emotion)
    assert rep["total_pairs"] == 28            # C(8,2)
    assert rep["best_pair"]["is_compliant"]    # ทุกจานสีต้องมีคู่ที่ผ่าน AA อย่างน้อย 1 คู่
