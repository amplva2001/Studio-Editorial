/* ============ SCENARIO 9: Fremtiden ============
   Taki som spåmann (Taki Oracle + månedens wrap).
   Hjemskjerm med: månedens wrap-kort, «Taki ser fremover»-tidslinje, snarveier,
   og en beslutning som venter (kjøp laptop nå eller vent 30 dager) som du signerer.
   Klikk wrap-kortet for å åpne septemberwrapen (5 steg).
   Gjenoppbygd fra designet «Taki Future Wrap». */

const TL9 = [
  {date:'10. okt', title:'MVA-termin 3',                    sub:'Ca. 18 400 kr trekkes',        conf:'Sikker', ok:true},
  {date:'15. okt', title:'Nordlys AS betaler faktura',      sub:'Betaler i snitt 9 dager sent', conf:'78 %'},
  {date:'Uke 45',  title:'Tynn buffer hvis du kjøper laptop', sub:'Under 20 000 kr i to uker',  conf:'64 %'},
];

const WEEKS9 = [['U41',52,18],['U42',40,22],['U43',46,24],['U44',34,30],['U45',38,34]];

function wrap9(){
  const st = S[9], s = st.step, last = 4, dark = s === last, a = st.answer;
  const bgs = ['#EED9B4','#F4EFE8','#E9DCC8','#F4EFE8','#1B1A19'];
  const dots = [0,1,2,3,4].map(i=>`<i class="${i===s?'on':''} ${i<=s?'past':''}"></i>`).join('');
  let body = '';
  if(s===0) body = `
    <div class="f9-st">
      <div class="f9-k">Hei Christopher.</div>
      <div class="f9-huge">September var din beste måned i år.</div>
      <div class="f9-p">Jeg har gått gjennom 214 transaksjoner, sammenlignet med de siste 12 månedene og laget en spådom for oktober. Du bestemmer hva vi gjør med den.</div>
    </div>`;
  if(s===1) body = `
    <div class="f9-st">
      <div class="f9-k">Tallene dine</div>
      <div class="f9-three">
        <div><span>Inntekter</span><b>142 400 kr</b><em class="up">+18 % fra august</em></div>
        <div><span>Utgifter</span><b>98 650 kr</b><em>Omtrent som snittet</em></div>
        <div class="dark"><span>Resultat</span><b>43 750 kr</b><em class="mint">Høyeste i 2026</em></div>
      </div>
      <div class="f9-p ink">Mønsteret jeg ser: du har 12 programvareabonnementer, og 3 av dem gjør nesten det samme. Det er 1 340 kr i måneden.</div>
    </div>`;
  if(s===2) body = `
    <div class="f9-st">
      <div class="f9-k">Taki ser seg selv i speilet</div>
      <div class="f9-big">I august spådde jeg 38 000 kr i buffer. Det ble 41 200 kr.</div>
      <div class="f9-cmp">
        <div><span>Min spådom</span><span>38 000 kr</span></div><i><u style="width:76%;background:#8A6A3A"></u></i>
        <div><span>Det som faktisk skjedde</span><span>41 200 kr</span></div><i><u style="width:82%;background:#1A1714"></u></i>
      </div>
      <div class="f9-p">Jeg bommet med 8 %, fordi du valgte å utsette et kjøp jeg ikke visste om. Dine valg gjør prognosene mine bedre. Treffsikkerhet siste 5 måneder: 4 av 5.</div>
    </div>`;
  if(s===3) body = `
    <div class="f9-st row">
      <div style="flex:1;display:flex;flex-direction:column;gap:18px">
        <div class="f9-k">Spådom for oktober</div>
        <div class="f9-big">Du ender trolig mellom 24&nbsp;000 og 39&nbsp;000 kr.</div>
        <div class="f9-p">Det som trekker ned: MVA 10. okt og at Nordlys AS pleier å betale sent. Det som kan trekke opp: om du venter med laptopen.</div>
      </div>
      <div class="f9-weeks">
        <div class="f9-wh">Kontantbeholdning, uke for uke</div>
        <div class="f9-bars">${WEEKS9.map(([l,lo,hi])=>{const p=Math.round(lo/(lo+hi)*100);
          return `<div><i style="height:${lo+hi}%;background:linear-gradient(to top,#1A1714 0%,#1A1714 ${p}%,#D9C9B2 ${p}%,#D9C9B2 100%)"></i><span>${l}</span></div>`}).join('')}</div>
        <div class="f9-wh">Mørk del = sannsynlig. Lys del = usikkerhet. 74 % sikker.</div>
      </div>
    </div>`;
  if(s===4) body = `
    <div class="f9-st">
      <div class="f9-k" style="color:#C9C1B7">Din tur</div>
      <div class="f9-huge" style="font-size:58px">Tror du spådommen min stemmer?</div>
      <div class="f9-btns">
        <button class="f9-pill ${a==='yes'?'on':''}" onclick="S[9].answer='yes';r9()">Ja, planlegg etter den</button>
        <button class="f9-pill ${a==='no'?'on':''}" onclick="S[9].answer='no';r9()">Nei, jeg vet noe du ikke vet</button>
      </div>
      ${a ? `<div class="f9-ans"><b>${a==='yes'?'Avtalt. Oktoberplanen er lagt på Hjem.':'Fortell meg hva jeg ikke ser.'}</b>
        <span>${a==='yes'?'Du har godkjent prognosen, men den er fortsatt min gjetning. Jeg sier fra med en gang virkeligheten sporer av.':'Et stort oppdrag på vei? En kunde som slutter? Det du vet, justerer spådommen, og i neste wrap ser vi hvem av oss som hadde rett.'}</span></div>` : ''}
      <div class="f9-fine">Septemberwrapen er godkjent av deg og lagret i regnskapet. Illustrativt eksempel.</div>
    </div>`;

  return `<div class="f9-ov" onclick="if(event.target===this){S[9].wrap=false;r9()}">
    <div class="f9-wrap ${dark?'dark':''}" style="background:${bgs[s]}">
      <div class="f9-wtop">
        <div style="display:flex;align-items:center;gap:14px"><b style="font-size:22px">TAKI</b><span class="f9-tag">WRAP · SEPTEMBER 2026</span></div>
        <div class="f9-dots">${dots}</div>
        <button class="f9-close" onclick="S[9].wrap=false;r9()">Lukk ✕</button>
      </div>
      <div class="f9-wbody">${body}</div>
      <div class="f9-wfoot">
        <button class="f9-prev" style="visibility:${s===0?'hidden':'visible'}" onclick="S[9].step=${Math.max(0,s-1)};r9()">← Forrige</button>
        <button class="f9-next" onclick="${s===last?'S[9].step=0;S[9].answer=null':`S[9].step=${s+1}`};r9()">${s===last?'Start på nytt':'Neste →'}</button>
      </div>
    </div></div>`;
}

function r9(){
  const st = S[9], c = st.choice;
  meter(30 + (st.signed?15:0) + (st.answer?10:0));

  const box = c===null
    ? `<div class="f9-est"><div class="f9-el">Estimated available cash next month</div><div class="f9-ev" style="opacity:.45">–</div>
        <div class="f9-track"><u style="width:0"></u></div><div class="f9-ec">Velg et alternativ for å se hvordan bufferen din blir.</div></div>`
    : `<div class="f9-est"><div class="f9-el">Estimated available cash next month</div>
        <div class="f9-ev">${c==='buy'?'15 000 kr':'35 000 kr'}</div>
        <div class="f9-track"><u style="width:${c==='buy'?30:70}%;background:${c==='buy'?'#D9A04A':'#5FB08C'}"></u></div>
        <div class="f9-ec">${c==='buy'?'Lower cash buffer if the purchase goes ahead.':'Higher cash buffer if the purchase is postponed, assuming everything else stays the same.'}</div></div>`;

  const sign = c!==null && !st.signed
    ? `<div class="f9-sign"><button class="f9-signbtn" onclick="S[9].signed=true;r9()">${c==='buy'?'Signer: kjøp nå':'Signer: vent 30 dager'}</button><span>Du signerer valget. Taki logger begrunnelsen.</span></div>` : '';
  const signed = st.signed
    ? `<div class="f9-signed"><b>Signert av Christopher · ${c==='buy'?'kjøp nå':'vent 30 dager'}</b>
        <span>${c==='buy'?'Du gikk mot Takis forslag. Det er helt greit. Taki følger opp 8. november og viser hvordan det faktisk gikk i neste wrap.':'Påminnelse satt til 7. november. I novemberwrapen ser du om prognosen holdt, og hvor mye du sparte.'}</span>
        <button onclick="S[9].signed=false;S[9].choice=null;r9()">Angre signering</button></div>` : '';

  document.getElementById('v9f').innerHTML = `
    <div class="f9">
      <h1>God ettermiddag, Christopher</h1>
      <div class="f9-grid">
        <button class="f9-wrapcard" onclick="S[9].wrap=true;S[9].step=0;r9()">
          <div class="f9-row"><span class="f9-tag">MÅNEDENS WRAP</span><span class="f9-small">Ny · 1. okt</span></div>
          <div class="f9-wc">
            <div class="f9-small">September er oppsummert</div>
            <div class="f9-wt">+43 750 kr i resultat.<br>Og jeg har en spådom for oktober.</div>
            <div class="f9-link">Se måneden din →</div>
          </div>
        </button>

        <div class="f9-ahead">
          <span class="f9-tag light">TAKI SER FREMOVER</span>
          ${TL9.map(e=>`<div class="f9-ev-row"><div class="d">${e.date}</div><div class="t"><b>${e.title}</b><span>${e.sub}</span></div><div class="c ${e.ok?'ok':''}">${e.conf}</div></div>`).join('')}
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
            <button class="f9-pill ${c==='buy'?'on':''}" ${st.signed?'disabled':''} onclick="S[9].choice='buy';r9()">Kjøp nå</button>
            <button class="f9-pill ${c==='wait'?'on':''}" ${st.signed?'disabled':''} onclick="S[9].choice='wait';r9()">Vent 30 dager</button>
          </div>
          <div class="f9-sug">Takis forslag: <b>vent</b> · 74 % sikker · Taki traff 4 av 5 siste prognoser</div>
        </div>
        <div class="f9-dr">
          ${box}${sign}${signed}
          <div class="f9-fine">Illustrativ simulering. Du tar beslutningen, Taki forklarer mulige konsekvenser.</div>
        </div>
      </section>
    </div>
    ${st.wrap ? wrap9() : ''}`;
}
