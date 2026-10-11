/* ============ SCENARIO 4: Sporet ============
   Ikke en chat, men en tidslinje av oppgaver.
   Hvert steg har en aktør (ai = Taki, you = deg, acct = regnskapsfører)
   og en vekt (w) = omtrent hvor mye arbeid steget var.
   fast = antall sekunder du brukte på å godkjenne (vises hvis du godkjente uten å se). */

const ACTORS = {
  ai:   {name:'Taki',           short:'T', color:'#8c847a'},
  you:  {name:'Christopher',    short:'C', color:'#2f8a5b'},
  acct: {name:'Mandora TEST',   short:'M', color:'#2c6fbb'},
};

const WEEKS = [
  {n:33, month:'Aug', range:'10.–16. aug'},
  {n:34, month:'Aug', range:'17.–23. aug'},
  {n:35, month:'Aug', range:'24.–30. aug'},
  {n:36, month:'Sep', range:'31. aug–6. sep'},
  {n:37, month:'Sep', range:'7.–13. sep'},
  {n:38, month:'Sep', range:'14.–20. sep'},
  {n:39, month:'Sep', range:'21.–27. sep'},
  {n:40, month:'Okt', range:'28. sep–4. okt'},
  {n:41, month:'Okt', range:'5.–11. okt'},
];

const TASKS = [
  {id:'t1', week:33, date:'11.8', type:'Faktura ut', title:'Faktura til FIFA', amount:'30 000 kr', steps:[
    {a:'you', w:3, t:'09:12', x:'Valgte kunde og skrev inn beløpet'},
    {a:'ai',  w:2, t:'09:12', x:'Fylte ut mva (25 %) og forfallsdato'},
    {a:'ai',  w:1, t:'09:13', x:'Lagde faktura-PDF'},
    {a:'you', w:1, t:'09:15', x:'Leste gjennom og sendte fakturaen'},
  ]},
  {id:'t2', week:33, date:'14.8', type:'Kvittering', title:'Lunsj, kantine', amount:'170 kr', fast:3, steps:[
    {a:'ai',  w:2, t:'12:40', x:'Leste kvitteringen'},
    {a:'ai',  w:1, t:'12:40', x:'Foreslo konto 5910 Kantinekostnad'},
    {a:'you', w:.2, t:'12:41', x:'Godkjente uten å åpne bilaget'},
  ]},
  {id:'t3', week:34, date:'19.8', type:'Faktura inn', title:'Primeape – treningsstudio', amount:'299,50 kr', fast:4, steps:[
    {a:'ai',  w:2, t:'08:05', x:'Leste fakturaen fra e-post'},
    {a:'ai',  w:1, t:'08:05', x:'Foreslo konto 7560 Servicekostnad'},
    {a:'you', w:.2, t:'08:30', x:'Godkjente uten å åpne bilaget'},
  ]},
  {id:'t4', week:34, date:'22.8', type:'Bank', title:'Bankavstemming juli', amount:'41 transaksjoner', steps:[
    {a:'ai',  w:5, t:'10:00', x:'Matchet 38 av 41 transaksjoner mot bilag'},
    {a:'ai',  w:.5, t:'10:00', x:'Flagget 3 transaksjoner uten bilag'},
    {a:'you', w:3, t:'10:20', x:'Fant og koblet bilag til de 3 selv'},
    {a:'you', w:1, t:'10:24', x:'Godkjente avstemmingen'},
  ]},
  {id:'t5', week:35, date:'26.8', type:'Faktura inn', title:'ChatGPT Pro – abonnement', amount:'1 891,54 kr', steps:[
    {a:'ai',  w:2, t:'14:10', x:'Leste fakturaen (utenlandsk leverandør)'},
    {a:'ai',  w:1, t:'14:10', x:'Foreslo omvendt avgiftsplikt og konto 6810'},
    {a:'you', w:1, t:'14:22', x:'Åpnet forklaringen og ble usikker'},
    {a:'acct',w:2, t:'15:40', x:'Bekreftet at omvendt avgiftsplikt er riktig'},
    {a:'you', w:1, t:'15:45', x:'Godkjente'},
  ]},
  {id:'t6', week:35, date:'28.8', type:'Kvittering', title:'Kontorrekvisita', amount:'128 kr', fast:2, steps:[
    {a:'ai',  w:2, t:'16:02', x:'Leste kvitteringen'},
    {a:'ai',  w:1, t:'16:02', x:'Foreslo konto 6800 Kontorrekvisita'},
    {a:'you', w:.2, t:'16:03', x:'Godkjente uten å åpne bilaget'},
  ]},
  {id:'t7', week:36, date:'3.9', type:'Faktura inn', title:'Horsea – renhold', amount:'300,50 kr', fast:5, steps:[
    {a:'ai',  w:2, t:'07:55', x:'Leste fakturaen fra e-post'},
    {a:'ai',  w:1, t:'07:55', x:'Foreslo konto 6360 Renhold'},
    {a:'you', w:.2, t:'08:01', x:'Godkjente uten å åpne bilaget'},
  ]},
  {id:'t8', week:36, date:'4.9', type:'Faktura ut', title:'Faktura til Nike', amount:'1 250 kr', steps:[
    {a:'you', w:2, t:'11:30', x:'Lagde faktura på 1,25 kr'},
    {a:'ai',  w:1, t:'11:30', x:'Advarte: beløpet er uvanlig lavt for denne kunden'},
    {a:'you', w:2, t:'11:32', x:'Rettet beløpet til 1 250 kr'},
    {a:'you', w:1, t:'11:33', x:'Sendte fakturaen'},
  ]},
  {id:'t9', week:37, date:'10.9', type:'Kvittering', title:'Lunsj 11:00–13:00', amount:'170 kr', fast:2, steps:[
    {a:'ai',  w:2, t:'13:05', x:'Leste kvitteringen'},
    {a:'ai',  w:1, t:'13:05', x:'Foreslo konto 5910 Kantinekostnad'},
    {a:'you', w:.2, t:'13:06', x:'Godkjente uten å åpne bilaget'},
  ]},
  {id:'t10', week:38, date:'14.9', type:'Kvittering', title:'Kaffebrenneriet – kvittering #51', amount:'303 kr', steps:[
    {a:'ai',  w:2, t:'09:43', x:'Leste kvitteringen'},
    {a:'ai',  w:1, t:'09:43', x:'Foreslo konto 5990 og mva 0 kr'},
    {a:'ai',  w:.5, t:'09:43', x:'Flagget mva som usikker (48 %)'},
    {a:'you', w:2, t:'10:02', x:'Bekreftet formål: velferd for ansatte'},
    {a:'you', w:1, t:'10:03', x:'Leste ansvarserklæringen og signerte'},
  ]},
  {id:'t11', week:39, date:'24.9', type:'Faktura ut', title:'Faktura til REMA 1000', amount:'1 339,66 kr', steps:[
    {a:'ai',  w:1, t:'10:15', x:'Hentet dagens EUR-kurs'},
    {a:'ai',  w:2, t:'10:15', x:'Fylte ut fakturaen fra forrige ordre'},
    {a:'you', w:1, t:'10:20', x:'Endret forfallsdato fra 14 til 30 dager'},
    {a:'you', w:.5, t:'10:21', x:'Lagret som kladd'},
  ]},
  {id:'t12', week:40, date:'2.10', type:'Mva', title:'Mva-melding 4. termin', amount:'12 430 kr å betale', steps:[
    {a:'ai',  w:6, t:'09:00', x:'Samlet 46 bilag for juli–august'},
    {a:'ai',  w:2, t:'09:01', x:'Regnet ut mva å betale: 12 430 kr'},
    {a:'ai',  w:.5, t:'09:01', x:'Flagget 3 poster til gjennomgang'},
    {a:'you', w:4, t:'09:30', x:'Gikk gjennom de 3 flaggede postene'},
    {a:'acct',w:3, t:'13:10', x:'Kontrollerte meldingen'},
    {a:'you', w:1, t:'13:30', x:'Sendte meldingen til Skatteetaten'},
  ]},
  {id:'t13', week:41, date:'6.10', type:'Rapport', title:'Resultat 3. kvartal', amount:'Rapport', steps:[
    {a:'ai',  w:5, t:'15:00', x:'Lagde resultatrapport for Q3'},
    {a:'you', w:2, t:'15:08', x:'Spurte hvorfor kontorkostnader økte 40 %'},
    {a:'ai',  w:1, t:'15:08', x:'Forklarte: nytt renholdsabonnement fra august'},
    {a:'you', w:1, t:'15:15', x:'Delte rapporten med styret'},
  ]},
];

const FILTERS4 = [
  {k:'all',   t:'Alle'},
  {k:'Kvittering', t:'Kvitteringer'},
  {k:'faktura', t:'Fakturaer'},
  {k:'other', t:'Mva, bank og rapporter'},
  {k:'sep'},
  {k:'involved', t:'Der jeg grep inn'},
  {k:'fast', t:'Godkjent uten å se'},
];

function stepsOf(task){
  const st = S[4];
  return st.reviewed[task.id]
    ? [...task.steps, {a:'you', w:2, t:'nå', x:'Så over bilaget i ettertid og bekreftet konto'}]
    : task.steps;
}
function shares(task){
  const tot = {ai:0, you:0, acct:0};
  stepsOf(task).forEach(s=>tot[s.a]+=s.w);
  const sum = tot.ai+tot.you+tot.acct;
  return {ai:Math.round(tot.ai/sum*100), you:Math.round(tot.you/sum*100), acct:Math.round(tot.acct/sum*100), raw:tot};
}
function origYou(task){ let y=0,a=0; task.steps.forEach(s=>{a+=s.w; if(s.a==='you') y+=s.w;}); return Math.round(y/a*100); }
function isFast(task){ return task.fast && !S[4].reviewed[task.id]; }
function involved(task){ return shares(task).you >= 30; }
function passes(task){
  const f = S[4].filter;
  if(f==='all') return true;
  if(f==='Kvittering') return task.type==='Kvittering';
  if(f==='faktura') return task.type.startsWith('Faktura');
  if(f==='other') return ['Mva','Bank','Rapport'].includes(task.type);
  if(f==='involved') return involved(task);
  if(f==='fast') return isFast(task);
  return true;
}
function splitBar(sh, h=8){
  return `<div class="split" style="height:${h}px">
    <span style="width:${sh.ai}%;background:${ACTORS.ai.color}"></span>
    <span style="width:${sh.you}%;background:${ACTORS.you.color}"></span>
    <span style="width:${sh.acct}%;background:${ACTORS.acct.color}"></span></div>`;
}
const TYPE_ICON = {'Kvittering':'🧾','Faktura inn':'📥','Faktura ut':'📤','Bank':'🏦','Mva':'§','Rapport':'📊'};

function r4(){
  const st = S[4];
  const visible = TASKS.filter(passes);

  // totals for header + meter
  const all = {ai:0, you:0, acct:0};
  TASKS.forEach(t=>{ const r=shares(t).raw; all.ai+=r.ai; all.you+=r.you; all.acct+=r.acct; });
  const sum = all.ai+all.you+all.acct;
  const pAI = Math.round(all.ai/sum*100), pYou = Math.round(all.you/sum*100), pAcct = 100-pAI-pYou;
  const nFast = TASKS.filter(isFast).length;
  meter(pYou);

  const head = `
    <div class="v4-head">
      <div>
        <h1>Ditt spor</h1>
        <div class="small">Mandora AS 2 · august – oktober 2026</div>
      </div>
      <div class="stats">
        <div><span>Oppgaver</span><b>${TASKS.length}</b></div>
        <div><span><i style="background:${ACTORS.ai.color}"></i>Gjort av Taki</span><b>${pAI}<small>%</small></b></div>
        <div><span><i style="background:${ACTORS.you.color}"></i>Gjort av deg</span><b>${pYou}<small>%</small></b></div>
        <div><span><i style="background:${ACTORS.acct.color}"></i>Regnskapsfører</span><b>${pAcct}<small>%</small></b></div>
        <div class="${nFast?'warn':''}"><span>Godkjent uten å se</span><b>${nFast}</b></div>
      </div>
    </div>
    <div class="v4-filters">
      ${FILTERS4.map(f=> f.k==='sep' ? '<span class="vsep"></span>' :
        `<button class="pill ${st.filter===f.k?'on':''}" onclick="S[4].filter='${f.k}';S[4].sel=null;r4()">${f.t}${f.k==='fast'&&nFast?` <em>${nFast}</em>`:''}</button>`).join('')}
    </div>`;

  // timeline
  const cols = WEEKS.map(w=>{
    const tasks = visible.filter(t=>t.week===w.n);
    const cards = tasks.map(t=>{
      const sh = shares(t);
      const tags = [];
      if(isFast(t)) tags.push(`<span class="tg warn">Godkjent på ${t.fast} sek</span>`);
      if(st.reviewed[t.id]) tags.push(`<span class="tg ok">Sett over i ettertid</span>`);
      if(sh.acct) tags.push(`<span class="tg blue">Regnskapsfører</span>`);
      if(!t.fast && sh.you>=40) tags.push(`<span class="tg ok">Du grep inn</span>`);
      return `<div class="tc ${st.sel===t.id?'sel':''} ${isFast(t)?'fast':''}" onclick="S[4].sel=S[4].sel==='${t.id}'?null:'${t.id}';r4()">
        <div class="tc-top"><span class="ty">${TYPE_ICON[t.type]||'•'} ${t.type}</span><span class="small">${t.date}</span></div>
        <div class="tc-title">${t.title}</div>
        <div class="tc-amt">${t.amount}</div>
        ${splitBar(sh)}
        <div class="tc-lab"><span>Taki ${sh.ai}%</span><span>Du ${sh.you}%</span></div>
        <div class="traildots">${stepsOf(t).map(s=>`<i title="${ACTORS[s.a].name}: ${s.x}" style="background:${ACTORS[s.a].color}">${ACTORS[s.a].short}</i>`).join('<b></b>')}</div>
        ${tags.length?`<div class="tags">${tags.join('')}</div>`:''}
      </div>`;
    }).join('');
    return `<div class="wk ${st.week===w.n?'hot':''}" id="wk-${w.n}">
      <div class="wk-node">${w.n}</div>
      <div class="wk-lab"><b>Uke ${w.n}</b><span>${w.range}</span></div>
      <div class="wk-cards">${cards || '<div class="empty">Ingen oppgaver</div>'}</div>
    </div>`;
  }).join('');

  // bottom scrubber
  let lastMonth = '';
  const scrub = WEEKS.map(w=>{
    const n = visible.filter(t=>t.week===w.n).length;
    const fastN = visible.filter(t=>t.week===w.n && isFast(t)).length;
    const m = w.month!==lastMonth ? `<span class="sm">${w.month}</span>` : '';
    lastMonth = w.month;
    return `${m}<button class="sw ${st.week===w.n?'on':''}" onclick="jump4(${w.n})">${w.n}${n?`<em class="${fastN?'warn':''}">${n}</em>`:''}</button>`;
  }).join('');

  // drawer
  let drawer = '';
  const sel = TASKS.find(t=>t.id===st.sel);
  if(sel){
    const sh = shares(sel);
    drawer = `<aside class="drawer">
      <div class="dr-top"><span class="ty">${TYPE_ICON[sel.type]||'•'} ${sel.type} · ${sel.date}</span><button class="xbtn" onclick="S[4].sel=null;r4()">✕</button></div>
      <h3>${sel.title}</h3>
      <div class="tc-amt" style="margin-bottom:14px">${sel.amount}</div>
      ${splitBar(sh, 12)}
      <div class="legend">
        <span><i style="background:${ACTORS.ai.color}"></i>Taki ${sh.ai}%</span>
        <span><i style="background:${ACTORS.you.color}"></i>Du ${sh.you}%</span>
        ${sh.acct?`<span><i style="background:${ACTORS.acct.color}"></i>Regnskapsfører ${sh.acct}%</span>`:''}
      </div>
      <div class="sec" style="margin-top:20px">Hvem gjorde hva</div>
      <div class="steps">${stepsOf(sel).map(s=>`
        <div class="stp"><i style="background:${ACTORS[s.a].color}">${ACTORS[s.a].short}</i>
          <div><div class="who">${ACTORS[s.a].name} <span>${s.t}</span></div><div>${s.x}</div></div></div>`).join('')}
      </div>
      ${isFast(sel) ? `<div class="reflect">
          <b>Du godkjente dette på ${sel.fast} sekunder.</b> Taki gjorde alt arbeidet, men det er du som står ansvarlig for bilaget. Vil du se over det nå?
          <button class="btn" style="margin-top:10px" onclick="S[4].reviewed['${sel.id}']=true;r4()">Se over nå</button>
        </div>` : st.reviewed[sel.id] ? `<div class="reflect ok">Du har sett over dette i ettertid. Andelen din har økt fra ${origYou(sel)}% til ${sh.you}%.</div>` : ''}
    </aside>`;
  }

  const keep = document.getElementById('tl4')?.scrollLeft || 0;
  document.getElementById('v4').innerHTML = `
    <div class="v4-inner ${sel?'with-drawer':''}">
      ${head}
      <div class="tl4" id="tl4"><div class="spine"></div>${cols}</div>
      <div class="scrub"><span class="cal">📅</span>${scrub}</div>
    </div>${drawer}`;
  document.getElementById('tl4').scrollLeft = keep;
  const c = document.querySelector('.tc.sel');
  if(c) c.scrollIntoView({inline:'nearest', block:'nearest'});
}
function jump4(n){
  S[4].week = n; r4();
  const el = document.getElementById('wk-'+n);
  if(el) el.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
}
