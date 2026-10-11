/* ============ SCENARIO 10: Fremtiden Wrapped ============
   Samme hjemskjerm som scenario 9, men «Månedens wrap» åpnes som en Spotify Wrapped-aktig
   story (DECKS[10] nederst). Laptop-valget kan tas både i historien og på hjemskjermen.
   --- (opprinnelig beskrivelse for 9 under) ---
   Taki som spåmann (Taki Oracle + månedens wrap).
   Hjemskjerm med: månedens wrap-kort, «Taki ser fremover»-tidslinje, snarveier,
   og en beslutning som venter (kjøp laptop nå eller vent 30 dager) som du signerer.
   Klikk wrap-kortet for å åpne septemberwrapen (5 steg).
   Gjenoppbygd fra designet «Taki Future Wrap». */

const TL10 = [
  {date:'10. okt', title:'MVA-termin 3',                    sub:'Ca. 18 400 kr trekkes',        conf:'Sikker', ok:true},
  {date:'15. okt', title:'Nordlys AS betaler faktura',      sub:'Betaler i snitt 9 dager sent', conf:'78 %'},
  {date:'Uke 45',  title:'Tynn buffer hvis du kjøper laptop', sub:'Under 20 000 kr i to uker',  conf:'64 %'},
];

const WEEKS10 = [['U41',52,18],['U42',40,22],['U43',46,24],['U44',34,30],['U45',38,34]];

function r10(){
  const st = S[10], c = st.choice;
  meter(30 + (st.signed?15:0) + (st.answer?10:0));

  const box = c===null
    ? `<div class="f9-est"><div class="f9-el">Estimated available cash next month</div><div class="f9-ev" style="opacity:.45">–</div>
        <div class="f9-track"><u style="width:0"></u></div><div class="f9-ec">Velg et alternativ for å se hvordan bufferen din blir.</div></div>`
    : `<div class="f9-est"><div class="f9-el">Estimated available cash next month</div>
        <div class="f9-ev">${c==='buy'?'15 000 kr':'35 000 kr'}</div>
        <div class="f9-track"><u style="width:${c==='buy'?30:70}%;background:${c==='buy'?'#D9A04A':'#5FB08C'}"></u></div>
        <div class="f9-ec">${c==='buy'?'Lower cash buffer if the purchase goes ahead.':'Higher cash buffer if the purchase is postponed, assuming everything else stays the same.'}</div></div>`;

  const sign = c!==null && !st.signed
    ? `<div class="f9-sign"><button class="f9-signbtn" onclick="S[10].signed=true;r10()">${c==='buy'?'Signer: kjøp nå':'Signer: vent 30 dager'}</button><span>Du signerer valget. Taki logger begrunnelsen.</span></div>` : '';
  const signed = st.signed
    ? `<div class="f9-signed"><b>Signert av Christopher · ${c==='buy'?'kjøp nå':'vent 30 dager'}</b>
        <span>${c==='buy'?'Du gikk mot Takis forslag. Det er helt greit. Taki følger opp 8. november og viser hvordan det faktisk gikk i neste wrap.':'Påminnelse satt til 7. november. I novemberwrapen ser du om prognosen holdt, og hvor mye du sparte.'}</span>
        <button onclick="S[10].signed=false;S[10].choice=null;r10()">Angre signering</button></div>` : '';

  document.getElementById('v10f').innerHTML = `
    <div class="f9">
      <h1>God ettermiddag, Christopher</h1>
      <div class="f9-grid">
        <button class="f9-wrapcard" onclick="S[10].open=true;S[10].i=0;S[10].playing=true;r10()">
          <div class="f9-row"><span class="f9-tag">MÅNEDENS WRAPPED</span><span class="f9-small">Ny · 1. okt</span></div>
          <div class="f9-wc">
            <div class="f9-small">September er oppsummert</div>
            <div class="f9-wt">+43 750 kr i resultat.<br>Og jeg har en spådom for oktober.</div>
            <div class="f9-link">▶ Spill av september</div>
          </div>
        </button>

        <div class="f9-ahead">
          <span class="f9-tag light">TAKI SER FREMOVER</span>
          ${TL10.map(e=>`<div class="f9-ev-row"><div class="d">${e.date}</div><div class="t"><b>${e.title}</b><span>${e.sub}</span></div><div class="c ${e.ok?'ok':''}">${e.conf}</div></div>`).join('')}
          <div class="f9-small" style="margin-top:auto">Prosenten er hvor sikker Taki er. Du kan alltid overstyre.</div>
        </div>

        <div class="f9-tiles">
          <div>Last opp kvitteringer</div><div>Opprett faktura</div><div>Lag rapporter og analyser</div><div>Kontakt regnskapsfører</div>
        </div>
      </div>

      <section class="f9-dec">
        <div class="f9-dl">
          <div class="f9-kick">BESLUTNING SOM VENTER · 1 AV 1</div>
          <h2>Kjøpe ny laptop nå, eller vente 30 dager?</h2>
          <p>Taki har sett en planlagt utgift på 20 000 kr. MVA-terminen 10. oktober og en sen kundebetaling gjør at bufferen din blir tynn i november.</p>
          <div class="f9-btns">
            <button class="f9-pill ${c==='buy'?'on':''}" ${st.signed?'disabled':''} onclick="S[10].choice='buy';r10()">Kjøp nå</button>
            <button class="f9-pill ${c==='wait'?'on':''}" ${st.signed?'disabled':''} onclick="S[10].choice='wait';r10()">Vent 30 dager</button>
          </div>
          <div class="f9-sug">Takis forslag: <b>vent</b> · 74 % sikker · Taki traff 4 av 5 siste prognoser</div>
        </div>
        <div class="f9-dr">
          ${box}${sign}${signed}
          <div class="f9-fine">Illustrativ simulering. Du tar beslutningen, Taki forklarer mulige konsekvenser.</div>
        </div>
      </section>
    </div>
    <div id="v10o"></div>`;
  if(st.open) story(10);
}

/* ---------- September som Wrapped-story ---------- */
const C10 = {ink:'#120e1f', sand:'#EED9B4', lime:'#d7ff3a', pink:'#ff5fa2', orange:'#ff7a1a', blue:'#3d5afe', mint:'#5FB08C'};
DECKS[10] = {
  title: 'Fremtiden Wrapped', sub: '', you: 30, lessons: [], accountability: '',
  slides: [
    {label:'Intro', bg:`linear-gradient(150deg,${C10.sand} 0%,${C10.orange} 60%,${C10.pink} 100%)`, fg:C10.ink, h:()=>`
      <div class="s-center">${SL.kick('Taki · september 2026')}<div class="w13-blob"></div>
      <div class="s-word" style="font-size:58px;letter-spacing:-2.5px">Din<br>september<br>Wrapped</div>
      ${SL.p('Hei Christopher. Dette var din beste måned i år.')}</div>`},

    {label:'Resultat', bg:C10.ink, h:()=>`
      ${SL.kick('Resultat i september')}${SL.big(43750,' kr')}
      <div class="s-title" style="color:${C10.lime}">Høyeste i 2026</div>
      ${SL.p('Jeg gikk gjennom 214 transaksjoner og sammenlignet med de siste 12 månedene.')}`},

    {label:'Inn og ut', bg:C10.blue, h:()=>`
      ${SL.kick('Tallene dine')}
      <div class="w13-genres">
        <div style="background:${C10.lime};width:100%"><b>Inn</b><span>142 400 kr · +18 % fra august</span></div>
        <div style="background:${C10.pink};width:70%"><b>Ut</b><span>98 650 kr</span></div>
        <div style="background:#fff3e0;width:31%"><b>=</b><span>43 750 kr</span></div>
      </div>`},

    {label:'Mønsteret', bg:`linear-gradient(170deg,${C10.pink},#b0246a)`, h:()=>`
      ${SL.kick('Mønsteret jeg ser')}<div class="s-word" style="font-size:44px">12 abonnementer.</div>
      <div class="s-title">3 av dem gjør nesten det samme.</div>
      ${SL.p('Det er <b>1 340 kr i måneden</b>. Du bestemmer om noe skal sies opp.')}`},

    {label:'Taki i speilet', bg:C10.sand, fg:C10.ink, h:()=>`
      ${SL.kick('Taki ser seg selv i speilet')}<div class="s-title">I august spådde jeg 38 000 kr i buffer.<br>Det ble 41 200 kr.</div>
      <div class="s-bars">
        <div><span>Min spådom</span><i style="width:76%;background:#8A6A3A"></i><b>38 000</b></div>
        <div><span>Det som skjedde</span><i style="width:82%;background:${C10.ink}"></i><b>41 200</b></div>
      </div>
      ${SL.p('Jeg bommet med 8 % – fordi du utsatte et kjøp jeg ikke visste om. <b>Dine valg gjør prognosene mine bedre.</b> Treff: 4 av 5.')}`},

    {label:'Spådom', bg:C10.ink, h:()=>`
      ${SL.kick('Spådom for oktober')}<div class="s-word" style="font-size:40px;color:${C10.lime}">24–39 000 kr</div>
      ${SL.p('Det er der du trolig ender. 74 % sikker.')}
      <div class="s-months">${[[52,18],[40,22],[46,24],[34,30],[38,34]].map(([lo,hi],i)=>{const p=Math.round(lo/(lo+hi)*100);
        return `<div><i style="height:${(lo+hi)*1.3}px;background:linear-gradient(to top,${C10.lime} 0%,${C10.lime} ${p}%,rgba(255,255,255,.22) ${p}%)"></i><span>U${41+i}</span></div>`}).join('')}</div>
      ${SL.p('Fylt = sannsynlig. Lys = usikkerhet.')}`},

    {label:'Ditt valg', bg:`linear-gradient(160deg,${C10.orange},${C10.pink})`, fg:C10.ink, hold:true, h:()=>{
      const c = S[10].choice, sg = S[10].signed;
      return `${SL.kick('Beslutning som venter')}<div class="s-title">Kjøpe ny laptop nå, eller vente 30 dager?</div>
      <div class="s-choices quiz">
        <button class="${c==='buy'?'on':''}" ${sg?'disabled':''} onclick="S[10].choice='buy';render()"><b>Kjøp nå</b><em>Buffer ca. 15 000 kr i november</em></button>
        <button class="${c==='wait'?'on':''}" ${sg?'disabled':''} onclick="S[10].choice='wait';render()"><b>Vent 30 dager</b><em>Buffer ca. 35 000 kr · Takis forslag (74 %)</em></button>
      </div>
      ${c && !sg ? `<button class="s-btn" onclick="S[10].signed=true;render()">${c==='buy'?'Signer: kjøp nå':'Signer: vent 30 dager'}</button>` : ''}
      ${sg ? SL.p(`<b>Signert av Christopher.</b> ${c==='buy'?'Du gikk mot forslaget – helt greit. I novemberwrapen ser vi hvordan det gikk.':'Påminnelse 7. november. I novemberwrapen ser du om spådommen holdt.'}`) : ''}`}},

    {label:'Din tur', bg:C10.ink, hold:true, h:()=>{
      const a = S[10].answer;
      return `${SL.kick('Din tur')}<div class="s-word" style="font-size:40px">Tror du spådommen min stemmer?</div>
      <div class="s-choices quiz">
        <button class="${a==='yes'?'on':''}" onclick="S[10].answer='yes';render()">Ja, planlegg etter den</button>
        <button class="${a==='no'?'on':''}" onclick="S[10].answer='no';render()">Nei, jeg vet noe du ikke vet</button>
      </div>
      ${a ? SL.p(a==='yes'?'Avtalt. Men det er fortsatt min gjetning – jeg sier fra om virkeligheten sporer av.':'Fortell meg hva jeg ikke ser. I neste wrap ser vi hvem av oss som hadde rett.') : ''}`}},

    {label:'Oppsummering', bg:C10.ink, hold:true, h:()=>{
      const c = S[10].choice, sg = S[10].signed, a = S[10].answer;
      return `<div class="w13-sum" style="background:linear-gradient(160deg,${C10.sand},${C10.orange} 60%,${C10.pink})">
        <div class="w13-sum-top"><div class="w13-sum-art">✦</div><div><em>Taki</em><b>September Wrapped</b></div></div>
        <div class="w13-sum-grid">
          <div><em>Resultat</em><b>43 750 kr</b></div>
          <div><em>Takis treff</em><b>4 av 5</b></div>
          <div><em>Oktober</em><b>24–39k</b></div>
          <div><em>Ditt valg</em><b>${sg ? (c==='buy'?'Kjøp nå':'Vent') : 'Ikke signert'}</b></div>
        </div>
        <div class="w13-sum-foot">${a==='no'?'Du var uenig med Taki – vi ser hvem som hadde rett i oktober.':a==='yes'?'Du godtok spådommen – men den er fortsatt Takis gjetning.':'Du har ikke tatt stilling til spådommen ennå.'}</div>
      </div>
      <button class="s-btn">Del ↗</button>`}},
  ],
};
