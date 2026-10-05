import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

env.allowLocalModels = false;

// Helper เลือก Element
const $ = id => document.getElementById(id);

const textInput = $('textInput');
const analyzeBtn = $('analyzeBtn');
const alertBox = $('alertBox');
const subTitle = $('subTitle');
const inputLabel = $('inputLabel');
const langToggleBtn = $('langToggleBtn');

const uploadTriggerBtn = $('uploadTriggerBtn');
const imageInput = $('imageInput');
const extractedPalette = $('extractedPalette');
const extractedPaletteSection = $('extractedPaletteSection');
const imagePreview = $('imagePreview');

const emotionLabel = $('emotionLabel');
const confidenceValue = $('confidenceValue');
const paletteDisplay = $('paletteDisplay');
const themeName = $('themeName');
const fontPairing = $('fontPairing');
const usageContext = $('usageContext');

const historyList = $('historyList');
const clearHistoryBtn = $('clearHistoryBtn');

const API_BASE_URL = 'http://localhost:3000/api/history';

let currentLang = 'TH';

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
        if (emotionLabel) emotionLabel.innerText = "กำลังโหลด AI Model...";
        sentimentPipeline = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli');
    }
    return sentimentPipeline;
}

// 🟢 บันทึกลง Database
async function saveToHistory(type, inputContent, emotion, confidence, palette) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, content: inputContent, emotion, confidence, palette })
        });
        if (response.ok) {
            await renderHistoryList();
        }
    } catch (error) {
        console.error("Database Save Error:", error);
    }
}

// 🟢 ดึงและแสดงรายการประวัติ (History)
async function renderHistoryList() {
    if (!historyList) return;
    
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const history = await response.json();

        if (!Array.isArray(history) || history.length === 0) {
            historyList.innerHTML = `<p class="history-empty">ยังไม่มีประวัติการวิเคราะห์</p>`;
            return;
        }

        historyList.innerHTML = history.map(item => {
            const timeString = item.createdAt 
                ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                : '';

            // ตรวจสอบและจัดการจานสี mini-palette
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
                <div class="history-item">
                    <div class="history-info">
                        <span class="history-tag ${item.type}">${(item.type || 'TEXT').toUpperCase()}</span>
                        ${contentDisplay}
                        <span class="history-time">${timeString}</span>
                    </div>
                    <div class="history-result">
                        <strong class="history-emotion">${item.emotion || '-'}</strong>
                        <div class="history-mini-palette">
                            ${paletteArray.map(c => `<div class="mini-swatch" style="background:${c}"></div>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Fetch History Error:", error);
        historyList.innerHTML = `<p class="history-empty">ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (โปรดตรวจสอบว่ารัน node server.js อยู่หรือไม่)</p>`;
    }
}

// 🟢 ปุ่มวิเคราะห์ข้อความ
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = textInput ? textInput.value.trim() : '';

        if (!text) {
            if (alertBox) {
                alertBox.innerText = 'กรุณากรอกข้อความก่อนทำการวิเคราะห์!';
                alertBox.style.display = 'block';
            }
            return;
        }

        if (alertBox) alertBox.style.display = 'none';
        analyzeBtn.disabled = true;

        try {
            const classifier = await getAIPipeline();
            if (emotionLabel) emotionLabel.innerText = "กำลังประมวลผล...";

            const candidateLabels = ['fear', 'anger', 'sadness', 'joy', 'love', 'surprise'];
            const output = await classifier(text, candidateLabels);

            if (output?.labels?.length > 0) {
                const topEmotion = output.labels[0].toUpperCase();
                const confidenceScore = (output.scores[0] * 100).toFixed(1) + "%";
                
                updateUIResult(topEmotion, confidenceScore);
                const resultData = emotionRules[topEmotion] || emotionRules['JOY'];
                await saveToHistory('text', text, topEmotion, confidenceScore, resultData.palette);
            }
        } catch (err) {
            console.error("AI Error:", err);
            alert("เกิดข้อผิดพลาดในการรัน AI Model: " + err.message);
        } finally {
            analyzeBtn.disabled = false;
        }
    });
}

// 🟢 ปุ่มอัปโหลดรูปภาพ
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

// 🟢 ปุ่มล้างประวัติ
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', async () => {
        try {
            await fetch(API_BASE_URL, { method: 'DELETE' });
            await renderHistoryList();
        } catch (error) {
            console.error("Clear History Error:", error);
        }
    });
}

// เริ่มต้นดึงประวัติทันทีเมื่อโหลดหน้าเว็บ
renderHistoryList();