#!/usr/bin/env python3
"""
Typeset docs/files/Romanov_CV.pdf with XeLaTeX from the same YAML data that builds the CV page
(src/data/cv.yml, publications.yml, talks.yml, teaching.yml), using src/cv/template.tex.

Requires: xelatex on PATH (MacTeX) and the macOS Baskerville font.
Run after src/build.py:  python3 src/make_cv_pdf.py
"""
import datetime
import html
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
TEMPLATE = ROOT / "src" / "cv" / "template.tex"
LOGO = ROOT / "docs" / "assets" / "img" / "rm-mark.png"
OUT = ROOT / "docs" / "files" / "Romanov_CV.pdf"


def load(name):
    return yaml.safe_load((DATA / f"{name}.yml").read_text(encoding="utf-8"))


# ----------------------------------------------------------------- inline Markdown -> LaTeX

_ESC = {"\\": r"\textbackslash{}", "&": r"\&", "%": r"\%", "$": r"\$", "#": r"\#", "_": r"\_",
        "{": r"\{", "}": r"\}", "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
        "<": r"\textless{}", ">": r"\textgreater{}"}


def esc(s):
    return "".join(_ESC.get(c, c) for c in s)


def esc_url(u):
    return u.replace("\\", "/").replace("%", r"\%").replace("#", r"\#")


def tex(s):
    """Convert the site's inline Markdown (italics, bold, links, code, {{email}}) to LaTeX."""
    if s is None:
        return ""
    s = html.unescape(str(s)).replace("\\*", "\x00A\x00")
    s = re.sub(r"\{\{email:([^}]+)\}\}", lambda m: m.group(1).replace("@", " [at] "), s)
    links, codes = [], []

    def stash_link(m):
        links.append((m.group(1), m.group(2)))
        return f"\x00L{len(links) - 1}\x00"

    def stash_code(m):
        codes.append(m.group(1))
        return f"\x00C{len(codes) - 1}\x00"

    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", stash_link, s)
    s = re.sub(r"`([^`]+)`", stash_code, s)
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\\textbf{\1}", s)
    s = re.sub(r"(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"\\textit{\1}", s)
    s = s.replace("<br>", r"\\ ")
    s = re.sub(r"\x00C(\d+)\x00", lambda m: r"\texttt{" + esc(codes[int(m.group(1))]) + "}", s)

    def put_link(m):
        text, url = links[int(m.group(1))]
        if url.startswith("/"):
            url = "https://maximromanov.github.io" + url
        return r"\href{" + esc_url(url) + "}{" + tex(text) + "}"

    s = re.sub(r"\x00L(\d+)\x00", put_link, s)
    return s.replace("\x00A\x00", "*")


# ----------------------------------------------------------------- sections

def section(title, items):
    """items: list of (label, body) already in LaTeX."""
    body = "\n".join(f"  \\item[{lab}] {txt}" for lab, txt in items)
    return f"\\section*{{{title}}}\n\\begin{{itemize}}\n{body}\n\\end{{itemize}}\n"


def label(*parts):
    parts = [p for p in parts if p]
    return r"\textit{" + " ".join(parts) + "}"


def simple_rows(rows):
    return [(label(tex(r.get("years", ""))), tex(r["text"])) for r in rows]


def links_tex(links, drop=("Project page",)):
    out = []
    for l in links or []:
        if l["label"] in drop:
            continue
        out.append(tex(f'[{l["label"]}]({l["url"]})'))
    return " · ".join(out)


def publication(p):
    lab = label(str(p.get("year", "")), tex(p.get("status", "")))
    parts = [r"\textbf{" + tex(p["title"]) + "}"]
    if p.get("authors"):
        parts.append(tex(p["authors"]))
    if p.get("venue"):
        parts.append(tex(p["venue"]))
    body = ". ".join(x.rstrip(".") for x in parts) + "."
    tags = p.get("tags") or []
    marks = []
    if "key" in tags:
        marks.append(r"\textcolor{rmred}{\textbf{key}}")
    if "pr" in tags:
        marks.append("pr")
    if "oa" in tags:
        marks.append("oa")
    if marks:
        body += " {\\small[" + ", ".join(marks) + "]}"
    l = links_tex(p.get("links"))
    if l:
        body += " » " + l
    return lab, body


def talk(t):
    where = t.get("country", "")
    if t.get("online"):
        where = (where + " · online").strip(" ·")
    lab = label(tex(t["date"]) + ":", tex(where)) if where else label(tex(t["date"]))
    body = r"\textbf{" + tex(t["title"]) + "}"
    if t.get("detail"):
        d = t["detail"]
        body += ", " + tex(d)
    if t.get("kind") == "keynote":
        body += r" {\small[\textcolor{rmred}{\textbf{keynote}}]}"
    return lab, body


def course(c):
    lab = label(tex(c.get("years", "")))
    body = r"\textbf{" + tex(c["title"]) + "}"
    meta = [c.get("institution"), c.get("terms"), c.get("area")]
    meta = [tex(m) for m in meta if m]
    if meta:
        body += ", " + " · ".join(meta)
    l = links_tex(c.get("links"))
    if l:
        body += " » " + l
    return lab, body


def supervision(s):
    lab = label(tex(s["years"]) + ":", tex(s["level"]))
    body = r"\textbf{" + tex(s["student"]) + "}, " + tex(s["title"]) + ", " + tex(s["institution"])
    if s.get("role"):
        body += " (" + tex(s["role"]) + ")"
    return lab, body


def main():
    cv, pubs, talks, teaching = load("cv"), load("publications"), load("talks"), load("teaching")
    today = datetime.date.today()
    secs = []
    top = [(label(tex(r["label"])), tex(r["text"])) for r in cv["top"] if r["label"] != "PDF"]
    secs.append("\\begin{itemize}\n" + "\n".join(f"  \\item[{a}] {b}" for a, b in top) + "\n\\end{itemize}\n")
    secs.append(section("Employment", simple_rows(cv["employment"])))
    secs.append(section("Education", simple_rows(cv["education"])))
    secs.append(section("Digital Humanities Projects", simple_rows(cv["projects"])))
    pub_items = []
    for g in pubs["groups"]:
        gi = [p for p in pubs["items"] if p.get("group") == g["id"]]
        if not gi:
            continue
        pub_items.append(("", r"\textsc{" + tex(g["title"].lower()) + "}"))
        pub_items += [publication(p) for p in gi]
    secs.append(section("Publications", [("", r"{\small key = key contribution to digital humanities in the field · pr = peer-reviewed · oa = open access}")] + pub_items))
    secs.append(section("Invited Talks, Guest Lectures, Keynotes", [talk(t) for t in talks["invited"]]))
    secs.append(section("Conference Papers and Presentations", [talk(t) for t in talks["papers"]]))
    secs.append(section("Panels, Workshops, and Roundtables Organized", [talk(t) for t in talks["organizing"]]))
    secs.append(section("Teaching", [course(c) for c in teaching["courses"]]))
    secs.append(section("Workshops and Summer Schools Taught", [talk(w) for w in teaching["workshops"]]))
    secs.append(section("Supervision", [supervision(s) for s in teaching["supervision"]]))
    secs.append(section("Third-Party Funding", simple_rows(cv["funding"])))
    secs.append(section("Fellowships, Awards, and Honors", simple_rows(cv["awards"])))
    secs.append(section("Service to the Field", simple_rows(cv["service"])))
    secs.append(section("Professional Membership", simple_rows(cv["membership"])))
    secs.append(section("Skills", simple_rows(cv["skills"])))

    nameextra = next((r["text"] for r in cv["top"] if r["label"] == "Position"), "")
    doc = TEMPLATE.read_text(encoding="utf-8")
    doc = doc.replace("@@nameextra@@", tex(nameextra)).replace("@@date@@", today.strftime("%B %-d, %Y"))
    doc = doc.replace("@@sections@@", "\n".join(secs))

    with tempfile.TemporaryDirectory() as tmp:
        tmpd = Path(tmp)
        (tmpd / "cv.tex").write_text(doc, encoding="utf-8")
        shutil.copy(LOGO, tmpd / "rm-mark.png")
        for _ in range(2):
            r = subprocess.run(["xelatex", "-interaction=nonstopmode", "-halt-on-error", "cv.tex"], cwd=tmpd,
                               capture_output=True, text=True)
            if r.returncode != 0:
                log = (tmpd / "cv.log").read_text(errors="replace")
                print(log[-3000:])
                sys.exit("xelatex failed")
        log = (tmpd / "cv.log").read_text(errors="replace")
        missing = sorted(set(re.findall(r"Missing character: There is no (\S+)", log)))
        if missing:
            print("missing glyphs:", " ".join(missing))
        shutil.copy(tmpd / "cv.pdf", OUT)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
