# 🚀 Sprint 1 Report: Core Engine & CLI Application

> **Smart Art & Palette Sentiment Analyzer**  
> **สมาชิกระบบและบทบาท:**
> - ท็อป (Coder 1): NLP & Hugging Face Model Integration
> - กาย (Planner): Color Psychology Mapping Matrix & Architecture
> - ภีม (Debugger): QA, Input Sanitization & Data Resilience
> - ปลั๊ก (Coder 2): Interactive CLI Loop & Matplotlib Swatches

---

## 🎯 ขอบเขตงานที่เสร็จสิ้นใน Sprint 1

1. **Hugging Face Model Integration (`src/emotion_client.py`):**
   - เชื่อมต่อ Pre-trained Model `distilbert-base-uncased-emotion` สำหรับดึงอารมณ์และ Confidence Score
2. **Color Psychology Mapping (`src/palette_engine.py`):**
   - พัฒนาโครงสร้าง Dictionary แมป 6 อารมณ์หลัก (Joy, Sadness, Anger, Fear, Surprise, Love) เข้ากับชุดสี Hex Code 5 สี
3. **Interactive CLI Loop (`src/cli_app.py`):**
   - ระบบวนลูป `while True` รับค่าข้อความ ตรวจสอบคำสั่งออกระบบ (`quit`/`exit`) และดักจับค่าว่าง
4. **Visual Swatches (`src/visualizer.py`):**
   - แสดงผลแถบสี 5 โทนด้วย `matplotlib` พร้อมแสดงชื่อ Hex Code และคะแนนความเชื่อมั่น

---

## 🐛 QA & Error Resilience (แก้บั๊กสำคัญ)

* **ปัญหา:** Hugging Face Model คืนค่ากลับมาเป็น Nested List (`[[{...}]]`) ส่งผลให้เกิด `TypeError: list indices must be integers or slices, not str`
* **การแก้ไข:** ภีม (Debugger) เพิ่มการตรวจสอบด้วย `isinstance(results[0], list)` เพื่อถอดโครงสร้าง List ชั้นนอกออกก่อนนำไปประมวลผล ทำให้โค้ดไม่พัง 100%