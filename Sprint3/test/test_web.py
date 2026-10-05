"""Sprint 3 tests: Web Dashboard & Deployment.

Checks that the web app stays consistent with Sprint 1/2 Python code
(palettes, WCAG math, advisory rules, CSS/JSON export format), that the
bilingual dictionary is complete, and that the Pages workflow is wired up.

Run:  pytest tests/sprint3 -v
JS logic is executed with Node; those tests are skipped if Node is missing.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, ROOT)

from src.sprint1.ai_advisory import AIAdvisory  # noqa: E402
from src.sprint2.palette_engine import PaletteEngine  # noqa: E402

WEB = os.path.join(ROOT, "web")
APP_JS = os.path.join(WEB, "app.js")
NODE = shutil.which("node")


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding="utf-8") as f:
        return f.read()


def js(expr):
    """Evaluate a JS expression against app.js (Node) and return parsed JSON."""
    code = "const c=require(%s);console.log(JSON.stringify(%s));" % (json.dumps(APP_JS), expr)
    out = subprocess.run([NODE, "-e", code], capture_output=True, text=True, timeout=30)
    if out.returncode != 0:
        raise AssertionError(out.stderr)
    return json.loads(out.stdout)


class TestWebFiles(unittest.TestCase):
    def test_required_files_exist(self):
        for name in ("index.html", "style.css", "app.js"):
            self.assertTrue(os.path.isfile(os.path.join(WEB, name)), name)

    def test_index_links_assets(self):
        html = read("web", "index.html")
        self.assertIn('href="style.css"', html)
        self.assertIn('src="app.js"', html)
        self.assertIn('name="viewport"', html)

    def test_every_js_id_exists_in_html(self):
        html_ids = set(re.findall(r'id="([^"]+)"', read("web", "index.html")))
        js_ids = set(re.findall(r"\$\('([^']+)'\)", read("web", "app.js")))
        self.assertTrue(js_ids)
        self.assertEqual(js_ids - html_ids, set())

    def test_relative_paths_for_github_pages(self):
        html = read("web", "index.html")
        for ref in re.findall(r'(?:href|src)="([^"]+)"', html):
            if not ref.startswith(("http", "#", "data:")):
                self.assertFalse(ref.startswith("/"), ref)


class TestWorkflow(unittest.TestCase):
    def setUp(self):
        self.yml = read(".github", "workflows", "deploy-web.yml")

    def test_deploys_to_github_pages(self):
        for needle in ("actions/configure-pages", "actions/upload-pages-artifact",
                       "actions/deploy-pages", "pages: write", "id-token: write"):
            self.assertIn(needle, self.yml)

    def test_publishes_web_folder(self):
        self.assertRegex(self.yml, r"path:\s*web\b")

    def test_tests_gate_deploy(self):
        self.assertIn("needs: test", self.yml)
        self.assertIn("pytest tests/sprint3", self.yml)


@unittest.skipUnless(NODE, "Node.js not installed")
class TestSprint2Parity(unittest.TestCase):
    def test_emotions_and_palettes_match_python(self):
        self.assertEqual(js("c.EMOTIONS"), list(PaletteEngine.EMOTION_PALETTES))
        self.assertEqual(js("c.PALETTES"), PaletteEngine.EMOTION_PALETTES)
        for pal in PaletteEngine.EMOTION_PALETTES.values():
            self.assertEqual(len(pal), 8)

    def test_unknown_emotion_falls_back_to_neutral(self):
        for value in ("'surprise'", "''", "null"):
            self.assertEqual(js("c.getPalette(%s)" % value), PaletteEngine.get_palette("neutral"))

    def test_contrast_ratio_matches_python_for_all_pairs(self):
        pairs = [(a, b) for pal in PaletteEngine.EMOTION_PALETTES.values() for a in pal for b in pal]
        got = js("%s.map(p=>c.contrastRatio(p[0],p[1]))" % json.dumps(pairs))
        want = [PaletteEngine.calculate_contrast_ratio(a, b) for a, b in pairs]
        self.assertEqual(got, want)

    def test_wcag_status_matches_python(self):
        for fg, bg in (("#073B4C", "#FFFCF9"), ("#FFD166", "#FFFCF9"), ("#000000", "#FFFFFF"), ("#777777", "#FFFFFF")):
            got = js("c.evaluateWcag(%s,%s)" % (json.dumps(fg), json.dumps(bg)))
            self.assertEqual(got, PaletteEngine.evaluate_wcag_compliance(fg, bg))

    def test_black_on_white_is_21(self):
        self.assertEqual(js("c.contrastRatio('#000000','#FFFFFF')"), 21.0)

    def test_invalid_hex_rejected(self):
        with self.assertRaises(AssertionError):
            js("c.hexToRgb('#12')")


@unittest.skipUnless(NODE, "Node.js not installed")
class TestAdvisoryAndI18n(unittest.TestCase):
    def test_sprint1_advisory_themes_kept(self):
        for emotion in ("joy", "sadness", "anger"):
            web = js("c.getAdvice(%s)" % json.dumps(emotion))
            py = AIAdvisory.get_advice(emotion)
            self.assertEqual(web["theme"], py["theme"])
            self.assertTrue(web["usage"]["th"].startswith("เหมาะกับ") and py["usage"].startswith("เหมาะกับ"))
            self.assertTrue(py["font"].startswith(web["font"].split(" / ")[0]))

    def test_every_emotion_has_advice_in_both_languages(self):
        for emotion in PaletteEngine.EMOTION_PALETTES:
            a = js("c.getAdvice(%s)" % json.dumps(emotion))
            self.assertTrue(a["theme"] and a["font"] and a["usage"]["th"] and a["usage"]["en"])

    def test_unknown_emotion_advice_is_neutral(self):
        self.assertEqual(js("c.getAdvice('zzz')")["theme"], "Modern Neutral")

    def test_th_en_have_same_keys(self):
        i18n = js("c.I18N")
        self.assertEqual(set(i18n["th"]), set(i18n["en"]))
        for lang in ("th", "en"):
            self.assertTrue(all(v.strip() for v in i18n[lang].values()), lang)

    def test_html_data_i18n_keys_defined(self):
        keys = set(re.findall(r'data-i18n="([^"]+)"', read("web", "index.html")))
        i18n = js("c.I18N")
        for lang in ("th", "en"):
            self.assertEqual(keys - set(i18n[lang]), set(), lang)

    def test_emotion_and_role_labels_defined(self):
        i18n = js("c.I18N")
        emotions, roles = js("c.EMOTIONS"), js("c.ROLES")
        for lang in ("th", "en"):
            for e in emotions:
                self.assertIn("emo_" + e, i18n[lang])
            for r in roles:
                self.assertIn("role_" + r, i18n[lang])
        self.assertEqual(len(roles), 8)

    def test_thai_text_is_thai_and_english_is_ascii_heavy(self):
        i18n = js("c.I18N")
        self.assertRegex(i18n["th"]["subtitle"], r"[\u0E00-\u0E7F]")
        self.assertNotRegex(i18n["en"]["subtitle"], r"[\u0E00-\u0E7F]")


@unittest.skipUnless(NODE, "Node.js not installed")
class TestAnalyzer(unittest.TestCase):
    def test_english_keywords(self):
        self.assertEqual(js("c.analyzeText('I am so happy and excited')")["label"], "joy")
        self.assertEqual(js("c.analyzeText('I hate this, I am furious')")["label"], "anger")
        self.assertEqual(js("c.analyzeText('I feel lonely and sad')")["label"], "sadness")

    def test_thai_keywords(self):
        self.assertEqual(js("c.analyzeText('ฉันกลัวมาก')")["label"], "fear")
        self.assertEqual(js("c.analyzeText('ฉันรักเธอ')")["label"], "love")

    def test_no_match_or_empty_is_neutral(self):
        for text in ("'table chair'", "''", "null"):
            self.assertEqual(js("c.analyzeText(%s)" % text), {"label": "neutral", "score": 0.5})

    def test_score_in_range(self):
        score = js("c.analyzeText('happy joy great')")["score"]
        self.assertTrue(0 < score <= 1)


@unittest.skipUnless(NODE, "Node.js not installed")
class TestImageExtractor(unittest.TestCase):
    @staticmethod
    def rgba(blocks):
        data = []
        for (r, g, b, a), n in blocks:
            data += [r, g, b, a] * n
        return data

    def extract(self, blocks, count=8):
        return js("c.extractColors(Uint8ClampedArray.from(%s),%d)" % (json.dumps(self.rgba(blocks)), count))

    def test_returns_requested_count_of_valid_hex(self):
        out = self.extract([((255, 0, 0, 255), 50), ((0, 0, 255, 255), 30), ((0, 255, 0, 255), 20)])
        self.assertEqual(len(out), 8)
        for h in out:
            self.assertRegex(h, r"^#[0-9A-F]{6}$")

    def test_dominant_color_first(self):
        out = self.extract([((255, 0, 0, 255), 60), ((0, 0, 255, 255), 10)])
        self.assertEqual(out[0], "#FF0000")
        self.assertIn("#0000FF", out)

    def test_transparent_pixels_ignored(self):
        out = self.extract([((255, 0, 0, 0), 100), ((0, 255, 0, 255), 5)])
        self.assertEqual(out[0], "#00FF00")

    def test_fully_transparent_image_gives_empty(self):
        self.assertEqual(self.extract([((9, 9, 9, 0), 10)]), [])

    def test_flat_image_still_fills_palette(self):
        out = self.extract([((10, 20, 30, 255), 40)])
        self.assertEqual(len(out), 8)
        self.assertEqual(set(out), {"#0A141E"})


@unittest.skipUnless(NODE, "Node.js not installed")
class TestExportParity(unittest.TestCase):
    def test_css_matches_report_generator(self):
        try:
            from src.sprint2.report_generator import ReportGenerator
        except ImportError:
            self.skipTest("pandas not installed")
        pal = PaletteEngine.get_palette("joy")
        with tempfile.TemporaryDirectory() as d:
            path = ReportGenerator.export_to_css(pal, os.path.join(d, "p.css"))
            with open(path) as f:
                py_css = f.read()
        self.assertEqual(js("c.toCss(%s)" % json.dumps(pal)), py_css)

    def test_json_matches_report_generator(self):
        try:
            from src.sprint2.report_generator import ReportGenerator
        except ImportError:
            self.skipTest("pandas not installed")
        pal = PaletteEngine.get_palette("fear")
        with tempfile.TemporaryDirectory() as d:
            path = ReportGenerator.export_to_json("fear", pal, os.path.join(d, "p.json"))
            with open(path) as f:
                py_json = f.read()
        self.assertEqual(js("c.toJson('fear',%s)" % json.dumps(pal)), py_json)


if __name__ == "__main__":
    unittest.main()
