"""
Module: emotion_client.py
Role: Coder 1 (ท็อป) & Debugger (ภีม)
Description: ครอบ Hugging Face Pipeline + Defensive Fallback
             (ถ้าโหลดโมเดล/วิเคราะห์ไม่ได้ ระบบสลับไปใช้ Mock อัตโนมัติ โปรแกรมไม่พัง)
"""
try:
    from transformers import pipeline
except ImportError:  # ไม่มี transformers -> ใช้ fallback ล้วน
    pipeline = None

# คำสำคัญสำหรับโหมด Fallback (Rule-Based Mock)
_FALLBACK_KEYWORDS = {
    "joy": ["happy", "joy", "great", "wonderful", "excited", "glad", "awesome"],
    "sadness": ["sad", "cry", "lonely", "depressed", "miss", "unhappy"],
    "anger": ["angry", "hate", "furious", "mad", "annoyed", "rage"],
    "fear": ["afraid", "scared", "fear", "terrified", "anxious", "worried"],
    "love": ["love", "adore", "darling", "sweet", "romantic"],
}


class EmotionClient:
    def __init__(self, model_name: str = "bhadresh-savani/distilbert-base-uncased-emotion",
                 classifier=None):
        # classifier ฉีดจากภายนอกได้ (ใช้ใน Unit Test)
        self.classifier = classifier if classifier is not None else self._load_model(model_name)

    @staticmethod
    def _load_model(model_name: str):
        if pipeline is None:
            return None
        try:
            return pipeline("text-classification", model=model_name, top_k=None)
        except Exception as e:
            print(f"⚠️ โหลดโมเดลไม่สำเร็จ ({e}) -> ใช้โหมด Fallback")
            return None

    @staticmethod
    def _pick_top(results) -> dict:
        """รองรับผลลัพธ์ทั้ง {..}, [{..}] และ [[{..}]] แล้วคืนค่าที่ score สูงสุด"""
        if isinstance(results, dict):
            return results
        if results and isinstance(results[0], list):
            results = results[0]
        return max(results, key=lambda x: x["score"])

    @staticmethod
    def _fallback(text: str) -> dict:
        lowered = text.lower()
        for label, words in _FALLBACK_KEYWORDS.items():
            if any(w in lowered for w in words):
                return {"label": label, "score": 0.5, "fallback": True}
        return {"label": "neutral", "score": 0.5, "fallback": True}

    def get_emotion(self, text: str) -> dict:
        """คืน {'label', 'score', 'fallback'}"""
        if not isinstance(text, str) or not text.strip():
            raise ValueError("text must be a non-empty string")

        if self.classifier is None:
            return self._fallback(text)
        try:
            top = self._pick_top(self.classifier(text))
            return {
                "label": top["label"].lower(),
                "score": round(float(top["score"]), 4),
                "fallback": False,
            }
        except Exception as e:
            print(f"⚠️ วิเคราะห์ไม่สำเร็จ ({e}) -> ใช้โหมด Fallback")
            return self._fallback(text)
