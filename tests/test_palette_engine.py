"""
Module: test_palette_engine.py
Role: Debugger (ภีม)
Description: Unit Testing การแมปสีและ WCAG Contrast Ratio
"""
import pytest
from src.palette_engine import PaletteEngine

def test_get_palette_valid_emotion():
    palette = PaletteEngine.get_palette("joy")
    assert isinstance(palette, list)
    assert len(palette) == 5
    assert palette[0].startswith("#")

def test_check_contrast_ratio_pass_aaa():
    # ดำตัดขาว ต้องได้ค่า Ratio สูงสุด Pass (AAA)
    res = PaletteEngine.check_contrast_ratio("#000000", "#FFFFFF")
    assert res["ratio"] >= 7.0
    assert "PASS (AAA)" in res["status"]