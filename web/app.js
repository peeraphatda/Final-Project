// Web Interactive Logic & Bilingual Engine
let currentLang = 'TH';

const i18n = {
    TH: {
        subTitle: "ระบบวิเคราะห์อารมณ์จากข้อความพร้อมแนะนำจานสี",
        inputHeading: "กรอกข้อความภาษาอังกฤษเพื่อวิเคราะห์อารมณ์",
        analyzeBtn: "วิเคราะห์อารมณ์ (Analyze)",
        uploadText: "อัปโหลดรูปภาพ (Extract Image)",
        advisoryHeading: "💡 AI Design Advisory"
    },
    EN: {
        subTitle: "Text Sentiment Analyzer & AI Color Palette Generator",
        inputHeading: "Enter English text to analyze sentiment",
        analyzeBtn: "Analyze Emotion",
        uploadText: "Upload Image",
        advisoryHeading: "💡 AI Design Advisory"
    }
};

document.getElementById('lang-toggle-btn').addEventListener('click', () => {
    currentLang = currentLang === 'TH' ? 'EN' : 'TH';
    document.getElementById('sub-title').innerText = i18n[currentLang].subTitle;
    document.getElementById('input-heading').innerText = i18n[currentLang].inputHeading;
    document.getElementById('analyze-btn').innerText = i18n[currentLang].analyzeBtn;
    document.getElementById('upload-text').innerText = i18n[currentLang].uploadText;
    document.getElementById('advisory-heading').innerText = i18n[currentLang].advisoryHeading;
});

// Analyze Button Click Event
document.getElementById('analyze-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value.trim();
    if (!text) {
        alert(currentLang === 'TH' ? 'กรุณากรอกข้อความก่อนกดวิเคราะห์!' : 'Please enter text first!');
        return;
    }

    // Mock Output Response (Demo Web UI)
    document.getElementById('emotion-label').innerText = "JOY";
    document.getElementById('confidence-score').innerText = "98.5%";
    
    const colors = ["#FFD700", "#FF8C00", "#FF69B4", "#00BFFF", "#32CD32"];
    const swatchesContainer = document.getElementById('palette-swatches');
    swatchesContainer.innerHTML = '';
    
    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'swatch-item';
        div.style.backgroundColor = color;
        div.innerText = color;
        div.onclick = () => {
            navigator.clipboard.writeText(color);
            alert(`Copied ${color} to clipboard!`);
        };
        swatchesContainer.appendChild(div);
    });

    document.getElementById('adv-theme').innerText = "Vibrant Sunburst";
    document.getElementById('adv-font').innerText = "Poppins / Montserrat";
    document.getElementById('adv-usage').innerText = "E-Commerce, Festival Branding, UI Dashboard";
    
    document.getElementById('result-section').classList.remove('hidden');
});