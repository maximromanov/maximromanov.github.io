---
header:
  image: /images/covers/13186u_a.jpg
  caption: "**Photo credit**: Iraq, Baghdad & mosque. *Library of Congress*, [LC-DIG-matpc-13186](http://hdl.loc.gov/loc.pnp/matpc.13186)"
title: Python Functions for Arabic
author_profile:   true
layout:   single
categories:
  - Coding
tags:
  - Blogpost
  - Arabic
  - Python
---
There are certain operations one has to repeat many times while manipulating Arabic text. For a number of purposes Arabic text must be normalized, namely &#8220;noise&#8221; characters deleted, the orthography of problematic letters unified, etc. Sometimes it is necessary to deNormalize search words, i.e. modify regular expressions in such a way that orthographic possibilities are considered to the maximum degree. Some software does not work with Arabic characters, so it makes sense to transliterate Arabic text and work with English characters instead. Below are some functions that perform such operations.


## Transliteration

Some programs do not support Arabic, but might be crucial for research (for example, R). This function converts Arabic into a transliterated form that any program can process.

~~~ python
  def translitArabic(text):
    buckwalterMod = {
        'ء': 'c', 'ا': 'A', 'إ': 'A',
        'أ': 'A', 'آ': 'A', 'ب': 'b',
        'ة': 'o', 'ت': 't', 'ث': 'v',
        'ج': 'j', 'ح': 'H', 'خ': 'x',
        'د': 'd', 'ذ': 'V', 'ر': 'r',
        'ز': 'z', 'س': 's', 'ش': 'E',
        'ص': 'S', 'ض': 'D', 'ط': 'T',
        'ظ': 'Z', 'ع': 'C', 'غ': 'g',
        'ف': 'f', 'ق': 'q', 'ك': 'k',
        'ل': 'l', 'م': 'm', 'ن': 'n',
        'ه': 'h', 'ؤ': 'c', 'و': 'w',
        'ى': 'y', 'ئ': 'c', 'ي': 'y',
        }
    for k, v in buckwalterMod.items():
        text = re.sub(k, v, text)
    return(text)
~~~

### Example:

Input:

~~~ python
testLine = "إن القراء يقرؤون القرآن قراءة جميلة"
print(translitArabic(testLine))
~~~

Output:

~~~
An AlqrAc yqrcwn AlqrAn qrAco jmylo
~~~

## Normalization  
The function unifies the orthography of <em>alif</em>s, <em>hamza</em>s, and <em>ya</em>s/<em>alif maqsura</em>s. This is just a basic function that might need to be modified and expanded for specific purposes.

~~~ python
def normalizeArabic(text):
    text = re.sub("[إأٱآا]", "ا", text)
    text = re.sub("ى", "ي", text)
    text = re.sub("ؤ", "ء", text)
    text = re.sub("ئ", "ء", text)
    return(text)
~~~

### Example:  
Input:

~~~ python
testLine = "إن القراء يقرؤون القرآن قراءة جميلة"
print(normalizeArabic(testLine))
~~~

Output:

~~~
ان القراء يقرءون القران قراءة جميلة
~~~

## deNormalization  
This function converts search words into a regular expression that considers most common spelling variations/typos (for example القران and القرآن). Modifications of *ta marbuta* and <em>hamza</em>s might require modifications, depending on research purposes.

~~~ python
def deNormalize(text):
    alifs           = '[إأٱآا]'
    alifReg         = '[إأٱآا]'
    # -------------------------------------
    alifMaqsura     = '[يى]'
    alifMaqsuraReg  = '[يى]'
    # -------------------------------------
    taMarbutas      = 'ة'
    taMarbutasReg   = '[هة]'
    # -------------------------------------
    hamzas          = '[ؤئء]'
    hamzasReg       = '[ؤئءوي]'
    # Applying deNormalization
    text = re.sub(alifs, alifReg, text)
    text = re.sub(alifMaqsura, alifMaqsuraReg, text)
    text = re.sub(taMarbutas, taMarbutasReg, text)
    text = re.sub(hamzas, hamzasReg, text)
    return text
~~~

### Example:
Input:

~~~ python
testLine = "إن القراء يقرؤون القرآن قراءة جميلة"
print(deNormalize(testLine))
~~~

Output:

~~~
[إأٱآا]ن [إأٱآا]لقر[إأٱآا][ؤئءوي] [يى]قر[ؤئءوي]ون [إأٱآا]لقر[إأٱآا]ن قر[إأٱآا][ؤئءوي][هة] جم[يى]ل[هة]
~~~

## Noise Removal
This function removes short vowels and other symbols (<em>harakat</em>) that interfere with computational manipulations with Arabic texts.

~~~ python
def deNoise(text):
    noise = re.compile(""" ّ    | # Tashdid
                             َ    | # Fatha
                             ً    | # Tanwin Fath
                             ُ    | # Damma
                             ٌ    | # Tanwin Damm
                             ِ    | # Kasra
                             ٍ    | # Tanwin Kasr
                             ْ    | # Sukun
                             ـ     # Tatwil/Kashida
                         """, re.VERBOSE)
    text = re.sub(noise, '', text)
    return text
~~~

### Example

Input:

~~~ python
testLine = "إِنَّ الْقُرَّاْءَ يَقْرَؤُوْنَ الْقُرْآنَ قِرَاْءَةً جَمِيْلَــــــةً"
print(deNoise(testLine))
~~~

Output:

~~~ 
إن القراء يقرؤون القرآن قراءة جميلة
~~~