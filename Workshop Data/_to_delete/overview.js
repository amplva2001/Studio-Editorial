/* ==========================================================================
   overview.js – price over time as columns (D3 v7).
   The columns are also the year picker: tap one, or press and drag across.
     Overview.build()      draws the chart at the current width (on load/resize)
     Overview.select(year) highlights a year without rebuilding (safe mid-drag)
     Overview.onPick(fn)   fn(year) is called when the reader picks a year
   ========================================================================== */

const Overview = (() => {
  const { kr } = Data;
  const el = document.getElementById("overview");
  let pick = () => {};
  let svg, x, y, cols, yearLabels, valueLabel;

  function build() {
    el.innerHTML = "";
    const width = Math.max(280, el.clientWidth);
    const height = width < 480 ? 190 : 230;
    const m = { top: 26, right: 4, bottom: 24, left: 34 };
    const w = width - m.left - m.right, h = height - m.top - m.bottom;

    svg = d3.select(el).append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    x = d3.scaleBand().domain(Data.YEARS).range([0, w]).paddingInner(0.25).paddingOuter(0.1);
    y = d3.scaleLinear().domain([0, 60]).range([h, 0]);

    // grid + y labels
    const ticks = [0, 20, 40, 60];
    g.append("g").attr("class", "grid").selectAll("line").data(ticks).join("line")
      .attr("x1", 0).attr("x2", w).attr("y1", y).attr("y2", y);
    g.append("g").attr("class", "axis").selectAll("text").data(ticks).join("text")
      .attr("x", -6).attr("y", y).attr("dy", "0.32em").attr("text-anchor", "end")
      .text(d => (d === 60 ? "60 kr" : d));

    // x labels: full year when there's room, otherwise '14
    const short = x.bandwidth() < 30;
    yearLabels = g.append("g").attr("class", "axis").selectAll("text").data(Data.YEARS).join("text")
      .attr("x", d => x(d) + x.bandwidth() / 2).attr("y", h + 17).attr("text-anchor", "middle")
      .text(d => (short ? `'${String(d).slice(2)}` : d));

    // columns: flat at the baseline, 4px rounded top
    const r = Math.min(4, x.bandwidth() / 2);
    const col = d => {
      const x0 = x(d.year), bw = x.bandwidth(), y0 = y(d.price);
      return `M${x0},${h}V${y0 + r}Q${x0},${y0} ${x0 + r},${y0}H${x0 + bw - r}Q${x0 + bw},${y0} ${x0 + bw},${y0 + r}V${h}Z`;
    };
    cols = g.append("g").selectAll("path").data(Data.years).join("path")
      .attr("d", col)
      .classed("col", true)
      .classed("col--sparse", d => d.weeks < Data.SPARSE);

    valueLabel = g.append("text").attr("class", "col-label").attr("text-anchor", "middle");

    // hit area: tap or press-and-drag to scrub through the years
    const yearAt = e => {
      const [mx] = d3.pointer(e, g.node());
      const i = Math.floor((mx - x.step() * x.paddingOuter()) / x.step());
      return Data.YEARS[Math.max(0, Math.min(Data.YEARS.length - 1, i))];
    };
    let dragging = false;
    svg.append("rect").attr("class", "hit")
      .attr("x", m.left).attr("y", 0).attr("width", w).attr("height", height)
      .on("pointerdown", e => {
        dragging = true;
        e.target.setPointerCapture?.(e.pointerId);
        pick(yearAt(e));
      })
      .on("pointermove", e => { if (dragging) pick(yearAt(e)); })
      .on("pointerup pointercancel", () => { dragging = false; });
  }

  function select(year) {
    const d = Data.byYear.get(year);
    cols.classed("col--on", c => c.year === year);
    yearLabels.classed("is-on", yr => yr === year);
    valueLabel
      .attr("x", x(year) + x.bandwidth() / 2)
      .attr("y", y(d.price) - 8)
      .text(kr(d.price));
    svg.attr("aria-label",
      `Snittpris per år fra ${Data.FIRST_YEAR} til ${Data.LAST_YEAR}. ${year}: ${kr(d.price)}.`);
  }

  return { build, select, onPick: fn => { pick = fn; } };
})();
