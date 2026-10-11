/* ============ STORY-SPILLER (brukes av scenario 9–12) ============
   Et «deck» har:
     title, sub      – tekst ved siden av telefonen
     you             – din andel av arbeidet (til tilsyns-måleren)
     lessons         – hva vi lånte fra formatet
     accountability  – hvordan det handler om ansvar
     slides          – liste med {bg, fg, label, hold, h:()=>html}
   hold:true = slide med knapper, spilles ikke automatisk videre. */

const STORY_MS = 6500;
const DECK_ALIAS = {16:15};            // scenario 16 gjenbruker Wrapped-decket fra 15
const COMPACT = {10:'v10o', 16:'v14o'}; // disse spilles av i et vindu over siden
function closeStory(k){ S[k].open = false; render(); }
const deckOf = n => DECKS[n] || DECKS[DECK_ALIAS[n]];
let storyTimer = null;
function stopStory(){ if(storyTimer){ clearTimeout(storyTimer); storyTimer = null; } if(window.stop14) stop14(); }

function storyGo(n){
  const deck = deckOf(scenario), st = S[scenario];
  st.i = Math.max(0, Math.min(deck.slides.length-1, n));
  render();
}
function storyToggle(){ S[scenario].playing = !S[scenario].playing; render(); }

function story(key){
  const deck = deckOf(key), st = S[key], sl = deck.slides[st.i];
  const compact = COMPACT[key];
  stopStory();
  meter(deck.you);

  const segs = deck.slides.map((s,i)=>`<span class="${i<st.i?'done':''} ${i===st.i?'cur':''}">
      <i style="${i===st.i?`animation-duration:${STORY_MS}ms;animation-play-state:${st.playing && !s.hold?'running':'paused'}`:''}"></i></span>`).join('');

  const phone = `
      <div class="phone" style="background:${sl.bg};color:${sl.fg||'#fff'}">
        <div class="prog">${segs}</div>
        <div class="ph-top"><span class="ph-logo">TAKI <em>wrapped</em></span>
          <button class="ph-btn" onclick="storyToggle()" title="Pause/spill">${st.playing?'❚❚':'▶'}</button></div>
        <div class="tap tapL" onclick="storyGo(${st.i-1})"></div>
        <div class="tap tapR" onclick="storyGo(${st.i+1})"></div>
        <div class="slide" key="${st.i}">${sl.h()}</div>
        <div class="ph-foot">${st.i+1} / ${deck.slides.length}</div>
      </div>`;

  if(compact){
    document.getElementById(compact).innerHTML = `<div class="w14-ov" onclick="if(event.target===this)closeStory(${key})">
      <div class="w14-ph">${phone}<button class="w14-x" onclick="closeStory(${key})">✕ Lukk</button></div></div>`;
  } else {
  document.getElementById('vs').innerHTML = `
    <div class="vs-inner">
      <aside class="vs-side">
        <div class="vs-kick">Taki Wrapped</div>
        <h1>${deck.title}</h1>
        <p>${deck.sub}</p>
        <div class="vs-card"><b>Lånt fra formatet</b><ul>${deck.lessons.map(l=>`<li>${l}</li>`).join('')}</ul></div>
        <div class="vs-card acc"><b>Hvor ansvaret kommer inn</b><p>${deck.accountability}</p></div>
      </aside>
      ${phone}
      <aside class="vs-list">
        <div class="vs-kick" style="margin-bottom:10px">Slides</div>
        ${deck.slides.map((s,i)=>`<button class="${i===st.i?'on':''}" onclick="storyGo(${i})"><span style="background:${s.bg}"></span>${s.label}</button>`).join('')}
        <div class="small" style="margin-top:12px;line-height:1.5">Klikk høyre/venstre på telefonen, eller bruk piltastene. Mellomrom = pause.</div>
      </aside>
    </div>`;
  }

  countUp();
  if(st.playing && !sl.hold && st.i < deck.slides.length-1){
    storyTimer = setTimeout(()=>storyGo(st.i+1), STORY_MS);
  }
}

/* tall som teller opp: <span data-count="1240" data-suf=" kr"></span> */
function countUp(){
  document.querySelectorAll('#vs [data-count], #v14o [data-count], #v10o [data-count]').forEach(el=>{
    const to = +el.dataset.count, suf = el.dataset.suf || '', dur = 1100, t0 = performance.now();
    const fmt = v => Math.round(v).toLocaleString('nb-NO') + suf;
    const step = t => { const p = Math.min(1,(t-t0)/dur), e = 1-Math.pow(1-p,3); el.textContent = fmt(to*e); if(p<1) requestAnimationFrame(step); };
    el.textContent = fmt(0); requestAnimationFrame(step);
  });
}

document.addEventListener('keydown', e=>{
  if(scenario < 10) return;
  if(COMPACT[scenario] && !S[scenario].open) return;
  if(COMPACT[scenario] && e.key==='Escape'){ closeStory(scenario); return; }
  if(e.key==='ArrowRight'){ storyGo(S[scenario].i+1); e.preventDefault(); }
  if(e.key==='ArrowLeft'){ storyGo(S[scenario].i-1); e.preventDefault(); }
  if(e.key===' '){ storyToggle(); e.preventDefault(); }
});

/* små byggeklosser til slides */
const SL = {
  kick: t => `<div class="s-kick">${t}</div>`,
  big:  (n, suf='') => `<div class="s-big"><span data-count="${n}" data-suf="${suf}"></span></div>`,
  word: t => `<div class="s-word">${t}</div>`,
  p:    t => `<p class="s-p">${t}</p>`,
  share:(title, rows, bg) => `<div class="s-share" style="background:${bg}">
      <div class="sh-top">TAKI <em>wrapped</em> · 2026</div><div class="sh-title">${title}</div>
      <div class="sh-grid">${rows.map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
      <div class="sh-foot">Mandora AS 2</div></div>
      <button class="s-btn">Del ↗</button>`,
};
const DECKS = {};
