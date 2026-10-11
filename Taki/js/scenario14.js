/* ============ SCENARIO 14: Replay ============
   Wrapped som en musikk-replay: topp-lister, «avspillinger», duetter og B-sider. */

const ART12 = (a,b,t) => `<div class="s-art" style="background:linear-gradient(135deg,${a},${b})"><span>${t}</span></div>`;

DECKS[14] = {
  title: 'Replay',
  sub: 'Årets «hits» i regnskapet ditt – og B-sidene Taki spilte alene.',
  you: 22,
  lessons: [
    'Topplister med «avspillinger»',
    'Album-cover gjør tall til ting',
    'Duett = samarbeid med regnskapsfører',
    'B-sider = det du aldri så',
  ],
  accountability: 'B-sidene er poenget: 928 bilag Taki håndterte helt alene. Replay gjør dem til noe du faktisk kan «spille av» og se over.',
  slides: [
    {label:'Intro', bg:'radial-gradient(circle at 30% 20%,#ff4f8b,#5b1fa8 60%,#160b2e)', h:()=>`
      <div class="s-center">${SL.kick('Replay')}<div class="s-word" style="font-size:72px;letter-spacing:-3px">2026</div>
      ${SL.p('Årets hits i regnskapet ditt.')}</div>`},

    {label:'Topp-leverandør', bg:'linear-gradient(170deg,#2a0f4d,#160b2e)', h:()=>`
      ${SL.kick('Årets mest spilte leverandør')}${ART12('#ffb36b','#ff4f8b','☕')}
      <div class="s-title">Kaffebrenneriet Kristiansand</div>
      ${SL.p('<b>23 avspillinger</b> · 6 970 kr · topp 1 % av Taki-bedrifter')}`},

    {label:'Topp 5 kontoer', bg:'#160b2e', h:()=>`
      ${SL.kick('Dine topp 5 kontoer')}
      <div class="s-chart">${[['5990','Annen personalkostnad',64,'#ff4f8b','#ffb36b'],['6810','Datakostnad',41,'#5b8cff','#7fe0c4'],['6360','Renhold',24,'#7fe0c4','#c6f432'],['7350','Representasjon',12,'#ffd84d','#ff9f43'],['6800','Kontorrekvisita',9,'#b06cff','#5b8cff']].map(([n,t,c,a,b],i)=>
        `<div><b class="rank">${i+1}</b><span class="mini" style="background:linear-gradient(135deg,${a},${b})"></span><div><b>${t}</b><em>Konto ${n}</em></div><i>${c}</i></div>`).join('')}</div>`},

    {label:'Minutter', bg:'linear-gradient(170deg,#5b1fa8,#2a0f4d)', h:()=>`
      ${SL.kick('Du brukte')}${SL.big(1312,' minutter')}
      ${SL.p('i Taki i år.')}
      <div class="s-compare"><div style="flex:1312"><span>Deg</span></div><div style="flex:9800"><span>Taki · ca. 9 800 min</span></div></div>
      ${SL.p('For hvert minutt du brukte, jobbet Taki i 7.')}`},

    {label:'Måned for måned', bg:'#160b2e', h:()=>`
      ${SL.kick('Måned for måned')}<div class="s-title">Hver måneds hit</div>
      <div class="s-grid">${[['Jan','Husleie','#ff4f8b','#ffb36b'],['Feb','Strøm','#5b8cff','#7fe0c4'],['Mar','Mva','#ffd84d','#ff9f43'],['Apr','Kaffe','#ffb36b','#ff4f8b'],['Mai','Reise','#7fe0c4','#5b8cff'],['Jun','Mva','#ffd84d','#ff9f43'],['Jul','Ferie','#c6f432','#7fe0c4'],['Aug','Renhold','#b06cff','#ff4f8b'],['Sep','ChatGPT','#5b8cff','#b06cff']].map(([m,t,a,b])=>
        `<div style="background:linear-gradient(135deg,${a},${b})"><span>${m}</span><b>${t}</b></div>`).join('')}</div>`},

    {label:'Årets duett', bg:'linear-gradient(170deg,#ff4f8b,#a2224f)', h:()=>`
      ${SL.kick('Årets mest spilte duett')}
      <div class="s-duet"><span style="background:#2f8a5b">C</span><em>+</em><span style="background:#2c6fbb">M</span></div>
      <div class="s-title">Du og Mandora TEST</div>
      ${SL.p('Dere jobbet sammen på <b>14 saker</b>. Lengste spor: mva-melding 4. termin, 4 t 30 min.')}`},

    {label:'B-sider', bg:'#160b2e', hold:true, h:()=>{
      const open = S[14].bsides;
      return `${SL.kick('B-sidene')}${SL.big(928,' bilag')}
      ${SL.p('Taki håndterte disse helt alene. Du hørte aldri på dem.')}
      ${open ? `<div class="s-chart small">${[['Lunsj, kantine','170 kr','2 sek'],['Primeape – trening','299,50 kr','4 sek'],['Kontorrekvisita','128 kr','2 sek'],['Horsea – renhold','300,50 kr','5 sek']].map(([t,a,s])=>
          `<div><span class="mini" style="background:#3a2563"></span><div><b>${t}</b><em>${a} · godkjent på ${s}</em></div><i>▶</i></div>`).join('')}</div>`
        : `<button class="s-btn" onclick="S[14].bsides=true;render()">▶ Spill av noen B-sider</button>`}`}},

    {label:'Del', bg:'#160b2e', hold:true, h:()=>SL.share('Min Replay', [['Kaffe­brenneriet','årets topp-leverandør'],['5990','årets mest brukte konto'],['1 312','minutter i Taki'],['928','B-sider jeg aldri så']], 'radial-gradient(circle at 30% 20%,#ff4f8b,#5b1fa8 70%)')},
  ],
};
function r14(){ story(14); }
