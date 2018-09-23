---
header:
  image: /images/thematic/00810001.jpg
  caption: "**Photo credit**: Unknown Maker. Grave Naiskos of an Enthroned Woman with an Attendant, about 100 B.C.,
			Marble; 94.6 x 120.7 x 21.6 cm (37 1/4 x 47 1/2 x 8 1/2 in.). 
			[The J. Paul Getty Museum, Villa Collection, Malibu, California.](http://www.getty.edu/art/collection/objects/7009/unknown-maker-grave-naiskos-of-an-enthroned-woman-with-an-attendant-east-greek-about-100-bc/)"
title:			"Mapping the Greco-Roman World"
author_profile:   true
layout:   single
comments: true
categories:
  - Coding
  - R
  - Teaching
tags:
  - Blogpost
  - Mapping
---

“Envy is not a very good thing. Yet envy is precisely what an early Islamicist feels when he reads Roger Bagnall and Bruce Frier’s *The Demography of Roman Egypt*.” [^fn1] These words stuck in my head since the very moment I read them and over the past two years of working among and with the classicists my classics envy has been growing—on top of 300 original census declarations that were at the disposal of of the above mentioned scholars, there are way too many things to envy, especially when it comes to all things digital.

The [Pleiades Gazetteer](http://pleiades.stoa.org/) is a particularly interesting case: with almost 35,000 places, it offers several well-populated categories of geographical objects. The categories include settlements, forts, temples, villas, stations, [amphi]theaters, churches, bridges, baths, cemetaries, plazas, archs. What makes it even more interesting is that most of these objects have chronological markers, i.e. they belong to one or more of the following periods: archaic (750–550BC), classical (550–330BC), hellenistic-republican (330–30BC), roman (30BC–300CE), late-antique (300–640CE).

This data offers a opportunity for an interesting digital exersize with historical data. I assigned it to my students as a part of introduction to [R](https://www.r-project.org/) (within my “Introduction to Text Mining for the Students of Humanities”, Tufts University, Spring 2015). The task was to explore the Pleiades data set, find out what is what and what can be done with it. The goal was to discover that 1) geographical objects are categorized, and that 2) they also have chronological markers, which can be used 3) to maps the geography of the Greco-Roman world over time.

The map of forts turned out to be particularly interesting.

Below is the code and some of the resulting visualizations.

~~~ r
# R

# You might need to install the necessary packages, which you can do by running the following lines
# NB: uncomment them first

# install.packages("ggplot2")
# install.packages("maps")
# install.packages("mapdata")
# install.packages("rgeos")
# install.packages("maptools")
# install.packages("mapproj")
# install.packages("PBSmapping")
# install.packages("data.table")

library(ggplot2)
library(maps)
library(mapdata)
library(rgeos)
library(maptools)
library(mapproj)
library(PBSmapping)
library(data.table)

xlim=c(-12,55); ylim=c(20,60)

worldmap=map_data("world")
setnames(worldmap,c("X","Y","PID","POS","region","subregion"))
worldmap=clipPolys(worldmap,xlim=xlim,ylim=ylim,keepExtra=TRUE)

# setwd("") # set your working folder here
dataFolder="" # ideally, full path to the folder
csvName=paste0(dataFolder,"pleiades-locations-20150316.csv")
locsRaw=read.csv(csvName,stringsAsFactors=F,header=T,sep=',')
# url: http://atlantides.org/downloads/pleiades/dumps/
# ---: download the latest csv, unzip 

periods=rbind(
  c("archaic","750-550BC"),
  c("classical","550-330BC"),
  c("hellenistic-republican","330-30BC"),
  c("roman","30BC-300CE"),
  c("late-antique","300-640CE")
  )

features=rbind(
  c("","locations"),
  c("settlement","settlements"),
  c("fort","forts"),
  c("temple","temples"),
  c("villa","villas"),
  c("station","stations"),
  c("theatre","theatres"),
  c("amphitheatre","amphitheatres"),
  c("church","churches"),
  c("bridge","bridges"),
  c("bath","baths"),
  c("cemetery","cemeteries"),
  c("plaza","plazas"),
  c("arch","archs")
)

land="grey"; water="grey80"; bgColor="grey80"
locPleiades=geom_point(data=locsRaw,color="grey70",alpha=.75,size=1,aes(y=reprLat,x=reprLong))

for (i in 1:nrow(features)) {
  locs=locsRaw[ with(locsRaw, grepl(features[i,1],featureType)),]
  for (ii in 1:nrow(periods)) {
    locPer=locs[ with(locs,grepl(periods[ii,1],timePeriodsKeys)),]
    locPer=geom_point(data=locPer,color="red",alpha=.75,size=1,aes(y=reprLat,x=reprLong))
    
    dataLabel="Data: Pleiades Project"
    fName=paste0(dataFolder,"Pleiades_",features[i,2],sprintf("%02d",ii),".png")
    header=paste0(features[i,2]," in the ",periods[ii,1]," period (",periods[ii,2],")")
    
    p=ggplot()+
      coord_map(xlim=xlim,ylim=ylim)+
      geom_polygon(data=worldmap,aes(X,Y,group=PID),size=0.1,colour=land,fill=water,alpha=1)+
      annotate("text",x=-11,y=21,hjust=0,label=dataLabel,size=3,color="grey40")+
      annotate("text",x=54,y=59,hjust=1,label=header,size=5,color="grey40")+ 
      locPleiades+ locPer+ labs(y="",x="")+theme_grey()
    
    ggsave(file=fName,plot=p,dpi=600,width=7,height=6)
  }
}
~~~

## Using Image Magick to animate maps
The fastest and easiest way to animate the results is to use [**ImageMagick**](http://www.imagemagick.org/), a free command-line utility. The following command will take all **.png** files whose names begin with **Pleiades\_Settle** and convert them into an animated GIF file **Pleiades\_Settlements.gif**, which will play continuously (`-loop 0`), with each frame downsized (`-resize 1200x900`) and paused for .75 of a second (`-delay 75`).

~~~
convert -resize 1200x900 -delay 75 -loop 0 Pleiades_Settle*.png Pleiades_Settlements.gif
~~~


## Chronological Cartograms


### All Locations

<figure class="fit">
	<a href="{{ site.url }}/images/pleiades/Pleiades_locations.gif" title="">
	<img src="{{ site.url }}/images/pleiades/Pleiades_locations.gif">
	</a>
</figure>

### Settlements

<figure class="fit">
	<a href="{{ site.url }}/images/pleiades/Pleiades_settlements.gif" title="">
	<img src="{{ site.url }}/images/pleiades/Pleiades_settlements.gif">
	</a>
</figure>


### Forts

<figure class="fit">
	<a href="{{ site.url }}/images/pleiades/Pleiades_forts.gif" title="">
	<img src="{{ site.url }}/images/pleiades/Pleiades_forts.gif">
	</a>
</figure>

### All categories

[Amphitheaters]({{ site.url }}/images/pleiades/Pleiades_amphitheatres.gif), 
[arches]({{ site.url }}/images/pleiades/Pleiades_archs.gif),
[baths]({{ site.url }}/images/pleiades/Pleiades_baths.gif), 
[bridges]({{ site.url }}/images/pleiades/Pleiades_bridges.gif), 
[cemeteries]({{ site.url }}/images/pleiades/Pleiades_cemeteries.gif), 
[churches]({{ site.url }}/images/pleiades/Pleiades_churches.gif), 
[forts]({{ site.url }}/images/pleiades/Pleiades_forts.gif), 
[locations]({{ site.url }}/images/pleiades/Pleiades_locations.gif), 
[plazas]({{ site.url }}/images/pleiades/Pleiades_plazas.gif), 
[settlements]({{ site.url }}/images/pleiades/Pleiades_settlements.gif), 
[stations]({{ site.url }}/images/pleiades/Pleiades_stations.gif), 
[temples]({{ site.url }}/images/pleiades/Pleiades_temples.gif), 
[theaters]({{ site.url }}/images/pleiades/Pleiades_theatres.gif), 
[villas]({{ site.url }}/images/pleiades/Pleiades_villas.gif).


## Footnotes

[^fn1]: al-Qādī, Wadād. “Population Census and Land Surveys under the Umayyads (41-132/661-750).” _Der Islam_ 83, no. 2 (2006), p. 341.
