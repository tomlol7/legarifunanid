(function(){"use strict";
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var R=['home','article','timeline','sources','glossary','quiz','about','account','news','library','tools','contribute','principles'],N={home:'Home',article:'Article',timeline:'Timeline',sources:'Sources',glossary:'Glossary',quiz:'Quiz',about:'About',account:'Account',news:'News & events',library:'Library',tools:'Tools',contribute:'Contribute',principles:'Research principles'},cur='home',shown=false,sq='',sc='all',fl=[];
var CATS={all:'All',B:'Books',P:'Papers',L:'Linguistics',A:'Archives',C:'Legal and community'};
var SRC=`B|Gonzalez, Nancie L.|Sojourners of the Caribbean: Ethnogenesis and Ethnohistory of the Garifuna|University of Illinois Press, 1988||Internet Archive=https://archive.org/details/sojournersofcari0000gonz
B|Taylor, Christopher|The Black Carib Wars: Freedom, Survival, and the Making of the Garifuna|University Press of Mississippi / Signal Books, 2012||Project MUSE=https://muse.jhu.edu/book/26283;Oxford Academic=https://academic.oup.com/mississippi-scholarship-online/book/29379;Open review=https://escholarship.org/uc/item/1c76x719
B|Young, Sir William|An Account of the Black Charaibs in the Island of St. Vincent's|1795; various reprints||Routledge=https://www.routledge.com/Account-of-the-Black-Charaibs-in-the-Island-of-St-Vincents/Young/p/book/9781138965744
B|Johnson, Paul Christopher|Diaspora Conversions: Black Carib Religion and the Recovery of Africa|University of California Press, 2007||
B|Gullick, C.J.M.R.|Exiled from St. Vincent: The Development of Black Carib Culture in Central America up to 1945|Progress Press, 1976|Also by Gullick: Myths of a Minority: The Changing Traditions of the Vincentian Caribs.|
B|Wells, Marilyn McKillop|Among the Garifuna: Family Tales and Ethnography from the Caribbean Coast|University of Alabama Press, 2015||
B|Prescod, Paula (ed.)|The Carib, Kalinago, and Garifuna Peoples: Indigeneity, Hybridization, and Mobility in the Americas|University of Illinois Press, 2026||
B|Forte, Maximilian C. (ed.)|Indigenous Resurgence in the Contemporary Caribbean: Amerindian Survival and Revival|||
B|Cayetano, Sebastian R. and Fabian Cayetano|Garifuna History, Language and Culture|||
B|Crawford, Michael H. (ed.)|Black Caribs: A Case Study in Biocultural Adaptation|Current Developments in Anthropological Genetics, Vol. 3||
B|Taylor, Douglas|The Black Carib of British Honduras|Wenner-Gren Foundation for Anthropological Research, New York, 1951|Standard ethnography based on fieldwork in 1947–1948.|
B|Kirby, I. A.|History of the Black Caribs|Local synthesis|A local-history synthesis available as a PDF.|PDF=https://www.belize-glessimaresearch.org/wp-content/uploads/bsk-pdf-manager/2020/01/History-of-the-Black-Caribs-by-Kirby-1.pdf
B|Young, Thomas|Narrative of a Residence on the Mosquito Shore, During the Years 1839, 1840, and 1841; With an Account of Truxillo…|London, 1842|Key source for early Central American phenotype and ethnographic notes. Editions are available through the Internet Archive and The Online Books Page.|
B|Du Tertre, Jean-Baptiste|Histoire générale des Antilles habitées par les François|Paris, 1667–1671|Reports Carib raids that carried off hundreds of enslaved Africans from French plantations, including more than 500 from Martinique.|
B|Rochefort, Charles de|Histoire naturelle et morale des îles Antilles de l'Amérique|Rotterdam, 1658|Seventeenth-century observer who notes Africans held as slaves by the Caribs of Saint Vincent.|
B|Boucher, Philip P.|Cannibal Encounters: Europeans and Island Caribs, 1492–1763|Johns Hopkins University Press, 1992|Island Carib militarism and raiding for women, captives and goods.|
P|Davidson, William V.|Ethnohistorical and geographical papers on Garifuna settlement|Pearl Lagoon; arrival in Honduras, 1797; dispersal; habitats||Publication list=https://williamvdavidson.com/publications
P|Conzemius, Eduard|Ethnographical Notes on the Black Carib (Garif)|American Anthropologist 30(2), 1928|Includes phenotype observations.|
P|Gonzalez, Nancie L.|Papers on origins and militarism|New West Indian Guide, 1983; militarism paper, 1990||
P|Kim, Julie Chun|The Caribs of St. Vincent and Indigenous Resistance…|Early American Studies 11(1), 2013||
P|Goldwasser, Michele|Seeking the Ancestors|Antropológica (Caracas), 1998–1999|Summarises Du Tertre on mass kidnappings of enslaved people by Caribs and the wider captive practices of the period.|PDF=https://biblat.unam.mx/hevila/AntropologicaCaracas/1998-1999/1.pdf
P|Mercado-Montero, Ernesto|The Black Carib Archipelago: Afro-Indigenous Power and Autonomy|GLC@Lunch, Gilder Lehrman Center (Yale), 16 February 2023|Video lecture from the Gilder Lehrman Center lunch series.|YouTube=https://www.youtube.com/watch?v=qj_Z0gPtr4M
P|Encyclopedia.com|Black Caribs (reference entry)|Encyclopedia.com|Notes that the population grew through the capture of Red Carib women and the shelter given to fugitive enslaved people.|
L|Taylor, Douglas|Descriptions of Garifuna (based on Hopkins, Belize speakers)|1951 onward|Documents Island Carib (Iñeri / Igneri), the closest relative of Garifuna.|
L|Abtahian, Chaturvedi and Greenop|Illustration of Garifuna|Journal of the International Phonetic Association, 2023/2024|Confirms Arawakan affiliation, the phonemic inventory, and limited external influence on core structure.|
L|Native Languages of the Americas|Garifuna language resources|||
L|Aikhenvald, Alexandra Y. and others|Standard classifications of Arawakan languages|||
A||Haverstock, E.R. (1874), The Garifuna Nation|Royal Society for Ethnological Inquiry, London|Hard to find: held in deep archives and cited throughout the article. Not located in online catalogues, so verify against the original.|
A||Graves, A.P. (1857), A Plain Account of the Honduran Mestizo|Blackwood & Sons|Hard to find: archival. Not located in online catalogues, so verify against the original.|
A||Archivo General de Indias (AGI), Seville|1797 padrones and coastal records||
A||Archivo General de Centroamérica (AGCA), Guatemala|||
A||Archivo Nacional de Honduras / IHAH|Yaxkin series||
A||The National Archives (UK)|Colonial Office St. Vincent series (CO 260, CO 263, CO 318, etc.) and Foreign Office Mosquitia papers||
A||Archives nationales (France)|Colonies C8A series||
A||National Archives of Belize; Nicaraguan national archives|Mosquito Coast records||
A||British colonial records of the 1796–1797 deportation to Balliceaux|Cited in Gonzalez and Taylor|Record about 41 enslaved people described as belonging to the Black Caribs, showing that Black Caribs owned slaves.|
A||Deposition of Luisa Navarrete, 1576|Early Spanish colonial record|A free Black woman captured by Caribs of Dominica said they held Africans, other Indians and captured Europeans as slaves. It predates Black Carib ethnogenesis but shows a continuing practice. Explicit accounts of long-term European captives are rarer than those for African captives.|
A||Report of the Governor of Puerto Rico, 1588|Spanish colonial record|Noted hundreds of Black people living with the Caribs on Dominica.|
A||Internet Archive, JSTOR, Project MUSE, Academia.edu, ResearchGate|Online repositories||
C||Garífuna Community of San Juan and its Members v. Honduras|Inter-American Court of Human Rights, judgment of 29 August 2023|Full texts and summaries are on corteidh.or.cr.|Court website=https://corteidh.or.cr
C||Balliceaux acquisition|SVG Gazette and parliamentary records, 2025||
C||OFRANEH; National Garifuna Council (Belize); COIP|Community organisations|COIP is the Caribbean Organization of Indigenous Peoples.|
C||ILO Convention 169|Honduras, 1995||
C||UNESCO Intangible Cultural Heritage|Garifuna language, dance and music||
C||Alejo Beni / Settlement Day; Walumugu (Juan Francisco Bulnes)|Local histories||
C||1832 versus 1823 (reprint)|Amandala (Belize)|Press piece on the dating of Garifuna Settlement Day. Reports Alejo Beni's 1823 meeting with Superintendent Edward Codd and the 19 November 1823 return.|Amandala=https://amandala.com.bz/news/1832-versus-1823-reprint/
C||Celebrating 200 years of Garifuna contributions|Amandala (Belize)|Reports about 500 Garinagu migrating from Honduras to British Honduras after Alejo Beni received permission from Edward Codd, and an earlier 1802 settlement led by the Beni family.|Amandala=https://amandala.com.bz/news/celebrating-200-years-of-garifuna-contributions
C||Garifuna Settlement Day|Belize Living Heritage|Heritage page on the 19 November commemoration of the 1823 arrival and the role of Thomas Vincent Ramos.|Belize Living Heritage=https://belizelivingheritage.org/?p=10170`;
var S=SRC.trim().split('\n').map(function(l){var f=l.split('|');return{c:f[0],a:f[1],t:f[2],p:f[3],n:f[4],l:(f[5]||'').split(';').filter(Boolean).map(function(x){var i=x.indexOf('=');return[x.slice(0,i),x.slice(i+1)]})}});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2200)}
function copy(x,m){try{navigator.clipboard.writeText(x).then(function(){toast(m)},function(){toast('Copy is blocked here; select the text instead')})}catch(e){toast('Copy is blocked here; select the text instead')}}
function cite(s){return(s.a?s.a+'. ':'')+s.t+(s.p?'. '+s.p:'')+'.'}
var tabs=$('.article-tabs-inner');
tabs.innerHTML=R.map(function(r){return'<a class="tab" data-route="'+r+'" href="#/'+(r==='home'?'':r)+'">'+N[r]+'</a>'}).join('');
function route(){var h=location.hash;if(shown&&h&&h.charAt(1)!=='/')return;var p=h.replace(/^#\/?/,'').split('/')[0];cur=R.indexOf(p)>-1?p:'home';shown=true;
$$('[data-page]').forEach(function(e){e.hidden=e.getAttribute('data-page')!==cur});
$$('.tab',tabs).forEach(function(t){t.classList.toggle('active',t.getAttribute('data-route')===cur)});
document.title=(cur==='home'?'':N[cur]+' · ')+'Garifuna & Indigenous History Institute';window.scrollTo(0,0)}
function go(r,id){if(location.hash==='#/'+r)route();else location.hash='#/'+r;if(id)setTimeout(function(){var e=document.getElementById(id);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})},160)}
window.addEventListener('hashchange',route);route();
/* sources */
function renderSrc(){var qi=$('#sq');if(qi.value!==sq)qi.value=sq;var q=sq.toLowerCase();
fl=S.filter(function(s){return(sc==='all'||s.c===sc)&&(!q||(s.a+' '+s.t+' '+s.p+' '+s.n).toLowerCase().indexOf(q)>-1)});
$('#scats').innerHTML=Object.keys(CATS).map(function(k){var n=k==='all'?S.length:S.filter(function(s){return s.c===k}).length;return'<button class="chip'+(k===sc?' on':'')+'" data-c="'+k+'">'+CATS[k]+' ('+n+')</button>'}).join('');
$('#scount').innerHTML=fl.length+' of '+S.length+' sources'+(fl.length<S.length?' <button class="chip" id="sclear" type="button">Show all</button>':'');
$('#slist').innerHTML=fl.length?fl.map(function(s){return'<li class="src"><div>'+(s.a?esc(s.a)+'. ':'')+'<cite>'+esc(s.t)+'</cite>'+(s.p?'. '+esc(s.p):'')+'</div>'+(s.n?'<p>'+esc(s.n)+'</p>':'')+'<div class="src-l">'+s.l.map(function(l){return'<a href="'+esc(l[1])+'" target="_blank" rel="noopener noreferrer">'+esc(l[0])+' ↗</a>'}).join('')+'<a href="https://'+(/[BPL]/.test(s.c)?'scholar.google.com/scholar':'www.google.com/search')+'?q='+encodeURIComponent(s.t)+'" target="_blank" rel="noopener noreferrer">'+(/[BPL]/.test(s.c)?'Google Scholar':'Google')+' ↗</a><button class="chip" data-cp="'+S.indexOf(s)+'">Copy citation</button></div></li>'}).join(''):'<li class="none">No sources match. Clear the filter or choose All.</li>'}
$('#sq').addEventListener('input',function(e){sq=e.target.value;renderSrc()});
$('#scats').addEventListener('click',function(e){var b=e.target.closest('[data-c]');if(b){sc=b.getAttribute('data-c');renderSrc()}});
$('#scount').addEventListener('click',function(e){if(e.target.id==='sclear'){sq='';sc='all';renderSrc()}});tabs.addEventListener('click',function(e){if(e.target.closest('[data-route="sources"]')){sq='';sc='all';renderSrc()}});
$('#slist').addEventListener('click',function(e){var b=e.target.closest('[data-cp]');if(b)copy(cite(S[+b.getAttribute('data-cp')]),'Citation copied')});
$('#scopyall').addEventListener('click',function(){copy(fl.map(cite).join('\n'),fl.length+' citations copied')});
window.GIHI={S:S,cite:cite,toast:toast,copy:copy,go:go,esc:esc,list:function(){return fl},idx:function(){if(!idx)build();return idx}};$('#nsrc').textContent=S.length;renderSrc();
/* timeline from the article's own nodes */
$('#tlList').innerHTML=$$('.timeline-node').map(function(n){return'<li><button data-go="article" data-id="'+n.getAttribute('data-target')+'"><b>'+esc($('.yr',n).textContent)+'</b><span>'+esc($('.lbl',n).textContent)+'<i>Read in the article</i></span></button></li>'}).join('');
/* site search */
var idx;function build(){idx=[];var id='',sec='';$$('#article-top h2[id],#article-top h3[id],#article-top>p').forEach(function(e){if(e.id){id=e.id;sec=e.textContent.trim();idx.push({id:id,sec:sec,h:sec,s:''})}else idx.push({id:id,sec:sec,h:'',s:e.textContent.replace(/\[\d+\]/g,'').replace(/\s+/g,' ').trim()})})}
$('#hq').addEventListener('input',function(e){var q=e.target.value.trim().toLowerCase(),out=$('#hres');if(q.length<2){out.innerHTML='';return}if(!idx)build();
var m=[];idx.forEach(function(x){var t=x.h||x.s,i=t.toLowerCase().indexOf(q);if(i>-1)m.push({x:x,t:t,i:i})});m.sort(function(a,b){return(a.x.h?0:1)-(b.x.h?0:1)});
var h=m.slice(0,8).map(function(r){var st=Math.max(0,r.i-60);return'<li><button data-go="article" data-id="'+r.x.id+'"><strong>'+esc(r.x.sec)+'</strong><span>'+(st?'…':'')+esc(r.t.slice(st,r.i))+'<mark>'+esc(r.t.slice(r.i,r.i+q.length))+'</mark>'+esc(r.t.slice(r.i+q.length,r.i+q.length+90))+'</span></button></li>'}).join('');
var n=S.filter(function(s){return(s.a+' '+s.t+' '+s.p+' '+s.n).toLowerCase().indexOf(q)>-1}).length;
if(n)h+='<li><button data-go="sources" data-q="'+esc(q)+'"><strong>'+n+' source'+(n>1?'s':'')+' match</strong><span>Open them in the source library</span></button></li>';
out.innerHTML=h||'<li class="none">No matches for “'+esc(q)+'”. Try a person, place or term such as Chatoyer or Roatán.</li>'});
$('#pageSearch').addEventListener('focus',function(){if(cur!=='article')go('article')});
document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g){e.preventDefault();var q=g.getAttribute('data-q');if(q!==null){sq=q;sc='all';renderSrc()}go(g.getAttribute('data-go'),g.getAttribute('data-id'));return}
var t=e.target.closest('[data-term]');if(t){var v=t.getAttribute('data-term');copy(v==='__ALL__'?$$('[data-term]').map(function(x){return x.getAttribute('data-term')}).filter(function(x){return x!=='__ALL__'}).join(' OR '):v,'Copied: '+(v==='__ALL__'?'all terms':v));return}
if(e.target.closest('a[href="#"]')){e.preventDefault();toast('Accounts and editing are not available in this read-only edition')}});
document.addEventListener('keydown',function(e){if(e.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$(cur==='home'?'#hq':cur==='sources'?'#sq':'#pageSearch').focus()}});
})();