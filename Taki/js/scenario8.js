/* ============ SCENARIO 8: Kollektivet ============
   Taki foreslår ingenting selv. Den viser hva andre valgte for samme type kjøp.
   Tallene er oppdiktede eksempeldata for prototypen. */

const GROUPS8 = {
  like: {t:'Bedrifter som ligner din', sub:'AS · 1–5 ansatte · konsulenttjenester · 214 bedrifter',
    konto:[{v:'5990',t:'5990 Annen personalkostnad',p:64},{v:'7350',t:'7350 Representasjon',p:21},{v:'6800',t:'6800 Kontorrekvisita',p:11},{v:'4000',t:'Annet',p:4}],
    mva:[{v:'0',t:'Ingen fradrag',p:78},{v:'39.52',t:'Fradrag',p:22}]},
  alle: {t:'Alle Taki-bedrifter', sub:'3 870 bedrifter med lignende kaffekjøp',
    konto:[{v:'5990',t:'5990 Annen personalkostnad',p:52},{v:'7350',t:'7350 Representasjon',p:24},{v:'6800',t:'6800 Kontorrekvisita',p:17},{v:'4000',t:'Annet',p:7}],
    mva:[{v:'0',t:'Ingen fradrag',p:66},{v:'39.52',t:'Fradrag',p:34}]},
  rf:   {t:'Regnskapsførere i nettverket', sub:'38 regnskapsførere har ført lignende bilag',
    konto:[{v:'5990',t:'5990 Annen personalkostnad',p:87},{v:'7350',t:'7350 Representasjon',p:13},{v:'6800',t:'6800 Kontorrekvisita',p:0},{v:'4000',t:'Annet',p:0}],
    mva:[{v:'0',t:'Ingen fradrag',p:95},{v:'39.52',t:'Fradrag',p:5}]},
};
const WHY8 = {
  '5990':'De fleste fører kaffe og bakverk til de ansatte som velferd.',
  '7350':'Disse hadde som regel kunder til stede. Var det et kundemøte, er dette riktig for deg også.',
  '6800':'Noen fører kaffe til kontoret som rekvisita. Regnskapsførerne gjør nesten aldri det.',
  '4000':'Varekjøp brukes for ting man selger videre – passer sjelden her.',
  '0':'Mat og drikke til ansatte gir vanligvis ikke fradrag.',
  '39.52':'Noen trekker fra mva – men regnskapsførerne er nesten samstemte om at det ikke er riktig for velferd.',
};

function r8(){
  const st = S[8], g = GROUPS8[st.group];
  document.getElementById('progress').innerHTML = '';
  renderReceipt([], []);
  meter(30 + (st.konto?20:0) + (st.mva?20:0) + (st.done?5:0));

  const bars = (list, key) => list.map(o=>{
    const on = st[key]===o.v;
    const top = o.p === Math.max(...list.map(x=>x.p));
    return `<button class="bar8 ${on?'on':''}" onclick="S[8].${key}='${o.v}';r8()">
      <div class="b8-top"><span class="r"></span><span class="b8-t">${o.t}</span><b>${o.p}%</b></div>
      <div class="b8-track"><span style="width:${o.p}%;${top?'background:#5b5249':''}"></span></div>
      ${on?`<div class="b8-why">${WHY8[o.v]}</div>`:''}
    </button>`;
  }).join('');

  const pk = g.konto.find(o=>o.v===st.konto), pm = g.mva.find(o=>o.v===st.mva);

  document.getElementById('rp').innerHTML = st.done
    ? `<div class="card done-card"><div class="big">✓</div><h3>Godkjent – ditt valg</h3><p>Du valgte ${pk?pk.t.toLowerCase():''} og ${pm?pm.t.toLowerCase():''}. Taki sa aldri hva du skulle gjøre – du så hva andre gjorde, og tok stilling selv.</p></div>`
    : `
    <div class="card">
      <div class="ttl"><h2>Kvittering #51</h2><span class="status">Til godkjenning</span></div>
      <div class="desc">Taki gir deg ikke et svar. I stedet ser du hva andre gjorde med lignende kjøp. <b>Flertallet er ikke en fasit</b> – du kjenner din egen situasjon best.</div>
      <div class="grp8">${Object.entries(GROUPS8).map(([k,v])=>`<button class="pill ${st.group===k?'on':''}" onclick="S[8].group='${k}';r8()">${v.t}</button>`).join('')}</div>
      <div class="small" style="margin-top:8px">👥 ${g.sub}</div>
    </div>
    <div class="card"><div class="sec">Hvilken konto valgte de?</div>${bars(g.konto,'konto')}</div>
    <div class="card"><div class="sec">Trakk de fra mvaen på 39,52 kr?</div>${bars(g.mva,'mva')}</div>
    ${st.konto && st.mva ? `<div class="card you8">
      <div class="sec">Ditt valg</div>
      Du valgte det samme som <b>${pk.p}%</b> på konto og <b>${pm.p}%</b> på mva i gruppen «${g.t.toLowerCase()}».
      ${pk.p<30||pm.p<30?'<div class="learn">Du valgte noe få andre gjorde. Det kan være helt riktig – men er du sikker på at situasjonen din er annerledes?</div>':''}
    </div>`:''}`;

  const ready = st.konto && st.mva;
  document.getElementById('foot').innerHTML = st.done
    ? `<button class="btn sec2" onclick="resetCur()">Prøv igjen</button>`
    : `<span class="hint">${ready?'':'Velg konto og mva selv.'}</span><button class="btn" ${ready?'':'disabled'} onclick="S[8].done=true;r8()">Godkjenn mitt valg ✓</button>`;
}
