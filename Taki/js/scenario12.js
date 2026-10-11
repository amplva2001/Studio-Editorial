/* ============ SCENARIO 12: Innsatsåret ============
   Wrapped som et treningsår: innsats, streaks, rekorder, kudos og mål. */

function heat10(){
  // 53 uker x 7 dager, mer aktivitet rundt mva-frister (mars, juni, sep) – oppdiktet data
  let seed = 7; const rnd = ()=> (seed = (seed*9301+49297)%233280)/233280;
  let out = '';
  for(let w=0; w<53; w++){
    const peak = [10,24,36,48].some(p=>Math.abs(w-p)<=2) ? .45 : 0;
    for(let d=0; d<7; d++){
      const r = rnd() + peak - (d>4?.5:0);
      const lv = r>1.1?4 : r>.85?3 : r>.62?2 : r>.45?1 : 0;
      out += `<i class="h${lv}"></i>`;
    }
  }
  return out;
}

DECKS[12] = {
  title: 'Innsatsåret',
  sub: 'Ikke hvor mye pengene beveget seg – men hvor mye du gjorde selv.',
  you: 31,
  lessons: [
    'Feirer innsats, ikke bare resultat',
    'Streaks og personlige rekorder',
    'Kudos fra andre (regnskapsføreren)',
    'Avslutter med et mål for neste år',
  ],
  accountability: 'Rekordene viser også det ubehagelige: raskeste godkjenning var 2 sekunder. Målet til slutt gjør oversikt til noe du jobber mot – som trening.',
  slides: [
    {label:'Intro', bg:'linear-gradient(165deg,#0f1f17,#1c3a2a)', h:()=>`
      <div class="s-center">${SL.kick('2026')}<div class="s-word" style="font-size:52px;color:#c6f432">Innsats&shy;året<br>ditt</div>
      ${SL.p('Taki gjorde mye. Men hva gjorde du?')}</div>`},

    {label:'Dager', bg:'#0f1f17', h:()=>`
      ${SL.kick('Du var innom regnskapet')}${SL.big(148,' dager')}
      <div class="s-heat">${heat10()}</div>
      <div class="s-legend"><span>Mindre</span><span class="hl"><i class="h0"></i><i class="h1"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i></span><span>Mer</span></div>`},

    {label:'Streak', bg:'linear-gradient(165deg,#c6f432,#7bd627)', fg:'#10200a', h:()=>`
      ${SL.kick('Lengste streak')}<div class="s-emoji">🔥</div>${SL.big(19,' dager')}
      ${SL.p('på rad i mars – du sjekket regnskapet hver eneste arbeidsdag fram mot mva-fristen.')}`},

    {label:'Rekorder', bg:'#0f1f17', h:()=>`
      ${SL.kick('Personlige rekorder')}<div class="s-title">Årets PR-er</div>
      <div class="s-rows">
        <div><span>🏅</span><div><b>34 bilag</b><em>flest sjekket på én dag · 14. mars</em></div></div>
        <div><span>⏱️</span><div><b>22 min</b><em>lengste gjennomgang · mva-melding 4. termin</em></div></div>
        <div><span>🙋</span><div><b>5 spørsmål</b><em>til regnskapsfører på én uke · uke 35</em></div></div>
        <div class="warn"><span>⚡</span><div><b>2 sek</b><em>raskeste godkjenning – ikke en rekord å være stolt av</em></div></div>
      </div>`},

    {label:'Splits', bg:'linear-gradient(165deg,#1c3a2a,#0f1f17)', h:()=>`
      ${SL.kick('Splits per kvartal')}<div class="s-title">Din andel av arbeidet</div>
      <div class="s-splits">${[['K1',38],['K2',22],['K3',29],['K4',35]].map(([q,v])=>
        `<div><span>${q}</span><i style="width:${v*2}%"></i><b>${v} %</b></div>`).join('')}</div>
      ${SL.p('Sommeren var tung – K2 lot du Taki gjøre nesten alt.')}`},

    {label:'Kudos', bg:'linear-gradient(165deg,#2d5a3f,#1c3a2a)', h:()=>`
      ${SL.kick('Kudos')}<div class="s-emoji">👏</div>
      <div class="s-title">Mandora ga deg kudos <span style="color:#c6f432">6 ganger</span></div>
      <div class="s-quote">«Bra fanget på parkeringskvitteringen!»<em>– Mandora TEST, regnskapsfører</em></div>
      <div class="s-quote">«Riktig å spørre om omvendt avgiftsplikt.»<em>– Mandora TEST</em></div>`},

    {label:'Mål 2027', bg:'#0f1f17', hold:true, h:()=>{
      const g = S[12].goal;
      return `${SL.kick('Neste år')}<div class="s-title">Sett et mål for 2027</div>
      <div class="s-choices">${[['30','Sjekk 30 % selv','Litt mer enn i år'],['50','Sjekk halvparten selv','Ambisiøst'],['streak','En 30-dagers streak','Hver dag i en måned']].map(([k,t,d])=>
        `<button class="${g===k?'on':''}" onclick="S[12].goal='${k}';render()"><b>${t}</b><em>${d}</em></button>`).join('')}</div>
      ${g?SL.p('Lagret! Taki minner deg på det når du godkjenner for fort.'):''}`}},

    {label:'Del', bg:'#0f1f17', hold:true, h:()=>SL.share('Mitt innsatsår', [['148','dager innom'],['19 dager','lengste streak'],['31 %','av arbeidet gjort selv'],['6','kudos fra regnskapsfører']], 'linear-gradient(165deg,#c6f432,#4fae3a)')},
  ],
};
function r12(){ story(12); }
