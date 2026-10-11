/* ============ SCENARIO 5: Teamet ============
   Én oppgave vist som en samtale i et team: deg, en kollega, regnskapsføreren og Taki (AI).
   a    = aktør: you, col (kollega), ai (Taki), acct (regnskapsfører)
   k    = type: did, suggest, ask, decide, check, sign
   x, y = plassering på lerretet (x i %, y i px) – flytt fritt for å endre formen
   to   = tekst på pilen videre til neste steg
   w    = hvor mye arbeid steget var (brukes til prosentene) */

const P5 = {
  you:  {name:'Christopher',  role:'Deg · daglig leder',   human:true,  color:'#2f8a5b', init:'C'},
  col:  {name:'Sara Nilsen',  role:'Kollega',              human:true,  color:'#c4692e', init:'S'},
  ai:   {name:'Taki',         role:'AI-kollega',           human:false, color:'#7a6fd0', init:'✦'},
  acct: {name:'Mandora TEST', role:'Regnskapsfører',       human:true,  color:'#2c6fbb', init:'M'},
};
/* soner på lerretet (x og w i %, y og h i px) – flytt dem for å endre formen */
const Z5 = {
  col:  {x:0,  y:0,   w:46, h:150, note:'kan ikke godkjenne'},
  you:  {x:44, y:0,   w:56, h:160, note:'signerer og står ansvarlig'},
  ai:   {x:3,  y:138, w:72, h:150, note:'forbereder – kan ikke stå ansvarlig'},
  acct: {x:48, y:262, w:52, h:150, note:'faglig kontroll'},
};
const K5 = {
  did:    {t:'Utførte',   c:'#efeae4', f:'#5b5249'},
  suggest:{t:'Forslag',   c:'#ece8f9', f:'#5a4fb0'},
  ask:    {t:'Spørsmål',  c:'#fdf1dc', f:'#a86a10'},
  answer: {t:'Svar',      c:'#fdf1dc', f:'#a86a10'},
  decide: {t:'Beslutning',c:'#e2f1e8', f:'#2f8a5b'},
  check:  {t:'Kontroll',  c:'#e4eefa', f:'#2c6fbb'},
  sign:   {t:'Signerte',  c:'#1d1a17', f:'#ffffff'},
};

const FLOWS5 = {
  kvitt:{title:'Kvittering #51', sub:'Kaffebrenneriet Kristiansand AS · 303 kr', steps:[
    {a:'col', k:'did',     t:'09:40', x:2,  y:34,  w:1, h:'Kjøpte kaffe og lastet opp kvitteringen', d:'«Fredagskaffe til teamet.»', to:'leser'},
    {a:'ai',  k:'did',     t:'09:43', x:9,  y:178, w:2, h:'Leste kvitteringen', d:'Fant leverandør, dato, 2 varer og 303 kr.', to:'foreslår'},
    {a:'ai',  k:'suggest', t:'09:43', x:28, y:214, w:1, h:'Foreslo konto 5990, mva 0 kr', d:'Usikker på mva (48 %) – kan ikke se formålet på kvitteringen.', to:'ber om godkjenning'},
    {a:'you', k:'ask',     t:'10:01', x:47, y:22,  w:1, h:'Spurte Sara hva kjøpet var til', d:'«Var dette til kunder eller til oss?»', to:'spør'},
    {a:'col', k:'answer',  t:'10:05', x:24, y:62,  w:1, h:'Svarte: bare til teamet', d:'«Ingen kunder, bare oss på fredagsmøtet.»', to:'svarer'},
    {a:'you', k:'ask',     t:'10:07', x:63, y:96,  w:1, h:'Spurte regnskapsfører om mva', d:'«Får vi fradrag for mva på kaffe til teamet?»', to:'spørsmål'},
    {a:'acct',k:'decide',  t:'13:20', x:56, y:300, w:2, h:'Svarte: ingen fradrag', d:'Velferd for ansatte gir ikke fradrag. 0 kr er riktig.', to:'svar'},
    {a:'you', k:'sign',    t:'13:25', x:82, y:34,  w:1, h:'Signerte kvitteringen', d:'Med Saras forklaring og regnskapsførerens svar lagret på bilaget.'},
  ]},
  mva:{title:'Mva-melding 4. termin', sub:'Juli–august 2026 · 12 469 kr å betale', steps:[
    {a:'ai',  k:'did',     t:'09:00', x:3,  y:168, w:6, h:'Samlet 46 bilag', d:'Alle bilag for juli og august.', to:'regner ut'},
    {a:'ai',  k:'suggest', t:'09:01', x:21, y:226, w:2, h:'Regnet ut 12 430 kr', d:'Flagget 3 poster jeg er usikker på.', to:'ber deg se over'},
    {a:'you', k:'decide',  t:'09:30', x:47, y:24,  w:4, h:'Gikk gjennom de 3 postene', d:'Endret én: kaffen var velferd, ikke drift.', to:'retter'},
    {a:'ai',  k:'did',     t:'09:31', x:42, y:186, w:1, h:'Oppdaterte til 12 469 kr', d:'Beløpet økte med 39 kr etter din endring.', to:'sender til kontroll'},
    {a:'acct',k:'check',   t:'13:10', x:60, y:296, w:3, h:'Kontrollerte meldingen', d:'«Mangler kvittering for parkering 12.8.»', to:'ber Sara om kvittering'},
    {a:'col', k:'did',     t:'13:20', x:14, y:30,  w:1, h:'Lastet opp parkeringskvitteringen', d:'Fant den i bilen.', to:'alt er på plass'},
    {a:'you', k:'sign',    t:'13:30', x:80, y:76,  w:1, h:'Sendte til Skatteetaten', d:'Signert med BankID.'},
  ]},
  gpt:{title:'Faktura: ChatGPT Pro', sub:'Utenlandsk leverandør · 1 891,54 kr', steps:[
    {a:'col', k:'did',     t:'14:02', x:3,  y:44,  w:1, h:'Kjøpte ChatGPT Pro til teamet', d:'Brukte firmakortet.', to:'faktura på e-post'},
    {a:'ai',  k:'did',     t:'14:10', x:10, y:200, w:2, h:'Leste fakturaen', d:'Leverandør i USA, betalt i USD.', to:'foreslår'},
    {a:'ai',  k:'suggest', t:'14:10', x:30, y:160, w:1, h:'Foreslo omvendt avgiftsplikt', d:'Konto 6810 Datakostnad, med forklaring.', to:'ber om godkjenning'},
    {a:'you', k:'ask',     t:'14:22', x:50, y:26,  w:1, h:'Leste forklaringen – ble usikker', d:'«Gjelder dette oss, selv om vi er små?»', to:'spør'},
    {a:'acct',k:'decide',  t:'15:40', x:62, y:292, w:2, h:'Bekreftet forslaget', d:'Riktig for tjenester kjøpt fra utlandet.', to:'bekreftet'},
    {a:'you', k:'sign',    t:'15:45', x:81, y:90,  w:1, h:'Godkjente fakturaen', d:'Med regnskapsførerens svar lagret på bilaget.'},
  ]},
};

let play5 = null;
function stop5(){ if(play5){ clearInterval(play5); play5=null; } if(S[5]) S[5].play=null; }
function start5(){
  stop5();
  const n = FLOWS5[S[5].flow].steps.length;
  S[5].play = 0; S[5].sel = 0; r5();
  play5 = setInterval(()=>{
    S[5].play++; S[5].sel = S[5].play;
    if(S[5].play >= n-1){ clearInterval(play5); play5=null; S[5].play=null; }
    r5();
  }, 1100);
}

function av5(a, size=34){
  const p = P5[a];
  return p.human
    ? `<span class="av5 h" style="width:${size}px;height:${size}px;background:${p.color}">${p.init}</span>`
    : `<span class="av5 ai" style="width:${size}px;height:${size}px">${p.init}</span>`;
}

function r5(){
  const st = S[5];
  const f = FLOWS5[st.flow];
  const shown = i => st.play===null || i <= st.play;

  // shares
  const tot = {you:0, col:0, ai:0, acct:0};
  f.steps.forEach(s=>tot[s.a]+=s.w);
  const sum = Object.values(tot).reduce((a,b)=>a+b,0);
  const pct = k=>Math.round(tot[k]/sum*100);
  meter(pct('you'));

  const signer = f.steps.find(s=>s.k==='sign');
  const checker = f.steps.find(s=>s.a==='acct');

  const nodes = f.steps.map((s,i)=>{
    const p = P5[s.a], k = K5[s.k];
    const tilt = [-.8,.6,-.4,.9,-.6,.5][i%6];
    return `<div class="n5 ${p.human?'hum':'aiN'} ${s.a} ${st.sel===i?'sel':''} ${shown(i)?'':'hid'}" id="n5-${i}"
      style="left:${s.x}%;top:${s.y}px;--tilt:${tilt}deg" onclick="S[5].sel=${i};r5()">
      <div class="n5-top">${av5(s.a,26)}<span class="n5-who">${p.name.split(' ')[0]}</span><span class="k5" style="background:${k.c};color:${k.f}">${k.t}</span></div>
      <div class="n5-h">${s.h}</div>
      <div class="n5-t">${s.t}${p.human?'':' · AI'}</div>
    </div>`;
  }).join('');

  const zones = Object.entries(Z5).map(([k,z])=>`<div class="zone z-${k}" style="left:${z.x}%;top:${z.y}px;width:${z.w}%;height:${z.h}px">
      <div class="wm" style="color:${P5[k].color}">${P5[k].name.split(' ')[0]}<small>${P5[k].role} · ${z.note}</small></div></div>`).join('');

  const transcript = f.steps.map((s,i)=>{
    const p = P5[s.a], k = K5[s.k];
    return `<div class="m5 ${p.human?'':'ai'} ${st.sel===i?'sel':''} ${shown(i)?'':'hid'}" onclick="S[5].sel=${i};r5()">
      ${av5(s.a,30)}
      <div class="m5-b">
        <div class="m5-who"><b>${p.name}</b><span class="role ${s.a}">${p.human?p.role.split(' ·')[0]:'AI'}</span><span class="k5" style="background:${k.c};color:${k.f}">${k.t}</span><span class="tm">${s.t}</span></div>
        <div class="m5-h">${s.h}</div>
        <div class="m5-d">${s.d}</div>
        ${s.a==='ai' && s.k==='suggest' ? '<div class="m5-note">Et forslag fra AI – ikke en beslutning.</div>' : ''}
      </div>
    </div>`;
  }).join('');

  const flowPills = Object.entries(FLOWS5).map(([key,fl])=>
    `<button class="pill ${st.flow===key?'on':''}" onclick="stop5();S[5].flow='${key}';S[5].sel=null;r5()">${fl.title}</button>`).join('');

  document.getElementById('v5').innerHTML = `
    <div class="v5-inner">
      <div class="v5-head">
        <div><h1>${f.title}</h1><div class="small">${f.sub}</div></div>
        <div class="team5">${Object.keys(P5).map(k=>{const n=f.steps.filter(x=>x.a===k).length;return `<div class="tm5 ${n?'':'off'}">${av5(k,40)}<em style="background:${P5[k].color}">${n}</em><span>${P5[k].name.split(' ')[0]}</span></div>`}).join('')}</div>
        <div class="v5-ctrl">${flowPills}<button class="btn" onclick="start5()">▶ Spill av samtalen</button></div>
      </div>
      <div class="canvas5" id="canvas5">${zones}<svg class="edges5" id="edges5"></svg>${nodes}<div class="labels5" id="labels5"></div></div>
      <div class="v5-bottom">
        <div class="card5">
          <div class="c5h"><b>Samtalen</b><span class="small">${f.steps.length} steg · klikk for å se hvor i flyten</span></div>
          <div class="trans5">${transcript}</div>
        </div>
        <div class="card5">
          <div class="c5h"><b>Hvem står for hva</b></div>
          <div class="split" style="height:12px;margin:4px 0 8px">
            <span style="width:${pct('ai')}%;background:${P5.ai.color}"></span>
            <span style="width:${pct('you')}%;background:${P5.you.color}"></span>
            <span style="width:${pct('col')}%;background:${P5.col.color}"></span>
            <span style="width:${pct('acct')}%;background:${P5.acct.color}"></span>
          </div>
          <div class="legend"><span><i style="background:${P5.ai.color}"></i>Taki ${pct('ai')}%</span><span><i style="background:${P5.you.color}"></i>Du ${pct('you')}%</span><span><i style="background:${P5.col.color}"></i>Sara ${pct('col')}%</span><span><i style="background:${P5.acct.color}"></i>Regnskapsfører ${pct('acct')}%</span></div>
          <div class="chain">
            <div class="ch">${av5('you',30)}<div><b>Ansvarlig: Christopher</b><span>${signer?signer.h.toLowerCase():''} kl. ${signer?signer.t:''}</span></div><em class="tg" style="background:#1d1a17;color:#fff">Signerte</em></div>
            ${checker?`<div class="ch">${av5('acct',30)}<div><b>Mandora TEST</b><span>${checker.h.toLowerCase()} – ga faglig støtte</span></div><em class="tg blue">${K5[checker.k].t}</em></div>`:''}
            ${f.steps.some(x=>x.a==='col')?`<div class="ch">${av5('col',30)}<div><b>Sara Nilsen</b><span>kjøpte og forklarte – kan ikke godkjenne selv</span></div><em class="tg" style="background:#fbe9dd;color:#a3521f">Kollega</em></div>`:''}
            <div class="ch">${av5('ai',30)}<div><b>Taki</b><span>forberedte og foreslo – ansvaret ligger hos menneskene</span></div><em class="tg" style="background:#ece8f9;color:#5a4fb0">AI</em></div>
          </div>
        </div>
      </div>
    </div>`;
  requestAnimationFrame(edges5);
}

function edges5(){
  const cv = document.getElementById('canvas5'), svg = document.getElementById('edges5');
  if(!cv || !svg) return;
  const st = S[5], f = FLOWS5[st.flow];
  const R = cv.getBoundingClientRect();
  svg.setAttribute('width', R.width); svg.setAttribute('height', R.height);
  let labels = '';
  let out = `<defs>${Object.entries(P5).map(([k,p])=>`<marker id="ar-${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${p.color}"/></marker>`).join('')}</defs>`;
  for(let i=0;i<f.steps.length-1;i++){
    const a = document.getElementById('n5-'+i).getBoundingClientRect();
    const b = document.getElementById('n5-'+(i+1)).getBoundingClientRect();
    const s = f.steps[i], col = P5[s.a].color;
    const x1 = a.right-R.left, y1 = a.top-R.top + a.height/2;
    const x2 = b.left-R.left - 4, y2 = b.top-R.top + b.height/2;
    const dx = Math.max(50, (x2-x1)*.6);
    const bend = (i%2? 1:-1) * 30;
    const c1x = x1+dx, c1y = y1+bend, c2x = x2-dx, c2y = y2-bend;
    // midpoint of cubic bezier (t=.5)
    const mx = .125*x1+.375*c1x+.375*c2x+.125*x2, my = .125*y1+.375*c1y+.375*c2y+.125*y2;
    const vis = st.play===null || i < st.play;
    const dash = P5[s.a].human ? '' : 'stroke-dasharray="5 5"';
    out += `<path d="M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}" fill="none" stroke="${col}" stroke-width="2" ${dash} opacity="${vis?0.75:0}" marker-end="url(#ar-${s.a})" class="e5"/>`;
    if(s.to && vis) labels += `<span class="el5" style="left:${mx}px;top:${my}px;border-color:${col};color:${col}">${s.to}</span>`;
  }
  svg.innerHTML = out;
  document.getElementById('labels5').innerHTML = labels;
}
window.addEventListener('resize', ()=>{ if(scenario===5) edges5(); });
