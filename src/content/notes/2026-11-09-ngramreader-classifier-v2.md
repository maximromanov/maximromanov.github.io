---
title: "NgramReader and Book Classifier, version 2"
date: 2026-11-09
author: Maxim Romanov
description: "The two online appendices to Digital Humanities for Arabic and Islamic Studies (Brill, 2026), rebuilt as fast static web apps, with guided tours and archived on Zenodo."
excerpt: "The two online appendices to *Digital Humanities for Arabic and Islamic Studies* (Brill, 2026), rebuilt as fast static web apps, with guided tours and archived on Zenodo."
tags: ["OpenITI", "NgramReader", "Book Classification", "DHFAIS"]
---

<aside class="post-update" markdown="1">
<p class="pu-label">Version 2.04 update · November 13, 2026</p>

Links to the apps are now short and readable: a link shows the search itself, for example `…/ngramreader/#l=Baġdād~[wb]?bgdAd`. Arabic word forms are written in transliteration, and links no longer carry the data version; a link without one refers to OpenITI release 2023.1.8. All older links, including those in earlier citations, still open the same view. The Cite dialog can now copy citations as Markdown. The details are on each app’s “What’s new” page.
</aside>

<aside class="post-update" markdown="1">
<p class="pu-label">Version 2.03 update · November 10, 2026</p>

In the NgramReader, each search line now has its own fields: a label first, then one field per word form or regular expression, with *+ add form* for more. Searches that mix Arabic and Latin script are easier to write and to read this way, since each field runs in its own direction; charts, tables and citations keep the Arabic and Latin parts of a search apart as well. Beside each field, *⌨ Arabic* opens an Arabic keyboard with a row of keys for regular expressions; the Book Classifier has the same keyboard beside its search box. The keyboard is adapted, with his permission, from Peter Verkinderen’s [Arabic Virtual Keyboard](https://github.com/pverkind/arabicVirtualKeyboard), and the fields answer a problem he reported.

Links and citations keep the earlier written form of a search line, `#Label #item1 #item2`, so links made before the update open unchanged. Each app now lists its changes on a “What’s new” page: [NgramReader](https://maximromanov.github.io/ngramreader/changes.html), [Book Classifier](https://maximromanov.github.io/classifier/changes.html).
</aside>

The two online appendices to my book *Digital Humanities for Arabic and Islamic Studies* (Brill, 2026) have a new version. The OpenITI NgramReader and the T10 Book Classification app now run as fast, static web apps on this site, and version 2 of both is archived on Zenodo.

- **OpenITI NgramReader** (DHFAIS App{endix} 1): [maximromanov.github.io/ngramreader](https://maximromanov.github.io/ngramreader/) · [doi:10.5281/zenodo.23985408](https://doi.org/10.5281/zenodo.23985408)
- **T10 Book Classification** (DHFAIS App{endix} 2): [maximromanov.github.io/classifier](https://maximromanov.github.io/classifier/) · [doi:10.5281/zenodo.23985062](https://doi.org/10.5281/zenodo.23985062)

Both are free, need no account, and work on a phone as well as on a large screen. Both are built on OpenITI, release 2023.1.8: 8,468 texts and just over a billion tokens of premodern Arabic.

## Why a new version

Version 1 of both apps was written in R Shiny and ran on the EIS1600 project server in Hamburg. It worked, but it was slow, and it would last only as long as that server.

Version 2 runs entirely in your browser. There is no server behind it: the data sit in compact Parquet files on GitHub, and the browser fetches only the parts a search needs. Searches that used to keep the reader waiting now return almost at once, and the apps no longer depend on a server that will close when the project ends.

Each Zenodo record also holds a complete offline package: the app, its data, and a small local server. Anyone with Node.js can run the exact version described in the book on their own computer, without an internet connection.

## The NgramReader: following a word through twelve centuries

The NgramReader charts how often a word or phrase occurs over time, in 25-year periods by the author’s death date. Unlike a general n-gram viewer, it lets you gather all the forms of a word into one curve, and it shows where the word lives: in which kinds of books, which books and which authors.

Take *tasalṭana*, “to become sultan”. The search line `#Tasalṭana #\w*tslTn\w*` catches every form built on *tslTn*. The verb occurs about 2,700 times in the corpus (about 2,500 in the clean texts). In the corpus, it is almost absent until the eighth century AH, well into the Mamlūk period, and peaks in the ninth. The curve measures how the surviving texts use the word, not how often people used it; this is why the app can also show how much text the corpus holds for each period. Roughly a third of all uses are in the works of Ibn Taġrībirdī (d. 874/1470), more than four times as many as in those of the next author, al-Maqrīzī.

![The NgramReader’s “Over time” chart for tasalṭana: the relative frequency is near zero until about 700 AH and peaks around 900 AH.](/images/ngramreader-classifier-v2/1-ngramreader-over-time.png)

*“Over time” for* tasalṭana*, relative frequency. [Open this view](https://maximromanov.github.io/ngramreader/?tour=tasaltana&stop=4).*

![The NgramReader’s “Authors” table for tasalṭana: Ibn Taġrībirdī with 842 occurrences, al-Maqrīzī next with 191.](/images/ngramreader-classifier-v2/2-ngramreader-authors.png)

*“Authors” for* tasalṭana*, with Ibn Taġrībirdī far ahead. [Open this view](https://maximromanov.github.io/ngramreader/?tour=tasaltana&stop=7).*

What is new in version 2:

- **Arabic input.** You can type `#Tasalṭana #تسلطن` as well as the transliteration.
- **The forms found.** Before anything is charted, the app lists every matching word form with its count, and you can untick the ones you don’t mean.
- **Any number of search lines**, each one a curve, with readable book titles and author names throughout.
- **Book types compared with the corpus.** Biographical dictionaries make up a large share of the corpus, so most words appear in them often. This chart removes that effect: it shows whether a word is more or less common in a type of book than the type’s size predicts.
- **Charts that carry their own caption and citation** when you download them, as SVG or PNG, with the data as TSV.
- **A link for every view** that reproduces it exactly, and a “Cite these results” button.

![The NgramReader’s “Book types, compared with corpus” chart for tasalṭana, on a log scale around 1×: historical and biographical works to the right, legal and Tradition-based works to the left.](/images/ngramreader-classifier-v2/3-ngramreader-book-types-compared.png)

*“Book types, compared with corpus” for* tasalṭana*: historical and biographical works use the verb far more than their share of the corpus predicts, legal and Tradition-based works far less. [Open this view](https://maximromanov.github.io/ngramreader/?tour=tasaltana&stop=8).*

Version 2 also corrects two errors in version 1’s relative frequencies. In “clean texts” mode, counts were divided by the token totals of all texts. In the authors table, each author’s relative frequency used the wrong denominator. Relative frequencies in version 2 can therefore differ from those of version 1. Anyone who has cited figures from version 1 should check them against version 2.

## The Book Classifier: what kind of book is this, page by page?

The Book Classifier scores every work in the corpus (8,468 books by 3,282 authors) on ten types of texts in the T10 model: biographical, exegetical, Graeco-Arabic, historical, legal, linguistic, medical, poetic, scholastic-theological and Tradition-based. Each work is measured against groups of texts chosen to represent a type, so a book is never squeezed into a single category. The types are research categories, and the scores are signals within this model, not a final typology.

A single score for the whole text, however, hides what happens inside a book. Besides the score for the whole text, the app reads the book in overlapping windows of about 3,000 words and shows how the mix of types shifts from the first page to the last. Where the text is marked up, the book’s own chapter headers are drawn along the chart, so you can see which chapter is doing what.

Ibn al-Jawzī’s *Talbīs Iblīs* shows the difference clearly. As a whole text, it scores 100% biographical. Read window by window, only about 40% of it is. The opening chapters score highest as Tradition-based, chapters 6–8 as legal, and chapter 10, the long critique of Ṣūfī practices, as biographical: the model follows Ibn al-Jawzī from subject to subject. Chapter 5 moves between scholastic-theological, historical and biographical writing as its subject changes.

![The Book Classifier’s “Through the text” chart for Talbīs Iblīs: one row per type, with vertical lines at the chapter headers.](/images/ngramreader-classifier-v2/4-classifier-through-the-text.png)

*“Through the text” for* Talbīs Iblīs*, with the book’s chapter headers. [Open this view](https://maximromanov.github.io/classifier/?tour=talbis&stop=4).*

A book profile also shows how varied its vocabulary is (entropy) compared with other books, the most similar books by vocabulary, and the author. An author profile shows the author’s types, all their books at a glance, and their books grouped by top type. Books and authors link across to the NgramReader and back.

![The Book Classifier’s Overview for Talbīs Iblīs: ten types as bars, comparing the whole-text score, the rolling windows and the period.](/images/ngramreader-classifier-v2/5-classifier-overview.png)

*The Overview for* Talbīs Iblīs*: the whole text, the rolling windows, and books of the same century. [Open this view](https://maximromanov.github.io/classifier/?tour=talbis&stop=2).*

## Guided tours, phones and dark mode

Both apps now open with a short “How to use” page and a guided tour. The tours walk through real views of the apps, one stop at a time: the NgramReader tour follows *tasalṭana*, the Book Classifier tour follows *Talbīs Iblīs*. Each card explains what you are looking at, and every stop is a live view you can change.

The apps work on phones. You can add them to your home screen, where they open full-screen like any other app. They also follow your device’s light or dark mode; charts you download always come out light, ready for a paper or a slide.

![The two apps at phone width: the NgramReader in light mode, the Book Classifier in dark mode.](/images/ngramreader-classifier-v2/6-phones-light-and-dark.png)

*Both apps at phone width: the NgramReader in light mode, the Book Classifier in dark mode.*

## Citing the apps

Every result can be cited: “Cite these results” gives the search, the date and a link that reproduces the view, in Chicago, APA, BibTeX or RIS. To cite the apps themselves:

> Romanov, Maxim. *DHFAIS App{endix} 1: OpenITI NgramReader, Version 2 (based on OpenITI, Release ver. 2023.1.8)*. Zenodo, released November 5, 2026. https://doi.org/10.5281/zenodo.23985408.
>
> Romanov, Maxim. *DHFAIS App{endix} 2: T10 Book Classification, Version 2 (based on OpenITI, Release ver. 2023.1.8)*. Zenodo, released November 5, 2026. https://doi.org/10.5281/zenodo.23985062.

The records for all versions are at [doi:10.5281/zenodo.15662941](https://doi.org/10.5281/zenodo.15662941) (NgramReader) and [doi:10.5281/zenodo.15663088](https://doi.org/10.5281/zenodo.15663088) (Book Classifier); these links always lead to the newest version. The code is on GitHub ([ngramreader](https://github.com/maximromanov/ngramreader), [classifier](https://github.com/maximromanov/classifier)) under the MIT license; the data carry OpenITI’s license, CC BY-NC-SA 4.0.

## What comes next

The next major update will add geography: where authors lived and worked, and a map of where a word was used, next to when. Until then, smaller improvements will appear on the website as they are ready.

If you use the apps in your research or teaching, I would be glad to hear how, and what is missing. {{email:maxim.romanov@uni-hamburg.de|Write to me}}.
