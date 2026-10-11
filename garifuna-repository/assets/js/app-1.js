
(function(){
"use strict";

/* ---------- THEME ---------- */
var root = document.documentElement;
var themeBtn = document.getElementById('themeToggle');
var themeIcon = document.getElementById('themeIcon');
var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
var saved = null; try{ saved = localStorage.getItem('theme'); }catch(e){}
var darkMode = saved ? saved==='dark' : !!(mq && mq.matches);
var tcMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(){
  root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  if(tcMeta) tcMeta.setAttribute('content', darkMode ? '#0c211f' : '#1d4a4a');
  if(themeBtn){ themeBtn.setAttribute('aria-pressed', darkMode); themeBtn.title = darkMode ? 'Switch to light mode' : 'Switch to dark mode'; themeBtn.setAttribute('aria-label', themeBtn.title); }
  themeIcon.innerHTML = darkMode
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="none"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
}
if(themeBtn){ themeBtn.addEventListener('click', function(){ darkMode = !darkMode; try{ localStorage.setItem('theme', darkMode?'dark':'light'); }catch(e){} applyTheme(); }); }
if(mq && mq.addEventListener) mq.addEventListener('change', function(e){ var s=null; try{ s=localStorage.getItem('theme'); }catch(x){} if(!s){ darkMode=e.matches; applyTheme(); } });
applyTheme();

/* ---------- FONT SIZE ---------- */
var scale = 1; var scales=[0.9,1,1.1,1.2,1.3];
function setScale(s){ scale = s; root.style.setProperty('--scale', s); }
var fUp = document.getElementById('fontUp'), fDown = document.getElementById('fontDown');
if(fUp) fUp.addEventListener('click', function(){ var i=scales.indexOf(scale); if(i<scales.length-1) setScale(scales[i+1]); });
if(fDown) fDown.addEventListener('click', function(){ var i=scales.indexOf(scale); if(i>0) setScale(scales[i-1]); });

/* ---------- PRINT / SHARE ---------- */
var printBtn = document.getElementById('printBtn');
if(printBtn) printBtn.addEventListener('click', function(){ window.print(); });
var toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(function(){ toast.classList.remove('show'); }, 2200);
}
var shareBtn = document.getElementById('shareBtn');
if(shareBtn) shareBtn.addEventListener('click', function(){
  try{
    if(navigator.share){ navigator.share({title:document.title, url:location.href}); return; }
    navigator.clipboard.writeText(location.href).then(function(){ showToast('Link copied to clipboard'); })
      .catch(function(){ showToast('Copy not available in this context'); });
  }catch(e){ showToast('Copy not available in this context'); }
});

/* ---------- READING PROGRESS + BACK TO TOP RING ---------- */
var progressBar = document.getElementById('readProgress');
var backTop = document.getElementById('backToTop');
var ring = document.getElementById('progressRing');
var RING_LEN = 144.5;
function onScroll(){
  var h = document.documentElement;
  var scrollTop = h.scrollTop || document.body.scrollTop;
  var max = h.scrollHeight - h.clientHeight;
  var pct = max > 0 ? (scrollTop / max) * 100 : 0;
  progressBar.style.width = pct + '%';
  ring.style.strokeDashoffset = RING_LEN - (RING_LEN * pct/100);
  if(scrollTop > 500){ backTop.classList.add('show'); } else { backTop.classList.remove('show'); }
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();
backTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

/* ---------- TOC SCROLL SPY + SMOOTH SCROLL ---------- */
var headings = document.querySelectorAll('#article-top h2[id], #article-top h3[id]');
var tocLinks = document.querySelectorAll('.toc-link');
var spyObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var id = entry.target.id;
      tocLinks.forEach(function(l){ l.classList.remove('active'); });
      var active = document.querySelector('.toc-link[href="#'+id+'"]');
      if(active) active.classList.add('active');
    }
  });
}, {rootMargin:'-15% 0px -75% 0px', threshold:0});
headings.forEach(function(h){ spyObserver.observe(h); });

function scrollToId(id){
  var target = document.getElementById(id);
  if(!target) return;
  var top = target.getBoundingClientRect().top + window.scrollY - 66;
  window.scrollTo({top:top, behavior:'smooth'});
}
tocLinks.forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    scrollToId(link.getAttribute('href').slice(1));
  });
});
document.querySelectorAll('.timeline-node, .tab[href^="#"]').forEach(function(el){
  el.addEventListener('click', function(e){
    var id = el.getAttribute('data-target') || (el.getAttribute('href')||'').slice(1);
    if(id){ e.preventDefault(); scrollToId(id); }
  });
});

/* ---------- SCROLL REVEAL ---------- */
var revealObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });

/* ---------- MAP ANIMATION ---------- */
var mapWrap = document.getElementById('mapWrap');
if(mapWrap){
  var mapObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ mapWrap.classList.add('animate'); mapObs.unobserve(mapWrap); }
    });
  }, {threshold:0.3});
  mapObs.observe(mapWrap);
}

/* ---------- FLOATING TOOLTIP (glossary + map) ---------- */
var floatTip = document.getElementById('floatTip');
var glossary = {
  buiyes:"Buyein (singular Buyei): spiritual, medical, and historical specialists; the closest Garifuna institutional equivalent to natural philosophers.",
  dori:"Dori: a dugout canoe, the foundational Garifuna vessel inherited from Kalinago/Arawakan boat-building tradition.",
  pipante:"Pipante: a larger, ocean-going canoe variant capable of carrying cargo and crews of six or more.",
  dugu:"Dügü: the central Garifuna mortuary ceremony summoning and honouring ancestral spirits over several days.",
  gubida:"Gubida: ancestral spirits summoned and propitiated during the Dügü ceremony.",
  youloumain:"Youloumain: the paramount Garifuna-Kalinago chiefdom on Saint Vincent, led by Chatoyer.",
  caribania:"Caribania: the Central American Garifuna confederacy of chiefdoms and captaincies that succeeded Youloumain.",
  morenos:"Morenos: the Spanish colonial legal classification for the Garifuna, distinct from the status of enslaved persons.",
  poito:"Poito: the Garifuna kinship-assimilation system through which outsiders could be formally incorporated into the clan."
};
function positionTip(tip, x, y){
  var vw = window.innerWidth, vh = window.innerHeight;
  var tw = 260, th = 90;
  var left = x + 14, top = y + 14;
  if(left + tw > vw - 10) left = x - tw - 14;
  if(top + th > vh - 10) top = y - th - 14;
  tip.style.left = Math.max(8,left) + 'px';
  tip.style.top = Math.max(8,top) + 'px';
}
document.querySelectorAll('.gloss').forEach(function(el){
  el.setAttribute('tabindex','0');
  function open(e){
    var term = el.getAttribute('data-term');
    var txt = glossary[term] || '';
    floatTip.innerHTML = txt;
    floatTip.classList.add('show');
    var r = el.getBoundingClientRect();
    positionTip(floatTip, r.left, r.bottom);
  }
  function close(){ floatTip.classList.remove('show'); }
  el.addEventListener('mouseenter', open);
  el.addEventListener('mouseleave', close);
  el.addEventListener('focus', open);
  el.addEventListener('blur', close);
  el.addEventListener('click', function(e){ e.preventDefault(); open(e); setTimeout(close, 3500); });
});

/* ---------- MAP TOOLTIPS ---------- */
document.querySelectorAll('.map-dot').forEach(function(dot){
  function open(e){
    var name = dot.getAttribute('data-name');
    var info = dot.getAttribute('data-info');
    var target = dot.getAttribute('data-target');
    floatTip.innerHTML = '<strong>'+name+'</strong><br>'+info+(target?'<br><a href="#'+target+'" id="mapTipLink">Read more →</a>':'');
    floatTip.classList.add('show');
    var evt = e.touches ? e.touches[0] : e;
    positionTip(floatTip, evt.clientX, evt.clientY);
    var lnk = document.getElementById('mapTipLink');
    if(lnk) lnk.addEventListener('click', function(ev){ ev.preventDefault(); scrollToId(target); floatTip.classList.remove('show'); });
  }
  dot.addEventListener('mousemove', open);
  dot.addEventListener('mouseenter', open);
  dot.addEventListener('mouseleave', function(){ floatTip.classList.remove('show'); });
  dot.addEventListener('click', function(e){
    var target = dot.getAttribute('data-target');
    if(target) scrollToId(target);
  });
});

/* ---------- FOOTNOTE POPOVERS ---------- */
var fnPop = document.getElementById('fnPop');
var refListMain = document.getElementById('refListMain');
var refsExtra = document.getElementById('refsExtra');
function getRefText(n){
  var allRefs = [];
  refListMain.querySelectorAll('li').forEach(function(li){ allRefs.push(li.innerHTML); });
  refsExtra.querySelectorAll('li').forEach(function(li){ allRefs.push(li.innerHTML); });
  return allRefs[n-1] || 'Reference not found.';
}
document.querySelectorAll('sup.ref').forEach(function(sup){
  sup.setAttribute('tabindex','0');
  sup.addEventListener('click', function(e){
    e.stopPropagation();
    var m = sup.textContent.match(/\d+/);
    var n = m ? m[0] : '?';
    fnPop.innerHTML = '<span class="fn-num">['+n+']</span>' + getRefText(n) + '<br><a href="#references" id="fnJump">↓ View in reference list</a> <button class="chip" id="fnCopy" type="button">Copy citation</button>';var cb=document.getElementById('fnCopy');if(cb)cb.addEventListener('click',function(ev){ev.stopPropagation();var t=getRefText(n).replace(/<[^>]+>/g,'');window.GIHI&&GIHI.copy(t,'Citation copied')});
    fnPop.classList.add('show');
    var r = sup.getBoundingClientRect();
    positionTip(fnPop, r.left, r.bottom);
    var jump = document.getElementById('fnJump');
    if(jump) jump.addEventListener('click', function(ev){ ev.preventDefault(); refsExtra.classList.add('open'); if(refsToggle) refsToggle.textContent='Show fewer references ▴'; scrollToId('references'); fnPop.classList.remove('show'); });
  });
});
document.addEventListener('click', function(e){
  if(!e.target.closest('sup.ref') && !e.target.closest('.fn-pop')) fnPop.classList.remove('show');
  if(!e.target.closest('.gloss')) floatTip.classList.remove('show');
});
document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ fnPop.classList.remove('show'); floatTip.classList.remove('show'); } });

/* ---------- COLLAPSIBLE REFERENCES ---------- */
var refsToggle = document.getElementById('refsToggle');
refsToggle.addEventListener('click', function(){
  var open = refsExtra.classList.toggle('open');
  refsToggle.textContent = open ? 'Show fewer references ▴' : 'Show all 69 references ▾';
});

/* ---------- MILITARY TABLE: FILTER + DONUT ---------- */
var milRows = document.querySelectorAll('#militaryTable tbody tr');
var counts = {win:0, loss:0, neg:0};
milRows.forEach(function(r){ var o = r.getAttribute('data-outcome'); if(counts[o]!==undefined) counts[o]++; });
var total = counts.win + counts.loss + counts.neg;
var pWin = total? (counts.win/total*100):0, pLoss = total?(counts.loss/total*100):0, pNeg = total?(counts.neg/total*100):0;
var donut = document.getElementById('militaryDonut');
var donutPct = document.getElementById('donutPct');
var donutLegend = document.getElementById('donutLegend');
setTimeout(function(){
  donut.style.background = 'conic-gradient(var(--win) 0deg '+(pWin*3.6)+'deg, var(--loss) '+(pWin*3.6)+'deg '+((pWin+pLoss)*3.6)+'deg, var(--neg) '+((pWin+pLoss)*3.6)+'deg 360deg)';
}, 150);
donutPct.textContent = Math.round(pWin)+'%';
donutLegend.innerHTML =
  '<span><i style="background:var(--win)"></i>'+counts.win+' Victories ('+Math.round(pWin)+'%)</span>'+
  '<span><i style="background:var(--loss)"></i>'+counts.loss+' Defeats ('+Math.round(pLoss)+'%)</span>'+
  '<span><i style="background:var(--neg)"></i>'+counts.neg+' Diplomatic / mixed ('+Math.round(pNeg)+'%)</span>'+
  '<span style="color:var(--text-light)">of '+total+' listed engagements</span>';

document.querySelectorAll('.filter-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.getAttribute('data-filter');
    milRows.forEach(function(r){
      var o = r.getAttribute('data-outcome');
      r.classList.toggle('hide-row', f!=='all' && f!==o);
    });
  });
});

/* ---------- ECONOMY BAR CHART ---------- */
var econData = [
  {label:'Pre-1797 (autonomous)', level:70},
  {label:'1797–1850 (militia pay)', level:55},
  {label:'1850–1900 (maritime wages)', level:60},
  {label:'1900–1940 (banana boom)', level:95},
  {label:'1940–1980 (remittances)', level:65},
  {label:'1980–present (recovery)', level:50}
];
var econChart = document.getElementById('econChart');
econData.forEach(function(d, i){
  var row = document.createElement('div');
  row.className = 'econ-row';
  row.innerHTML = '<div class="per">'+d.label+'</div><div class="econ-bar-track"><div class="econ-bar-fill" data-w="'+d.level+'"></div></div>';
  econChart.appendChild(row);
});
var econObs = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.econ-bar-fill').forEach(function(bar, i){
        setTimeout(function(){ bar.style.width = bar.getAttribute('data-w')+'%'; }, i*90);
      });
      econObs.unobserve(entry.target);
    }
  });
}, {threshold:0.2});
econObs.observe(econChart);

/* ---------- DID YOU KNOW TICKER ---------- */
var facts = [
  "…the Garifuna held a formally recognised \u201cneutral\u201d island under a 1660 treaty, a level of diplomatic recognition almost no other indigenous Caribbean people achieved?",
  "…Garifuna raiding canoes crossed over 250 miles of open Atlantic water round-trip to liberate enslaved workers on Saint Kitts?",
  "…the Garifuna language is Arawakan in structure, not a creole, and was fully formed before the first Africans arrived on Saint Vincent?",
  "…a Garifuna general, known as Walumugu (Juan Francisco Bulnes), delivered a decisive blow that helped secure Central American independence in 1819?",
  "…a small Garifuna community formed in Chetumal, Mexico, during the 1920s–40s rum and chicle boom?",
  "…the Garifuna flag's yellow, white, and black stripes have no fixed single official meaning, but are read variously as land, peace, and African ancestry?"
];
var dykText = document.getElementById('dykText');
var dykDots = document.getElementById('dykDots');
var dykIdx = 0, dykTimer;
facts.forEach(function(_, i){ var d=document.createElement('span'); if(i===0) d.className='on'; dykDots.appendChild(d); });
function showFact(i){
  dykIdx = (i+facts.length)%facts.length;
  dykText.textContent = facts[dykIdx];
  dykDots.querySelectorAll('span').forEach(function(d,j){ d.classList.toggle('on', j===dykIdx); });
}
function nextFact(){ showFact(dykIdx+1); }
showFact(0);
dykTimer = setInterval(nextFact, 6500);
document.getElementById('dykNext').addEventListener('click', function(){ nextFact(); clearInterval(dykTimer); dykTimer=setInterval(nextFact,6500); });
document.getElementById('dykPrev').addEventListener('click', function(){ showFact(dykIdx-1); clearInterval(dykTimer); dykTimer=setInterval(nextFact,6500); });
document.querySelector('.dyk').addEventListener('mouseenter', function(){ clearInterval(dykTimer); });
document.querySelector('.dyk').addEventListener('mouseleave', function(){ dykTimer=setInterval(nextFact,6500); });

/* ---------- SEARCH IN PAGE ---------- */
var searchInput = document.getElementById('pageSearch');
var searchNavBtns = document.getElementById('searchNavBtns');
var searchCount = document.getElementById('searchCount');
var article = document.querySelector('.wiki-article');
var hits = []; var hitIdx = -1;

function clearHits(){
  document.querySelectorAll('mark.search-hit').forEach(function(m){
    var parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });
  hits = []; hitIdx = -1;
  searchNavBtns.classList.remove('show');
}
function doSearch(query){
  clearHits();
  query = query.trim();
  if(query.length < 2) return;
  var re = new RegExp(/^buyeins?$/i.test(query.trim())?'buyei(?:n)?':query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
  var walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node){
      if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p = node.parentNode;
      if(p && (p.tagName==='SCRIPT' || p.tagName==='STYLE' || p.tagName==='MARK')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var nodes = [];
  var n;
  while((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(function(node){
    var text = node.nodeValue;
    if(!re.test(text)) { re.lastIndex = 0; return; }
    re.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0, m;
    while((m = re.exec(text))){
      frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = m[0];
      frag.appendChild(mark);
      last = m.index + m[0].length;
      if(re.lastIndex === m.index) re.lastIndex++;
    }
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
  hits = Array.prototype.slice.call(document.querySelectorAll('mark.search-hit'));
  if(hits.length){
    searchNavBtns.classList.add('show');
    goToHit(0);
  } else {
    searchCount.textContent = '0/0';
    searchNavBtns.classList.add('show');
  }
}
function goToHit(i){
  if(!hits.length) return;
  if(hitIdx>=0 && hits[hitIdx]) hits[hitIdx].classList.remove('current');
  hitIdx = (i+hits.length)%hits.length;
  hits[hitIdx].classList.add('current');
  hits[hitIdx].scrollIntoView({behavior:'smooth', block:'center'});
  searchCount.textContent = (hitIdx+1)+'/'+hits.length;
}
if(searchInput){
  searchInput.addEventListener('keydown', function(e){
    if(e.key==='Enter'){ e.preventDefault(); doSearch(searchInput.value); }
    if(e.key==='Escape'){ clearHits(); searchInput.value=''; searchInput.blur(); }
  });
}
document.getElementById('searchNext').addEventListener('click', function(){ goToHit(hitIdx+1); });
document.getElementById('searchPrev').addEventListener('click', function(){ goToHit(hitIdx-1); });
document.getElementById('searchClear').addEventListener('click', function(){ clearHits(); searchInput.value=''; });

})();
