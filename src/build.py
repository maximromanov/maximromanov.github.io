#!/usr/bin/env python3
"""
Build maximromanov.github.io.

Reads   src/data/*.yml        structured data (publications, talks, teaching, cv, site)
        src/content/**/*.md   pages and notes (Markdown with a YAML front matter block)
        src/templates/base.html
Writes  docs/                 the published site (GitHub Pages serves this folder)

Dependencies: Python 3.9+, PyYAML, Markdown  (pip install pyyaml markdown)
Run:          python3 src/build.py
"""
import codecs
import datetime
import hashlib
import html
import re
import shutil
import sys
from pathlib import Path

import markdown
import yaml

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = ROOT / "docs"
DATA = SRC / "data"
CONTENT = SRC / "content"

MD_EXTENSIONS = ["extra", "toc", "sane_lists"]
MD_CONFIG = {"toc": {"permalink": False}}

# --------------------------------------------------------------------------- helpers


def load_yaml(name):
    with open(DATA / f"{name}.yml", encoding="utf-8") as f:
        return yaml.safe_load(f)


def md(text):
    """Convert a Markdown block to HTML."""
    if not text:
        return ""
    return markdown.markdown(text, extensions=MD_EXTENSIONS, extension_configs=MD_CONFIG)


def mdi(text):
    """Convert an inline Markdown string (no surrounding <p>)."""
    if text is None:
        return ""
    out = markdown.markdown(str(text), extensions=["extra"])
    out = re.sub(r"^<p>(.*)</p>$", r"\1", out.strip(), flags=re.S)
    out = re.sub(r"\{\{email:([^}]+)\}\}", lambda m: email_html(m.group(1)), out)
    return out


def esc(text):
    return html.escape(str(text), quote=True)


def read_front_matter(path):
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", raw, flags=re.S)
    if not m:
        return {}, raw
    meta = yaml.safe_load(m.group(1)) or {}
    return meta, m.group(2)


def write(path_in_docs, text):
    path = OUT / path_in_docs.lstrip("/")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


def permalink_to_file(permalink):
    """'/research/' -> 'research/index.html'; '/2017/10-14.html' -> '2017/10-14.html'."""
    if permalink.endswith("/"):
        return permalink + "index.html"
    return permalink


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)



def scramble(addr):
    """ROT13 the letters and reverse the string; theme.js undoes it in the browser."""
    return codecs.encode(addr, "rot13")[::-1]


def email_html(addr, label=None):
    """A link that opens the mail client only when clicked; the address is never in an href or on screen."""
    shown = label or addr.replace("@", " [at] ")
    return f'<a class="email" href="#contact" data-e="{esc(scramble(addr))}">{esc(shown)}</a>'


# --------------------------------------------------------------------------- site / template

SITE = load_yaml("site")
TEMPLATE = (SRC / "templates" / "base.html").read_text(encoding="utf-8")
BUILD_ID = hashlib.md5(str(datetime.datetime.now()).encode()).hexdigest()[:8]
YEAR = datetime.date.today().year


def nav_html(active_path):
    items = []
    for item in SITE["nav"]:
        is_active = active_path.startswith(item["url"]) and item["url"] != "/"
        cls = ' class="active"' if is_active else ""
        items.append(
            f'<a href="{item["url"]}"{cls}><span class="nav-num" aria-hidden="true">{item["num"]}</span>{item["label"]}</a>'
        )
    return "\n      ".join(items)


def link_html(l):
    if l.get("email"):
        return email_html(l["email"], l["label"])
    return f'<a href="{l["url"]}">{l["label"]}</a>'


def analytics_code():
    return (SITE.get("analytics") or {}).get("goatcounter") or ""


def analytics_html():
    code = analytics_code()
    if not code:
        return ""
    return f'<script data-goatcounter="https://{esc(code)}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>'


def views_html():
    code = analytics_code()
    if not code or not (SITE.get("analytics") or {}).get("show_views"):
        return ""
    return f' <span class="views" data-views="https://{esc(code)}.goatcounter.com/counter/TOTAL.json"></span>'


def foot_links_html():
    return " · ".join(link_html(l) for l in SITE["links"])


def render(page):
    """page: dict with title, description, content, permalink, body_class, main_class, extra_head."""
    title = page["title"]
    full_title = title if page.get("is_home") else f"{title} · {SITE['name']}"
    out = TEMPLATE
    values = {
        "title": esc(full_title),
        "description": esc(page.get("description") or SITE["description"]),
        "canonical": SITE["url"] + page["permalink"],
        "nav": nav_html(page["permalink"]),
        "content": page["content"],
        "body_class": page.get("body_class", ""),
        "main_class": page.get("main_class", ""),
        "extra_head": page.get("extra_head", ""),
        "foot_links": foot_links_html(),
        "footer_note": SITE["footer_note_counted"] if analytics_code() else SITE["footer_note"],
        "analytics": analytics_html(),
        "views": views_html(),
        "old_name": SITE["old_name"],
        "old_name_ar": SITE["old_name_ar"],
        "year": str(YEAR),
        "build_id": BUILD_ID,
    }
    for k, v in values.items():
        out = out.replace("{{" + k + "}}", v)
    write(permalink_to_file(page["permalink"]), out)


def illustration_html(ill, cls="illus"):
    """ill: {src, alt, caption}. Renders a framed figure; -640 variant is used on small screens."""
    if not ill:
        return ""
    src = ill["src"]
    small = src.replace(".jpg", "-640.jpg")
    cap = f'<figcaption>{mdi(ill["caption"])}</figcaption>' if ill.get("caption") else ""
    return (
        f'<figure class="{cls}"><img src="{esc(src)}" srcset="{esc(small)} 640w, {esc(src)} 1200w" '
        f'sizes="(max-width: 720px) 100vw, 380px" alt="{esc(ill.get("alt", ""))}" loading="eager">{cap}</figure>'
    )


def page_head(title, lede=None, kicker=None, illustration=None):
    h = '<header class="page-head' + (' page-head-illus' if illustration else '') + '"><div class="page-head-text">'
    if kicker:
        h += f'<p class="app">{mdi(kicker)}</p>'
    h += f"<h1>{mdi(title)}</h1>"
    if lede:
        h += f'<p class="lede">{mdi(lede)}</p>'
    h += "</div>" + illustration_html(illustration) + "</header>"
    return h


# --------------------------------------------------------------------------- data renderers


def links_row(links):
    if not links:
        return ""
    parts = []
    for l in links:
        url = l["url"]
        label = l["label"]
        ext = "" if url.startswith("/") or url.startswith("#") else ' rel="noopener"'
        parts.append(f'<a class="it-link" href="{esc(url)}"{ext}>{esc(label)}</a>')
    return '<p class="it-links">' + " ".join(parts) + "</p>"


def tag_badges(tags):
    if not tags:
        return ""
    names = {
        "key": ("key", "Key contribution to digital humanities in the field"),
        "pr": ("peer-reviewed", "Peer-reviewed"),
        "oa": ("open access", "Open access"),
        "eis1600": ("EIS1600", "Output of the EIS1600 project"),
    }
    out = []
    for t in tags:
        if t in names:
            label, title = names[t]
            out.append(f'<span class="badge badge-{t}" title="{esc(title)}">{label}</span>')
    return ('<span class="badges">' + "".join(out) + "</span>") if out else ""


def render_publication(p):
    year = str(p.get("year", ""))
    status = p.get("status")
    label = f'<span class="it-year">{year}</span>'
    if status:
        label += f'<span class="it-status">{esc(status)}</span>'
    body = f'<h3 class="it-title">{mdi(p["title"])}</h3>'
    meta = []
    if p.get("authors"):
        meta.append(f'<span class="it-authors">{mdi(p["authors"])}</span>')
    if p.get("venue"):
        meta.append(f'<span class="it-venue">{mdi(p["venue"])}</span>')
    if p.get("lang"):
        meta.append(f'<span class="it-lang">in {esc(p["lang"])}</span>')
    if meta:
        body += '<p class="it-meta">' + " · ".join(meta) + "</p>"
    if p.get("note"):
        body += f'<p class="it-note">{mdi(p["note"])}</p>'
    if p.get("abstract"):
        body += f'<details class="it-abstract"><summary>Abstract</summary>{md(p["abstract"])}</details>'
    if p.get("toc"):
        body += '<details class="it-abstract"><summary>Contents</summary><ul class="it-toc">' + "".join(
            f"<li>{mdi(x)}</li>" for x in p["toc"]
        ) + "</ul></details>"
    body += links_row(p.get("links"))
    body += tag_badges(p.get("tags"))
    key = " it-key" if "key" in (p.get("tags") or []) else ""
    anchor = f' id="{esc(p["id"])}"' if p.get("id") else ""
    if p.get("cover"):
        cover = f'<a class="it-cover" href="{esc(p["links"][0]["url"]) if p.get("links") else "#"}"><img src="{esc(p["cover"])}" alt="Cover of {esc(strip_tags(mdi(p["title"])))}" loading="lazy"></a>'
        body = f'<div class="it-with-cover">{cover}<div class="it-cover-text">{body}</div></div>'
    return f'<li class="item{key}"{anchor}><div class="it-label">{label}</div><div class="it-body">{body}</div></li>'


def find_publication(pid):
    for p in load_yaml("publications")["items"]:
        if p.get("id") == pid:
            return p
    return None


def render_featured_book(pid):
    """A compact panel with cover, title, one line, and links, for the home page."""
    p = find_publication(pid)
    if not p:
        return ""
    title = mdi(p["title"])
    links = links_row(p.get("links"))
    blurb = mdi(p.get("feature_blurb") or "")
    return (
        '<section class="feature-book" aria-label="New book">'
        f'<a class="fb-cover" href="{esc(p["links"][0]["url"])}"><img src="{esc(p["cover"])}" alt="" width="180"></a>'
        '<div class="fb-text"><p class="app">New book · Brill, 2026</p>'
        f'<h2 class="fb-title">{title}</h2>'
        f'<p class="fb-blurb">{blurb}</p>{links}</div></section>'
    )


def render_publications_page(meta, intro_md):
    data = load_yaml("publications")
    groups = data["groups"]
    items = data["items"]
    out = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
    out += f'<div class="prose intro">{md(intro_md)}</div>' if intro_md.strip() else ""
    out += '<nav class="subnav" aria-label="Sections">' + " ".join(
        f'<a href="#{g["id"]}">{esc(g["title"])}</a>' for g in groups
    ) + "</nav>"
    out += '<p class="legend"><span class="badge badge-key">key</span> key contribution to digital humanities in the field · <span class="badge badge-pr">peer-reviewed</span> · <span class="badge badge-oa">open access</span> · <span class="badge badge-eis1600">EIS1600</span> project output</p>'
    for g in groups:
        gi = [p for p in items if p.get("group") == g["id"]]
        if not gi:
            continue
        out += f'<section class="items-section" id="{g["id"]}"><h2>{esc(g["title"])}</h2>'
        if g.get("blurb"):
            out += f'<p class="section-blurb">{mdi(g["blurb"])}</p>'
        out += '<ol class="items">' + "".join(render_publication(p) for p in gi) + "</ol></section>"
    return out


def render_talk(t, show_kind=True):
    label = f'<span class="it-year">{esc(t["date"])}</span>'
    where = t.get("country", "")
    if t.get("online"):
        where = (where + " · online").strip(" ·")
    if where:
        label += f'<span class="it-where">{esc(where)}</span>'
    body = f'<h3 class="it-title">{mdi(t["title"])}</h3>'
    if t.get("detail"):
        d = t["detail"]
        if d[:1].islower():
            d = d[0].upper() + d[1:]
        body += f'<p class="it-meta">{mdi(d)}</p>'
    body += links_row(t.get("links"))
    kind = t.get("kind")
    cls = "item"
    if kind == "keynote":
        body += '<span class="badges"><span class="badge badge-key">keynote</span></span>'
        cls += " it-key"
    elif kind == "poster" and show_kind:
        body += '<span class="badges"><span class="badge badge-pr">poster</span></span>'
    return f'<li class="{cls}"><div class="it-label">{label}</div><div class="it-body">{body}</div></li>'


def render_year_grouped(entries, renderer):
    """Render a list grouped by year with a year heading."""
    out = ""
    current = None
    for e in entries:
        y = e.get("year") or 0
        if y != current:
            if current is not None:
                out += "</ol>"
            current = y
            out += f'<h3 class="year-head">{y if y else "Undated"}</h3><ol class="items">'
        out += renderer(e)
    if current is not None:
        out += "</ol>"
    return out


def render_talks_page(meta, intro_md):
    data = load_yaml("talks")
    out = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
    out += f'<div class="prose intro">{md(intro_md)}</div>' if intro_md.strip() else ""
    sections = [
        ("invited", "Invited Talks, Guest Lectures, Keynotes"),
        ("papers", "Conference Papers and Presentations"),
        ("organizing", "Panels, Workshops, and Roundtables Organized"),
    ]
    out += '<nav class="subnav" aria-label="Sections">' + " ".join(
        f'<a href="#{sid}">{title}</a>' for sid, title in sections
    ) + "</nav>"
    for sid, title in sections:
        entries = data[sid]
        out += f'<section class="items-section" id="{sid}"><h2>{title} <span class="count">{len(entries)}</span></h2>'
        out += render_year_grouped(entries, render_talk)
        out += "</section>"
    return out


def render_course(c):
    label = f'<span class="it-year">{esc(c.get("years", ""))}</span>'
    if c.get("area"):
        label += f'<span class="it-where">{esc(c["area"])}</span>'
    body = f'<h3 class="it-title">{mdi(c["title"])}</h3>'
    meta = []
    if c.get("institution"):
        meta.append(esc(c["institution"]))
    if c.get("terms"):
        meta.append(esc(c["terms"]))
    if meta:
        body += '<p class="it-meta">' + " · ".join(meta) + "</p>"
    if c.get("note"):
        body += f'<p class="it-note">{mdi(c["note"])}</p>'
    body += links_row(c.get("links"))
    return f'<li class="item"><div class="it-label">{label}</div><div class="it-body">{body}</div></li>'


def render_supervision(s):
    label = f'<span class="it-year">{esc(s["years"])}</span><span class="it-where">{esc(s["level"])}</span>'
    body = f'<h3 class="it-title">{esc(s["student"])}</h3>'
    body += f'<p class="it-meta">{mdi(s["title"])}</p>'
    extra = [esc(s["institution"])]
    if s.get("role"):
        extra.append(esc(s["role"]))
    body += '<p class="it-note">' + " · ".join(extra) + "</p>"
    return f'<li class="item"><div class="it-label">{label}</div><div class="it-body">{body}</div></li>'


def render_teaching_page(meta, intro_md):
    data = load_yaml("teaching")
    out = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
    out += f'<div class="prose intro">{md(intro_md)}</div>' if intro_md.strip() else ""
    out += '<nav class="subnav" aria-label="Sections"><a href="#courses">Courses</a> <a href="#workshops">Workshops and Summer Schools</a> <a href="#supervision">Supervision</a></nav>'
    out += '<section class="items-section" id="courses"><h2>Courses</h2>'
    out += '<ol class="items">' + "".join(render_course(c) for c in data["courses"]) + "</ol></section>"
    out += '<section class="items-section" id="workshops"><h2>Workshops and Summer Schools Taught</h2>'
    out += '<ol class="items">' + "".join(render_talk(w) for w in data["workshops"]) + "</ol></section>"
    out += '<section class="items-section" id="supervision"><h2>Supervision</h2>'
    out += '<ol class="items">' + "".join(render_supervision(s) for s in data["supervision"]) + "</ol></section>"
    return out


def render_simple_rows(rows):
    out = '<ol class="items items-compact">'
    for r in rows:
        out += f'<li class="item"><div class="it-label"><span class="it-year">{mdi(r.get("years", ""))}</span></div><div class="it-body"><p class="it-text">{mdi(r["text"])}</p></div></li>'
    return out + "</ol>"


def render_cv_page(meta, intro_md):
    cv = load_yaml("cv")
    pubs = load_yaml("publications")
    talks = load_yaml("talks")
    teaching = load_yaml("teaching")
    out = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
    out += f'<div class="prose intro">{md(intro_md)}</div>' if intro_md.strip() else ""
    sections = []

    def sec(sid, title, body):
        sections.append((sid, title))
        return f'<section class="items-section cv-section" id="{sid}"><h2>{title}</h2>{body}</section>'

    top = '<dl class="cv-top">'
    for row in cv["top"]:
        top += f'<dt>{esc(row["label"])}</dt><dd>{mdi(row["text"])}</dd>'
    top += "</dl>"
    body = top
    body += sec("employment", "Employment", render_simple_rows(cv["employment"]))
    body += sec("education", "Education", render_simple_rows(cv["education"]))
    body += sec("projects", "Digital Humanities Projects", render_simple_rows(cv["projects"]))
    pub_html = ""
    for g in pubs["groups"]:
        gi = [p for p in pubs["items"] if p.get("group") == g["id"] and not g.get("cv_skip")]
        if gi:
            pub_html += f'<h3 class="year-head">{esc(g["title"])}</h3><ol class="items">' + "".join(render_publication(p) for p in gi) + "</ol>"
    body += sec("publications", "Publications", pub_html)
    body += sec("invited", "Invited Talks, Guest Lectures, Keynotes", render_year_grouped(talks["invited"], render_talk))
    body += sec("papers", "Conference Papers and Presentations", render_year_grouped(talks["papers"], render_talk))
    body += sec("organizing", "Panels, Workshops, and Roundtables Organized", render_year_grouped(talks["organizing"], render_talk))
    body += sec("teaching", "Teaching", '<ol class="items">' + "".join(render_course(c) for c in teaching["courses"]) + "</ol>")
    body += sec("workshops", "Workshops and Summer Schools Taught", '<ol class="items">' + "".join(render_talk(w) for w in teaching["workshops"]) + "</ol>")
    body += sec("supervision", "Supervision", '<ol class="items">' + "".join(render_supervision(s) for s in teaching["supervision"]) + "</ol>")
    body += sec("funding", "Third-Party Funding", render_simple_rows(cv["funding"]))
    body += sec("awards", "Fellowships, Awards, and Honors", render_simple_rows(cv["awards"]))
    body += sec("service", "Service to the Field", render_simple_rows(cv["service"]))
    body += sec("membership", "Professional Membership", render_simple_rows(cv["membership"]))
    body += sec("skills", "Skills", render_simple_rows(cv["skills"]))
    nav = '<nav class="subnav" aria-label="Sections">' + " ".join(f'<a href="#{sid}">{t}</a>' for sid, t in sections) + "</nav>"
    return out + nav + body


# --------------------------------------------------------------------------- notes


def collect_notes():
    notes = []
    for path in sorted((CONTENT / "notes").glob("*.md")):
        meta, body = read_front_matter(path)
        if meta.get("draft"):
            continue
        slug = meta.get("slug") or re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)
        date = meta.get("date")
        if isinstance(date, str):
            date = datetime.date.fromisoformat(date[:10])
        if date is None:
            m = re.match(r"^(\d{4}-\d{2}-\d{2})", path.stem)
            date = datetime.date.fromisoformat(m.group(1)) if m else datetime.date.today()
        meta["date"] = date
        meta["slug"] = slug
        meta["permalink"] = f"/notes/{slug}/"
        notes.append((meta, body))
    notes.sort(key=lambda n: n[0]["date"], reverse=True)
    return notes


def note_cover(meta):
    if not meta.get("cover"):
        return ""
    cap = f'<figcaption>{mdi(meta["cover_caption"])}</figcaption>' if meta.get("cover_caption") else ""
    return f'<figure class="cover"><img src="{esc(meta["cover"])}" alt="" loading="lazy">{cap}</figure>'


def render_note(meta, body):
    date = meta["date"].strftime("%B %-d, %Y")
    tags = meta.get("tags") or []
    tags_html = ("".join(f'<span class="tag">{esc(t)}</span>' for t in tags)) if tags else ""
    head = f'<header class="page-head note-head"><p class="app"><a href="/notes/">Notes</a> · <time datetime="{meta["date"].isoformat()}">{date}</time></p><h1>{mdi(meta["title"])}</h1>'
    if meta.get("subtitle"):
        head += f'<p class="lede">{mdi(meta["subtitle"])}</p>'
    head += "</header>"
    content = head + note_cover(meta) + f'<article class="prose note-body">{md(body)}</article>'
    if tags_html:
        content += f'<p class="tags">{tags_html}</p>'
    if meta.get("old_url"):
        content += ""
    render({
        "title": strip_tags(mdi(meta["title"])),
        "description": strip_tags(mdi(meta.get("excerpt") or meta["title"])),
        "content": content,
        "permalink": meta["permalink"],
        "body_class": "page-note",
    })


def render_notes_index(meta, intro_md, notes):
    out = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
    out += f'<div class="prose intro">{md(intro_md)}</div>' if intro_md.strip() else ""
    out += '<ol class="items notes-list">'
    for m, _ in notes:
        date = m["date"].strftime("%B %Y")
        excerpt = f'<p class="it-meta">{mdi(m["excerpt"])}</p>' if m.get("excerpt") else ""
        out += (
            f'<li class="item"><div class="it-label"><span class="it-year">{date}</span></div>'
            f'<div class="it-body"><h3 class="it-title"><a href="{m["permalink"]}">{mdi(m["title"])}</a></h3>{excerpt}</div></li>'
        )
    out += "</ol>"
    return out


# --------------------------------------------------------------------------- pages


def build_pages():
    notes = collect_notes()
    for meta, body in notes:
        render_note(meta, body)
        for old in meta.get("old_urls") or []:
            write_redirect(old, meta["permalink"])

    for path in sorted(CONTENT.glob("*.md")):
        meta, body = read_front_matter(path)
        layout = meta.get("layout", "page")
        permalink = meta.get("permalink") or f"/{path.stem}/"
        page = {
            "title": meta["title"],
            "description": meta.get("description"),
            "permalink": permalink,
            "body_class": f"page-{layout}",
            "main_class": meta.get("main_class", ""),
        }
        if layout == "home":
            page["is_home"] = True
            page["content"] = render_home(meta, body)
        elif layout == "publications":
            page["content"] = render_publications_page(meta, body)
        elif layout == "talks":
            page["content"] = render_talks_page(meta, body)
        elif layout == "teaching":
            page["content"] = render_teaching_page(meta, body)
        elif layout == "cv":
            page["content"] = render_cv_page(meta, body)
        elif layout == "notes":
            page["content"] = render_notes_index(meta, body, notes)
        else:
            head = page_head(meta["title"], meta.get("lede"), meta.get("kicker"), meta.get("illustration"))
            cls = "prose" + (" prose-wide" if meta.get("wide") else "")
            toc = ""
            if meta.get("toc"):
                m = markdown.Markdown(extensions=MD_EXTENSIONS, extension_configs={"toc": {"permalink": False, "toc_depth": "2-3"}})
                html_body = m.convert(body)
                toc = f'<nav class="toc" aria-label="Contents"><p class="app">Contents</p>{m.toc}</nav>'
            else:
                html_body = md(body)
            page["content"] = head + toc + f'<article class="{cls}">{html_body}</article>'
        render(page)
        for old in meta.get("old_urls") or []:
            write_redirect(old, permalink)
    return notes


def render_home(meta, body):
    """Home page: a hero block, then the essay from the Markdown body, then a project rail."""
    links = " · ".join(link_html(l) for l in SITE["links"])
    hero = '<section class="home-head home-head-illus"><div class="home-head-text">'
    if meta.get("kicker"):
        hero += f'<p class="app">{mdi(meta["kicker"])}</p>'
    hero += f'<h1>{esc(SITE["name"])}</h1>'
    if meta.get("standing"):
        hero += f'<p class="hd-standing">{mdi(meta["standing"])}</p>'
    if meta.get("position"):
        hero += f'<p class="hd-position">{mdi(meta["position"])}</p>'
    hero += f'<p class="hd-links">{links}</p>'
    if meta.get("illustration"):
        side = illustration_html(meta.get("illustration"), cls="illus illus-home")
    elif meta.get("portrait"):
        pt = meta["portrait"]
        small = pt["src"].replace(".jpg", "-360.jpg")
        side = (
            f'<figure class="illus portrait"><img src="{esc(pt["src"])}" srcset="{esc(small)} 360w, {esc(pt["src"])} 720w" '
            f'sizes="(max-width: 720px) 60vw, 300px" alt="{esc(pt.get("alt", ""))}">'
            f'<figcaption class="portrait-ar" lang="ar" dir="rtl">{esc(SITE.get("name_ar", ""))}</figcaption></figure>'
        )
    else:
        side = f'<div class="hd-ar-wrap" aria-hidden="true"><p class="hd-ar" lang="ar" dir="rtl">{esc(SITE.get("name_ar", ""))}</p></div>'
    hero += "</div>" + side + "</section>"
    rail = '<section class="rail" aria-label="Projects"><ul class="rail-list">'
    for p in SITE["projects_rail"]:
        rail += f'<li><a href="{p["url"]}"><span class="rail-abbr">{esc(p["abbr"])}</span><span class="rail-label">{esc(p["label"])}</span></a></li>'
    rail += "</ul></section>"
    feature = render_featured_book(meta["feature_book"]) if meta.get("feature_book") else ""
    essay = f'<article class="prose home-essay">{md(body)}</article>'
    return hero + rail + feature + essay


def write_redirect(old, new):
    target = SITE["url"] + new
    doc = (
        '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'
        f'<title>Redirecting to {esc(new)}</title><link rel="canonical" href="{esc(target)}">'
        f'<meta http-equiv="refresh" content="0; url={esc(target)}"><meta name="robots" content="noindex">'
        f'</head><body><p>This page has moved to <a href="{esc(target)}">{esc(target)}</a>.</p></body></html>'
    )
    write(permalink_to_file(old), doc)


def build_extras(notes):
    for r in SITE.get("redirects", []):
        write_redirect(r["from"], r["to"])
    # sitemap
    urls = ["/"] + [n["url"] for n in SITE["nav"]] + [m["permalink"] for m, _ in notes]
    for path in CONTENT.glob("*.md"):
        meta, _ = read_front_matter(path)
        pl = meta.get("permalink") or f"/{path.stem}/"
        if pl not in urls:
            urls.append(pl)
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sm += "".join(f"  <url><loc>{SITE['url']}{u}</loc></url>\n" for u in urls)
    sm += "</urlset>\n"
    write("/sitemap.xml", sm)
    write("/robots.txt", f"User-agent: *\nAllow: /\nSitemap: {SITE['url']}/sitemap.xml\n")
    write("/.nojekyll", "")
    write("/404.html", TEMPLATE_404)


TEMPLATE_404 = None


def build():
    global TEMPLATE_404
    # 404 page rendered through the normal template
    content = page_head("Page not found", "The address you followed does not exist on this site. The old site's addresses for posts and PDFs were preserved, so a missing page most likely came from a typo.")
    content += '<p class="prose"><a href="/">Return to the home page</a> or browse the <a href="/notes/">notes</a> and <a href="/publications/">publications</a>.</p>'
    tmp = OUT / "404.html"
    render({"title": "Page not found", "content": content, "permalink": "/404.html", "body_class": "page-404"})
    TEMPLATE_404 = tmp.read_text(encoding="utf-8")
    notes = build_pages()
    build_extras(notes)
    print(f"built {len(notes)} notes; output in {OUT}")


if __name__ == "__main__":
    build()
