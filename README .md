# 🎨 Smart Art & Palette Sentiment Analyzer — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
**หัวข้อ:** Smart Art & Palette Sentiment Analyzer (ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ)
**อาจารย์ผู้สอน:** ผศ. บุญสืบ ไวคำ

---

## 📁 รายงานแต่ละ Sprint (Sprint Deliverables)

| Sprint | หัวข้อ | ผลงานสำคัญที่ส่งมอบ | เอกสารสรุป |
| :--- | :--- | :--- | :--- |
| 📦 Sprint 1 | Core System & OOP CLI | Emotion Classifier, Palette Engine, Visualizer, CLI Loop, Unit Test เบื้องต้น | [📄 reports/SPRINT1.md](./Sprint1/README.md) |
| 📦 Sprint 2 | Persistence, Report & AI Advisory | SQLite + Supabase, Export JSON/CSS, Batch CSV, AI Advisory, WCAG Checker | [📄 reports/SPRINT2.md](reports/SPRINT2.md) |
| 📦 Sprint 3 | Web Dashboard & Deployment | Glassmorphism UI, Bilingual TH/EN, Image Mood Input, GitHub Actions CI/CD | [📄 reports/SPRINT3.md](reports/SPRINT3.md) |

---

## 👥 รายชื่อสมาชิกในกลุ่มและบทบาทหน้าที่ (Team Members)

1. **ปฏิภาณ นามสีลี (ท็อป)**
   - **รหัสนักศึกษา:** 683380425-3 | **Email:** patiphan.na@kkumail.com
2. **กฤษฎา สายวัน (กาย)**
   - **รหัสนักศึกษา:** 683380646-7 | **Email:** kitsada.sai@kkumail.com
3. **ภีรภัทร ด่านภูมิพัฒนา (ภีม)**
   - **รหัสนักศึกษา:** 683380436-8 | **Email:** peeraphat.da@kkumail.com
4. **ปฏิพัฒน์ หอทอง (ปลั๊ก)**
   - **รหัสนักศึกษา:** 683380424-5 | **Email:** patipat.ho@kkumail.com

### 🔄 สมาชิกในทีมและการหมุนเวียนบทบาท (Role Rotation Matrix)

เพื่อให้สมาชิกทุกคนในทีมได้ฝึกฝนทั้ง 3 บทบาทหลัก (Planner / Architect, Coder / Dev, Debugger / QA & DevOps) ครบทุกคน 100%:

| สมาชิก | ชื่อเล่น | Sprint 1 : OOP & SQLite | Sprint 2 : AI, Report & Supabase | Sprint 3 : Web & Deployment | Final |
| :--- | :--- | :--- | :--- | :--- | :--- |
| นายกฤษฎา สายวัน | กาย | Planner | Coder | Debugger | Coder |
| นายปฏิภาณ นามสีลี | ท็อป | Coder | Planner | Coder | Debugger |
| นายปฏิพัฒน์ หอทอง | ปลั๊ก | Coder | Debugger | Coder | Planner |
| นายภีรภัทร ด่านภูมิพัฒนา | ภีม | Debugger | Coder | Planner | Coder |

---

## 📝 การประเมินกลุ่ม & การประเมินรายบุคคล (Self-Assessment Report)

### Group Self-Assessment (0–10)

| หัวข้อ | น้ำหนัก | คะแนนกลุ่ม (0-10) | เหตุผล |
| :--- | :---: | :---: | :--- |
| บรรลุวัตถุประสงค์กลุ่ม | 30% | 9.0 | พัฒนาฟีเจอร์ครบตามแผนทั้ง 3 Sprints ได้แก่ Emotion Classifier, Color Psychology Mapping, CLI, SQLite/Supabase, Export JSON/CSS, Batch CSV, AI Advisory, WCAG Checker และ Web Dashboard 2 ภาษา (TH/EN) พร้อม Deploy บน GitHub Pages |
| ความสอดคล้องของเนื้อหาและมาตรฐานของงาน | 30% | 9.5 | ออกแบบโมดูลเชิงวัตถุ (OOP) แยกหน้าที่ชัดเจนตามหลัก Separation of Concerns (`EmotionClient`, `PaletteEngine`, `PaletteVisualizer`, `DataStore`, `ReportGenerator`, `AIAdvisory`, `CLIApp`) มี Defensive Fallback และ Input Validation |
| ปริมาณ คุณภาพ และธรรมาภิบาลของงาน | 30% | 9.0 | มีชุดทดสอบอัตโนมัติด้วย `pytest` (4 ไฟล์ทดสอบ), เอกสารรายงานประจำ Sprint และ CI/CD อัตโนมัติด้วย GitHub Actions |
| ภาพรวมงานกลุ่มทั้งหมด | 10% | 9.5 | ทำงานเสร็จตามกำหนดทุก Sprint ร่วมมือกันตามบทบาท และมีการหมุนเวียนบทบาท (Role Rotation Matrix) ครบทั้ง 3 หน้าที่ทุกคน |
| **รวม (ถ่วงน้ำหนัก)** | **100%** | **≈ 9.20 / 10** | ผลงานเสร็จสมบูรณ์ครบทั้ง Core Engine, Persistence, AI Advisory และ Web Deployment |

### Individual Self-Assessment (0–10)

#### 📊 ตารางสรุปคะแนนประเมินตนเองรายบุคคลแยกตาม Sprint (Sprint-by-Sprint Summary)

| ชื่อ - สกุล | Sprint 1 (OOP & CLI) | Sprint 2 (AI, Report & Cloud) | Sprint 3 (Web & DevOps) | คะแนนเฉลี่ยรวม |
| :--- | :---: | :---: | :---: | :---: |
| **นายปฏิภาณ นามสีลี (ท็อป)**<br>• Sprint 1: Coder<br>• Sprint 2: Planner<br>• Sprint 3: Coder | 9.5 / 10 | 9.5 / 10 | 9.5 / 10 | **9.50 / 10** |
| **นายกฤษฎา สายวัน (กาย)**<br>• Sprint 1: Planner<br>• Sprint 2: Coder<br>• Sprint 3: Debugger | 9.5 / 10 | 9.0 / 10 | 9.5 / 10 | **9.33 / 10** |
| **นายภีรภัทร ด่านภูมิพัฒนา (ภีม)**<br>• Sprint 1: Debugger<br>• Sprint 2: Coder<br>• Sprint 3: Planner | 9.0 / 10 | 9.5 / 10 | 9.5 / 10 | **9.33 / 10** |
| **นายปฏิพัฒน์ หอทอง (ปลั๊ก)**<br>• Sprint 1: Coder<br>• Sprint 2: Debugger<br>• Sprint 3: Coder | 9.5 / 10 | 9.5 / 10 | 9.0 / 10 | **9.33 / 10** |

#### 📝 รายละเอียดคะแนนประเมินตนเองรายบุคคลแยกตามแต่ละ Sprint

##### 📦 Sprint 1: Core System Foundation & OOP CLI Architecture

| สมาชิก | บทบาทใน Sprint 1 | ด้านความรับผิดชอบ | ด้านการมีส่วนร่วม | ด้านการสื่อสาร | รวม Sprint 1 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| ปฏิภาณ นามสีลี (ท็อป) | Coder | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| กฤษฎา สายวัน (กาย) | Planner | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| ภีรภัทร ด่านภูมิพัฒนา (ภีม) | Debugger | 9.0 | 9.0 | 9.0 | 9.0 / 10 |
| ปฏิพัฒน์ หอทอง (ปลั๊ก) | Coder | 9.5 | 9.5 | 9.5 | 9.5 / 10 |

##### 📦 Sprint 2: Persistence, Report & AI Advisory

| สมาชิก | บทบาทใน Sprint 2 | ด้านความรับผิดชอบ | ด้านการมีส่วนร่วม | ด้านการสื่อสาร | รวม Sprint 2 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| ปฏิภาณ นามสีลี (ท็อป) | Planner | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| กฤษฎา สายวัน (กาย) | Coder | 9.0 | 9.0 | 9.0 | 9.0 / 10 |
| ภีรภัทร ด่านภูมิพัฒนา (ภีม) | Coder | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| ปฏิพัฒน์ หอทอง (ปลั๊ก) | Debugger | 9.5 | 9.5 | 9.5 | 9.5 / 10 |

##### 📦 Sprint 3: Web Dashboard & Deployment

| สมาชิก | บทบาทใน Sprint 3 | ด้านความรับผิดชอบ | ด้านการมีส่วนร่วม | ด้านการสื่อสาร | รวม Sprint 3 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| ปฏิภาณ นามสีลี (ท็อป) | Coder | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| กฤษฎา สายวัน (กาย) | Debugger | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| ภีรภัทร ด่านภูมิพัฒนา (ภีม) | Planner | 9.5 | 9.5 | 9.5 | 9.5 / 10 |
| ปฏิพัฒน์ หอทอง (ปลั๊ก) | Coder | 9.0 | 9.0 | 9.0 | 9.0 / 10 |

---

## ✨ สรุปฟีเจอร์ทั้งหมดของระบบ (Features Overview - Fully Implemented)

### 🟢 ฟีเจอร์แกนหลักและระบบวิเคราะห์ (Core Engine & NLP - Complete)

- 🧠 **Emotion Classifier** (`src/emotion_client.py`): ประมวลผลและจำแนกอารมณ์ความรู้สึกจากข้อความ 6 อารมณ์หลัก (joy, sadness, anger, fear, love, surprise) ด้วย Hugging Face DistilBERT พร้อมระบบ Defensive Fallback Unwrapping (ใช้ `isinstance` Check) ป้องกันข้อผิดพลาด
- 🎨 **Color Psychology Mapping** (`src/palette_engine.py`): แมปอารมณ์ความรู้สึกเข้ากับกลุ่มโค้ดสี Hex 5 สี ตามหลักจิตวิทยาของสี (Color Psychology)
- 🖼️ **Palette Visualizer** (`src/visualizer.py`): สร้างภาพตัวอย่างการจัดวางแถบสี (Color Swatch) ด้วย `matplotlib` ในโทน Dark Theme
- 💻 **CLI Interactive Loop** (`src/cli_app.py` & `main.py`): หน้าต่างปฏิสัมพันธ์ Command Line Interface พร้อมระบบ Input Validation

### 🟢 ระบบบันทึกข้อมูล รายงานผล และ AI คำแนะนำ (Persistence & AI Advisory - Complete)

- 💾 **History Database** (`src/data_store.py`): บันทึกประวัติการวิเคราะห์ (ข้อความ, อารมณ์, confidence, palette, timestamp) ลง Local SQLite (`palette_history.db`)
- ☁️ **Cloud Database Migration** (`src/data_store.py`): รองรับโครงสร้างการจัดเก็บข้อมูลย้ายไปยัง Cloud Database (Supabase PostgreSQL)
- 📤 **Palette Export** (`src/report_generator.py`): ส่งออกจานสีเป็นไฟล์ `.json` และ CSS variables เพื่อให้นักพัฒนานำไปใช้งานต่อได้ทันที
- 📑 **Batch Processing** (`src/report_generator.py`): อ่านข้อความหลายบรรทัดจากไฟล์ `.csv` สรุปผลการวิเคราะห์เป็นชุดข้อมูลส่งออก
- 🤖 **AI Design Advisory** (`src/ai_advisory.py`): ประมวลผลคำแนะนำด้านการออกแบบ เช่น ชื่อแนวคิดธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และเทคนิคการใช้งาน UI
- ♿ **Accessibility Checker** (`src/palette_engine.py`): คำนวณ Contrast Ratio ตามมาตรฐาน WCAG 2.1 แจ้งเตือนสถานะ PASS (AAA) / PASS (AA) / FAIL

### 🟢 หน้าเว็บแอปพลิเคชันและการติดตั้งระบบ (Web Dashboard & Deployment - Complete)

- 🌐 **Web Dashboard Interface** (`web/index.html`): หน้าเว็บแดชบอร์ดสไตล์ Glassmorphism UI สำหรับพิมพ์ข้อความ วิเคราะห์อารมณ์ และแสดงจานสี
- 🌏 **Bilingual UI Support** (`web/style.css`, `web/app.js`): ระบบสลับภาษาการแสดงผลหน้าเว็บได้ 2 ภาษา (ไทย/อังกฤษ - TH/EN Toggle)
- 📷 **Image Mood Input** (`web/index.html`): อัปโหลดรูปภาพเพื่อสกัดโทนสีหลัก (Color Palette Extraction) นำมาเปรียบเทียบกับชุดสีที่ระบบแนะนำ
- 🚀 **GitHub Actions CI/CD** (`.github/workflows/deploy-web.yml`): ระบบ CI/CD จัดส่งหน้าเว็บไปยัง GitHub Pages อัตโนมัติเมื่อมี commit บนกิ่งหลัก

---

## 📅 สรุปผลการทำงานจริงตามแผนงาน (3 Sprints Roadmap)

### 1. Sprint 1: Core System Foundation & OOP CLI Architecture (Completed)

- **สถานะ:** ✅ เสร็จสมบูรณ์
- **รายละเอียดงาน:**
  - พัฒนา `src/emotion_client.py` เชื่อมต่อ Hugging Face DistilBERT Pipeline พร้อมระบบ Defensive Fallback
  - พัฒนา `src/palette_engine.py` สื่อสารตารางแมปอารมณ์ 6 ประเภทสู่กลุ่มสีจิตวิทยา
  - พัฒนา `src/visualizer.py` วาดภาพ Swatch รูปแบบ Visual Swatches ผ่าน `matplotlib`
  - พัฒนา `src/cli_app.py` & `main.py` ทำระบบ Interactive Command Line พร้อมโหมด `--batch`
  - พัฒนาชุดทดสอบระบบอัตโนมัติเบื้องต้นใน `tests/test_emotion_client.py`

### 2. Sprint 2: Persistence, Report & AI Advisory (Completed)

- **สถานะ:** ✅ เสร็จสมบูรณ์
- **รายละเอียดงาน:**
  - พัฒนา `src/data_store.py` บันทึกข้อมูลลง SQLite (`data/palette_history.db`) พร้อมรองรับการ Sync ขึ้น Cloud
  - พัฒนา `src/report_generator.py` ประมวลผลไฟล์ Batch CSV และระบบ Export โค้ดสี JSON/CSS
  - พัฒนา `src/ai_advisory.py` สร้างคำแนะนำแนวคิดดีไซน์ และ Font Pairings ตามอารมณ์
  - เพิ่มฟังก์ชันคำนวณอัตราส่วนความต่างสี (WCAG Contrast Ratio) ใน `palette_engine.py`

### 3. Sprint 3: Web Dashboard & Deployment (Completed)

- **สถานะ:** ✅ เสร็จสมบูรณ์
- **รายละเอียดงาน:**
  - พัฒนา `web/index.html`, `style.css`, `app.js` สร้าง Frontend Responsive Glassmorphic UI
  - พัฒนาระบบ Bilingual Toggle (TH/EN) และ Image Color Extractor สกัดสีจากรูปภาพ
  - ตั้งค่า GitHub Actions `.github/workflows/deploy-web.yml` สั่ง Deploy หน้าเว็บไปยัง GitHub Pages อัตโนมัติ

---

## 🧩 โมดูลหลักของระบบ (Core Components)

### `src/emotion_client.py` (EmotionClient)
- ทำหน้าที่เป็น Client Gateway รับข้อความภาษาอังกฤษ
- ประมวลผลด้วยโมเดล `bhadresh-savani/distilbert-base-uncased-emotion`
- มีระบบ Defensive Fallback Unwrapping เช็ก `isinstance` เพื่อป้องกัน `TypeError` จาก Nested List Structure

### `src/palette_engine.py` (PaletteEngine)
- ทำหน้าที่แปลงอารมณ์ความรู้สึกให้เป็นกลุ่มสี Hex Code 5 สี ตามหลัก Color Psychology
- คำนวณค่าสัมพัทธ์ความสว่าง (Relative Luminance) และค่า Contrast Ratio ตามมาตรฐาน WCAG 2.1

### `src/data_store.py` (DataStore)
- จัดเก็บข้อมูลยั่งยืน (Persistence Storage) ลงฐานข้อมูล SQLite3 (`data/palette_history.db`)
- มีฟังก์ชันรองรับการ Migrate และ Sync ข้อมูลไปยัง Supabase Cloud Database

### `src/ai_advisory.py` (AIAdvisory)
- ทำหน้าที่เป็นผู้ช่วยดีไซเนอร์ ประมวลผลและเสนอชื่อธีม (Theme Name), การจับคู่ฟอนต์ (Font Pairings), และคำแนะนำการนำไปใช้งานตามอารมณ์

### `src/report_generator.py` (ReportGenerator)
- อ่านไฟล์ข้อมูลชุด (`.csv`) วิเคราะห์อารมณ์และแนะนำจานสีแบบยกชุด
- แปลงข้อมูลจานสีให้อยู่ในรูปแบบไฟล์ `.json` และ `.css` (CSS Variables) เพื่อให้นักพัฒนานำไปใช้ต่อได้ทันที

### `src/cli_app.py` (CLIApp)
- หน้าต่างปฏิสัมพันธ์ Command Line Interface (CLI) รับอินพุต ทำความสะอาดข้อความ
- แสดงผลอารมณ์ ค่าความมั่นใจ จานสีแนะนำ พร้อมสั่งวาด Swatches และบันทึกประวัติอัตโนมัติ

### `main.py` (Main Controller)
- จุดเริ่มต้นหลักของแอปพลิเคชัน รองรับทั้ง Interactive CLI Mode (`python main.py --cli`) และ Batch File Processing Mode (`python main.py --batch <file_path>`)

---

## 🗂️ โครงสร้างไดเรกทอรีล่าสุด (Directory Structure)

```text
Final-Project/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD Deployment Scripts
│       └── deploy-web.yml
├── src/                        # Core Python Application Modules
│   ├── __init__.py
│   ├── emotion_client.py       # Hugging Face DistilBERT Classifier
│   ├── palette_engine.py       # Color Psychology & WCAG Calculator
│   ├── visualizer.py           # Matplotlib Swatch Renderer
│   ├── cli_app.py              # CLI Interactive Interface
│   ├── data_store.py           # SQLite Local & Cloud Migration Support
│   ├── report_generator.py     # Batch CSV Processing & Export (.css / .json)
│   └── ai_advisory.py          # Design Advisory & Font Pairings
├── web/                        # Frontend Web Application Dashboard
│   ├── index.html              # Glassmorphic UI Dashboard
│   ├── style.css               # Responsive Styling
│   └── app.js                  # UI Interaction & Image Mood Extractor
├── tests/                      # Automated Unit Testing Suites
│   ├── test_emotion_client.py
│   ├── test_palette_engine.py
│   ├── test_data_store.py
│   └── test_report.py
├── data/                       # Data Storage & Batch Processing
│   ├── palette_history.db      # SQLite Local Database (Auto-generated)
│   └── sample_batch.csv        # Sample File for Batch Mode Testing
├── main.py                     # Main Entry Point (--cli, --batch)
├── requirements.txt            # Project Dependencies
└── README.md                   # Project Documentation
```

---

## 💻 วิธีใช้งานและการติดตั้งระบบ (Installation & Live Deployment)

### 1. ความต้องการของระบบ (Prerequisites)

- **สำหรับฝั่ง Web Dashboard (Online):** สามารถใช้งานผ่านเว็บเบราว์เซอร์ยุคใหม่ (Chrome, Edge, Safari, Firefox) ได้ทันทีโดยไม่ต้องติดตั้งโปรแกรมใดๆ
- **สำหรับฝั่ง Python CLI / Local Testing:**
  - Python 3.9 ขึ้นไป
  - Git

### 2. การเข้าใช้งานผ่านระบบออนไลน์ (Live Web Dashboard)

คุณสามารถทดลองใช้งานเว็บแอปพลิเคชันรูปแบบออนไลน์ (Client-Side AI Processing 100%) ได้ทันทีผ่าน GitHub Pages โดยไม่ต้องติดตั้งระบบภายในเครื่อง:

👉 [**เข้าใช้งาน Smart Art & Palette Sentiment Analyzer Web Dashboard**](https://peeraphatda.github.io/Final-Project/)

> **Note:** ระบบวิเคราะห์อารมณ์และสกัดสีจากรูปภาพบนหน้าเว็บ ประมวลผลผ่าน WebAssembly / ONNX Runtime บนเบราว์เซอร์ของผู้ใช้โดยตรง จึงรับประกันความเร็ว ความเป็นส่วนตัว และไม่ต้องพึ่งพา Backend API ภายนอก

### 3. วิธีการติดตั้งและรันโปรแกรม

```bash
# 1. ติดตั้ง Dependencies
pip install -r requirements.txt

# 2. รันหน้าเว็บแดชบอร์ด (Web Dashboard) – แนะนำ
python -m http.server 8000
# หรือ
python main.py --web

# 3. รันโปรแกรมในโหมดโต้ตอบ (Interactive CLI)
python main.py --cli
# (สามารถเลือกเมนูเพื่อวิเคราะห์อารมณ์และสร้างจานสีได้เช่นกัน)

# 4. รันโปรแกรมในโหมดประมวลผลเป็นชุด (Batch Processing Mode)
python main.py --batch data/sample_batch.csv

# 5. รันชุดทดสอบระบบอัตโนมัติ (Automated Testing)
pytest
```
