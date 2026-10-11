/* ============ SCENARIO 1: Vis arbeidet ============ */
const F1 = [
  {id:'lev',  label:'Leverandør', value:'Kaffebrenneriet Kristiansand AS', src:['r-vendor'],
   why:'Hentet fra toppen av kvitteringen. «MVA» etter org.nr betyr at leverandøren er mva-registrert, så kvitteringen kan brukes som bilag.'},
  {id:'dato', label:'Dato', value:'14.09.2026', src:['r-date'],
   why:'Kjøpsdatoen på kvitteringen. Den bestemmer hvilken periode bilaget hører til (september 2026).'},
  {id:'bel',  label:'Beløp', value:'303,00 kr', src:['r-items','r-sum'],
   why:'2 × kaffe (258 kr) + 1 bakverk (45 kr) = 303 kr. Summen stemmer med «Sum inkl. mva».'},
  {id:'kto',  label:'Konto', value:'5990 Annen personalkostnad', src:['r-items'],
   why:'Kaffe og bakverk uten noen gjester nevnt ser ut som noe til deg eller de ansatte. Hvis dette var til et kundemøte, ville riktig konto vært representasjon (7350). Det vet du – ikke jeg.'},
  {id:'mva',  label:'MVA', value:'0 kr', src:['r-mva'], flag:'Kvitteringen viser 39,52 kr i mva, men jeg har ført 0 kr.',
   why:'Mat og drikke til ansatte regnes ofte som velferd, og da gis det vanligvis ikke fradrag for mva. Men hvis kaffen er til kontoret som en del av driften, kan det være annerledes. Her er jeg usikker – spør regnskapsføreren hvis du ikke vet.'},
];
function r1(){
  const st=S[1];
  const n = Object.values(st.checked).filter(Boolean).length;
  document.getElementById('progress').innerHTML =
    `<div style="display:flex;gap:8px;align-items:center" class="small">Grundig gjennomgang · kvittering 1 av 5 <div class="dots">${[1,2,3,4,5].map(i=>`<span class="${i===1?'on':''}"></span>`).join('')}</div></div>`;
  const open = F1.find(f=>f.id===st.open);
  renderReceipt(open?open.src:[], ['r-mva']);
  meter(10 + n*15);

  if(st.done){
    document.getElementById('rp').innerHTML = `<div class="card done-card"><div class="big">✓</div><h3>Godkjent – og du vet hvorfor</h3>
      <p>Du sjekket alle ${F1.length} feltene selv. Etter 5 kvitteringer slutter Taki å be deg sjekke alt, og viser bare det som er uvanlig.</p></div>`;
    document.getElementById('foot').innerHTML = `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`;
    return;
  }

  document.getElementById('rp').innerHTML = `
    <div class="card">
      <div class="ttl"><h2>Kvittering #51</h2><span class="status">Til godkjenning</span></div>
      <div class="small" style="margin-top:2px">14.9.2026</div>
      <div class="desc">Dette er din første kvittering. Jeg har fylt ut alt, men <b>du</b> er den som godkjenner. Gå gjennom hvert felt – klikk «Hvorfor?» for å se hvor tallet kommer fra.</div>
    </div>
    <div class="card">
      <div class="sec">Felt Taki har fylt ut · ${n} av ${F1.length} sjekket</div>
      ${F1.map(f=>{
        const on = !!st.checked[f.id];
        const isOpen = st.open===f.id;
        return `<div class="field ${f.flag && !on?'flagged':''} ${on?'done':''}" onmouseenter="hl(${JSON.stringify(f.src).replace(/"/g,"'")})" onmouseleave="unhl()">
          <div class="frow">
            <div class="fl">${f.label}</div>
            <div class="fv">${f.value}</div>
            <button class="why" onclick="S[1].open=${isOpen?'null':`'${f.id}'`};r1()">${isOpen?'Skjul':'Hvorfor?'}</button>
            <button class="chk ${on?'on':''}" onclick="S[1].checked['${f.id}']=!S[1].checked['${f.id}'];r1()"><span class="box">${on?'✓':''}</span>${f.flag?'Forstått':'Sjekket'}</button>
          </div>
          ${f.flag && !on ? `<div class="alert"><span class="ic">!</span><span>${f.flag} <u style="cursor:pointer" onclick="S[1].open='${f.id}';r1()">Les hvorfor</u></span></div>`:''}
          ${isOpen?`<div class="expl">${f.why}${f.id==='mva'?'<div style="margin-top:8px"><button class="btn soft" style="padding:6px 10px;font-size:12px">Spør regnskapsfører</button></div>':''}</div>`:''}
        </div>`;}).join('')}
    </div>`;
  const all = n===F1.length;
  document.getElementById('foot').innerHTML =
    `<span class="hint">${all?'Alt er sjekket.':`Sjekk ${F1.length-n} felt til før du kan godkjenne.`}</span>
     <button class="btn" ${all?'':'disabled'} onclick="S[1].done=true;r1()">Godkjenn ✓</button>`;
}
