/* ============ SCENARIO 3: Vit hva du signerer ============ */
const SURE3 = [
  {l:'Leverandør', v:'Kaffebrenneriet Kristiansand AS', c:99},
  {l:'Dato', v:'14.09.2026', c:99},
  {l:'Beløp', v:'303,00 kr', c:98},
  {l:'Konto', v:'5990 Annen personalkostnad', c:76},
];
function confChip(c){ const k=c>=90?'hi':c>=70?'mid':'lo'; const t=c>=90?'Sikker':c>=70?'Ganske sikker':'Usikker'; return `<span class="conf ${k}">${t} · ${c}%</span>`; }

function r3(){
  const st=S[3];
  if(!st.sheet) document.getElementById('overlay').innerHTML='';
  document.getElementById('progress').innerHTML='';
  const resolved = st.purpose==='office' || st.purpose==='welfare' || st.replied;
  renderReceipt(resolved?[]:['r-mva'], []);
  meter(10 + (resolved?20:0) + (st.showSure?10:0) + (st.ack?15:0) + (st.done?5:0));

  const vatVal = st.purpose==='office' ? '39,52 kr (fradrag)' : (st.purpose==='welfare'||st.replied) ? '0 kr (ingen fradrag)' : '0 kr ?';

  if(st.done){
    const t = new Date().toTimeString().slice(0,5);
    document.getElementById('rp').innerHTML = `<div class="card done-card" style="padding-bottom:16px"><div class="big">✓</div><h3>Signert av Christopher</h3><p>Godkjenningen er lagret med et spor av hvem som gjorde hva.</p></div>
      <div class="card"><div class="sec">Revisjonsspor</div><div class="trail">
        <div><span class="t">09:43</span>Taki leste kvitteringen og fylte ut 5 felt</div>
        <div><span class="t">09:43</span>Taki flagget MVA som usikker (48 %)</div>
        ${st.replied?`<div><span class="t">${t}</span>Regnskapsfører (Mandora TEST) avklarte mva</div>`:`<div><span class="t">${t}</span>Christopher bekreftet formål: ${st.purpose==='office'?'drift / kontor':'velferd for ansatte'}</div>`}
        <div><span class="t">${t}</span>Christopher leste ansvarserklæringen og signerte</div>
      </div></div>`;
    document.getElementById('foot').innerHTML = `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`;
    return;
  }

  let need = '';
  if(!resolved){
    need = `<div class="card">
      <div class="frow" style="margin-bottom:6px"><div class="fl">MVA</div><div class="fv">0 kr ?</div>${confChip(48)}</div>
      <div class="desc" style="margin-top:4px">Kvitteringen viser <b>39,52 kr</b> i mva. Om du får fradrag avhenger av hva kaffen var til – og det kan ikke jeg se på kvitteringen.</div>
      <div style="margin-top:12px">
        <button class="opt" onclick="S[3].purpose='office';r3()"><span class="r"></span>Til kontoret, som en del av driften</button>
        <button class="opt" onclick="S[3].purpose='welfare';r3()"><span class="r"></span>Velferd / kos for de ansatte</button>
        ${st.asked
          ? `<div class="msg"><div class="who">Du → Mandora TEST</div>Får vi fradrag for mva på kaffe og bakverk til kontoret? (Kvittering #51)
             <div class="small" style="margin-top:6px">Sendt · svarer vanligvis innen 1 virkedag</div>
             <button class="btn soft" style="margin-top:8px;padding:6px 10px;font-size:12px" onclick="S[3].replied=true;r3()">Simuler svar fra regnskapsfører</button></div>`
          : `<button class="opt" onclick="S[3].asked=true;r3()"><span class="r" style="border-style:dashed"></span>Jeg vet ikke – spør regnskapsføreren</button>`}
      </div>
    </div>`;
  } else {
    need = `<div class="card field done" style="margin:0">
      <div class="frow"><div class="fl">MVA</div><div class="fv">${vatVal}</div><span class="conf hi">${st.replied?'Avklart av regnskapsfører':'Bekreftet av deg'}</span></div>
      ${st.replied?`<div class="msg"><div class="who">Mandora TEST</div>Dette regnes som velferd for ansatte, så dere får ikke fradrag. 0 kr er riktig.</div>`:''}
    </div>`;
  }

  document.getElementById('rp').innerHTML = `
    <div class="card">
      <div class="ttl"><h2>Kvittering #51</h2><span class="status ${resolved?'ok':st.asked?'wait':''}">${resolved?'Klar til signering':st.asked?'Venter på svar':'Til godkjenning'}</span></div>
      <div class="desc">Kaffe (2 × 500 g) og bakverk fra Kaffebrenneriet Kristiansand AS. Ingen gjester er nevnt.</div>
    </div>
    ${!resolved?`<div class="needs"><span class="n">1</span>Jeg har fylt ut 5 felt. <b>1 felt trenger deg.</b></div>`:''}
    ${need}
    <div class="card">
      <div class="collapsed" onclick="S[3].showSure=!S[3].showSure;r3()"><span><b style="color:var(--ink)">4 felt</b> jeg er ganske sikker på</span><span>${st.showSure?'Skjul ▴':'Vis ▾'}</span></div>
      ${st.showSure?SURE3.map(f=>`<div class="frow" style="padding:10px 0;border-top:1px solid var(--line)"><div class="fl">${f.l}</div><div class="fv">${f.v}</div>${confChip(f.c)}</div>`).join(''):''}
    </div>`;

  document.getElementById('foot').innerHTML =
    `<span class="hint">${resolved?'':'Avklar det usikre feltet først.'}</span>
     <button class="btn" ${resolved?'':'disabled'} onclick="S[3].sheet=true;S[3].ack=false;sheet3()">Godkjenn ✓</button>`;
  if(st.sheet) sheet3();
}
function sheet3(){
  const st=S[3];
  const who = st.replied ? 'Regnskapsfører avklarte mva' : `Du bekreftet formål: ${st.purpose==='office'?'drift / kontor':'velferd for ansatte'}`;
  document.getElementById('overlay').innerHTML = `<div class="sheet"><div class="box2">
    <h3>Dette signerer du</h3>
    <div class="small">Kvittering #51 · 303,00 kr · Kaffebrenneriet Kristiansand AS</div>
    <div class="two">
      <div class="c" style="background:var(--panel)"><h4 style="color:var(--muted)">Taki gjorde</h4>Leste kvitteringen<br>Foreslo konto 5990<br>Regnet ut beløp og mva</div>
      <div class="c" style="background:var(--greenbg)"><h4 style="color:var(--green)">Du gjorde</h4>${who}</div>
    </div>
    <div class="resp"><b style="color:var(--ink)">Når du godkjenner, står du ansvarlig for at:</b>
      <ul style="margin-top:4px"><li>kjøpet gjelder bedriften</li><li>konto og mva er riktig</li><li>kvitteringen er ekte og ikke ført før</li></ul></div>
    <button class="chk ${st.ack?'on':''}" style="margin-top:14px;padding:8px 10px" onclick="S[3].ack=!S[3].ack;sheet3();meter(10+20+(S[3].showSure?10:0)+(S[3].ack?15:0))"><span class="box">${st.ack?'✓':''}</span>Jeg forstår at det er jeg som står ansvarlig, ikke Taki</button>
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px">
      <button class="btn sec2" onclick="S[3].sheet=false;r3()">Avbryt</button>
      <button class="btn" ${st.ack?'':'disabled'} onclick="S[3].sheet=false;S[3].done=true;r3()">Signer som Christopher</button>
    </div>
  </div></div>`;
}
