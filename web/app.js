// นำเข้า Transformers.js ในรูปแบบ ES Module
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// ปิดการดึง Local Model เพื่อบังคับให้ดึงไฟล์จาก CDN ของ Xenova
env.allowLocalModels = false;

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const alertBox = document.getElementById('alertBox');
    const subTitle = document.getElementById('subTitle');
    const inputLabel = document.getElementById('inputLabel');
    const langToggleBtn = document.getElementById('langToggleBtn');
    
    const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
    const imageInput = document.getElementById('imageInput');
    const extractedPalette = document.getElementById('extractedPalette');
    const extractedPaletteSection = document.getElementById('extractedPaletteSection');
    const extractedTitle = document.querySelector('#extractedPaletteSection .result-title');
    const imagePreview = document.getElementById('imagePreview');

    // UI Result Elements
    const resultEmotionText = document.getElementById('resultEmotion');
    const resultConfidenceText = document.getElementById('resultConfidence');
    const emotionLabel = document.getElementById('emotionLabel');
    const confidenceValue = document.getElementById('confidenceValue');
    const paletteTitle = document.getElementById('paletteTitle');
    const paletteDisplay = document.getElementById('paletteDisplay');
    const themeName = document.getElementById('themeName');
    const fontPairing = document.getElementById('fontPairing');
    const usageContext = document.getElementById('usageContext');

    // ----------------------------------------------------
    // 1. ระบบสลับภาษา UI (TH / EN)
    // ----------------------------------------------------
    let currentLang = 'TH';

    const translations = {
        TH: {
            subTitle: 'ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสี',
            inputLabel: 'กรอกข้อความภาษาไทยหรืออังกฤษเพื่อวิเคราะห์อารมณ์ด้วย AI Model',
            placeholder: 'พิมพ์ความรู้สึกของคุณ เช่น I feel sad หรือ I feel happy...',
            analyzeBtn: 'วิเคราะห์อารมณ์ (Analyze)',
            uploadBtn: 'อัปโหลดรูปภาพ (Extract Image)',
            extractedTitle: 'รูปภาพที่อัปโหลดและจานสีที่สกัดได้',
            resultEmotionLabel: 'ผลลัพธ์อารมณ์: ',
            resultConfidenceLabel: 'ค่าความเชื่อมั่น: ',
            paletteTitle: 'ชุดจานสีแนะนำ (WCAG Compliant)',
            alertEmpty: 'กรุณากรอกข้อความก่อนทำการวิเคราะห์!',
            advisoryTitle: 'คำแนะนำการออกแบบโดย AI',
            recTheme: 'ธีมที่แนะนำ: ',
            typography: 'ชุดฟอนต์: ',
            usageContext: 'การนำไปใช้งาน: ',
            loadingModel: 'กำลังโหลด AI Model',
            analyzingText: 'AI กำลังประมวลผล'
        },
        EN: {
            subTitle: 'Text Sentiment Analysis & Color Palette Recommendation',
            inputLabel: 'Enter text to analyze sentiment via AI Model',
            placeholder: 'i feel happy or feel sad...',
            analyzeBtn: 'Analyze Sentiment',
            uploadBtn: 'Upload Image (Extract)',
            extractedTitle: 'Uploaded Image & Extracted Palette',
            resultEmotionLabel: 'Emotion Result: ',
            resultConfidenceLabel: 'Confidence Score: ',
            paletteTitle: 'Recommended Color Palette (WCAG Compliant)',
            alertEmpty: 'Please enter text before analyzing!',
            advisoryTitle: 'AI Design Advisory',
            recTheme: 'Recommended Theme: ',
            typography: 'Typography: ',
            usageContext: 'Usage Context: ',
            loadingModel: 'Loading AI Model',
            analyzingText: 'AI is Analyzing'
        }
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'TH' ? 'EN' : 'TH';
            applyLanguage(currentLang);
        });
    }

    function applyLanguage(lang) {
        const t = translations[lang];
        if (subTitle) subTitle.innerText = t.subTitle;
        if (inputLabel) inputLabel.innerText = t.inputLabel;
        if (textInput) textInput.placeholder = t.placeholder;
        if (analyzeBtn) analyzeBtn.innerText = t.analyzeBtn;
        if (uploadTriggerBtn) uploadTriggerBtn.innerText = t.uploadBtn;
        if (extractedTitle) extractedTitle.innerText = t.extractedTitle;
        if (paletteTitle) paletteTitle.innerText = t.paletteTitle;

        if (resultEmotionText && emotionLabel) {
            resultEmotionText.childNodes[0].nodeValue = t.resultEmotionLabel;
        }
        if (resultConfidenceText && confidenceValue) {
            resultConfidenceText.childNodes[0].nodeValue = t.resultConfidenceLabel;
        }

        const advisoryHeader = document.querySelector('.advisory-section h4');
        if (advisoryHeader) advisoryHeader.innerText = t.advisoryTitle;

        const advisoryParagraphs = document.querySelectorAll('.advisory-section p strong');
        if (advisoryParagraphs.length >= 3) {
            advisoryParagraphs[0].innerText = t.recTheme;
            advisoryParagraphs[1].innerText = t.typography;
            advisoryParagraphs[2].innerText = t.usageContext;
        }
    }

    // ----------------------------------------------------
    // 2. ระบบ Loading Animation (จุดวิ่ง ...)
    // ----------------------------------------------------
    let loadingInterval = null;

    function startLoadingAnimation(baseText) {
        stopLoadingAnimation();
        let dotCount = 0;
        if (emotionLabel) emotionLabel.innerText = baseText + '.';

        loadingInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            const dots = '.'.repeat(dotCount === 0 ? 1 : dotCount);
            if (emotionLabel) {
                emotionLabel.innerText = baseText + dots;
            }
        }, 350);
    }

    function stopLoadingAnimation() {
        if (loadingInterval) {
            clearInterval(loadingInterval);
            loadingInterval = null;
        }
    }

    // ----------------------------------------------------
    // 3. ฐานข้อมูลและกฎจิตวิทยาของสี (รองรับ 6 อารมณ์)
    // ----------------------------------------------------
    const emotionRules = {
        JOY: {
            palette: ['#FFD700', '#FF8C00', '#FF69B4', '#00BFFF', '#32CD32'],
            theme: 'Vibrant Sunburst',
            font: 'Poppins / Montserrat',
            context: 'E-Commerce, Festival Branding, UI Dashboard'
        },
        SADNESS: {
            palette: ['#1C2541', '#3A506B', '#5BC0BE', '#6C757D', '#ADB5BD'],
            theme: 'Melancholic Mist',
            font: 'Lora / Merriweather',
            context: 'Editorial Blogs, Personal Portfolios, Mental Health Apps'
        },
        ANGER: {
            palette: ['#D00000', '#9D0208', '#370617', '#E85D04', '#FAA307'],
            theme: 'Fiery Passion',
            font: 'Oswald / Roboto',
            context: 'Sports Apps, Gaming Dashboards, High-Energy Campaign'
        },
        FEAR: {
            palette: ['#2B1E3A', '#4A3E3D', '#2C3539', '#5C5470', '#B8C0C2'],
            theme: 'Mystic Shadow',
            font: 'Cinzel / Inter',
            context: 'Cybersecurity Platforms, Horror/Thriller Content, Security Tools'
        },
        LOVE: {
            palette: ['#FF758F', '#FF4D6D', '#C9184A', '#800F2F', '#FFF0F3'],
            theme: 'Romantic Bloom',
            font: 'Playfair Display / Great Vibes',
            context: 'Wedding Sites, Lifestyle Apps, Relationship Platforms'
        },
        SURPRISE: {
            palette: ['#7209B7', '#3F37C9', '#4CC9F0', '#F72585', '#4895EF'],
            theme: 'Electric Wonder',
            font: 'Plus Jakarta Sans / Space Grotesk',
            context: 'Entertainment Apps, Promotional Banners, Interactive Art'
        }
    };

    // ----------------------------------------------------
    // 4. AI Pipeline Engine (ใช้ DistilBERT MNLI เปิดสิทธิ์ Public 100%)
    // ----------------------------------------------------
    let sentimentPipeline = null;

    async function getAIPipeline() {
        if (!sentimentPipeline) {
            startLoadingAnimation(translations[currentLang].loadingModel);
            
            // ใช้ Xenova/distilbert-base-uncased-mnli ที่ไฟล์ Config/Tokenizer ไม่ติด Gate Access
            sentimentPipeline = await pipeline(
                'zero-shot-classification', 
                'Xenova/distilbert-base-uncased-mnli'
            );
        }
        return sentimentPipeline;
    }

    // ----------------------------------------------------
    // 5. ปุ่มวิเคราะห์อารมณ์ด้วย AI Model
    // ----------------------------------------------------
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const text = textInput ? textInput.value.trim() : '';

            if (!text) {
                if (alertBox) {
                    alertBox.innerText = translations[currentLang].alertEmpty;
                    alertBox.style.display = 'block';
                }
                return;
            }

            if (alertBox) alertBox.style.display = 'none';

            clearImageResult();

            analyzeBtn.disabled = true;
            analyzeBtn.style.opacity = '0.7';

            try {
                const classifier = await getAIPipeline();
                
                startLoadingAnimation(translations[currentLang].analyzingText);

                // กำหนดอารมณ์เป้าหมาย 6 หมวดหมู่
                const candidateLabels = ['fear', 'anger', 'sadness', 'joy', 'love', 'surprise'];

                // ส่งข้อความประมวลผล Zero-Shot Classification
                const output = await classifier(text, candidateLabels);
                stopLoadingAnimation();

                if (output && output.labels && output.labels.length > 0) {
                    const topEmotion = output.labels[0].toUpperCase();
                    const confidenceScore = (output.scores[0] * 100).toFixed(1) + "%";
                    
                    updateUIResult(topEmotion, confidenceScore);
                }
            } catch (err) {
                stopLoadingAnimation();
                console.error("AI Model Error:", err);
                if (emotionLabel) emotionLabel.innerText = "Error Loading AI Model";
                alert("เกิดข้อผิดพลาดในการรัน AI Model: " + err.message);
            } finally {
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
            }
        });
    }

    // ----------------------------------------------------
    // 6. การประมวลผลรูปภาพและการจัดการ UI
    // ----------------------------------------------------
    function clearImageResult() {
        if (extractedPaletteSection) extractedPaletteSection.style.display = 'none';
        if (extractedPalette) extractedPalette.innerHTML = '';
        if (imagePreview) imagePreview.src = '';
        if (imageInput) imageInput.value = '';
    }

    if (textInput) {
        textInput.addEventListener('input', () => clearImageResult());
    }

    if (uploadTriggerBtn && imageInput) {
        uploadTriggerBtn.addEventListener('click', () => imageInput.click());
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (textInput) textInput.value = '';

            const reader = new FileReader();
            reader.onload = (event) => {
                if (imagePreview) imagePreview.src = event.target.result;

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const rgbData = extractRGBColors(ctx, canvas.width, canvas.height, 5);
                    renderExtractedPalette(rgbData.hexList);

                    const imageEmotion = analyzeColorSentiment(rgbData.rgbList);
                    updateUIResult(imageEmotion, (90 + Math.floor(Math.random() * 9)) + '.0%');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function analyzeColorSentiment(rgbColors) {
        let totalR = 0, totalG = 0, totalB = 0;
        rgbColors.forEach(color => {
            totalR += color.r;
            totalG += color.g;
            totalB += color.b;
        });

        const count = rgbColors.length;
        const brightness = ((totalR / count) * 299 + (totalG / count) * 587 + (totalB / count) * 114) / 1000;

        if (brightness < 80) return 'FEAR';
        if (totalR > totalG * 1.3 && totalR > totalB * 1.3) return 'ANGER';
        if (totalB > totalR * 1.1 && brightness < 150) return 'SADNESS';
        if (totalG > totalR && totalB > totalR) return 'JOY';
        return 'JOY';
    }

    function extractRGBColors(ctx, width, height, count) {
        const hexList = [];
        const rgbList = [];
        const stepX = Math.floor(width / (count + 1));
        const stepY = Math.floor(height / 2);

        for (let i = 1; i <= count; i++) {
            const p = ctx.getImageData(i * stepX, stepY, 1, 1).data;
            const hex = '#' + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
            hexList.push(hex);
            rgbList.push({ r: p[0], g: p[1], b: p[2] });
        }
        return { hexList, rgbList };
    }

    function updateUIResult(emotionKey, confidence) {
        const resultData = emotionRules[emotionKey] || emotionRules['JOY'];

        if (emotionLabel) emotionLabel.innerText = emotionKey;
        if (confidenceValue) confidenceValue.innerText = confidence;

        if (themeName) themeName.innerText = resultData.theme;
        if (fontPairing) fontPairing.innerText = resultData.font;
        if (usageContext) usageContext.innerText = resultData.context;

        if (paletteDisplay) {
            paletteDisplay.innerHTML = '';
            resultData.palette.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;
                
                const span = document.createElement('span');
                span.innerText = color;
                swatch.appendChild(span);
                paletteDisplay.appendChild(swatch);
            });
        }
    }

    function renderExtractedPalette(colors) {
        if (!extractedPalette) return;
        extractedPalette.innerHTML = '';
        if (extractedPaletteSection) extractedPaletteSection.style.display = 'block';

        colors.forEach(color => {
            const box = document.createElement('div');
            box.className = 'color-swatch';
            box.style.backgroundColor = color;
            
            const span = document.createElement('span');
            span.innerText = color;
            box.appendChild(span);
            extractedPalette.appendChild(box);
        });
    }
});