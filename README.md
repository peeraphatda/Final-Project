# Smart Art & Palette Sentiment Analyzer (Sprint 1)

> ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสีสำหรับงานออกแบบ (Color Palette Generation)

**Google Colab Notebook:** [กดที่นี่เพื่อเปิดดู Google Colab](https://colab.research.google.com/drive/1J8FnYRJrf7A2H32wCOwMA44GQ7yjYV2L?usp=sharing)

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

สามารถดูซอร์สโค้ดฉบับเต็มและการประมวลผลการรันแสดงผลได้ในไฟล์ Notebook [คลิกที่นี่เพื่อเปิดดูไฟล์ Notebook](./Sprint%20_1.ipynb)

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from transformers import pipeline

# [Coder - โชกุน] โหลด Pre-trained Model สำหรับ Emotion Classification
print("Loading Emotion Analysis Model...")
emotion_classifier = pipeline(
    "text-classification",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    return_all_scores=True
)
print("Model loaded successfully!\n")

# [Planner - บอส] แผนผังสีตามทฤษฎีจิตวิทยาของสี (Color Psychology Mapping)
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
    Core Pipeline Engine Function
    """
    # 1. Edge Case Handling (Debugger - โฟน)
    if not text or not text.strip():
        print("Error: Input text cannot be empty!")
        return
    
    # 2. Emotion Prediction & Output Parsing (Coder - โชกุน & Debugger - โฟน)
    results = emotion_classifier(text)
    
    if isinstance(results[0], list):
        sorted_results = sorted(results[0], key=lambda x: x['score'], reverse=True)
        top_emotion = sorted_results[0]['label']
        top_score = sorted_results[0]['score']
    else:
        top_emotion = results[0]['label']
        top_score = results[0]['score']
    
    palette_data = COLOR_PALETTE_MAP.get(top_emotion, COLOR_PALETTE_MAP["joy"])
    
    # 3. Print Structured Output
    print("==================================================")
    print(f"Input Text: \"{text}\"")
    print(f"Primary Emotion: {top_emotion.upper()} ({top_score*100:.2f}% Confidence)")
    print(f"Design Mood Concept: {palette_data['mood']}")
    print("==================================================")
    print("Suggested Hex Colors:")
    for hex_code, color_name in zip(palette_data['palette'], palette_data['names']):
        print(f"  • {hex_code} ({color_name})")
    print()
    
    # 4. Render Visual Color Palette Block (Coder - โชกุน)
    fig, ax = plt.subplots(figsize=(8, 2.2))
    ax.set_xlim(0, len(palette_data['palette']))
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    for idx, (hex_code, color_name) in enumerate(zip(palette_data['palette'], palette_data['names'])):
        rect = patches.Rectangle((idx, 0.3), 1, 0.7, linewidth=0, edgecolor='none', facecolor=hex_code)
        ax.add_patch(rect)
        ax.text(idx + 0.5, 0.18, hex_code, horizontalalignment='center', verticalalignment='center', fontsize=9, fontweight='bold')
        ax.text(idx + 0.5, 0.06, color_name, horizontalalignment='center', verticalalignment='center', fontsize=8, color='#555555')
    
    plt.title(f"Smart Palette Preview — {top_emotion.upper()} ({palette_data['mood']})", fontsize=11, pad=10)
    plt.tight_layout()
    plt.show()
    print("\n")

# --- Demo Test Execution ---
test_prompts = [
    "I am so excited and happy about winning the design award! It feels like a dream come true!",
    "I feel lonely and sad walking through the cold empty streets tonight.",
    "This frustrating error message is driving me absolutely insane! I am furious!",
    "I fell deeply in love with the serene sunset over the ocean."
]

print(" RUNNING SPRINT 1 EXECUTION TEST...\n")
for prompt in test_prompts:
    analyze_and_generate_palette(prompt)
