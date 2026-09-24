# 💾 Sprint 2 Report: Persistence, Report & AI Advisory

> **Smart Art & Palette Sentiment Analyzer**  
> **เป้าหมายใน Sprint 2:** พัฒนาส่วนจัดเก็บข้อมูลย้อนหลัง (Persistence), ระบบประมวลผลไฟล์ Batch, AI Design Advisory และการตรวจ Contrast ตามมาตรฐาน WCAG

---

## 🎯 ขอบเขตงานที่เสร็จสิ้นใน Sprint 2

1. **History Database Persistence (`src/data_store.py`):**
   - ระบบบันทึกข้อความ อารมณ์ คะแนน และจานสีลง **SQLite Database** (`data/palette_history.db`)
2. **Batch Processing & Export (`src/report_generator.py`):**
   - อ่านข้อความจากไฟล์ CSV ประมวลผลทีละหลายบรรทัด
   - ส่งออกจานสีเป็นไฟล์ `.css` (CSS Custom Properties) และ `.json` สำหรับดีไซเนอร์
3. **AI Design Advisory Module (`src/ai_advisory.py`):**
   - AI คำนวณคำแนะนำด้านงานดีไซน์ (ชื่อธีมดีไซน์, การเลือกฟอนต์, และบริบทการนำไปใช้)
4. **WCAG Accessibility Checker (`src/palette_engine.py`):**
   - คำนวณ Relative Luminance และ Contrast Ratio พร้อมประเมินสถานะ `PASS (AAA)`, `PASS (AA)` หรือ `FAIL`

---

## 🧪 การทดสอบ QA (Sprint 2)

- ผ่านการทดสอบ Unit Testing ด้วย `pytest` ครอบคลุมการเขียน/อ่านฐานข้อมูล SQLite, การคำนวณ Contrast Ratio และการเขียนไฟล์ `.css`/`.json`