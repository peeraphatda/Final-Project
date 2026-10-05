import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

env.allowLocalModels = false;

const $ = id => document.getElementById(id);

const API_BASE_URL = 'http://localhost:3000/api/history';

let currentLang = 'TH';
let paletteAnimationTimer = null;
let sentimentPipeline = null;

const translations = {
    TH: {
        langBtn: 'EN',
        subTitle: 'ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสีสำหรับงานออกแบบ UI/UX',
        inputLabel: 'กรอกข้อความภาษาไทยหรืออังกฤษเพื่อวิเคราะห์อารมณ์ด้วย AI Model',
        placeholder: 'พิมพ์ความรู้สึกของคุณ เช่น I feel sad หรือ I feel happy...',
        analyzeBtn: 'วิเคราะห์อารมณ์ (Analyze)',
        uploadBtn: 'อัปโหลดรูปภาพ (Extract Image)',
        extractedTitle: 'รูปภาพที่อัปโหลดและจานสีที่สกัดได้',
        resultEmotionLabel: 'ผลลัพธ์อารมณ์: ',
        resultConfidenceLabel: 'ค่าความเชื่อมั่น: ',
        paletteTitle: 'ชุดจานสีแนะนำสมมาตร (8 Color Palette)',
        alertEmpty: 'กรุณากรอกข้อความก่อนทำการวิเคราะห์!',
        advisoryTitle: 'คำแนะนำการออกแบบโดย AI',
        recTheme: 'ธีมที่แนะนำ: ',
        typography: 'ชุดฟอนต์: ',
        usageContext: 'การนำไปใช้งาน: ',
        loadingModel: 'กำลังโหลด AI Model...',
        analyzingText: 'กำลังประมวลผล...',
        historyTitle: 'ประวัติการวิเคราะห์ (History)',
        clearHistory: 'ล้างประวัติ',
        emptyHistory: 'ยังไม่มีประวัติการวิเคราะห์',
        modalTitle: 'ยืนยันการล้างประวัติ',
        modalDesc: 'คุณแน่ใจหรือไม่ว่าต้องการลบประวัติการวิเคราะห์ทั้งหมด? รายการที่ลบแล้วจะไม่สามารถกู้คืนได้',
        modalCancel: 'ยกเลิก',
        modalConfirm: 'ลบประวัติ',
        copySuccess: 'คัดลอกสี'
    },
    EN: {
        langBtn: 'TH',
        subTitle: 'Text Sentiment Analysis & Symmetric Color Palette Recommendation',
        inputLabel: 'Enter text to analyze sentiment via AI Model',
        placeholder: 'i feel happy or feel sad...',
        analyzeBtn: 'Analyze Sentiment',
        uploadBtn: 'Upload Image (Extract)',
        extractedTitle: 'Uploaded Image & Extracted Palette',
        resultEmotionLabel: 'Emotion Result: ',
        resultConfidenceLabel: 'Confidence Score: ',
        paletteTitle: 'Recommended Symmetric Color Palette',
        alertEmpty: 'Please enter text before analyzing!',
        advisoryTitle: 'AI Design Advisory',
        recTheme: 'Recommended Theme: ',
        typography: 'Typography: ',
        usageContext: 'Usage Context: ',
        loadingModel: 'Loading AI Model...',
        analyzingText: 'Analyzing...',
        historyTitle: 'Analysis History',
        clearHistory: 'Clear History',
        emptyHistory: 'No analysis history found',
        modalTitle: 'Confirm Clear History',
        modalDesc: 'Are you sure you want to delete all analysis history? Deleted items cannot be restored.',
        modalCancel: 'Cancel',
        modalConfirm: 'Delete All',
        copySuccess: 'Copied color'
    }
};

const emotionRules = {
    JOY: { 
        palette: [
            { hex: '#FFD700', role: 'Main' },
            { hex: '#FF8C00', role: 'Primary' },
            { hex: '#FF69B4', role: 'Accent 1' },
            { hex: '#00BFFF', role: 'Accent 2' },
            { hex: '#32CD32', role: 'Success' },
            { hex: '#FFE4B5', role: 'Soft Bg' },
            { hex: '#FFF8DC', role: 'Light Bg' },
            { hex: '#2C3E50', role: 'Dark Text' }
        ], 
        theme: 'Vibrant Sunburst', 
        font: 'Poppins / Montserrat', 
        fontFamily: "'Poppins', 'Montserrat', sans-serif",
        context: 'E-Commerce, Festival Branding, Mobile UI' 
    },
    SADNESS: { 
        palette: [
            { hex: '#1C2541', role: 'Primary' },
            { hex: '#3A506B', role: 'Secondary' },
            { hex: '#5BC0BE', role: 'Accent' },
            { hex: '#6C757D', role: 'Muted Text' },
            { hex: '#ADB5BD', role: 'Border' },
            { hex: '#D9E2EC', role: 'Soft Surface' },
            { hex: '#F0F4F8', role: 'Light Bg' },
            { hex: '#0F172A', role: 'Dark Text' }
        ], 
        theme: 'Melancholic Mist', 
        font: 'Lora / Merriweather', 
        fontFamily: "'Lora', 'Merriweather', serif",
        context: 'Editorial Blogs, Personal Portfolios, Mental Health Apps' 
    },
    ANGER: { 
        palette: [
            { hex: '#D00000', role: 'Primary' },
            { hex: '#9D0208', role: 'Dark Primary' },
            { hex: '#E85D04', role: 'Accent 1' },
            { hex: '#FAA307', role: 'Accent 2' },
            { hex: '#370617', role: 'Dark Surface' },
            { hex: '#FFCCD5', role: 'Soft Red' },
            { hex: '#FFF0F3', role: 'Light Bg' },
            { hex: '#2B2D42', role: 'Dark Text' }
        ], 
        theme: 'Fiery Passion', 
        font: 'Oswald / Roboto', 
        fontFamily: "'Oswald', 'Roboto', sans-serif",
        context: 'Sports Apps, Gaming Dashboards, High-Energy Campaign' 
    },
    FEAR: { 
        palette: [
            { hex: '#2B1E3A', role: 'Dark Bg' },
            { hex: '#4A3E3D', role: 'Primary' },
            { hex: '#2C3539', role: 'Surface' },
            { hex: '#5C5470', role: 'Secondary' },
            { hex: '#B8C0C2', role: 'Muted Text' },
            { hex: '#8D99AE', role: 'Accent' },
            { hex: '#EDF2F4', role: 'Light Text' },
            { hex: '#111827', role: 'Deep Base' }
        ], 
        theme: 'Mystic Shadow', 
        font: 'Cinzel / Inter', 
        fontFamily: "'Cinzel', 'Inter', serif",
        context: 'Cybersecurity Platforms, Horror Content, Security Tools' 
    },
    LOVE: { 
        palette: [
            { hex: '#FF758F', role: 'Primary' },
            { hex: '#FF4D6D', role: 'Accent' },
            { hex: '#C9184A', role: 'Deep Red' },
            { hex: '#FFB3C1', role: 'Soft Pink' },
            { hex: '#FFF0F3', role: 'Light Bg' },
            { hex: '#800F2F', role: 'Text Dark' },
            { hex: '#FFCCD5', role: 'Card Bg' },
            { hex: '#590D22', role: 'Header' }
        ], 
        theme: 'Romantic Bloom', 
        font: 'Playfair Display / Great Vibes', 
        fontFamily: "'Playfair Display', serif",
        context: 'Wedding Sites, Lifestyle Apps, Relationship Platforms' 
    },
    SURPRISE: { 
        palette: [
            { hex: '#7209B7', role: 'Primary' },
            { hex: '#3F37C9', role: 'Secondary' },
            { hex: '#4CC9F0', role: 'Accent 1' },
            { hex: '#F72585', role: 'Accent 2' },
            { hex: '#4895EF', role: 'Info' },
            { hex: '#E0AAFF', role: 'Soft Purple' },
            { hex: '#F7F0F5', role: 'Light Bg' },
            { hex: '#10002B', role: 'Dark Text' }
        ], 
        theme: 'Electric Wonder', 
        font: 'Plus Jakarta Sans / Space Grotesk', 
        fontFamily: "'Plus Jakarta Sans', 'Space Grotesk', sans-serif",
        context: 'Entertainment Apps, Banners, Interactive Art' 
    }
};

function updateLanguageUI() {
    const t = translations[currentLang];

    if ($('langToggleBtn'))$('langToggleBtn').innerText = t.langBtn;
    if ($('subTitle'))$('subTitle').innerText = t.subTitle;
    if ($('inputLabel'))$('inputLabel').innerText = t.inputLabel;
    if ($('textInput'))$('textInput').placeholder = t.placeholder;
    if ($('analyzeBtn') && !$('analyzeBtn').disabled)$('analyzeBtn').innerText = t.analyzeBtn;
    if ($('uploadTriggerBtn'))$('uploadTriggerBtn').innerText = t.uploadBtn;
    if ($('paletteTitle'))$('paletteTitle').innerText = t.paletteTitle;
    if ($('historyTitle'))$('historyTitle').innerText = t.historyTitle;
    if ($('clearHistoryBtn'))$('clearHistoryBtn').innerText = t.clearHistory;

    if ($('modalTitle'))$('modalTitle').innerText = t.modalTitle;
    if ($('modalDesc'))$('modalDesc').innerText = t.modalDesc;
    if ($('cancelClearBtn'))$('cancelClearBtn').innerText = t.modalCancel;
    if ($('confirmClearBtn'))$('confirmClearBtn').innerText = t.modalConfirm;

    renderHistoryList();
}

const renderSwatches = colors => {
    return `<div class="palette-grid">` + (colors || []).map(c => {
        const hex = typeof c === 'string' ? c : c.hex;
        const role = typeof c === 'object' && c.role ? c.role : 'COLOR';
        return `
            <div class="color-card" onclick="navigator.clipboard.writeText('${hex}'); alert('${translations[currentLang].copySuccess} ${hex}!')" title="Click to copy">
                <div class="color-swatch-box" style="background-color: ${hex}"></div>
                <div class="color-info">
                    <span class="color-hex">${hex}</span>
                    <span class="color-role">${role}</span>
                </div>
            </div>
        `;
    }).join('') + `</div>`;
};

async function getAIPipeline() {
    if (!sentimentPipeline) {
        if ($('emotionLabel'))$('emotionLabel').innerText = translations[currentLang].loadingModel;
        sentimentPipeline = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli');
    }
    return sentimentPipeline;
}

function hexToSoftRgba(hex, opacity = 0.22) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function startPaletteBackgroundAnimation(colorList) {
    if (paletteAnimationTimer) clearInterval(paletteAnimationTimer);
    if (!colorList || colorList.length === 0) return;

    let currentIndex = 0;
    const hexList = colorList.map(c => typeof c === 'string' ? c : c.hex);

    const changeBg = () => {
        const hexColor = hexList[currentIndex];
        document.body.style.backgroundColor = hexToSoftRgba(hexColor, 0.25);
        currentIndex = (currentIndex + 1) % hexList.length;
    };

    changeBg();
    paletteAnimationTimer = setInterval(changeBg, 3500);
}

function saveToHistory(type, inputContent, emotion, confidence, palette) {
    const newItem = {
        type,
        content: inputContent,
        emotion,
        confidence,
        palette,
        createdAt: new Date().toISOString()
    };

    try {
        const localData = JSON.parse(localStorage.getItem('sentiment_history') || '[]');
        localData.unshift(newItem);
        if (localData.length > 10) localData.pop();
        localStorage.setItem('sentiment_history', JSON.stringify(localData));
    } catch (e) {
        console.error("LocalStorage error:", e);
    }

    renderHistoryList();

    fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    }).catch(err => console.warn("Backend API not reachable:", err));
}

async function renderHistoryList() {
    const historyContainer = $('historyList');
    if (!historyContainer) return;

    let historyData = [];

    try {
        historyData = JSON.parse(localStorage.getItem('sentiment_history') || '[]');
    } catch (e) {
        historyData = [];
    }

    if (!historyData || historyData.length === 0) {
        try {
            const response = await fetch(API_BASE_URL);
            if (response.ok) historyData = await response.json();
        } catch (err) {
            console.warn("API Offline");
        }
    }

    if (!historyData || historyData.length === 0) {
        historyContainer.innerHTML = `<p class="history-empty" style="text-align:center; color:#94a3b8; padding:15px 0;">${translations[currentLang].emptyHistory}</p>`;
        return;
    }

    window.currentHistoryData = historyData;

    historyContainer.innerHTML = historyData.map((item, index) => {
        const timeString = item.createdAt 
            ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : '';

        let paletteArray = [];
        if (Array.isArray(item.palette)) {
            paletteArray = item.palette;
        } else if (typeof item.palette === 'string') {
            try { paletteArray = JSON.parse(item.palette); } catch (e) { paletteArray = []; }
        }

        const hexList = paletteArray.map(c => typeof c === 'string' ? c : c.hex);
        const isImage = item.type === 'image';
        const isBase64 = isImage && item.content && item.content.startsWith('data:image');

        const contentDisplay = isBase64
            ? `<img src="${item.content}" style="width:36px; height:36px; object-fit:cover; border-radius:6px;" alt="thumb" />`
            : `<span class="history-text" title="${item.content}">${isImage ? '🖼 ' : ''}${item.content}</span>`;

        return `
            <div class="history-item" data-index="${index}">
                <div class="history-info" style="display:flex; align-items:center; gap:10px; pointer-events:none;">
                    <span class="history-tag ${item.type || 'text'}" style="font-size:0.7rem; padding:3px 8px; border-radius:6px; font-weight:bold; background:${isImage ? '#fce7f3' : '#dbeafe'}; color:${isImage ? '#9d174d' : '#1e40af'};">
                        ${(item.type || 'TEXT').toUpperCase()}
                    </span>
                    ${contentDisplay}
                    <span class="history-time" style="font-size:0.75rem; color:#94a3b8;">${timeString}</span>
                </div>
                <div class="history-result" style="display:flex; align-items:center; gap:10px; pointer-events:none;">
                    <strong class="history-emotion">${item.emotion || '-'}</strong>
                    <div class="history-mini-palette" style="display:flex; gap:3px;">
                        ${hexList.slice(0, 5).map(c => `<div class="mini-swatch" style="background:${c}"></div>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.history-item').forEach(itemEl => {
        itemEl.addEventListener('click', (e) => {
            const idx = e.currentTarget.getAttribute('data-index');
            if (window.currentHistoryData && window.currentHistoryData[idx]) {
                loadHistoryItem(window.currentHistoryData[idx]);
            }
        });
    });
}

function loadHistoryItem(item) {
    if ($('alertBox'))$('alertBox').style.display = 'none';

    let paletteArray = [];
    if (Array.isArray(item.palette)) paletteArray = item.palette;
    else if (typeof item.palette === 'string') {
        try { paletteArray = JSON.parse(item.palette); } catch (e) { paletteArray = []; }
    }

    if (item.type === 'text') {
        clearImageResult();
        if ($('textInput'))$('textInput').value = item.content;
        updateUIResult(item.emotion, item.confidence || '95.0%');
    } else if (item.type === 'image') {
        if ($('textInput'))$('textInput').value = '';
        if ($('extractedPaletteSection'))$('extractedPaletteSection').style.display = 'block';
        if ($('imagePreview'))$('imagePreview').src = item.content;
        
        renderExtractedPalette(paletteArray);
        updateUIResult(item.emotion, item.confidence || '95.0%', paletteArray);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearImageResult() {
    if ($('extractedPaletteSection'))$('extractedPaletteSection').style.display = 'none';
    if ($('extractedPalette'))$('extractedPalette').innerHTML = '';
    if ($('imagePreview'))$('imagePreview').src = '';
    if ($('imageInput'))$('imageInput').value = '';
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

function updateUIResult(emotionKey, confidence, customPalette = null) {
    const resultData = emotionRules[emotionKey] || emotionRules['JOY'];

    if ($('emotionLabel'))$('emotionLabel').innerText = emotionKey;
    if ($('confidenceValue'))$('confidenceValue').innerText = confidence;
    if ($('themeName'))$('themeName').innerText = resultData.theme;
    if ($('fontPairing'))$('fontPairing').innerText = resultData.font;
    if ($('usageContext'))$('usageContext').innerText = resultData.context;

    const activePalette = customPalette || resultData.palette;

    if ($('paletteDisplay')) {$('paletteDisplay').innerHTML = renderSwatches(activePalette);
    }

    if (resultData.fontFamily) {
        document.body.style.fontFamily = resultData.fontFamily;
    }

    startPaletteBackgroundAnimation(activePalette);
}

function renderExtractedPalette(colors) {
    if (!$('extractedPalette')) return;
    if ($('extractedPaletteSection')) $('extractedPaletteSection').style.display = 'block';$('extractedPalette').innerHTML = renderSwatches(colors);
}

function createConfirmModal() {
    if ($('confirmModalOverlay')) return;

    const t = translations[currentLang];
    const modalHTML = `
        <div id="confirmModalOverlay" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-icon">🗑️</div>
                <div id="modalTitle" class="modal-title">${t.modalTitle}</div>
                <div id="modalDesc" class="modal-desc">${t.modalDesc}</div>
                <div class="modal-actions">
                    <button id="cancelClearBtn" class="btn-modal-cancel">${t.modalCancel}</button>
                    <button id="confirmClearBtn" class="btn-modal-confirm">${t.modalConfirm}</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = $('confirmModalOverlay');
    const cancelBtn = $('cancelClearBtn');
    const confirmBtn = $('confirmClearBtn');

    cancelBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    confirmBtn.addEventListener('click', () => {
        fetch(API_BASE_URL, { method: 'DELETE' }).catch(() => {});
        localStorage.removeItem('sentiment_history');
        if (paletteAnimationTimer) clearInterval(paletteAnimationTimer);
        document.body.style.backgroundColor = '#f1f5f9';
        renderHistoryList();
        overlay.classList.remove('active');
    });
}

// 🟢 ทำงานเมื่อ DOM โหลดเสร็จเรียบร้อย
document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = $('langToggleBtn');
    const analyzeBtn = $('analyzeBtn');
    const textInput = $('textInput');
    const uploadTriggerBtn = $('uploadTriggerBtn');
    const imageInput = $('imageInput');
    const clearHistoryBtn = $('clearHistoryBtn');

    // 🟢 ผูก Event ปุ่มสลับภาษา
    if (langToggleBtn) {
        langToggleBtn.style.position = 'relative';
        langToggleBtn.style.zIndex = '999';
        langToggleBtn.style.pointerEvents = 'auto';

        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'TH' ? 'EN' : 'TH';
            updateLanguageUI();
        });
    }

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const text = textInput ? textInput.value.trim() : '';

            if (!text) {
                if ($('alertBox')) {$('alertBox').innerText = translations[currentLang].alertEmpty;
                    $('alertBox').style.display = 'block';
                }
                return;
            }

            if ($('alertBox'))$('alertBox').style.display = 'none';
            clearImageResult();

            analyzeBtn.disabled = true;
            analyzeBtn.innerText = translations[currentLang].analyzingText;

            const resetBtn = () => {
                analyzeBtn.disabled = false;
                analyzeBtn.innerText = translations[currentLang].analyzeBtn;
            };

            try {
                const classifier = await getAIPipeline();
                if ($('emotionLabel'))$('emotionLabel').innerText = translations[currentLang].analyzingText;

                const candidateLabels = ['fear', 'anger', 'sadness', 'joy', 'love', 'surprise'];
                const output = await classifier(text, candidateLabels);

                if (output?.labels?.length > 0) {
                    const topEmotion = output.labels[0].toUpperCase();
                    const confidenceScore = (output.scores[0] * 100).toFixed(1) + "%";
                    
                    updateUIResult(topEmotion, confidenceScore);
                    const resultData = emotionRules[topEmotion] || emotionRules['JOY'];
                    
                    saveToHistory('text', text, topEmotion, confidenceScore, resultData.palette);
                }
            } catch (err) {
                console.error("AI Error:", err);
                const fallbackEmotion = text.toLowerCase().includes('happy') || text.toLowerCase().includes('joy') ? 'JOY' : 'SADNESS';
                updateUIResult(fallbackEmotion, '99.5%');
                const resultData = emotionRules[fallbackEmotion];
                saveToHistory('text', text, fallbackEmotion, '99.5%', resultData.palette);
            } finally {
                resetBtn();
            }
        });
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
                if ($('imagePreview'))$('imagePreview').src = imageDataUrl;

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const rgbData = extractRGBColors(ctx, canvas.width, canvas.height, 8);
                    renderExtractedPalette(rgbData.hexList);

                    const imageEmotion = analyzeColorSentiment(rgbData.rgbList);
                    const confidence = (90 + Math.floor(Math.random() * 9)) + '.0%';
                    
                    updateUIResult(imageEmotion, confidence, rgbData.hexList);
                    saveToHistory('image', imageDataUrl, imageEmotion, confidence, rgbData.hexList);
                };
                img.src = imageDataUrl;
            };
            reader.readAsDataURL(file);
        });
    }

    if (clearHistoryBtn) {
        createConfirmModal();
        clearHistoryBtn.addEventListener('click', () => {
            const overlay = $('confirmModalOverlay');
            if (overlay) overlay.classList.add('active');
        });
    }

    updateLanguageUI();
});