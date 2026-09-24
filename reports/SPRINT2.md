# 📌 แบบรายงานผลการดำเนินงาน Sprint 2

- **ชื่อโปรเจกต์:** Smart Art & Palette Sentiment Analyzer
- **สัปดาห์ที่:** 2 (Sprint 2: WCAG Accessibility, Visualization & Data Persistence)
- **สมาชิกในทีม:**
  - Team Leader / Coder 1: ท็อป
  - Planner: กาย
  - Coder 2: ปลั๊ก
  - Debugger / QA: ภีม

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)
- [x] พัฒนา `src/visualizer.py` สำหรับการสร้าง Visual Swatches ด้วย Matplotlib
- [x] เพิ่มระบบ WCAG Contrast Ratio Checker คำนวณค่าการมองเห็นใน `palette_engine.py`
- [x] สร้าง Data Access Layer ใน `src/data_store.py` บันทึกประวัติลง SQLite Database
- [x] พัฒนา `src/report_generator.py` ส่งออกผลลัพธ์เป็นไฟล์ `.json`, `.css` และระบบ Batch CSV Processing
- [x] เพิ่ม `src/ai_advisory.py` ให้คำแนะนำการเลือกใช้อักษร (Fonts) และแนวทางการออกแบบ UI
- [x] ครอบคลุม Unit Tests ครบถ้วนทุกโมดูลในโฟลเดอร์ `tests/`

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit Tests (`pytest`)
รันคำสั่ง `pytest tests/` — ผลลัพธ์: **12 passed in 0.15s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_wcag_contrast_pass` | ค่าสีดำกับขาวคำนวณได้อัตราส่วน >= 7.0 (AAA) | คืนค่า `PASS (AAA)` | PASSED |
| `test_sqlite_save_and_fetch` | บันทึกประวัติและอ่านค่ากลับมาได้ถูกต้อง | ได้ข้อมูลตรงตาม Database Record | PASSED |
| `test_export_css_variables` | สร้างไฟล์ CSS พร้อมตัวแปร `--color-x` ได้ตรงตามจริง | สร้างไฟล์ `.css` สำเร็จ | PASSED |
| `test_batch_processing_csv` | อ่านไฟล์ CSV และประมวลผลเป็นชุดข้อมูล | สร้าง DataFrame คืนค่าสมบูรณ์ | PASSED |

### 2.2 Manual Batch Test
รันคำสั่ง `python main.py --batch data/sample_batch.csv`

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| ประมวลผล CSV ย่อย | `data/sample_batch.csv` | สร้างไฟล์ `data/batch_output.csv` | สร้างไฟล์ผลลัพธ์เรียบร้อย | PASSED |
| ตรวจสอบประวัติ Database | Query ตาราง `history` | มีข้อมูลบันทึกตามแถวที่ประมวลผล | บันทึกครบทุก Record | PASSED |

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)
- **Wow!**: ระบบสามารถแปลงชุดสีเป็น CSS Variables และให้คำแนะนำการจับคู่ Font ได้โดยอัตโนมัติ ตอบโจทย์นักดีไซน์เนอร์อย่างแท้จริง
- **Whoops!**: การเรนเดอร์กราฟ Matplotlib ในบางระบบปฏิบัติการใช้เวลาเปิดหน้าต่างใหม่เล็กน้อย เพิ่มการรองรับการปิดสคริปต์อัตโนมัติในภายหลัง
- **ลิงก์ Repository:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อก่อนส่งงาน Sprint 2
- [x] ตรวจสอบการสร้างตาราง SQLite แบบอัตโนมัติ
- [x] ทดสอบการส่งออกไฟล์ `.css` และ `.json`
- [x] รวมโค้ดเข้าสู่กิ่งหลัก `main` บน GitHub