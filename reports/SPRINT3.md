# 🌐 Sprint 3 Report: Web Dashboard & Cloud Deployment

> **Smart Art & Palette Sentiment Analyzer**  
> **เป้าหมายใน Sprint 3:** พัฒนา Web Dashboard สไตล์ Glassmorphism, ระบบสลับสองภาษา (TH/EN), ฟีเจอร์ Image Mood Extractor และการปรับใช้ระบบขึ้นระบบ Cloud

---

## 🎯 ขอบเขตงานที่เสร็จสิ้นใน Sprint 3

1. **Glassmorphism Web Dashboard (`web/index.html`, `web/style.css`):**
   - ออกแบบหน้าเว็บตอบสนองทุกขนาดหน้าจอ (Responsive) ด้วยสไตล์กระจกฝ้าโปร่งแสง
2. **Bilingual UI Engine (`web/app.js`):**
   - รองรับการกดปุ่มสลับภาษา TH / EN บนหน้าเว็บแบบ Real-time
3. **Image Mood Extractor (`web/app.js`):**
   - เพิ่มระบบลากวางรูปภาพ เพื่อสกัดโทนสีหลักจากไฟล์ภาพด้วย HTML5 Canvas API
4. **CI/CD Deployment (`.github/workflows/deploy-web.yml`):**
   - สคริปต์ GitHub Actions อัตโนมัติสำหรับ Build และ Deploy โฟลเดอร์ `web/` ขึ้นไปที่ **GitHub Pages**

---

## 🚀 Live Demo Deployment

* **GitHub Pages Site:** `https://peeraphatda.github.io/Final-Project/`