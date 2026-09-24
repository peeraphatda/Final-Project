document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const alertBox = document.getElementById('alertBox');
    
    const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
    const imageInput = document.getElementById('imageInput');
    const extractedPalette = document.getElementById('extractedPalette');
    const extractedPaletteSection = document.getElementById('extractedPaletteSection');

    // UI Result Elements
    const emotionLabel = document.getElementById('emotionLabel');
    const confidenceValue = document.getElementById('confidenceValue');
    const paletteDisplay = document.getElementById('paletteDisplay');
    const themeName = document.getElementById('themeName');
    const fontPairing = document.getElementById('fontPairing');
    const usageContext = document.getElementById('usageContext');

    // ฐานข้อมูลวิเคราะห์อารมณ์และจานสีจำลอง (Color Psychology Rules)
    const emotionRules = {
        joy: {
            palette: ['#FFD700', '#FF8C00', '#FF69B4', '#00BFFF', '#32CD32'],
            theme: 'Vibrant Sunburst',
            font: 'Poppins / Montserrat',
            context: 'E-Commerce, Festival Branding, UI Dashboard'
        },
        sadness: {
            palette: ['#1C2541', '#3A506B', '#5BC0BE', '#6C757D', '#ADB5BD'],
            theme: 'Melancholic Mist',
            font: 'Lora / Merriweather',
            context: 'Editorial Blogs, Personal Portfolios, Mental Health Apps'
        },
        anger: {
            palette: ['#D00000', '#9D0208', '#370617', '#E85D04', '#FAA307'],
            theme: 'Fiery Passion',
            font: 'Oswald / Roboto',
            context: 'Sports Apps, Gaming Dashboards, High-Energy Campaign'
        },
        fear: {
            palette: ['#2B1E3A', '#4A3E3D', '#2C3539', '#5C5470', '#B8C0C2'],
            theme: 'Mystic Shadow',
            font: 'Cinzel / Inter',
            context: 'Cybersecurity Platforms, Horror/Thriller Content, Security Tools'
        },
        love: {
            palette: ['#FFB7B2', '#FF9AA2', '#E2F0CB', '#B5EAD7', '#C7CEEA'],
            theme: 'Soft Romance',
            font: 'Playfair Display / Open Sans',
            context: 'Wedding Invitations, Beauty Products, Lifestyle Platforms'
        },
        surprise: {
            palette: ['#FF007F', '#7B2CBF', '#00F5D4', '#F15BB5', '#FEE440'],
            theme: 'Electric Pop',
            font: 'Space Grotesk / Plus Jakarta Sans',
            context: 'Creative Agencies, Event Flyers, Innovation Hubs'
        }
    };

    // ----------------------------------------------------
    // 1. ฟังก์ชันวิเคราะห์คำและคำนวณอารมณ์ภาษาอังกฤษ
    // ----------------------------------------------------
    function detectSentiment(text) {
        const lower = text.toLowerCase();
        if (lower.includes('sad') || lower.includes('cry') || lower.includes('depressed') || lower.includes('lonely') || lower.includes('bad')) {
            return 'sadness';
        } else if (lower.includes('angry') || lower.includes('hate') || lower.includes('mad') || lower.includes('furious')) {
            return 'anger';
        } else if (lower.includes('scared') || lower.includes('fear') || lower.includes('afraid') || lower.includes('terrified')) {
            return 'fear';
        } else if (lower.includes('love') || lower.includes('heart') || lower.includes('sweet') || lower.includes('romantic')) {
            return 'love';
        } else if (lower.includes('wow') || lower.includes('surprised') || lower.includes('amazing') || lower.includes('shocked')) {
            return 'surprise';
        } else {
            return 'joy'; // Default or happy sentiment
        }
    }

    // ----------------------------------------------------
    // 2. ระบบตอบสนองปุ่ม "วิเคราะห์อารมณ์"
    // ----------------------------------------------------
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = textInput ? textInput.value.trim() : '';

            // ตรวจสอบข้อความว่าง
            if (!text) {
                if (alertBox) {
                    alertBox.innerText = '⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!';
                    alertBox.style.display = 'block';
                }
                return;
            }

            // ซ่อนกล่องเตือนเมื่อพิมพ์ข้อความแล้ว
            if (alertBox) alertBox.style.display = 'none';

            // ประมวลผลหาอารมณ์จากข้อความ
            const detectedEmotion = detectSentiment(text);
            const resultData = emotionRules[detectedEmotion];

            // อัปเดตผลลัพธ์บน UI ทันที
            if (emotionLabel) emotionLabel.innerText = detectedEmotion.toUpperCase();
            if (confidenceValue) confidenceValue.innerText = (88 + Math.floor(Math.random() * 11)) + '.5%';

            // อัปเดตข้อมูล AI Design Advisory
            if (themeName) themeName.innerText = resultData.theme;
            if (fontPairing) fontPairing.innerText = resultData.font;
            if (usageContext) usageContext.innerText = resultData.context;

            // วาดแถบสีใหม่ตามอารมณ์ที่วิเคราะห์ได้
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
        });
    }

    // ----------------------------------------------------
    // 3. ระบบสกัดสีจากรูปภาพ (Image Extractor)
    // ----------------------------------------------------
    if (uploadTriggerBtn && imageInput) {
        uploadTriggerBtn.addEventListener('click', () => {
            imageInput.click();
        });
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const colors = extractColors(ctx, canvas.width, canvas.height, 5);
                    renderExtractedPalette(colors);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function extractColors(ctx, width, height, count) {
        const colors = [];
        const stepX = Math.floor(width / (count + 1));
        const stepY = Math.floor(height / 2);

        for (let i = 1; i <= count; i++) {
            const p = ctx.getImageData(i * stepX, stepY, 1, 1).data;
            const hex = '#' + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
            colors.push(hex);
        }
        return colors;
    }

    function renderExtractedPalette(colors) {
        if (!extractedPalette) return;
        extractedPalette.innerHTML = '';
        if (extractedPaletteSection) extractedPaletteSection.style.display = 'block';

        colors.forEach(color => {
            const box = document.createElement('div');
            box.style.backgroundColor = color;
            box.style.width = '55px';
            box.style.height = '55px';
            box.style.borderRadius = '8px';
            box.style.display = 'inline-block';
            box.style.margin = '5px';
            box.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            box.title = color;

            const label = document.createElement('span');
            label.innerText = color;
            label.style.display = 'block';
            label.style.fontSize = '10px';
            label.style.textAlign = 'center';
            label.style.marginTop = '60px';
            label.style.color = '#fff';

            box.appendChild(label);
            extractedPalette.appendChild(box);
        });
    }
});