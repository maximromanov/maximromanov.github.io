# Report: post "NgramReader and Book Classifier, version 2" with retina PNG screenshots

Task: `2026-11-09_1312_post-apps-v2-screenshots.md`. Written 2026-11-09. Status: **built locally, not published**, waiting for Maxim's go.

## Where things live

- Post source: `src/content/notes/2026-11-09-ngramreader-classifier-v2.md` (the Notes convention is `YYYY-MM-DD-slug.md`).
- Built post: `docs/notes/ngramreader-classifier-v2/`, URL `/notes/ngramreader-classifier-v2/`.
- Images: `docs/images/ngramreader-classifier-v2/` (the site keeps post images under `/images/<topic>/`, as the EIS1600 note does).
- Input (zip, loose post, old JPEGs) moved out of the published sources to `tasks/2026-11-09_1312_post-apps-v2-screenshots_input/`, which is gitignored, so the JPEGs are neither published nor pushed. Nothing was deleted.
- Capture script: `tasks/2026-11-09_1312_post-apps-v2-screenshots_capture.py`.
- Check screenshots: `tasks/2026-11-09_1312_post-apps-v2-screenshots_screens/`.

## Screenshots

Captured from the live apps with Playwright + Chromium. Desktop: 1440 px wide, deviceScaleFactor 2, light. Each shot: fresh context, tour link, wait for network idle, `document.fonts.ready` and a drawn chart (or table rows), Esc, scroll to top, blur focus; then a clip from the top of the page to 12 px below the chart's "Note … Cite as …" block (shot 2: 10 px below the 8th table row). After Esc the tour card is gone in every shot, no loading message is visible, focus is on the body. For shot 3 the "How to read this chart" box was closed by script (no click, so no focus ring). For shots 4 and 5 scrolling to the top was necessary: the tour scrolls the page, and the Classifier's sticky book bar otherwise lands across the chart.

Phones: Playwright's `iPhone 15` (393×659 CSS px, scale 3). Left: NgramReader view 1, light. Right: Classifier view 5, dark through `colorScheme: 'dark'` with the app on Auto (its Auto button was not clicked). First screen of each, composed on `#f4f4f2` with 40 CSS px (120 px) margins and gap.

PNG throughout, no resizing; lossless `oxipng` level 4 (the `pyoxipng` package, since Homebrew could not install the binary without accepting the Xcode licence).

| File | Pixels | Before oxipng | After |
|---|---|---|---|
| 1-ngramreader-over-time.png | 2880 × 1670 | 281,451 B | 208,859 B |
| 2-ngramreader-authors.png | 2880 × 1522 | 382,519 B | 264,639 B |
| 3-ngramreader-book-types-compared.png | 2880 × 1656 | 304,417 B | 225,272 B |
| 4-classifier-through-the-text.png | 2880 × 1800 | 389,302 B | 296,457 B |
| 5-classifier-overview.png | 2880 × 1990 | 343,931 B | 247,762 B |
| 6-phones-light-and-dark.png | 2718 × 2217 | 476,128 B | 348,192 B |

**Label glitch:** not seen at iPhone 15 width. All eleven Classifier type labels in the dark Overview start between 26 and 74 CSS px from the left edge, "[GRE] Graeco-Arabic" at 32 px. Reference shot: `check-classifier-labels-iphone15-dark.png`.

## Changes to the post

- Front matter: kept title, date (2026-11-09), author, description; added `excerpt` (the description, with the book title in italics; the Notes index and the page description use it) and four `tags`.
- Removed the body's first line, `# NgramReader and Book Classifier, version 2`: the note layout prints the title as the page heading, so it would have appeared twice.
- Six image paths `images/N-….jpg` → `/images/ngramreader-classifier-v2/N-….png`. Alt texts and captions unchanged.
- "Write to me": the site has **no `#contact` section**. Its contact is the scrambled email link used in the hero and footer (`<a class="email" href="#contact" data-e=…>`, decoded by `theme.js` on click). "Write to me" is now that same link; clicking it opens `mailto:maxim.romanov@uni-hamburg.de`. To allow a custom label in a note, the `{{email:address}}` placeholder now also takes `{{email:address|label}}`, and block Markdown honours it (`src/build.py`).
- All other links and all other text unchanged.

## Site changes beyond the post

- The post appears in the Notes index and the sitemap (the site has no RSS/Atom feed).
- It is the first note younger than a year, so the "Latest notes" panel now appears on every page with this one entry.
- `docs/assets/site.css`: `.prose { overflow-wrap: break-word }` and `.prose a { overflow-wrap: anywhere }`. At 390 px the post overflowed by 20 px because of unbreakable strings (the link text "maximromanov.github.io/ngramreader" and the plain-text DOI URLs in the citation block). After the fix, no overflow on this post, the EIS1600 note, the longest old note, Research, home, or CV.

## Checks

- Rendered at 1440 px and 390 px (`post-1440.png`, `post-390.png`, plus `-top` crops). All six images load; rendered aspect equals natural aspect to four decimals; pixel density 3.3–3.5× at 1440 px (825 px column) and 7.6–8× at 390 px, so they stay sharp on retina screens. The phone pair is 358 px wide at 390 px, no overflow.
- Images are served as `image/png` (local server); the build copies nothing and converts nothing, the files in `docs/images/` are the optimized PNGs.
- Links: both app URLs and all five tour links 200; both GitHub repositories 200; the four DOI links resolve at doi.org (302 to Zenodo, registered at DataCite, see the 2026-11-08 report); Zenodo answers automated clients with 403, so the final hop cannot be confirmed by script. "Write to me" decodes to the email address above.

## On go

Commit `src` (post, build.py), `docs` (post, images, CSS, rebuilt pages, index, sitemap), `.gitignore`, and the task files; push; check the live post, its images and the panel.
