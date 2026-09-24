# แบบรายงานผลการดำเนินงาน Sprint 3

- **ชื่อโปรเจกต์:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ
- **รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
- **สัปดาห์ที่:** 3 (Sprint 3: Web Dashboard & Deployment)
- **สมาชิกในทีม:**
  - **นายภีรภัทร ด่านภูมิพัฒนา** (ภีม) — **Planner** (ตรวจสอบระบบ GitHub Pages Deployment & Automated Build Scripts)
  - **นายปฏิภาณ นามสีลี** (ท็อป) — **Coder** (วางโครงสร้าง Web Architecture, UI/UX Glassmorphism & i18n System)
  - **นายปฏิพัฒน์ หอทอง** (ปลั๊ก) — **Coder** (พัฒนา Frontend Dashboard, JavaScript Core & GitHub Actions CI/CD)
  - **นายกฤษฎา สายวัน** (กาย) — **Debugger / QA** (ทดสอบการสกัดสีจากรูปภาพ Image Extractor & Cross-Browser Testing)

---

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)

- [x] พัฒนาหน้าเว็บ Web Application Dashboard (`web/index.html`, `style.css`, `app.js`) รูปแบบ Modern Glassmorphism Responsive UI
- [x] พัฒนาระบบวิเคราะห์อารมณ์จากข้อความและแนะนำจานสีอัจฉริยะแบบ Interactive บนหน้าเว็บ
- [x] พัฒนาระบบสองภาษา (Bilingual System: TH/EN Toggle) สำหรับรองรับผู้ใช้ทั้งไทยและต่างประเทศ
- [x] พัฒนาฟังก์ชัน Image Palette Extractor ให้ผู้ใช้สามารถอัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก นำมาเทียบกับจานสีอารมณ์ได้
- [x] ตั้งค่าระบบ CI/CD Automated Deployment ผ่าน GitHub Actions ในไฟล์ `.github/workflows/deploy-web.yml`
- [x] สั่งการ Build และ Deploy Web Dashboard ขึ้นสู่ **GitHub Pages** อัตโนมัติทันทีที่มีการ Push โค้ดเข้ากิ่งหลัก (`main`)
- [x] ดำเนินการทดสอบระบบแบบ Cross-Browser (Chrome, Edge, Safari, Firefox) และ Responsive Design บนอุปกรณ์มือถือ
- [x] รวบรวม ปรับแต่ง และจัดทำเอกสารโครงการสมบูรณ์ 100% (`README.md`, `CHANGELOG.md`, `LEARNINGLOG.md` และรายงานทั้ง 3 Sprint)

---

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Automated Integration & Deploy Tests (`GitHub Actions & pytest`)
รันการทดสอบระบบและการจัดส่งอัตโนมัติ — ผลลัพธ์: **Workflow Passed / Deployed Successfully**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `GitHub Actions Workflow` | รันสคริปต์ `.github/workflows/deploy-web.yml` ผ่านโดยไม่มีข้อผิดพลาด | สเตป Checkout, Upload Artifact และ Deploy สำเร็จ | PASSED |
| `GitHub Pages Live URL` | หน้าเว็บออนไลน์สามารถเปิดใช้งานได้จริงผ่าน HTTPS | เข้าใช้งานได้ผ่าน URL โครงการ | PASSED |
| `test_web_asset_integrity` | ไฟล์ `index.html`, `style.css`, `app.js` มีโครงสร้างถูกต้องตามหลัก ES6 | ไม่พบ Syntax Error ในการโหลดโมดูล | PASSED |
| `test_image_extraction_logic` | อัปโหลดไฟล์ภาพตัวอย่าง แล้วคืนค่า Array ของ Hex Codes | สกัดสีหลักได้ถูกต้องครบตามจำนวน | PASSED |

### 2.2 Manual & Cross-Browser Smoke Test
ทดสอบการใช้งานจริงบนเบราว์เซอร์และอุปกรณ์ที่หลากหลาย

| รายการทดสอบ | อินพุต/อุปกรณ์ที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| การวิเคราะห์อารมณ์บน Web UI | พิมพ์ข้อความบนหน้าเว็บ | แสดงจานสี, ค่า Confidence Score และ AI Design Advisory ทันที | แสดงผล UI สวยงาม ชัดเจน และเรียลไทม์ | PASSED |
| ฟังก์ชันสลับภาษา (i18n) | กดปุ่ม TH / EN Toggle | ข้อความและป้ายกำกับทั้งหมดเปลี่ยนภาษาตามที่เลือก | เปลี่ยนภาษาได้ทันทีโดยไม่ต้อง Refresh หน้า | PASSED |
| การสกัดสีจากรูปภาพ (Image Extractor) | อัปโหลดไฟล์รูปภาพ `.jpg` / `.png` | สกัดสีหลักออกมาเป็น Color Swatches พร้อมปุ่มคัดลอก HEX | แสดงแถบสีหลักพร้อมปุ่ม Copy Hex Code ได้ถูกต้อง | PASSED |
| Cross-Browser Compatibility | Chrome, Edge, Safari, Firefox | UI เลย์เอาต์แสดงผลถูกต้อง ไม่เบี้ยว ไม่หลุด Glassmorphism | แสดงผลสม่ำเสมอบนทุกเบราว์เซอร์ | PASSED |
| Mobile Responsive Design | สมาร์ทโฟน (iOS / Android) | เลย์เอาต์ปรับขนาดเป็นแบบ Single Column อ่านง่าย | หน้าเว็บรองรับการสัมผัสและย่อขนาดได้ดี | PASSED |

---

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)

- **Wow!** (ส่วนที่ทำได้ดี):
  - สามารถผสานรวมระบบ Client-Side AI Processing เข้ากับ Web Dashboard ได้ ทำให้ผู้ใช้งานเปิดเล่นผ่านเบราว์เซอร์บน **GitHub Pages** ได้ทันทีโดยไม่ต้องพึ่งพา Backend Server ทำให้ประหยัดค่าใช้จ่ายและรองรับโหลดได้ไม่จำกัด
  - การตั้งค่า **CI/CD Deployment** ผ่าน GitHub Actions ทำงานได้อย่างราบรื่น ช่วยลดขั้นตอนการอัปเดตเว็บด้วยตนเองและลดความผิดพลาดจากคน (Human Error)
- **Whoops!** (ปัญหาที่พบและแนวทางแก้ไข):
  - การเรนเดอร์ภาพรูปภาพขนาดใหญ่ในส่วน Image Extractor เกิดอาการกระตุกเล็กน้อยบนเบราว์เซอร์มือถือรุ่นเก่า — แก้ไขโดยการเพิ่มกระบวนการ Client-Side Canvas Image Resizing ย่อขนาดภาพก่อนนำไปประมวลผลสกัดสี ทำให้ทำงานรวดเร็วขึ้นอย่างเห็นได้ชัด
- **ลิงก์ Live Demo บน GitHub Pages:** https://peeraphatda.github.io/Final-Project/
- **ลิงก์ Repository:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อก่อนการส่งมอบโครงการ (Project Submission Checklist)

- [x] ตรวจสอบความถูกต้องของลิงก์ Live Demo บน GitHub Pages ให้ใช้งานได้ 100%
- [x] ตรวจสอบไฟล์ `README.md` ให้มีข้อมูลครบถ้วนทั้งวิธีติดตั้ง, วิธีรันทุกโหมด, โครงสร้างโปรเจกต์ และรายชื่อผู้พัฒนา
- [x] สรุปเอกสารรายงาน `SPRINT1.md`, `SPRINT2.md` และ `SPRINT3.md` ให้เรียบร้อย
- [x] ส่งมอบโครงการเข้าสู่ระบบสำหรับการประเมินในรายวิชา
