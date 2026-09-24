# Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

รายวิชา: CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)  
อาจารย์ผู้สอน: ผศ. บุญสืบ ไวคำ

---

## 👥 รายชื่อสมาชิกในกลุ่มและบทบาทหน้าที่ (Team Members)

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

---

## ✨ สรุปฟีเจอร์ทั้งหมดของระบบ (Features Overview - Fully Implemented)

#### 🟢 ฟีเจอร์แกนหลักและระบบวิเคราะห์ (Core Engine & NLP - Complete)
* 🎭 **Emotion Classifier (`src/emotion_client.py`):** ประมวลผลและจำแนกอารมณ์ความรู้สึกจากข้อความ 6 อารมณ์หลัก (`joy`, `sadness`, `anger`, `fear`, `love`, `surprise`) ด้วย Hugging Face DistilBERT พร้อมระบบ Defensive Fallback Unwrapping (ใช้ `isinstance` Check) ป้องกันข้อผิดพลาด[cite: 1]
* 🎨 **Color Psychology Mapping (`src/palette_engine.py`):** แมปอารมณ์ความรู้สึกเข้ากับกลุ่มโค้ดสี Hex 5 สี ตามหลักจิตวิทยาของสี (Color Psychology)
* 📊 **Palette Visualizer (`src/visualizer.py`):** สร้างภาพตัวอย่างการจัดวางแถบสี (Color Swatch) ด้วย `matplotlib` ในโทน Dark Theme[cite: 1]
* 💻 **CLI Interactive Loop (`src/cli_app.py` & `main.py`):** หน้าต่างปฏิสัมพันธ์ Command Line Interface พร้อมระบบ Input Validation[cite: 1]

#### 🟢 ระบบบันทึกข้อมูล รายงานผล และ AI คำแนะนำ (Persistence & AI Advisory - Complete)
* 💾 **History Database (`src/data_store.py`):** บันทึกประวัติการวิเคราะห์ (ข้อความ, อารมณ์, confidence, palette, timestamp) ลง Local SQLite (`palette_history.db`)
* ☁️ **Cloud Database Migration (`src/data_store.py`):** รองรับโครงสร้างการจัดเก็บข้อมูลย้ายไปยัง Cloud Database (Supabase PostgreSQL)
* 📤 **Palette Export (`src/report_generator.py`):** ส่งออกจานสีเป็นไฟล์ `.json` และ `CSS variables` เพื่อให้นักพัฒนานำไปใช้งานต่อได้ทันที
* 📊 **Batch Processing (`src/report_generator.py`):** อ่านข้อความหลายบรรทัดจากไฟล์ `.csv` สรุปผลการวิเคราะห์เป็นชุดข้อมูลส่งออก
* 🧠 **AI Design Advisory (`src/ai_advisory.py`):** ประมวลผลคำแนะนำด้านการออกแบบ เช่น ชื่อแนวคิดธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และเทคนิคการใช้งาน UI
* ♿ **Accessibility Checker (`src/palette_engine.py`):** คำนวณ Contrast Ratio ตามมาตรฐาน WCAG 2.1 แจ้งเตือนสถานะ PASS (AAA) / PASS (AA) / FAIL

#### 🟢 หน้าเว็บแอปพลิเคชันและการติดตั้งระบบ (Web Dashboard & Deployment - Complete)
* 🌐 **Web Dashboard Interface (`web/index.html`):** หน้าเว็บแดชบอร์ดสไตล์ Glassmorphism UI สำหรับพิมพ์ข้อความ วิเคราะห์อารมณ์ และแสดงจานสี
* 🌐 **Bilingual UI Support (`web/style.css`, `web/app.js`):** ระบบสลับภาษาการแสดงผลหน้าเว็บได้ 2 ภาษา (ไทย/อังกฤษ - TH/EN Toggle)
* 🖼️ **Image Mood Input (`web/index.html`):** อัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก (Color Palette Extraction) นำมาเปรียบเทียบกับชุดสีที่ระบบแนะนำ
* 🚀 **GitHub Actions CI/CD (`.github/workflows/deploy-web.yml`):** ระบบ CI/CD จัดส่งหน้าเว็บไปยัง GitHub Pages อัตโนมัติเมื่อมี commit บนกิ่งหลัก

---

## 📅 สรุปผลการทำงานจริงตามแผนงาน (3 Sprints Roadmap)

#### 1. **Sprint 1: Core System Foundation & OOP CLI Architecture (Completed)**
* **สถานะ:** เสร็จสมบูรณ์
* **รายละเอียดงาน:**
  * พัฒนา `src/emotion_client.py` เชื่อมต่อ Hugging Face DistilBERT Pipeline พร้อมระบบ Defensive Fallback[cite: 1]
  * พัฒนา `src/palette_engine.py` สื่อสารตารางแมปอารมณ์ 6 ประเภทสู่กลุ่มสีจิตวิทยา
  * พัฒนา `src/visualizer.py` วาดภาพ Swatch รูปแบบ Visual Swatches ผ่าน `matplotlib`[cite: 1]
  * พัฒนา `src/cli_app.py` & `main.py` ทำระบบ Interactive Command Line พร้อมโหมด `--batch`[cite: 1]
  * พัฒนาชุดทดสอบระบบอัตโนมัติเบื้องต้นใน `tests/test_emotion_client.py`[cite: 1]

#### 2. **Sprint 2: Persistence, Report & AI Advisory (Completed)**
* **สถานะ:** เสร็จสมบูรณ์
* **รายละเอียดงาน:**
  * พัฒนา `src/data_store.py` บันทึกข้อมูลลง SQLite (`data/palette_history.db`) พร้อมรองรับการ Sync ขึ้น Cloud
  * พัฒนา `src/report_generator.py` ประมวลผลไฟล์ Batch CSV และระบบ Export โค้ดสี JSON/CSS
  * พัฒนา `src/ai_advisory.py` สร้างคำแนะนำแนวคิดดีไซน์ และ Font Pairings ตามอารมณ์
  * เพิ่มฟังก์ชันคำนวณอัตราส่วนความต่างสี (WCAG Contrast Ratio) ใน `palette_engine.py`

#### 3. **Sprint 3: Web Dashboard & Deployment (Completed)**
* **สถานะ:** เสร็จสมบูรณ์
* **รายละเอียดงาน:**
  * พัฒนา `web/index.html`, `style.css`, `app.js` สร้าง Frontend Responsive Glassmorphic UI
  * พัฒนาระบบ Bilingual Toggle (TH/EN) และ Image Color Extractor สกัดสีจากรูปภาพ
  * ตั้งค่า GitHub Actions `.github/workflows/deploy-web.yml` สั่ง Deploy หน้าเว็บไปยัง GitHub Pages อัตโนมัติ

---

## 🧩 โมดูลหลักของระบบ (Core Components)

1. **`src/emotion_client.py` (`EmotionClient`):**
   * ทำหน้าที่เป็น Client Gateway รับข้อความภาษาอังกฤษ[cite: 1]
   * ประมวลผลด้วยโมเดล `bhadresh-savani/distilbert-base-uncased-emotion`[cite: 1]
   * มีระบบ **Defensive Fallback Unwrapping** เช็ก `isinstance` เพื่อป้องกัน `TypeError` จาก Nested List Structure[cite: 1]

2. **`src/palette_engine.py` (`PaletteEngine`):**
   * ทำหน้าที่แปลงอารมณ์ความรู้สึกให้เป็นกลุ่มสี Hex Code 5 สี ตามหลัก Color Psychology
   * คำนวณค่าสัมพัทธ์ความสว่าง (Relative Luminance) และค่า **Contrast Ratio** ตามมาตรฐาน WCAG 2.1

3. **`src/data_store.py` (`DataStore`):**
   * จัดเก็บข้อมูลยั่งยืน (Persistence Storage) ลงฐานข้อมูล **SQLite3** (`data/palette_history.db`)
   * มีฟังก์ชันรองรับการ Migrate และ Sync ข้อมูลไปยัง **Supabase Cloud Database**

4. **`src/ai_advisory.py` (`AIAdvisory`):**
   * ทำหน้าที่เป็นผู้ช่วยดีไซเนอร์ ประมวลผลและเสนอชื่อธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และคำแนะนำการนำไปใช้งานตามอารมณ์

5. **`src/report_generator.py` (`ReportGenerator`):**
   * อ่านไฟล์ข้อมูลชุด (`.csv`) วิเคราะห์อารมณ์และแนะนำจานสีแบบยกชุด
   * แปลงข้อมูลจานสีให้อยู่ในรูปแบบไฟล์ `.json` และ `.css` (CSS Variables) เพื่อให้นักพัฒนานำไปใช้ต่อได้ทันที

6. **`src/cli_app.py` (`CLIApp`):**
   * หน้าต่างปฏิสัมพันธ์ Command Line Interface (CLI) รับอินพุต ทำความสะอาดข้อความ[cite: 1]
   * แสดงผลอารมณ์ ค่าความมั่นใจ จานสีแนะนำ พร้อมสั่งวาด Swatches และบันทึกประวัติอัตโนมัติ[cite: 1]

7. **`main.py` (Main Controller):**
   * จุดเริ่มต้นหลักของแอปพลิเคชัน รองรับทั้ง **Interactive CLI Mode** (`python main.py --cli`) และ **Batch File Processing Mode** (`python main.py --batch <file_path>`)

---

#### 📂 โครงสร้างไดเรกทอรีล่าสุด (Directory Structure)

```text
Final-Project/
├── .github/
│   └── workflows/             # GitHub Actions CI/CD Deployment Scripts
│       └── deploy-web.yml
├── src/                       # Core Python Application Modules
│   ├── __init__.py
│   ├── emotion_client.py      # Hugging Face DistilBERT Classifier
│   ├── palette_engine.py      # Color Psychology & WCAG Calculator
│   ├── visualizer.py          # Matplotlib Swatch Renderer
│   ├── cli_app.py             # CLI Interactive Interface
│   ├── data_store.py          # SQLite Local & Cloud Migration Support
│   ├── report_generator.py    # Batch CSV Processing & Export (.css / .json)
│   └── ai_advisory.py         # Design Advisory & Font Pairings
├── web/                       # Frontend Web Application Dashboard
│   ├── index.html             # Glassmorphic UI Dashboard
│   ├── style.css              # Responsive Styling
│   └── app.js                 # UI Interaction & Image Mood Extractor
├── tests/                     # Automated Unit Testing Suites
│   ├── test_emotion_client.py
│   ├── test_palette_engine.py
│   ├── test_data_store.py
│   └── test_report.py
├── reports/                   # Sprint Progress Reports
│   ├── SPRINT1.md
│   ├── SPRINT2.md
│   └── SPRINT3.md
├── data/                      # Data Storage & Batch Processing
│   ├── palette_history.db     # SQLite Local Database (Auto-generated)
│   └── sample_batch.csv       # Sample File for Batch Mode Testing
├── main.py                    # Main Entry Point (--cli, --batch)
├── requirements.txt           # Project Dependencies
├── README.md                  # Project Documentation
├── CHANGELOG.md               # Version History
└── LEARNINGLOG.md             # Development Reflection Log

```

## 🛠️ วิธีติดตั้งและใช้งาน (Installation & Usage Guide)

### 1. ความต้องการของระบบ (Prerequisites)
* Python 3.9 ขึ้นไป
* Git

---

### 2. ขั้นตอนการติดตั้ง (Installation)

1. **Cloning Repository:**
   ```bash
   git clone [https://github.com/peeraphatda/Final-Project.git](https://github.com/peeraphatda/Final-Project.git)
   cd Final-Project