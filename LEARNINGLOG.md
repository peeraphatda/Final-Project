# 📓 Learning Log

### 💡 Sprint 1 Key Learnings
- **Hugging Face Data Structures:** เรียนรู้ว่า Pipeline Output สามารถส่งค่ากลับมาเป็นทั้ง Single List และ Nested List ได้ ขึ้นอยู่กับ Parameters จึงต้องเขียน `isinstance()` ป้องกัน `TypeError`[cite: 1]
- **Modular Design:** การแยกโค้ดออกเป็น `src/` ทำให้ Coder, Planner และ Debugger ทำงานขนานกันได้โดยโค้ดไม่ชนกัน[cite: 1]

### 💡 Sprint 2 Key Learnings
- **Data Persistence:** การบันทึกข้อมูลแบบ Array หรือ List ใน SQLite ต้อง Serialized เป็น JSON String ก่อนด้วย `json.dumps()`
- **Universal Design (WCAG):** ได้เรียนรู้สูตรการคำนวณ Relative Luminance เพื่อหาอัตราส่วน Contrast Ratio ของสีตัวอักษรกับสีพื้นหลัง

### 💡 Sprint 3 Key Learnings
- **Glassmorphism UI & CI/CD:** การออกแบบ UI ยุคใหม่ด้วย CSS `backdrop-filter` และการตั้งค่า GitHub Actions Automate Deployment ไปยัง GitHub Pages