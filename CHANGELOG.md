# 📋 CHANGELOG — Smart Art & Palette

รายการบันทึกการเปลี่ยนแปลงและการอัปเดตเวอร์ชันของโครงการ **Smart Art & Palette** ตามวงจรการพัฒนาแบบ Agile / Scrum (Sprint 1 ถึง Sprint 3)

---

## [v1.0.0] - 2026-09-25 (Sprint 3 Release — Final Submission) 🚀

### 🌟 Added (ฟีเจอร์ใหม่)
* **Web Application Dashboard:** หน้าเว็บแดชบอร์ดประมวลผลเรียลไทม์ ตกแต่งในสไตล์ Modern Glassmorphism Responsive UI (`web/index.html`, `style.css`, `app.js`)
* **Client-Side AI & Palette Engine:** รองรับการประมวลผลสกัดอารมณ์และคำนวณจานสีบนเบราว์เซอร์ 100% ผ่าน WebAssembly / ONNX Runtime
* **Bilingual Support (i18n):** ระบบสลับภาษาบนหน้าเว็บ 2 ภาษา (ภาษาไทย / English) แบบ Instant Toggle
* **Image Palette Extractor:** ฟังก์ชันอัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก (Color Extraction from Images) นำมาเปรียบเทียบกับจานสีอารมณ์
* **Automated CI/CD Workflow:** ไฟล์สคริปต์ `.github/workflows/deploy-web.yml` สั่งการ Build และ Deploy ไปยัง GitHub Pages อัตโนมัติเมื่อ Push ขึ้นกิ่ง `main`

### 🛠️ Fixed & Improved (แก้ไขและปรับปรุง)
* ปรับปรุงประสิทธิภาพ Image Extractor บนอุปกรณ์เคลื่อนที่ ด้วยการย่อขนาดภาพด้วย Client-Side Canvas ก่อนสกัดสี
* ปรับแต่ง UI ให้รองรับ Cross-Browser Compatibility (Chrome, Edge, Safari, Firefox) และ Mobile Responsive
* สรุปและจัดทำเอกสารส่งมอบโครงการสมบูรณ์ (`README.md`, `CHANGELOG.md`, `LEARNINGLOG.md`, และรายงาน `SPRINT1.md` - `SPRINT3.md`)

---

## [v0.2.0] - 2026-09-18 (Sprint 2 Release — Persistence & Advisory) 📦

### 🌟 Added (ฟีเจอร์ใหม่)
* **Local SQLite DataStore:** บันทึกประวัติข้อความ, อารมณ์, ค่า confidence และจานสี Hex Code ลงใน `data/palette_history.db`
* **Batch File Processing:** ระบบอ่านและประมวลผลไฟล์ข้อความ CSV ปริมาณมากพร้อมกันในคำสั่งเดียว (`main.py --batch`)
* **Multi-Format Exporter:** สกัดผลลัพธ์จานสีส่งออกเป็นไฟล์ `.json` และไฟล์ `.css` (CSS Variables) สำหรับนักพัฒนา UI/UX
* **AI Design Advisory Engine:** ระบบแนะนำชื่อธีมการออกแบบ, การจับคู่ฟอนต์ (Font Pairings) และแนวทางการนำไปใช้งาน (`src/ai_advisory.py`)
* **WCAG 2.1 Color Contrast Checker:** คำนวณอัตราส่วนความต่างสีพร้อมแสดงสถานะ PASS (AAA) / PASS (AA) / FAIL ตามมาตรฐานสากล

### 🛠️ Fixed & Improved (แก้ไขและปรับปรุง)
* เพิ่มระบบ Asynchronous Fallback สำหรับการเตรียมเชื่อมต่อ Cloud Database (Supabase PostgreSQL) เพื่อไม่ให้บล็อกการทำงานหลัก
* เพิ่มชุดทดสอบอัตโนมัติ `tests/test_sprint2.py` สำหรับตรวจสอบการทำงานของ Database และการคำนวณ WCAG

---

## [v0.1.0] - 2026-09-11 (Sprint 1 Release — Core OOP CLI Foundation) 🛠️

### 🌟 Added (ฟีเจอร์ใหม่)
* **NLP Emotion Analysis Engine:** เชื่อมต่อ Hugging Face Transformers ใช้โมเดล `bhadresh-savani/distilbert-base-uncased-emotion` ในการวิเคราะห์ข้อความภาษาอังกฤษและไทย
* **Dynamic Palette Generator:** แมปปิ้งโทนสีหลัก 5 สีตามหมวดหมู่อารมณ์ (Joy, Sadness, Anger, Fear, Love, Neutral)
* **Matplotlib Palette Renderer:** เรนเดอร์ภาพแถบสี Swatch ในโทน Dark Theme (`src/visualizer.py`)
* **Interactive CLI Interface:** หน้าจอรับคำสั่งแบบโต้ตอบเรียลไทม์ผ่าน Terminal (`python main.py --cli`)
* **Automated Unit Tests:** ชุดทดสอบ `tests/test_emotion_client.py` ตรวจสอบความถูกต้องของการคืนค่าจากโมเดล AI

### 🛡️ Security & Defensive Programming
* **Defensive Fallback Unwrapping:** ระบบดักจับและตรวจสอบ Data Structure จาก AI ป้องกันปัญหากรอบข้อมูลซ้อน List (`TypeError`) และคืนค่าสี Neutral สำรองเมื่อเครือข่ายขัดข้อง
* จัดทำโครงสร้างโปรเจกต์แบบ Object-Oriented Programming (OOP) และ Modular Separation (`src/`, `tests/`, `data/`)

---

## 👥 รายชื่อผู้พัฒนาและการหมุนเวียนบทบาท (Development Team & Role Rotation)

| Sprint | Planner | Coder | Debugger / QA |
| :---: | :--- | :--- | :--- |
| **Sprint 1** | นายกฤษฎา สายวัน (กาย) | นายปฏิภาณ นามสีลี (ท็อป)<br>นายปฏิพัฒน์ หอทอง (ปลั๊ก) | นายภีรภัทร ด่านภูมิพัฒนา (ภีม) |
| **Sprint 2** | นายปฏิพัฒน์ หอทอง (ปลั๊ก) | นายกฤษฎา สายวัน (กาย)<br>นายภีรภัทร ด่านภูมิพัฒนา (ภีม) | นายปฏิภาณ นามสีลี (ท็อป) |
| **Sprint 3** | นายภีรภัทร ด่านภูมิพัฒนา (ภีม) | นายปฏิภาณ นามสีลี (ท็อป)<br>นายปฏิพัฒน์ หอทอง (ปลั๊ก) | นายกฤษฎา สายวัน (กาย) |
