"""
Module: emotion_client.py
Role: Coder 1 (ท็อป) & Debugger (ภีม)
Description: ครอบ Hugging Face Pipeline และจัดการ Data Structure Checking
"""
from transformers import pipeline

class EmotionClient:
    def __init__(self, model_name: str = "bhadresh-savani/distilbert-base-uncased-emotion"):
        self.classifier = pipeline("text-classification", model=model_name, return_all_scores=True)

    def get_emotion(self, text: str) -> dict:
        """
        วิเคราะห์อารมณ์จากข้อความ และจัดการปัญหา TypeError จาก Nested List
        """
        results = self.classifier(text)
        
        # 🐛 Debugger Fix: ตรวจสอบว่าเป็น List ซ้อน List หรือไม่
        if isinstance(results[0], list):
            sorted_results = sorted(results[0], key=lambda x: x['score'], reverse=True)
            top_result = sorted_results[0]
        else:
            top_result = results[0]
            
        return {
            "label": top_result["label"].lower(),
            "score": round(top_result["score"], 4)
        }