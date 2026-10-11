(function(){var G=window.GIHI||{},R=document.documentElement,$=function(s){return document.querySelector(s)};
function say(m){G.toast&&G.toast(m)}
function cp(t,m){G.copy?G.copy(t,m):(navigator.clipboard&&navigator.clipboard.writeText(t).then(function(){say(m)}))}
var main=$('main.wiki-article');
if(main){var w=main.innerText.split(/\s+/).length,mins=Math.max(1,Math.round(w/230)),d=new Date(),yr=d.getFullYear(),T='Garifuna & Indigenous History Institute';
var bar=document.createElement('div');bar.className='art-tools';bar.innerHTML='<span>'+mins+' min read</span><button type="button" id="citeA">Cite (APA)</button><button type="button" id="citeM">Cite (MLA)</button><button type="button" id="linkA">Copy link</button>';main.insertBefore(bar,main.firstChild);
var url=function(){return location.href.split('#')[0]};
$('#citeA').onclick=function(){cp(T+'. ('+yr+'). Garifuna language and history. '+url(),'APA citation copied')};
$('#citeM').onclick=function(){cp(T+'. \u201cGarifuna Language and History.\u201d '+url()+'. Accessed '+d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+'.','MLA citation copied')};
$('#linkA').onclick=function(){cp(url(),'Link copied')};
main.querySelectorAll('h2[id],h3[id]').forEach(function(h){var b=document.createElement('button');b.type='button';b.className='permalink';b.setAttribute('aria-label','Copy link to this section');b.onclick=function(e){e.stopPropagation();cp(url()+'#'+h.id,'Section link copied')};h.appendChild(b)})}
var tt=document.createElement('button');tt.className='totop';tt.type='button';tt.textContent='\u2191';tt.setAttribute('aria-label','Back to top');tt.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(tt);
addEventListener('scroll',function(){tt.classList.toggle('show',scrollY>700)},{passive:true});
try{var s=localStorage.getItem('fontScale');if(s)R.style.setProperty('--scale',s);new MutationObserver(function(){localStorage.setItem('fontScale',R.style.getPropertyValue('--scale')||'1')}).observe(R,{attributes:true,attributeFilter:['style']})}catch(e){}
addEventListener('keydown',function(e){var t=e.target,typing=t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable);if(typing||e.ctrlKey||e.metaKey||e.altKey)return;
if(e.key==='/'){var i=[$('#hq'),$('#pageSearch')].filter(function(x){return x&&x.offsetParent})[0];if(i){e.preventDefault();i.focus()}}
else if(e.key==='d'){$('#themeToggle').click()}else if(e.key==='t'){window.scrollTo({top:0,behavior:'smooth'})}
else if(e.key==='?'){say('Shortcuts: / search \u00b7 d dark mode \u00b7 t top \u00b7 Esc close chat')}})})();