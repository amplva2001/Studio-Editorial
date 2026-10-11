/* ============ helpers ============ */
function renderReceipt(hl=[], flag=[]){
  document.getElementById('receipt').innerHTML = RECEIPT.map(([id,t])=>{
    if(!t) return '<div class="gap"></div>';
    const cls = ['ln'];
    if(id && hl.includes(id)) cls.push('hl');
    else if(id && flag.includes(id)) cls.push('flag');
    return `<div class="${cls.join(' ')}">${t}</div>`;
  }).join('');
}
function hl(ids){ renderReceipt(ids, flagged()); }
function unhl(){ const f=F1.find(x=>x.id===S[1].open); renderReceipt(f?f.src:[], ['r-mva']); }
function flagged(){ return scenario===1 ? ['r-mva'] : []; }

function meter(work){
  work = Math.max(0, Math.min(100, Math.round(work)));
  const col = work>=60 ? 'var(--green)' : work>=30 ? 'var(--amber)' : 'var(--red)';
  const segs = (v,c)=>Array.from({length:10},(_,i)=>`<span style="${v>i*10?`background:${c}`:''}"></span>`).join('');
  document.getElementById('meter').innerHTML = `
    <div class="mt">Menneskelig tilsyn</div>
    <div class="row"><div class="lab"><span>Ditt arbeid</span><b style="color:${col}">${work}</b></div><div class="segs">${segs(work,col)}</div></div>
    <div class="row"><div class="lab"><span>Ditt ansvar</span><b style="color:var(--teal)">100</b></div><div class="segs">${segs(100,'var(--teal)')}</div></div>
    <div class="note">Arbeid stiger når du selv vurderer. Ansvaret er alltid ditt.</div>`;
}

let menuOpen = false;
function renderSwitch(){
  const I = IDEAS[scenario];
  document.getElementById('switch').innerHTML =
    `<span class="lbl">Scenario</span>` +
    Object.keys(IDEAS).map(Number).sort((a,b)=>a-b).map(n=>`<button class="sc ${n===scenario?'on':''}" title="${n} · ${IDEAS[n].name} · ${IDEAS[n].insp}" onclick="go(${n})"><span class="n">${n}</span>${n===scenario?`${IDEAS[n].name}`:''}</button>`).join('') +
    `<button class="reset" onclick="menuOpen=!menuOpen;renderSwitch()">${menuOpen?'Lukk ▴':'Alle ▾'}</button>` +
    `<button class="reset" onclick="resetCur()">↺ Start på nytt</button>` +
    (menuOpen ? `<div class="menu">${Object.keys(IDEAS).map(Number).sort((a,b)=>a-b).map(n=>
      `<button class="${n===scenario?'on':''}" onclick="menuOpen=false;go(${n})"><span class="n">${n}</span><b>${IDEAS[n].name}</b><em>${IDEAS[n].insp}</em></button>`).join('')}</div>` : '');
  document.getElementById('idea').innerHTML = `<div class="idea-h"><span class="n">${scenario}</span><b>${I.name}</b><em>Inspirasjon: ${I.insp}</em></div>${I.text}`;
}
function go(n){ menuOpen=false; scenario=n; location.hash=n; render(); }
function resetCur(){ const fresh = {...S}; initState(); const keep=S[scenario]; S=fresh; S[scenario]=keep; render(); }
document.addEventListener('keydown',e=>{ if(['1','2','3','4','5','6','7','8','9'].includes(e.key) && !e.target.closest('input,textarea')) go(+e.key); });

function render(){
  renderSwitch();
  document.getElementById('overlay').innerHTML='';
  if(window.stop5) stop5();
  if(window.stopStory) stopStory();
  document.querySelector('.scrim').style.display = (scenario===4||scenario===5||scenario>=9) ? 'none' : '';
  document.getElementById('vs').style.display = (scenario>=11 && scenario!==16) ? '' : 'none';
  document.getElementById('v14').style.display = scenario===16 ? '' : 'none';
  document.getElementById('v9f').style.display = scenario===9 ? '' : 'none';
  document.getElementById('v10f').style.display = scenario===10 ? '' : 'none';
  document.getElementById('v4').style.display = scenario===4 ? '' : 'none';
  document.getElementById('v5').style.display = scenario===5 ? '' : 'none';
  ({1:r1,2:r2,3:r3,4:r4,5:r5,6:r6,7:r7,8:r8,9:r9,10:r10,11:r11,12:r12,13:r13,14:r14,15:r15,16:r16})[scenario]();
}
