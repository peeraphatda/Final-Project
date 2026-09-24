# Changelog

All notable changes to the "Smart Art & Palette Sentiment Analyzer" project will be documented in this file.

## [v3.0.0] - Sprint 3: Web Dashboard & Deployment
### Added
- Glassmorphism Web UI interface in `web/index.html`.
- Bilingual UI Engine (TH/EN) in `web/app.js`.
- GitHub Actions CI/CD workflow for GitHub Pages deployment.

## [v2.0.0] - Sprint 2: Persistence, Report & AI Advisory
### Added
- SQLite DB integration in `src/data_store.py`.
- WCAG Contrast Ratio Accessibility Checker in `src/palette_engine.py`.
- Export palettes to `.json` and `.css` in `src/report_generator.py`.
- AI Design Advisory module (`src/ai_advisory.py`).

## [v1.0.0] - Sprint 1: Core Engine & CLI Application
### Added
- DistilBERT Emotion Classification pipeline in `src/emotion_client.py`[cite: 1].
- Emotion to Color Palette Mapping in `src/palette_engine.py`[cite: 1].
- Interactive CLI Loop in `src/cli_app.py`[cite: 1].
- Bug fix for Hugging Face output nested list structure using `isinstance()`[cite: 1].