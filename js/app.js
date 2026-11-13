function startApp(){
"use strict";
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){const j=JSON.stringify(v);try{if(localStorage.getItem(k)===j)return;localStorage.setItem(k,j)}catch(e){}if(window.Sync)window.Sync.changed(k)}};
const DE={N:"S",B:"L",R:"T",Q:"D",K:"K"};
const de=s=>s.replace(/[NBRQK]/g,c=>DE[c]);
const GL={k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
const FILES="abcdefgh";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// ---------- Opening trees ----------
function parseLine(s){const out=[];const re=/([^\s{]+)(\{([^}]*)\})?/g;let m;while((m=re.exec(s)))out.push({san:m[1],note:m[3]||""});return out}
const OP=OPENINGS.map(o=>{
  const root={san:null,note:"",children:new Map(),lines:[],depth:0};
  o.parsed=o.lines.map(([name,s],li)=>{
    const mv=parseLine(s);let n=root;root.lines.push(li);
    mv.forEach((m,i)=>{let c=n.children.get(m.san);
      if(!c){c={san:m.san,note:m.note,children:new Map(),lines:[],depth:i+1};n.children.set(m.san,c)}
      else if(m.note&&!c.note)c.note=m.note;
      c.lines.push(li);n=c});
    return {name,moves:mv.map(m=>m.san)};
  });
  o.root=root;return o;
});
const byId=Object.fromEntries(OP.map(o=>[o.id,o]));

// ---------- Spaced repetition ----------
let prog=store.get("ot.prog",{});
const INT=[0,10*60e3,24*36e5,3*864e5,7*864e5,21*864e5];
const pk=(o,side,li)=>o.id+"|"+side+"|"+li;
const st=(o,side,li)=>prog[pk(o,side,li)]||{box:0,due:0,ok:0,err:0,seen:0};
function saveSt(o,side,li,s){s.t=Date.now();prog[pk(o,side,li)]=s;store.set("ot.prog",prog)}
function status(s){if(!s.seen&&!s.ok&&!s.err)return["new","neu"];if(s.box>=3)return["ok","sitzt"];if(s.err&&s.box===0)return["err","üben"];return["learn","lernt"]}
function prio(o,side,li){const s=st(o,side,li);const seen=s.seen||s.ok||s.err;return seen?s.due:-1+Math.random()*1e-3}
function chooseLine(o,side,cands){let best=cands[0],bv=Infinity;for(const li of cands){const v=prio(o,side,li)+Math.random()*1000;if(v<bv){bv=v;best=li}}return best}
function mastered(o,side){return o.parsed.filter((_,li)=>st(o,side,li).box>=3).length}

// ---------- Trainer state ----------
const T={op:null,side:"w",mode:"learn",game:null,node:null,path:[],target:0,errors:0,wrong:0,done:false,token:0,last:null,fb:null,showArrow:false,hinted:false,lastNote:"",lastSan:"",lastPly:0};
let sel=null,drag=null,wrongSq=null;

function setOpening(o,side,opts={}){
  T.op=o;T.side=side||o.side;store.set("ot.last",{id:o.id,side:T.side,mode:T.mode});
  renderList();startLine(opts.line,opts.prefix);
}
function startLine(li,prefix){
  const o=T.op;T.token++;T.game=new Chess();T.node=o.root;T.path=[];T.errors=0;T.wrong=0;T.done=false;T.last=null;T.hinted=false;
  T.lastNote="";T.lastSan="";sel=null;
  T.target=(li!=null)?li:chooseLine(o,T.side,o.root.lines);
  if(prefix&&prefix.length){
    for(const san of prefix){const c=T.node.children.get(san);if(!c)break;const r=T.game.move(san);T.node=c;T.path.push(r.san);T.last={from:r.from,to:r.to};T.lastNote=c.note;T.lastSan=r.san}
    if(li==null||!T.node.lines.includes(li))T.target=chooseLine(o,T.side,T.node.lines);
    T.fb={k:"info",t:"Das ist eine Stellung aus deinen Partien. Finde den Theoriezug."};
  }else{
    T.fb={k:"",t:T.mode==="learn"?"Der blaue Pfeil zeigt dir den Theoriezug. Spiele ihn nach und lies die Erklärung.":"Abfrage: Spiele die Theoriezüge ohne Hilfe. Beim zweiten Fehler zeige ich dir die Lösung."};
  }
  renderAll();step();
}
function expected(){const line=T.op.parsed[T.target];return line.moves[T.path.length]}
function applySan(san){const r=T.game.move(san);const c=T.node.children.get(r.san);T.node=c;T.path.push(r.san);T.last={from:r.from,to:r.to};T.lastNote=c.note;T.lastSan=r.san;T.lastPly=T.path.length}
function step(){
  if(T.node.children.size===0){finish();return}
  if(T.game.turn()===T.side){T.showArrow=(T.mode==="learn");T.wrong=0;T.hinted=false;renderAll();return}
  const tok=T.token;T.showArrow=false;renderAll();
  setTimeout(()=>{if(tok!==T.token)return;applySan(expected());renderAll();step()},520);
}
function tryMove(from,to){
  if(T.done||T.game.turn()!==T.side)return false;
  const mv=T.game.move({from,to,promotion:"q"});if(!mv)return false;
  T.game.undo();
  const child=T.node.children.get(mv.san);
  if(child){
    const wasClean=T.wrong===0&&!T.hinted;
    applySan(mv.san);
    if(!child.lines.includes(T.target))T.target=chooseLine(T.op,T.side,child.lines);
    T.fb={k:"good",t:"<b>"+(wasClean?"Richtig":"Jetzt stimmt's")+":</b> "+esc(moveLabel(mv.san,T.path.length-1))};
    T.showArrow=false;renderAll();step();
  }else{
    T.wrong++;if(T.wrong===1&&!T.hinted)T.errors++;
    wrongSq=to;setTimeout(()=>{wrongSq=null;renderBoard()},1000);
    const exp=expected();
    if(T.mode==="learn"||T.wrong>=2){T.showArrow=true;T.fb={k:"bad",t:"<b>"+esc(de(mv.san))+"</b> ist hier nicht der Theoriezug. Richtig ist <b>"+esc(de(exp))+"</b>."+(childNote(exp)?" "+esc(childNote(exp)):"")}}
    else T.fb={k:"bad",t:"<b>"+esc(de(mv.san))+"</b> ist nicht der Theoriezug. Versuch es noch einmal."};
    renderAll();
  }
  return true;
}
function childNote(san){const c=T.node.children.get(san);return c?c.note:""}
function hint(){if(T.done||T.game.turn()!==T.side)return;if(T.mode==="quiz"&&!T.hinted&&T.wrong===0)T.errors++;T.hinted=true;T.showArrow=true;
  T.fb={k:"info",t:"Theoriezug: <b>"+esc(de(expected()))+"</b>"};renderAll()}
function finish(){
  T.done=true;const o=T.op,li=T.target;const s={...st(o,T.side,li)};s.seen=1;
  if(T.mode==="quiz"){if(T.errors===0){s.box=Math.min(s.box+1,5);s.ok++}else{s.box=0;s.err++}s.due=Date.now()+INT[s.box]}
  else if(!s.due)s.due=Date.now();
  saveSt(o,T.side,li,s);
  const allSeen=o.parsed.every((_,i)=>st(o,T.side,i).seen);
  let t;
  if(T.mode==="quiz")t=T.errors===0?"<b>Fehlerfrei!</b> Die Variante wandert eine Stufe nach oben ("+s.box+"/5). Sie kommt später zur Wiederholung.":"<b>Variante geschafft, mit "+T.errors+" Fehler"+(T.errors>1?"n":"")+".</b> Sie kommt bald noch einmal dran.";
  else t="<b>Variante durchgespielt.</b> "+(allSeen?"Du hast alle Varianten gesehen. Wechsle zu <b>Abfragen</b>, um sie zu festigen.":"Weiter mit der nächsten Variante.");
  T.fb={k:"good",t};renderAll();renderList();
}

// ---------- Board ----------
const boardEl=$("board");const sqEls={};
(function buildBoard(){for(let i=0;i<64;i++){const d=document.createElement("div");d.className="sq";boardEl.appendChild(d)}
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("class","arrows");svg.setAttribute("viewBox","0 0 8 8");svg.innerHTML='<defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--hint)"/></marker></defs><g id="arrowG"></g>';boardEl.appendChild(svg)})();
function sqAt(idx){const r=Math.floor(idx/8),c=idx%8;return T.side==="w"?FILES[c]+(8-r):FILES[7-c]+(r+1)}
function xy(sq){const f=FILES.indexOf(sq[0]),r=+sq[1];return T.side==="w"?[f+.5,8-r+.5]:[7-f+.5,r-1+.5]}
function renderBoard(){
  const cells=boardEl.querySelectorAll(".sq");const targets=new Set();
  if(sel&&T.game)T.game.moves({square:sel,verbose:true}).forEach(m=>targets.add(m.to));
  cells.forEach((el,i)=>{const sq=sqAt(i);const f=FILES.indexOf(sq[0]),r=+sq[1];const light=(f+r)%2===1;
    let cls="sq "+(light?"l":"d");
    if(T.last&&(sq===T.last.from||sq===T.last.to))cls+=" last";
    if(sq===sel)cls+=" sel";if(sq===wrongSq)cls+=" wrong";if(drag&&drag.sq===sq)cls+=" hide";
    el.className=cls;el.dataset.sq=sq;
    const p=T.game?T.game.get(sq):null;let h="";
    const rowIdx=Math.floor(i/8),colIdx=i%8;
    if(colIdx===0)h+='<span class="co r">'+sq[1]+'</span>';
    if(rowIdx===7)h+='<span class="co f">'+sq[0]+'</span>';
    if(p)h+='<span class="pc '+p.color+'">'+GL[p.type]+'︎</span>';
    if(targets.has(sq))h+=p?'<span class="ring"></span>':'<span class="dot"></span>';
    el.innerHTML=h;});
  const g=boardEl.querySelector("#arrowG");g.innerHTML="";
  if(T.showArrow&&!T.done&&T.game.turn()===T.side){const san=expected();const tmp=new Chess(T.game.fen());const m=tmp.move(san);
    if(m){const[a,b]=xy(m.from),[c,d]=xy(m.to);const dx=c-a,dy=d-b,L=Math.hypot(dx,dy);const ex=c-dx/L*.32,ey=d-dy/L*.32;
      g.innerHTML='<line x1="'+a+'" y1="'+b+'" x2="'+ex+'" y2="'+ey+'" stroke="var(--hint)" stroke-width=".17" stroke-linecap="round" opacity=".85" marker-end="url(#ah)"/>'}}
}
function sqFromPoint(x,y){const r=boardEl.getBoundingClientRect();if(x<r.left||y<r.top||x>=r.right||y>=r.bottom)return null;
  const c=Math.floor((x-r.left)/r.width*8),rw=Math.floor((y-r.top)/r.height*8);return sqAt(rw*8+c)}
function canAct(){return T.game&&!T.done&&T.game.turn()===T.side}
boardEl.addEventListener("pointerdown",e=>{
  const sq=sqFromPoint(e.clientX,e.clientY);if(!sq)return;e.preventDefault();
  if(sel&&sel!==sq){const ok=tryMove(sel,sq);if(ok){sel=null;renderBoard();return}}
  const p=T.game.get(sq);
  if(p&&p.color===T.side&&canAct()){sel=sq;drag={sq,id:e.pointerId,moved:false};
    const gh=document.createElement("span");gh.className="pc ghost "+p.color;gh.textContent=GL[p.type]+"︎";gh.id="ghost";
    const r=boardEl.getBoundingClientRect();gh.style.left=(e.clientX-r.left)+"px";gh.style.top=(e.clientY-r.top)+"px";gh.style.display="none";boardEl.appendChild(gh);
    try{boardEl.setPointerCapture(e.pointerId)}catch(_){}}
  else sel=null;
  renderBoard();
});
boardEl.addEventListener("pointermove",e=>{if(!drag)return;const gh=$("ghost");if(!gh)return;const r=boardEl.getBoundingClientRect();
  drag.moved=true;gh.style.display="";gh.style.left=(e.clientX-r.left)+"px";gh.style.top=(e.clientY-r.top)+"px";
  const cell=boardEl.querySelector('[data-sq="'+drag.sq+'"]');if(cell&&!cell.classList.contains("hide"))cell.classList.add("hide")});
function endDrag(e){if(!drag)return;const gh=$("ghost");if(gh)gh.remove();const from=drag.sq;const moved=drag.moved;drag=null;
  const to=sqFromPoint(e.clientX,e.clientY);if(moved&&to&&to!==from){if(tryMove(from,to))sel=null}renderBoard()}
boardEl.addEventListener("pointerup",endDrag);boardEl.addEventListener("pointercancel",e=>{const gh=$("ghost");if(gh)gh.remove();drag=null;renderBoard()});

// ---------- Coach panel ----------
function moveLabel(san,ply){return (ply%2===0?(ply/2+1)+". ":(Math.floor(ply/2)+1)+"… ")+de(san)}
function fmtSeq(sans,start=0){let s="";sans.forEach((m,i)=>{const p=start+i;if(p%2===0)s+=(p/2+1)+"."+de(m)+" ";else s+=(i===0?(Math.floor(p/2)+1)+"…":"")+de(m)+" "});return s.trim()}
function renderCoach(){
  const o=T.op;$("cEco").textContent=o.eco+" · "+(T.side==="w"?"du spielst Weiß":"du spielst Schwarz");
  $("cName").textContent=o.name;$("cLine").textContent="Variante: "+o.parsed[T.target].name;
  const fb=$("cFb");fb.className="fb "+(T.fb?T.fb.k:"");fb.innerHTML=T.fb?T.fb.t:"";
  let note="";
  if(T.lastSan&&T.lastNote)note='<span class="lbl">Zu '+esc(moveLabel(T.lastSan,T.path.length-1))+'</span>'+esc(T.lastNote);
  if(T.showArrow&&!T.done&&T.game.turn()===T.side){const n=childNote(expected());if(n)note+=(note?'<div style="height:8px"></div>':"")+'<span class="lbl">Dein nächster Zug: '+esc(de(expected()))+'</span>'+esc(n)}
  $("cNote").innerHTML=note||'<span class="small">Erklärungen erscheinen hier nach jedem wichtigen Zug.</span>';
  let mh="";T.path.forEach((m,i)=>{if(i%2===0)mh+='<span><span class="num">'+(i/2+1)+'.</span> ';mh+='<span class="'+(i===T.path.length-1?"cur":"")+'">'+esc(de(m))+'</span> ';if(i%2===1||i===T.path.length-1)mh+="</span>"});
  $("cMoves").innerHTML=mh||'<span class="small">Noch keine Züge</span>';
  $("cIdeas").innerHTML=o.ideas.map(x=>"<li>"+esc(x)+"</li>").join("");
  $("cLines").innerHTML=o.parsed.map((l,li)=>{const[c,lab]=status(st(o,T.side,li));return '<button data-li="'+li+'" aria-current="'+(li===T.target)+'"><span>'+esc(l.name)+'</span><span class="chip '+c+'">'+lab+'</span></button>'}).join("");
  const s=$("status");const you=canAct();s.className="status "+(T.done?"done":you?"you":"");
  $("statusText").textContent=T.done?"Variante beendet":you?"Du bist am Zug":"Gegner zieht …";
  $("bHint").disabled=!you;
  $("mLearn").setAttribute("aria-pressed",T.mode==="learn");$("mQuiz").setAttribute("aria-pressed",T.mode==="quiz");
  $("sW").setAttribute("aria-pressed",T.side==="w");$("sB").setAttribute("aria-pressed",T.side==="b");
}
$("cLines").addEventListener("click",e=>{const b=e.target.closest("button[data-li]");if(b)startLine(+b.dataset.li)});
function renderAll(){renderBoard();renderCoach()}

// ---------- Opening list ----------
let topGroups=[];
function renderList(){
  const q=$("opSearch").value.trim().toLowerCase();
  const item=(o,side,tag)=>{if(q&&!(o.name+" "+o.eco).toLowerCase().includes(q))return"";
    const m=mastered(o,side),n=o.parsed.length;
    return '<button class="op-item" data-id="'+o.id+'" data-side="'+side+'" aria-current="'+(T.op===o&&T.side===side)+'"><span class="n">'+esc(o.name)+'</span><span class="e">'+esc(o.eco.split(/[ /]/)[0])+'</span>'+(tag?'<span class="tag">'+esc(tag)+'</span>':"")+'<span class="bar"><i style="width:'+(m/n*100)+'%"></i></span></button>'};
  let h="";
  if(topGroups.length){const items=topGroups.map((g,i)=>item(byId[g.opId],g.color,"Platz "+(i+1)+" · "+g.games+" Partien als "+(g.color==="w"?"Weiß":"Schwarz"))).join("");if(items)h+='<div class="grp"><h3>Deine Top 3</h3>'+items+"</div>"}
  const w=OP.filter(o=>o.side==="w").map(o=>item(o,"w")).join(""),b=OP.filter(o=>o.side==="b").map(o=>item(o,"b")).join("");
  if(w)h+='<div class="grp"><h3>Repertoire für Weiß</h3>'+w+"</div>";
  if(b)h+='<div class="grp"><h3>Repertoire für Schwarz</h3>'+b+"</div>";
  $("opList").innerHTML=h||'<p class="small">Keine Eröffnung gefunden.</p>';
  if(T.op)$("pickerLabel").textContent=T.op.name;
}
$("opList").addEventListener("click",e=>{const b=e.target.closest(".op-item");if(!b)return;setOpening(byId[b.dataset.id],b.dataset.side);$("side").classList.remove("open")});
$("opSearch").addEventListener("input",renderList);
$("pickerToggle").addEventListener("click",()=>$("side").classList.toggle("open"));

// ---------- Controls ----------
$("bHint").onclick=hint;
$("bRestart").onclick=()=>startLine(T.target);
$("bNext").onclick=()=>startLine();
$("mLearn").onclick=()=>{T.mode="learn";store.set("ot.last",{id:T.op.id,side:T.side,mode:T.mode});startLine()};
$("mQuiz").onclick=()=>{T.mode="quiz";store.set("ot.last",{id:T.op.id,side:T.side,mode:T.mode});startLine()};
$("sW").onclick=()=>{if(T.side!=="w")setOpening(T.op,"w")};
$("sB").onclick=()=>{if(T.side!=="b")setOpening(T.op,"b")};

// ---------- Tabs ----------
function showTab(t){["train","ana","sync"].forEach(x=>{$("tab-"+x).setAttribute("aria-selected",t===x);$("view-"+x).hidden=t!==x})}
$("tab-train").onclick=()=>showTab("train");$("tab-ana").onclick=()=>showTab("ana");$("tab-sync").onclick=()=>showTab("sync");

// ---------- PGN parsing ----------
function splitPGN(text){return text.replace(/\r/g,"").split(/\n\s*\n(?=\s*\[Event )/).map(s=>s.trim()).filter(s=>s.startsWith("["))}
function parseGame(pgn){
  const H={};pgn.replace(/^\[(\w+)\s+"([^"]*)"\]\s*$/gm,(_,k,v)=>{H[k]=v;return""});
  let mt=pgn.replace(/^\[.*\]\s*$/gm,"").replace(/\{[^}]*\}/g," ").replace(/;[^\n]*/g," ");
  let prev;do{prev=mt;mt=mt.replace(/\([^()]*\)/g," ")}while(mt!==prev);
  mt=mt.replace(/\$\d+/g," ").replace(/\d+\.(\.\.)?/g," ").replace(/(1-0|0-1|1\/2-1\/2|\*)\s*$/," ");
  const toks=mt.split(/\s+/).filter(Boolean);
  const g=new Chess();const sans=[];
  for(const t of toks){if(sans.length>=40)break;const r=g.move(t.replace(/[!?]+$/,""),{sloppy:true});if(!r)break;sans.push(r.san)}
  return {H,sans,plies:toks.length};
}
function tcClass(tc){if(!tc)return"rapid";if(tc.includes("/"))return"daily";const[a,b]=tc.split("+").map(Number);const t=(a||0)+40*(b||0);return t<180?"bullet":t<600?"blitz":"rapid"}
function ccFamily(H){
  let slug=(H.ECOUrl||"").split("/openings/")[1]||"";
  if(!slug)return H.ECO?("ECO "+H.ECO):"Unbekannt";
  const w=slug.split("-");const suf=new Set(["Defense","Game","Opening","Gambit","Attack","System","Countergambit"]);
  let out=[];for(let i=0;i<w.length;i++){out.push(w[i]);if(suf.has(w[i])&&i>0)break}
  let fam=out.join(" ");
  if(/^(Kings Pawn Opening|Queens Pawn Opening|Indian Game|Kings Knight Opening)$/.test(fam)){const rest=w.slice(out.length,out.length+3).filter(x=>!/^\d/.test(x));if(rest.length)fam+=": "+rest.join(" ")}
  return fam.replace(/\bKings\b/g,"King's").replace(/\bQueens\b/g,"Queen's");
}
function classify(sans,color){
  const res=OP.map(o=>{let n=o.root,len=0;for(const s of sans){const c=n.children.get(s);if(!c)break;n=c;len++}return{o,len,node:n}});
  res.forEach(r=>r.score=r.len+(r.o.side===color&&r.len>=3?2:0));
  const max=Math.max(...res.map(r=>r.score));const pool=res.filter(r=>r.score===max);const best=pool[0];
  const chosen=(best.len>=3&&(pool.length===1||best.len>=6))?best:null;
  return {chosen,closest:best.len>=2?best:null};
}
function analyze(texts,user){
  const raw=[];texts.forEach(t=>splitPGN(t).forEach(p=>raw.push(parseGame(p))));
  if(!raw.length)return null;
  let u=(user||"").trim().toLowerCase();
  if(!u){const cnt={};raw.forEach(g=>{[g.H.White,g.H.Black].forEach(n=>{if(n){const k=n.toLowerCase();cnt[k]=(cnt[k]||0)+1}})});u=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0][0]}
  const games=[];
  for(const g of raw){
    const color=(g.H.White||"").toLowerCase()===u?"w":(g.H.Black||"").toLowerCase()===u?"b":null;if(!color||g.sans.length<2)continue;
    const R=g.H.Result;const res=R==="1/2-1/2"?"D":(R==="1-0")===(color==="w")?"W":(R==="1-0"||R==="0-1")?"L":"D";
    const {chosen,closest}=classify(g.sans,color);
    const rec={color,res,tc:tcClass(g.H.TimeControl),plies:g.plies,date:g.H.Date||g.H.UTCDate||""};
    if(chosen){rec.key=chosen.o.id;rec.opId=chosen.o.id;rec.depth=chosen.len;
      const len=chosen.len;
      if(chosen.node.children.size===0)rec.full=1;
      else if(len<g.sans.length){const mover=len%2===0?"w":"b";if(mover===color)rec.dev={path:g.sans.slice(0,len),played:g.sans[len],book:[...chosen.node.children.keys()]};else rec.oppLeft=1}
    }else{rec.key="cc:"+ccFamily(g.H);rec.fam=ccFamily(g.H);rec.opId=closest?closest.o.id:null;rec.depth=0}
    games.push(rec);
  }
  return {user:u,games,at:Date.now()};
}
function group(games){
  const m=new Map();
  for(const g of games){const k=g.key+"|"+g.color;let x=m.get(k);
    if(!x){x={key:g.key,color:g.color,opId:g.opId,label:g.fam||byId[g.opId].name,book:!g.fam,games:0,W:0,D:0,L:0,short:0,depth:0,full:0,devs:new Map()};m.set(k,x)}
    x.games++;x[g.res]++;if(g.res==="L"&&g.plies<=30)x.short++;x.depth+=g.depth||0;if(g.full)x.full++;
    if(g.dev){const dk=g.dev.path.join(" ");let d=x.devs.get(dk);if(!d){d={path:g.dev.path,book:g.dev.book,played:{},count:0};x.devs.set(dk,d)}d.count++;d.played[g.dev.played]=(d.played[g.dev.played]||0)+1}
  }
  return [...m.values()].sort((a,b)=>b.games-a.games);
}

// ---------- Analysis UI ----------
let ANA=store.get("ot.ana",null);let isSample=false;
const pct=(a,b)=>b?Math.round(a/b*100):0;
function renderAna(){
  const res=$("res");
  if(!ANA){res.innerHTML='<div class="panel empty"><h3>Noch keine Partien geladen</h3><p>Lade links deine PGN-Dateien von Chess.com hoch. Die App findet dann deine drei häufigsten Eröffnungen, zeigt deine Bilanz und die Stellungen, in denen du am häufigsten von der Theorie abweichst.</p><p><button class="btn" id="bSample2">Beispieldaten ansehen</button></p></div>';$("bSample2").onclick=loadSample;return}
  const f=$("tcFilter").value;const games=ANA.games.filter(g=>f==="all"||g.tc===f);
  const groups=group(games);
  const W=games.filter(g=>g.res==="W").length,D=games.filter(g=>g.res==="D").length,L=games.filter(g=>g.res==="L").length;
  const devTotal=games.filter(g=>g.dev).length;
  const top=groups.filter(g=>g.opId).slice(0,3);
  topGroups=isSample?[]:groups.filter(g=>g.book).slice(0,3);renderList();
  let h="";
  if(isSample)h+='<div class="banner">Beispieldaten: Das sind erfundene Partien, damit du siehst, wie die Auswertung aussieht. Lade deine eigenen PGN-Dateien hoch, um deine echten Zahlen zu sehen.</div>';
  else h+='<div class="small">Spieler: <b>'+esc(ANA.user)+'</b> · ausgewertet am '+new Date(ANA.at).toLocaleDateString("de-DE")+'</div>';
  if(!games.length){res.innerHTML=h+'<div class="panel empty"><h3>Keine Partien in diesem Filter</h3><p>Wähle eine andere Bedenkzeit.</p></div>';return}
  h+='<div class="kpis"><div class="panel kpi"><div class="v">'+games.length+'</div><div class="k">Partien</div></div><div class="panel kpi"><div class="v">'+pct(W+D/2,games.length)+' %</div><div class="k">Punkte ('+W+' S · '+D+' R · '+L+' N)</div></div><div class="panel kpi"><div class="v">'+(games.reduce((a,g)=>a+(g.depth||0),0)/games.length/2).toFixed(1)+'</div><div class="k">Theoriezüge pro Partie (Ø)</div></div><div class="panel kpi"><div class="v">'+pct(devTotal,games.length)+' %</div><div class="k">Partien, in denen du zuerst abweichst</div></div></div>';
  h+='<div><h2 style="font-size:1.25rem;margin-bottom:10px">Deine Top 3 Eröffnungen</h2><div class="top3">';
  top.forEach((g,i)=>{
    const o=byId[g.opId];const devs=[...g.devs.values()].sort((a,b)=>b.count-a.count);const d=devs[0];
    h+='<div class="panel tc"><div class="rank">Platz '+(i+1)+' · '+g.games+' Partien</div><h3>'+esc(g.label)+'</h3><div class="col">als '+(g.color==="w"?"Weiß":"Schwarz")+(g.book?"":" · trainiert mit: "+esc(o.name))+'</div>';
    h+='<div class="wdl"><i class="w" style="width:'+pct(g.W,g.games)+'%"></i><i class="d" style="width:'+pct(g.D,g.games)+'%"></i><i class="l" style="width:'+pct(g.L,g.games)+'%"></i></div>';
    h+='<div class="stats"><span>Siege</span><b>'+g.W+' ('+pct(g.W,g.games)+' %)</b><span>Niederlagen</span><b>'+g.L+'</b><span>Ø Theoriezüge</span><b>'+(g.depth/g.games/2).toFixed(1)+'</b><span>Schnell verloren (≤15 Züge)</span><b>'+g.short+'</b></div>';
    if(d){const pl=Object.entries(d.played).sort((a,b)=>b[1]-a[1])[0][0];const ply=d.path.length;
      h+='<div class="dev"><span class="lbl">Häufigste Abweichung ('+d.count+'×)</span>Nach <span class="mv">'+esc(fmtSeq(d.path)||"Start")+'</span> spielst du <b class="mv">'+esc(moveLabel(pl,ply))+'</b>, Theorie ist <b class="mv">'+esc(d.book.map(b=>de(b)).join(" / "))+'</b>.</div>'}
    else if(g.book)h+='<div class="dev">Keine typische Abweichung gefunden. Gut so!</div>';
    h+='<div class="acts"><button class="btn primary" data-train="'+g.opId+'" data-side="'+g.color+'">Training starten</button>'+(d?'<button class="btn" data-drill="'+i+'">Stellung üben</button>':"")+'</div></div>';
  });
  h+='</div></div>';
  h+='<div><h2 style="font-size:1.25rem;margin-bottom:10px">Alle Eröffnungen</h2><div class="panel tbl-wrap"><table><thead><tr><th>Eröffnung</th><th>Farbe</th><th class="num">Partien</th><th class="num">S</th><th class="num">R</th><th class="num">N</th><th class="num">Punkte</th><th class="num">Ø Theorie</th><th></th></tr></thead><tbody>';
  groups.forEach(g=>{h+='<tr><td>'+esc(g.label)+'</td><td>'+(g.color==="w"?"Weiß":"Schwarz")+'</td><td class="num">'+g.games+'</td><td class="num">'+g.W+'</td><td class="num">'+g.D+'</td><td class="num">'+g.L+'</td><td class="num">'+pct(g.W+g.D/2,g.games)+' %</td><td class="num">'+(g.depth/g.games/2).toFixed(1)+'</td><td>'+(g.opId?'<button class="btn" style="padding:3px 10px" data-train="'+g.opId+'" data-side="'+g.color+'">Üben</button>':"")+'</td></tr>'});
  h+='</tbody></table></div><p class="small">„Ø Theorie“ zählt, wie viele Züge die Partie im Schnitt der Theorie in diesem Trainer folgt. Eröffnungen ohne eigenes Kapitel stehen mit ihrem Chess.com-Namen da und werden mit der ähnlichsten Eröffnung trainiert.</p></div>';
  res.innerHTML=h;
  res.querySelectorAll("[data-train]").forEach(b=>b.onclick=()=>{setOpening(byId[b.dataset.train],b.dataset.side);showTab("train")});
  res.querySelectorAll("[data-drill]").forEach(b=>b.onclick=()=>{const g=top[+b.dataset.drill];const d=[...g.devs.values()].sort((a,b)=>b.count-a.count)[0];setOpening(byId[g.opId],g.color,{prefix:d.path});showTab("train")});
}
$("tcFilter").onchange=renderAna;
function runAnalysis(texts){
  const r=analyze(texts,$("uName").value);
  if(!r||!r.games.length){$("anaMsg").textContent=r?"Keine Partien mit diesem Benutzernamen gefunden. Prüfe die Schreibweise.":"In der Eingabe wurden keine PGN-Partien gefunden.";return}
  ANA=r;isSample=false;store.set("ot.ana",ANA);store.set("ot.user",$("uName").value);
  $("anaMsg").textContent=r.games.length+" Partien ausgewertet.";renderAna();
}
$("bAnalyze").onclick=()=>{const t=$("pgnText").value;if(!t.trim()&&!pendingFiles.length){$("anaMsg").textContent="Lade zuerst PGN-Dateien hoch oder füge PGN-Text ein.";return}runAnalysis([t,...pendingFiles])};
let pendingFiles=[];
function readFiles(list){const fs=[...list];if(!fs.length)return;Promise.all(fs.map(f=>f.text())).then(txts=>{pendingFiles=txts;$("anaMsg").textContent=fs.length+" Datei(en) geladen.";runAnalysis([$("pgnText").value,...pendingFiles])})}
$("fileIn").onchange=e=>readFiles(e.target.files);
const drop=$("drop");["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("over")}));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("over")}));
drop.addEventListener("drop",e=>readFiles(e.dataTransfer.files));
function renderLinks(){const u=$("uName").value.trim();const box=$("dlLinks");if(!u){box.innerHTML="";return}
  const now=new Date();let h='<a href="https://www.chess.com/games/archive/'+encodeURIComponent(u)+'" target="_blank" rel="noopener">Archiv</a>';
  for(let i=0;i<6;i++){const d=new Date(now.getFullYear(),now.getMonth()-i,1);const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0");
    h+='<a href="https://api.chess.com/pub/player/'+encodeURIComponent(u.toLowerCase())+'/games/'+y+'/'+m+'/pgn" target="_blank" rel="noopener">'+m+'/'+y+'</a>'}
  box.innerHTML=h}
$("uName").addEventListener("input",renderLinks);

// ---------- Sample data ----------
function loadSample(){
  const plan=[["italian","w",13],["scandi","b",8],["london","w",6],["twoknights","b",5],["sicilian","b",4],["qg","w",3],["scholar","b",3],["french","b",2]];
  const games=[];let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
  for(const[id,color,n] of plan){const o=byId[id];
    for(let k=0;k<n;k++){const line=o.parsed[Math.floor(rnd()*o.parsed.length)].moves;
      let sans=line.slice();if(rnd()<.6){const myPlies=line.map((_,i)=>i).filter(i=>(i%2===0)===(color==="w")&&i>=2);const cut=myPlies[Math.floor(rnd()*myPlies.length)]||line.length;
        const g=new Chess();for(let i=0;i<cut;i++)g.move(line[i]);const legal=g.moves().filter(m=>m!==line[cut]);sans=line.slice(0,cut).concat(legal.length?[legal[Math.floor(rnd()*legal.length)]]:[])}
      const {chosen}=classify(sans,color);const r=rnd();const res=r<.45?"W":r<.53?"D":"L";
      const rec={color,res,tc:rnd()<.6?"blitz":"rapid",plies:20+Math.floor(rnd()*70),date:""};
      if(chosen){rec.key=rec.opId=chosen.o.id;rec.depth=chosen.len;if(chosen.len<sans.length){const mover=chosen.len%2===0?"w":"b";if(mover===color)rec.dev={path:sans.slice(0,chosen.len),played:sans[chosen.len],book:[...chosen.node.children.keys()]}}}
      else{rec.key="cc:Sonstige";rec.fam="Sonstige";rec.opId=null;rec.depth=0}
      games.push(rec)}}
  ANA={user:"beispiel",games,at:Date.now()};isSample=true;renderAna();
}
$("bSample").onclick=loadSample;

// ---------- Boot ----------
$("uName").value=store.get("ot.user","")||"";renderLinks();
renderAna();
const last=store.get("ot.last",null);
if(last&&last.mode)T.mode=last.mode;
let startOp=byId.italian,startSide="w";
if(topGroups.length){startOp=byId[topGroups[0].opId];startSide=topGroups[0].color}
if(last&&byId[last.id]){startOp=byId[last.id];startSide=last.side}
setOpening(startOp,startSide);

// ---------- GitHub-Speicherung ----------
const SY=window.Sync;
function showSyncMsg(k,t){const m=$("gMsg");m.hidden=!t;m.className="fb "+k;m.textContent=t||""}
if(SY){
  $("gRepo").value=SY.cfg.repo;$("gBranch").value=SY.cfg.branch;$("gToken").value=SY.cfg.token?"••••••••":"";
  SY.onState(s=>{const c=$("syncChip");c.dataset.kind=s.kind;$("syncText").textContent=s.text;if(s.kind==="error")showSyncMsg("bad",s.text)});
  SY.onMerged(()=>{prog=store.get("ot.prog",{});ANA=store.get("ot.ana",ANA);isSample=false;renderAna();renderList();renderCoach()});
  $("gConnect").onclick=async()=>{const tok=$("gToken").value.trim();
    if(!tok||tok.startsWith("•")&&!SY.cfg.token){showSyncMsg("bad","Füge zuerst deinen GitHub-Token ein.");return}
    showSyncMsg("info","Verbinde …");
    await SY.connect($("gRepo").value,$("gBranch").value,tok.startsWith("•")?SY.cfg.token:tok);
    $("gToken").value=SY.cfg.token?"••••••••":"";
    if(SY.state.kind!=="error")showSyncMsg("good","Verbunden. Dein Fortschritt wird ab jetzt automatisch in "+SY.cfg.repo+" (Branch "+SY.cfg.branch+") gespeichert.")};
  $("gSaveNow").onclick=async()=>{if(!SY.cfg.token){showSyncMsg("bad","Du bist noch nicht verbunden.");return}await SY.save();if(SY.state.kind==="ok")showSyncMsg("good","Gespeichert.")};
  $("gDisconnect").onclick=()=>{SY.disconnect();$("gToken").value="";showSyncMsg("info","Getrennt. Der Token wurde aus diesem Browser gelöscht. Dein Fortschritt bleibt auf diesem Gerät erhalten.")};
  $("syncChip").onclick=()=>showTab("sync");
}else $("syncChip").hidden=true;
}
(window.Sync?window.Sync.ready:Promise.resolve()).then(startApp,startApp);
