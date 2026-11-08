# Report: link the NgramReader and Book Classifier v2 and their Zenodo records

Task: `2026-11-08_1335_apps-v2-links.md`. Written 2026-11-08. Status: **published 2026-11-08** after Maxim published both version 2 records on Zenodo. The first check found the version 2 DOIs unregistered; the re-check (below) found them findable.

## DOI check

Requested through `https://doi.org/…` and checked in the DataCite registry, which backs Zenodo DOIs.

| DOI | Role | doi.org | DataCite | Registered title |
|---|---|---|---|---|
| 10.5281/zenodo.23985408 | NgramReader v2 | **404, DOI not found** | **not registered** | — |
| 10.5281/zenodo.23985062 | Book Classification v2 | **404, DOI not found** | **not registered** | — |
| 10.5281/zenodo.15662941 | NgramReader, concept | 302 → zenodo.org/doi/… | findable | ADHFAIS APP{ENDIX} 1: OpenITI NgramReader … (v1, 2025) |
| 10.5281/zenodo.15663088 | Book Classification, concept | 302 → zenodo.org/doi/… | findable | ADHFAIS App{endix} 2: T10 Book Classification … (v1, 2025) |
| 10.5281/zenodo.15662942 | NgramReader v1 | 302 → zenodo.org/doi/… | findable | as above |
| 10.5281/zenodo.15663089 | Book Classification v1 | 302 → zenodo.org/doi/… | findable | as above |

Zenodo itself answers automated requests with 403, so the four working DOIs were confirmed by the doi.org redirect and the DataCite record rather than by loading the Zenodo page. Both concept DOIs still point to version 1 only: Zenodo has not yet attached a version 2 to either concept record. This is consistent with the version 2 records being drafts or not yet published.

Side note: DataCite registers version 1 of the classifier as "T10 Book Classification", not "M10". The task and the site describe version 1 as published under "M10". The site keeps the M10 wording, which matches the existing entries; worth checking against the Zenodo page.

## App URLs

| URL | Status |
|---|---|
| https://maximromanov.github.io/ngramreader/ | 200 |
| https://maximromanov.github.io/classifier/ | 200 |

## Stage 1 hits and what they became

| # | File and line (before) | Before | After |
|---|---|---|---|
| 1 | `src/content/index.md:25` | home sentence links "NgramReader and the Book Classification application" to `/research/#adhfais-apps` | unchanged; the anchor exists and now lands on the section (see below) |
| 2 | `src/content/research.md:6` | description "… NgramReader and Book Classification, KITAB …" | "… OpenITI NgramReader and T10 Book Classification, KITAB …" |
| 3 | `src/content/research.md:68` | `<div class="project" id="adhfais-apps">` | unchanged |
| 4 | `src/content/research.md:70` | "## NgramReader and Book Classification" | "## OpenITI NgramReader and T10 Book Classification" |
| 5 | `src/content/research.md:72` | meta "Online applications · 2025 · Appendices to …" | "Online applications · version 1, 2025 · version 2, 2026 · Appendices to *Digital Humanities for Arabic and Islamic Studies* (Brill, 2026)" |
| 6 | `src/content/research.md:74` | M10 aside inside the T10 sentence | M10 aside removed here; added the version 2 sentence; figshare sentence kept |
| 7 | `src/content/research.md:76` | links: two Shiny apps, figshare, the book, two v1 Zenodo DOIs | links: "Appendix 1: OpenITI NgramReader" and "Appendix 2: T10 Book Classification" (new URLs), figshare, the book, version 2 DOI and "all versions" concept DOI for each app; new secondary line "Version 1 (2025)" with "Original R/Shiny version (v1, EIS1600 server)" for each app and the M10 remark beside the classifier's version 1 |
| 8 | `src/data/cv.yml:57` (CV, Digital Humanities Projects) | 2025, "OpenITI NgramReader and Book Classification (T10 model; published as “M10 Book Classification”) …" | 2025–2026, "OpenITI NgramReader and T10 Book Classification. Two online applications published as appendices to *Digital Humanities for Arabic and Islamic Studies* (Brill, 2026); version 2 (2026) rebuilt as static web apps on maximromanov.github.io." Project page link kept |
| 9 | `src/data/publications.yml:36` (book entry note) | "… the Book Classification with the T10 model (published as “M10 Book Classification”)." | "… the Book Classification with the T10 model." |
| 10 | `src/data/publications.yml:46–47` (book entry links; home feature, Publications, CV, PDF) | "Appendix 1: NgramReader", "Appendix 2: Book Classification (T10)" → Shiny URLs | "Appendix 1: OpenITI NgramReader", "Appendix 2: T10 Book Classification" → new URLs |
| 11 | `src/data/publications.yml` (Data section) | — | two new entries above version 1: "DHFAIS App{endix} 1: OpenITI NgramReader, Version 2 (based on OpenITI, Release ver. 2023.1.8)" and "DHFAIS App{endix} 2: T10 Book Classification, Version 2 (…)", "Zenodo, released November 5, 2026", with the version 2 sentence, Application link (new URL) and the version 2 DOI |
| 12 | `src/data/publications.yml:425–430` | ADHFAIS Appendix 1 … version 1; links Application (Shiny), DOI v1 | title and text unchanged; Shiny link removed; DOI v1 kept |
| 13 | `src/data/publications.yml:435–440` | ADHFAIS Appendix 2: M10 … version 1; links Application (Shiny), DOI v1 | title, M10 text unchanged; Shiny link removed; DOI v1 kept |

The book entry feeds the home page feature block, the Publications page, the CV page and the PDF, so item 10 changes all four. No other files carried hits; the notes contain none.

**Anchor.** `#adhfais-apps` already existed in the source and in the built Research page, live and local. Following the home page link at 1280 px and at 390 px puts the section top 24 px below the viewport top (the stylesheet's `scroll-margin-top`). I could not reproduce the landing at the top of the page. The id is kept; the home link is unchanged.

## Leftovers

- `ADHFAIS` / `M10` remain only in the two version 1 data entries (Publications, CV page, PDF) and in the version 1 remark on the Research page.
- The Shiny URLs remain only in the Research page's version 1 line, as "Original R/Shiny version (v1, EIS1600 server)", once per app.
- No other edits.

## CV PDF

Rebuilt with `src/make_cv_pdf.py`. Links in the PDF: page 2 has the project-page link and both new app URLs in the Books entry; page 5 has both new app URLs, both version 2 DOIs and both version 1 DOIs. Changed pages: `pdf-02.png` (Projects, Books) and `pdf-05.png` (Data, Software, and Digital Publications) in the screenshots folder.

## Screenshots

`tasks/2026-11-08_1335_apps-v2-links_screens/`, prefix `d-` for 1280 px and `m-` for 390 px: home feature block, home sentence, Research apps section (reached through the anchor), Publications book entry, Publications data entries, CV projects, CV data entries; plus the two PDF pages.

## Open before publishing

1. Publish the two version 2 records on Zenodo, or confirm their DOIs. Then I re-run the DOI check and, on your go, commit and push.
2. The task file lives in a new `tasks/` folder at the repository root, outside the published `docs/`. Keep it in git or ignore it: your call.

## Re-check after Zenodo publication (2026-11-08)

| DOI | doi.org | DataCite |
|---|---|---|
| 10.5281/zenodo.23985408 | 302 → zenodo.org/doi/… | findable · DHFAIS App{endix} 1: OpenITI NgramReader, Version 2 (…) · 2026 |
| 10.5281/zenodo.23985062 | 302 → zenodo.org/doi/… | findable · DHFAIS App{endix} 2: T10 Book Classification, Version 2 (…) · 2026 |
| 10.5281/zenodo.15662941 (concept) | 302 | now resolves to the version 2 record |
| 10.5281/zenodo.15663088 (concept) | 302 | now resolves to the version 2 record |

Committed and pushed on Maxim's message that the records were published.
