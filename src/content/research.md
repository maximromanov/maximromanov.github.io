---
title: Research
permalink: /research/
kicker: "Projects and Methods"
lede: "Projects, corpora, and tools, from the current Emmy Noether group back to the dissertation that started the method. Each entry says what was built, why, and where to find it."
description: "Research projects of Maxim Romanov: EIS1600, OpenITI, mARkdown, al-Ṯurayyā, NgramReader and Book Classification, KITAB, OpenITI AOCP."
wide: true
illustration:
  src: /assets/img/kalila-fishing.jpg
  alt: "A man in a turban stands in a river casting a fishing rod while a dog watches from the bank, painted in the manner of a medieval Arabic manuscript"
  caption: "After a Kalīla wa-Dimna manuscript · AI-generated"
---

<div class="project" id="eis1600" markdown="1">

## The Evolution of Islamic Societies (c. 600–1600 CE): Algorithmic Analysis into Social History

<p class="meta"><b>EIS1600</b> · 2021–2027 · Emmy Noether Junior Research Group, German Research Foundation (DFG, project <a href="https://gepris.dfg.de/gepris/projekt/445975300">445975300</a>) · Universität Hamburg, Asien-Afrika-Institut · Principal investigator</p>

In the course of the first millennium of its history, Islamic society evolved from a tribal polity into a multifaceted social, cultural, and political entity that stretched from Spain and North Africa in the west to Central Asia and India in the east. Arabic chronicles and biographical collections preserve a wealth of information on the long-term processes that shaped it, and for the period before the fifteenth century, for which exceptionally few documents survive, they are the richest source we have. EIS1600 studies this evolution through the computational analysis of about 350 such texts, a sub-corpus of OpenITI treated for the first time as a unified corpus of historical information: some 100 million words and about 400,000 biographical records.

The project rests on a premise. Narratives are consciously constructed by their authors, but the myriad details scattered across vast texts cannot be subjected to comparable agenda-driven editing; in large quantities, such agenda-resistant data can be expected to provide more reliable historical evidence than any single account. The main building blocks are therefore *minimal information units*: descriptions of discrete events from chronicles and biographical records from biographical collections. Texts are broken into such units, which are then annotated and reassembled into networks of related historical information—the *MasterChronicle*—that serves as the research ecosystem for the project and its collaborators.

Three closely connected research areas run through the project: major ethnic, religious, and professional groups and their role in the development of local communities; dynastic cycles, the rise and fall of regional powers, and their interactions with those communities; and environmental factors—plagues, famines, droughts, pest infestations, earthquakes—and their effect on local life. The team combines historians and computer scientists and has fine-tuned language models for classical Arabic, built pipelines for identifying biographies and events in historical corpora, and annotated tens of thousands of biographical records.

<p class="links"><a href="https://eis1600.aai.uni-hamburg.de/">Project website</a> <a href="https://eis1600.github.io/">Project blog</a> <a href="https://github.com/EIS1600">GitHub</a> <a href="/publications/#yousef-2023-alp">Publications</a></p>

</div>

<div class="project" id="openiti" markdown="1">

## OpenITI: The Open Islamicate Texts Initiative

<p class="meta"><b>Corpus</b> · 2014– (2014–2016 as OpenArabic) · Co-PIs, alphabetically: Matthew T. Miller (University of Maryland), Maxim Romanov, Sarah Bowen Savant (Aga Khan University–London)</p>

The written Arabic heritage is as vast as it is understudied, and the sheer volume of surviving works makes it ideal for computational forms of analysis. Efforts to use such methods were long stymied by the lack of a reliable corpus. OpenITI began at the Alexander von Humboldt Chair for Digital Humanities at Leipzig University as *OpenArabic*, an effort to create the first machine-actionable scholarly corpus of premodern Arabic texts, and has grown into a multi-institutional initiative that now covers the entire Islamic period: about 8,700 unique titles by over 3,300 authors, approximately 861 million words, and 2.4 billion words with all versions included. Every text is stored in [OpenITI mARkdown](/mARkdown/) with stable identifiers for authors, works, and versions; releases are published on Zenodo and can be cited.

OpenITI is the infrastructure behind most current digital work in Arabic and Islamic studies, including the KITAB project on text reuse, my own EIS1600, and the corpus-wide experiments in my book. It was designed on the principle that no one else will build the corpus the field needs, so the field must build it itself.

<p class="links"><a href="https://github.com/OpenITI">GitHub</a> <a href="https://doi.org/10.5281/zenodo.10021513">Latest release (2023.1.8)</a> <a href="https://kitab-project.org/docs/openITI">Documentation</a> <a href="/OpenITI/">History of the initiative (archival page)</a></p>

</div>

<div class="project" id="markdown" markdown="1">

## OpenITI mARkdown

<p class="meta"><b>Annotation scheme</b> · 2014– · Design and documentation</p>

OpenITI mARkdown (the capital *AR* stands for Arabic) is a light-weight system for tagging structural, morphological, and semantic elements in Arabic-script texts. It is conceived not as a comprehensive standard akin to TEI XML but as a methodological solution: a scheme that renders texts machine-readable with minimal effort, can be adapted to specific research tasks, and keeps the annotated text legible to a human reader. It is the native format of the OpenITI corpus and the basis of the annotation work in EIS1600. The conceptual argument for this approach is made in chapter 2 of *Digital Humanities for Arabic and Islamic Studies*.

<p class="links"><a href="/mARkdown/">Full description</a> <a href="https://github.com/OpenITI/mARkdown_highlighting_Kate">Editor highlighting</a> <a href="https://github.com/OpenITI/mARkdownMSS">mARkdown for manuscripts</a></p>

</div>

<div class="project" id="althurayya" markdown="1">

## al-Ṯurayyā: Gazetteer and Geospatial Model of the Early Islamic World

<p class="meta"><b>Historical geography</b> · 2014– · With Masoumeh Seydi</p>

al-Ṯurayyā is designed to help us understand spatial connections within the Islamic world, to study geographical and travel literature visually, and, most importantly, to trace the geographies of different social and religious groups from the data of biographical collections. The gazetteer currently includes over 2,000 toponyms and almost as many route sections, georeferenced from Georgette Cornu’s *Atlas du monde arabo-islamique à l’époque classique* and connected into a network on which travel can be modeled. The project grew out of the dissertation, where the social geography of the Islamic world was reconstructed from the toponyms mentioned in almost 30,000 biographies.

<p class="links"><a href="https://althurayya.github.io/">althurayya.github.io</a> <a href="/publications/#romanov-seydi-2019-thurayya">Paper (DH 2019)</a> <a href="/notes/islamic-urban-centers-661-1300/">Note: Islamic urban centers, 661–1300</a></p>

</div>

<div class="project" id="adhfais-apps" markdown="1">

## NgramReader and Book Classification

<p class="meta"><b>Online applications</b> · 2025 · Appendices to <i>Digital Humanities for Arabic and Islamic Studies</i> (Brill, 2026)</p>

The **OpenITI NgramReader** is a tool similar to the Google Ngram Viewer, designed to trace the use of words and phrases over time across the whole corpus. The default graph shows the verb *tasalṭana* (“to become a sultan”), which came into use only in the Mamlūk period; the report beneath it shows that of some 2,400 attestations, about a third come from the Mamlūk historian Ibn Taġrībirdī (d. 874/1470). The **M10 Book Classification** application is an experiment in typology: each work in the corpus is measured against ten groups of texts selected to represent a type (“genre”), so that a work can belong to several types in different degrees instead of being forced into one category at the expense of all others. Both applications are built on OpenITI release 2023.1.8 and are archived on Zenodo. The book’s figures are also published as an open online supplement on figshare, where they can be enlarged for closer examination.

<p class="links"><a href="https://eis1600.aai.uni-hamburg.de/shiny/OpenITI_NgramReader/">NgramReader</a> <a href="https://eis1600.aai.uni-hamburg.de/shiny/t10BookClassifier/">Book Classification</a> <a href="https://doi.org/10.6084/m9.figshare.32324454">Figures supplement (figshare)</a> <a href="/publications/#romanov-2026-dhais">The book</a> <a href="https://doi.org/10.5281/zenodo.15662942">Zenodo (NgramReader)</a> <a href="https://doi.org/10.5281/zenodo.15663089">Zenodo (Book Classification)</a></p>

</div>

<div class="project" id="kitab" markdown="1">

## KITAB: Knowledge, Information Technology, and the Arabic Book

<p class="meta"><b>Text reuse</b> · 2018–2021 · ERC project, PI Sarah Bowen Savant, Aga Khan University–London · Senior research fellow</p>

KITAB studies how Arabic authors reused, quoted, and reworked earlier texts, and what these practices reveal about the transmission of knowledge in the Islamic world. As senior research fellow I was responsible for the development of the OpenITI corpus within the project and for the analysis of text reuse detected with the *passim* algorithm across the corpus, including the compilation practices of al-Ḏahabī and his treatment of Andalusi sources.

<p class="links"><a href="https://kitab-project.org/">kitab-project.org</a></p>

</div>

<div class="project" id="aocp" markdown="1">

## OpenITI AOCP: Arabic-Script OCR Catalyst Project

<p class="meta"><b>OCR and HTR</b> · 2019– · Led by Matthew Thomas Miller, Maxim Romanov, Sarah Bowen Savant, David Smith, and Raffaele Viglianti · Andrew W. Mellon Foundation</p>

Building on the open-source OCR work of the Alexander von Humboldt Chair for Digital Humanities, the OpenITI team achieved accuracy rates in the high nineties for classical Arabic-script printed texts in 2016. AOCP develops this into a user-friendly text production pipeline: an OCR engine with post-correction interface, expanded export functionality, and, in its second stage, handwritten text recognition for manuscripts.

<p class="links"><a href="https://openiti.org">openiti.org</a> <a href="/notes/OCR/">Note: Arabographic OCR (2016)</a> <a href="/publications/#kiessling-2017-ocr">Paper (2017)</a></p>

</div>

<div class="project" id="readers" markdown="1">

## Frequency-Based Readers for Classical Arabic

<p class="meta"><b>Teaching materials</b> · 2014–2016 · Perseus Project, Tufts University</p>

*Classical Arabic Through the Words of the Prophet* is a computationally generated reader that introduces the language of Ḥadīṯ through its most frequent vocabulary and structures, ordered so that the learner meets what matters most first. The same approach was later applied to Persian epic poetry and to the generation of morphological drill materials (“1001 Morphological Patterns”).

<p class="links"><a href="/files/Romanov_CATWOP.pdf">The reader (PDF)</a> <a href="/notes/hadith-reader/">How it was made</a> <a href="/publications/#romanov-2019-1001mp">1001 Morphological Patterns (2019)</a></p>

</div>

<div class="project" id="dissertation" markdown="1">

## Computational Reading of Arabic Biographical Collections

<p class="meta"><b>Dissertation and first studies</b> · 2010–2017 · University of Michigan; Tufts University; Leipzig University</p>

The dissertation set out to write a history of public preaching (*waʿẓ*) from biographical collections and discovered that the question could not be answered without reading *all* the biographies. The method that resulted—text mining adapted to the regularized language of biographical dictionaries—made it possible to extract dates, places, names, and social descriptors from almost 30,000 biographies in al-Ḏahabī’s *Taʾrīḫ al-islām* and to study the social geography of the Islamic world over seven centuries. The articles that followed compared the computational results with al-Ḏahabī’s own summary statements, traced the growth and decline of urban centers, and set out abstract models for Islamic history.

<p class="links"><a href="/publications/#romanov-2013-dissertation">Dissertation (2013)</a> <a href="/publications/#romanov-2017-speculum">Speculum (2017)</a> <a href="/publications/#romanov-2017-derislam">Der Islam (2017)</a> <a href="/notes/toward-abstract-models-for-islamic-history/">Note: Toward abstract models</a></p>

</div>

<div class="project" id="directions" markdown="1">

## Directions

<p class="meta"><b>Medium-term perspective</b></p>

A single concern organizes what comes next: how large-scale historical writing participates in the formation, stabilization, and transformation of social structures. Three strands follow from it. The first treats historiography as a social practice, with particular attention to the prolific authors of the late ʿAbbāsid and Mamlūk periods, whose compilations shaped the historical record through what they included, condensed, repeated, and reframed. The second examines transmission and reuse—citation, abridgment, commentary, borrowing—as historically situated practices that reveal norms of authority and disciplinary boundary-making. The third addresses the typology of the Arabic written tradition: text types treated not as inherited bibliographical categories but as historically contingent formations, derived computationally from the texts themselves and read as evidence of how intellectual labor was organized. Although rooted in Islamic historiography, the framework is transferable to any historical field that relies on extensive narrative sources rather than administrative documentation.

</div>
