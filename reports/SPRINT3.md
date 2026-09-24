# 📌 แบบรายงานผลการดำเนินงาน Sprint 3

- **ชื่อโปรเจกต์:** Smart Art & Palette Sentiment Analyzer
- **สัปดาห์ที่:** 3 (Sprint 3: Web Dashboard, Full Integration & CI/CD Deployment)
- **สมาชิกในทีม:**
  - Team Leader / Coder 1: ท็อป
  - Planner: กาย
  - Coder 2: ปลั๊ก
  - Debugger / QA: ภีม

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)
- [x] พัฒนาหน้าจอ Frontend Dashboard ด้วย Web Technologies (`index.html`, `style.css`, `app.js`)
- [x] เพิ่มระบบสลับภาษา (TH/EN Toggle) และฟีเจอร์ Image Mood Extractor
- [x] เชื่อมต่อสายการทำงานทั้งหมดระหว่าง `src/` และ Frontend Interface ให้ทำงานร่วมกันได้อย่างสมบูรณ์
- [x] สร้าง Automation Workflow ผ่าน GitHub Actions (`.github/workflows/deploy-web.yml`)
- [x] จัดทำคู่มือและไฟล์เอกสารประกอบโครงการ `README.md`, `CHANGELOG.md` และ `LEARNINGLOG.md`
- [x] ทำการทดสอบระบบรอบสุดท้าย (Final System Verification) ก่อนส่งมอบงาน

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Full End-to-End System Tests
รันคำสั่ง `pytest` ครอบคลุมทั้งโปรเจกต์ — ผลลัพธ์: **16 passed in 0.38s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_full_pipeline` | ทดสอบกระบวนการตั้งแต่ Input ข้อความ -> Sentiment -> Palette -> DB | ทำงานต่อเนื่องสมบูรณ์ | PASSED |
| `test_ai_advisory_rules` | ดึงคำแนะนำ Font และ Theme การออกแบบตรงตาม emotion | คืนค่าคู่สีและชื่อ Font ตรงตาม Rule | PASSED |
| `test_web_asset_integrity` | ตรวจสอบโครงสร้างไฟล์ Web Dashboard | มีครบทั้ง HTML, CSS, JS | PASSED |

### 2.2 User Acceptance & Web Interface Test
ทดสอบระบบผ่าน Web Dashboard

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| สลับภาษาหน้าเว็บ | คลิกปุ่ม TH / EN | ข้อความบน UI เปลี่ยนภาษาตามที่เลือก | แปลภาษาบน UI สำเร็จ | PASSED |
| ทดสอบภาพ Mood Extractor | อัปโหลดรูปภาพตัวอย่าง | สกัดสเปกตรัมสีหลักจากภาพได้ | แสดง Palette สีจากภาพ | PASSED |
| บันทึกประวัติและดาวน์โหลด | กดปุ่ม Export CSS | ดาวน์โหลดไฟล์ `palette.css` มายังเครื่อง | ไฟล์ถูกดาวน์โหลดสมบูรณ์ | PASSED |

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)
- **Wow!**: ทีมพัฒนาสามารถส่งมอบผลงานได้ครบ 100% ตามเป้าหมาย มีทั้งโหมด CLI, Batch Processing และ Web Dashboard ที่รองรับการสลับภาษา
- **Whoops!**: ระบบ CI/CD บน GitHub Actions ใช้เวลา Build เล็กน้อยเนื่องจากต้องติดตั้ง Dependencies ใหญ่ เช่น PyTorch/Transformers แต่นำส่งได้อย่างปลอดภัย
- **ลิงก์ Repository:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อหลังส่งมอบงาน (Final Deliverables)
- [x] ตรวจสอบความเรียบร้อยของทุกไฟล์ใน repository
- [x] ทดสอบการรันสั่งงานผ่าน `python main.py --cli` รอบสุดท้าย
- [x] ส่งมอบโปรเจกต์ฉบับสมบูรณ์แก่อาจารย์ประจำวิชา