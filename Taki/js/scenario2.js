/* ============ SCENARIO 2: Du først ============ */
const P2 = [
  {k:'staff', t:'Kaffe og noe å bite i til meg / de ansatte på kontoret'},
  {k:'client',t:'Bevertning på et møte med en kunde'},
  {k:'priv',  t:'Noe jeg kjøpte privat'},
  {k:'idk',   t:'Vet ikke'},
];
const V2 = [{k:'yes',t:'Ja, jeg kan trekke fra 39,52 kr'},{k:'no',t:'Nei, ikke fradrag'},{k:'idk',t:'Vet ikke'}];
const PURPOSE_TXT = {staff:'Til ansatte · 5990', client:'Kundemøte · 7350', priv:'Privat', idk:'Vet ikke'};
const VAT_TXT = {yes:'Fradrag 39,52 kr', no:'Ingen fradrag', idk:'Vet ikke'};

function r2(){
  const st=S[2];
  document.getElementById('progress').innerHTML='';
  renderReceipt(st.revealed?[]:(st.purpose?['r-mva']:['r-items']), []);
  meter(10 + (st.purpose?30:0) + (st.vat?30:0) + (st.final?20:0));

  if(st.done){
    const fin = st.final==='mine' ? 'din vurdering' : st.final==='taki' ? 'Taki sitt forslag' : null;
    document.getElementById('rp').innerHTML = st.final==='ask'
      ? `<div class="card done-card"><div class="big" style="background:var(--bluebg);color:var(--blue)">?</div><h3>Sendt til regnskapsfører</h3><p>Mandora TEST svarer vanligvis innen 1 virkedag. Kvitteringen venter til dere er enige.</p></div>`
      : `<div class="card done-card"><div class="big">✓</div><h3>Godkjent med ${fin}</h3><p>Du tok stilling selv før du så forslaget. Neste gang er du bedre rustet til å se om Taki tar feil.</p></div>`;
    document.getElementById('foot').innerHTML = `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`;
    return;
  }

  const opts=(list,key,step)=>list.map(o=>`<button class="opt ${st[key]===o.k?'on':''}" ${st.revealed?'disabled':''} onclick="S[2].${key}='${o.k}';r2()"><span class="r"></span>${o.t}</button>`).join('');

  let html = `
    <div class="card">
      <div class="ttl"><h2>Kvittering #51</h2><span class="status">Din tur</span></div>
      <div class="desc">Taki har et forslag klart, men vil høre hva <b>du</b> tror først. Ingen fasit er dum – det er sånn du lærer å se om AI-en tar feil.</div>
    </div>
    `;
  if(!st.revealed){ html += `    <div class="card q">
      <div class="sec">Spørsmål 1 av 2</div>
      <h3>Hva var dette kjøpet til?</h3>
      <p>Kvitteringen viser kaffe og bakverk for 303 kr. Bare du vet hva det ble brukt til.</p>
      ${opts(P2,'purpose')}
    </div>`;
  if(st.purpose){
    html += `<div class="card q">
      <div class="sec">Spørsmål 2 av 2</div>
      <h3>Kan bedriften trekke fra mvaen?</h3>
      <p>Kvitteringen sier «Herav mva 15 %: 39,52». Får du den tilbake?</p>
      ${opts(V2,'vat')}
    </div>`;
  }
  }
  if(!st.revealed){
    html += `<div class="locked">🔒 Taki sitt forslag vises når du har svart på begge spørsmålene.</div>`;
  } else {
    const pm = st.purpose==='staff', vm = st.vat==='no';
    let learn = [];
    if(st.purpose==='client') learn.push('<b>Kundemøte:</b> Hvis dette var et kundemøte, har du rett i at det er representasjon (7350). Kvitteringen sier ingenting om gjester, så Taki gjettet ansatte. Du vet hva som faktisk skjedde – din vurdering bør vinne her.');
    if(st.purpose==='priv') learn.push('<b>Privat kjøp:</b> Private kjøp skal ikke bokføres i selskapet. Da bør bilaget avvises, eller føres som et mellomværende med eier. Spør regnskapsføreren.');
    if(st.purpose==='idk') learn.push('<b>Formål:</b> Taki gjetter «til ansatte» fordi det er kaffe og bakverk uten gjester. Det er bare en gjetning – formålet er det bare du som kjenner.');
    if(st.vat==='yes') learn.push('<b>Mva:</b> Mange tror at all mva kan trekkes fra. Mat og drikke til ansatte regnes ofte som velferd, og da gis det vanligvis ikke fradrag. Taki er ikke helt sikker her heller.');
    if(st.vat==='idk') learn.push('<b>Mva:</b> Fradrag krever at kjøpet brukes i virksomheten. Velferd til ansatte gir vanligvis ikke fradrag, derfor foreslår Taki 0 kr – men med lav sikkerhet.');
    if(pm && vm) learn.push('<b>Dere er enige.</b> Godt resonnert – du kom frem til det samme som Taki uten å se forslaget først.');
    html += `<div class="card">
      <div class="sec">Din vurdering mot Taki</div>
      <table class="cmp">
        <tr><th></th><th>Du</th><th>Taki</th><th></th></tr>
        <tr><td class="small">Formål / konto</td><td>${PURPOSE_TXT[st.purpose]}</td><td>Til ansatte · 5990</td><td><span class="m ${pm?'y':'n'}">${pm?'Enige':'Ulikt'}</span></td></tr>
        <tr><td class="small">MVA</td><td>${VAT_TXT[st.vat]}</td><td>Ingen fradrag <span class="small">(usikker)</span></td><td><span class="m ${vm?'y':'n'}">${vm?'Enige':'Ulikt'}</span></td></tr>
      </table>
      ${learn.map(l=>`<div class="learn">${l}</div>`).join('')}
      <button class="why" style="margin-top:10px" onclick="S[2]={purpose:null,vat:null,revealed:false,final:null,done:false};r2()">← Endre svarene mine</button>
    </div>`;
  }
  document.getElementById('rp').innerHTML = html;

  const foot = document.getElementById('foot');
  if(!st.revealed){
    const ready = st.purpose && st.vat;
    foot.innerHTML = `<span class="hint">${ready?'Klar til å se hva Taki mener.':'Svar på spørsmålene først.'}</span>
      <button class="btn" ${ready?'':'disabled'} onclick="S[2].revealed=true;r2()">Vis Taki sitt forslag →</button>`;
  } else {
    const agree = st.purpose==='staff' && st.vat==='no';
    foot.innerHTML = agree
      ? `<button class="btn" onclick="S[2].final='taki';S[2].done=true;r2()">Godkjenn ✓</button>`
      : `<button class="btn soft" onclick="S[2].final='ask';S[2].done=true;r2()">Spør regnskapsfører</button>
         <button class="btn sec2" onclick="S[2].final='taki';S[2].done=true;r2()">Bruk Taki sitt forslag</button>
         <button class="btn" onclick="S[2].final='mine';S[2].done=true;r2()">Bruk min vurdering ✓</button>`;
  }
}
