"""
PaletteEngine Module
Sprint 1: emotion-to-color mapping (6 emotions -> 8-color palettes)
Sprint 2: relative luminance + WCAG 2.1 contrast ratio evaluation
"""
import math
from itertools import combinations
from typing import Dict, List, Tuple, Any


class PaletteEngine:
    """Core engine: dynamic palettes (8 colors) + WCAG 2.1 accessibility scores."""

    EMOTION_PALETTES: Dict[str, List[str]] = {
        "joy": [
            "#FFD166", "#FFFCF9", "#06D6A0", "#118AB2",
            "#EF476F", "#073B4C", "#FFE8D6", "#264653"
        ],
        "sadness": [
            "#1D2D44", "#3E5C76", "#748CAB", "#F0F3F4",
            "#0B132B", "#1C2541", "#5BC0BE", "#ADB5BD"
        ],
        "anger": [
            "#D90429", "#EF233C", "#2B2D42", "#8D99AE",
            "#EDF2F4", "#212529", "#FFB703", "#6A040F"
        ],
        "fear": [
            "#240046", "#3C096C", "#5A189A", "#7B2CBF",
            "#9D4EDD", "#E0AAFF", "#10002B", "#C77DFF"
        ],
        "love": [
            "#FFB5A7", "#FCD5CE", "#F8AD9D", "#F4978E",
            "#FBC4AB", "#FFCAD4", "#B5E2FA", "#4A4E69"
        ],
        "neutral": [
            "#2B2D42", "#8D99AE", "#EDF2F4", "#F8F9FA",
            "#6C757D", "#343A40", "#E9ECEF", "#ADB5BD"
        ]
    }

    # ---------------- Sprint 1 ----------------
    @classmethod
    def get_palette(cls, emotion: str) -> List[str]:
        """Retrieves an 8-color HEX palette. Defaults to 'neutral' if unknown."""
        normalized = emotion.lower().strip() if emotion else "neutral"
        return cls.EMOTION_PALETTES.get(normalized, cls.EMOTION_PALETTES["neutral"])

    # ---------------- Sprint 2: WCAG ----------------
    @staticmethod
    def hex_to_rgb(hex_code: str) -> Tuple[int, int, int]:
        """'#FFD166' -> (255, 209, 102)"""
        clean_hex = hex_code.lstrip("#")
        if len(clean_hex) != 6:
            raise ValueError(f"Invalid HEX color format: {hex_code}")
        return tuple(int(clean_hex[i:i + 2], 16) for i in (0, 2, 4))

    @staticmethod
    def calculate_relative_luminance(rgb: Tuple[int, int, int]) -> float:
        """Relative Luminance per WCAG 2.1: L = 0.2126 R + 0.7152 G + 0.0722 B"""
        normalized = []
        for val in rgb:
            s = val / 255.0
            normalized.append(s / 12.92 if s <= 0.03928 else math.pow((s + 0.055) / 1.055, 2.4))
        r, g, b = normalized
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    @classmethod
    def calculate_contrast_ratio(cls, hex1: str, hex2: str) -> float:
        """Contrast ratio (L1 + 0.05) / (L2 + 0.05), rounded to 2 decimals."""
        l1 = cls.calculate_relative_luminance(cls.hex_to_rgb(hex1))
        l2 = cls.calculate_relative_luminance(cls.hex_to_rgb(hex2))
        lighter, darker = max(l1, l2), min(l1, l2)
        return round((lighter + 0.05) / (darker + 0.05), 2)

    @classmethod
    def evaluate_wcag_compliance(cls, fg_hex: str, bg_hex: str) -> Dict[str, Any]:
        """AAA >= 7.0, AA >= 4.5, otherwise FAIL (normal-size text)."""
        ratio = cls.calculate_contrast_ratio(fg_hex, bg_hex)
        if ratio >= 7.0:
            status, ok = "PASS (AAA)", True
        elif ratio >= 4.5:
            status, ok = "PASS (AA)", True
        else:
            status, ok = "FAIL", False
        return {"foreground": fg_hex, "background": bg_hex,
                "contrast_ratio": ratio, "status": status, "is_compliant": ok}

    @classmethod
    def best_contrast_pair(cls, palette: List[str]) -> Dict[str, Any]:
        """หาคู่สีในจานสีที่คอนทราสต์สูงสุด (ใช้เป็นคู่ตัวอักษร/พื้นหลังที่แนะนำ)"""
        if len(palette) < 2:
            raise ValueError("palette must contain at least 2 colors")
        best = max(combinations(palette, 2),
                   key=lambda p: cls.calculate_contrast_ratio(p[0], p[1]))
        # สีเข้มกว่า = ตัวอักษร, สีอ่อนกว่า = พื้นหลัง
        lum = lambda h: cls.calculate_relative_luminance(cls.hex_to_rgb(h))
        fg, bg = sorted(best, key=lum)
        return cls.evaluate_wcag_compliance(fg, bg)

    @classmethod
    def accessibility_report(cls, emotion: str) -> Dict[str, Any]:
        """สรุปความอ่านง่ายของจานสีตามอารมณ์"""
        palette = cls.get_palette(emotion)
        pairs = list(combinations(palette, 2))
        passing = sum(1 for a, b in pairs if cls.calculate_contrast_ratio(a, b) >= 4.5)
        return {
            "best_pair": cls.best_contrast_pair(palette),
            "pairs_passing_aa": passing,
            "total_pairs": len(pairs),
        }
