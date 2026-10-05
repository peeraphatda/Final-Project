/* Smart Art & Palette - Sprint 3 web dashboard
 * Pure logic (palettes, WCAG, advisory, analyzer, extractor) is kept separate from
 * the DOM code so it can be unit-tested in Node (see tests/sprint3).
 * Palettes and WCAG math mirror src/sprint2/palette_engine.py exactly. */
(function (root) {
  'use strict';

  const EMOTIONS = ['joy', 'sadness', 'anger', 'fear', 'love', 'neutral'];

  const PALETTES = {
    joy: ['#FFD166', '#FFFCF9', '#06D6A0', '#118AB2', '#EF476F', '#073B4C', '#FFE8D6', '#264653'],
    sadness: ['#1D2D44', '#3E5C76', '#748CAB', '#F0F3F4', '#0B132B', '#1C2541', '#5BC0BE', '#ADB5BD'],
    anger: ['#D90429', '#EF233C', '#2B2D42', '#8D99AE', '#EDF2F4', '#212529', '#FFB703', '#6A040F'],
    fear: ['#240046', '#3C096C', '#5A189A', '#7B2CBF', '#9D4EDD', '#E0AAFF', '#10002B', '#C77DFF'],
    love: ['#FFB5A7', '#FCD5CE', '#F8AD9D', '#F4978E', '#FBC4AB', '#FFCAD4', '#B5E2FA', '#4A4E69'],
    neutral: ['#2B2D42', '#8D99AE', '#EDF2F4', '#F8F9FA', '#6C757D', '#343A40', '#E9ECEF', '#ADB5BD']
  };

  const ROLES = ['primary', 'secondary', 'accent', 'bgLight', 'bgDark', 'textDark', 'textLight', 'muted'];

  /* ---------- Palette + WCAG 2.1 (port of palette_engine.py) ---------- */
  function getPalette(emotion) {
    const key = emotion ? String(emotion).toLowerCase().trim() : 'neutral';
    return (PALETTES[key] || PALETTES.neutral).slice();
  }

  function hexToRgb(hex) {
    const h = String(hex).replace(/^#/, '');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error('Invalid HEX color format: ' + hex);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function relativeLuminance(rgb) {
    const [r, g, b] = rgb.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function contrastRatio(hex1, hex2) {
    const l1 = relativeLuminance(hexToRgb(hex1));
    const l2 = relativeLuminance(hexToRgb(hex2));
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(ratio * 100) / 100;
  }

  function evaluateWcag(fg, bg) {
    const ratio = contrastRatio(fg, bg);
    let status = 'FAIL';
    if (ratio >= 7.0) status = 'PASS (AAA)';
    else if (ratio >= 4.5) status = 'PASS (AA)';
    return { foreground: fg, background: bg, contrast_ratio: ratio, status: status, is_compliant: ratio >= 4.5 };
  }

  /* ---------- Advisory (Sprint 1 rules + Sprint 3 additions) ---------- */
  const ADVISORY = {
    joy: { theme: 'Vibrant Sunburst', font: 'Poppins / Montserrat',
      usage: { th: 'เหมาะกับแอป E-Commerce, เว็บไซต์งานเทศกาล หรือ Branding อาหารและเครื่องดื่ม', en: 'Suits e-commerce apps, festival sites, and food & beverage branding.' } },
    sadness: { theme: 'Melancholic Rain', font: 'Merriweather / Lora',
      usage: { th: 'เหมาะกับแอปเพื่อการทำสมาธิ (Meditation App) หรือบล็อกเขียนบทความ', en: 'Suits meditation apps and long-form blogs.' } },
    anger: { theme: 'High-Contrast Impact', font: 'Oswald / Bebas Neue',
      usage: { th: 'เหมาะกับแบนเนอร์สินค้ากีฬา หรือสื่อประชาสัมพันธ์การออกกำลังกาย', en: 'Suits sports banners and fitness promotions.' } },
    fear: { theme: 'Midnight Suspense', font: 'Cinzel / Raleway',
      usage: { th: 'เหมาะกับเกมสยองขวัญ โปสเตอร์ภาพยนตร์ หรือหน้า Landing แนวลึกลับ', en: 'Suits horror games, film posters, and mystery landing pages.' } },
    love: { theme: 'Soft Blush', font: 'Playfair Display / Nunito',
      usage: { th: 'เหมาะกับการ์ดอวยพร งานแต่งงาน หรือแบรนด์ความงาม', en: 'Suits greeting cards, weddings, and beauty brands.' } },
    neutral: { theme: 'Modern Neutral', font: 'Inter / Roboto',
      usage: { th: 'เหมาะสำหรับแอปพลิเคชันทั่วไปและ Dashboard', en: 'Suits general applications and dashboards.' } }
  };

  function getAdvice(emotion) {
    return ADVISORY[String(emotion || '').toLowerCase()] || ADVISORY.neutral;
  }

  /* ---------- Demo analyzer (rule-based; the HF model runs only in the Python CLI) ---------- */
  const LEXICON = {
    joy: ['happy', 'joy', 'great', 'awesome', 'excited', 'wonderful', 'fun', 'delighted', 'สุข', 'ดีใจ', 'สนุก', 'ยินดี', 'เยี่ยม'],
    sadness: ['sad', 'cry', 'lonely', 'miss', 'grief', 'hopeless', 'depressed', 'tears', 'เศร้า', 'เหงา', 'ร้องไห้', 'คิดถึง', 'เสียใจ'],
    anger: ['angry', 'hate', 'furious', 'mad', 'rage', 'annoyed', 'unfair', 'โกรธ', 'เกลียด', 'หงุดหงิด', 'โมโห', 'ไม่ยุติธรรม'],
    fear: ['afraid', 'scared', 'fear', 'terrified', 'anxious', 'panic', 'nervous', 'กลัว', 'หวาดกลัว', 'กังวล', 'ตื่นตระหนก', 'ประหม่า'],
    love: ['love', 'adore', 'darling', 'sweet', 'romantic', 'caring', 'heart', 'รัก', 'หลงรัก', 'อบอุ่น', 'หวาน', 'ห่วงใย']
  };

  function analyzeText(text) {
    const lower = String(text || '').toLowerCase();
    const hits = {};
    let total = 0;
    EMOTIONS.forEach((e) => {
      (LEXICON[e] || []).forEach((w) => { if (lower.indexOf(w) !== -1) { hits[e] = (hits[e] || 0) + 1; total += 1; } });
    });
    if (!total) return { label: 'neutral', score: 0.5 };
    const best = Object.keys(hits).sort((a, b) => hits[b] - hits[a])[0];
    const score = (hits[best] / total) * (0.6 + 0.4 * Math.min(1, total / 3));
    return { label: best, score: Math.round(score * 10000) / 10000 };
  }

  /* ---------- Image color extractor ---------- */
  function extractColors(rgba, count) {
    count = count || 8;
    const bins = new Map();
    for (let i = 0; i + 3 < rgba.length; i += 4) {
      if (rgba[i + 3] < 125) continue;
      const key = ((rgba[i] >> 4) << 8) | ((rgba[i + 1] >> 4) << 4) | (rgba[i + 2] >> 4);
      const b = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
      b.n += 1; b.r += rgba[i]; b.g += rgba[i + 1]; b.b += rgba[i + 2];
      bins.set(key, b);
    }
    const ranked = Array.from(bins.values())
      .sort((a, b) => b.n - a.n)
      .map((b) => [b.r / b.n, b.g / b.n, b.b / b.n]);
    const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const chosen = [];
    [48, 24, 0].forEach((minDist) => {
      ranked.forEach((c) => {
        if (chosen.length < count && !chosen.includes(c) && chosen.every((o) => dist(o, c) > minDist)) chosen.push(c);
      });
    });
    const out = chosen.map(rgbToHex);
    while (out.length && out.length < count) out.push(out[out.length - 1]); // tiny/flat images
    return out;
  }

  /* ---------- Exports (same format as src/sprint2/report_generator.py) ---------- */
  function toCss(palette) {
    return ':root {\n' + palette.map((c, i) => '  --color-' + (i + 1) + ': ' + c + ';\n').join('') + '}\n';
  }
  function toJson(emotion, palette) {
    return JSON.stringify({ emotion: emotion, colors: palette }, null, 2);
  }

  /* ---------- i18n ---------- */
  const I18N = {
    th: {
      title: 'Smart Art & Palette', subtitle: 'วิเคราะห์อารมณ์จากข้อความหรือรูปภาพ แล้วสร้างจานสี 8 สีพร้อมตรวจความอ่านง่าย WCAG',
      textTitle: 'จากข้อความ', textHint: 'พิมพ์ข้อความภาษาอังกฤษหรือไทย หรือเลือกอารมณ์เอง',
      placeholder: 'เช่น I feel so happy today', analyze: 'วิเคราะห์อารมณ์', empty: 'กรุณากรอกข้อความก่อน',
      imageTitle: 'จากรูปภาพ', imageHint: 'ลากรูปมาวาง หรือกดเพื่อเลือกไฟล์ สีจะถูกสกัดในเบราว์เซอร์ ไม่อัปโหลดไปที่ใด', imageError: 'อ่านรูปไม่ได้ ลองไฟล์ JPG, PNG หรือ WebP',
      paletteTitle: 'จานสี', copyHint: 'กดที่สีเพื่อคัดลอก HEX', copied: 'คัดลอกแล้ว', exportCss: 'ดาวน์โหลด CSS', exportJson: 'ดาวน์โหลด JSON',
      adviceTitle: 'คำแนะนำการออกแบบ', theme: 'ธีม', font: 'ฟอนต์', usage: 'การใช้งาน',
      wcagTitle: 'ตรวจความอ่านง่าย WCAG 2.1', fg: 'สีตัวอักษร', bg: 'สีพื้นหลัง', ratio: 'อัตราส่วนคอนทราสต์', sample: 'ตัวอย่างข้อความ Aa กขค',
      resultEmotion: 'อารมณ์', confidence: 'ความมั่นใจ', fromImage: 'สกัดจากรูปภาพ', demoNote: 'ตัววิเคราะห์บนเว็บเป็นแบบกฎคำสำคัญ โมเดล Hugging Face ใช้ใน CLI เท่านั้น',
      emo_joy: 'สุข', emo_sadness: 'เศร้า', emo_anger: 'โกรธ', emo_fear: 'กลัว', emo_love: 'รัก', emo_neutral: 'เป็นกลาง',
      role_primary: 'หลัก', role_secondary: 'รอง', role_accent: 'เน้น', role_bgLight: 'พื้นสว่าง', role_bgDark: 'พื้นเข้ม', role_textDark: 'ตัวอักษรเข้ม', role_textLight: 'ตัวอักษรสว่าง', role_muted: 'ขอบ/จาง'
    },
    en: {
      title: 'Smart Art & Palette', subtitle: 'Read the emotion in text or an image, get an 8-color palette, and check it against WCAG contrast.',
      textTitle: 'From text', textHint: 'Type English or Thai text, or pick an emotion yourself.',
      placeholder: 'e.g. I feel so happy today', analyze: 'Analyze emotion', empty: 'Enter some text first.',
      imageTitle: 'From an image', imageHint: 'Drop an image or click to choose one. Colors are extracted in your browser and never uploaded.', imageError: "Couldn't read that image. Try a JPG, PNG, or WebP file.",
      paletteTitle: 'Palette', copyHint: 'Click a swatch to copy its HEX', copied: 'Copied', exportCss: 'Download CSS', exportJson: 'Download JSON',
      adviceTitle: 'Design advice', theme: 'Theme', font: 'Font', usage: 'Best for',
      wcagTitle: 'WCAG 2.1 contrast check', fg: 'Text color', bg: 'Background', ratio: 'Contrast ratio', sample: 'Sample text Aa Bb',
      resultEmotion: 'Emotion', confidence: 'Confidence', fromImage: 'Extracted from image', demoNote: 'The web analyzer uses keyword rules. The Hugging Face model runs only in the Python CLI.',
      emo_joy: 'Joy', emo_sadness: 'Sadness', emo_anger: 'Anger', emo_fear: 'Fear', emo_love: 'Love', emo_neutral: 'Neutral',
      role_primary: 'Primary', role_secondary: 'Secondary', role_accent: 'Accent', role_bgLight: 'Light bg', role_bgDark: 'Dark bg', role_textDark: 'Dark text', role_textLight: 'Light text', role_muted: 'Border/muted'
    }
  };

  const core = { EMOTIONS, PALETTES, ROLES, ADVISORY, LEXICON, I18N, getPalette, hexToRgb, rgbToHex, relativeLuminance,
    contrastRatio, evaluateWcag, getAdvice, analyzeText, extractColors, toCss, toJson };

  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  root.PaletteCore = core;
  if (typeof document === 'undefined') return;

  /* ---------- DOM ---------- */
  const $ = (id) => document.getElementById(id);
  const state = { lang: 'th', label: 'neutral', colors: getPalette('neutral'), source: 'text', score: null, fg: 5, bg: 1 };

  const t = (k) => (I18N[state.lang][k] !== undefined ? I18N[state.lang][k] : k);

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } return null; }

  function toast(msg) {
    const el = $('status'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toast.id); toast.id = setTimeout(() => el.classList.remove('show'), 1600);
  }

  function applyTheme() {
    state.colors.forEach((c, i) => document.documentElement.style.setProperty('--c' + (i + 1), c));
  }

  function renderI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $('text-input').placeholder = t('placeholder');
    $('lang-toggle').textContent = state.lang === 'th' ? 'EN' : 'TH';
    $('lang-toggle').setAttribute('aria-label', state.lang === 'th' ? 'Switch to English' : 'สลับเป็นภาษาไทย');
    document.title = t('title');
    renderChips(); renderPalette(); renderAdvice(); renderWcag(); renderResult();
  }

  function renderChips() {
    const wrap = $('chips'); wrap.innerHTML = '';
    EMOTIONS.forEach((e) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = t('emo_' + e);
      b.setAttribute('aria-pressed', String(state.label === e && state.source === 'text'));
      b.addEventListener('click', () => setPalette(e, getPalette(e), 'text', null));
      wrap.appendChild(b);
    });
  }

  function renderResult() {
    const el = $('result');
    if (state.source === 'image') { el.textContent = t('fromImage'); return; }
    let s = t('resultEmotion') + ': ' + t('emo_' + state.label);
    if (state.score !== null) s += ' · ' + t('confidence') + ': ' + (state.score * 100).toFixed(1) + '%';
    el.textContent = s;
  }

  function renderPalette() {
    const wrap = $('swatches'); wrap.innerHTML = '';
    state.colors.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'swatch'; b.style.setProperty('--sw', c);
      const dark = relativeLuminance(hexToRgb(c)) < 0.4;
      b.dataset.tone = dark ? 'dark' : 'light';
      b.innerHTML = '<span class="hex"></span><span class="role"></span>';
      b.querySelector('.hex').textContent = c;
      b.querySelector('.role').textContent = t('role_' + ROLES[i]);
      b.setAttribute('aria-label', c + ', ' + t('role_' + ROLES[i]));
      b.addEventListener('click', () => {
        const done = () => toast(t('copied') + ' ' + c);
        if (navigator.clipboard) navigator.clipboard.writeText(c).then(done, done); else done();
      });
      wrap.appendChild(b);
    });
  }

  function renderAdvice() {
    const a = getAdvice(state.label);
    $('adv-theme').textContent = a.theme;
    $('adv-font').textContent = a.font;
    $('adv-usage').textContent = a.usage[state.lang];
  }

  function renderWcag() {
    ['fg', 'bg'].forEach((k) => {
      const sel = $('sel-' + k); sel.innerHTML = '';
      state.colors.forEach((c, i) => {
        const o = document.createElement('option'); o.value = i; o.textContent = c + ' · ' + t('role_' + ROLES[i]); sel.appendChild(o);
      });
      sel.value = state[k];
    });
    const fg = state.colors[state.fg], bg = state.colors[state.bg];
    const r = evaluateWcag(fg, bg);
    const sample = $('wcag-sample'); sample.style.color = fg; sample.style.background = bg; sample.textContent = t('sample');
    $('wcag-ratio').textContent = r.contrast_ratio.toFixed(2) + ' : 1';
    const badge = $('wcag-status'); badge.textContent = r.status; badge.dataset.ok = String(r.is_compliant);
  }

  function setPalette(label, colors, source, score) {
    Object.assign(state, { label: label, colors: colors, source: source, score: score });
    applyTheme(); renderChips(); renderPalette(); renderAdvice(); renderWcag(); renderResult();
  }

  function download(name, text, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: type }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function handleImage(file) {
    if (!file || !/^image\//.test(file.type)) { toast(t('imageError')); return; }
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const size = 80, scale = Math.min(1, size / Math.max(img.width, img.height));
      const cv = $('canvas'); cv.width = Math.max(1, Math.round(img.width * scale)); cv.height = Math.max(1, Math.round(img.height * scale));
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      $('preview').src = ''; $('preview').src = URL.createObjectURL(file); $('preview').hidden = false;
      setPalette('neutral', extractColors(ctx.getImageData(0, 0, cv.width, cv.height).data, 8), 'image', null);
    };
    img.onerror = () => { URL.revokeObjectURL(url); toast(t('imageError')); };
    img.src = url;
  }

  function init() {
    state.lang = store('lang') === 'en' ? 'en' : 'th';
    $('lang-toggle').addEventListener('click', () => { state.lang = state.lang === 'th' ? 'en' : 'th'; store('lang', state.lang); renderI18n(); });
    $('analyze').addEventListener('click', () => {
      const text = $('text-input').value.trim();
      if (!text) { toast(t('empty')); $('text-input').focus(); return; }
      const r = analyzeText(text); setPalette(r.label, getPalette(r.label), 'text', r.score);
    });
    $('sel-fg').addEventListener('change', (e) => { state.fg = +e.target.value; renderWcag(); });
    $('sel-bg').addEventListener('change', (e) => { state.bg = +e.target.value; renderWcag(); });
    $('export-css').addEventListener('click', () => download('palette.css', toCss(state.colors), 'text/css'));
    $('export-json').addEventListener('click', () => download('palette.json', toJson(state.label, state.colors), 'application/json'));
    const drop = $('drop'), file = $('file');
    file.addEventListener('change', () => handleImage(file.files[0]));
    ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', (e) => handleImage(e.dataTransfer.files[0]));
    applyTheme(); renderI18n();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(typeof window !== 'undefined' ? window : globalThis);
