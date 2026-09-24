# Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

รายวิชา: CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)

อาจารย์ผู้สอน: ผศ. บุญสืบ ไวคำ


---

##  รายชื่อสมาชิกในกลุ่มและบทบาทหน้าที่ (Team Members)

1. **ปฏิภาณ นามสีลี (ท็อป)**  
   * **รหัสนักศึกษา:** 683380425-3 | **Email:** patiphan.na@kkumail.com

2. **กฤษฎา สายวัน (กาย)**  
   * **รหัสนักศึกษา:** 683380646-7 | **Email:** kitsada.sai@kkumail.com

3. **ภีรภัทร ด่านภูมิพัฒนา (ภีม)**  
   * **รหัสนักศึกษา:** 683380436-8 | **Email:** peeraphat.da@kkumail.com

4. **ปฏิพัฒน์ หอทอง (ปลั๊ก)**  
   * **รหัสนักศึกษา:** 683380424-5 | **Email:** patipat.ho@kkumail.com

---
## 🔄 สมาชิกในทีมและการหมุนเวียนบทบาท (Role Rotation Matrix)

เพื่อให้สมาชิกทุกคนในทีมได้ฝึกฝนทั้ง 3 บทบาทหลัก (**Planner / Architect**, **Coder / Dev**, **Debugger / QA & DevOps**) ครบทุกคน 100%:

| สมาชิก | ชื่อเล่น | Sprint 1 : OOP & SQLite | Sprint 2 : AI, Report & Supabase | Sprint 3 : Web & Deployment |
| :--- | :---: | :---: | :---: | :---: |
| **นายกฤษฎา สายวัน** | กาย | **Planner / Architect** | **Coder / Dev** | **Debugger / QA** |
| **นายปฏิภาณ นามสีลี** | ท็อป | **Coder / Dev (NLP Pipeline)** | **Debugger / QA** | **Planner / Architect** |
| **นายปฏิพัฒน์ หอทอง** | ปลั๊ก | **Coder / Dev (Visualization)** | **Planner / Architect** | **Coder & DevOps** |
| **นายภีรภัทร ด่านภูมิพัฒนา** | ภีม | **Debugger / QA** | **Coder / Dev** | **Debugger / QA & Deployment** |
## ✨ สรุปฟีเจอร์ทั้งหมดของระบบ (Features Overview)

#### 🟢 ฟีเจอร์ที่พัฒนาเสร็จแล้ว (Current Implemented Features - Sprint 1)
* 🎭 **Emotion Classifier (`src/emotion_client.py`):** ประมวลผลและจำแนกอารมณ์ความรู้สึกจากข้อความ 6 อารมณ์หลัก (`joy`, `sadness`, `anger`, `fear`, `love`, `surprise`) ด้วย Hugging Face DistilBERT พร้อมระบบ Defensive Fallback Unwrapping ป้องกันข้อผิดพลาด
* 🎨 **Color Psychology Mapping (`src/palette_engine.py`):** แมปอารมณ์ความรู้สึกเข้ากับกลุ่มโค้ดสี Hex 5 สี ตามหลักจิตวิทยาของสี (Color Psychology)
* 📊 **Palette Visualizer (`src/visualizer.py`):** สร้างภาพตัวอย่างการจัดวางแถบสี (Color Swatch) ด้วย `matplotlib`
* 💻 **CLI Interactive Loop (`src/cli_app.py` & `main.py`):** หน้าต่างปฏิสัมพันธ์ Command Line Interface รับข้อความและประมวลผลทันที

#### 🟡 ฟีเจอร์ตามแผนงานใน Sprint 2 (Persistence, Report & AI Advisory)
* 💾 **History Database (`src/data_store.py`):** บันทึกประวัติการวิเคราะห์ (ข้อความ, อารมณ์, confidence, palette, timestamp) ลง Local SQLite
* ☁️ **Cloud Database Migration (`src/data_store.py`):** ย้ายการจัดเก็บข้อมูลจาก Local SQLite ไปยัง Cloud Database (Supabase PostgreSQL)
* 📤 **Palette Export (`src/report_generator.py`):** ส่งออกจานสีเป็นไฟล์โครงสร้างที่นักออกแบบนำไปใช้จริงได้ทันที เช่น `.json`, `CSS variables`, และ `Tailwind config`
* 📊 **Batch/Report Mode (`src/report_generator.py`):** อ่านข้อความหลายบรรทัดจากไฟล์ `.txt` / `.csv` สรุปเป็นรายงานสถิติ พร้อมภาพกราฟ Mood Board รวม
* 🧠 **AI Design Advisory (`src/ai_advisory.py`):** ประมวลผลคำแนะนำด้านการออกแบบ เช่น ตั้งชื่อแนวคิดธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และเทคนิคการจัดวาง Layout
* ♿ **Accessibility Checker (`src/palette_engine.py`):** คำนวณ Contrast Ratio ตามมาตรฐาน WCAG 2.1 เพื่อแจ้งเตือนคู่สีที่อ่านยาก

#### 🔴 ฟีเจอร์ตามแผนงานใน Sprint 3 (Web Dashboard & Deployment)
* 🌐 **Web Dashboard Interface (`web/index.html`):** หน้าเว็บแดชบอร์ดสไตล์ Glassmorphism UI สำหรับพิมพ์ข้อความ วิเคราะห์อารมณ์ และดูจานสี
* 🌐 **Bilingual UI Support (`web/index.html`):** สลับภาษาในการแสดงผลหน้าเว็บได้ 2 ภาษา (ไทย/อังกฤษ - TH/EN Toggle)
* 🖼️ **Image Mood Input (`web/index.html`):** อัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก (Color Palette Extraction) นำมาเปรียบเทียบกับชุดสีที่ระบบแนะนำ
* 🚀 **GitHub Pages Deployment (`.github/workflows/deploy.yml`):** ระบบ CI/CD จัดส่งหน้าเว็บไปยัง GitHub Pages อัตโนมัติ

---

## 📅 แผนการทำงานภาพรวม (3 Sprints Roadmap)

#### 1. **Sprint 1: Core System Foundation & OOP CLI Architecture**
* **เป้าหมาย:** สร้างรากฐานสถาปัตยกรรมเชิงวัตถุ (OOP) ระบบประมวลผล NLP Sentiment analysis และ CLI Swatch Visualization
* **รายละเอียดงาน:**
  * `src/emotion_client.py`: เชื่อมต่อ Hugging Face DistilBERT Pipeline พร้อมระบบ Defensive Fallback
  * `src/palette_engine.py`: ตารางแมปอารมณ์ 6 ประเภทสู่กลุ่มสีจิตวิทยา
  * `src/visualizer.py`: วาดภาพ Swatch รูปแบบ PNG ผ่าน `matplotlib`
  * `src/cli_app.py` & `main.py`: หน้าต่างปฏิสัมพันธ์ Command Line Interface และโหมด `--demo`
  * `tests/`: ชุดทดสอบระบบอัตโนมัติ (Automated `pytest`)
* **การใช้ Agile Kanban:** กำหนดข้อจำกัดงานในหมวด *In Progress* (**WIP Limit = 2**) เพื่อควบคุมขั้นตอนการพัฒนาและทำ Unit Test ก่อนส่งมอบทุกครั้ง

#### 2. **Sprint 2: Persistence, Report & AI Advisory**
* **เป้าหมาย:** เพิ่มระบบบันทึกประวัติยั่งยืน การรายงานผล Batch File คำแนะนำดีไซน์ และการเชื่อมต่อ Cloud DB
* **รายละเอียดงาน:**
  * `src/data_store.py`: บันทึกข้อมูลลง SQLite (`data/palette_history.db`) พร้อม Sync ขึ้น Supabase Cloud PostgreSQL
  * `src/report_generator.py`: Batch Processing ประมวลผลไฟล์ `.txt`/`.csv` และระบบ Export โค้ดสี JSON/CSS/Tailwind
  * `src/ai_advisory.py`: สร้างคำแนะนำแนวคิดดีไซน์ และ Font Pairings ตามอารมณ์
  * WCAG Accessibility Calculator: ฟังก์ชันคำนวณอัตราส่วนความต่างสี (Contrast Ratio)

#### 3. **Sprint 3: Web Dashboard & Deployment**
* **เป้าหมาย:** พัฒนา Web Dashboard สไตล์ Glassmorphic รองรับสองภาษา ระบบ Image Mood Input และรัน CI/CD Deployment
* **รายละเอียดงาน:**
  * `web/index.html`: สถาปัตยกรรม Frontend แบบ Responsive Glassmorphic UI
  * Bilingual Toggle & Image Color Extractor: สลับภาษา TH/EN และสกัดสีจากรูปภาพด้วย Canvas API
  * `.github/workflows/`: ตั้งค่า GitHub Actions สั่ง Deploy หน้าเว็บไปยัง GitHub Pages

---

## 🧩 โมดูลหลักของระบบ (Core Components)

1. **`src/emotion_client.py` (`EmotionClient`):**
   * ทำหน้าที่เป็น Client Gateway รับข้อความภาษาอังกฤษและภาษาไทย
   * ประมวลผลด้วยโมเดล `bhadresh-savani/distilbert-base-uncased-emotion`
   * มีระบบ **Defensive Fallback Unwrapping** เพื่อป้องกัน `TypeError` กรณี Output คืนค่าเป็น Nested List

2. **`src/palette_engine.py` (`PaletteEngine`):**
   * ทำหน้าที่แปลงอารมณ์ความรู้สึกให้เป็นกลุ่มสี Hex Code 5 สี ตามหลัก Color Psychology
   * คำนวณค่าสัมพัทธ์ความสว่าง (Relative Luminance) และค่า **Contrast Ratio** ตามมาตรฐาน WCAG 2.1

3. **`src/data_store.py` (`DataStore`):**
   * จัดเก็บข้อมูลยั่งยืน (Persistence Storage) ลงฐานข้อมูล **SQLite3** (`data/palette_history.db`)
   * มีฟังก์ชัน Migrate และ Sync ข้อมูลไปยัง **Supabase Cloud Database**

4. **`src/ai_advisory.py` (`AIAdvisory`):**
   * ทำหน้าที่เป็นครีเอทีฟผู้ช่วย ประมวลผลและเสนอชื่อธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และเทคนิคการจัดวางองค์ประกอบให้เข้ากับอารมณ์นั้นๆ

5. **`src/report_generator.py` (`ReportGenerator`):**
   * อ่านไฟล์ข้อมูลชุด (`.txt` หรือ `.csv`) สรุปเป็นสถิติสัดส่วนอารมณ์พร้อมสร้างภาพ Mood Board รวม
   * แปลงข้อมูลจานสีให้อยู่ในรูปแบบที่โปรแกรมเมอร์/ดีไซเนอร์นำไปใช้งานได้ทันที (JSON, CSS Variables, Tailwind Config)

6. **`src/cli_app.py` (`CLIApp`):**
   * หน้าต่างปฏิสัมพันธ์ Command Line Interface (CLI) รับอินพุต ทำความสะอาดข้อความด้วย `.strip()`
   * วาดตารางแสดงผล พร้อมรายงานผล WCAG Contrast และ คำแนะนำ AI Advisory

7. **`main.py` (Main Controller):**
   * จุดเริ่มต้นหลักของแอปพลิเคชัน รองรับทั้ง **Interactive CLI Mode** (`python main.py`), **Automated Demo Mode** (`python main.py --demo`), และ **Web Dashboard Mode** (`python main.py --web`)

---

#### 📂 โครงสร้างไดเรกทอรี (Directory Structure)

```text
Final-Project/
├── .github/
│   └── workflows/             # GitHub Actions CI/CD Deploy Scripts
├── src/                       # Core Python Application Modules
│   ├── emotion_client.py      # Hugging Face DistilBERT Classifier
│   ├── palette_engine.py      # Color Psychology & WCAG Calculator
│   ├── visualizer.py          # Matplotlib Swatch & Chart Renderer
│   ├── cli_app.py             # CLI Interactive Interface
│   ├── data_store.py          # SQLite Local & Supabase Sync
│   ├── report_generator.py    # Batch Mode & Palette Exports
│   └── ai_advisory.py         # Design Advisory & Font Pairings
├── web/                       # Frontend Web Application
│   └── index.html             # Glassmorphic UI Dashboard
├── tests/                     # Automated Unit Testing Suites
│   ├── test_emotion_client.py
│   ├── test_palette_engine.py
│   └── test_data_store.py
├── data/                      # Database & Output Storage
│   └── palette_history.db     # SQLite Local Database
├── test_cases/                # Sample files (.txt / .csv) for Batch Testing
├── main.py                    # Main Entry Point (--cli, --demo, --web)
├── requirements.txt           # Project Dependencies
├── README.md                  # Project Documentation
├── CHANGELOG.md               # Version History
└── LEARNINGLOG.md             # Development Prompts & Reflection Log
