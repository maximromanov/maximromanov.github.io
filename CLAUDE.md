# Working on this site

This repository is Maxim Romanov's personal research website (maximromanov.github.io). It is
maintained conversationally: Maxim asks for an update, the assistant edits the sources, rebuilds,
and commits. Read `README.md` first; it describes the layout and the update recipes.

## Rules

- Edit sources under `src/`, never the generated HTML under `docs/` (except `docs/assets/` and
  the media folders, which are hand-maintained). After any change run `python3 src/build.py`
  and commit `src/` and `docs/` together.
- Never remove or rename anything under `docs/publications/`, `docs/files/`, `docs/images/`,
  `docs/presentations/`, or `docs/projects/`: these URLs are cited in print and in the CV.
  Add new files; leave old ones.
- Keep every old address working. A moved page gets `old_urls` in its front matter or an entry in
  `redirects` in `src/data/site.yml`.
- Transliteration of Arabic follows Maxim's own scheme (see the `arabic-translit` skill): single
  glyphs (ṯ ḏ ḫ ġ š), `j` and `q`, `ŧ` for tāʾ marbūṭa, `al-` unassimilated and lowercase.
  Published titles are quoted as published; new prose follows the scheme.
- New prose for the site (home essay, research descriptions) follows the `academic-prose` skill:
  first person, concrete, no commendation adverbs, no filler. Do not pad entries.
- Do not publish drafts marked "do not share", whole books or volumes that are not open access,
  or grant proposals unless Maxim asks for it explicitly.
- Do not add analytics, external scripts, or third-party fonts beyond the GoatCounter counter
  configured in `site.yml`. Fonts are self-hosted.
- Verify new external links with a request before committing them; do not invent DOIs,
  identifiers, or URLs.

## Checks before committing

- `python3 src/build.py` runs without errors.
- Internal links resolve (a quick check: grep `href="/` targets against files under `docs/`).
- Screenshots of the changed page at 1280 px and 390 px look right in light and dark mode
  (playwright is available: `python3 -m playwright install chromium`).
- If the CV data changed, regenerate the PDF with `python3 src/make_cv_pdf.py`.

## Deployment

GitHub Pages serves the `docs/` folder of the default branch. Pushing to the default branch
publishes the site within a minute or two; there is no build step on GitHub's side (`docs/.nojekyll`
disables Jekyll).
