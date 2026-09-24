# 🚀 Sprint 3 Report: Web Dashboard & Deployment

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
**ชื่อโครงการ:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

---

## 👥 บทบาทและการหมุนเวียนงานใน Sprint 3

| สมาชิก | ชื่อเล่น | บทบาทหน้าที่ใน Sprint 3 |
| :--- | :---: | :--- |
| **นายปฏิภาณ นามสีลี** | ท็อป | **Coder** (วางโครงสร้าง Web Architecture, UI/UX Glassmorphism & i18n System) |
| **นายปฏิพัฒน์ หอทอง** | ปลั๊ก | **Coder** (พัฒนา Frontend Dashboard, JavaScript Core & GitHub Actions CI/CD) |
| **นายกฤษฎา สายวัน** | กาย | **Debugger** (ทดสอบการสกัดสีจากรูปภาพ Image Extractor & Cross-Browser Testing) |
| **นายภีรภัทร ด่านภูมิพัฒนา** | ภีม | **Planner** (ตรวจสอบระบบ GitHub Pages Deployment & Automated Build Scripts) |

---

## 🎯 สรุปผลการดำเนินงาน (Key Accomplishments)

1. **การพัฒนา Web Application Dashboard (`web/index.html`, `style.css`, `app.js`):**
   * ออกแบบและพัฒนาหน้าเว็บแดชบอร์ดรูปแบบ Modern Glassmorphism Responsive UI
   * พัฒนาระบบการวิเคราะห์อารมณ์และแนะนำจานสีบนหน้าเว็บแบบ Interactive
2. **ระบบสองภาษา และการสกัดสีจากรูปภาพ (Bilingual & Image Extractor):**
   * พัฒนาระบบสลับภาษา UI ได้ 2 ภาษา (ไทย / อังกฤษ - TH/EN Toggle)
   * เพิ่มฟังก์ชันอัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก (Image Palette Extractor) นำมาเปรียบเทียบกับจานสีอารมณ์
3. **ระบบจัดส่งแอปพลิเคชันอัตโนมัติ (CI/CD Deployment):**
   * ตั้งค่า GitHub Actions Workflow ใน `.github/workflows/deploy-web.yml`
   * สั่งการ Build และ Deploy หน้าเว็บแดชบอร์ดไปยัง GitHub Pages อัตโนมัติเมื่อมีการ Commit เข้าสู่กิ่งหลัก (`main`)
4. **สรุปความสมบูรณ์ของโครงการ (Project Wrap-up):**
   * รวบรวมและปรับแต่งเอกสาร `README.md`, `CHANGELOG.md`, `LEARNINGLOG.md` และรายงานทั้ง 3 Sprint ครบถ้วน 100%

---

## 🛠️ เทคโนโลยีและมอดูลที่ใช้

* **Frontend:** HTML5, CSS3 (Glassmorphism & Grid), JavaScript (ES6 Modules)
* **DevOps & Hosting:** GitHub Actions CI/CD, GitHub Pages
