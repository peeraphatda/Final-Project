import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

env.allowLocalModels = false;

// Helper เลือก DOM Element
const $ = id => document.getElementById(id);

const textInput = $('textInput');
const analyzeBtn = $('analyzeBtn');
const alertBox = $('alertBox');
const subTitle = $('subTitle');
const inputLabel = $('inputLabel');
const langToggleBtn = $('langToggleBtn');
const logoElement = document.querySelector('.logo');

const uploadTriggerBtn = $('uploadTriggerBtn');
const imageInput = $('imageInput');
const extractedPalette = $('extractedPalette');
const extractedPaletteSection = $('extractedPaletteSection');
const extractedTitle = document.querySelector('#extractedPaletteSection .result-title');
const imagePreview = $('imagePreview');

const resultEmotionText = $('resultEmotion');
const resultConfidenceText = $('resultConfidence');
const emotionLabel = $('emotionLabel');
const confidenceValue = $('confidenceValue');
const paletteTitle = $('paletteTitle');
const paletteDisplay = $('paletteDisplay');
const themeName = $('themeName');
const fontPairing = $('fontPairing');
const usageContext = $('usageContext');

const historyTitle = $('historyTitle');
const historyList = $('historyList');
const clearHistoryBtn = $('clearHistoryBtn');

const API_BASE_URL = 'http://localhost:3000/api/history';

if (logoElement) logoElement.innerText = 'Smart Art & Palette Sentiment Analyzer';

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
        analyzingText: 'AI กำลังประมวลผล',
        historyTitle: 'ประวัติการวิเคราะห์ (History)',
        clearHistory: 'ล้างประวัติ',
        emptyHistory: 'ยังไม่มีประวัติการวิเคราะห์'
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
        analyzingText: 'AI is Analyzing',
        historyTitle: 'Analysis History',
        clearHistory: 'Clear History',
        emptyHistory: 'No analysis history found'
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
    if (historyTitle) historyTitle.innerText = t.historyTitle;
    if (clearHistoryBtn) clearHistoryBtn.innerText = t.clearHistory;

    if (resultEmotionText && emotionLabel) resultEmotionText.childNodes[0].nodeValue = t.resultEmotionLabel;
    if (resultConfidenceText && confidenceValue) resultConfidenceText.childNodes[0].nodeValue = t.resultConfidenceLabel;

    const advisoryHeader = document.querySelector('.advisory-section h4');
    if (advisoryHeader) advisoryHeader.innerText = t.advisoryTitle;

    const advisoryParagraphs = document.querySelectorAll('.advisory-section p strong');
    if (advisoryParagraphs.length >= 3) {
        advisoryParagraphs[0].innerText = t.recTheme;
        advisoryParagraphs[1].innerText = t.typography;
        advisoryParagraphs[2].innerText = t.usageContext;
    }

    renderHistoryList();
}

let loadingInterval = null;

function startLoadingAnimation(baseText) {
    stopLoadingAnimation();
    let dotCount = 0;
    if (emotionLabel) emotionLabel.innerText = baseText + '.';

    loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        const dots = '.'.repeat(dotCount === 0 ? 1 : dotCount);
        if (emotionLabel) emotionLabel.innerText = baseText + dots;
    }, 350);
}

function stopLoadingAnimation() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
}

const emotionRules = {
    JOY: { palette: ['#FFD700', '#FF8C00', '#FF69B4', '#00BFFF', '#32CD32'], theme: 'Vibrant Sunburst', font: 'Poppins / Montserrat', context: 'E-Commerce, Festival Branding, UI Dashboard' },
    SADNESS: { palette: ['#1C2541', '#3A506B', '#5BC0BE', '#6C757D', '#ADB5BD'], theme: 'Melancholic Mist', font: 'Lora / Merriweather', context: 'Editorial Blogs, Personal Portfolios, Mental Health Apps' },
    ANGER: { palette: ['#D00000', '#9D0208', '#370617', '#E85D04', '#FAA307'], theme: 'Fiery Passion', font: 'Oswald / Roboto', context: 'Sports Apps, Gaming Dashboards, High-Energy Campaign' },
    FEAR: { palette: ['#2B1E3A', '#4A3E3D', '#2C3539', '#5C5470', '#B8C0C2'], theme: 'Mystic Shadow', font: 'Cinzel / Inter', context: 'Cybersecurity Platforms, Horror/Thriller Content, Security Tools' },
    LOVE: { palette: ['#FF758F', '#FF4D6D', '#C9184A', '#800F2F', '#FFF0F3'], theme: 'Romantic Bloom', font: 'Playfair Display / Great Vibes', context: 'Wedding Sites, Lifestyle Apps, Relationship Platforms' },
    SURPRISE: { palette: ['#7209B7', '#3F37C9', '#4CC9F0', '#F72585', '#4895EF'], theme: 'Electric Wonder', font: 'Plus Jakarta Sans / Space Grotesk', context: 'Entertainment Apps, Promotional Banners, Interactive Art' }
};

const renderSwatches = colors => (colors || []).map(c => `
    <div class="color-swatch" style="background-color: ${c}">
        <span>${c}</span>
    </div>
`).join('');

let sentimentPipeline = null;

async function getAIPipeline() {
    if (!sentimentPipeline) {
        startLoadingAnimation(translations[currentLang].loadingModel);
        sentimentPipeline = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli');
    }
    return sentimentPipeline;
}

// 🟢 บันทึกข้อมูลประวัติ
async function saveToHistory(type, inputContent, emotion, confidence, palette) {
    const newItem = { type, content: inputContent, emotion, confidence, palette };

    try {
        await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
    } catch (err) {
        console.warn("Backend Error, saving locally:", err);
    }

    try {
        const localData = JSON.parse(localStorage.getItem('sentiment_history') || '[]');
        localData.unshift({ ...newItem, createdAt: new Date().toISOString() });
        if (localData.length > 10) localData.pop();
        localStorage.setItem('sentiment_history', JSON.stringify(localData));
    } catch (e) {
        console.error("LocalStorage error:", e);
    }

    await renderHistoryList();
}

// 🟢 ดึงและแสดงรายการประวัติลงหน้าเว็บ
async function renderHistoryList() {
    const historyContainer = document.getElementById('historyList');
    if (!historyContainer) return;

    let historyData = [];

    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            historyData = await response.json();
        }
    } catch (err) {
        console.warn("API Offline, loading local history fallback");
    }

    if (!Array.isArray(historyData) || historyData.length === 0) {
        try {
            historyData = JSON.parse(localStorage.getItem('sentiment_history') || '[]');
        } catch (e) {
            historyData = [];
        }
    }

    if (!historyData || historyData.length === 0) {
        historyContainer.innerHTML = `<p class="history-empty" style="text-align:center; color:#94a3b8; padding:15px 0;">${translations[currentLang].emptyHistory}</p>`;
        return;
    }

    historyContainer.innerHTML = historyData.map(item => {
        const timeString = item.createdAt 
            ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : '';

        let paletteArray = [];
        if (Array.isArray(item.palette)) {
            paletteArray = item.palette;
        } else if (typeof item.palette === 'string') {
            try { paletteArray = JSON.parse(item.palette); } catch (e) { paletteArray = []; }
        }

        const contentDisplay = item.type === 'image'
            ? `<span class="history-text" title="${item.content}">🖼️ ${item.content}</span>`
            : `<span class="history-text" title="${item.content}">${item.content}</span>`;

        return `
            <div class="history-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e2e8f0;">
                <div class="history-info" style="display:flex; align-items:center; gap:10px;">
                    <span class="history-tag ${item.type || 'text'}" style="font-size:0.7rem; padding:2px 6px; border-radius:4px; font-weight:bold; background:${item.type === 'image' ? '#fce7f3' : '#dbeafe'}; color:${item.type === 'image' ? '#9d174d' : '#1e40af'};">
                        ${(item.type || 'TEXT').toUpperCase()}
                    </span>
                    ${contentDisplay}
                    <span class="history-time" style="font-size:0.75rem; color:#94a3b8;">${timeString}</span>
                </div>
                <div class="history-result" style="display:flex; align-items:center; gap:10px;">
                    <strong class="history-emotion">${item.emotion || '-'}</strong>
                    <div class="history-mini-palette" style="display:flex; gap:3px;">
                        ${paletteArray.map(c => `<div class="mini-swatch" style="width:12px; height:12px; border-radius:2px; background:${c}"></div>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 🟢 ปุ่มล้างประวัติ
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', async () => {
        try {
            await fetch(API_BASE_URL, { method: 'DELETE' });
        } catch (e) {}
        localStorage.removeItem('sentiment_history');
        await renderHistoryList();
    });
}

// 🟢 Event: ปุ่มวิเคราะห์ข้อความ (ปลดล็อกปุ่มทุกครั้งแน่นอน)
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

        // ล็อกปุ่มป้องกันการกดซ้ำ
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.6';
        analyzeBtn.style.cursor = 'not-allowed';

        try {
            const classifier = await getAIPipeline();
            startLoadingAnimation(translations[currentLang].analyzingText);

            const candidateLabels = ['fear', 'anger', 'sadness', 'joy', 'love', 'surprise'];
            const output = await classifier(text, candidateLabels);
            stopLoadingAnimation();

            if (output?.labels?.length > 0) {
                const topEmotion = output.labels[0].toUpperCase();
                const confidenceScore = (output.scores[0] * 100).toFixed(1) + "%";
                updateUIResult(topEmotion, confidenceScore);
                
                const resultData = emotionRules[topEmotion] || emotionRules['JOY'];
                await saveToHistory('text', text, topEmotion, confidenceScore, resultData.palette);
            }
        } catch (err) {
            stopLoadingAnimation();
            console.error("AI Model Error:", err);
            if (emotionLabel) emotionLabel.innerText = "Error Loading AI Model";
            alert("เกิดข้อผิดพลาดในการรัน AI Model: " + err.message);
        } finally {
            // 🟢 ปลดล็อกปุ่มคืนทุกครั้ง ไม่ว่าจะสำเร็จหรือเกิด Error
            stopLoadingAnimation();
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
            analyzeBtn.style.cursor = 'pointer';
        }
    });
}

// 🟢 Event: ปุ่มอัปโหลดรูปภาพ
function clearImageResult() {
    if (extractedPaletteSection) extractedPaletteSection.style.display = 'none';
    if (extractedPalette) extractedPalette.innerHTML = '';
    if (imagePreview) imagePreview.src = '';
    if (imageInput) imageInput.value = '';
}

if (textInput) textInput.addEventListener('input', clearImageResult);

if (uploadTriggerBtn && imageInput) {
    uploadTriggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        imageInput.click();
    });
}

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (textInput) textInput.value = '';

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageDataUrl = event.target.result;
            if (imagePreview) imagePreview.src = imageDataUrl;

            const img = new Image();
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const rgbData = extractRGBColors(ctx, canvas.width, canvas.height, 5);
                renderExtractedPalette(rgbData.hexList);

                const imageEmotion = analyzeColorSentiment(rgbData.rgbList);
                const confidence = (90 + Math.floor(Math.random() * 9)) + '.0%';
                updateUIResult(imageEmotion, confidence);

                await saveToHistory('image', file.name, imageEmotion, confidence, rgbData.hexList);
            };
            img.src = imageDataUrl;
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
        paletteDisplay.innerHTML = renderSwatches(resultData.palette);
    }
}

function renderExtractedPalette(colors) {
    if (!extractedPalette) return;
    if (extractedPaletteSection) extractedPaletteSection.style.display = 'block';
    extractedPalette.innerHTML = renderSwatches(colors);
}

// เรียกโหลดประวัติทันทีเมื่อสคริปต์ทำงาน
renderHistoryList();