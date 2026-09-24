"""
Module: palette_engine.py
Role: Planner (กาย) & Debugger (ภีม)
Description: แมปอารมณ์เป็นชุดสี + คำนวณ WCAG Contrast Ratio
"""

COLOR_PALETTE_MAP = {
    "joy": ["#FFD700", "#FF8C00", "#FF69B4", "#00BFFF", "#32CD32"],
    "sadness": ["#1C2833", "#2B3A42", "#3F51B5", "#5C6BC0", "#90A4AE"],
    "anger": ["#8B0000", "#FF0000", "#FF4500", "#212121", "#757575"],
    "fear": ["#2E0854", "#4A154B", "#1A1A2E", "#16213E", "#0F3460"],
    "surprise": ["#FF007F", "#7B1FA2", "#00E676", "#FFEA00", "#1DE9B6"],
    "love": ["#FF1493", "#FF69B4", "#FFB6C1", "#FFE4E1", "#D87093"]
}

class PaletteEngine:
    @staticmethod
    def get_palette(emotion: str) -> list:
        return COLOR_PALETTE_MAP.get(emotion.lower(), COLOR_PALETTE_MAP["joy"])

    @staticmethod
    def _hex_to_luminance(hex_str: str) -> float:
        """คำนวณ Relative Luminance สำหรับการเช็กค่า Contrast"""
        hex_str = hex_str.lstrip('#')
        r, g, b = [int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
        rgb = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in (r, g, b)]
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]

    @classmethod
    def check_contrast_ratio(cls, hex1: str, hex2: str) -> dict:
        """
        Sprint 2: WCAG Accessibility Checker คำนวณ Contrast Ratio ระหว่าง 2 สี
        """
        lum1 = cls._hex_to_luminance(hex1)
        lum2 = cls._hex_to_luminance(hex2)
        ratio = (max(lum1, lum2) + 0.05) / (min(lum1, lum2) + 0.05)
        ratio = round(ratio, 2)
        
        status = "FAIL"
        if ratio >= 7.0:
            status = "PASS (AAA)"
        elif ratio >= 4.5:
            status = "PASS (AA)"
            
        return {"ratio": ratio, "status": status}