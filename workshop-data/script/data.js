/* ==========================================================================
   data.js – Rema 1000 only: yearly average price, rounded up to whole
   kroner, and what one of the plate's 24 pieces (ruter) costs.
   ========================================================================== */

const Data = (() => {
  const raw = window.CHOCOLATE_DATA;

  const CHAIN = "Rema 1000";
  const PIECES = 24;           // ruter in one plate
  const FIRST_YEAR = 2014;
  const LAST_YEAR = 2026;
  const SPARSE = 5;            // years with fewer measured weeks than this get a warning

  const years = [];
  for (let year = FIRST_YEAR; year <= LAST_YEAR; year++) {
    const prices = raw.weeks
      .map((label, i) => ({ year: +label.split("-")[0], price: raw.chains[CHAIN][i] }))
      .filter(d => d.year === year && d.price != null)
      .map(d => d.price);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const plate = Math.ceil(avg);                     // rounded up to whole kroner
    years.push({ year, weeks: prices.length, avg, plate, piece: plate / PIECES });
  }
  const byYear = new Map(years.map(y => [y.year, y]));

  // Norwegian number formatting
  const nf = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const kr = v => `${nf.format(v)} kr`;
  const ore = v => `${Math.round(v * 100)} øre`;

  return { CHAIN, PIECES, FIRST_YEAR, LAST_YEAR, SPARSE, years, byYear, kr, ore };
})();
