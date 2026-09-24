document.addEventListener('DOMContentLoaded', () => {
    // หา Element จาก ID ในหน้า web/index.html
    const imageInput = document.getElementById('imageInput') || document.querySelector('input[type="file"]');
    const paletteContainer = document.getElementById('paletteDisplay') || document.getElementById('palette');

    if (!imageInput) return;

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // สร้าง Canvas จำลองสกัดสี 5 จุดหลักจากภาพ
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // สุ่ม/ดึงค่าสีพิกเซลจากภาพ
                const colors = extractColorsFromCanvas(ctx, canvas.width, canvas.height, 5);
                
                // แสดงผลจานสีบนหน้าจอ
                displayExtractedPalette(colors);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
});

// ฟังก์ชันสกัดสีสี่เหลี่ยมผืนผ้าจำลองจาก Canvas
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

// ฟังก์ชันแสดงผลแถบสีบน UI
function displayExtractedPalette(colors) {
    const container = document.getElementById('extractedPalette') || document.getElementById('palette');
    if (!container) return;
    
    container.innerHTML = '';
    colors.forEach(color => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.style.width = '60px';
        div.style.height = '60px';
        div.style.borderRadius = '8px';
        div.style.display = 'inline-block';
        div.style.margin = '4px';
        div.title = color;
        container.appendChild(div);
    });
}