/* ============ SCENARIO 16: Wrapped-widget ============
   Taki-hjemskjermen med en Wrapped-widget i stedet for «Din opplevelse»-kortet.
   Widgeten bytter høydepunkt hvert 3,5 sekund. Klikk åpner hele Wrapped (decket fra scenario 15).
   Endre høydepunktene i W14 under. */

const W14 = [
  {k:'Minutter',          v:'1 312',                       s:'med regnskapet ditt i 2026',      bg:'linear-gradient(135deg,#3d5afe,#7a5cff)'},
  {k:'Topp-«artist»',     v:'Kaffe&shy;brenneriet',        s:'23 kjøp – topp 1 % av kundene',   bg:'linear-gradient(135deg,#ff5fa2,#b0246a)'},
  {k:'Årets «låt»',       v:'«Godkjenn»',                  s:'1 096 ganger. Litt på repeat?',   bg:'linear-gradient(135deg,#ff7a1a,#ff5fa2)'},
  {k:'Din type',          v:'Den tillitsfulle signereren', s:'Du stoler på Taki – kanskje litt for mye?', bg:'linear-gradient(135deg,#9ccc1a,#d7ff3a)', ink:true},
  {k:'Årets øyeblikk',    v:'Du stoppet og spurte',        s:'14. sep · kvittering #51',        bg:'linear-gradient(135deg,#120e1f,#3a2563)'},
];
let w14Timer = null;
function stop14(){ if(w14Timer){ clearInterval(w14Timer); w14Timer = null; } }
function open14(){ stop14(); S[16].open = true; S[16].i = 0; S[16].playing = true; render(); }
function close14(){ S[16].open = false; render(); }

function w14Slide(){
  const w = W14[S[16].w], el = document.getElementById('w14');
  if(!el) return;
  el.style.background = w.bg;
  el.classList.toggle('ink', !!w.ink);
  document.getElementById('w14-body').innerHTML = `<div class="w14-k">${w.k}</div><div class="w14-v">${w.v}</div><div class="w14-s">${w.s}</div>`;
  document.getElementById('w14-dots').innerHTML = W14.map((_,i)=>`<i class="${i===S[16].w?'on':''}"></i>`).join('');
}

function r16(){
  const st = S[16];
  meter(27);
  document.getElementById('v14').innerHTML = `
    <div class="v14-inner">
      <h1>God kveld, Christopher <span class="sun">✺</span></h1>
      <div class="home14">
        <button class="wid14" id="w14" onclick="open14()">
          <div class="w14-top"><span class="w14-tag">Taki <b>wrapped</b> · 2026</span><span class="w14-new">Nytt</span></div>
          <div class="w14-body" id="w14-body"></div>
          <div class="w14-foot"><div class="w14-dots" id="w14-dots"></div><span class="w14-cta">Se hele Wrapped →</span></div>
        </button>

        <div class="card14 varsler">
          <div class="c14-h">Varsler</div>
          ${[['🎉','Ditt 2026 Wrapped er klart','Se hvordan året ditt med Taki så ut','nå',true],
             ['💬','Mandora TEST svarte på «Mva på kaffe»','Velferd – ingen fradrag','14. sep'],
             ['✓','«Parkering 12.8» ble markert som løst','Klikk for å se henvendelsen','13. sep'],
             ['📎','Ny forespørsel fra Mathias Haslien','«Mangler kvittering»','12. sep']].map(([i,t,d,when,hot])=>
            `<div class="n14 ${hot?'hot':''}" ${hot?'onclick="open14()"':''}><span>${i}</span><div><b>${t}</b><em>${d}</em></div><small>${when}</small></div>`).join('')}
        </div>

        <div class="tile14"><span>🧾</span><b>Last opp<br>kvitteringer</b></div>
        <div class="tile14"><span>📄</span><b>Opprett<br>faktura</b></div>
        <div class="tile14"><span>📊</span><b>Lag rapporter<br>og analyser</b></div>
        <div class="tile14"><span>🎧</span><b>Kontakt<br>regnskapsfører</b></div>
      </div>
      <div class="chat14"><span>Snakk med Taki</span><em>＋</em><b>➤</b></div>
    </div>
    <div id="v14o"></div>`;

  if(st.open){
    story(16);
  } else {
    w14Slide();
    w14Timer = setInterval(()=>{ S[16].w = (S[16].w+1) % W14.length; w14Slide(); }, 3500);
  }
}
