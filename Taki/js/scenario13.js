/* ============ SCENARIO 13: Læringsåret ============
   Wrapped som et læringsår: begreper, type, ferdigheter og en liten quiz. */

DECKS[13] = {
  title: 'Læringsåret',
  sub: 'Hva du lærte om regnskap i 2026 – og hvordan du trengte Taki mindre og mindre.',
  you: 38,
  lessons: [
    'En «type» du kan kjenne deg igjen i',
    'Ferdighetsnivåer som et spill',
    'Fremgang over tid (færre spørsmål)',
    'En liten quiz midt i historien',
  ],
  accountability: 'Her er målet at du skal forstå nok til å se når Taki tar feil. «Du tok igjen Taki 3 ganger» gjør det synlig at ansvaret ditt faktisk betyr noe.',
  slides: [
    {label:'Intro', bg:'linear-gradient(160deg,#7a5cff,#b06cff)', h:()=>`
      <div class="s-center"><div class="mascot">✦</div><div class="s-word" style="font-size:46px">Se hva du<br>lærte i 2026!</div>
      ${SL.p('Taki har fulgt med. Du har blitt flinkere enn du tror.')}</div>`},

    {label:'Begreper', bg:'#fff7e0', fg:'#2b2140', h:()=>`
      ${SL.kick('Du lærte')}${SL.big(7,' nye begreper')}
      <div class="s-chips">${['Mva-fradrag','Omvendt avgiftsplikt','Velferd vs. representasjon','Avskrivning','Periodisering','Bilagsplikt','Mellomværende'].map((c,i)=>`<span style="animation-delay:${i*90}ms">${c}</span>`).join('')}</div>`},

    {label:'Færre spørsmål', bg:'linear-gradient(170deg,#7a5cff,#5636d9)', h:()=>`
      ${SL.kick('Spørsmål til Taki per måned')}<div class="s-title">Fra 41 i januar<br>til 6 i desember</div>
      <svg class="s-line" viewBox="0 0 300 120"><polyline fill="none" stroke="#ffd84d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
        points="${[41,36,30,27,22,20,19,14,11,9,8,6].map((v,i)=>`${i*27+3},${118-v*2.6}`).join(' ')}"/>
        ${[41,36,30,27,22,20,19,14,11,9,8,6].map((v,i)=>`<circle cx="${i*27+3}" cy="${118-v*2.6}" r="${i===0||i===11?5:3}" fill="#ffd84d"/>`).join('')}</svg>
      ${SL.p('Ikke fordi du sluttet å bry deg – men fordi du skjønte mer selv.')}`},

    {label:'Din type', bg:'linear-gradient(160deg,#ffd84d,#ffb02e)', fg:'#2b2140', h:()=>`
      ${SL.kick('Din regnskapstype')}<div class="s-emoji">🔍</div>
      <div class="s-word" style="font-size:38px">Den nysgjerrige kontrolløren</div>
      ${SL.p('Du godtar sjelden noe uten å skjønne hvorfor. Du spør heller én gang for mye enn én gang for lite.')}
      <div class="s-chips dark"><span>Spør regnskapsfører</span><span>Leser forklaringer</span><span>Sjekker mva</span></div>`},

    {label:'Ferdigheter', bg:'#fff7e0', fg:'#2b2140', h:()=>`
      ${SL.kick('Ferdighetene dine')}<div class="s-title">Nivå for nivå</div>
      <div class="s-skills">${[['🧾','Kvitteringer',4],['📤','Fakturaer',3],['🏦','Bank',3],['§','Mva',2],['📘','Årsoppgjør',0]].map(([i,t,l])=>
        `<div class="${l?'':'lock'}"><span>${l?i:'🔒'}</span><div><b>${t}</b><i>${[1,2,3,4,5].map(n=>`<u class="${n<=l?'on':''}"></u>`).join('')}</i></div><em>${l?`Nivå ${l}`:'Låst'}</em></div>`).join('')}</div>`},

    {label:'Quiz', bg:'linear-gradient(160deg,#7a5cff,#b06cff)', hold:true, h:()=>{
      const q = S[13].quiz;
      const opt = (k,t) => `<button class="${q===k?(k==='nei'?'right':'wrong'):''}" onclick="S[13].quiz='${k}';render()">${t}</button>`;
      return `${SL.kick('Rask quiz')}<div class="s-title">Får du fradrag for mva på fredagskaffe til teamet?</div>
      <div class="s-choices quiz">${opt('ja','Ja, alltid')}${opt('nei','Nei, vanligvis ikke')}${opt('vet','Bare hvis kvitteringen sier det')}</div>
      ${q ? SL.p(q==='nei' ? '🎉 Riktig! Kaffe til ansatte er velferd – da gis det vanligvis ikke fradrag. Det lærte du i september.' : 'Ikke helt. Kaffe til ansatte er velferd, og da gis det vanligvis ikke fradrag. Du lærte dette i september – lett å glemme!') : ''}`}},

    {label:'Tok igjen Taki', bg:'#2b2140', h:()=>`
      ${SL.kick('Du tok igjen Taki')}${SL.big(3,' ganger')}
      <div class="s-rows">
        <div><span>✋</span><div><b>Faktura til Nike</b><em>Du så at 1,25 kr var feil – skulle vært 1 250 kr</em></div></div>
        <div><span>✋</span><div><b>Kvittering #51</b><em>Du visste at kaffen var velferd, ikke drift</em></div></div>
        <div><span>✋</span><div><b>Mva-melding</b><em>Du fant en post Taki hadde ført dobbelt</em></div></div>
      </div>`},

    {label:'Del', bg:'#2b2140', hold:true, h:()=>SL.share('Mitt læringsår', [['7','nye begreper'],['−85 %','færre spørsmål'],['Kontrolløren','min regnskapstype'],['3','ganger jeg tok igjen Taki']], 'linear-gradient(160deg,#7a5cff,#b06cff)')},
  ],
};
function r13(){ story(13); }
