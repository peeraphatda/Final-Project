# Smart Art & Palette Sentiment Analyzer (Sprint 1)

> ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสีสำหรับงานออกแบบผ่าน Command Line Interface (CLI)

**Google Colab Notebook:** [กดที่นี่เพื่อเปิดดู Google Colab](https://colab.research.google.com/drive/10bgPo_R8iiEEitrnFC8ZJkmdZS2GU6Hr?usp=sharing)

---

##  รายชื่อสมาชิกในกลุ่มและบทบาทหน้าที่ (Team Members & Roles)

1. **ปฏิภาณ นามสีลี (ท็อป)**  
   * **รหัสนักศึกษา:** 683380425-3 | **Email:** patiphan.na@kkumail.com
   * **Role:** Coder 1 — NLP Pipeline & Model Integration (เชื่อมต่อ Pre-trained Model จาก Hugging Face, จัดการ Text Preprocessing และสกัดค่า Emotion Scores)

2. **กฤษฎา สายวัน (กาย)**  
   * **รหัสนักศึกษา:** 683380646-7 | **Email:** kitsada.sai@kkumail.com
   * **Role:** Planner — System Architecture & Color Mapping (วางโครงสร้างระบบ CLI, กำหนด Definition of Done และจัดทำ Emotion-to-Palette Mapping ตามหลัก Color Psychology)

3. **ภีรภัทร ด่านภูมิพัฒนา (ภีม)**  
   * **รหัสนักศึกษา:** 683380436-8 | **Email:** peeraphat.da@kkumail.com
   * **Role:** Debugger — Data Validation & Quality Assurance (ตรวจสอบ Input Validation, จัดการ Error Handling & Edge Cases และทดสอบการทำงานของ CLI Loop)

4. **ปฏิพัฒน์ หอทอง (ปลั๊ก)**  
   * **รหัสนักศึกษา:** 683380424-5 | **Email:** patipat.ho@kkumail.com
   * **Role:** Coder 2 — Color Engine & Visualization (ออกแบบฟังก์ชันแปลงค่าอารมณ์เป็น Hex Codes, พัฒนาการเรนเดอร์ภาพแถบสีด้วย `matplotlib` และเขียน CLI Main Loop)

---

## 1. Project Overview & Pitch

* **Project Name:** Smart Art & Palette Sentiment Analyzer
* **Project Pitch:**
  แอปพลิเคชันวิเคราะห์อารมณ์ความรู้สึกจากข้อความที่ต่อยอดไปสู่การช่วยงานครีเอทีฟ โดยไม่เพียงแค่จำแนกอารมณ์ว่าเป็น บวก/ลบ/สุข/เศร้า แต่จะคำนวณและแนะนำ **Color Palette (กลุ่มโค้ดสี Hex 5 สี)** ที่สะท้อนถึงมิติของอารมณ์นั้นๆ ตามหลักจิตวิทยาของสี (Color Psychology) ผ่านหน้าต่าง CLI เพื่อช่วยให้ดีไซเนอร์และนักสร้างสรรค์นำไปใช้เป็นแรงบันดาลใจในการออกแบบบรรจุภัณฑ์ แบรนด์ดิ้ง หรืองานกราฟิกได้อย่างรวดเร็ว

---

## 2. Sprint 1 Plan & Definition of Done

* **Sprint Goal:** พัฒนา Core Engine สำหรับวิเคราะห์อารมณ์จากข้อความ (6 อารมณ์หลัก: Joy, Sadness, Anger, Fear, Surprise, Love) ผ่านระบบ CLI Interactive Loop ที่รับอินพุตได้อย่างต่อเนื่อง พร้อม Mapping กับทฤษฎีสีเพื่อแสดงผล Hex Codes และเรนเดอร์แถบสี (Visual Swatches)
* **Definition of Done (DoD):**
  1. โปรแกรมแสดงข้อความต้อนรับและรับคำสั่งจากผู้ใช้ได้อย่างต่อเนื่องด้วย `while True` loop
  2. เมื่อพิมพ์คำสั่ง `quit` หรือ `exit` (ไม่ว่าจะตัวพิมพ์เล็กหรือใหญ่) โปรแกรมต้องหยุดทำงานและออกจากระบบทันที
  3. เมื่อผู้ใช้กด Enter โดยไม่พิมพ์ข้อความ โปรแกรมต้องแสดงคำเตือนและไม่พัง (Error Handling)
  4. สามารถวิเคราะห์และเรนเดอร์ภาพแถบสี (Visual Swatches) ออกมาได้ถูกต้องตามอารมณ์ที่ประมวลผลได้

---

## 3. Execution & Source Code

สามารถดูซอร์สโค้ดฉบับเต็มและการประมวลผลการรันแสดงผลได้ในไฟล์ Notebook  [Sprint_1.ipynb](./Sprint_1.ipynb)

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from transformers import pipeline

# [Coder 1 - ท็อป] โหลด Pre-trained Model สำหรับ Emotion Classification
print("Loading Emotion Analysis Model...")
emotion_classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    return_all_scores=True
)
print("Model loaded successfully!\n")

# [Planner - กาย] แผนผังสีตามทฤษฎีจิตวิทยาของสี (Color Psychology Mapping)
COLOR_PALETTE_MAP = {
    "joy": {
        "mood": "Joyful & Energetic",
        "palette": ["#FFD700", "#FFA500", "#FF69B4", "#FFFACD", "#20B2AA"],
        "names": ["Golden Yellow", "Bright Orange", "Hot Pink", "Lemon Chiffon", "Light Sea Green"]
    },
    "sadness": {
        "mood": "Melancholy & Calming",
        "palette": ["#1C2D42", "#3B5998", "#6C7A89", "#A2B9BC", "#E0E7E9"],
        "names": ["Midnight Blue", "Muted Navy", "Slate Grey", "Dusty Blue", "Soft Fog"]
    },
    "anger": {
        "mood": "Intense & Fiery",
        "palette": ["#8B0000", "#D32F2F", "#FF5722", "#333333", "#FFC107"],
        "names": ["Crimson Red", "Vibrant Red", "Burnt Orange", "Charcoal Black", "Amber Gold"]
    },
    "fear": {
        "mood": "Mysterious & Tense",
        "palette": ["#211A1E", "#4A3E3D", "#8E7DBE", "#2A4747", "#D1D5DB"],
        "names": ["Dark Shadow", "Deep Espresso", "Muted Purple", "Deep Teal", "Ash Grey"]
    },
    "surprise": {
        "mood": "Vibrant & Unexpected",
        "palette": ["#FF007F", "#7B1FA2", "#00E5FF", "#CCFF00", "#2D1E2F"],
        "names": ["Electric Pink", "Deep Violet", "Cyan Neon", "Lime Accent", "Dark Plum"]
    },
    "love": {
        "mood": "Warm & Romantic",
        "palette": ["#E91E63", "#F48FB1", "#FFCDD2", "#880E4F", "#FFF8E7"],
        "names": ["Rose Pink", "Soft Blush", "Pastel Pink", "Deep Rose", "Warm Vanilla"]
    }
}

def analyze_and_generate_palette(text: str):
    """
    Core Pipeline Engine Function (Coder 1 - ท็อป & Coder 2 - ปลั๊ก)
    """
    # Emotion Prediction & Output Parsing Fix
    results = emotion_classifier(text)
    
    if isinstance(results[0], list):
        sorted_results = sorted(results[0], key=lambda x: x['score'], reverse=True)
        top_emotion = sorted_results[0]['label']
        top_score = sorted_results[0]['score']
    else:
        top_emotion = results[0]['label']
        top_score = results[0]['score']
    
    palette_data = COLOR_PALETTE_MAP.get(top_emotion, COLOR_PALETTE_MAP["joy"])
    
    # Display Output Text
    print("\n" + "="*50)
    print(f" Input Text: \"{text}\"")
    print(f" Primary Emotion: {top_emotion.upper()} ({top_score*100:.2f}% Confidence)")
    print(f" Design Mood Concept: {palette_data['mood']}")
    print("="*50)
    print("Suggested Hex Colors:")
    for hex_code, color_name in zip(palette_data['palette'], palette_data['names']):
        print(f"  • {hex_code} ({color_name})")
    print()
    
    # [Coder 2 - ปลั๊ก] Render Visual Color Palette Block
    fig, ax = plt.subplots(figsize=(8, 2.2))
    ax.set_xlim(0, len(palette_data['palette']))
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    for idx, (hex_code, color_name) in enumerate(zip(palette_data['palette'], palette_data['names'])):
        rect = patches.Rectangle((idx, 0.3), 1, 0.7, linewidth=0, facecolor=hex_code)
        ax.add_patch(rect)
        ax.text(idx + 0.5, 0.18, hex_code, ha='center', va='center', fontsize=9, fontweight='bold')
        ax.text(idx + 0.5, 0.06, color_name, ha='center', va='center', fontsize=8, color='#555555')
    
    plt.title(f"Smart Palette Preview — {top_emotion.upper()} ({palette_data['mood']})", fontsize=11, pad=10)
    plt.tight_layout()
    plt.show()
    print("\n")

def main():
    """
    [Coder 2 - ปลั๊ก & Debugger - ภีม] CLI Interactive Loop
    """
    print("="*50)
    print(" Welcome to Smart Art & Palette Sentiment Analyzer (CLI)")
    print("คำแนะนำ: พิมพ์ข้อความภาษาอังกฤษเพื่อวิเคราะห์ หรือพิมพ์ 'quit' เพื่อออกจากระบบ")
    print("="*50 + "\n")
    
    while True:
        try:
            # [Debugger - ภีม] Input Sanitization (.strip())
            user_input = input("Enter your text prompt (or 'quit' to exit): ").strip()
            
            # [Debugger - ภีม] Checking Exit Command (.lower())
            if user_input.lower() in ['quit', 'exit']:
                print("\nขอบคุณที่ใช้งานระบบ Smart Art & Palette! ออกจากโปรแกรมเรียบร้อยแล้ว ")
                break
            
            # [Debugger - ภีม] Edge Case: Empty String Checking
            if not user_input:
                print(" คำเตือน: ข้อความนำเข้าต้องไม่เป็นช่องว่าง! กรุณาลองใหม่อีกครั้ง\n")
                continue
                
            # Run Analysis Pipeline
            analyze_and_generate_palette(user_input)
            
        except KeyboardInterrupt:
            print("\n\nยกเลิกการทำงาน ขอบคุณที่ใช้งานครับ ")
            break
        except Exception as e:
            print(f"\n เกิดข้อผิดพลาดไม่คาดคิด: {e}\n")

if __name__ == "__main__":
    main()
