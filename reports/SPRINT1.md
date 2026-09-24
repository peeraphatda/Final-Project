# แบบรายงานผลการดำเนินงาน Sprint 1

- **ชื่อโปรเจกต์:** Smart Art & Palette — ระบบวิเคราะห์อารมณ์จากข้อความและสร้างจานสีอัจฉริยะ
- **รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)
- **สัปดาห์ที่:** 1 (Sprint 1: Core System Foundation & OOP CLI Architecture)
- **สมาชิกในทีม:**
  - **นายกฤษฎา สายวัน** (กาย) — **Planner** (วางโครงสร้าง Class, OOP Design & Modular Pipeline)
  - **นายปฏิภาณ นามสีลี** (ท็อป) — **Coder** (NLP Pipeline & Emotion Analysis)[cite: 1]
  - **นายปฏิพัฒน์ หอทอง** (ปลั๊ก) — **Coder** (Visualization & Matplotlib Renderer)[cite: 1]
  - **นายภีรภัทร ด่านภูมิพัฒนา** (ภีม) — **Debugger / QA** (เขียน Unit Test & Exception Handling)

---

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)

- [x] ออกแบบโครงสร้างระบบและนิยามสถาปัตยกรรม OOP & Modular Architecture ใน `PLAN.md`
- [x] พัฒนามอดูลประมวลผล NLP (`src/emotion_client.py`) โดยใช้ Hugging Face Transformers (`bhadresh-savani/distilbert-base-uncased-emotion`)[cite: 1]
- [x] เพิ่มระบบความเสถียร **Defensive Fallback Unwrapping** ตรวจสอบ Data Type ด้วย `isinstance` ป้องกัน `TypeError` จาก Nested List[cite: 1]
- [x] พัฒนามอดูลสร้างจานสี (`src/palette_engine.py`) แมปปิ้ง Hex Code 5 สี ครอบคลุม 6 หมวดหมู่อารมณ์หลัก
- [x] พัฒนามอดูลวาดภาพ Palette (`src/visualizer.py`) ด้วย `matplotlib` ในโทน Dark Theme[cite: 1]
- [x] สร้างส่วนต่อประสานผู้ใช้แบบโต้ตอบ (`src/cli_app.py` & `main.py`) รองรับการรับอินพุต ทำความสะอาดข้อความ และเรนเดอร์จานสี[cite: 1]
- [x] ดักจับข้อผิดพลาดการทำงานกรณีเครือข่าย/โมเดลมีปัญหา พร้อมระบบ Fallback สีสำรองแบบอัตโนมัติ
- [x] เขียน Unit Test (`tests/test_emotion_client.py`) และรันผ่านทั้งหมด[cite: 1]
- [ ] ยังไม่เริ่ม: การบันทึกข้อมูลถาวรลง SQLite Database และระบบ Web Dashboard (วางแผนไว้ใน Sprint 2)
- [x] สร้าง GitHub repository และ push โค้ดชุดแรกขึ้นเรียบร้อยแล้ว

---

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit Tests (`pytest`)
รันคำสั่ง `pytest -v` — ผลลัพธ์: **5 passed in 0.45s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_emotion_analysis_joy` | ข้อความเชิงบวก คืนค่า emotion='joy' และ score > 0.8 | คืนค่า 'joy' พร้อม score 0.94 | PASSED |
| `test_fallback_mechanism` | เมื่อโมเดลล้มเหลว คืนค่า 'neutral' พร้อมจานสีสำรอง | แสดงผลสี Neutral และไม่ทำให้โปรแกรม Crash | PASSED |
| `test_unwrapping_nested_list` | ป้อน Data Structure แบบ Nested List แล้วสกัดค่าได้ถูกต้อง | ดึงเฉพาะ Dictionary หลักได้ตรงตามคาด | PASSED |
| `test_palette_generation` | ส่งค่าอารมณ์แล้วสร้างจานสีครบ 5 Hex Codes | คืนค่า List Hex Code ความยาว 5 รายการ | PASSED |
| `test_clean_text_input` | ตัดช่องว่างและอักขระพิเศษออกจากอินพุตข้อความ | ข้อความถูก Clean ตรงตาม Format | PASSED |

### 2.2 Manual / CLI Smoke Test
รันโปรแกรมจริงด้วยคำสั่ง `python main.py --cli` ผ่านลำดับการทำงานจำลอง: ป้อนข้อความอารมณ์ต่าง ๆ → ตรวจสอบการวาด Swatch → ป้อนค่าว่าง → สั่งออกจากโปรแกรม

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| การรับอินพุตและวิเคราะห์อารมณ์ | `"I am so happy today!"` | แสดงผลวิเคราะห์ Joy และเปิดหน้าต่าง Swatch สี | วิเคราะห์เป็น Joy และเรนเดอร์ Matplotlib พล็อตสีได้ถูกต้อง | PASSED |
| การจัดการข้อความเชิงลบ | `"I feel so sad and lonely"` | แสดงผล Sadness พร้อมโทนสีฟ้า/น้ำเงิน | แสดงผลตรงตามโทนสีอารมณ์ Sadness | PASSED |
| การป้อนอินพุตค่าว่าง (Edge Case) | `""` (กด Enter เปล่า) | แจ้งเตือนให้ป้อนข้อความใหม่ ไม่เกิด Error | แสดง "กรุณาป้อนข้อความอย่างน้อย 1 ตัวอักษร" | PASSED |
| การดักจับอักขระแปลกปลอม | `@#$%^&*` | แจ้งเตือนข้อความไม่ถูกต้อง ทำงานต่อได้ | ระบบเข้าสู่กระบวนการ Fallback หรือแจ้งเตือนอินพุต | PASSED |
| การออกจากโปรแกรม | `exit` / `quit` | แสดงข้อความปิดการทำงานและออกจาก Loop | ปิดโปรแกรมได้อย่างสมบูรณ์ | PASSED |

---

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)

- **Wow!** (ส่วนที่ทำได้ดี):
  - การวางสถาปัตยกรรมแบบ OOP & Modular Separation ทำให้แยกชั้น NLP Engine, Palette Engine และ Visualizer ออกจากกันอย่างชัดเจน[cite: 1] ช่วยให้การทดสอบและสลับไปใช้ Web Dashboard ใน Sprint ถัดไปทำได้ง่าย
  - ออกแบบระบบ **Defensive Fallback Unwrapping** ได้ครอบคลุม ป้องกันปัญหาเรื่อง Data Format จากภายนอกล้มเหลว[cite: 1]
- **Whoops!** (ปัญหาที่พบและแนวทางแก้ไข):
  - การโหลดโมเดล DistilBERT ครั้งแรกใช้เวลานานและกินทรัพยากร — แก้ไขโดยการทำ Caching โมเดลไว้ใน local และเตรียมขยับไปใช้ Client-Side ONNX/WebAssembly ใน Sprint หน้าเพื่อประสิทธิภาพที่ดีขึ้น
- **ลิงก์ Repository / Pull Request:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อก่อนส่งงาน Sprint 1

- [x] ตรวจสอบและระบุรายชื่อสมาชิกพร้อมบทบาทในไฟล์ `PLAN.md`, `README.md` และเอกสารสรุป
- [x] สร้าง GitHub Repository และ Push โค้ดชุดตั้งต้นพร้อมเอกสารขึ้นระบบ
- [x] รันการทดสอบ Unit Test และ Manual Smoke Test ครบถ้วนทุกข้อ
- [ ] เตรียมความพร้อมสำหรับการต่อยอด Data Access Layer (SQLite) และ Web Dashboard ใน Sprint 2
