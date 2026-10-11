/* ============ shared data ============ */
const RECEIPT = [
  ['r-vendor','Kaffebrenneriet Kristiansand AS'],
  ['r-vendor','Markens gate 5, 4611 Kristiansand'],
  ['r-vendor','Org.nr 987 654 321 MVA'],
  [null,''],
  [null,'KVITTERING'],
  [null,''],
  ['r-date','Dato: 2026-09-14 09:42'],
  [null,'Kvittering nr: 55021'],
  [null,''],
  [null,'Vare                  Antall   Pris    Sum'],
  ['r-items','Kaffe filtermalt 500 g   2  129,00  258,00'],
  ['r-items','Bakverk                  1   45,00   45,00'],
  [null,''],
  ['r-sum','Sum inkl. mva                     303,00 NOK'],
  ['r-mva','Herav mva 15 %                     39,52'],
  [null,''],
  ['r-card','Betalt med kort **** 4321'],
  [null,'Takk for handelen!'],
];

const IDEAS = {
  1:{name:'Vis arbeidet', insp:'Egen idé', text:'<b>Taki forklarer seg.</b> Klikk et felt for å se hvor det kommer fra på kvitteringen. Nye brukere må sjekke hvert felt før de kan godkjenne – støtten trappes ned etter 5 kvitteringer.'},
  2:{name:'Du først', insp:'Egen idé', text:'<b>Du gjetter før Taki svarer.</b> Taki holder forslaget skjult til du har gjort din egen vurdering. Så sammenligner dere og ser hvor dere er uenige.'},
  4:{name:'Sporet', insp:'Medisinsk tidslinje (referansebilde)', text:'<b>Ikke en chat, men et spor.</b> Hver oppgave er et punkt på en tidslinje. Du ser hvem som gjorde hva – Taki, du eller regnskapsføreren – og kan gå tilbake og se over det du godkjente for fort.'},
  5:{name:'Teamet', insp:'SugarCRM Customer Journeys', text:'<b>Arbeidet som en samtale i et team.</b> Du, en kollega, regnskapsføreren og Taki har hver sin sone. Pilene viser hvem som ga oppgaven videre til hvem – og hvem som til slutt står ansvarlig.'},
  6:{name:'Karakter', insp:'Workshop: AI som karakter', text:'<b>Taki som en karakter.</b> Taki later ikke som den er ekspert – den spør enkelt og litt naivt, så du må tenke selv. Prøv de tre nivåene og kjenn hvordan ansvaret flytter seg.'},
  7:{name:'Barnebakken', insp:'Workshop: Barnebakken', text:'<b>Begrenset med spørsmål.</b> Du fyller ut selv og har bare 3 spørsmål til Taki på denne kvitteringen. Det du tenker, er resultatet – gode spørsmål gir gode svar.'},
  8:{name:'Kollektivet', insp:'Workshop: Taki kollektiv', text:'<b>Se hva andre gjorde.</b> Taki foreslår ingenting selv, men viser hva lignende bedrifter og regnskapsførere valgte for samme type kjøp. Du bestemmer.'},
  11:{name:'Pengeåret', insp:'Monzo – Year in Monzo', text:'<b>Wrapped som en bank-oppsummering</b>. Hvor pengene gikk – og hvor mye av det Taki gjorde alene mens du signerte.'},
  12:{name:'Innsatsåret', insp:'Strava – Year in Sport', text:'<b>Wrapped som et treningsår</b>. Feirer innsatsen din: dager du var innom, streaks, rekorder og kudos fra regnskapsføreren.'},
  13:{name:'Læringsåret', insp:'Duolingo – Year in Review', text:'<b>Wrapped som et læringsår</b>. Hva du lærte, hvilken regnskapstype du er, og hvordan du trengte Taki mindre og mindre.'},
  14:{name:'Replay', insp:'Apple Music Replay', text:'<b>Wrapped som en musikk-replay</b>. Årets topp-leverandører og kontoer som «hits» – og B-sidene du aldri hørte på.'},
  15:{name:'Wrapped', insp:'Spotify Wrapped', text:'<b>Wrapped som du kjenner den</b> – topp-«artist», topp-sjangre, personlighetstype og et kort du kan dele. Men den feirer hvor involvert du var, ikke bare hvor mye som skjedde.'},
  16:{name:'Wrapped-widget', insp:'Spotify Wrapped (på hjemskjermen)', text:'<b>Wrapped der du allerede er.</b> I stedet for en egen side lever Wrapped som en widget på Taki-hjemskjermen. Den viser ett høydepunkt om gangen – klikk for hele historien.'},
  9:{name:'Fremtiden', insp:'Taki Oracle + månedens wrap (egen idé)', text:'<b>Taki som spåmann.</b> Månedens wrap oppsummerer måneden, ser tilbake på Takis egen forrige spådom og spår neste måned. Under: kjøp nå eller vent? Du ser utfallet, velger og signerer – og i neste wrap ser dere hvem som hadde rett.'},
  10:{name:'Fremtiden Wrapped', insp:'Spotify Wrapped + Taki Oracle', text:'<b>Månedens wrap som en Wrapped-historie.</b> Samme hjemskjerm som 9, men september åpnes som en Spotify Wrapped-aktig story: ett stort tall per skjerm, Taki som sjekker sin egen spådom, oktober-spådommen – og laptop-valget du signerer inne i historien.'},
  3:{name:'Vit hva du signerer', insp:'Egen idé', text:'<b>Taki gjør jobben, men viser hvor sikker den er.</b> Du bruker tid bare på det usikre, og før du signerer ser du nøyaktig hva du står ansvarlig for.'},
};

let scenario = +(location.hash.replace('#','')) || 1;
let S = {}; // per-scenario state

function initState(){
  S = {
    1:{checked:{}, open:null, done:false},
    2:{purpose:null, vat:null, revealed:false, final:null, done:false},
    3:{purpose:null, asked:false, replied:false, showSure:false, sheet:false, ack:false, done:false},
    4:{filter:'all', sel:null, week:null, reviewed:{}},
    5:{flow:'kvitt', sel:null, play:null},
    6:{level:'ny', step:0, ans:{}, done:false},
    7:{left:3, asked:[], konto:'', mva:'', checked:false, done:false},
    8:{group:'like', konto:'', mva:'', done:false},
    9:{choice:null, signed:false, wrap:false, step:0, answer:null},
    10:{choice:null, signed:false, open:false, i:0, playing:true, pick:null, answer:null},
    11:{i:0, playing:true}, 12:{i:0, playing:true, goal:null}, 13:{i:0, playing:true, quiz:null}, 14:{i:0, playing:true, bsides:false}, 15:{i:0, playing:true}, 16:{i:0, playing:true, open:false, w:0},
  };
}
initState();
