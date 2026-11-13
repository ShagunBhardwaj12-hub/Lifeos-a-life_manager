/* LifeOS logic: intro, landing page, dashboard modules, accounts, AI assistant, calendar */
const $=(s,r=document)=>r.querySelector(s);document.body.classList.add('lock');
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---- block mark ---- */
const COL=['var(--gold)','var(--clay)','var(--moss)','var(--sand)'];
function mark(s,cols,delay=0,step=.07){let n=0,h='<div class="mark" aria-hidden="true">';
 for(let c=0;c<cols;c++){h+='<div class="c">';for(let r=0;r<=c;r++){h+=`<i style="--s:${s}px;--col:${COL[(c+r)%4]};--d:${delay+n*step}s"></i>`;n++}h+='</div>'}
 return h+'</div>'}
$('#introMark').innerHTML=mark(26,5,.1);
$('#logoMark').innerHTML=mark(7,4,.05,.03);
$('#footMark').innerHTML=mark(7,4,0,.02);
$('#word').innerHTML=[...'LifeOS'].map((l,i)=>`<span style="animation-delay:${1.3+i*.1}s">${l}</span>`).join('');
$('#heroMark').innerHTML=mark(34,5,.2,.08)+'<i class="float" style="--col:var(--sand);width:22px;height:22px;top:0;right:10px"></i><i class="float" style="--col:var(--clay);width:14px;height:14px;top:50%;left:-8px;animation-delay:-2s"></i><i class="float" style="--col:var(--moss);width:18px;height:18px;bottom:0;right:30%;animation-delay:-4s"></i>';
/* intro */
const intro=$('#intro');let gone=false;
function endIntro(){if(gone)return;gone=true;intro.classList.add('out');document.body.classList.remove('lock');setTimeout(()=>intro.remove(),1000)}
intro.onclick=endIntro;setTimeout(endIntro,3400);
/* features */
const IC={t:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',s:'<path d="M3 17h4v-4h4V9h4V5h6"/>',h:'<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18M8 15l2 2 4-4"/>',f:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',j:'<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2zM9 8h6M9 12h6"/>',p:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'};
IC.a='<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>';IC.q='<path d="M4 4h16v12H8l-4 4z"/>';const F=[['t','Gap-based goals','Write your current state and your ideal state for each goal. LifeOS shows the gap and tracks how much of it you have closed.'],['s','Checkable steps','Split every goal into small steps. Tick them off as you go and see your progress bar move.'],['h','Habit tracker','Mark each day you keep a habit. A seven-day row and a streak counter keep you consistent.'],['f','Focus sessions','Run a 15, 25 or 50 minute timer. Completed sessions are added to your focus total.'],['j','Private journal','Record your mood and a few lines each day. Entries are stored only on your device.'],['p','Weekly overview','See your habit activity for the past week, your total goal progress and your focus time at a glance.'],['a','Priority engine','Every task gets a score from deadline, importance and effort, with the calculation shown, so you always know why.'],['q','AI life assistant','Ask for a plan, a first task or goal steps. Powered by Claude on the published page, with a clearly labelled demo mode as a fallback.']];
$('#fgrid').innerHTML=F.map(f=>`<article class="card rv"><svg viewBox="0 0 24 24">${IC[f[0]]}</svg><h3>${f[1]}</h3><p>${f[2]}</p></article>`).join('');
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});

/* ---- app ---- */
let K='lifeos-v2',S;const $$=s=>[...document.querySelectorAll(s)],CATS=['Career','Education','Health','Personal','Finance'],PN=['','Low','Medium','High','Critical'],IMP=[0,25,50,75,100];
const MOON='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/></svg>',SUN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),ad=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)},T0=()=>ad(0),today=()=>Math.floor(Date.now()/864e5);
const seed=()=>({tab:0,day:today(),name:'Friend',theme:'light',chat:[],journal:[],
tasks:[{id:1,t:'Submit assignment',cat:'Education',pri:4,due:ad(0),time:'11:00',eff:3,done:0},{id:2,t:'Finish JavaScript basics chapter',cat:'Education',pri:3,due:ad(1),time:'',eff:2,done:0},{id:3,t:'Pay phone bill',cat:'Finance',pri:3,due:ad(3),time:'',eff:.5,done:0},{id:4,t:'Gym session',cat:'Health',pri:2,due:ad(2),time:'18:00',eff:1,done:0},{id:5,t:'Tidy desk',cat:'Personal',pri:1,due:'',time:'',eff:.5,done:0},{id:6,t:'Morning walk',cat:'Health',pri:2,due:ad(-1),time:'',eff:.5,done:1,at:ad(-1)},{id:7,t:'Email mentor',cat:'Career',pri:3,due:ad(-2),time:'',eff:.5,done:1,at:ad(-2)},{id:8,t:'Read research paper',cat:'Education',pri:2,due:ad(-3),time:'',eff:1.5,done:1,at:ad(-3)},{id:9,t:'Plan the week',cat:'Personal',pri:2,due:ad(-5),time:'',eff:.5,done:1,at:ad(-5)},{id:10,t:'Clean notes',cat:'Education',pri:1,due:ad(-1),time:'',eff:1,done:1,at:ad(-1)}],
goals:[{id:1,name:'Build a full-stack project',cat:'Career',target:ad(60),cur:'I know HTML, CSS and basic Java.',ideal:'A deployed app with a backend and a database.',steps:[{t:'Finish JavaScript basics',d:1},{t:'Learn React fundamentals',d:0},{t:'Build a small Node API',d:0},{t:'Deploy the project',d:0}]},{id:2,name:'Get fitter',cat:'Health',target:ad(90),cur:'I walk occasionally.',ideal:'Exercise four times a week.',steps:[{t:'Plan a weekly workout routine',d:1},{t:'Complete two weeks of workouts',d:0},{t:'Review progress',d:0}]}],
habits:[{id:1,name:'Practise coding for 30 minutes',freq:'daily',days:[0,1,1,0,1,1,0]},{id:2,name:'Read 10 pages',freq:'daily',days:[1,0,1,1,0,0,0]},{id:3,name:'Weekly review',freq:'weekly',days:[0,0,1,0,0,0,0]}],
focus:[{d:ad(-1),m:25},{d:ad(-1),m:50},{d:ad(-3),m:25},{d:ad(0),m:25}]});
/* accounts: demo login kept in this browser only */
const UK='lifeos-users',SK='lifeos-session';
const rd=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){toast('Browser storage is blocked or full')}};
let USERS=rd(UK,[]),SID=rd(SK,null);
const cu=()=>USERS.find(u=>u.id===SID)||null;
async function hash(p,s){if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}let h=5381;for(const c of s+p)h=(h*33^c.charCodeAt(0))>>>0;return'x'+h}
function loadS(){K=SID?'lifeos-d-'+SID:'lifeos-v2';let d=null;try{d=JSON.parse(localStorage.getItem(K))}catch(e){}
 S=d&&d.tasks?d:seed();S.theme='light';
 {const n=Math.min(7,today()-S.day);if(n>0){S.habits.forEach(h=>h.days=h.days.slice(n).concat(Array(n).fill(0)));S.day=today()}}
 const u=cu();S.name=u?u.name:'Friend'}
loadS();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),2400)};
function applyTheme(){document.documentElement.dataset.theme=S.theme;const b=$('#theme');b.innerHTML=S.theme==='dark'?SUN:MOON;b.setAttribute('aria-label',S.theme==='dark'?'Switch to light theme':'Switch to dark theme')}
$('#theme').onclick=()=>{S.theme=S.theme==='dark'?'light':'dark';save();applyTheme()};applyTheme();
const TABS=['Overview','Assistant','Tasks','Goals','Habits','Focus','Analytics','Journal','Settings','Profile','Calendar'];
let ED=null,FL=25,left=25*60,run=null,pending=false;
const pct=g=>g.steps.length?Math.round(g.steps.filter(s=>s.d).length/g.steps.length*100):0;
const marks=h=>h.days.filter(Boolean).length,hc=h=>h.freq==='weekly'?(marks(h)?100:0):marks(h)/7*100;
const streak=h=>{let n=0;for(let i=6;i>=0&&h.days[i];i--)n++;return n};
const fsum=f=>S.focus.filter(f).reduce((a,x)=>a+x.m,0),L7=[-6,-5,-4,-3,-2,-1,0].map(ad);
const dlab=d=>new Date(d+'T00:00').toLocaleDateString(undefined,{weekday:'short'}).slice(0,2);
const bars=v=>{const m=Math.max(1,...v);return `<div class="bars">${v.map((n,i)=>`<div><span>${n}</span><i style="height:${Math.max(4,n/m*100)}%"></i>${dlab(L7[i])}</div>`).join('')}</div>`};
const ringSvg=(p,txt,r=44)=>{const c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="${r}"/><circle class="fg" cx="50" cy="50" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}"/><text x="50" y="58">${txt}</text></svg>`};
const opts=(a,v)=>a.map(x=>`<option ${x===v?'selected':''}>${x}</option>`).join('');
/* priority engine: rule-based, not AI */
function score(t){if(t.done)return{s:0,l:'Done',why:'Completed.'};const dd=t.due?Math.round((Date.parse(t.due)-Date.parse(T0()))/864e5):null;
 const U=dd===null?5:dd<0?100:dd===0?90:dd<=2?75:dd<=7?50:dd<=14?30:10,I=IMP[t.pri],E=t.eff<=.5?100:t.eff<=1?80:t.eff<=2?60:t.eff<=4?40:20,s=Math.round(.45*U+.4*I+.15*E);
 const w=dd===null?'no deadline':dd<0?`overdue by ${-dd}d`:dd===0?'due today':`due in ${dd}d`;
 return{s,l:s>=75?'Do now':s>=55?'Do next':s>=35?'Schedule':'Later',why:`Urgency ${U} (${w}) × 45% + importance ${I} (${PN[t.pri]}) × 40% + effort ${E} (${t.eff}h; shorter tasks score higher) × 15% = ${s}.`}}
const open=()=>S.tasks.filter(t=>!t.done).sort((a,b)=>score(b).s-score(a).s);
function life(){const tk=S.tasks,Tp=tk.length?tk.filter(t=>t.done).length/tk.length*100:0,Gp=S.goals.length?S.goals.reduce((a,g)=>a+pct(g),0)/S.goals.length:0,Hp=S.habits.length?S.habits.reduce((a,h)=>a+hc(h),0)/S.habits.length:0,Fp=Math.min(100,fsum(x=>x.d>=ad(-6))/150*100);return{Tp,Gp,Hp,Fp,s:Math.round(.3*Tp+.25*Gp+.25*Hp+.2*Fp)}}
function sched(){let m=540;const f=x=>String(Math.floor(x/60)).padStart(2,'0')+':'+String(x%60).padStart(2,'0');return open().slice(0,6).map(t=>{const a=m,b=m+Math.max(30,Math.round(t.eff*60));m=b+15;return `<div class="entry"><small>${f(a)} – ${f(b)} · ${PN[t.pri]}</small><p>${esc(t.t)}</p></div>`}).join('')||'<p class="empty">No pending tasks to schedule.</p>'}
/* assistant: local rules, clearly demo */
function reply(q){q=q.toLowerCase();const o=open();
 if(/plan|schedule|day/.test(q))return o.length?'Suggested order for today:\n'+o.slice(0,4).map((t,i)=>`${i+1}. ${t.t} (${PN[t.pri]}, ${t.eff}h)`).join('\n')+'\n\nStart with a focus session on #1.':'You have no pending tasks. Add one in Tasks.';
 if(/first|priorit|important|next|start/.test(q))return o[0]?`Start with "${o[0].t}".\n${score(o[0]).why}`:'Nothing is pending right now.';
 if(/goal|break|step/.test(q)){const g=S.goals.find(g=>pct(g)<100);return g?`For "${g.name}" your next steps are:\n`+(g.steps.filter(s=>!s.d).slice(0,3).map((s,i)=>`${i+1}. ${s.t}`).join('\n')||'Add steps in Goals first.')+`\n\nYou have closed ${pct(g)}% of the gap.`:'All goals are complete. Add a new one.'}
 if(/habit|streak/.test(q))return S.habits.length?S.habits.map(h=>`${h.name}: ${h.freq==='weekly'?marks(h)+' this week':streak(h)+' day streak'}`).join('\n'):'You have no habits yet.';
 return 'I can plan your day, choose your first task, break down a goal or review your habits. Try a suggestion below.'}
let AI=null,SAMPLE=null,KEY='';try{KEY=localStorage.getItem('lifeos-key')||''}catch(e){}
async function direct(input){const messages=typeof input==='string'?[{role:'user',content:input}]:input;
 const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':KEY,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:600,messages})});
 const j=await r.json();if(!r.ok)throw{code:(j.error&&j.error.type)||r.status};return{text:(j.content||[]).map(c=>c.text||'').join('')}}
direct.json=async p=>{const r=await direct(p),m=r.text.match(/\[[\s\S]*\]/);return JSON.parse(m?m[0]:r.text)};
const setAI=()=>{AI=SAMPLE||(KEY?direct:null)};setAI();
if(window.claude&&window.claude.use)window.claude.use('sample').then(s=>{SAMPLE=s||null;setAI();if(AI&&(S.tab===1||S.tab===3||S.tab===8))render()}).catch(()=>{});
const ctx=()=>`Today: ${T0()}. User: ${S.name}.\nOpen tasks (ranked by priority score): ${open().slice(0,8).map(t=>`${t.t} [${PN[t.pri]}, due ${t.due||'none'}, ${t.eff}h, score ${score(t).s}]`).join('; ')||'none'}.\nGoals: ${S.goals.map(g=>`${g.name} (${pct(g)}% done; now: ${g.cur}; ideal: ${g.ideal}; next steps: ${g.steps.filter(s=>!s.d).slice(0,3).map(s=>s.t).join(', ')||'none'})`).join('; ')||'none'}.\nHabits: ${S.habits.map(h=>`${h.name} (${h.freq==='weekly'?marks(h)+' this week':streak(h)+'-day streak'})`).join('; ')||'none'}.`;
function ask(q){S.chat.push({r:'u',t:q});S.chat=S.chat.slice(-30);pending=true;save();chatUpd();
 const done=(t,ai)=>{S.chat.push({r:'a',t,ai:ai?1:0});pending=false;save();chatUpd()};
 if(!AI){setTimeout(()=>done(reply(q),0),700);return}
 let h=S.chat.slice(0,-1).slice(-6);while(h.length&&h[0].r!=='u')h.shift();
 const m=h.map(x=>({role:x.r==='u'?'user':'assistant',content:x.t}));
 m.push({role:'user',content:`You are LifeOS Assistant, a concise and practical planning coach. Use only the data below and never invent tasks. Answer in under 120 words, in plain text, using short numbered steps when planning.\n\nDATA:\n${ctx()}\n\nQUESTION: ${q}`});
 AI(m,{cache:false}).then(r=>done(r.text,1)).catch(e=>done('AI is unavailable ('+((e&&e.code)||'error')+'). Demo reply instead:\n'+reply(q),0))}
function chatUpd(){const c=$('#chat');if(!c)return;c.innerHTML=(S.chat.map(m=>`<div class="msg ${m.r}">${m.r==='a'?`<b class="lbl">${m.ai?'AI reply':'Demo reply'}</b>`:''}${esc(m.t)}</div>`).join('')||'<p class="empty">Ask me to plan your day, pick your first task or break down a goal.</p>')+(pending?'<div class="msg a dotsl" aria-label="Thinking"><span></span><span></span><span></span></div>':'');c.scrollTop=c.scrollHeight}
/* tasks list */
function TL(){const el=$('#tl');if(!el)return;const q=$('#q').value.toLowerCase(),f=$('#fl').value,so=$('#so').value,
 a=S.tasks.filter(t=>t.t.toLowerCase().includes(q)&&(f==='all'||(f==='done')===!!t.done)).sort((x,y)=>so==='due'?(x.due||'9999').localeCompare(y.due||'9999'):score(y).s-score(x).s),
 dn=S.tasks.filter(t=>t.done).length,p=S.tasks.length?Math.round(dn/S.tasks.length*100):0;
 el.innerHTML=`<div class="pb"><i style="width:${p}%"></i></div><p class="gap">${dn} of ${S.tasks.length} completed (${p}%)</p>`+(a.map(t=>{const c=score(t);return `<div class="task ${t.done?'d':''}"><button class="chk ${t.done?'d':''}" data-a="tdone" data-i="${t.id}"><s></s><span>${esc(t.t)}</span></button><div class="meta"><span class="bd p${t.pri}">${PN[t.pri]}</span><span class="bd">${t.cat}</span>${t.due?`<span class="bd">Due ${t.due}${t.time?' '+t.time:''}</span>`:''}<span class="bd">${t.eff}h</span><span class="bd sc">${c.l} · ${c.s}</span></div><details><summary>Why this priority?</summary><p class="gap">${c.why}</p></details><div class="meta"><button class="x" data-a="tedit" data-i="${t.id}">Edit</button><button class="x" data-a="tdel" data-i="${t.id}">Delete</button></div></div>`}).join('')||'<p class="empty">No tasks match. Add one above.</p>')}
/* focus */
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function fUpd(){const fg=$('#ft .fg');if(!fg)return;fg.style.strokeDashoffset=2*Math.PI*44*(1-left/(FL*60));$('#ft text').textContent=fmt(left)}
function fStop(){clearInterval(run);run=null}
function tick(){left--;if(left<=0){fStop();S.focus.push({d:T0(),m:FL});left=FL*60;save();toast('Focus session complete: '+FL+' minutes');if(S.tab===5)render();return}fUpd()}
/* views */
const V=[
()=>{const l=life(),h=new Date().getHours(),dn=S.tasks.filter(t=>t.done).length,td=S.habits.filter(x=>x.days[6]).length;
 return `<h3>Good ${h<12?'morning':h<18?'afternoon':'evening'}, ${esc(S.name)}</h3><p class="sub">${new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
 <div class="stats"><div class="st"><b>${dn}</b><span>Tasks done</span></div><div class="st"><b>${S.tasks.length-dn}</b><span>Pending</span></div><div class="st"><b>${S.goals.length}</b><span>Active goals</span></div><div class="st"><b>${td}/${S.habits.length}</b><span>Habits today</span></div><div class="st"><b>${fsum(x=>x.d===T0())}</b><span>Focus min today</span></div></div>
 <div class="two"><div class="box"><h4>Tasks completed, last 7 days</h4>${bars(L7.map(d=>S.tasks.filter(t=>t.at===d).length))}</div><div class="box"><h4>Life score</h4>${ringSvg(l.s,l.s)}</div></div>
 <div class="box" style="margin-top:14px"><h4>Up next</h4>${open().slice(0,3).map(t=>{const c=score(t);return `<div class="entry"><small>${c.l} · score ${c.s}</small><p>${esc(t.t)}</p></div>`}).join('')||'<p class="empty">All clear. Add a task to get started.</p>'}</div>
 <div class="chips" style="justify-content:start;margin-top:16px"><button class="chip on" data-a="tab" data-t="2">Add a task</button><button class="chip" data-a="ask" data-q="Plan my day">Plan my day</button><button class="chip" data-a="tab" data-t="5">Start focus</button><button class="chip" data-a="tab" data-t="3">View goals</button></div>`},
()=>`<h3>AI Life Assistant</h3>${AI?'<p class="note"><b>AI connected.</b> Replies come from Claude and use your tasks, goals and habits. Your task, goal and habit titles are sent to Claude to write each reply. Double-check anything important.</p>':'<p class="note"><b>Demo mode.</b> No AI service is connected here. Replies are generated by simple local rules from your own tasks, goals and habits, not by an AI model.</p>'}<div class="chat" id="chat" aria-live="polite"></div>
 <div class="chips" style="justify-content:start">${['Plan my day','What should I do first?','Break down my goal','Review my habits'].map(q=>`<button class="chip" data-a="ask" data-q="${q}">${q}</button>`).join('')}</div>
 <form class="add" data-f="chat"><input name="q" placeholder="Ask about your day, tasks or goals" aria-label="Message" maxlength="200" required><button class="sm">Send</button></form>`,
()=>{const v=ED?S.tasks.find(t=>t.id===ED):{t:'',cat:'Personal',pri:2,due:'',time:'',eff:1};
 return `<h3>Tasks &amp; Planner</h3><p class="sub">Every task gets a transparent priority score. Edit a task to reschedule it.</p>
 <form class="add" id="tf" data-f="task"><input name="t" value="${esc(v.t)}" placeholder="Task title" aria-label="Task title" maxlength="80" required><select name="cat" aria-label="Category">${opts(CATS,v.cat)}</select><select name="pri" aria-label="Priority">${[4,3,2,1].map(p=>`<option value="${p}" ${p==v.pri?'selected':''}>${PN[p]}</option>`).join('')}</select><input type="date" name="due" value="${v.due}" aria-label="Due date"><input type="time" name="time" value="${v.time}" aria-label="Time"><input type="number" name="eff" value="${v.eff}" min=".25" max="24" step=".25" aria-label="Effort in hours" title="Effort in hours"><button class="sm">${ED?'Save changes':'Add task'}</button>${ED?'<button type="button" class="x" data-a="tcancel">Cancel</button>':''}</form>
 <div class="box" style="margin-bottom:14px"><h4>Suggested schedule</h4><button class="chip" data-a="sched">Generate from my tasks</button><div id="sch"></div></div>
 <form class="add" onsubmit="return false"><input id="q" placeholder="Search tasks" aria-label="Search tasks"><select id="fl" aria-label="Filter"><option value="all">All</option><option value="open">Pending</option><option value="done">Completed</option></select><select id="so" aria-label="Sort"><option value="score">Sort by priority</option><option value="due">Sort by due date</option></select></form><div id="tl"></div>`},
()=>`<h3>Goals</h3><p class="sub">Name where you are, where you want to be, then add steps.</p>
 <form class="add" data-f="goal"><input name="n" placeholder="Goal name" maxlength="80" required><select name="k" aria-label="Category">${opts(CATS,'Personal')}</select><input type="date" name="d" aria-label="Target date"><input name="c" placeholder="Where I am now" required><input name="i" placeholder="Where I want to be" required><button class="sm">Add goal</button></form>
 ${S.goals.map((g,gi)=>`<div class="goal"><header><b>${esc(g.name)} <span class="bd">${g.cat}</span>${g.target?` <span class="bd">By ${g.target}</span>`:''}</b><button class="x" data-a="delg" data-g="${gi}">Delete</button></header><p class="gap">Now: <b>${esc(g.cur)}</b><br>Ideal: <b>${esc(g.ideal)}</b></p><div class="pb"><i style="width:${pct(g)}%"></i></div><p class="gap">${pct(g)}% of the gap closed</p>${g.steps.map((s,si)=>`<button class="chk ${s.d?'d':''}" data-a="step" data-g="${gi}" data-s="${si}"><s></s><span>${esc(s.t)}</span></button>`).join('')}${AI?`<button class="chip" data-a="aisteps" data-g="${gi}">Suggest steps with AI</button>`:''}<form class="add" data-f="step" data-g="${gi}"><input name="t" placeholder="Add a milestone" required><button class="sm">Add</button></form></div>`).join('')||'<p class="empty">No goals yet. Add your first one above.</p>'}`,
()=>`<h3>Habits</h3><p class="sub">Tap a square to mark a day. The last square is today.</p>
 ${S.habits.map((h,hi)=>`<div class="hrow"><b>${esc(h.name)} <span class="bd">${h.freq}</span></b><div class="dots">${h.days.map((d,di)=>`<button class="${d?'on':''}" data-a="hday" data-h="${hi}" data-d="${di}" aria-label="${dlab(L7[di])}"></button>`).join('')}</div><span class="streak">${h.freq==='weekly'?marks(h)+' this week':streak(h)+' day streak'}</span><button class="x" data-a="delh" data-h="${hi}">Delete</button></div>`).join('')||'<p class="empty">No habits yet.</p>'}
 <form class="add" data-f="habit"><input name="n" placeholder="New habit" required><select name="f" aria-label="Frequency"><option value="daily">Daily</option><option value="weekly">Weekly</option></select><button class="sm">Add habit</button></form>`,
()=>`<div class="timer" id="ft"><h3>Focus</h3><p class="sub">Choose a length, start, and work on one thing.</p>${ringSvg(100,fmt(left))}<div class="chips">${[15,25,50].map(m=>`<button class="chip ${m===FL?'on':''}" data-a="len" data-m="${m}">${m} min</button>`).join('')}</div><form class="add" data-f="flen" style="justify-content:center"><input type="number" name="m" min="1" max="180" placeholder="Custom minutes" aria-label="Custom minutes" style="max-width:170px"><button class="sm">Set</button></form><div class="cta" style="justify-content:center"><button class="btn" data-a="fgo">${run?'Pause':'Start'}</button><button class="btn ghost" data-a="freset">Reset</button></div>
 <p class="sub" style="margin-top:18px">Today ${fsum(x=>x.d===T0())} min · This week ${fsum(x=>x.d>=ad(-6))} min · Total ${fsum(()=>1)} min</p><div style="text-align:left">${S.focus.slice(-5).reverse().map(x=>`<div class="entry"><small>${x.d}</small><p>${x.m} minute session</p></div>`).join('')||'<p class="empty">No sessions yet.</p>'}</div></div>`,
()=>{const l=life();return `<h3>Productivity analytics</h3><p class="sub">Your Life Score is ${l.s} out of 100, from four documented indicators.</p>
 <div class="two"><div class="box">${[['Tasks completed',30,l.Tp],['Goal progress',25,l.Gp],['Habit consistency (7 days)',25,l.Hp],['Focus time (150 min per week target)',20,l.Fp]].map(r=>`<div class="lrow"><span>${r[0]} · ${r[1]}%</span><b>${Math.round(r[2])}%</b></div><div class="pb"><i style="width:${r[2]}%"></i></div>`).join('')}<p class="gap" style="margin-top:14px">Life Score = 30% tasks + 25% goals + 25% habits + 20% focus.</p></div><div class="box"><h4>Life score</h4>${ringSvg(l.s,l.s)}</div></div>
 <div class="box" style="margin-top:14px"><h4>Tasks completed per day</h4>${bars(L7.map(d=>S.tasks.filter(t=>t.at===d).length))}</div>
 <div class="box" style="margin-top:14px"><h4>Habits kept per day</h4>${bars([0,1,2,3,4,5,6].map(i=>S.habits.filter(h=>h.days[i]).length))}</div>
 <div class="box" style="margin-top:14px"><h4>Focus minutes per day</h4>${bars(L7.map(d=>fsum(x=>x.d===d)))}</div>`},
()=>`<h3>Journal</h3><p class="sub">How are you today?</p><div class="chips" style="justify-content:start" id="moods">${['Low','Okay','Good','Great'].map((m,i)=>`<button class="chip ${i==2?'on':''}" data-a="mood">${m}</button>`).join('')}</div><form class="add" data-f="jr"><textarea name="t" rows="3" placeholder="Write a few lines about your day" required></textarea><button class="sm">Save entry</button></form>${S.journal.map(e=>`<div class="entry"><small>${esc(e.d)} · ${esc(e.m)}</small><p>${esc(e.t)}</p></div>`).join('')||'<p class="empty">Your entries will appear here.</p>'}`,
()=>`<h3>Settings</h3><p class="sub">Your data is saved only in this browser.</p><div class="box" style="margin-bottom:14px"><h4>Account</h4>${cu()?`<p class="gap">Logged in as ${esc(cu().email)}.</p><button class="chip" data-a="tab" data-t="9">Open profile</button>`:'<p class="gap">You are using a guest session.</p><button class="chip" data-a="authin">Log in</button>'}</div>
 <div class="box" style="margin-bottom:14px"><h4>Appearance</h4><button class="chip on" data-a="theme">Switch to ${S.theme==='dark'?'light':'dark'} theme</button></div><div class="box" style="margin-bottom:14px"><h4>Data</h4><button class="chip" data-a="reset">Reset demo data</button> <button class="chip" data-a="clear">Clear everything</button></div><p class="note">AI assistant: ${AI?'connected (Claude)':'demo mode, local rules only'}.</p>${SAMPLE?'':`<div class="box" style="margin-top:14px"><h4>Connect your own AI key</h4><p class="gap">Optional, for the downloaded file. Your Anthropic API key is stored only in this browser and sent only to Anthropic. Anyone using this browser profile could read it, so use a limited key and never share a copy of the page with a key saved.</p>${KEY?'<button class="chip" data-a="rmkey">Remove saved key</button>':'<form class="add" data-f="key"><input type="password" name="k" placeholder="sk-ant-..." aria-label="Anthropic API key" autocomplete="off" required><button class="sm">Save key</button></form>'}</div>`}`];
const PERSON='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>';
const avHTML=()=>{const u=cu();return u?(u.photo?`<img src="${u.photo}" alt="">`:esc((u.name||'?').charAt(0).toUpperCase())):PERSON};
function profUpd(){const b=$('#avb'),u=cu();if(!b)return;b.innerHTML=avHTML();b.title=u?u.name:'Log in or sign up';$('#hauth').textContent=u?'Log out':'Log in'}
const PROF=()=>{const u=cu();return `<div class="prof in" role="button" tabindex="0" data-a="openprof" aria-label="Profile"><span class="av">${avHTML()}</span><span><b>${u?esc(u.name):'Guest'}</b><small>${u?'View profile':'Log in to save your data'}</small></span></div>`};
function popHTML(){const u=cu(),c='style="text-align:center"';return u?`<div class="pav">${avHTML()}</div><b ${c}>${esc(u.name)}</b><small ${c}>${esc(u.email)}</small><button type="button" class="sm" id="pprof">My profile</button><button type="button" class="chip" id="pout">Log out</button>`:`<div class="pav">${PERSON}</div><b ${c}>You are using a guest session</b><small ${c}>Log in to keep your data in your own account.</small><button type="button" class="sm" id="pin">Log in</button><button type="button" class="chip" id="pup">Sign up</button>`}
function openPop(){$('#pop').innerHTML=popHTML();$('#pop').classList.add('open');$('#avb').setAttribute('aria-expanded','true')}
function closePop(){$('#pop').classList.remove('open');$('#avb').setAttribute('aria-expanded','false')}
let AM='in';
function openAuth(m){AM=m;const f=$('#af');closePop();$('.mbox').classList.toggle('up',m==='up');$('#amt').textContent=m==='up'?'Create your account':'Welcome back';$('#asub').textContent=m==='up'?'Sign up':'Log in';$$('#amode .chip').forEach(c=>c.classList.toggle('on',c.dataset.m===m));$('#aerr').textContent='';f.reset();f.p.autocomplete=m==='up'?'new-password':'current-password';$('#auth').classList.add('open');setTimeout(()=>f[m==='up'?'n':'e'].focus(),50)}
const closeAuth=()=>$('#auth').classList.remove('open');
function logout(){SID=null;wr(SK,null);loadS();S.tab=0;closePop();applyTheme();render(1);toast('You have been logged out')}
$('#af').addEventListener('submit',async e=>{e.preventDefault();const f=e.target,er=$('#aerr'),n=f.n.value.trim(),em=f.e.value.trim().toLowerCase(),p=f.p.value;
 if(AM==='up'&&n.length<2)return er.textContent='Please enter your name (at least 2 letters).';
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return er.textContent='Please enter a valid email address.';
 if(p.length<6)return er.textContent='Password must be at least 6 characters.';
 if(AM==='up'){if(USERS.some(u=>u.email===em))return er.textContent='An account with this email already exists. Try logging in.';
  const salt=Math.random().toString(36).slice(2),u={id:'u'+Date.now(),name:n,email:em,salt,hash:await hash(p,salt),bio:'',photo:'',joined:T0()};USERS.push(u);wr(UK,USERS);SID=u.id;wr(SK,SID);loadS();S.tab=0;toast('Account created. Welcome, '+n)}
 else{const u=USERS.find(x=>x.email===em);if(!u||u.hash!==await hash(p,u.salt))return er.textContent='Incorrect email or password.';SID=u.id;wr(SK,SID);loadS();toast('Welcome back, '+u.name)}
 closeAuth();applyTheme();render(1)});
$('#amode').addEventListener('click',e=>{const c=e.target.closest('.chip');if(c)openAuth(c.dataset.m)});
$('#aclose').onclick=closeAuth;$('#auth').addEventListener('click',e=>{if(e.target.id==='auth')closeAuth()});
$('#hauth').onclick=()=>cu()?logout():openAuth('in');
$('#avb').onclick=e=>{e.stopPropagation();$('#pop').classList.contains('open')?closePop():openPop()};
$('#pop').addEventListener('click',e=>{const id=e.target.id;if(id==='pin')openAuth('in');else if(id==='pup')openAuth('up');else if(id==='pprof'){closePop();S.tab=9;save();render(1);$('#try').scrollIntoView({behavior:'smooth'})}else if(id==='pout')logout()});
document.addEventListener('click',e=>{const p=$('#pop');if(!p.classList.contains('open')||p.contains(e.target)||e.target.closest('#avb'))return;closePop()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePop();closeAuth()}if((e.key==='Enter'||e.key===' ')&&e.target.dataset&&e.target.dataset.a==='openprof'){e.preventDefault();e.target.click()}});
V[9]=()=>{const u=cu();if(!u)return `<h3>Profile</h3><p class="sub">You are using a guest session.</p><div class="box"><h4>Log in to keep your data</h4><p class="gap">Create an account to save your tasks, goals and habits under your own name on this device.</p><div class="chips" style="justify-content:start"><button class="chip on" data-a="authin">Log in</button><button class="chip" data-a="authup">Sign up</button></div></div>`;
 const l=life(),dn=S.tasks.filter(t=>t.done).length;
 return `<h3>My profile</h3><p class="sub">Member since ${esc(u.joined)}</p>
 <div class="two"><div class="box" style="text-align:center"><div class="pav" style="width:110px;height:110px;font-size:44px">${avHTML()}</div><div class="prow" style="margin-top:12px"><button class="chip" data-a="photo">${u.photo?'Change photo':'Upload photo'}</button>${u.photo?'<button class="x" data-a="rmphoto">Remove</button>':''}</div><input type="file" id="pfile" accept="image/*" hidden></div>
 <div class="box"><h4>Your stats</h4><div class="lrow"><span>Life score</span><b>${l.s}</b></div><div class="lrow"><span>Tasks done</span><b>${dn}</b></div><div class="lrow"><span>Goals</span><b>${S.goals.length}</b></div><div class="lrow"><span>Focus minutes</span><b>${fsum(()=>1)}</b></div></div></div>
 <form class="add" data-f="prof" style="margin-top:14px"><input name="n" value="${esc(u.name)}" maxlength="30" aria-label="Name" required><input value="${esc(u.email)}" disabled aria-label="Email"><textarea name="b" rows="2" maxlength="160" placeholder="About you (optional)" aria-label="About you">${esc(u.bio||'')}</textarea><button class="sm">Save profile</button></form>
 <div class="box" style="margin-bottom:14px"><h4>Change password</h4><form class="add" data-f="pw"><input type="password" name="o" placeholder="Current password" autocomplete="current-password" required><input type="password" name="p" placeholder="New password (6+ characters)" autocomplete="new-password" required><button class="sm">Update</button></form></div>
 <div class="chips" style="justify-content:start"><button class="chip on" data-a="logout">Log out</button><button class="chip" data-a="delacct">Delete account</button></div>`};
$('#appShell').addEventListener('change',e=>{if(e.target.id!=='pfile')return;const f=e.target.files[0],u=cu();if(!f||!u)return;if(!/^image\//.test(f.type)||f.size>8e6)return toast('Choose an image under 8 MB');const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),m=Math.min(im.width,im.height);x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,128,128);u.photo=c.toDataURL('image/jpeg',.82);wr(UK,USERS);render();toast('Photo updated')};im.onerror=()=>toast('Could not read that image');im.src=r.result};r.readAsDataURL(f)});
const RW=['routines','focus','habits','goals','days'];let ri=0;setTimeout(()=>setInterval(()=>{const r=$('#rot');if(!r)return;r.classList.add('out');setTimeout(()=>{ri=(ri+1)%RW.length;r.textContent=RW[ri];r.classList.remove('out')},300)},2200),3600);
/* calendar view */
let CY=new Date().getFullYear(),CMo=new Date().getMonth(),CS=T0();
const PC={4:'var(--clay)',3:'var(--gold)',2:'var(--moss)',1:'var(--sand)'},pad2=n=>String(n).padStart(2,'0');
V[10]=()=>{const first=new Date(CY,CMo,1).getDay(),n=new Date(CY,CMo+1,0).getDate(),pre=`${CY}-${pad2(CMo+1)}-`,td=T0();
 let cells=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="dh">${d}</div>`).join('')+'<button class="em" tabindex="-1" aria-hidden="true"></button>'.repeat(first);
 for(let d=1;d<=n;d++){const ds=pre+pad2(d),ts=S.tasks.filter(t=>t.due===ds),g=S.goals.some(x=>x.target===ds);
  cells+=`<button class="${ds===td?'td ':''}${ds===CS?'sel':''}" data-a="cday" data-d="${ds}" aria-label="${ds}, ${ts.length} tasks"><span>${d}${g?' \u25c6':''}</span><span class="pd">${ts.slice(0,4).map(t=>`<i class="${t.done?'dn':''}" style="--c:${PC[t.pri]}"></i>`).join('')}</span></button>`}
 const day=S.tasks.filter(t=>t.due===CS).sort((a,b)=>(a.time||'99').localeCompare(b.time||'99')),gl=S.goals.filter(g=>g.target===CS),mt=S.tasks.filter(t=>t.due&&t.due.startsWith(pre));
 return `<h3>Calendar</h3><p class="sub">${mt.length} tasks due this month, ${mt.filter(t=>t.done).length} completed. A diamond marks a goal target date.</p>
 <div class="chead"><button class="chip" data-a="cprev" aria-label="Previous month">&lt;</button><h4>${new Date(CY,CMo,1).toLocaleDateString(undefined,{month:'long',year:'numeric'})}</h4><button class="chip" data-a="ctoday">Today</button><button class="chip" data-a="cnext" aria-label="Next month">&gt;</button></div>
 <div class="cal">${cells}</div>
 <div class="box" style="margin-top:14px"><h4>${new Date(CS+'T00:00').toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'})}</h4>
 ${gl.map(g=>`<p class="gap">\u25c6 Goal target: <b>${esc(g.name)}</b></p>`).join('')}
 ${day.map(t=>`<div class="task ${t.done?'d':''}"><button class="chk ${t.done?'d':''}" data-a="tdone" data-i="${t.id}"><s></s><span>${esc(t.t)}${t.time?' \u00b7 '+t.time:''}</span></button><div class="meta"><span class="bd p${t.pri}">${PN[t.pri]}</span><span class="bd">${t.cat}</span></div></div>`).join('')||'<p class="empty">Nothing due on this day.</p>'}
 <form class="add" data-f="caltask"><input name="t" placeholder="Add a task for this day" maxlength="80" required><select name="pri" aria-label="Priority">${[4,3,2,1].map(p=>`<option value="${p}" ${p===2?'selected':''}>${PN[p]}</option>`).join('')}</select><input type="time" name="time" aria-label="Time"><button class="sm">Add</button></form></div>`};
function render(anim){profUpd();$('#side').innerHTML=PROF()+[0,1,2,10,3,4,5,6,7,9,8].map(i=>`<button class="${i===S.tab?'on':''}" data-a="tab" data-t="${i}" role="tab">${TABS[i]}</button>`).join('');const p=$('#pane'),y=scrollY;p.className='pane';
 if(anim){p.style.animation='none';p.offsetHeight;p.style.animation=''}else p.style.animation='none';
 p.innerHTML=V[S.tab]();if(S.tab===2)TL();if(S.tab===1)chatUpd();if(S.tab===5)fUpd();if(!anim)scrollTo(0,y)}
$('#appShell').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,D=b.dataset,id=+D.i;
 switch(a){
 case'tab':S.tab=+D.t;save();render(1);return;
 case'ask':S.tab=1;save();render(1);ask(D.q);return;
 case'tdone':{const t=S.tasks.find(x=>x.id===id);t.done=t.done?0:1;if(t.done)t.at=T0();else delete t.at;toast(t.done?'Task completed':'Task reopened');break}
 case'tdel':S.tasks=S.tasks.filter(t=>t.id!==id);toast('Task deleted');break;
 case'tedit':ED=id;render();$('#tf').scrollIntoView({behavior:'smooth',block:'center'});return;
 case'tcancel':ED=null;render();return;
 case'sched':$('#sch').innerHTML=sched();return;
 case'cprev':CMo--;if(CMo<0){CMo=11;CY--}render();return;
 case'cnext':CMo++;if(CMo>11){CMo=0;CY++}render();return;
 case'ctoday':{const n=new Date();CY=n.getFullYear();CMo=n.getMonth();CS=T0();render();return}
 case'cday':CS=D.d;render();return;
 case'openprof':if(cu()){S.tab=9;save();render(1)}else openAuth('in');return;
 case'authin':openAuth('in');return;
 case'authup':openAuth('up');return;
 case'logout':logout();return;
 case'photo':$('#pfile').click();return;
 case'rmphoto':cu().photo='';wr(UK,USERS);toast('Photo removed');break;
 case'delacct':if(!D.c){b.dataset.c=1;b.textContent='Click again to confirm';return}try{localStorage.removeItem('lifeos-d-'+SID)}catch(x){}USERS=USERS.filter(u=>u.id!==SID);wr(UK,USERS);logout();toast('Account deleted');return;
 case'rmkey':KEY='';try{localStorage.removeItem('lifeos-key')}catch(e){}setAI();toast('Key removed');break;
 case'aisteps':{if(!AI)return;const g=S.goals[D.g];b.disabled=true;b.textContent='Thinking...';
  AI.json(`Suggest 3 to 5 short, concrete next steps (each under 10 words) for this goal. Return only a JSON array of strings.\nGoal: ${g.name}. Now: ${g.cur}. Ideal: ${g.ideal}. Existing steps: ${g.steps.map(s=>s.t).join('; ')||'none'}.`).then(a=>{const n=(Array.isArray(a)?a:[]).filter(x=>typeof x==='string'&&x.trim()).slice(0,5);if(!n.length)throw 0;n.forEach(t=>g.steps.push({t:t.trim().slice(0,100),d:0}));save();toast(n.length+' steps added by AI');render()}).catch(()=>{toast('AI could not suggest steps right now');render()});return}
 case'step':{const s=S.goals[D.g].steps[D.s];s.d=s.d?0:1;break}
 case'delg':S.goals.splice(D.g,1);toast('Goal deleted');break;
 case'hday':{const h=S.habits[D.h];h.days[D.d]=h.days[D.d]?0:1;break}
 case'delh':S.habits.splice(D.h,1);toast('Habit deleted');break;
 case'len':FL=+D.m;left=FL*60;fStop();render();return;
 case'freset':fStop();left=FL*60;render();return;
 case'fgo':if(run)fStop();else run=setInterval(tick,1000);render();return;
 case'mood':$$('#moods .chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');return;
 case'theme':S.theme=S.theme==='dark'?'light':'dark';save();applyTheme();render();return;
 case'reset':if(!D.c){b.dataset.c=1;b.textContent='Click again to confirm';return}{const th=S.theme,nm=S.name;S=seed();S.theme=th;S.name=nm;S.tab=8;ED=null;toast('Demo data restored')}break;
 case'clear':if(!D.c){b.dataset.c=1;b.textContent='Click again to confirm';return}S.tasks=[];S.goals=[];S.habits=[];S.focus=[];S.journal=[];S.chat=[];toast('All data cleared');break}
 save();render()});
$('#appShell').addEventListener('submit',async e=>{e.preventDefault();const f=e.target,k=f.dataset.f;if(!k)return;const v=Object.fromEntries(new FormData(f));
 if(k==='task'){const t=(v.t||'').trim(),eff=parseFloat(v.eff);if(t.length<2)return toast('Please enter a task title');if(!(eff>0&&eff<=24))return toast('Effort must be between 0.25 and 24 hours');const o={t,cat:v.cat,pri:+v.pri,due:v.due,time:v.time,eff};
  if(ED){Object.assign(S.tasks.find(x=>x.id===ED),o);ED=null;toast('Task updated')}else{S.tasks.unshift({id:Date.now(),done:0,...o});toast('Task added')}}
 else if(k==='goal'){if(!v.n.trim()||!v.c.trim()||!v.i.trim())return toast('Please fill in every goal field');S.goals.unshift({id:Date.now(),name:v.n.trim(),cat:v.k,target:v.d,cur:v.c.trim(),ideal:v.i.trim(),steps:[]});toast('Goal added')}
 else if(k==='step'){if(!v.t.trim())return toast('Enter a milestone');S.goals[f.dataset.g].steps.push({t:v.t.trim(),d:0});toast('Milestone added')}
 else if(k==='habit'){if(!v.n.trim())return toast('Enter a habit name');S.habits.push({id:Date.now(),name:v.n.trim(),freq:v.f,days:Array(7).fill(0)});toast('Habit added')}
 else if(k==='jr'){if(!v.t.trim())return toast('Write something first');S.journal.unshift({d:new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}),m:($('#moods .on')||{}).textContent||'Good',t:v.t.trim()});toast('Entry saved')}
 else if(k==='caltask'){const t=(v.t||'').trim();if(t.length<2)return toast('Please enter a task title');S.tasks.unshift({id:Date.now(),t,cat:'Personal',pri:+v.pri,due:CS,time:v.time||'',eff:1,done:0});toast('Task added for '+CS)}
 else if(k==='prof'){const u=cu(),n=v.n.trim();if(n.length<2)return toast('Please enter your name');u.name=n;u.bio=(v.b||'').trim();S.name=n;wr(UK,USERS);toast('Profile saved')}
 else if(k==='pw'){const u=cu();if(await hash(v.o,u.salt)!==u.hash)return toast('Current password is incorrect');if(v.p.length<6)return toast('New password must be 6+ characters');u.hash=await hash(v.p,u.salt);wr(UK,USERS);toast('Password updated')}
 else if(k==='key'){const k2=(v.k||'').trim();if(!/^sk-ant-/.test(k2))return toast('That does not look like an Anthropic API key');KEY=k2;try{localStorage.setItem('lifeos-key',KEY)}catch(e){}setAI();toast('Key saved. AI is on')}
 else if(k==='flen'){const m=parseInt(v.m);if(!(m>=1&&m<=180))return toast('Enter 1 to 180 minutes');FL=m;left=m*60;fStop()}
 else if(k==='chat'){const q=(v.q||'').trim();if(!q)return;f.reset();ask(q);return}
 save();render()});
['input','change'].forEach(ev=>$('#appShell').addEventListener(ev,e=>{if(['q','fl','so'].includes(e.target.id))TL()}));
render(1);
