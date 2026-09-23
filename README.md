# maximromanov.github.io

Personal research website of Maxim Romanov. A hand-built static site: no framework, no
JavaScript beyond a dark-mode toggle, no trackers. GitHub Pages serves the `docs/` folder
exactly as committed.

## Layout

```
src/
  build.py            renders src/ into docs/  (python3 src/build.py)
  make_cv_pdf.py      renders docs/cv/ to docs/files/Romanov_CV.pdf (optional; needs playwright)
  templates/base.html the one page template (header, nav, footer)
  data/
    site.yml          name, navigation, contact links, project rail, redirects, footer
    publications.yml  publications grouped by type
    talks.yml         invited talks, conference papers, organized events
    teaching.yml      courses, workshops taught, supervision
    cv.yml            employment, education, funding, awards, service, membership, skills
  content/
    index.md          home page (hero fields in the front matter, essay in the body)
    research.md       project descriptions (one <div class="project"> per project)
    publications.md, talks.md, teaching.md, cv.md, notes.md   page heads for data-driven pages
    mARkdown.md, openITI.md, maktaba.md, althurayya.md          long-form pages kept from the old site
    notes/YYYY-MM-DD-slug.md   notes (blog posts); published at /notes/slug/
docs/                 the published site — everything under it is served as is
  assets/             site.css, theme.js, fonts/ (self-hosted), img/
  publications/, files/, presentations/, projects/, images/   PDFs and media carried over from the old site;
                                                              their URLs are unchanged
```

## Updating the site

1. Edit the relevant YAML or Markdown file under `src/`.
2. Run `python3 src/build.py` (needs `pip install pyyaml markdown`).
3. Optionally run `python3 src/make_cv_pdf.py` to refresh the CV PDF.
4. Commit `src/` and `docs/` together and push. GitHub Pages publishes `docs/` from the default branch.

Common tasks:

- **Add a publication**: append an item to `src/data/publications.yml` (choose a `group`, give it a
  unique `id`, add `links`). Put the PDF in `docs/publications/` and link it as `/publications/<file>.pdf`.
- **Add a talk or paper**: append to the right list in `src/data/talks.yml`; entries are sorted by
  `year` and `month` automatically.
- **Add a course or workshop**: `src/data/teaching.yml`.
- **Write a note**: create `src/content/notes/YYYY-MM-DD-slug.md` with `title`, `date`, `excerpt`,
  optional `cover` and `cover_caption`, optional `tags`; write Markdown (HTML allowed) below.
- **Change the home page**: `src/content/index.md` (front matter for the hero, body for the essay).
- **Add a page**: `src/content/name.md` with `title` and `permalink`; add it to `nav` in `site.yml` if it
  should appear in the menu. `toc: true` adds a table of contents; `wide: true` widens the text column.
- **Keep an old URL working**: add `old_urls: [/old/path/]` to a page or note, or a pair to
  `redirects` in `site.yml`; the build writes a small redirecting page at the old address.

Front-matter fields for pages: `title`, `permalink`, `layout` (page, home, publications, talks,
teaching, cv, notes), `kicker` (small label above the title), `lede` (subtitle), `description`
(meta description), `toc`, `wide`, `old_urls`, and `illustration` (`src`, `alt`, `caption`; the
image sits beside the page title). The home page also takes `feature_book` (a publication id to
show as a panel with its cover).

Illustrations: six manuscript-style images (AI-generated after a *Kalīla wa-Dimna* manuscript) are
in `docs/assets/img/kalila-*.jpg`, each at 1200 and 640 px wide. `kalila-walk` (the version with the oddly drawn dog) is unused.

## Design

Warm paper background with a faint grain, deep red accent taken from the calligraphic RM mark, a
gold hairline for frames and rules (the *jadwal* of a manuscript page), Literata for text, Inter for
interface text, JetBrains Mono for labels, Amiri for Arabic (the name on the home page, the nav
numerals, the footer). Section headings carry a small red rosette; the home essay opens with a red
drop cap. Dark mode follows the system and can be toggled. Fonts are served from `docs/assets/fonts/` (Google Fonts subsets, latin and latin-ext)
so that no third-party request is made when the site loads. Tokens are at the top of
`docs/assets/site.css`.

## History

The previous version of the site (2013–2023, Jekyll with the Minimal Mistakes theme, named
*al-Raqmiyyāt*) lives in the git history before the `redesign-2026` work. All of its notes,
project pages, and files were carried over; old post addresses (`/YYYY/MM-DD.html`) redirect
to the new ones.
