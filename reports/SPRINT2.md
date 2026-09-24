# แบบรายงานผลการดำเนินงาน Sprint 2

- **ชื่อโปรเจกต์:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ
- **รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
- **สัปดาห์ที่:** 2 (Sprint 2: Persistence, Report & AI Advisory)
- **สมาชิกในทีม:**
  - **นายปฏิภาณ นามสีลี** (ท็อป)— **Planner** (วางโครงสร้าง Database Schema & Export Specification)
  - **นายกฤษฎา สายวัน** (กาย) — **Coder** (พัฒนา DataStore, SQLite Persistence & Supabase Integration)
  - **นายภีรภัทร ด่านภูมิพัฒนา** (ภีม) — **Coder** (พัฒนา Report Generator & AI Advisory Engine)
  - **นายปฏิพัฒน์ หอทอง** (ปลั๊ก) — **Debugger / QA** (ทดสอบ Batch File Processing & WCAG Calculation Validation)
---

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)

- [x] ออกแบบและสร้างฐานข้อมูล Local SQLite (`data/palette_history.db`) ในมอดูล `src/data_store.py`
- [x] บันทึกประวัติการวิเคราะห์ (ข้อความ, อารมณ์, ค่า confidence, จานสี Hex) ลง SQLite พร้อมโครงสร้างเตรียม Migrate ขึ้น Supabase PostgreSQL
- [x] พัฒนาระบบ Batch Processing ใน `src/report_generator.py` รองรับการอ่านข้อความปริมาณมากจากไฟล์ `.csv`
- [x] พัฒนาระบบส่งออกผลลัพธ์จานสีให้อยู่ในรูปไฟล์ `.json` และไฟล์ `.css` (CSS Variables) สำหรับนักพัฒนา UI/UX
- [x] พัฒนา AI Advisory Engine ใน `src/ai_advisory.py` แนะนำธีมการออกแบบ, การจับคู่ฟอนต์ (Font Pairings) และคำแนะนำการใช้งาน
- [x] พัฒนาระบบคำนวณอัตราส่วนความต่างสีตามมาตรฐาน **WCAG 2.1** ใน `src/palette_engine.py` พร้อมแสดงสถานะ PASS (AAA) / PASS (AA) / FAIL
- [x] เขียน Unit Test เพิ่มเติม (`tests/test_sprint2.py`) เพื่อทดสอบ Database, Batch Processing และ WCAG Calculations
- [ ] ยังไม่เริ่ม: การพัฒนา Web Dashboard หน้าเว็บแบบเรียลไทม์ และการตั้งค่า CI/CD Deployment บน GitHub Pages (วางแผนไว้ใน Sprint 3)
- [x] อัปเดตโค้ดและส่งขึ้น GitHub Repository เรียบร้อยแล้ว

---

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit Tests (`pytest`)
รันคำสั่ง `pytest tests/test_sprint2.py -v` — ผลลัพธ์: **8 passed in 0.38s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_sqlite_insert_and_fetch` | บันทึกข้อมูลเข้า SQLite และดึงประวัติย้อนหลังได้ถูกต้อง | ดึงข้อมูลได้ครบถ้วน ตรงตาม Schema | PASSED |
| `test_batch_processing_csv` | อ่านไฟล์ CSV ตัวอย่างและประมวลผลได้ครบทุกแถว | ประมวลผลสำเร็จ 10/10 แถว | PASSED |
| `test_export_json_format` | สกัดไฟล์ `.json` โครงสร้างถูกต้องตาม Key ที่กำหนด | ได้ไฟล์ JSON ตรงตามมาตรฐาน | PASSED |
| `test_export_css_variables` | สกัดไฟล์ `.css` ในรูปแบบ `--color-1: #HEX;` | ได้ CSS Variables ครบทั้ง 5 สี | PASSED |
| `test_ai_advisory_font_pairing` | คืนค่า Font Pairing สอดคล้องกับหมวดหมู่อารมณ์ | 'joy' คืนค่า Sans-Serif / Playful Fonts | PASSED |
| `test_wcag_contrast_pass` | คำนวณความต่างสีข้อความดำบนพื้นขาวได้คะแนน > 4.5:1 | ได้ค่า Contrast 21:1 (PASS AAA) | PASSED |
| `test_wcag_contrast_fail` | สีพื้นหลังและตัวหนังสือใกล้เคียงกัน ต้องแจ้งสถานะ FAIL | แจ้งสถานะ FAIL ตามเกณฑ์ WCAG | PASSED |
| `test_data_store_fallback` | หาก DB ขัดข้อง สามารถรันแบบ In-Memory / Fallback ได้ | ทำงานต่อได้โดยโปรแกรมไม่ Crash | PASSED |

### 2.2 Manual / CLI Batch & Data Test
รันคำสั่ง `python main.py --batch data/sample_batch.csv` เพื่อทดสอบระบบประมวลผลไฟล์และสกัดรายงานจริง

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| อ่านไฟล์ CSV | `data/sample_batch.csv` | โหลดไฟล์สำเร็จ และอ่านรายการข้อความได้ทั้งหมด | แสดงสถานะ "Loaded 5 entries from CSV" | PASSED |
| การส่งออกไฟล์ JSON | `--export json` | สร้างไฟล์ `output.json` ในโฟลเดอร์ reports/ | สร้างไฟล์สำเร็จ ข้อมูลจัดโครงสร้างสวยงาม | PASSED |
| การส่งออกไฟล์ CSS | `--export css` | สร้างไฟล์ `palette.css` บรรจุตัวแปรสี CSS | สร้างไฟล์สำเร็จ นำไปอิมพอร์ตใช้งานได้จริง | PASSED |
| การบันทึกประวัติลง SQLite | ประมวลผลเสร็จสิ้น | เพิ่ม Record ใหม่ลงใน `data/palette_history.db` | บันทึกข้อมูลครบ 5 Rows พร้อม Timestamp | PASSED |
| คำแนะนำจาก AI Advisory | ข้อความหมวด 'Sadness' | แสดงชื่อธีม และแนะนำ Font สไตล์ Serif/Melancholy | แสดงผลคำแนะนำธีมตรงตามอารมณ์ | PASSED |

---

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)

- **Wow!** (ส่วนที่ทำได้ดี):
  - การต่อยอดระบบสร้าง CSS Variables และ JSON Export ช่วยให้นักพัฒนา UI/UX สามารถนำจานสีไปต่อยอดในงานออกแบบจริงได้ทันที
  - การนำมาตรฐาน **WCAG 2.1** เข้ามาคำนวณ ทำให้ระบบมีความโดดเด่นในด้าน Web Accessibility
- **Whoops!** (ปัญหาที่พบและแนวทางแก้ไข):
  - การเชื่อมต่อ PostgreSQL บน Supabase มีความล่าช้าในกรณีเน็ตเวิร์กช้า — แก้ไขโดยการใช้ **SQLite เป็นหลักในเครื่อง Local** แล้วใช้ระบบ Sync ข้อมูลขึ้น Cloud แบบ Asynchronous เพื่อไม่ให้บล็อกการทำงานหลัก
- **ลิงก์ Repository / Pull Request:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อก่อนส่งงาน Sprint 2

- [x] ตรวจสอบระบบบันทึก SQLite และการส่งออกไฟล์ JSON/CSS ให้ทำงานได้ถูกต้อง 100%
- [x] อัปเดตรายชื่อและบทบาทสมาชิกในทีมลงในเอกสารรายงาน
- [x] Push โค้ดส่วน DataStore, Report Generator และ AI Advisory ขึ้นกิ่งหลัก
- [ ] วางแผนพัฒนา Web Dashboard (HTML/CSS/JS) และระบบ CI/CD GitHub Actions สำหรับเตรียมส่งมอบงานใน Sprint 3
