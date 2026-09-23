#!/usr/bin/env python3
"""
Render the CV page (docs/cv/index.html) to docs/files/Romanov_CV.pdf with headless Chromium.

Requires: pip install playwright && python3 -m playwright install chromium
Run after src/build.py:  python3 src/make_cv_pdf.py
"""
import http.server
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
OUT = DOCS / "files" / "Romanov_CV.pdf"
PORT = 8791


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


class Server(socketserver.TCPServer):
    allow_reuse_address = True


def main():
    handler = lambda *a, **k: Quiet(*a, directory=str(DOCS), **k)
    with Server(("127.0.0.1", PORT), handler) as httpd:
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(color_scheme="light")
            page.goto(f"http://127.0.0.1:{PORT}/cv/", wait_until="networkidle")
            page.emulate_media(media="print")
            page.pdf(
                path=str(OUT),
                format="A4",
                print_background=False,
                margin={"top": "18mm", "bottom": "18mm", "left": "16mm", "right": "16mm"},
                display_header_footer=True,
                header_template='<div></div>',
                footer_template='<div style="font-size:8px;font-family:Helvetica,Arial,sans-serif;color:#777;width:100%;text-align:center;">Maxim Romanov · Curriculum Vitae · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
            )
            browser.close()
        httpd.shutdown()
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
