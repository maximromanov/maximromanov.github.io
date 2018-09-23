---
excerpt: "The advent of digital humanities has brought the notion of “big data” into the purview of humanistic inquiry. Humanists now have access to huge corpora that open research possibilities that were unthinkable a decade or two ago. However, working with corpora requires a rather different approach that is more characteristic of sciences than humanities. Namely, one has to be transparent and explicit with regard to how data are extracted and how they are analyzed. Text-mining techniques rely on explicit algorithms because they help tracing mistakes, correcting them and, ultimately, improving results."
header:
  image: /images/covers/07391u.jpg
  caption: "**Photo credit**: Iraq. Kerbela [i.e., Karbala]. General view, mosque. *Library of Congress*, [LC-DIG-matpc-07391](http://hdl.loc.gov/loc.pnp/matpc.07391)"
title:		"Toward Abstract Models for Islamic History"
author_profile:   true
layout:   single
categories:
  - Methods
  - Biographies
  - Geographies
  - Taʾriḫ al-islām
tags:
  - Blogpost
  - al-Ḏahabī
  - Taʾrīḫ al-islām
  - Computational reading
  - Islamic world
  - Longue durée
  - Maps
---
* * *

<p style="text-align: center;">
  <strong>NB</strong>: the paper has been presented @ <a href="http://islamichumanities.org/conference2013/">Digital Humanities and Islamic <i>&</i> Middle Eastern Studies</a>, Brown University, Providence, RI (October 24-25, 2013); the video recording of the presentation is available @ <a href="http://mediacapture.brown.edu:8080/ess/echo/presentation/5da9b95b-c4d1-41e4-9f29-7516d2e4af18">www.islamichumanities.org > Day One</a> (timestamp of the presentation <strong>2:48:00</strong>; Q<i>&</i>A: <strong>3:51:30</strong>); the entire paper is also <a href="http://www.academia.edu/4922009/_Toward_Abstract_Models_for_Islamic_History_working_paper_">available as a PDF</a>
</p>

* * *

<p style="text-align: right;">
  <i>All models are false, but some are useful</i><br/> George P. Box
</p>

## Why Models?

**The advent of digital humanities** has brought the notion of “big data” into the purview of humanistic inquiry. Humanists now have access to huge corpora that open research possibilities that were unthinkable a decade or two ago. However, working with corpora requires a rather different approach that is more characteristic of sciences than humanities. Namely, one has to be transparent and explicit with regard to how data are extracted and how they are analyzed. Text-mining techniques rely on explicit algorithms because they help tracing mistakes, correcting them and, ultimately, improving results.<sup><a href="#footnote_0_918" id="identifier_0_918" class="footnote-link footnote-identifier-link">1</a></sup> Analytical procedures for studying extracted data rest on explicit algorithms for the same reason. As a way of constructing algorithms, modeling is part and parcel of developing complex computational procedures.

Working with big data also requires a different kind of modeling. Opting for the breadth of data we have to give up the richness of details. Close reading—to which humanists are most accustomed—becomes impossible.<sup><a href="#footnote_1_918" id="identifier_1_918" class="footnote-link footnote-identifier-link">2</a></sup> Working with big data one cannot maintain the nuanced complexity of details that became the hallmark of close reading as an approach. Instead of relying on complex textual evidence and reading between the lines one has to work with relatively simple textual markers—essentially, words or simple phrases—that are treated as indicators of large trends. Yet, it is through such analysis that we can look into long-term and large-scale processes that will always remain beyond the scope of close reading. The literary historian Franco Moretti dubbed such an approach “distant reading, ” explaining distance” not as an obstacle, but *a specific form of knowledge*.<sup><a href="#footnote_2_918" id="identifier_2_918" class="footnote-link footnote-identifier-link">3</a></sup> With emphasis on fewer elements that allows us to get a sharper sense of their overall interconnection, we can distinguish shapes, relations, structures. Most importantly, we can trace small changes over long periods of time.

Modeling is an important part of this approach. With models we simplify reality down to a limited number of factors<sup><a href="#footnote_3_918" id="identifier_3_918" class="footnote-link footnote-identifier-link">4</a></sup> through the analysis of which we hope to get insights into complex processes.<sup><a href="#footnote_4_918" id="identifier_4_918" class="footnote-link footnote-identifier-link">5</a></sup> This simplification is the reason why *all models are false*. Yet, models are a valuable and powerful tool. They pave the way to improving our understanding of the world. Unlike theories, models are experimental and driven by data. Good models offer invaluable glimpses into the subjects of our inquiry.<sup><a href="#footnote_5_918" id="identifier_5_918" class="footnote-link footnote-identifier-link">6</a></sup> With them we can explore, explain, project. With them we can get a big picture. That is why *some models are useful*.

What follows is an attempt to model Islamic élites based on the data from al-Ḏahabī’s (d. 748/1348 CE) _Taʾrīḫ al-islām_ in order to explore major social transformations that the Muslim community underwent in the course of almost seven centuries of its history. The main types of data used in the model are dates, toponyms,<sup><a href="#footnote_6_918" id="identifier_6_918" class="footnote-link footnote-identifier-link">7</a></sup> linguistic formulae (or, wording patterns), synsets (lists of words that point to a specific concept or entity), and, most importantly, “descriptive names” (sing. <i>nisbaŧ</i>).

The detailed discussion of main assumptions regarding these types of data as well as the discussion of such general issues relevant to the study of Arabic biographical collections can be found elsewhere.<sup><a href="#footnote_7_918" id="identifier_7_918" class="footnote-link footnote-identifier-link">8</a></sup> Here it is most important to dwell on our assumptions regarding “descriptive names” that are regarded by some scholars as the most valuable kind of data that literary sources offer to the social historian of the Islamic world, and by others as highly problematic as such. The major problem with <i>nisbaŧ</i>s is that it is not always clear what they stand for. For example, if an individual is described in a biographical collection as <i>ṣaffār</i>, does this actually mean that he was involved in “copper smithing”? When our subject is just one particular individual, it is not so difficult to establish the more or less exact meaning of this descriptive name by cross-examining biographies of this individual in other biographical collections. This is particularly easy now when dozens of electronic texts of biographical collections are just few mouse-clicks away. However, such an approach becomes problematic when this rather time-consuming procedure has to be repeated for dozens of individuals. The approach becomes particularly difficult if our goal is to study some biographical collection in its entirety, since Arabic biographical collections often contain thousands of biographies and most biographies offer multiple descriptive names for the same individual. After a certain threshold it becomes impossible to apply this approach at all. Our source, *Taʾrīḫ al-islām*, is well beyond this threshold. In the analysis that will follow, we will deal with the dataset of almost 70,000 <i>nisbaŧ</i>s (with about 700 unique ones) that represent about 26,000 individuals over the period of 41–700/1301 CE. Working with such a dataset one cannot possibly know the exact meaning of each and every <i>nisbaŧ</i>. At the same time we do not have any solid foundation to argue that descriptive names are to be treated in a particular manner, or to be discarded altogether. Yet, such a dataset is too unique an opportunity for research to ignore simply because we are not entirely sure what all these data mean. This is where modeling offers an optimal solution: we need to start with assumptions and be upfront about them. In what follows, descriptive names will be treated at their face value, if only because this is the most logical starting point.<sup><a href="#footnote_8_918" id="identifier_8_918" class="footnote-link footnote-identifier-link">9</a></sup>

## The Source: al-Ḏahabī’s *Taʾrīḫ al-islām*

*Taʾrīḫ al-islām* is the largest Arabic biographical collection that includes over 30, 000 biographies and covers almost seven centuries of Islamic history. The current dataset includes information on slightly over 29, 000 individuals (the first three volumes of *Taʾrīḫ al-islām* are structured differently from the rest of the collection and cannot be studied with the same computational method). Figure <b>1</b> shows cumulative biographical graphs and curves based on this data set. Biographies are grouped into 20 lunar year periods (quantities of biographies for each period are shown at the bottom of the <i>Biographical graph</i>). The graph is transformed into a curve that smooths out the noise of data, emphasizing larger trends (*Smoothed Biographical Curve*). Finally, the main curve is the *Adjusted Biographical Curve*, which is shifted 30 years back in time to reflect “the years of floruit” of the biographees from *Taʾrīḫ al-islām*.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_UpdCumulativeCurve.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_UpdCumulativeCurve.jpg"></a>
	<figcaption><em><b>Figure 1.</b> Cumulative Biographical Curve. The row of numbers shows the quantities of biographies per 20 lunar year periods, beginning with 41-60 AH/662-681 CE and up to 680-700 AH/1282-1301 CE.</em></figcaption>
</figure>


The curve can be split into several periods, each beginning at a point that marks a noticeable diversion of the curve. The number of biographies keeps on growing quite rapidly until *c.* 160/778 CE, which marks the slowing of growth. During *c.* 270-470 AH/884-1078 CE there is a steady decline. After *c.* 470/1078 CE the curve starts recovering, reaching its highest point around *c.* 570/1175 CE, after which it keeps on growing, but slows its pace by the end of the period—with the second peak being somewhere after 700/1301 CE. For convenience, many of the graphs that will follow will include the scaled-down cumulative curve and color-coded periods.

## Modeling Society

The individuals whose lives are described in biographical collections were not ordinary people. They were integrated into the life of society to a noticeable degree—somewhere on the scale from noteworthy to extraordinary. Almost every biographical note contains some information on a sphere of life to which its protagonist contributed—and “descriptive names” is the most manageable indicator of this.

Major studies that use “descriptive names” for analytical purposes split them into categories. Cohen’s classic study<sup><a href="#footnote_9_918" id="identifier_9_918" class="footnote-link footnote-identifier-link">10</a></sup> concentrates primarily on “secular occupations” during the first four centuries of Islamic history. He offered a major division of occupational <i>nisbaŧ</i>s (textiles, foods, ornaments/perfumes, paper/books, leather/metals/wood/clay, miscellaneous trades, general merchants, bankers/middlemen) and supplied an extensive appendix with explanations for about 400 <i>nisbaŧ</i>s and relevant linguistic formulae. Unfortunately, the <i>nisbaŧ</i>s in Cohen’s appendix are not explicitly categorized and—since any categorization involves pushing the boundaries, especially in instances that stubbornly resist classification—the exact scheme remains somewhat unclear.

Petry’s scheme is built on biographical data from Mamlūk Egypt (1258–1517 CE). Petry divided his subjects into six major, often overlapping occupational groups: executive and military professions, bureaucratic (secretarial-financial) professions, legal professions, artisan and commercial professions, scholarly and educational professions, and religious functionaries. Although explicit classification is not given in the “Glossary of Occupational Terms, ” numerous tables provide enough information to form a rather clear idea about the specifics of each category in Petry’s classification scheme.<sup><a href="#footnote_10_918" id="identifier_10_918" class="footnote-link footnote-identifier-link">11</a></sup>

Shatzmiller approached this issue from the much wider perspective of labor in general. Her scheme covers a much wider variety of occupational names and splits the entire society into three major sectors—extractive, manufacturing, services—with each sector having its overlapping subcategories. Schatzmiller offers an explicit categorization of each and every descriptive name.<sup><a href="#footnote_11_918" id="identifier_11_918" class="footnote-link footnote-identifier-link">12</a></sup>

As is the case with any scheme, all three examples are designed to serve specific purposes. Although immensely helpful, none of them are suitable for the purposes of broader analysis: unlike the above-mentioned schemes, the scheme needed here must take into account <i>all</i> meaningful descriptors, not only those that can be classified as “occupations.” In other words, it must consider anything that would allow discerning all potentially identifiable groups so that their evolution could be traced. Some of these descriptors do not pose significant problems, others are so complex that even presenting them as ideal types might be highly problematic.

The list of “descriptive names” from *Taʾrīḫ al-islām* is based on frequencies and for the moment I consider <i>nisbaŧ</i>s that are used to qualify at least ten individuals (slightly over 700 unique <i>nisbaŧ</i>s, with their total running up to almost 70,000 instances). My list of descriptive names overlaps only partially with those of Cohen, Petry and Shatzmiller. Figure <b>2</b> shows how the categories of “descriptive names” from *Taʾrīḫ al-islām* are interconnected from the individual perspective.


<figure class="half">
	<a href="{{ site.url }}/images/tamfih/NamesScheme1.jpg" title=""><img src="{{ site.url }}/images/tamfih/NamesScheme1.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/NamesScheme2.jpg" title=""><img src="{{ site.url }}/images/tamfih/NamesScheme2.jpg"></a>
</figure>
<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/NamesLayer2.jpg" title=""><img src="{{ site.url }}/images/tamfih/NamesLayer2.jpg"></a>
	<figcaption>
		<b>Figures 2, 4, 3 (Order: Left-to-Right, Top-to-Bottom):</b>
		<b>Figure 2.</b> Interconnectedness of Descriptive Names from the Individual Perspective.
		<b>Figure 4.</b> Interconnectedness of Descriptive Names from the Social Perspective. Shifting circles and dashed lines denote the intricate interconnectedness of the three layers of name categories.
		<b>Figure 3.</b> Hierarchical Connections of the Middle Layer.
	</figcaption>
</figure>

The innermost layer of categories includes <b>trib</b>al, <b>topo</b>nymic, <b>ethn</b>ic and <b>phys</b>ical descriptions. These are descriptors over which individuals have the least control—in a sense that no one chooses into which <b>trib</b>e to be born, where to be born, what <b>ethn</b>ic group to belong to, and what <b>phys</b>ical peculiarities to have or suffer from. To a certain degree these description are also acquirable—in the early period being a Muslim meant being affiliated with an Arab <b>trib</b>e; individuals were constantly moving around the Islamic world, changing their <b>topo</b>nymic affiliations; <b>phys</b>ical peculiarities could have resulted from life experience. However, these are only probable—and thus secondary—cases that would usually be piled up on top of primary, “by-birth” descriptions. The first three categories—<b>trib</b>al, <b>topo</b>nymic, <b>ethn</b>ic—also tend to overlap.

The middle layer groups “descriptive names” in terms of acquirable qualities—<b>trade</b>, <b>knowl</b>edge, <b>posit</b>ition and <b>statu</b>s. These are not categories that rest on the same level and their connections are better represented in an hierarchical manner (Figure <b>3</b>). The main gateways to élites were <b>trade</b>s (or “secular occupations”) and <b>knowl</b>edge[s]. However, practicing some <b>trade</b> alone was almost never enough: biographical collections rarely—if ever—include individuals who were involved exclusively in some specific “secular occupation.” In order to climb up the social ladder a practitioner of any <b>trade</b> had to start converting his economic capital into social—this was most commonly done through acquiring religious <b>knowl</b>edge. <b>Knowl</b>edge—as specialized training in a specific area that would set an individual aside from the masses—opened ways for acquiring <b>posit</b>ions and <b>statu</b>s[es]; it could also allow one to practice <b>trade</b> on a new level, thus improving individual’s <b>statu</b>s.

The outermost layer represents the major sectors to which a person could belong in pre-modern Islamic society: <b>relig</b>ious, <b>admin</b>istrative, <b>milit</b>ary, and “<b>civil</b>ian.” The term “civilian” is problematic, and is used here essentially as a negative blanket category that encompasses everything that does not clearly belong to the first three sectors. Descriptive names often cross boundaries among these categories and most individuals do not clearly belong to one specific sector, but rather balance among them.

For our purposes it will be more efficient to invert this scheme so that “descriptive names” are presented from the social perspective (Figure <b>4</b>). Now, each category contributes to the composition of Islamic society, and every “descriptive name” can be seen as a social role. These roles are likely to receive a centripetal charge from individuals who attempt to expand their influence on society at large; how close they get to the center—i.e., how much social influence they can exercise—would depend on the success of particular individuals and/or historical circumstances that might be favorable to particular groups. Social influence here is understood broadly as a pressure that forces someone to do something that s/he otherwise would not have done; at this point I do not make a distinction between physical threats and social pressures. Clearly, the sword of an <i>amīr</i>, “military commander, ” and the word of a <i>šayḫ</i>, “religious authority, ” are different in their nature, but both may have equally serious societal consequences.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/Names_Examples_14.jpg" title=""><img src="{{ site.url }}/images/tamfih/Names_Examples_14.jpg"></a>
	<figcaption><b>Figure 5.</b> <i>Nisbaŧ</i> Classification Examples (a).</figcaption>
</figure>


Figures <b>5</b> *&* <b>6</b> should provide a visual clue to how these overlapping categories are used in the classification scheme. On Figure <b>5</b>: <i>amīr</i>, “governor, commander, ” and <i>sulṭān</i>, “sultan, ” both belong to the <b>milit</b>ary sector of society. <i>Amīr</i> can be seen primarily as a <b>posit</b>ion—in a sense that there is somebody above who granted this <b>posit</b>ion to a given individual; arguably, this <b>posit</b>ion provides one with a relatively high <b>statu</b>s. <i>Sulṭān</i> is the apex of the <b>milit</b>ary hierarchy and thus is primarily seen as <b>statu</b>s with significant influence over all other sectors. <i>Kātib</i>, “scribe, ” and <i>wazīr</i>, “vizier, prime minister, ” belong to the <b>admin</b>istrative sector, where the former is a <b>posit</b>ion with potential for social influence, while the latter is the apex of the <b>admin</b>istrative hierarchy, which gives one significant resources to influence society at large—hence, it is also <b>statu</b>s.<sup><a href="#footnote_12_918" id="identifier_12_918" class="footnote-link footnote-identifier-link">13</a></sup> Somewhat an equivalent to <i>amīr</i>, <i>raʾīs</i>, “chief, director, ” is a denomination of high <b>statu</b>s in either the <b>civil</b>ian, the <b>relig</b>ious or the <b>admin</b>istrative sector (also <b>posit</b>ion in the latter). <i>Ṭabīb</i>, “physician, ” stands for special training—<b>knowl</b>edge—within the <b>civil</b>ian sector, which is also likely to fall into the categories of <b>trade</b> and <b>posit</b>ion, especially after hospitals (sing. <i>bimaristān</i>) become a constant element of the Muslim cityscape.<sup><a href="#footnote_13_918" id="identifier_13_918" class="footnote-link footnote-identifier-link">14</a></sup> <i>Qaṭṭān</i>, “producer or seller of cotton, ” and <i>qawwās</i>, “bow-maker, ” are both secular occupations—<b>trade</b>s—and thus belong to the <b>civil</b>ian sector, although the latter—if bows are produced for war-making purposes—may cross into the <b>milit</b>ary one.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/Names_Examples_24.jpg" title=""><img src="{{ site.url }}/images/tamfih/Names_Examples_24.jpg"></a>
	<figcaption><b>Figure 6.</b> <i>Nisbaŧ</i> Classification Examples (b).</figcaption>
</figure>

On Figure <b>6</b>: <i>Šayḫ</i>, literally “elder, ” and <i>imām</i>, “leader, ” are the markers of the highest <b>relig</b>ious <b>statu</b>s, although in the later period <i>imām</i> also refers to a <b>relig</b>ious <b>posit</b>ion of “prayer leader” that was only marginally influential in social terms. <i>Faqīh</i> refers to <b>knowl</b>edge of Islamic law, whereas social influence is exerted primarily through other roles, such as <i>qāḍī</i>, “judge, ” which is always a <b>posit</b>ion—or <i>muftī</i>, “juristconsult, ” which turns into a <b>posit</b>ion in the later period (not graphed). <i>Ḥāfiẓ</i> denotes <b>knowl</b>edge of Prophetic tradition and high achievement (<b>statu</b>s) within this area of <b>relig</b>ious expertise. <i>Muḥtasib</i>, “market inspector, ” is an <b>admin</b>istrative <b>posit</b>ion with strong <b>relig</b>ious underpinnings. Last on the list are <i>ḫaṭīb</i>, “Friday preacher, ” and <i>wāʿiẓ</i>, “public preacher.” Both belong to the <b>relig</b>ious sector, but while the former is always a <b>posit</b>ion, the latter refers to a specific field of religious <b>knowl</b>edge that tends to become a <b>posit</b>ion only during the later period.

Individuals in the Islamic biographical dictionaries usually wear many turbans and are qualified with more than one “descriptive name.” Using the same method, each individual can be represented as a unique constellation of <b>trade</b>s, <b>knowl</b>edge[s], <b>posit</b>ions and <b>statu</b>s[es] that are fitted into the diagram of the four major sectors. Pushing this approach even further, we may try to evaluate how the composition of Islamic élites—and, possibly, society at large—changed over time, although conventional graphs may be more efficient for this task.

## Looking into Major Sectors

Introducing the categories of sectors—<b>milit</b>ary, <b>admin</b>istrative, <b>relig</b>ious and <b>civil</b>ian—I hope to use them as markers of change within the composition of Islamic élites. Society would remain healthier when more social groups are represented in the élites, since a more diverse population will be participating in the [re]negotiation of the rules of the game. This is what the share and the diversity of the civilian sector—with a number of trades, crafts and knowledge[s]—is meant to represent.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_BiosMajorSectors_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosMajorSectors_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_BiosMajorSectors_REL.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosMajorSectors_REL.jpg"></a>
	<figcaption><b>Figure 7.</b> Major Sectors of Islamic Society (as represented in <i>Taʾrīḫ al-islām</i>)</figcaption>
</figure>


Figure <b>7</b> shows the cumulative curves of all four sectors. Although this is still work in progress and algorithms for determining the administrative and military sectors still need adjustment, the curves do agree with the major trends that we expect to be confirmed by quantitative analysis.

The religious sector keeps on growing throughout the period. Occasional fluctuations notwithstanding, it hits the 60% mark by the end of the period. One would expect this number to be higher, but a significant number of individuals participated in the transmission of knowledge without specializing in specific fields of religious learning and thus did not not earn relevant <i>nisbaŧ</i>s. This, of course, may result from irregularities in naming practices or the lack of verbal patterns in my synsets.

The civilian sector is at its highest during 300-400 AH/913-1010 CE, when it reaches a 30% share. By the end of the period it goes down to 20%. The number of individuals involved in trades and crafts is about 24-25% at its highest point around 400/1010 CE and goes down to 13-14% by the end of the period.

The administrative and military sectors are not as significant in terms of numbers, but the representatives of these sectors are in better positions to make the most immediate and most striking impact on society at large. Both sectors keep on growing, although while the growth of the administrative sector is constant, albeit rather slow, the growth of the military sector is quite remarkable, especially after 500/1107 CE. Overall, the share of the military sector could have been reaching up to 10% during the later periods, which is very significant considering that at some earlier periods this sector is lacking altogether. The administrative sector may have hit the mark of about 8% during the later periods.

## Major Social Transformations

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_Bios_TribATop_CAT_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Bios_TribATop_CAT_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_Bios_TribATop_CAT_REL.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Bios_TribATop_CAT_REL.jpg"></a>
	<figcaption><b>Figure 8.</b> Individuals with Tribal and Toponymic <i>nisbaŧ</i>s in <i>Taʾrīḫ al-islām</i>.</figcaption>
</figure>

**De-tribalization** is one of the most striking processes that the onomastic data show. Islamic society starts as a tribal society with up to 85% of individuals in the earliest periods qualified through tribal affiliations. As the Islamic community grows and spreads over the Middle East and North Africa, the number of individuals with tribal identities rapidly goes down (Figure <b>8</b>) and by about 350/962 CE only 20–25% of the individuals in the *Taʾrīḫ al-islām* have tribal affiliations. From this point on—perhaps even earlier—tribal affiliations persevere in different capacities: some as dynastic (most prominently, the <i>nisbaŧ</i> al-Umawī that spikes again after 350/962 CE in Andalusia), but in most cases as status markers.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/00000876_AnSAry_TAGS_TRIBAL_PROPHET_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/00000876_AnSAry_TAGS_TRIBAL_PROPHET_ABS.jpg"></a>
	<figcaption><b>Figure 9.</b> Individuals with <i>nisbaŧ</i> al-Anṣārī in <i>Taʾrīḫ al-islām</i>. Although al-Anṣār, “The Helpers [of the Prophet], ” are not exactly a tribe, this group, being a product of the tribal society of Arabia, in many ways functioned as such.</figcaption>
</figure>


Such <i>nisbaŧ</i>s as al-Anṣārī (Figure <b>9</b>) and al-Qurašī (Figure <b>10</b>) make quite a noticeable comeback. The numbers of al-Anṣārīs (this <i>nisbaŧ</i> is particularly frequent in Andalusia as well) begin to grow quite rapidly after 350/962 CE and the number of al-Qurašīs practically skyrockets right after 500/1107 CE. However, even though their absolute numbers are much higher in the later periods, their percentages never reach their early peaks: the highest peak of al-Anṣārīs in the earliest periods is 18.32%, while the highest one in the later periods is only 6.53%; with al-Qurašīs these numbers are 8.42% and 3.31%. Some other tribal <i>nisbaŧ</i>s are re-claimed as well, but the overall number of individuals with names that associate them with Arab tribes remains rather low, only briefly going above the 30% mark.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/00000625_qrEy_TAGS_TRIBAL_PROPHET_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/00000625_qrEy_TAGS_TRIBAL_PROPHET_ABS.jpg"></a>
	<figcaption><b>Figure 10.</b> Individuals with <i>nisbaŧ</i> al-Qurašī in <i>Taʾrīḫ al-islām</i>.</figcaption>
</figure>


Most tribal <i>nisbaŧ</i>s display rather distinctive orientations toward the East or the West of the Islamic world. “Late bloomers” are most often oriented toward the West (Figure <b>11</b>). For example, such <i>nisbaŧ</i>s as al-Qaysī (208) and al-Laḫmī (183) feature most prominently in Andalusia (84 al-Qaysīs and 83 al-Laḫmīs); al-Tujībī (127)—in Andalusia (57) and Egypt (46); al-Maḫzūmī (182)—in Egypt (33);<sup><a href="#footnote_14_918" id="identifier_14_918" class="footnote-link footnote-identifier-link">15</a></sup> al-Saʿdī (191)—in Egypt (50) and Syria (25). But again, the percentages of “late bloomers” never reach those of the earlier periods.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/qysy_TAGS_TRIBAL_00208_MapOfConnections.jpg" title=""><img src="{{ site.url }}/images/tamfih/qysy_TAGS_TRIBAL_00208_MapOfConnections.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/lxmy_TAGS_TRIBAL_00181_MapOfConnections.jpg" title=""><img src="{{ site.url }}/images/tamfih/lxmy_TAGS_TRIBAL_00181_MapOfConnections.jpg"></a>
</figure>
<figure class="half">
	<a href="{{ site.url }}/images/tamfih/tjyby_TAGS_TRIBAL_00125_MapOfConnections.jpg" title=""><img src="{{ site.url }}/images/tamfih/tjyby_TAGS_TRIBAL_00125_MapOfConnections.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/mxzwmy_TAGS_TRIBAL_00181_MapOfConnections.jpg" title=""><img src="{{ site.url }}/images/tamfih/mxzwmy_TAGS_TRIBAL_00181_MapOfConnections.jpg"></a>
	<figcaption><b>Figure 11.</b> Western Orientation of Some Tribal “Late bloomers.” <b>NB</b>: Each map has its own scale.</figcaption>
</figure>


The change in tribal identities can also be seen through the numbers of unique tribal <i>nisbaŧ</i>s per period (Figure <b>12</b>). In general, they display a similar trend. At its highest the number of unique tribal <i>nisbaŧ</i>s fluctuates at around 115 during the period 100-200 AH/719-816 CE. It drops to about 60 by 500/1107 CE and then grows back to about 80—most likely through the re-appropriation of old tribal <i>nisbaŧ</i>s that are now used as status markers as well as through the introduction of Turkic and Kurdish tribal identities—but by the end of the main period this number goes down to the 60–70 range.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_Bios_Unique_Tribal_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Bios_Unique_Tribal_ABS.jpg"></a>
	<figcaption><b>Figure 12.</b> Unique tribal <i>nisbaŧ</i>s in <i>Taʾrīḫ al-islām</i>.</figcaption>
</figure>

**Militarization.** Onomastic data from *Taʾrīḫ al-islām* allows us to take a closer look at the process characterized by Hodgson as “perhaps the most distinctive feature of the Middle Islamic periods.”<sup><a href="#footnote_15_918" id="identifier_15_918" class="footnote-link footnote-identifier-link">16</a></sup> The absolute numbers on Figure <b>13</b> (left) show that the military sector of élites begins to grow rapidly after 500/1107 CE—the numbers of <i>amīr</i>s included in the *Taʾrīḫ al-islām* are staggering.<sup><a href="#footnote_16_918" id="identifier_16_918" class="footnote-link footnote-identifier-link">17</a></sup> Geographically, this spike of militarization is clearly visible in Iraq, the Jazīraŧ, Egypt, but in Syria more than anywhere.

The relative numbers in Figure <b>13</b> (right) allow for a more detailed glimpse into how the military were treated by the learned class who composed biographical collections that became sources of al-Ḏahabī’s “History.” And the percentages tell a somewhat different story. Interestingly, the turning points of the military curve coincide with those of the cumulative biographical curve. The military curve, however, has three clearly visible sections, or periods. The first section, the early period up until 270/884 CE, shows the decline of the military in Islamic society. This process of de-militarization went on hand-in-hand with de-tribalization, during which the diversity of the Islamic community grew, the ethos changed and swords and horses were exchanged for pens and donkeys. 270/884 CE is the first peak of the cumulative biographical curve: the highest percentage of the learned and the lowest percentage of the military in the *Taʾrīḫ al-islām*.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_BiosMilitarySector_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosMilitarySector_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_BiosMilitarySector_REL.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosMilitarySector_REL.jpg"></a>
	<figcaption><b>Figure 13.</b> The Military Sector in <i>Taʾrīḫ al-islām</i>.</figcaption>
</figure>

During the middle period of 270-570 AH/884-1175 CE, when the cumulative biographical curve takes a dive and then, after 470/1078 CE, begins to recover, the share of the military in *Taʾrīḫ al-islām* grows slowly. This can be marked as the beginning of [re-]militarization of Islamic élites. Unlike in the early period, however, now the <i>amīr</i>s are not Arab[ian] warriors, but Turkic military commanders.

After 570/1175 CE—when the cumulative curve recovers and continues growing further—the percentage of military commanders in the élites begins to grow as rapidly as their absolute numbers. This third period shows a successful integration of the military into the élites and the their numbers strongly suggest that religious scholars take even minor commanders seriously.

Military commanders do a lot to make a place for themselves in the dense social space of the Islamic society: as their biographies show, they build <i>madrasaŧ</i>s, hospitals (<i>bimāristān</i>) and establish other <i>waqf</i> institutions. More and more often they participate in the transmission of knowledge, which scholars report.

The military—the <i>amīr</i>s themselves and members of their families<sup><a href="#footnote_17_918" id="identifier_17_918" class="footnote-link footnote-identifier-link">18</a></sup>—are not the only ones building <i>madrasaŧ</i>s and, judging by the frequencies of their mentions, their establishments are not the most prominent. However, they definitely compensate for this in numbers: there are significantly more endowments established by the military than by members of other groups.<sup><a href="#footnote_18_918" id="identifier_18_918" class="footnote-link footnote-identifier-link">19</a></sup> Figure <b>14</b> shows the curves of the most frequently mentioned <i>madrasaŧ</i>s in *Taʾrīḫ al-islām*. The vizieral al-Niẓāmīyaŧs and the caliphal al-Mustanṣirīyaŧ feature more prominently. However, their curves strongly suggest that their prime time is over, while “military” <i>madrasaŧ</i>s—al-Ẓāhirīyaŧ, al-Amīnīyaŧ, al-Nāṣirīyaŧ, al-Nūrīyaŧ, al-ʿĀdilīyaŧ and al-Qaymarīyaŧ and others—are on the rise.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_Words_SomeoftheMostProminentMadrasas_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_SomeoftheMostProminentMadrasas_ABS.jpg"></a>
	<figcaption><b>Figure 14.</b> Mentions of Most Prominent <i>Madrasaŧ</i>s.</figcaption>
</figure>


The “Fulān al-dīn” honorifics that in the earlier periods were reserved for religious scholars become very common among the military, while the old pattern of “Fulān al-dawlaŧ” practically disappears (see Figure <b>15</b>).<sup><a href="#footnote_19_918" id="identifier_19_918" class="footnote-link footnote-identifier-link">20</a></sup> It is not entirely clear whether these names are given to the military by religious scholars or if they are self-claimed (most likely both), but the fact that the military are listed under these honorifics in biographical collections implies that at the very least religious scholars endorsed them.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_Words_HonorificNamesofAmirsFulandawla_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_HonorificNamesofAmirsFulandawla_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_Words_HonorificNamesofAmirsFulandin_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_HonorificNamesofAmirsFulandin_ABS.jpg"></a>
	<figcaption><b>Figure 15.</b> Patterns of Military Honorific Names: Fulān al-dawlaŧ, the most common pattern in the middle period, gets replaced by Fulān al-dīn pattern in the later period.</figcaption>
</figure>

Frequencies of such words as *ḫalīfaŧ/amīr al-muʾminīn*, <i>sulṭān</i> and <i>amīr</i> in biographies show that the 4th/10th century was a the period (Figure <b>16</b>) when scholarly attention started shifting from caliphs to <i>sulṭān</i>s and <i>amīr</i>s who were gaining more power and more social presence. This shift in frequencies also neatly marks the end of the period which Hodgson characterized as the High Caliphal Period (in his chronology: *c.* 692-945 CE),<sup><a href="#footnote_20_918" id="identifier_20_918" class="footnote-link footnote-identifier-link">21</a></sup> and the beginning of the Earlier Middle Islamic Period (in his chronology: *c.* 945-1258 CE): the era of <i>sulṭān</i>s and <i>amīr</i>s.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_Words_FrequenciesCALIPH_SULTAN_AMIR_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_FrequenciesCALIPH_SULTAN_AMIR_ABS.jpg"></a>
	<figcaption><b>Figure 16.</b> Frequencies of <i>ḫalīfaŧ</i>, <i>sulṭān</i>, <i>amīr</i>.</figcaption>
</figure>


**De-civilianization**. As was noted above, the share of the civilian sector noticeably decreases after 400/1010 CE. The diversity of crafts and trades within the civilian sector (Figure <b>17</b>) reaches its highest point around 300/913 CE, when 85 different trades and crafts are represented.<sup><a href="#footnote_21_918" id="identifier_21_918" class="footnote-link footnote-identifier-link">22</a></sup> After 300/913 CE the diversity goes down, getting to the 60s range by the end of the period.

Looking closer into trades and crafts, it can be pointed that several sectors are clearly distinguishable:<sup><a href="#footnote_22_918" id="identifier_22_918" class="footnote-link footnote-identifier-link">23</a></sup> textiles (1, 495), foods (799), metalwork (331), “chemistry” (349),<sup><a href="#footnote_23_918" id="identifier_23_918" class="footnote-link footnote-identifier-link">24</a></sup> clothes (306), finances (278), paper/books (253), brokerage (231), jewelry (218), and sundry services (170).

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_UniqueNisbas_DiversityofNisbasTradesandCrafts_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_UniqueNisbas_DiversityofNisbasTradesandCrafts_ABS.jpg"></a>
	<figcaption><b>Figure 17.</b> Diversity of Trades and Crafts: Numbers of unique <i>nisbaŧ</i>s referring to trades in crafts by 20 lunar year periods.</figcaption>
</figure>

All sectors peak sometime between 300/913 CE and 500/1107 CE, but after that they show steady decline—even in those rare cases when absolute numbers remain quite significant, their percentages unmistakably go down. Practically all individual <i>nisbaŧ</i>s show the same trend. Merchants (sing. <i>tājir</i>, 294; Figure <b>18</b>) constitute the only group that shows a different trend and their numbers actually grow by the end of the period. This is, however, only because this is a blanket category that encompasses all the above listed “industries, ” without emphasizing any specific one in particular. Figure <b>19</b> shows the cumulative trend of involvement of religious scholars in crafts and trades. The curve based on absolute numbers (<i>left</i>) shows that numbers of scholars—who were either directly involved in specific crafts and trades or came from families that made their fortune in those areas—remained rather high until 600/1204 CE; relative numbers (<i>right</i>) show that the steady downward trend in this sector begins as early as 440/1049 CE—about three decades before the cumulative biographical curve (470/1078 CE) starts recovering.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_BiosCivilianSectorCraftsandTrades_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosCivilianSectorCraftsandTrades_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_BiosCivilianSectorCraftsandTrades_REL.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_BiosCivilianSectorCraftsandTrades_REL.jpg"></a>
	<figcaption><b>Figure 19.</b> The Growth and Decline of Crafts and Trades.</figcaption>
</figure>

By the end of the period the emphasis in identities shifts, and while “secular occupations” are still not uncommon among the learned,<sup><a href="#footnote_24_918" id="identifier_24_918" class="footnote-link footnote-identifier-link">25</a></sup> they are definitely no longer the main focus of biographers, who instead pay more attention to positions and family connections (see section on <b>Professionalization</b> below).

The geographical distribution of these professions is most puzzling. Essentially, all “industries” display the same pattern: the larger the region, the larger the presence of individuals involved in specific “industries.” Iraq always comes first, followed by Iran (representation by sectors varies slightly, but northeastern Iran usually has highest numbers), then Syria and Egypt. Such a geographical distribution of “industries” suggests that occupational <i>nisbaŧ</i>s were used as necessary specifiers to distinguish among individuals in large communities.<sup><a href="#footnote_25_918" id="identifier_25_918" class="footnote-link footnote-identifier-link">26</a></sup> This issue might be resolved by adding local biographical collections to the corpus and experimenting with data grouping until some distinctive patterns can be discerned. Data from non-literary sources will be crucial for advancing this inquiry, which requires undivided attention.

Whether this decline of the civilian sector is a result of the actual withdrawal of the learned from trades and crafts, or, the loss of awareness of this part of their identity, the general effect on the development of the religious sector would still be the same: the loss of connections with broader population. It is not that religious scholars stopped maintaining connections with populace at large, but they gradually turned into a self-reproducing class whose members were primarily concerned about their own group interests.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/00000296_tAjr_TAGS_TRADE_CIVILIAN_MERCHANT_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/00000296_tAjr_TAGS_TRADE_CIVILIAN_MERCHANT_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/00000296_tAjr_TAGS_TRADE_CIVILIAN_MERCHANT_REL.jpg" title=""><img src="{{ site.url }}/images/tamfih/00000296_tAjr_TAGS_TRADE_CIVILIAN_MERCHANT_REL.jpg"></a>
	<figcaption><b>Figure 18.</b> The Growth of Merchants.</figcaption>
</figure>


**Professionalization *&* institutionalization** of the learned class are another two processes that take place during the period covered in *Taʾrīḫ al-islām*. These processes have been discussed at length in academic literature,<sup><a href="#footnote_26_918" id="identifier_26_918" class="footnote-link footnote-identifier-link">27</a></sup> although in most cases the emphasis is on institutionalization.<sup><a href="#footnote_27_918" id="identifier_27_918" class="footnote-link footnote-identifier-link">28</a></sup>

Here “professionalization” is understood as the growth of complexity of religious learning that leads to its branching into specific disciplines, mastering which eventually requires full-time commitment. Professionalization implies the development of a community of specialists who maintain qualifying standards and ensure demarcation from the non-qualified; ideally, mechanisms of monetary and status compensation for professional services should develop during this process.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_UniqueNisbas_GrowthofReligiousSpecialisations_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_UniqueNisbas_GrowthofReligiousSpecialisations_ABS.jpg"></a>
	<figcaption><b>Figure 20.</b> Growth of Religious Specializations: Numbers of unique <i>nisbaŧ</i>s referring to religious specializations by 20 lunar year periods.</figcaption>
</figure>

If we agree on recognizing the process of branching of the religious learning into specific disciplines as an indicator of professionalization, we may look at the growth of religious specializations as indicated through “descriptive names.” Figure <b>20</b> shows that the process of branching reaches its highest point during 300–350 AH/913–962 CE, after which the number of specializations remains on the same level and fluctuates only slightly.

Although completely devoid of both buzzwords, Melchert’s study is perhaps the most valuable insight into the process of professionalization.<sup><a href="#footnote_28_918" id="identifier_28_918" class="footnote-link footnote-identifier-link">29</a></sup> In his book on the formation of the Sunnī legal schools (<i>maḏhab</i>), Melchert offered three major criteria: the recognition of the chief scholar (<i>raʾīs</i>), commentaries (<i>taʿliqaŧ</i>) on the summaries of legal teachings (<i>muḫtaṣar</i>), as a proof of one’s qualification, and a more or less regulated process of transmission of legal knowledge, through which the achievement of required qualification is ensured. Chronologically, Melchert placed this process for the Shāfiʿīs, Ḥanbalīs and Ḥanafīs in Baġdād of the late 9<sup>th</sup>—early 10<sup>th</sup> centuries.<sup><a href="#footnote_29_918" id="identifier_29_918" class="footnote-link footnote-identifier-link">30</a></sup> Keeping in mind this coincidence of Melchert’s close reading of legal <i>ṭabaqāt</i> and my distant reading of *Taʾrīḫ al-islām*, we may—at least tentatively—consider 300/913 CE to be a turning point in the process of professionalization.

<figure class="fit">
	<a href="{{ site.url }}/images/tamfih/TI_Words_WaqfInstitutions_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_WaqfInstitutions_ABS.jpg"></a>
	<figcaption><b>Figure 21.</b> References to <i>Waqf</i> Institutions in Biographies.</figcaption>
</figure>

Data from the *Taʾrīḫ al-islām* shows that professionalization of religious knowledge (around 300/913 CE) is not directly related to scholars’ abandoning their gainful occupations in the civilian sectors, as this process will start only around 430/1039 CE. However, professionalization failed to bring about one very important thing, namely more paid positions for the learned. This must have forced men of learning into difficult position where they had to maintain a delicate, but uncomfortable balance between keeping up with higher standards of religious learning and earning living. The financial difficulties that professionalization imposed on the life of a scholar may have become quite a discouraging factor for the young who were considering career paths. Keeping in mind that the decline of the main curve begins *c.* 270/884 CE—i.e. roughly around the time when the number of religious specializations reaches its highest point—it is tempting to consider that professionalization has something to do with this decline. After all, a full-time commitment to study religious sciences leaves one no time to earn a living through gainful occupations in the civilian sector. Charging money for teaching religious subjects was considered illicit, and there are hardly any indications that the number of positions for religious specialists grew to compensate for this unfortunate development. To succeed in such conditions, one had to be either extremely resolute or come from a wealthy family to afford the career of a scholar. And since both of these are in limited availability in any society, this could explain the decline in numbers of biographies.

The introduction and spread of <i>waqf</i> institutions is considered a turning point in the institutionalization of the learned. The salaried positions of these institutions offered a solution to the complication of professionalization. Frequencies of references to <i>waqf</i> institutions in biographies (Figure <b>21</b>) show that they—most importantly the <i>madrasaŧ</i>s—become a noteworthy detail of biographies soon after 400/1010 CE, about 100 lunar years after the turning point in professionalization, and a very important one after 500/1107 CE.<sup><a href="#footnote_30_918" id="identifier_30_918" class="footnote-link footnote-identifier-link">31</a></sup>

However, by offering salaried positions, the <i>waqf</i> institutions also reconfigured the structure of the learned class, which in the long run had a very negative effect. In his study of medieval Damascus,<sup><a href="#footnote_31_918" id="identifier_31_918" class="footnote-link footnote-identifier-link">32</a></sup> Chamberlain convincingly argued that salaried positions (<i>manāṣib</i>) became one of the major object of contention among the learned who were now concerned about winning and holding as many of these positions as it was possible. One of their strategies was to ensure that the positions stayed within a family—household—which led to the formation of the dynasties of religious scholars and, in the long run, the transformation of the religious class into a rather closed social stratum, to which the word “clergy” became more and more applicable as time went on.

<figure class="half">
	<a href="{{ site.url }}/images/tamfih/TI_Words_ReferencestoRelativesCum_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_ReferencestoRelativesCum_ABS.jpg"></a>
	<a href="{{ site.url }}/images/tamfih/TI_Words_ReferencestoRelatives_ABS.jpg" title=""><img src="{{ site.url }}/images/tamfih/TI_Words_ReferencestoRelatives_ABS.jpg"></a>
	<figcaption><b>Figure 22.</b> References to Relatives. The graph on the left shows the major categories of relatives, while the on on the right shows the same data combined into one graph.</figcaption>
</figure>


As the data from the *Taʾrīḫ al-islām* indicate (Figure <b>22</b>), the role of family connections unmistakably increases after 400/1010 CE. The tribal nature of early Islamic society explains the high frequency of references to close relatives in the early periods. However, references to parents are most frequent—largely to fathers<sup><a href="#footnote_32_918" id="identifier_32_918" class="footnote-link footnote-identifier-link">33</a></sup>—which is understandable, considering the importance of lineage through the male line within tribal society. But again, the curve of references goes down steadily between 120/739 CE and 380/991 CE, mirroring the curve of tribal identities that also goes down while the number of biographies keeps on growing. After 380/991 CE references to family members practically skyrocket, and even increase in pace slightly around 500/1107 CE. Unlike in the early period, references to most members of the immediate family become very common: parents (the word “parent, ” *wālid[aŧ]*, become particularly common), siblings (brothers and sisters—<i>aḫū</i>, <i>uḫt</i>), children (sons and daughters—*ibnu-hu*, *bintu-hu*, etc.), and, to a lesser extent, spouses (husbands and wives—*zawj[aŧ]*). The same trend can be seen in the references to uncles, aunts, grandparents and grandchildren. These shifts—not just the growth of frequencies, but also the growth of varieties of familial references—may be interpreted as a shift of scholarly attention from the lineage to the household.

If we accept these rates of frequencies as an indicator of the formation of households, than it appears that scholarly households begin growing earlier than <i>waqf</i> institutions. The growth of scholarly families thus may have been caused by professionalization and then boosted by institutionalization.

## Concluding Remark

The presented model is exploratory. It is rather simple, but it is transparent. Explicitly described models can be discussed, compared, modified, and applied to new sources. With models we can stop futile discussions about the meaning and reliability of certain data and start exploring Islamic history experimentally. By developing and testing multiple complex models we can eventually arrive to a better understanding of both our sources and processes that they describe. With models we can compare multiple sources, even evaluate entire genres. Right now, when scholars of Islam are entering the domain of digital humanities, there is a dire need for transparency of our methods—and modeling appears to be the most optimal option—especially if we venture to study the entire digital corpus of classical Arabic sources, which at the moment may have already exceeded 800 million words.

## Cited Works

**Berkey (1992)**:  
Jonathan P. Berkey. *The transmission of knowledge in Medieval Cairo: a social history of Islamic education*. Princeton University Press, Princeton, N.J., 1992.

**Bulliet (1979)**:  
Richard W. Bulliet. *Conversion to Islam in the medieval period: an essay in quantitative history*. Harvard University Press, Cambridge, 1979.

**Chamberlain (1994)**:  
Michael Chamberlain. *Knowledge and social practice in medieval Damascus, 1190-1350*. Cambridge University Press, Cambridge ; New York, 1994.

**Cohen (1970)**:  
Hayyim J. Cohen. The economic background and the secular occupations of muslim jurisprudents and traditionists in the classical period of Islam: (until the middle of the eleventh century). *Journal of the Economic and Social History of the Orient*, 13: 16-61, 1970.

**Ephrat (2000)**:  
Daphna Ephrat. *A learned society in a period of transition: the Sunni ʿUlamaʾ* of eleventh century Baghdad. State University of New York Press, Albany, 2000.

**Gilbert (1980)**:  
Joan E. Gilbert. Institutionalization of muslim scholarship and professionalization of the ʿUlamāʾ in medieval Damascus. <i>Studia Islamica</i>, (52): 105-134, January 1980. ISSN 0585-5292.

**Hodgson (1974)**:  
Marshall G. S. Hodgson. *The venture of Islam: conscience and history in a world civilization. Vol. 2. The expansion of Islam in the middle periods*, volume 2. University of Chicago Press, Chicago, 1974.

**Humphreys (1989)**:  
R. Stephen Humphreys. Politics and architectural patronage in Ayyubid Damascus. In Clifford Edmund. Bosworth, editor, *The Islamic world from classical to modern times: essays in honor of Bernard Lewis*, pages 151-174. Darwin Press, Princeton, N.J., 1989.

**Humphreys (1994)**:  
R. Stephen Humphreys. Women as patrons of religious architecture in Ayyubid Damascus. <i>Muqarnas</i>, 11: 35-54, January 1994. ISSN 0732-2992.

**Jockers (2013)**:  
Matthew L. Jockers. *Macroanalysis: Digital Methods and Literary History*. University of Illinois Press, 1st edition edition, April 2013.

**Makdisi (1981)**:  
George Makdisi. *The rise of the colleges: institutions of learning in Islam and the West*. Edinburgh University Press, Edinburgh, 1981.

**Melchert (1997)**:  
Christopher Melchert. *The formation of the Sunni schools of law, 9th-10th centuries C.E.* Brill, Leiden ; New York, 1997.

**Moretti (2007)**:  
Franco Moretti. *Graphs, Maps, Trees: Abstract Models for Literary History*. Verso, 2007.

**Moretti (2013)**:  
Franco Moretti. <i>Distant Reading</i>. Verso, 1 edition, June 2013.

**Morris (2013)**:  
Ian Morris. *The measure of civilization: how social development decides the fate of nations*. Princeton University Press, Princeton, 2013.

**Petry (1981)**:  
Carl F. Petry. *The civilian elite of Cairo in the later Middle Ages*. Princeton University Press, Princeton, N.J., 1981.

**Romanov (2013)**:  
Maxim G. Romanov. *Computational Reading of Arabic Biographical collections with Special reference to Preaching (661-1300 CE)*. Ph.D., University of Michigan, Ann Arbor, MI, 2013.

**Shatzmiller (1994)**:  
Maya Shatzmiller. *Labour in the medieval Islamic world*. E.J. Brill, Leiden [The Netherlands], 1994.

**Wasserstein (2013)**:  
David J. Wasserstein. Where have all the converts gone? Difficulties in the study of conversion to islam in al-Andalus. *Al-Qanṭara*, 33 (2): 325-342, February 2013. ISSN 1988-2955, 0211-3589.

<b>Footnotes</b>

<ol class="footnotes">
  <li id="footnote_0_918" class="footnote">
    For more details, see Chapter 1 in <b><b>Romanov (2013)</b></b>. [<a href="#identifier_0_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_1_918" class="footnote">
    While most humanists remain skeptical in regard to working with big data, the number of studies that show that close reading alone is not enough keeps on growing. They emphasize that case studies based on close reading do not allow for extrapolations; that humanists are prone to putting too much effort into studying objects that are unique and for this reason are least likely to represent larger trends. Most vivid examples can be found in the field of literary history, see, e.g., <b><b>Moretti (2007)</b>, <b>Moretti (2013)</b></b> and <b><b>Jockers (2013)</b></b>. [<a href="#identifier_1_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_2_918" class="footnote">
    See, <b><b>Moretti (2007)</b>, p. 4</b>. [<a href="#identifier_2_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_3_918" class="footnote">
    For example, <b><b>Morris (2013)</b></b> uses the size of the largest urban center as an indicator of the social development of a region to which it belongs. <b><b>Bulliet (1979)</b></b> uses onomastic data as the indicator of conversion. [<a href="#identifier_3_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_4_918" class="footnote">
    For valuable examples of modeling “big data, ” see: <b><b>Moretti (2007)</b>, <b>Morris (2013)</b></b>; also see <a href="\&quot;http://orbis.stanford.edu/\&quot;">http://orbis.stanford.edu/</a> for the geographical model of the Roman world, developed by Walter Scheidel and Elijah Meeks. In the field of Islamic studies: <b><b>Bulliet (1979)</b></b>. [<a href="#identifier_4_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_5_918" class="footnote">
    Bulliet’s model of conversion is a great example of this. The very fact that this study is still criticized after more than three decades from its publication shows that a solid model cannot be discarded through a critique of where it fails, if otherwise it still remains plausible and coherent. For the most recent critique, see: <b><b>Wasserstein (2013)</b></b>. [<a href="#identifier_5_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_6_918" class="footnote">
    Both toponyms proper and toponymic <i>nisbaŧ</i>s linked with relevant toponyms. Toponymic data is crucial for our understanding of the social geography of the classical Islamic world. For my modeling of the geography of the Islamic world based on the data from <i>Taʾrīḫ al-islām</i> see, <b><b>Romanov (2013)</b>, p. 35-37, 41-42, 87-113</b>. [<a href="#identifier_6_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_7_918" class="footnote">
    <b><b>Romanov (2013)</b>, p. 28-51</b>. [<a href="#identifier_7_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_8_918" class="footnote">
    For a detailed discussion, see <b><b>Romanov (2013)</b>, p. 43-46</b>. [<a href="#identifier_8_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_9_918" class="footnote">
    See, <b><b>Cohen (1970)</b></b>. [<a href="#identifier_9_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_10_918" class="footnote">
    <b><b>Petry (1981)</b></b>. For the “Glossary, ” see pp. 390-402. [<a href="#identifier_10_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_11_918" class="footnote">
    <b><b>Shatzmiller (1994)</b></b>; For extensive lists of names/occupations, see pp. 101-168, 410-424. [<a href="#identifier_11_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_12_918" class="footnote">
    Some <i>wazīr</i>s rivaled their “employers” in influence. The most prominent examples are the Barmakid family that served the ʿAbbāsid caliphs and Niẓām al-mulk who served Mālikšāh, the Great Saljuq <i>sulṭān</i>. [<a href="#identifier_12_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_13_918" class="footnote">
    There are 322 physicians in the <i>ʿUyūn al-anbāʾ fī ṭabaqāt al-aṭibbāʾ</i> of Ibn Abī Uṣaybiʿaŧ (d. 668/1270 CE) and quite a few physicians are Jews and Christians, judging by their names. al-Ḏahabī’s count of physicians is about 200 which can be considered a very thorough coverage, since Ibn Abī Uṣaybiʿaŧ’s book is devoted exclusively to the physicians (and as it often happens, tends too overstretch the definition of the group), while al-Ḏahabī’s book is a general history. [<a href="#identifier_13_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_14_918" class="footnote">
    The first major peak of the <i>nisbaŧ</i> al-Maḫzūmī is around 150/768 CE and geographically it peaks largely in the Central Arabian Cluster (65 al-Maḫzūmīs). [<a href="#identifier_14_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_15_918" class="footnote">
    <b><b>Hodgson (1974)</b>, p. 64</b>. [<a href="#identifier_15_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_16_918" class="footnote">
    Unfortunately, at the moment my algorithms are not tuned well enough to trace all individuals who belonged to the military sector. The <i>nisbaŧ</i> <i>al-amīr</i> should serve well as an indicator: it is the most frequent “descriptive name” within the military sector and it is the easiest to trace computationally. [<a href="#identifier_16_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_17_918" class="footnote">
    Most prominently, women from their households, see, <b><b>Humphreys (1994)</b></b>. [<a href="#identifier_17_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_18_918" class="footnote">
    See, for example: <b>TI</b>, 28, 311-312; <b>TI</b>, 29, 68-76; <b>TI</b>, 37, 57-58; <b>TI</b>, 37, 185-186; <b>TI</b>, 38, 157-158; <b>TI</b>, 39, 370-387; <b>TI</b>, 41, 161-164; <b>TI</b>, 42, 407; <b>TI</b>, 44, 220; <b>TI</b>, 45, 119; <b>TI</b>, 45, 164; <b>TI</b>, 45, 311-313; <b>TI</b>, 45, 359; <b>TI</b>, 45, 402-406; <b>TI</b>, 46, 87-88; <b>TI</b>, 46, 289; <b>TI</b>, 46, 431-432; <b>TI</b>, 47, 165; <b>TI</b>, 47, 308; <b>TI</b>, 49, 192; <b>TI</b>, 50, 264; <b>TI</b>, 51, 196-197; <b>TI</b>, 51, 369-370; <b>TI</b>, 52, 368; <b>TI</b>, 52, 409-411. On the military patronage, see also: <b><b>Humphreys (1989)</b></b>. [<a href="#identifier_18_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_19_918" class="footnote">
    Somehow, the “Fulān al-dīn” names still have a strong steel aftertaste. The most common first components of the “Fulān al-dawlaŧ” pattern are Sayf al-dawlaŧ, “Sword of the Dynasty;” Nāṣir..., “Helper...;” Naṣr, “Victory;” Muʿizz, “Strengthener;” ʿIzz, “Strength;” ʿAḍud, “Support;” Tāj, “Crown;” Bahāʾ, “Splendor;” Ḥusām, “Cutting Edge.” The most first components of the “Fulān al-dīn” pattern are: Sayf al-dīn, “Sword of Religion;” ʿIzz..., “Strength...;” Jamāl, “Beauty;” Badr, “Full Moon;” Shams, “Sun;” Ṣalāḥ, “Goodness;” Ḥusām, “Cutting Edge;” Quṭb, “Pole;” ʿAlam, “Banner.” [<a href="#identifier_19_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_20_918" class="footnote">
    There is also a late peak that corresponds to the restoration of the independence of the ʿAbbāsid caliphate during the second half of the 6th/12th century, but it is short-lived. [<a href="#identifier_20_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_21_918" class="footnote">
    I should remind the reader that only <i>nisbaŧ</i>s that are used to describe at least 10 individuals are considered in this analysis. [<a href="#identifier_21_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_22_918" class="footnote">
    Largely following Shatzmiller’s classification, see: <b><b>Shatzmiller (1994)</b></b>; these sectors often overlap. [<a href="#identifier_22_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_23_918" class="footnote">
    Trades that involve dealing with any complex compounds: al-ʿAṭṭār, “druggist, perfumer;” al-Ṣaydalānī, “apothecary, druggist;” al-Ṣābūnī, “soap maker/seller” etc. [<a href="#identifier_23_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_24_918" class="footnote">
    The decline does not appear as staggering as, for example, Cohen’s <b>(<b>Cohen (1970)</b>)</b> study argued. [<a href="#identifier_24_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_25_918" class="footnote">
    Very similar to what Bulliet argued regarding toponymic <i>nisbaŧ</i>s: “For example Karkh, a popular quarter of Baghdad, appears in the nisba al-Karkhī when representation from Iraq is high. When the proportion is smaller, the name of the major city itself is a common nisba. In the example given, a later resident of Karkh would appear as al-Baghdadī. Finally, when the proportion is very low, the nisba will frequently be derived from the entire province, that is, al-Baghdadī becomes al-ʿIrāqī.” (<b><b>Bulliet (1979)</b>, p. 12</b>). [<a href="#identifier_25_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_26_918" class="footnote">
    The most important studies are: <b><b>Makdisi (1981)</b>, <b>Berkey (1992)</b>, <b>Chamberlain (1994)</b></b>. To a large extent Berkey’s and Chamberlain’s studies are responses to Makdisi’s “over-institutionalization.” [<a href="#identifier_26_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_27_918" class="footnote">
    It seems that Gilbert is the only one to use this term in her study of the learned of Medieval Damascus: see, <b><b>Gilbert (1980)</b></b>. However, in her study this term appears to blend into institutionalization and both become practically indistinguishable. Other scholars mention professionalization almost exclusively with the reference to Gilbert’s work. See, for example: <b><b>Chamberlain (1994)</b>, p. 70</b>; <b><b>Ephrat (2000)</b>, p. 104, 179</b>. [<a href="#identifier_27_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_28_918" class="footnote">
    <b><b>Melchert (1997)</b></b>. [<a href="#identifier_28_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_29_918" class="footnote">
    The failure of the Mālikīs Melchert explains by their being too closely linked to the caliphal patronage and when the caliphs were eclipsed, so were the Mālikīs. See: <b><b>Melchert (1997)</b>, p. 176</b>. [<a href="#identifier_29_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_30_918" class="footnote">
    The decline of the frequency of the word <i>madrasa</i> should not be interpreted as a decline of this institution, but rather as a change in the form of reference in general: most <i>madrasaŧ</i>s are referred to by their “al-Fulānīyaŧ” names (see Figure <b>14</b>). [<a href="#identifier_30_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_31_918" class="footnote">
    <b><b>Chamberlain (1994)</b></b>. [<a href="#identifier_31_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
  <li id="footnote_32_918" class="footnote">
    The most common references are the forms of <i>abū</i>, “father.” Since this word is also the essential part of <i>kunyaŧ</i>, an extremely common patronymic element of the Arab/Muslim name, only its forms with pronominal suffixes—such as <i>abū-hu</i>, “his father”—are considered. The same principle is applied to other ambiguous family terms. [<a href="#identifier_32_918" class="footnote-link footnote-back-link">&#8617;</a>]
  </li>
</ol>