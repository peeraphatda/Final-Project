document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const alertBox = document.getElementById('alertBox');
    
    const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
    const imageInput = document.getElementById('imageInput');
    const extractedPalette = document.getElementById('extractedPalette');
    const extractedPaletteSection = document.getElementById('extractedPaletteSection');

    // ----------------------------------------------------
    // 1. ระบบตรวจเช็กข้อความว่าง (Validation)
    // ----------------------------------------------------
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = textInput ? textInput.value.trim() : '';

            if (!text) {
                if (alertBox) {
                    alertBox.innerText = '⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!';
                    alertBox.style.display = 'block';
                } else {
                    alert('⚠️ กรุณากรอกข้อความก่อนทำการวิเคราะห์!');
                }
                return;
            }

            if (alertBox) alertBox.style.display = 'none';
            console.log('Analyzing:', text);
            // สั่งประมวลผลต่อตาม Logic ของคุณ...
        });
    }

    // ----------------------------------------------------
    // 2. ระบบผูกปุ่มอัปโหลดรูปภาพ (Trigger File Input)
    // ----------------------------------------------------
    if (uploadTriggerBtn && imageInput) {
        uploadTriggerBtn.addEventListener('click', () => {
            imageInput.click(); // สั่งเปิดหน้าต่างเลือกไฟล์
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
                    // สร้าง Canvas สกัดสีจากภาพ
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const colors = extractColors(ctx, canvas.width, canvas.height, 5);
                    renderPalette(colors);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // ฟังก์ชันดึงสีจาก Canvas
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

    // ฟังก์ชันวาดจานสีลง UI
    function renderPalette(colors) {
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