# 🚀 Sprint 2 Report: Persistence, Report & AI Advisory

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
**ชื่อโครงการ:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

---

## 👥 บทบาทและการหมุนเวียนงานใน Sprint 2

| สมาชิก | ชื่อเล่น | บทบาทหน้าที่ใน Sprint 2 |
| :--- | :---: | :--- |
| **นายปฏิพัฒน์ หอทอง** | ปลั๊ก | **Planner / Architect** (วางโครงสร้าง Database Schema & Export Specification) |
| **นายกฤษฎา สายวัน** | กาย | **Coder / Dev** (พัฒนา DataStore, SQLite Persistence & Supabase Integration) |
| **นายภีรภัทร ด่านภูมิพัฒนา** | ภีม | **Coder / Dev** (พัฒนา Report Generator & AI Advisory Engine) |
| **นายปฏิภาณ นามสีลี** | ท็อป | **Debugger / QA** (ทดสอบ Batch File Processing & WCAG Calculation Validation) |

---

## 🎯 สรุปผลการดำเนินงาน (Key Accomplishments)

1. **ระบบจัดเก็บข้อมูลยั่งยืน (`src/data_store.py`):**
   * ออกแบบฐานข้อมูล Local SQLite (`data/palette_history.db`) สำหรับบันทึกข้อความ, อารมณ์, ค่า confidence และจานสี
   * วางโครงสร้างเตรียมพร้อมการ Migrate ข้อมูลขึ้น Cloud Database (Supabase PostgreSQL)
2. **ระบบประมวลผลเป็นชุดและการส่งออกข้อมูล (`src/report_generator.py`):**
   * พัฒนาระบบ Batch Processing สามารถอ่านข้อความหลายบรรทัดจากไฟล์ `.csv` ประมวลผลและสรุปผลได้
   * พัฒนาระบบส่งออกจานสีในรูปแบบไฟล์ `.json` และไฟล์ `.css` (CSS Variables) สำหรับนักพัฒนา UI/UX
3. **ระบบผู้ช่วย AI คำแนะนำการออกแบบ (`src/ai_advisory.py`):**
   * พัฒนา Engine ประมวลผลและนำเสนอชื่อธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และคำแนะนำการนำไปใช้งาน
4. **ระบบตรวจสอบการเข้าถึงสีมาตรฐาน WCAG (`src/palette_engine.py`):**
   * คำนวณค่า Contrast Ratio ตามมาตรฐาน WCAG 2.1 แสดงสถานะ PASS (AAA) / PASS (AA) / FAIL เพื่อการันตีการอ่านง่าย

---

## 🛠️ เทคโนโลยีและมอดูลที่ใช้

* **Database:** SQLite3, PostgreSQL (Supabase Ready)
* **File Formats:** CSV, JSON, CSS
* **Standards:** WCAG 2.1 Accessibility Guidelines
