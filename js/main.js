/* Navigation, language switch, reviews, lightbox */
const AR=[];{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(/[\u0600-\u06FF]/.test(n.nodeValue)&&!n.parentNode.closest('script,style'))AR.push([n,n.nodeValue])}}
let L='ar';try{L=localStorage.getItem('rl')||'ar'}catch(e){}
const IC={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',valetax:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',channels:'<path d="M3 12l18-8-7 17-3-7z"/>',services:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',cashback:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/><path d="M12 8c-1-3-5-4-5-1.5S10 8 12 8zm0 0c1-3 5-4 5-1.5S14 8 12 8z"/>'};
const PGS=[["home","الرئيسية","الرئيسية","Home","Home"],["valetax","VALETAX","VALETAX","VALETAX","VALETAX"],["channels","قنوات التوصيات","القنوات","Trading Channels","Channels"],["services","الخدمات والبرامج","الخدمات","Services & Programs","Services"],["cashback","مسابقة الكاش باك","الكاش باك","Cashback Competition","Cashback"]];
 /* ضع صور التقييمات هنا: REVIEWS=["data:image/..."] */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);let cur='home';
$$('img[data-slot]').forEach(i=>{if(IMG[i.dataset.slot])i.src=IMG[i.dataset.slot]});
function rvs(){$('#rvs').innerHTML=[...Array(Math.max(6,REVIEWS.length))].map((_,i)=>REVIEWS[i]?`<div class="rvt f"><img src="${REVIEWS[i]}" alt="" loading="lazy"></div>`:`<div class="rvt">${L=='en'?'Client review image':'مكان صورة تقييم العميل'}</div>`).join('');rvb()}
function rvb(){const m=$('#rvm'),n=REVIEWS.length||6,en=L=='en';m.hidden=n<=4;m.textContent=RO?(en?'Show less':'عرض أقل'):(en?'Show more':'عرض المزيد');$('#rvs').classList.toggle('open',RO)}
let RO=false;rvs();$('#rvm').onclick=()=>{RO=!RO;rvb();if(!RO)$('#rvs').scrollIntoView({behavior:'smooth',block:'start'})};
$('#h1').innerHTML="REHAM ESSAM".split(' ').map((w,i)=>`<span class="wd" style="--i:${i}"><span>${w}</span></span>`).join('');
$('#mq').innerHTML=[...Array(2)].map(()=>"XAUUSD EURUSD GBPUSD USDJPY BTCUSD US30 NAS100 GBPJPY USOIL AUDUSD".split(' ').map(s=>`<span>${s}</span>`).join('')).join('');
function buildNav(){const en=L=='en';$('#nin').innerHTML='<div class="np" id="np"></div>'+PGS.map(p=>`<button class="nb" data-go="${p[0]}">${en?p[3]:p[1]}</button>`).join('');
$('#tab').innerHTML=PGS.map(p=>`<button data-go="${p[0]}" aria-label="${p[3]}"><svg viewBox="0 0 24 24">${IC[p[0]]}</svg><span>${en?p[4]:p[2]}</span></button>`).join('')}buildNav();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
const so=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('on',e.isIntersecting&&e.boundingClientRect.top<innerHeight*.7)),{rootMargin:'-25% 0px -25% 0px'});
function nav(){const b=$(`.nb[data-go=${cur}]`),p=$('#np');$$('.nb,.tab button').forEach(x=>x.classList.toggle('a',x.dataset.go==cur));if(b){p.style.left=b.offsetLeft+'px';p.style.width=b.offsetWidth+'px';{const n=$('#nin'),cw=n.clientWidth,sw=n.scrollWidth;if(sw>cw){let t=b.offsetLeft+b.offsetWidth/2-cw/2;if(getComputedStyle(n).direction=='rtl')t-=sw-cw;n.scrollTo({left:t,behavior:'smooth'})}}}}
function go(n,keep){if(!PGS.some(p=>p[0]==n))n='home';cur=n;$$('.page').forEach(p=>p.classList.toggle('act',p.id=='p-'+n));
$$('.page.act .rv,.page.act .split').forEach(e=>{e.classList.remove('in');io.observe(e)});$$('.page.act .st').forEach(e=>so.observe(e));nav();if(!keep){scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#'+n)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});
document.addEventListener('click',e=>{const t=e.target.closest('.rvt.f');if(!t||t.closest('#md'))return;const m=$('#md');m.innerHTML='';const c=t.cloneNode(true);c.style.cssText='width:min(560px,100%);aspect-ratio:auto;cursor:default';m.appendChild(c);m.classList.add('o')});
$('#md').onclick=()=>$('#md').classList.remove('o');addEventListener('keydown',e=>{if(e.key=='Escape')$('#md').classList.remove('o')});
document.addEventListener('pointerover',e=>$('#rc').classList.toggle('h',!!e.target.closest('a,button,summary,.rvt')));
function setL(l){L=l;const h=document.documentElement,en=l=='en';h.lang=l;h.dir=en?'ltr':'rtl';
if(AR.length==EN.length)AR.forEach(([n,o],i)=>{n.nodeValue=en?o.replace(o.trim(),()=>EN[i]):o});
buildNav();rvs();$$('#lg,#lg2').forEach(b=>b.textContent=en?'عربي':'EN');try{localStorage.setItem('rl',l)}catch(e){}nav()}
$$('#lg,#lg2').forEach(b=>b.onclick=()=>setL(L=='ar'?'en':'ar'));
go(location.hash.slice(1)||'home',1);if(L=='en')setL('en');addEventListener('resize',nav);setTimeout(nav,400);document.fonts&&document.fonts.ready.then(nav);
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,sc=0;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function onS(){const d=document.documentElement;$('#pg').style.transform=`scaleX(${scrollY/Math.max(1,d.scrollHeight-innerHeight)})`;sc=scrollY;
const a=$('#asc').getBoundingClientRect();if(a.height){const q=Math.max(0,Math.min(1,(innerHeight*.55-a.top)/a.height));$('#fill').style.height=q*100+'%'}}
addEventListener('scroll',onS,{passive:true});onS();const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Contact form -> Telegram (message pre-filled, user taps send) */
const TGU='S_B_R_5';
const CM={ar:{t:'ابدأ الاشتراك',s:'اكتب بياناتك وسنفتح لك تيليجرام والرسالة جاهزة، وكل ما عليك الضغط على إرسال.',n:'الاسم',p:'رقم الهاتف',k:'نوع الاشتراك',pick:'اختر نوع الاشتراك',go:'أرسل عبر تيليجرام',x:'إغلاق',e1:'الرجاء كتابة الاسم',e2:'رقم الهاتف غير صحيح',e3:'اختر نوع الاشتراك',ok:'تم نسخ رسالتك أيضًا',opts:['القناة العامة (مجانية)','قناة الاسكالبينج','قناة VIP','قناة الـ 100$','كورس SMC','إدارة الحسابات'],tpl:(n,p,k)=>`الاسم: ${n}\nرقم الهاتف: ${p}\nنوع الاشتراك: ${k}`},
en:{t:'Start your subscription',s:'Enter your details and we’ll open Telegram with your message ready. Just tap send.',n:'Name',p:'Phone number',k:'Subscription type',pick:'Choose a subscription type',go:'Send via Telegram',x:'Close',e1:'Please enter your name',e2:'Phone number is not valid',e3:'Choose a subscription type',ok:'Your message was also copied',opts:['Public channel (free)','Scalping channel','VIP channel','The $100 channel','SMC course','Account management'],tpl:(n,p,k)=>`Name: ${n}\nPhone: ${p}\nSubscription: ${k}`}};
function cmR(){const c=CM[L],f=$('#cf'),v=f?[f.n.value,f.p.value,f.k.selectedIndex]:['','',0];
$('#cm .cb').innerHTML=`<button class="cx" type="button" aria-label="${c.x}">×</button><h3>${c.t}</h3><p class="mu">${c.s}</p><form id="cf" novalidate><label>${c.n}<input name="n" autocomplete="name"></label><label>${c.p}<input name="p" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="+971 5X XXX XXXX"></label><label>${c.k}<select name="k"><option value="">${c.pick}</option>${c.opts.map(o=>`<option>${o}</option>`).join('')}</select></label><div class="er" id="er" aria-live="polite"></div><button class="btn b1" type="submit">${c.go}</button></form>`;
const g=$('#cf');g.n.value=v[0];g.p.value=v[1];g.k.selectedIndex=v[2]}
function cmO(e){if(e)e.preventDefault();cmR();$('#cm').classList.add('o');setTimeout(()=>$('#cf').n.focus(),50)}
function cmC(){$('#cm').classList.remove('o')}
$('#cu').addEventListener('click',cmO);$('#fab').addEventListener('click',cmO);
$('#cm').addEventListener('click',e=>{if(e.target.id=='cm'||e.target.closest('.cx'))cmC()});
addEventListener('keydown',e=>{if(e.key=='Escape')cmC()});
document.addEventListener('submit',e=>{const f=e.target;if(f.id!='cf')return;e.preventDefault();const c=CM[L],n=f.n.value.trim(),p=f.p.value.trim(),d=p.replace(/\D/g,''),er=$('#er');
const bad=n.length<2?['n',c.e1]:(d.length<7||d.length>15||/[^\d+\s()-]/.test(p))?['p',c.e2]:f.k.selectedIndex<1?['k',c.e3]:null;
if(bad){er.textContent=bad[1];f[bad[0]].focus();return}
const m=c.tpl(n,p,c.opts[f.k.selectedIndex-1]);try{navigator.clipboard.writeText(m)}catch(x){}
const w=window.open('https://t.me/'+TGU+'?text='+encodeURIComponent(m),'_blank','noopener');if(!w)location.href='https://t.me/'+TGU+'?text='+encodeURIComponent(m);
const t=$('#toast');t.textContent=c.ok;t.classList.add('s');setTimeout(()=>t.classList.remove('s'),3000);setTimeout(cmC,500)});
{const _s=setL;setL=function(l){_s(l);if($('#cm').classList.contains('o'))cmR()}}
