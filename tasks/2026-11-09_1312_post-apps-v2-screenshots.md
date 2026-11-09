# Task: website — post "NgramReader and Book Classifier, version 2" with retina PNG screenshots

Saved 2026-11-09 13:12 CET. Requested by Maxim, 2026-11-09. Report: `2026-11-09_1312_post-apps-v2-screenshots_report.md`.

- **Project:** Maxim's website (`maximromanov.github.io`).
- **Spend:** none.
- **Provenance:** Post drafted with chat, 2026-11-09. The first screenshots were taken through a browser extension at 1× as JPEG and look blurry. Maxim asked for PNG at maximum quality.
- **Input:** `blog-post.zip` (post `blog-post/ngramreader-classifier-v2.md`, old screenshots `blog-post/images/1-…jpg … 6-…jpg`, references only, not to be published). Maxim placed it, the loose post and the JPEGs in `src/content/notes/`.
- **Do not touch the app repositories**; only read the live apps.

## Stage 1 — retake the screenshots

Playwright + Chromium against the live `https://maximromanov.github.io/ngramreader/` and `/classifier/`. PNG only, no JPEG, no resizing after capture; lossless optimization (oxipng -o 4) allowed; report pixel size and bytes.

Per shot: fresh context; open the tour link; when fully loaded (network idle, `document.fonts.ready`, chart drawn) press Esc to close the tour card; no tour card, cursor, focus ring or loading message in the shot. Desktop: 1440 px wide, deviceScaleFactor 2, colorScheme light. Capture from the top of the page (band included) to the end of the chart's caption block ("Note … Cite as …"), not cut off.

| # | File | View | Must show |
|---|---|---|---|
| 1 | 1-ngramreader-over-time.png | /ngramreader/?tour=tasaltana&stop=4 | "Over time", relative frequency, full curve with caption |
| 2 | 2-ngramreader-authors.png | /ngramreader/?tour=tasaltana&stop=7 | "Authors" table, band to about the first 8 rows (Ibn Taġrībirdī 842, al-Maqrīzī 191) |
| 3 | 3-ngramreader-book-types-compared.png | /ngramreader/?tour=tasaltana&stop=8 | "Book types", "Compared with corpus"; fold the "How to read this chart" box first |
| 4 | 4-classifier-through-the-text.png | /classifier/?tour=talbis&stop=4 | Talbīs Iblīs, "Through the text" with H1 header lines; band to end of chart caption |
| 5 | 5-classifier-overview.png | /classifier/?tour=talbis&stop=2 | Talbīs Iblīs, Overview, all ten type rows and caption |
| 6 | 6-phones-light-and-dark.png | see below | both apps on a phone, side by side |

Shot 6: emulate a named phone (iPhone 15 or similar), own scale factor. Left: NgramReader view 1, light. Right: Classifier view 5, dark via colorScheme with the app on Auto (no theme click). First screen of each, side by side on #f4f4f2, margin and gap 40 CSS px scaled. Known glitch: Classifier type labels cut off at the left at narrow widths (e.g. "GRE] Graeco-Arabic"); if seen, report with a screenshot and use the shot anyway.

## Stage 2 — add the post

Fit to the Notes conventions (location, header fields, layout, image folder, URL, index, feed). Keep the text exactly, except: images → the six PNGs where the site keeps a post's images, paths and extensions updated, alt texts and captions kept; "Write to me" → the site's real contact anchor (probably /#contact); other links unchanged; date 2026-11-09; add to the Notes index and any feed.

## Checks

Render locally; screenshot the whole post at 1440 and 390 px; images sharp at natural aspect; phone pair does not overflow at 390. Every link in the post answers 200, except the contact anchor, which must land on the contact section. Images served as PNG, not converted; list sizes.

## Gate, then publish

Stop with a report (where post and images live; the six screenshots inline; pixel/size table; rendered post at both widths; label glitch if seen). After Maxim's go: commit, push, check live post and images.
