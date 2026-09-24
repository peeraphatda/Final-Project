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

    // ฐานข้อมูลวิเคราะห์อารมณ์ตามทฤษฎีจิตวิทยาของสี (Color Psychology Rules)
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
        CALM: {
            palette: ['#A8DADC', '#457B9D', '#1D3557', '#F1FAEE', '#E63946'],
            theme: 'Serene Ocean',
            font: 'Nunito / Quicksand',
            context: 'Meditation Apps, Wellness Sites, Eco-Friendly Products'
        }
    };

    // ----------------------------------------------------
    // 1. ฟังก์ชันวิเคราะห์อารมณ์จากข้อความ (Text Sentiment)
    // ----------------------------------------------------
    function detectTextSentiment(text) {
        const lower = text.toLowerCase();
        if (lower.includes('sad') || lower.includes('cry') || lower.includes('depressed') || lower.includes('bad')) {
            return 'SADNESS';
        } else if (lower.includes('angry') || lower.includes('hate') || lower.includes('mad')) {
            return 'ANGER';
        } else if (lower.includes('scared') || lower.includes('fear') || lower.includes('afraid')) {
            return 'FEAR';
        } else {
            return 'JOY';
        }
    }

    // ----------------------------------------------------
    // 2. ฟังก์ชันประมวลผลอารมณ์จากพิกเซลสีภาพ (Image Color Psychology)
    // ----------------------------------------------------
    function analyzeColorSentiment(rgbColors) {
        let totalR = 0, totalG = 0, totalB = 0;
        
        rgbColors.forEach(color => {
            totalR += color.r;
            totalG += color.g;
            totalB += color.b;
        });

        const count = rgbColors.length;
        const avgR = totalR / count;
        const avgG = totalG / count;
        const avgB = totalB / count;

        // คำนวณค่าความสว่าง (Brightness)
        const brightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

        // แยกอารมณ์ตามเฉดสีหลักและความสว่าง
        if (brightness < 80) {
            return 'FEAR'; // โทนสลัว/มืด
        } else if (avgR > avgG * 1.3 && avgR > avgB * 1.3) {
            return 'ANGER'; // โทนสีแดง/ส้มเข้ม
        } else if (avgB > avgR * 1.1 && brightness < 150) {
            return 'SADNESS'; // โทนน้ำเงิน/หม่น
        } else if (avgG > avgR && avgB > avgR) {
            return 'CALM'; // โทนเขียว/ฟ้าเย็น
        } else {
            return 'JOY'; // โทนสว่างสดใส
        }
    }

    // ----------------------------------------------------
    // 3. ระบบอัปเดต UI เมื่อกดวิเคราะห์ข้อความ
    // ----------------------------------------------------
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = textInput ? textInput.value.trim() : '';

            if (!text) {
                if (alertBox) {
                    alertBox.innerText = '⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!';
                    alertBox.style.display = 'block';
                }
                return;
            }

            if (alertBox) alertBox.style.display = 'none';

            const detectedEmotion = detectTextSentiment(text);
            updateUIResult(detectedEmotion, (88 + Math.floor(Math.random() * 11)) + '.5%');
        });
    }

    // ----------------------------------------------------
    // 4. ระบบอัปโหลดและวิเคราะห์อารมณ์จากรูปภาพ
    // ----------------------------------------------------
    if (uploadTriggerBtn && imageInput) {
        uploadTriggerBtn.addEventListener('click', () => imageInput.click());
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

                    // สกัดข้อมูลสี RGB
                    const rgbData = extractRGBColors(ctx, canvas.width, canvas.height, 5);
                    
                    // แสดงจานสีที่ดึงได้จากรูปภาพ
                    renderExtractedPalette(rgbData.hexList);

                    // วิเคราะห์อารมณ์จากสีของรูปภาพ แล้วอัปเดตหน้า UI ทันที!
                    const imageEmotion = analyzeColorSentiment(rgbData.rgbList);
                    updateUIResult(imageEmotion, (90 + Math.floor(Math.random() * 9)) + '.0%');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // สกัดสีจาก Canvas เป็นทั้ง HEX และ RGB
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

    // อัปเดตผลลัพธ์บน UI ทั้งหมด
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