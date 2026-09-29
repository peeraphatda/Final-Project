# LEARNINGLOG — Smart Art & Palette Sentiment Analyzer

เอกสารสรุปองค์ความรู้ ทักษะทางเทคนิค (Technical Skills) และบทเรียนการแก้ปัญหาที่สมาชิกในทีมได้รับจากการพัฒนาโครงการ **Smart Art & Palette** ตลอด 3 Sprints

---

## 1. Core Technical Learnings (ทักษะทางเทคนิคที่ได้รับ)

### Machine Learning & NLP Engine
* **Hugging Face Transformers:** เรียนรู้การโหลดและใช้งาน Pre-trained Model (`bhadresh-savani/distilbert-base-uncased-emotion`) สำหรับวิเคราะห์ Emotion จากข้อความ ภาษาอังกฤษและภาษาไทย[cite: 1]
* **Client-Side AI Execution:** เรียนรู้การแปลง/ย้ายขั้นตอน Inferencing มารันบน Client-Side ผ่าน WebAssembly / ONNX Runtime บนเบราว์เซอร์ ช่วยลดภาระ Backend และรองรับการทำ Static Hosting บน GitHub Pages ฟรี

### Color Science & Accessibility Standards
* **WCAG 2.1 Contrast Calculation:** เรียนรู้การคำนวณอัตราส่วนความต่างสี (Relative Luminance & Contrast Ratio) ตามมาตรฐานสากล เพื่อวัดผล accessibility แสดงสถานะ PASS (AAA/AA) หรือ FAIL
* **Dynamic Palette Mapping:** การคำนวณแปลงค่า Emotion Label ไปเป็นจานสี Hex Code 5 สี พร้อมคำนวณสีเติมเต็ม (Complementary Colors)

### Database & Data Pipelines
* **SQLite Persistence:** การออกแบบ Schema และการจัดการฐานข้อมูล Local SQLite (`data/palette_history.db`) ด้วย `sqlite3` ใน Python
* **Batch Processing & Exporters:** การประมวลผลไฟล์ CSV ปริมาณมากด้วย `pandas` และการเขียน Generator ส่งออกเป็นไฟล์ `.json` และ `.css` (CSS Variables)

### Modern Frontend & CI/CD
* **Glassmorphism UI & i18n:** การเขียน HTML5/CSS3 แบบ Responsive พร้อมระบบสลับภาษา (Bilingual Toggle: TH/EN) โดยใช้ Vanilla JavaScript ES6
* **Automated CI/CD Workflows:** การเขียน `.github/workflows/deploy-web.yml` เพื่อตั้งค่า GitHub Actions ให้ Build และ Deploy เว็บลง GitHub Pages อัตโนมัติทุกครั้งที่ Commit ขึ้นกิ่ง `main`

---

## 2. Key Challenges & Solutions (ปัญหาที่พบและวิธีแก้ไข)

| ปัญหาที่พบ (Challenge) | สาเหตุ (Root Cause) | แนวทางการแก้ไข (Solution) |
| :--- | :--- | :--- |
| **TypeError จาก Nested List** | ผลลัพธ์จาก Hugging Face Pipeline บางกรณีซ้อน List มาไม่แน่นอน (`[[{...}]]`) | เพิ่มระบบ **Defensive Fallback Unwrapping** เช็กประเภทข้อมูลด้วย `isinstance` ก่อนดึงค่า[cite: 1] |
| **Model Loading Lags** | การดึงโมเดล AI ผ่านเครือข่ายใช้เวลานาน หรือเสี่ยงเน็ตหลุด | เพิ่มระบบ Fallback คืนค่าสี 'Neutral' สำรองทันทีเมื่อ API หรือเครือข่ายขัดข้อง |
| **Performance Drag on Mobile** | การสกัดสีจากรูปภาพขนาดใหญ่บนมือถือทำให้เบราว์เซอร์หน่วง | เพิ่มกระบวนการ Client-Side Canvas Image Resizing ย่อภาพก่อนประมวลผลสกัดสี |
| **Role Confusion in Reports** | บทบาทสมาชิกสลับกันจนทำให้ระบบตรวจสอบรายงาน Failure | จัดทำตารางหมวนเวียนบทบาท (Agile Rotation) ให้ชัดเจนและสอดคล้องกันทุก Sprint |

---

## 3. Agile/Scrum & Soft Skills Reflection

* **Cross-Functional Collaboration:** ได้ทดลองหมุนเวียนบทบาท (Planner, Coder, Debugger/QA) ทำให้เข้าใจมุมมองของทั้งคนวางแผน คนเขียนโค้ด และคนทดสอบระบบ
* **Defensive Programming Mindset:** ได้เรียนรู้ว่าการเขียนโค้ดให้ "ใช้งานได้" ไม่เพียงพอ แต่ต้องเขียนโค้ดให้ "ล้มเหลวอย่างปลอดภัย" (Fail Safely) เมื่อเจอ Edge Cases หรือปัญหาจาก External APIs
* **Documentation First:** เอกสารที่สมบูรณ์ (`README`, `CHANGELOG`, `SPRINT Reports`) ช่วยลดเวลาในการสื่อสารในทีมและทำให้งานส่งมอบได้ราบรื่น

---

## Member Key Takeaways (สรุปสิ่งที่ได้เรียนรู้รายบุคคล)

* **นายกฤษฎา สายวัน (กาย):** ได้พัฒนาทักษะด้าน System Architecture การวางโครงสร้าง OOP Class และการทำ SQLite Integration
* **นายปฏิภาณ นามสีลี (ท็อป):** ได้เรียนรู้การนำโมเดล NLP มาประยุกต์ใช้งานจริง การทำ UI/UX Glassmorphism และระบบสลับภาษา (i18n)
* **นายปฏิพัฒน์ หอทอง (ปลั๊ก):** ได้ทักษะการตั้งค่า CI/CD Pipeline ด้วย GitHub Actions และการเขียน JavaScript Core เพื่อสกัดสีจากรูปภาพ
* **นายภีรภัทร ด่านภูมิพัฒนา (ภีม):** ได้เรียนรู้การเขียน Automated Testing ด้วย `pytest`, การตรวจสอบมาตรฐาน WCAG 2.1 และการสร้าง AI Design Advisory Engine
