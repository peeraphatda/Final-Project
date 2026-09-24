"""
Module: ai_advisory.py
Role: Planner (กาย)
Description: AI ให้คำแนะนำด้านการออกแบบ ฟอนต์ และการนำไปใช้งาน
"""
class AIAdvisory:
    ADVISORY_RULES = {
        "joy": {
            "theme": "Vibrant Sunburst",
            "font": "Poppins / Montserrat (Sans-Serif ตัวหนา สดใส)",
            "usage": "เหมาะกับแอป E-Commerce, เว็บไซต์งานเทศกาล หรือ Branding อาหารและเครื่องดื่ม"
        },
        "sadness": {
            "theme": "Melancholic Rain",
            "font": "Merriweather / Lora (Serif คลาสสิก ละมุนตา)",
            "usage": "เหมาะกับแอปพลิเคชันเพื่อการทำสมาธิ (Meditation App) หรือบล็อกเขียนบทความ"
        },
        "anger": {
            "theme": "High-Contrast Impact",
            "font": "Oswald / Bebas Neue (Display Font ตัวหนา ทรงพลัง)",
            "usage": "เหมาะกับแบนเนอร์สินค้ากีฬา หรือสื่อประชาสัมพันธ์การออกกำลังกาย"
        }
    }

    @classmethod
    def get_advice(cls, emotion: str) -> dict:
        return cls.ADVISORY_RULES.get(
            emotion.lower(),
            {
                "theme": "Modern Neutral",
                "font": "Inter / Roboto (Clean Sans-Serif)",
                "usage": "เหมาะสำหรับแอปพลิเคชันทั่วไปและ Dashboard"
            }
        )