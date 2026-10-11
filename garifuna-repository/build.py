#!/usr/bin/env python3
"""Builds the GitHub Pages site from src/site.html. Run: python3 build.py"""
import re, os, shutil, datetime
TODAY=datetime.date.today().isoformat()
DOMAIN='https://www.garifunarepository.org'; NAME='Garifuna & Indigenous History Institute'
PAGES={'home':('Home','Research and education on Garifuna history, language and rights.'),
'article':('Garifuna: language and history','The full article on Garifuna history, language, society, military history, economy and diaspora, with references.'),
'timeline':('Timeline','A timeline of key events in Garifuna history, from Saint Vincent to the Central American coast.'),
'sources':('Sources','Searchable list of the books, papers, archival records and community sources behind the site.'),
'glossary':('Glossary','Definitions of Garifuna, Kalinago and historical terms used on the site.'),
'quiz':('Quiz','A short quiz on Garifuna history drawn from the article.'),
'about':('About','About the Institute, how to use the site, contact details, copyright and privacy.'),
'account':('Account','Browser-based account for saving sources and preferences. Prototype, not secure authentication.'),
'news':('News and events','News, events, notices and press releases.'),
'library':('Library','Catalogue of books, papers and archival records with citations in APA, MLA, Chicago, Harvard, BibTeX and RIS.'),
'tools':('Research tools','Time map, relationship graph, text comparison and transcription workbench.'),
'contribute':('Contribute','How approved contributors and elders add oral histories and diaspora updates.'),
'principles':('Research principles','How the Institute evaluates evidence, treats community knowledge and handles corrections.')}
src=open('src/site.html',encoding='utf8').read()
os.makedirs('assets/css',exist_ok=True); os.makedirs('assets/js',exist_ok=True)
# 1. shared CSS
css=re.findall(r'<style[^>]*>(.*?)</style>',src,re.S); open('assets/css/site.css','w',encoding='utf8').write('\n'.join(css))
n=[0]
def st(m):
    n[0]+=1; return '<link rel="stylesheet" href="/assets/css/site.css">' if n[0]==1 else ''
base=re.sub(r'<style[^>]*>.*?</style>',st,src,flags=re.S)
# 2. shared JS (keep the tiny theme script and JSON-LD inline)
js=[0]
def sc(m):
    a,b=m.group(1),m.group(2)
    if 'ld+json' in a or len(b)<300: return m.group(0)
    js[0]+=1; fn='app-%d.js'%js[0]; open('assets/js/'+fn,'w',encoding='utf8').write(b); return '<script src="/assets/js/%s"></script>'%fn
base=re.sub(r'<script([^>]*)>(.*?)</script>',sc,base,flags=re.S)
for fn in os.listdir('assets/js'):
    t=open('assets/js/'+fn,encoding='utf8').read()
    t=t.replace("register('sw.js')","register('/sw.js')").replace("fetch('archive/index.json')","fetch('/archive/index.json')").replace("fetch('archive/'+","fetch('/archive/'+")
    open('assets/js/'+fn,'w',encoding='utf8').write(t)
base=base.replace('href="manifest.webmanifest"','href="/manifest.webmanifest"')
# 3. one real page per route
def page(r):
    t,d=PAGES[r]; title=NAME if r=='home' else '%s | %s'%(t,NAME); url=DOMAIN+('/' if r=='home' else '/%s/'%r); h=base
    h=re.sub(r'<title>.*?</title>','<title>%s</title>'%title.replace('&','&amp;'),h,count=1,flags=re.S)
    h=re.sub(r'(<meta name="description" content=")[^"]*','\\g<1>'+d,h,count=1)
    h=re.sub(r'(<link rel="canonical" href=")[^"]*','\\g<1>'+url,h,count=1)
    h=re.sub(r'(<meta property="og:url" content=")[^"]*','\\g<1>'+url,h,count=1)
    h=re.sub(r'(<meta property="og:title" content=")[^"]*','\\g<1>'+title.replace('&','&amp;'),h,count=1)
    h=h.replace('<body','<body data-route="%s"'%r,1)
    if r!='home':
        boot='<script>if(!location.hash||location.hash==="#")history.replaceState(null,"",location.pathname+location.search+"#/%s")</script>\n'%r
        h=h.replace('<script src="/assets/js/app-1.js">',boot+'<script src="/assets/js/app-1.js">',1)
        h=h.replace('</body>','<script>addEventListener("load",function(){setTimeout(function(){if(location.hash==="#/%s")history.replaceState(null,"",location.pathname)},600)})</script>\n</body>'%r,1)
    p='index.html' if r=='home' else r+'/index.html'; os.makedirs(os.path.dirname(p) or '.',exist_ok=True); open(p,'w',encoding='utf8').write(h); return p
files=[page(r) for r in PAGES]
# 4. 404, PWA, SEO and GitHub Pages files
links=''.join('<li><a href="%s">%s</a></li>'%('/' if r=='home' else '/%s/'%r,PAGES[r][0]) for r in PAGES)
open('404.html','w',encoding='utf8').write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | %s</title><link rel="stylesheet" href="/assets/css/site.css"></head><body style="max-width:640px;margin:10vh auto;padding:0 16px;font-family:Georgia,serif"><h1>Page not found</h1><p>That page does not exist. Try one of these:</p><ul>%s</ul></body></html>'%(NAME,links))
open('CNAME','w').write('www.garifunarepository.org\n'); open('.nojekyll','w').write('')
open('robots.txt','w').write('User-agent: *\nAllow: /\nSitemap: %s/sitemap.xml\n'%DOMAIN)
open('sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('<url><loc>%s%s</loc><lastmod>%s</lastmod></url>\n'%(DOMAIN,'/' if r=='home' else '/%s/'%r,TODAY) for r in PAGES)+'</urlset>\n')
open('manifest.webmanifest','w').write('{"name":"%s","short_name":"Garifuna Repository","start_url":"/","scope":"/","display":"standalone","background_color":"#ffffff","theme_color":"#1d4a4a","icons":[{"src":"/assets/icon.svg","sizes":"any","type":"image/svg+xml","purpose":"any"}]}\n'%NAME.replace('&','\\u0026'))
open('assets/icon.svg','w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#1d4a4a"/><rect x="6" y="9" width="20" height="5" fill="#FFD400"/><rect x="6" y="14" width="20" height="4" fill="#fff"/><rect x="6" y="18" width="20" height="5" fill="#1a1a1a"/></svg>\n')
os.makedirs('archive',exist_ok=True)
if not os.path.exists('archive/index.json'): open('archive/index.json','w').write('[]\n')
open('archive/_template.md','w',encoding='utf8').write('---\ntitle: Title of the entry\ntype: Oral history\ndate: 2026-01-01\nauthor: Name or "Anonymous"\ntags: example\n---\nWrite the text in Markdown. Add a footnote like this.[^1]\n\n[^1]: Who said it, where and when, and the consent given.\n')
core=['/']+['/%s/'%r for r in PAGES if r!='home']+['/assets/css/site.css','/manifest.webmanifest','/assets/icon.svg']+['/assets/js/'+f for f in sorted(os.listdir('assets/js'))]
open('sw.js','w').write("const V='gr-%s',CORE=%s;\nself.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.match(e.request).then(m=>{const n=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>m||caches.match('/'));return m||n}))});\n"%(os.popen('date +%Y%m%d%H%M').read().strip(),core))
print('built',len(files),'pages,',js[0],'scripts')
