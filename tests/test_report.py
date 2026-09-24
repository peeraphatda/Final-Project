"""
Module: test_report.py
Role: Coder 2 (ปลั๊ก)
Description: Unit Testing การส่งออกไฟล์ .css และ .json
"""
import os
import pytest
from src.report_generator import ReportGenerator

def test_export_to_css():
    palette = ["#FFD700", "#FF8C00", "#FF69B4"]
    filename = "tests/test_palette.css"
    
    out = ReportGenerator.export_to_css(palette, filename)
    assert os.path.exists(out)
    
    with open(out, "r") as f:
        content = f.read()
        assert "--color-1: #FFD700;" in content
        
    if os.path.exists(out):
        os.remove(out)