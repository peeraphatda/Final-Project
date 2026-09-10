# Smart Art & Palette Sentiment Analyzer (Sprint 1)

> ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสีสำหรับงานออกแบบ (Color Palette Generation)

[![Open In Colab](https://colab.research.google.com/drive/1J8FnYRJrf7A2H32wCOwMA44GQ7yjYV2L?usp=sharing)

---

## สมาชิกในกลุ่มและบทบาทหน้าที่ (Team Members & Roles)

1. **ปฏิภาณ นามสีลี** 
   * **ชื่อเล่น:** ท็อป
   * **รหัสนักศึกษา:** 683380425-3
   * **Email:** patiphan.na@kkumail.com
   * **Role:** Coder 1 — NLP Pipeline & Model Integration (เชื่อมต่อ Pre-trained Model จาก Hugging Face, จัดการ Text Preprocessing และสกัดค่า Emotion Scores)

2. **กฤษฎา สายวัน** 
   * **ชื่อเล่น:** กาย
   * **รหัสนักศึกษา:** 683380646-7
   * **Email:** kitsada.sai@kkumail.com
   * **Role:** Planner (พัฒนา Core Sentiment Pipeline และระบบแปลงค่าความรู้สึกเป็น Color Palette)

3. **ภีรภัทร ด่านภูมิพัฒนา** 
   * **ชื่อเล่น:** ภีม
   * **รหัสนักศึกษา:** 683380436-8
   * **Email:** peeraphat.da@kkumail.com
   * **Role:** Debugger (ทำ Data Validation, Test Edge Cases, บรรจุระบบ Error Handling & Confidence Thresholds)

4. **ปฏิพัฒน์ หอทอง** 
   * **ชื่อเล่น:** ปลั๊ก
   * **รหัสนักศึกษา:** 683380424-5
   * **Email:** patipat.ho@kkumail.com
   * **Role:** Color Generation Engine & Visualization (ออกแบบฟังก์ชันแปลงค่าอารมณ์เป็น Hex Codes และพัฒนาการเรนเดอร์ภาพแถบสีด้วย matplotlib)

---

## 1. Project Overview & Pitch

* **Project Name:** Smart Art & Palette Sentiment Analyzer
* **Project Pitch:**
  แอปพลิเคชันวิเคราะห์อารมณ์ความรู้สึกจากข้อความที่ต่อยอดไปสู่การช่วยงานครีเอทีฟ โดยไม่เพียงแค่จำแนกอารมณ์ว่าเป็น บวก/ลบ/สุข/เศร้า แต่จะคำนวณและแนะนำ **Color Palette (กลุ่มโค้ดสี Hex 5 สี)** ที่สะท้อนถึงมิติของอารมณ์นั้นๆ ตามหลักจิตวิทยาของสี (Color Psychology) เพื่อช่วยให้ดีไซเนอร์และนักสร้างสรรค์นำไปใช้เป็นแรงบันดาลใจในการออกแบบบรรจุภัณฑ์ แบรนด์ดิ้ง หรืองานกราฟิกได้อย่างรวดเร็ว

---

## 2. Sprint 1 Plan

* **Goal:** พัฒนา Core Engine สำหรับวิเคราะห์อารมณ์จากข้อความ (6 อารมณ์หลัก: Joy, Sadness, Anger, Fear, Surprise, Love) พร้อม Mapping กับทฤษฎีสีเพื่อสร้าง Color Palette (Hex Codes) แสดงผลแถบสี (Color Swatches) ผ่าน Colab/CLI
* **Task Allocation:**
  * `[Planner]` ออกแบบแผนผังการจับคู่อารมณ์กับชุดสี (Emotion-to-Palette Mapping) ตามหลัก Color Psychology
  * `[Coder 1]` เชื่อมต่อ Pre-trained Model (`bhadresh-savani/distilbert-base-uncased-emotion`) จาก Hugging Face และประมวลผล Text Input
  * `[Coder 2]` เขียนระบบแมปค่าอารมณ์ไปเป็น Hex Codes และสร้างระบบสร้างแถบตัวอย่างสี (Visual Swatches) ด้วย `matplotlib`
  * `[Debugger]` ทำ Data Validation แก้ไขปัญหา Output Parsing และจัดการ Edge Cases กรณีข้อความว่างเปล่า

---

## 3. Execution & Source Code

สามารถดูซอร์สโค้ดฉบับเต็มและการประมวลผลการรันแสดงผลได้ในไฟล์ Notebook [Smart_Art_Palette_Sentiment_Analyzer_Sprint1.ipynb](./Smart_Art_Palette_Sentiment_Analyzer_Sprint1.ipynb)

```python
# ตัวอย่างโค้ดเรียกใช้ Sentiment & Palette Generation Engine
from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    return_all_scores=True
)

# ประมวลผลข้อความเพื่อสร้าง Color Palette 5 สี
# (ดูรายละเอียดโค้ดการทำงานทั้งหมดได้ในไฟล์ .ipynb)
