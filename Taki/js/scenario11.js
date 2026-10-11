/* ============ SCENARIO 11: Pengeåret ============
   Wrapped som en bank-oppsummering. Endre tekst og tall direkte i slidene. */

DECKS[11] = {
  title: 'Pengeåret',
  sub: 'Hvor pengene gikk i 2026 – og hvor mye av det Taki gjorde uten at du så det.',
  you: 25,
  lessons: [
    'Ett stort tall per skjerm',
    'Morsomme fakta («nesten to kopper om dagen»)',
    'Topplister folk kjenner seg igjen i',
    'Et delbart kort til slutt',
  ],
  accountability: 'Pengeåret avslører at du har signert for 736 300 kr i utgifter, men bare åpnet 1 av 4 bilag. Slutten inviterer deg til å se på de du aldri åpnet.',
  slides: [
    {label:'Intro', bg:'linear-gradient(160deg,#ff6a55,#ff3d6e)', h:()=>`
      <div class="s-center">${SL.kick('Mandora AS 2')}<div class="s-word" style="font-size:54px">Ditt<br>pengeår<br>2026</div>
      ${SL.p('Trykk for å se hvor pengene gikk.')}</div>`},

    {label:'Totalt', bg:'#13213a', h:()=>`
      ${SL.kick('Gjennom 2026 gikk det')}${SL.big(2148600,' kr')}
      ${SL.p('gjennom bedriften din – inn og ut.')}
      <div class="s-two"><div><span>Inn</span><b>1 412 300 kr</b></div><div><span>Ut</span><b>736 300 kr</b></div></div>`},

    {label:'Kategorier', bg:'linear-gradient(170deg,#13213a,#24406b)', h:()=>`
      ${SL.kick('Her gikk utgiftene')}<div class="s-title">Lønn spiste mest.<br>Kaffe overrasket.</div>
      <div class="s-bars">${[['Lønn',41,'#ff6a55'],['Husleie',18,'#ffb36b'],['Data og abonnement',9,'#7fe0c4'],['Renhold',6,'#9fb7ff'],['Kaffe og kantine',4,'#ffd84d']].map(([t,p,c])=>
        `<div><span>${t}</span><i style="width:${p*2}%;background:${c}"></i><b>${p} %</b></div>`).join('')}</div>`},

    {label:'Toppleverandør', bg:'linear-gradient(160deg,#ffd84d,#ff9f43)', fg:'#2a1a00', h:()=>`
      ${SL.kick('Din mest besøkte leverandør')}<div class="s-emoji">☕</div>
      <div class="s-word" style="font-size:40px">Kaffe&shy;brenneriet</div>
      ${SL.p('<b>23 kjøp · 6 970 kr</b><br>Det er nesten to kopper om dagen for hele teamet.')}`},

    {label:'Taki og du', bg:'#0e1a2e', h:()=>`
      ${SL.kick('Taki behandlet')}${SL.big(1240,' bilag')}
      ${SL.p('Du åpnet <b style="color:#7fe0c4">312</b> av dem. Hver prikk er 12 bilag.')}
      <div class="s-dots">${Array.from({length:100},(_,i)=>`<i class="${i<25?'on':''}" style="animation-delay:${i*12}ms"></i>`).join('')}</div>
      <div class="s-legend"><span><i style="background:#7fe0c4"></i>Du så</span><span><i style="background:#2b3a55"></i>Bare Taki</span></div>`},

    {label:'Din måned', bg:'linear-gradient(170deg,#24406b,#13213a)', h:()=>`
      ${SL.kick('Måneden du var mest med')}<div class="s-word">Mars</div>
      ${SL.p('Du åpnet 61 % av bilagene – rett før mva-fristen.')}
      <div class="s-months">${[34,28,61,22,18,12,8,15,27,33,30,40].map((v,i)=>`<div><i style="height:${v*1.4}px;${i===2?'background:#ff6a55':''}"></i><span>${'JFMAMJJASOND'[i]}</span></div>`).join('')}</div>`},

    {label:'Du signerte', bg:'linear-gradient(160deg,#ff3d6e,#a2224f)', h:()=>`
      ${SL.kick('Med navnet ditt')}<div class="s-title">Du signerte for</div>${SL.big(736300,' kr')}
      ${SL.p('i utgifter. Taki forberedte – men det er du som står ansvarlig for hver krone.')}
      <button class="s-btn">Se de 928 bilagene du aldri åpnet →</button>`},

    {label:'Del', bg:'#0e1a2e', hold:true, h:()=>SL.share('Mitt pengeår', [['2,1 mill','kr gjennom bedriften'],['Kaffe­brenneriet','toppleverandør'],['25 %','av bilagene sjekket selv'],['Mars','min mest aktive måned']], 'linear-gradient(160deg,#ff6a55,#ff3d6e)')},
  ],
};
function r11(){ story(11); }
