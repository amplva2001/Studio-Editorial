/* ==========================================================================
   stores.js – one chocolate bar per chain for the chosen year.
   1 piece = 1 krone: a 50 kr average price is a bar of 50 pieces.
   Pieces stack from the bottom, 5 across, so taller bar = dearer shop.
   The last piece is cut to the øre (45,43 kr = 45 pieces + 0,43 of one).
     Stores.build()      creates the bars and sizes the pieces (on load/resize)
     Stores.show(year)   updates the pieces, order and labels
   ========================================================================== */

const Stores = (() => {
  const { kr } = Data;
  const el = document.getElementById("rows");
  const PER_ROW = 5;                                   // pieces across
  const MAX_KR = 60;                                   // tallest possible bar = 60 pieces
  const ROWS = Math.ceil(MAX_KR / PER_ROW);            // 12 rows of pieces
  const PIECE_RATIO = 227 / 260;                       // width / height of the piece image

  const cols = new Map();                              // chain -> column element
  let geo = null;                                      // current layout numbers

  function build() {
    el.innerHTML = "";
    cols.clear();
    Data.CHAINS.forEach(chain => {
      const c = document.createElement("div");
      c.className = "bar";
      c.setAttribute("role", "listitem");
      c.innerHTML = `
        <div class="bar__stack">${'<div class="bar__row"></div>'.repeat(ROWS)}</div>
        <span class="bar__name">${chain}</span>
        <strong class="bar__price"></strong>
        <span class="bar__diff"></span>
        <span class="bar__badge"></span>`;
      el.appendChild(c);
      cols.set(chain, c);
    });
    size();
  }

  // 6 bars side by side on wide screens, 3 + 3 on phones
  function size() {
    const W = el.clientWidth;
    const perLine = W < 520 ? 3 : 6;
    const gap = W < 520 ? 14 : 12;
    const colW = (W - gap * (perLine - 1)) / perLine;
    const piece = Math.min(perLine === 3 ? 18 : 24, colW / PER_ROW);
    const pieceH = piece / PIECE_RATIO;
    const labelsH = 78;                                // name + price + diff + badge
    const colH = ROWS * pieceH + labelsH;
    geo = { perLine, gap, colW, piece, colH };

    el.style.setProperty("--piece", `${piece}px`);
    el.style.setProperty("--piece-h", `${pieceH}px`);
    el.style.setProperty("--col-w", `${colW}px`);
    el.style.height = `${colH * Math.ceil(Data.CHAINS.length / perLine) + (perLine === 3 ? gap * 2 : 0)}px`;
  }

  function show(year) {
    const chains = [...Data.byYear.get(year).chains].sort((a, b) => b.price - a.price);
    const hi = chains[0].price;
    const lo = chains[chains.length - 1].price;
    const same = (a, b) => Math.abs(a - b) < 0.005;
    const { perLine, gap, colW, piece, colH } = geo;

    chains.forEach((d, rank) => {
      const c = cols.get(d.chain);
      const px = (rank % perLine) * (colW + gap);
      const py = Math.floor(rank / perLine) * (colH + gap * 2);
      c.style.transform = `translate(${px}px, ${py}px)`;

      // fill rows bottom-up: row i holds pieces 5i .. 5i+5
      c.querySelectorAll(".bar__row").forEach((row, i) => {
        const n = Math.max(0, Math.min(PER_ROW, d.price - i * PER_ROW));
        row.style.width = `${n * piece}px`;
      });

      const isHi = same(d.price, hi) && !same(hi, lo);
      const isLo = same(d.price, lo) && !same(hi, lo);
      const badge = c.querySelector(".bar__badge");
      badge.textContent = isHi ? "Dyrest" : isLo ? "Billigst" : "";
      badge.className = `bar__badge${isHi ? " bar__badge--hi" : isLo ? " bar__badge--lo" : ""}`;
      c.querySelector(".bar__price").textContent = kr(d.price);
      c.querySelector(".bar__diff").textContent = same(d.price, lo) ? "" : `+${kr(d.price - lo)}`;
      c.setAttribute("aria-label",
        `${d.chain}: ${kr(d.price)}${isHi ? ", dyrest" : isLo ? ", billigst" : ""}`);
    });
  }

  return { build, size, show };
})();
