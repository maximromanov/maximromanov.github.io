from playwright.sync_api import sync_playwright
import json, sys
OUT='final/'
NG='https://maximromanov.github.io/ngramreader/'; CL='https://maximromanov.github.io/classifier/'
SHOTS=[('1-ngramreader-over-time',NG+'?tour=tasaltana&stop=4','chart'),
       ('2-ngramreader-authors',NG+'?tour=tasaltana&stop=7','rows8'),
       ('3-ngramreader-book-types-compared',NG+'?tour=tasaltana&stop=8','chart-fold'),
       ('4-classifier-through-the-text',CL+'?tour=talbis&stop=4','chart'),
       ('5-classifier-overview',CL+'?tour=talbis&stop=2','chart')]
MEASURE="""(mode)=>{
 const vis=e=>{const r=e.getBoundingClientRect();return r.height>0&&r.width>0};
 const Y=e=>e.getBoundingClientRect().bottom+window.scrollY;
 if(mode==='rows8'){const rows=[...document.querySelectorAll('table tbody tr')].filter(vis);return {bottom:Y(rows[Math.min(7,rows.length-1)]),n:rows.length,first:rows[0].innerText.slice(0,120)};}
 const all=[...document.querySelectorAll('main *, body *')].filter(vis);
 const cite=all.filter(e=>/Cite as/.test(e.textContent||'') && ![...e.children].some(c=>/Cite as/.test(c.textContent||'')));
 cite.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
 // walk up to the chart container (svg-container / plotly div)
 let c=cite[0]; let box=c; while(box && !/svg-container|js-plotly-plot/.test(String(box.className&&box.className.baseVal!==undefined?box.className.baseVal:box.className))) box=box.parentElement;
 const el=box||c;
 return {bottom:Math.max(Y(el),Y(c)),tag:c.tagName,boxcls:el?String(el.className):'', text:(c.textContent||'').slice(0,80)};
}"""
CHECK="""()=>{const card=document.querySelector('#tour-card');const vis=e=>e&&e.getBoundingClientRect().height>0&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden';
 const loading=[...document.querySelectorAll('body *')].filter(e=>vis(e)&&e.children.length===0&&/^\\s*(Loading|loading|Searching)/.test(e.textContent||'')).map(e=>e.textContent.slice(0,40));
 return {card:vis(card), loading, active:document.activeElement?document.activeElement.tagName:'', body:document.body.className, scrollY:window.scrollY};}"""
def ready(pg):
    pg.wait_for_load_state('networkidle'); pg.evaluate('document.fonts.ready')
    pg.wait_for_function("document.querySelector('.main-svg') || document.querySelector('table tbody tr')", timeout=30000)
    pg.wait_for_timeout(1500); pg.wait_for_load_state('networkidle')
log={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,url,mode in SHOTS:
        ctx=b.new_context(viewport={'width':1440,'height':2200},device_scale_factor=2,color_scheme='light'); pg=ctx.new_page()
        pg.goto(url, wait_until='networkidle'); ready(pg)
        pg.keyboard.press('Escape'); pg.wait_for_timeout(700)
        if mode=='chart-fold':
            pg.evaluate("document.querySelectorAll('details.how').forEach(d=>d.open=false)"); pg.wait_for_timeout(900)
        pg.evaluate("window.scrollTo(0,0); document.activeElement && document.activeElement.blur && document.activeElement.blur()")
        pg.wait_for_timeout(900); pg.wait_for_load_state('networkidle')
        m=pg.evaluate(MEASURE, 'rows8' if mode=='rows8' else 'chart'); chk=pg.evaluate(CHECK)
        h=int(m['bottom'])+(10 if mode=='rows8' else 12)
        pg.screenshot(path=OUT+name+'.png', clip={'x':0,'y':0,'width':1440,'height':h}, type='png')
        log[name]={'url':url,'clip_h_css':h,**m,**chk}; ctx.close()
    # phones
    dev=dict(p.devices['iPhone 15']); dpr=dev['device_scale_factor']; vw=dev['viewport']['width']; vh=dev['viewport']['height']
    phones=[]
    for nm,url,scheme in (('phone-ng',NG+'?tour=tasaltana&stop=4','light'),('phone-cl',CL+'?tour=talbis&stop=2','dark')):
        ctx=b.new_context(**dev, color_scheme=scheme); pg=ctx.new_page()
        pg.goto(url, wait_until='networkidle'); ready(pg); pg.keyboard.press('Escape'); pg.wait_for_timeout(700)
        pg.evaluate("window.scrollTo(0,0); document.activeElement && document.activeElement.blur && document.activeElement.blur()"); pg.wait_for_timeout(900)
        pg.screenshot(path=OUT+nm+'.png', type='png')
        pg.screenshot(path=OUT+nm+'-full.png', full_page=True, type='png')
        lab=pg.evaluate("""()=>{const out=[];document.querySelectorAll('svg text').forEach(t=>{const r=t.getBoundingClientRect(); if(/^\\[[A-Z]{3}\\]/.test(t.textContent)&&r.width) out.push([t.textContent.slice(0,40),Math.round(r.left)])});return out}""")
        log[nm]={'url':url,'scheme':scheme,'dpr':dpr,'viewport':[vw,vh],'labels_left_px':lab,**pg.evaluate(CHECK)}; ctx.close()
    b.close()
json.dump(log,open(OUT+'log.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(log,ensure_ascii=False,indent=1))
