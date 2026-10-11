/* ============ SCENARIO 15: Wrapped ============
   Inspirert av Spotify Wrapped: topp-«artist», topp-«sjangre», personlighetstype,
   «du var i topp X %», og det store oppsummeringskortet til slutt. Egen stil, ikke Spotify sin. */

const COL13 = {ink:'#120e1f', lime:'#d7ff3a', pink:'#ff5fa2', blue:'#3d5afe', orange:'#ff7a1a', cream:'#fff3e0'};

DECKS[15] = {
  title: 'Wrapped',
  sub: 'Regnskapsåret ditt fortalt som en Wrapped – med topplister, personlighet og et kort du kan dele.',
  you: 27,
  lessons: [
    'Store, dristige farger og typografi',
    '«Din topp-artist» og «topp-sjangre»',
    'En personlighetstype å kjenne seg igjen i',
    '«Du var i topp X %» – sammenligning gir mening',
    'Oppsummeringskort laget for å deles',
  ],
  accountability: 'Wrapped feirer vanligvis forbruk. Her feirer den <b>involvering</b>: din mest brukte knapp var «Godkjenn», men årets beste øyeblikk var da du stoppet og spurte.',
  slides: [
    {label:'Intro', bg:`linear-gradient(135deg,${COL13.pink} 0%,${COL13.orange} 55%,${COL13.lime} 100%)`, fg:COL13.ink, h:()=>`
      <div class="s-center"><div class="w13-blob"></div>
      <div class="s-word" style="font-size:64px;letter-spacing:-3px">Ditt<br>2026<br>Wrapped</div>
      ${SL.p('<b>Regnskapsåret ditt, oppsummert.</b><br>Trykk for å starte.')}</div>`},

    {label:'Minutter', bg:COL13.blue, h:()=>`
      ${SL.kick('Du brukte')}${SL.big(1312,'')}<div class="s-title">minutter med regnskapet ditt</div>
      ${SL.p('Det er mer enn <b>87 %</b> av Taki-brukerne. Taki brukte rundt 9 800 minutter på deg.')}`},

    {label:'Topp-sjangre', bg:COL13.ink, h:()=>`
      ${SL.kick('Dine topp-sjangre')}<div class="s-title">Du er en<br><span style="color:${COL13.lime}">personal&shy;kostnad</span>-person</div>
      <div class="w13-genres">${[['Personalkostnad',COL13.lime],['Programvare',COL13.pink],['Renhold',COL13.orange],['Representasjon',COL13.blue],['Kontor',COL13.cream]].map(([g,c],i)=>
        `<div style="background:${c};animation-delay:${i*110}ms"><b>${i+1}</b><span>${g}</span></div>`).join('')}</div>`},

    {label:'Topp-artist', bg:`linear-gradient(170deg,${COL13.pink},#b0246a)`, h:()=>`
      ${SL.kick('Din topp-«artist» i 2026')}
      <div class="w13-artist"><span>☕</span></div>
      <div class="s-word" style="font-size:36px">Kaffe&shy;brenneriet Kristiansand</div>
      ${SL.p('23 kjøp. Du er blant de <b>topp 1 %</b> av kundene deres på Taki.')}`},

    {label:'Topp-«låter»', bg:COL13.ink, h:()=>`
      ${SL.kick('Dine mest «spilte» oppgaver')}
      <div class="w13-songs">${[['Godkjenn kvittering','1 096 ganger'],['Last opp bilag','412 ganger'],['Spør Taki','138 ganger'],['Spør regnskapsfører','14 ganger'],['Avvis forslag','9 ganger']].map(([t,c],i)=>
        `<div><b>${i+1}</b><div><strong>${t}</strong><em>${c}</em></div></div>`).join('')}</div>
      ${SL.p('«Godkjenn» var årets låt. Kanskje litt på repeat?')}`},

    {label:'Personlighet', bg:COL13.lime, fg:COL13.ink, h:()=>`
      ${SL.kick('Din regnskapspersonlighet')}
      <div class="w13-type"><span>T</span><span>S</span><span>F</span><span>G</span></div>
      <div class="s-word" style="font-size:38px">Den tillitsfulle signereren</div>
      ${SL.p('<b>T</b>illit · <b>S</b>nøgg · <b>F</b>ornøyd · <b>G</b>odkjenner. Du stoler på Taki – kanskje litt for mye?')}
      <div class="s-chips dark"><span>Godkjenner fort</span><span>Spør sjelden</span><span>Liker oversikt</span></div>`},

    {label:'Årets øyeblikk', bg:COL13.orange, fg:COL13.ink, h:()=>`
      ${SL.kick('Årets øyeblikk')}<div class="s-emoji">✋</div>
      <div class="s-title">14. september kl. 10:01 stoppet du opp.</div>
      ${SL.p('Taki var bare 48 % sikker på mvaen for kvittering #51. I stedet for å godkjenne, spurte du regnskapsføreren – og fikk det riktig.')}
      ${SL.p('<b>Det var ditt mest ansvarlige øyeblikk i år.</b>')}`},

    {label:'Topp %', bg:COL13.blue, h:()=>`
      ${SL.kick('Du var i')}<div class="s-word" style="font-size:62px;white-space:nowrap;color:${COL13.lime}">Topp 12 %</div>
      ${SL.p('av Taki-brukere som oftest leser forklaringen før de godkjenner.')}
      ${SL.p('Men du var også i <b>topp 30 %</b> for raskeste godkjenninger. Begge deler er deg.')}`},

    {label:'Oppsummering', bg:COL13.ink, hold:true, h:()=>`
      <div class="w13-sum">
        <div class="w13-sum-top"><div class="w13-sum-art">☕</div><div><em>Taki</em><b>2026 Wrapped</b></div></div>
        <div class="w13-sum-grid">
          <div><em>Topp-«artister»</em><ol><li>Kaffebrenneriet</li><li>Horsea renhold</li><li>ChatGPT Pro</li><li>Primeape</li><li>REMA 1000</li></ol></div>
          <div><em>Topp-«låter»</em><ol><li>Godkjenn</li><li>Last opp bilag</li><li>Spør Taki</li><li>Spør regnskapsfører</li><li>Avvis forslag</li></ol></div>
          <div><em>Minutter</em><b>1 312</b></div>
          <div><em>Topp-sjanger</em><b>Personal</b></div>
        </div>
        <div class="w13-sum-foot">Den tillitsfulle signereren · Mandora AS 2</div>
      </div>
      <button class="s-btn">Del ↗</button>`},
  ],
};
function r15(){ story(15); }
