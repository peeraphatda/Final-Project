# 📌 แบบรายงานผลการดำเนินงาน Sprint 2

- **ชื่อโปรเจกต์:** Virtual Pet (AI Companion)
- **สัปดาห์ที่:** 2 (Sprint 2: Back-End Dev & API Integration)
- **สมาชิกในทีม:**
  - Team Leader: ยีนส์
  - Planner: อาอิง
  - Coder: แคร์
  - Debugger / QA: ปริม

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)
- [x] พัฒนา Data Access Layer ด้วย SQLite (`database.py`) บันทึกและโหลดสถานะสัตว์เลี้ยง
- [x] เชื่อมต่อ OpenRouter API (Gemini/Llama) สำหรับระบบสนทนาอัจฉริยะแบบ AI Companion
- [x] พัฒนาฟังก์ชัน `chat` ให้สัตว์เลี้ยงตอบโต้ตามบุคลิกภาพ อารมณ์ และระดับพลังงานปัจจุบัน
- [x] จัดทำระบบจัดการ API Key และการทำ Caching เพื่อประหยัด Token และรองรับกรณี Offline Fallback
- [x] เพิ่ม Unit Tests ครอบคลุมระบบ Database และการสั่งงาน API Mocking (`tests/test_db.py`, `tests/test_api.py`)
- [x] อัปเดต GitHub Repository และทำ Pull Request รวมโค้ดเข้าสู่สายงานหลัก (`main`)

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit Tests (`pytest`)
รันคำสั่ง `pytest -v` — ผลลัพธ์: **12 passed in 0.18s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_db_save_and_load` | บันทึกค่าลง SQLite และอ่านกลับมาได้ถูกต้อง | ข้อมูลตรงกันทุกฟิลด์ | PASSED |
| `test_db_auto_create_table` | สร้างตารางอัตโนมัติหากยังไม่มีไฟล์ DB | สร้างตารางสำเร็จ | PASSED |
| `test_api_connection_mock` | ส่ง Prompt เข้า API แล้วได้ Response สตริงกลับมา | คืนค่า Response ตาม mock | PASSED |
| `test_pet_chat_prompt_generation` | สร้าง Prompt โดยรวมสถานะ mood/hunger เข้าไปด้วย | Prompt มีค่าสถานะครบ | PASSED |
| `test_offline_fallback_response` | เมื่อไม่มีอินเทอร์เน็ต/API ล่ม ให้ใช้คำตอบสำรอง | แสดงคำตอบแบบ Offline | PASSED |

### 2.2 Manual / CLI Smoke Test
รันโปรแกรมจริงเพื่อทดสอบระบบ Persistence และ AI Chatbot

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| โหลดเซฟเดิม | เปิดโปรแกรมครั้งที่ 2 | โหลดชื่อเดิมและสถานะล่าสุด | โหลด "Buddy" และค่าเดิม | PASSED |
| คุยกับสัตว์เลี้ยง | `chat หิวไหม?` | สัตว์เลี้ยงตอบกลับสอดคล้องกับค่า hunger | ตอบ "หิวมากๆ เลย ขออาหารหน่อย" | PASSED |
| คุยขณะพลังงานต่ำ | `chat ไปวิ่งกัน` | ปฏิเสธตามค่า energy ที่ต่ำ | ตอบ "เหนื่อยมากๆ อยากพักผ่อน" | PASSED |
| ตัดการเชื่อมต่อเน็ต | `chat สวัสดี` | ไม่ Crash แสดงคำตอบ Fallback | ตอบ "โฮ่ง! (โหมดออฟไลน์)" | PASSED |

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)
- **Wow!**: ระบบตอบโต้ด้วย AI ปรับเปลี่ยนตามสถานะจริงของสัตว์เลี้ยงได้สมจริง และมีระบบ Offline Fallback ทำให้แอปไม่พังแม้อินเทอร์เน็ตหลุด
- **Whoops!**: API Response มี Latency ประมาณ 1.5 - 2 วินาที ต้องเพิ่มการแสดงผล Loading Indicator ในระบบตอบกลับ เพื่อให้ UX ลื่นไหลขึ้น
- **ลิงก์ Repository:** https://github.com/parima1209/virtual-pet-ai-companion

## 4. สิ่งที่ต้องทำต่อก่อนส่งงาน Sprint 2 (25/9/69)
- [x] ตรวจสอบความปลอดภัยของไฟล์ `.env` (ไม่หลุดขึ้น GitHub)
- [x] บันทึกวิดีโอสาธิตระบบแชตร่วมกับ AI
- [ ] เตรียมโครงสร้าง Web UI / GUI สำหรับใช้ใน Sprint 3