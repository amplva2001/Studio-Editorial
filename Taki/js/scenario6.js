/* ============ SCENARIO 6: Karakter ============
   Taki som en karakter med tydelig tone. Tre nivåer:
   ny     = Nybegynner: spør enkelt og naivt, foreslår ingenting
   kollega = Kollega: foreslår et svar, men ber deg bekrefte
   ekspert = Ekspert: fyller ut alt selv og høres helt sikker ut
   Hvert spørsmål (Q6) har én replikk per nivå. */

const LEVELS6 = [
  {k:'ny',      t:'Nybegynner', face:'🙂', intro:'Hei! Jeg er Taki. Jeg er ganske ny på regnskap, så jeg trenger litt hjelp av deg med denne kvitteringen.'},
  {k:'kollega', t:'Kollega',    face:'🙂', intro:'Hei! Jeg har sett på kvitteringen og har noen forslag. Si fra hvis noe er feil.'},
  {k:'ekspert', t:'Ekspert',    face:'😎', intro:'Kvitteringen er ferdig behandlet. Alle felt er korrekt utfylt.'},
];

const Q6 = [
  {id:'lev', field:'Leverandør', src:['r-vendor'],
   say:{ny:'Jeg ser «Kaffebrenneriet» helt øverst. Er det butikken dere handlet i?',
        kollega:'Leverandøren ser ut til å være Kaffebrenneriet Kristiansand AS. Stemmer det?',
        ekspert:'Leverandør: Kaffebrenneriet Kristiansand AS.'},
   opts:[{v:'Kaffebrenneriet Kristiansand AS', ok:true},{v:'Markens gate 5', ok:false, why:'Det er adressen til butikken, ikke navnet.'}]},
  {id:'bel', field:'Beløp', src:['r-sum','r-mva','r-items'],
   say:{ny:'Det står mange tall her … 258, 303 og 39,52. Hvilket av dem betalte dere?',
        kollega:'Jeg tror dere betalte 303 kr totalt. Ser du det samme?',
        ekspert:'Beløp: 303,00 kr inkl. mva.'},
   opts:[{v:'303,00 kr', ok:true},{v:'258,00 kr', ok:false, why:'258 kr er bare kaffen. Bakverket kommer i tillegg.'},{v:'39,52 kr', ok:false, why:'39,52 kr er mvaen som er inkludert i summen – ikke hele beløpet.'}]},
  {id:'form', field:'Formål', src:['r-items'],
   say:{ny:'Hva var kaffen og bakverket til? Det står ikke på lappen, så det kan bare du vite.',
        kollega:'Jeg gjetter at dette var til dere på kontoret, siden ingen gjester er nevnt. Riktig?',
        ekspert:'Formål: velferd for ansatte. Konto 5990.'},
   opts:[{v:'Til oss på kontoret', ok:true},{v:'Til et kundemøte', ok:true, alt:true},{v:'Privat', ok:false, why:'Private kjøp skal ikke inn i bedriftens regnskap.'}]},
  {id:'mva', field:'MVA', src:['r-mva'],
   say:{ny:'Jeg har hørt at man ikke alltid får igjen mvaen på mat til de ansatte. Vet du om det stemmer for dere?',
        kollega:'Jeg tror dere ikke får fradrag for mvaen her, fordi det er mat til ansatte. Men jeg er ikke helt sikker.',
        ekspert:'Mva: 0 kr. Ikke fradragsberettiget.'},
   opts:[{v:'Ingen fradrag (0 kr)', ok:true},{v:'Fradrag (39,52 kr)', ok:false, why:'Mat og drikke til ansatte gir vanligvis ikke fradrag. Dobbeltsjekk med regnskapsfører hvis du er usikker.'},{v:'Vet ikke – spør regnskapsfører', ok:true, ask:true}]},
];

function r6(){
  const st = S[6];
  const lv = LEVELS6.find(l=>l.k===st.level);
  document.getElementById('progress').innerHTML = `<div class="lvl6">${LEVELS6.map(l=>
    `<button class="${st.level===l.k?'on':''}" onclick="S[6]={level:'${l.k}',step:0,ans:{},done:false};r6()">${l.t}</button>`).join('')}</div>`;

  const expert = st.level==='ekspert';
  const cur = Q6[st.step];
  renderReceipt(!expert && cur && !st.done ? cur.src : [], []);
  const answered = Object.keys(st.ans).length;
  meter(expert ? (st.done?8:3) : 10 + answered*(st.level==='ny'?20:12) + (st.done?5:0));

  const bubble = (txt, extra='') => `<div class="say6 ${st.level}">
      <span class="face6">✦</span><div><div class="who6">Taki <span>${lv.t.toLowerCase()}</span></div>${txt}${extra}</div></div>`;
  const filled = Q6.map(q=>{
    const a = st.ans[q.id] ?? (expert ? q.opts[0].v : null);
    return `<div class="frow" style="padding:9px 0;border-top:1px solid var(--line)">
      <div class="fl">${q.field}</div><div class="fv">${a ?? '<span class="small">–</span>'}</div>
      ${a ? `<span class="conf ${expert?'lo':'hi'}" style="${expert?'background:#ece8f9;color:#5a4fb0':''}">${expert?'Fylt ut av Taki':'Bekreftet av deg'}</span>`:''}</div>`;
  }).join('');

  let talk = '';
  if(st.done){
    talk = `<div class="card done-card" style="padding:22px"><div class="big">✓</div><h3>Godkjent</h3>
      <p>${expert ? 'Taki gjorde alt og du trykket godkjenn. Rask – men lærte du noe, og ville du sett det hvis Taki tok feil?' :
        st.level==='ny' ? 'Du fylte ut alt selv, Taki bare spurte. Taki virket kanskje litt dum – men det var du som forsto kvitteringen.' :
        'Taki foreslo og du bekreftet hvert felt. En mellomting: raskere enn nybegynner, men du så over alt.'}</p></div>`;
  } else if(expert){
    talk = bubble(lv.intro, `<div class="exp6">Alt er klart. Trykk godkjenn.</div>`);
  } else {
    talk = bubble(st.step===0 ? lv.intro : 'Takk! Neste ting:') +
      Q6.slice(0, st.step).map(q=>{
        const a = Q6.find(x=>x.id===q.id).opts.find(o=>o.v===st.ans[q.id]);
        return `<div class="me6"><span>${st.ans[q.id]}</span></div>${a && a.alt ? bubble('Å, da er det representasjon (konto 7350) i stedet. Godt du sa fra – det kunne ikke jeg sett!'):''}${a && a.ask ? bubble('Lurt! Jeg sender spørsmålet til Mandora TEST. Inntil videre fører jeg 0 kr.'):''}`;
      }).join('') +
      (cur ? bubble(cur.say[st.level]) + `<div class="opts6">${cur.opts.map((o,i)=>{
          const pre = st.level==='kollega' && i===0;
          return `<button class="opt ${pre?'pre':''}" onclick="pick6('${cur.id}',${i})"><span class="r"></span>${o.v}${pre?'<em>Takis forslag</em>':''}</button>`;
        }).join('')}</div>${st.err?`<div class="learn" style="margin-top:0">${st.err}</div>`:''}` : bubble('Da tror jeg vi har alt! Ser det riktig ut for deg?'));
  }

  document.getElementById('rp').innerHTML = `
    <div class="card"><div class="ttl"><h2>Kvittering #51</h2><span class="status">${st.done?'Godkjent':'Til godkjenning'}</span></div>
      <div class="chat6">${talk}</div></div>
    <div class="card"><div class="sec">Felt</div>${filled}</div>`;

  const ready = expert || answered===Q6.length;
  document.getElementById('foot').innerHTML = st.done
    ? `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`
    : `<span class="hint">${ready?'':`${Q6.length-answered} spørsmål igjen`}</span><button class="btn" ${ready?'':'disabled'} onclick="S[6].done=true;r6()">Godkjenn ✓</button>`;
  const ch = document.querySelector('.chat6'); if(ch) ch.scrollTop = ch.scrollHeight;
}
function pick6(id, i){
  const st = S[6], q = Q6.find(x=>x.id===id), o = q.opts[i];
  if(!o.ok){ st.err = `<b>Hmm, er du sikker?</b> ${o.why}`; r6(); return; }
  st.err = null; st.ans[id] = o.v; st.step++; r6();
}
