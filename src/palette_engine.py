"""
PaletteEngine Module
Handles emotion-to-color mapping, relative luminance calculations,
and WCAG 2.1 contrast ratio evaluations for accessibility compliance.
"""

import math
from typing import Dict, List, Tuple, Any


class PaletteEngine:
    """
    Core engine responsible for generating dynamic palettes (8 colors)
    and calculating WCAG 2.1 accessibility scores.
    """

    # Expanded 8-Color Palettes mapped by Emotion
    # Hierarchy: [Primary, Secondary, Accent, Background-Light, Background-Dark, Text-Dark, Text-Light, Border/Muted]
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

    @classmethod
    def get_palette(cls, emotion: str) -> List[str]:
        """
        Retrieves an 8-color HEX palette array based on the given emotion.
        Defaults to 'neutral' if emotion is unknown or unmapped.
        """
        normalized_emotion = emotion.lower().strip() if emotion else "neutral"
        return cls.EMOTION_PALETTES.get(normalized_emotion, cls.EMOTION_PALETTES["neutral"])

    @staticmethod
    def hex_to_rgb(hex_code: str) -> Tuple[int, int, int]:
        """
        Converts a HEX color string (e.g., '#FFD166') to an RGB tuple (255, 209, 102).
        """
        clean_hex = hex_code.lstrip("#")
        if len(clean_hex) != 6:
            raise ValueError(f"Invalid HEX color format: {hex_code}")
        return tuple(int(clean_hex[i:i + 2], 16) for i in (0, 2, 4))

    @staticmethod
    def calculate_relative_luminance(rgb: Tuple[int, int, int]) -> float:
        """
        Calculates Relative Luminance according to WCAG 2.1 specs.
        L = 0.2126 * R + 0.7152 * G + 0.0722 * B
        """
        normalized = []
        for val in rgb:
            s_rgb = val / 255.0
            if s_rgb <= 0.03928:
                c = s_rgb / 12.92
            else:
                c = math.pow((s_rgb + 0.055) / 1.055, 2.4)
            normalized.append(c)

        r, g, b = normalized
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    @classmethod
    def calculate_contrast_ratio(cls, hex1: str, hex2: str) -> float:
        """
        Calculates WCAG 2.1 contrast ratio between two HEX colors.
        Formula: (L1 + 0.05) / (L2 + 0.05) where L1 > L2
        Returns a ratio rounded to 2 decimal places (e.g., 4.51).
        """
        rgb1 = cls.hex_to_rgb(hex1)
        rgb2 = cls.hex_to_rgb(hex2)

        l1 = cls.calculate_relative_luminance(rgb1)
        l2 = cls.calculate_relative_luminance(rgb2)

        lighter = max(l1, l2)
        darker = min(l1, l2)

        ratio = (lighter + 0.05) / (darker + 0.05)
        return round(ratio, 2)

    @classmethod
    def evaluate_wcag_compliance(cls, fg_hex: str, bg_hex: str) -> Dict[str, Any]:
        """
        Evaluates readability compliance based on WCAG 2.1 standards.
        - AAA Level: Ratio >= 7.0
        - AA Level: Ratio >= 4.5
        - Fail: Ratio < 4.5
        """
        ratio = cls.calculate_contrast_ratio(fg_hex, bg_hex)

        if ratio >= 7.0:
            status = "PASS (AAA)"
            is_compliant = True
        elif ratio >= 4.5:
            status = "PASS (AA)"
            is_compliant = True
        else:
            status = "FAIL"
            is_compliant = False

        return {
            "foreground": fg_hex,
            "background": bg_hex,
            "contrast_ratio": ratio,
            "status": status,
            "is_compliant": is_compliant
        }


# --- Quick Self-Test / Verification ---
if __name__ == "__main__":
    engine = PaletteEngine()
    joy_palette = engine.get_palette("joy")
    print(f"Generated 8-Color Joy Palette: {joy_palette}")

    # WCAG Test
    text_color = joy_palette[5]  # #073B4C (Dark text)
    bg_color = joy_palette[1]    # #FFFCF9 (Light bg)
    evaluation = engine.evaluate_wcag_compliance(text_color, bg_color)
    print(f"WCAG Evaluation: {evaluation}")