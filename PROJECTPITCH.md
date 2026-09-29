# 📢 Final Term Project Pitch

## 1. Project Title
**Smart Art & Palette** — Dynamic Emotion-Based Palette Generator & AI Design Advisory

---

## 2. Problem Statement
Designers and developers often struggle to find color palettes that accurately convey specific emotional tones for UI/UX and visual media. Manual color selection is time-consuming, lacks standardized contrast validation, and does not offer automated design advice (such as font pairings and layout themes) based on textual context.

---

## 3. Proposed Solution
An intelligent NLP-driven application that extracts emotions from user input text and generates a matching 5-color smart palette. It validates WCAG 2.1 accessibility contrast ratios, provides AI design recommendations (font pairings and themes), logs history in SQLite, enables CSV batch processing, and offers an interactive Web Dashboard with image color extraction capabilities.

---

## 4. Domain
✅ NLP / AI & Data Analysis / Design & Developer Tools / Web Application

---

## 5. API(s) / ML Models to Use
* **Model Name:** Hugging Face Transformers (`bhadresh-savani/distilbert-base-uncased-emotion`)[cite: 1]
  * **Documentation Link:** https://huggingface.co/bhadresh-savani/distilbert-base-uncased-emotion
  * **Type of Data:** Text-based emotion analysis (Joy, Sadness, Anger, Fear, Love, Neutral)
* **Client-Side Runtime:** ONNX Runtime / WebAssembly (Client-side AI execution on Web Dashboard)
  * **Documentation Link:** https://onnxruntime.ai/docs/

---

## 6. Data Persistence Plan
* **Local Database:** SQLite (`data/palette_history.db`)
* **Stores:** Input text, predicted emotion, confidence score, 5-color HEX palette, and execution timestamps.
* **Cloud Readiness:** Schema structured for future PostgreSQL / Supabase migration.

---

## 7. Framework Style
* **OOP & Modular Architecture:**
  * `EmotionClient` (NLP Inference Engine & Defensive Fallback)[cite: 1]
  * `PaletteEngine` (Color mapping & WCAG 2.1 contrast calculation)
  * `DataStore` (SQLite persistence manager)
  * `ReportGenerator` (CSV batch processor & JSON/CSS exporter)
  * `AIAdvisory` (Font pairings & design theme advice)

---

## 8. Roles & Responsibilities
* **Planner / System Architect:** Top / Plug / Guy / Peem (Rotated across Sprints 1–3) — Manages repo setup, DB schema design, i18n specification, and GitHub Actions CI/CD setup.
* **Core Developers:** Top / Plug / Guy / Peem (Rotated across Sprints 1–3) — Implements DistilBERT NLP integration, Matplotlib renderer, SQLite store, batch exporter, and Glassmorphism Web UI.
* **Automated Tester & QA Debugger:** Top / Plug / Guy / Peem (Rotated across Sprints 1–3) — Writes unit tests (`pytest`), handles defensive unwrapping exceptions, validates WCAG calculations, and tests cross-browser compatibility.

---

## 9. Features (MVP)
* Analyze text emotion using DistilBERT NLP model[cite: 1].
* Generate a 5-color palette (HEX/RGB) based on emotion.
* Render color swatches in Terminal using Matplotlib[cite: 1].
* Interactive CLI interface with text cleaning and basic exception handling.

---

## 10. Stretch Features (Completed)
* **WCAG 2.1 Contrast Checker:** Computes text/background contrast with PASS (AAA/AA) or FAIL status.
* **AI Design Advisory:** Suggests theme names, font pairings, and UI/UX usage tips based on emotion.
* **Batch Processing & Export:** Reads multi-line text from CSV and exports to `.json` and `.css` (CSS Variables).
* **SQLite Persistence:** Stores execution logs and historical queries in Local SQLite DB.
* **Glassmorphism Web Dashboard & Image Extractor:** Interactive web app hosted on GitHub Pages with image palette extraction and bilingual (TH/EN) support.
* **Automated CI/CD:** Continuous Deployment via GitHub Actions workflow (`deploy-web.yml`).

---

## 11. Evaluation Checklist
* ✅ NLP Model & Emotion Classifier functional with fallback handling.
* ✅ Data persisted in Local SQLite DB (`data/palette_history.db`).
* ✅ Code follows PEP 8 standards and OOP principles.
* ✅ Unit tests pass (`pytest` for core engine, SQLite, and export logic).
* ✅ CI/CD pipeline runs automatically via GitHub Actions and deploys to GitHub Pages.
* ✅ Complete documentation (`README.md`, `CHANGELOG.md`, `LEARNINGLOG.md`, Sprint 1–3 Reports).
* ✅ Roles and rotation logic clearly documented.
