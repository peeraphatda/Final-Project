# 📌 แบบรายงานผลการดำเนินงาน Sprint 1

- **ชื่อโปรเจกต์:** Smart Art & Palette Sentiment Analyzer
- **สัปดาห์ที่:** 1 (Sprint 1: Core Engine & Data Validation)
- **สมาชิกในทีม:**
  - Team Leader / Coder 1: ท็อป
  - Planner: กาย
  - Coder 2: ปลั๊ก
  - Debugger / QA: ภีม

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)
- [x] ออกแบบโครงสร้างสถาปัตยกรรมระบบใน `PLAN.md` ร่วมกับทีมนักพัฒนา
- [x] พัฒนา `src/emotion_client.py` โดยเชื่อมต่อ Hugging Face Pipeline (`distilbert-base-uncased-emotion`)
- [x] พัฒนา `src/palette_engine.py` แมปค่าอารมณ์ออกเป็นชุดโทนสี HEX สดใส
- [x] แก้ไขปัญหา `TypeError` จาก Nested List Structure ด้วย `isinstance` Check
- [x] สร้าง `src/cli_app.py` รองรับการทำงานแบบ Interactive Command Line
- [x] เพิ่ม Input Validation ดักจับกรณีผู้ใช้กรอกข้อความว่างหรือกด Ctrl+C
- [x] เขียน Unit Test สรุปความถูกต้อง (`tests/test_emotion_client.py`) และผ่านทั้งหมด

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit Tests (`pytest`)
รันคำสั่ง `pytest tests/test_emotion_client.py` — ผลลัพธ์: **Passed in 0.04s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_emotion_detection` | รับข้อความภาษาอังกฤษและคืนค่า Label อารมณ์ + Score | คืนค่า "joy" พร้อมค่าความมั่นใจ | PASSED |
| `test_nested_list_handling` | จัดการผลลัพธ์จาก Pipeline รูปแบบ `[[{...}]]` ได้โดยไม่พัง | ดึงค่าอารมณ์ลำดับสูงสุดออกมาได้ถูกต้อง | PASSED |
| `test_palette_mapping` | คืนชุดสี HEX 5 สีตามอารมณ์ที่วิเคราะห์ได้ | คืนค่า List ของ HEX Code 5 สี | PASSED |

### 2.2 Manual / CLI Smoke Test
รันโปรแกรมจริง `python main.py --cli`

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| วิเคราะห์อารมณ์เชิงบวก | `I am feeling super happy today!` | วิเคราะห์ได้ JOY และแนะนำจานสีสดใส | แสดง JOY + จานสีสว่าง | PASSED |
| การป้อนข้อความว่าง | ` ` (กด Spacebar) | แสดงข้อความเตือน ไม่ให้โปรแกรม Crash | แสดง "⚠️ คำเตือน: ข้อความต้องไม่เป็นค่าว่าง!" | PASSED |
| การออกจากโปรแกรม | `quit` | แสดงข้อความอำลาและหลุดจาก Loop | หยุดการทำงานอย่างปลอดภัย | PASSED |

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)
- **Wow!**: ทีมงานแก้ปัญหา `TypeError` ในโมเดล NLP ได้เร็วโดยใช้ Type Guard Validation ทำให้ Pipeline ทำงานได้นิ่งและส่งต่อข้อมูลราบรื่น
- **Whoops!**: โมเดลจำกัดที่ภาษาอังกฤษเป็นหลัก หากป้อนภาษาอื่นค่าความแม่นยำจะลดลง — วางแผนเพิ่มระบบแจ้งเตือนข้อความบน UI ในสปรินท์ถัดไป
- **ลิงก์ Repository:** https://github.com/peeraphatda/Final-Project

---

## 4. สิ่งที่ต้องทำต่อก่อนส่งงาน Sprint 1
- [x] รวบรวมคำสั่งโปรแกรมทั้งหมดเข้าสู่โฟลเดอร์ `src/`
- [x] อัปเดต GitHub Repository และจัดการ Unrelated History Branch
- [x] ทดสอบการเรียกใช้งานผ่านหน้าต่าง Terminal