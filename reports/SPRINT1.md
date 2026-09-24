---

### 📄 `reports/SPRINT1.md`

```markdown
# 🚀 Sprint 1 Report: Core System Foundation & OOP CLI Architecture

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)  
**ชื่อโครงการ:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ

---

## 👥 บทบาทและการหมุนเวียนงานใน Sprint 1

| สมาชิก | ชื่อเล่น | บทบาทหน้าที่ใน Sprint 1 |
| :--- | :---: | :--- |
| **นายกฤษฎา สายวัน** | กาย | **Planner / Architect** (วางโครงสร้าง Class, OOP Design & Modular Pipeline) |
| **นายปฏิภาณ นามสีลี** | ท็อป | **Coder / Dev (NLP Pipeline)** (เชื่อมต่อ DistilBERT NLP & Defensive Fallback)[cite: 1] |
| **นายปฏิพัฒน์ หอทอง** | ปลั๊ก | **Coder / Dev (Visualization)** (พัฒนา Matplotlib Swatch Renderer & CLI Layout)[cite: 1] |
| **นายภีรภัทร ด่านภูมิพัฒนา** | ภีม | **Debugger / QA** (เขียน Unit Test & ตรวจสอบ Exception Handling) |

---

## 🎯 สรุปผลการดำเนินงาน (Key Accomplishments)

1. **การพัฒนาระบบประมวลผล NLP (`src/emotion_client.py`):**
   * เชื่อมต่อ Hugging Face Transformers Pipeline ใช้โมเดล `bhadresh-savani/distilbert-base-uncased-emotion`[cite: 1]
   * เพิ่มความเสถียรด้วย **Defensive Fallback Unwrapping** เช็กโครงสร้าง Data Type ด้วย `isinstance` เพื่อป้องกัน `TypeError` จาก Nested List[cite: 1]
2. **การพัฒนาจินตภาพจานสี (`src/palette_engine.py` & `src/visualizer.py`):**
   * สร้างแมปปิ้งตารางสี Hex Code 5 สี ครอบคลุม 6 หมวดหมู่อารมณ์หลัก
   * พัฒนามอดูลวาดภาพ Swatch ด้วย `matplotlib` ในโทน Dark Theme[cite: 1]
3. **การสร้างส่วนต่อประสาน Command Line Interface (`src/cli_app.py` & `main.py`):**
   * ออกแบบโครงสร้างแบบ Interactive Loop รองรับการรับอินพุต ทำความสะอาดข้อความ และแสดงผลจานสีแบบทันที[cite: 1]
4. **ระบบทดสอบคุณภาพ (Unit Testing):**
   * จัดทำชุดทดสอบอัตโนมัติใน `tests/test_emotion_client.py` เพื่อตรวจสอบความถูกต้องของการคืนค่าจาก AI[cite: 1]

---

## 🛠️ เทคโนโลยีและมอดูลที่ใช้
* **Language:** Python 3.9+
* **Libraries:** `transformers`, `torch`, `matplotlib`, `pytest`
* **Architecture Pattern:** Object-Oriented Programming (OOP) & Modular Architecture
