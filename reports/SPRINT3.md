# 📌 แบบรายงานผลการดำเนินงาน Sprint 3

- **ชื่อโปรเจกต์:** Virtual Pet (AI Companion)
- **สัปดาห์ที่:** 3 (Sprint 3: Full Integration, GUI/Web & Cloud Deployment)
- **สมาชิกในทีม:**
  - Team Leader: ยีนส์
  - Planner: อาอิง
  - Coder: แคร์
  - Debugger / QA: ปริม

## 1. สรุปความก้าวหน้าของงาน (Sprint Progress Summary)
- [x] พัฒนาหน้าจอ Web Dashboard / GUI อินเทอร์เฟซโปรเซสด้วย Streamlit / Web UI
- [x] สกัดการแสดงผลสถานะสัตว์เลี้ยงเป็น แถบพลังงาน (Progress Bar) และภาพเคลื่อนไหว/การแสดงผลอารมณ์
- [x] รวมระบบทั้งหมด (Front-End, Back-End, AI Engine, Database) เข้าด้วยกันอย่างสมบูรณ์
- [x] Deploy ระบบขึ้น Cloud (Streamlit Community Cloud / Render / GitHub Pages)
- [x] จัดทำคู่มือการใช้งานแบบละเอียดและไฟล์ `README.md` ฉบับสมบูรณ์พร้อมวิดีโอสาธิตการใช้งาน
- [x] ส่งมอบงานชิ้นสุดท้ายและเปิดให้ทดสอบการใช้งานจริง (Live Demo)

## 2. ผลการทดสอบระบบ (Quality Assurance & Debugging Report)

### 2.1 Unit & End-to-End Tests (`pytest`)
รันคำสั่ง `pytest -v` — ผลลัพธ์: **18 passed in 0.45s**

| รายการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|
| `test_full_game_loop` | วนลูปการทำงานตั้งแต่นำเข้า บันทึก และโต้ตอบ | ทำงานถูกต้องไร้ข้อผิดพลาด | PASSED |
| `test_gui_state_sync` | UI อัปเดตตามสถานะใน Database ทันที | ค่าบน UI ตรงกับ DB 100% | PASSED |
| `test_api_rate_limiting` | จัดการการเรียกใช้ API ถี่เกินไปได้ถูกต้อง | แสดงสัญลักษณ์รอโดยไม่พัง | PASSED |
| `test_cloud_env_variables` | โหลด API_KEY จาก Environment Variables บน Cloud | โหลดค่าสำเร็จ ปลอดภัย | PASSED |

### 2.2 Manual / User Acceptance Test (UAT)
ทดสอบระบบผ่าน Web UI / Cloud Interface

| รายการทดสอบ | อินพุตที่ใช้ | ผลลัพธ์ที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
|---|---|---|---|---|
| การกดปุ่ม Feed บน UI | คลิกปุ่ม "ให้อาหาร" | แถบความหิวเพิ่มขึ้น ตัวการ์ตูนเปลี่ยนท่าทาง | แถบเพิ่มขึ้น UI เปลี่ยนสี/ท่าทาง | PASSED |
| การแชทผ่านช่องรับข้อความ | พิมพ์ "วันนี้เป็นไงบ้าง" | AI ตอบกลับสไตล์สัตว์เลี้ยงบน UI | แสดงข้อความในแชทบับเบิ้ล | PASSED |
| ทดสอบความคงอยู่ของข้อมูล | ปิดหน้าเว็บแล้วเปิดใหม่ | ข้อมูลไม่หาย สัตว์เลี้ยงยังอยู่ | โหลดข้อมูลเดิมสำเร็จ | PASSED |
| การใช้งานบนมือถือ | เปิดลิงก์ Cloud บนสมาร์ทโฟน | อินเทอร์เฟซปรับสเกล responsive | ใช้งานได้สมบูรณ์ | PASSED |

## 3. สรุปบทเรียนประจำสัปดาห์ (Retrospective: Wow! & Whoops!)
- **Wow!**: สามารถส่งมอบผลิตภัณฑ์ระบบ AI Companion สัตว์เลี้ยงเสมือนจริงที่ใช้งานผ่าน Cloud ได้จริง มีหน้าตา GUI ที่สวยงาม และโค้ดผ่านสถาปัตยกรรมที่สะอาดเป็นระเบียบตามแผนตั้งแต่วันแรก
- **Whoops!**: บน Cloud Server ฟรีมีจำกัดเรื่องแรม ทำให้การโหลดครั้งแรก (Cold Start) อาจใช้เวลา 3-5 วินาที แก้ไขได้ด้วยการปรับคอนฟิกไฟล์เบาบางลง
- **ลิงก์ Repository:** https://github.com/parima1209/virtual-pet-ai-companion
- **ลิงก์ Live Demo:** https://virtual-pet-ai-companion.streamlit.app

## 4. สิ่งที่ต้องทำต่อหลังส่งมอบงาน (Final Deliverables)
- [x] ตรวจสอบความสมบูรณ์ของเอกสาร `README.md` และลิงก์วิดีโอสาธิต
- [x] รวบรวมรายงาน Sprint 1-3 ส่งให้อาจารย์ประจำวิชา
- [x] แท็ก Release `v1.0.0` บน GitHub Repository