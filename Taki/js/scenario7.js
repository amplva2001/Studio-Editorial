/* ============ SCENARIO 7: Barnebakken ============
   Du fyller ut selv. Du har bare 3 spørsmål til Taki på denne kvitteringen.
   Hvert spørsmål har en kvalitet: good (presist) eller vague (vagt).
   Vage spørsmål gir vage svar – men koster like mye. */

const QS7 = [
  {id:'q1', q:'Hvilken konto skal jeg bruke?', kind:'vague',
   a:'Det kommer an på hva kjøpet var til. Hvis du forteller meg formålet, kan jeg svare mer presist.'},
  {id:'q2', q:'Hva er forskjellen på velferd og representasjon?', kind:'good',
   a:'Velferd er noe til de ansatte (f.eks. fredagskaffe) – konto 5990. Representasjon er bevertning av kunder eller forbindelser – konto 7350.'},
  {id:'q3', q:'Får vi fradrag for mva på kaffe til de ansatte?', kind:'good',
   a:'Vanligvis ikke. Mat og drikke til ansatte regnes som velferd, og da gis det normalt ikke fradrag. Spør regnskapsfører hvis det er et spesielt tilfelle.'},
  {id:'q4', q:'Er dette riktig?', kind:'vague',
   a:'Hva mener du med «dette»? Jeg trenger å vite hvilket felt du lurer på.'},
  {id:'q5', q:'Hva betyr «Herav mva 15 %»?', kind:'good',
   a:'At 39,52 kr av de 303 kr er merverdiavgift. Mvaen er altså allerede med i summen – den kommer ikke i tillegg.'},
  {id:'q6', q:'Kan du bare fylle ut alt for meg?', kind:'vague',
   a:'Ikke i barnebakken! Her lærer du ved å gjøre det selv. Still meg heller et konkret spørsmål.'},
];
const KONTO7 = [
  {v:'', t:'Velg konto …'},
  {v:'5990', t:'5990 Annen personalkostnad (velferd)'},
  {v:'7350', t:'7350 Representasjon'},
  {v:'6800', t:'6800 Kontorrekvisita'},
  {v:'4000', t:'4000 Varekjøp'},
];
const MVA7 = [{v:'', t:'Velg …'},{v:'0', t:'0 kr – ingen fradrag'},{v:'39.52', t:'39,52 kr – fradrag'}];

function r7(){
  const st = S[7];
  document.getElementById('progress').innerHTML = `<div class="tokens7"><span class="small">Spørsmål igjen</span>${[0,1,2].map(i=>`<i class="${i<st.left?'on':''}">?</i>`).join('')}</div>`;
  renderReceipt([], []);
  const goodN = st.asked.filter(id=>QS7.find(q=>q.id===id).kind==='good').length;
  meter(35 + (st.konto?15:0) + (st.mva?15:0) + goodN*8 + (st.done?5:0));

  const notes = st.asked.map(id=>{
    const q = QS7.find(x=>x.id===id);
    return `<div class="note7 ${q.kind}"><div class="nq">«${q.q}» <em>${q.kind==='good'?'★ Godt spørsmål':'Vagt spørsmål'}</em></div><div class="na">✦ ${q.a}</div></div>`;
  }).join('');

  const result = st.checked ? (()=>{
    const kOK = st.konto==='5990', mOK = st.mva==='0';
    return `<div class="card" style="border-color:${kOK&&mOK?'#bfe0cb':'#efc67a'}">
      <div class="sec">Taki sjekket svarene dine</div>
      <div class="frow" style="padding:6px 0"><div class="fl">Konto</div><div class="fv">${KONTO7.find(k=>k.v===st.konto).t}</div><span class="m ${kOK?'y':'n'}">${kOK?'Stemmer':'Se på igjen'}</span></div>
      <div class="frow" style="padding:6px 0"><div class="fl">MVA</div><div class="fv">${MVA7.find(k=>k.v===st.mva).t}</div><span class="m ${mOK?'y':'n'}">${mOK?'Stemmer':'Se på igjen'}</span></div>
      ${!kOK && st.konto==='7350' ? '<div class="learn">7350 er riktig <b>hvis</b> det var et kundemøte. Kvitteringen nevner ingen gjester – var det det?</div>':''}
      ${!kOK && st.konto!=='7350' ? '<div class="learn">Kaffe og bakverk til de ansatte føres som velferd (5990).</div>':''}
      ${!mOK ? '<div class="learn">Mat og drikke til ansatte gir vanligvis ikke fradrag for mva.</div>':''}
      <div class="small" style="margin-top:10px">Du brukte ${3-st.left} av 3 spørsmål – ${goodN} av dem var gode.</div>
    </div>`;
  })() : '';

  document.getElementById('rp').innerHTML = st.done
    ? `<div class="card done-card"><div class="big">✓</div><h3>Godkjent – av deg</h3><p>Du fylte ut alt selv og brukte ${3-st.left} spørsmål. ${goodN>=2?'Presise spørsmål ga deg presise svar.':'Neste gang: still konkrete spørsmål, så får du mer ut av hvert av dem.'}</p></div>`
    : `
    <div class="card">
      <div class="ttl"><h2>Kvittering #51</h2><span class="status">Barnebakken</span></div>
      <div class="desc">Her fyller <b>du</b> ut. Taki hjelper bare når du spør – og du har ${st.left} spørsmål igjen. Tenk deg om: det du spør om, er det du får.</div>
    </div>
    <div class="card">
      <div class="sec">Din utfylling</div>
      <div class="frow" style="padding:8px 0"><div class="fl">Leverandør</div><div class="fv">Kaffebrenneriet Kristiansand AS</div><span class="small">fra kvitteringen</span></div>
      <div class="frow" style="padding:8px 0"><div class="fl">Beløp</div><div class="fv">303,00 kr</div><span class="small">fra kvitteringen</span></div>
      <div class="frow" style="padding:8px 0"><div class="fl">Konto</div><select class="sel7" onchange="S[7].konto=this.value;S[7].checked=false;r7()">${KONTO7.map(k=>`<option value="${k.v}" ${st.konto===k.v?'selected':''}>${k.t}</option>`).join('')}</select></div>
      <div class="frow" style="padding:8px 0"><div class="fl">MVA</div><select class="sel7" onchange="S[7].mva=this.value;S[7].checked=false;r7()">${MVA7.map(k=>`<option value="${k.v}" ${st.mva===k.v?'selected':''}>${k.t}</option>`).join('')}</select></div>
    </div>
    <div class="card">
      <div class="sec">Spør Taki · ${st.left} igjen</div>
      <div class="chips7">${QS7.filter(q=>!st.asked.includes(q.id)).map(q=>
        `<button class="chip7" ${st.left?'':'disabled'} onclick="ask7('${q.id}')">${q.q}</button>`).join('')}</div>
      ${!st.left ? '<div class="small" style="margin-top:8px">Du har brukt opp spørsmålene dine. Nå er det deg og kvitteringen.</div>':''}
      ${notes ? `<div class="sec" style="margin-top:14px">Svarene du har fått</div>${notes}`:''}
    </div>
    ${result}`;

  const ready = st.konto && st.mva;
  document.getElementById('foot').innerHTML = st.done
    ? `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`
    : !st.checked
      ? `<span class="hint">${ready?'':'Velg konto og mva først.'}</span><button class="btn" ${ready?'':'disabled'} onclick="S[7].checked=true;r7();scroll7()">Be Taki sjekke svarene mine</button>`
      : `<button class="btn sec2" onclick="S[7].checked=false;r7()">Endre</button><button class="btn" onclick="S[7].done=true;r7()">Godkjenn ✓</button>`;
}
function scroll7(){ const rp=document.getElementById('rp'); rp.scrollTop=rp.scrollHeight; }
function ask7(id){
  const st = S[7];
  if(!st.left || st.asked.includes(id)) return;
  st.left--; st.asked.push(id); r7();
}
