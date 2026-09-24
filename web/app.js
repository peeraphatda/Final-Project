document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. ระบบวิเคราะห์ข้อความ + แจ้งเตือนเมื่อข้อความว่าง
    // ==========================================
    const textInput = document.getElementById('textInput') || document.querySelector('textarea');
    const analyzeBtn = document.getElementById('analyzeBtn') || document.querySelector('button');
    const alertBox = document.getElementById('alertBox') || document.getElementById('errorMessage');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const textValue = textInput ? textInput.value.trim() : '';

            // ถ้าไม่ใส่ข้อความ ให้แสดงการแจ้งเตือน
            if (!textValue) {
                if (alertBox) {
                    alertBox.innerText = '⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!';
                    alertBox.style.display = 'block';
                    alertBox.style.color = '#ff4d4f';
                } else {
                    alert('⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!');
                }
                return;
            }

            // ซ่อนกล่องแจ้งเตือนเมื่อมีข้อความถูกต้อง
            if (alertBox) alertBox.style.display = 'none';

            // ประมวลผลวิเคราะห์อารมณ์ (ส่วนเชื่อมต่อระบบ)
            console.log('Analyzing text:', textValue);
        });
    }

    // ==========================================
    // 2. ระบบอัปโหลดและสกัดสีจากรูปภาพ (Image Extractor)
    // ==========================================
    const imageInput = document.getElementById('imageInput') || document.querySelector('input[type="file"]');
    const extractedPalette = document.getElementById('extractedPalette') || document.getElementById('paletteDisplay');

    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    // วาดภาพลง Canvas จำลอง
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // สกัดสี 5 จุดหลัก
                    const colors = extractColorsFromCanvas(ctx, canvas.width, canvas.height, 5);

                    // แสดงผลจานสีบนหน้าเว็บ
                    renderExtractedColors(colors, extractedPalette);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
});

// ฟังก์ชันดึงสีจาก Canvas
function extractColorsFromCanvas(ctx, width, height, count) {
    const colors = [];
    const stepX = Math.floor(width / (count + 1));
    const stepY = Math.floor(height / 2);

    for (let i = 1; i <= count; i++) {
        const pixel = ctx.getImageData(i * stepX, stepY, 1, 1).data;
        const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
        colors.push(hex);
    }
    return colors;
}

// ฟังก์ชันวาดแถบสีลงหน้า HTML
function renderExtractedColors(colors, container) {
    if (!container) return;
    container.innerHTML = '';

    colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.style.backgroundColor = color;
        swatch.style.width = '60px';
        swatch.style.height = '60px';
        swatch.style.borderRadius = '10px';
        swatch.style.display = 'inline-block';
        swatch.style.margin = '6px';
        swatch.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        swatch.title = color;

        const label = document.createElement('span');
        label.innerText = color;
        label.style.display = 'block';
        label.style.fontSize = '11px';
        label.style.textAlign = 'center';
        label.style.marginTop = '65px';
        label.style.color = '#fff';

        swatch.appendChild(label);
        container.appendChild(swatch);
    });
}