/* ==========================================================================
   plate.js – the one chart: a plate of 24 chocolate pieces, 8 across x 3 down.
   Pieces you can still buy for what the whole plate cost in 2014 are full
   colour; the rest are faded. Filled column by column, left to right.
     Plate.build()      creates the 24 pieces (on load)
     Plate.show(year)   updates which pieces are faded,
                        and returns how many pieces the 2014 money buys
   ========================================================================== */

const Plate = (() => {
  const { kr, PIECES } = Data;
  const plate = document.getElementById("plate");
  const COLS = 8, ROWS = 3;                            // 8 x 3 = 24 ruter
  let pieces = [];

  function build() {
    plate.innerHTML = "";
    pieces = [];
    // column by column, so the faded pieces gather on the right
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const p = document.createElement("div");
        p.className = "piece";
        p.style.gridColumn = col + 1;
        p.style.gridRow = row + 1;
        plate.appendChild(p);
        pieces.push(p);
      }
    }
  }

  // How many pieces the 2014 plate price buys in the chosen year (max 24)
  function affordable(year) {
    const base = Data.byYear.get(Data.FIRST_YEAR);
    const d = Data.byYear.get(year);
    return Math.min(PIECES, Math.floor(base.plate / d.piece + 1e-9));
  }

  function show(year) {
    const d = Data.byYear.get(year);
    const n = affordable(year);
    pieces.forEach((p, i) => p.classList.toggle("piece--gone", i >= n));
    plate.setAttribute("aria-label",
      `Sjokoladeplate med 24 ruter. I ${year} kostet én rute ${kr(d.piece)} hos ${Data.CHAIN}. ` +
      `For ${Data.byYear.get(Data.FIRST_YEAR).plate} kroner får du ${n} av 24 ruter.`);
    return n;
  }

  return { build, show, affordable };
})();
