/* ==========================================================================
   charts.js – one function per chart. Each takes a container element and
   (re)draws itself at the container's current width.
   Built with D3 v7.
   ========================================================================== */

const Charts = (() => {
  const { kr } = Data;
  const tip = document.getElementById("tooltip");

  /* ---------- shared helpers ---------- */

  function svgFor(el, height, margin) {
    el.innerHTML = "";
    const width = Math.max(300, el.clientWidth);
    const svg = d3.select(el).append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);
    const inner = {
      w: width - margin.left - margin.right,
      h: height - margin.top - margin.bottom,
    };
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    return { svg, g, width, ...inner };
  }

  function yGrid(g, y, w, ticks = 5) {
    const axis = g.append("g").attr("class", "grid");
    axis.selectAll("line").data(y.ticks(ticks)).join("line")
      .attr("x1", 0).attr("x2", w)
      .attr("y1", d => y(d)).attr("y2", d => y(d));
    const labels = g.append("g").attr("class", "axis");
    labels.selectAll("text").data(y.ticks(ticks)).join("text")
      .attr("x", -8).attr("y", d => y(d)).attr("dy", "0.32em")
      .attr("text-anchor", "end")
      .text(d => `${d} kr`);
  }

  function showTip(event, html) {
    tip.innerHTML = html;
    tip.hidden = false;
    const pad = 14, r = tip.getBoundingClientRect();
    let x = event.clientX + pad, y = event.clientY + pad;
    if (x + r.width > window.innerWidth - 8) x = event.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 8) y = event.clientY - r.height - pad;
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
  }
  function hideTip() { tip.hidden = true; }

  const row = (key, val, color) =>
    `<div class="tooltip__row"><span class="tooltip__key">${color ? `<i style="background:${color}"></i>` : ""}${key}</span><strong>${val}</strong></div>`;

  const fmtWeek = w => `Uke ${w.week}, ${w.year}`;

  /* =======================================================================
     1) Yearly range: min–max bar per year with a median dot
     ======================================================================= */
  function yearly(el) {
    const data = Data.years;
    const m = { top: 28, right: 12, bottom: 28, left: 48 };
    const { g, w, h } = svgFor(el, 300, m);

    const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, w]).padding(0.35);
    const y = d3.scaleLinear().domain([0, 70]).range([h, 0]);
    yGrid(g, y, w, 7);

    // x labels (every year on wide screens, every other on narrow)
    const step = w < 420 ? 2 : 1;
    g.append("g").attr("class", "axis").selectAll("text")
      .data(data.filter((d, i) => i % step === 0)).join("text")
      .attr("x", d => x(d.year) + x.bandwidth() / 2).attr("y", h + 18)
      .attr("text-anchor", "middle").text(d => d.year);

    const barW = Math.min(10, x.bandwidth());
    const cx = d => x(d.year) + x.bandwidth() / 2;

    // range bar (thin, rounded)
    g.selectAll(".range").data(data).join("rect")
      .attr("x", d => cx(d) - barW / 2).attr("width", barW)
      .attr("y", d => y(d.max)).attr("height", d => Math.max(2, y(d.min) - y(d.max)))
      .attr("rx", barW / 2)
      .attr("fill", "var(--muted-mark)")
      .attr("opacity", d => (d.weeks < 5 ? 0.45 : 1));

    // median dot with surface ring
    g.selectAll(".med").data(data).join("circle")
      .attr("cx", cx).attr("cy", d => y(d.median)).attr("r", 5.5)
      .attr("fill", "var(--red)").attr("stroke", "var(--bg)").attr("stroke-width", 2);

    // direct labels: first and last year only
    const ends = [data[0], data[data.length - 1]];
    g.selectAll(".endlabel").data(ends).join("text")
      .attr("class", "label label--strong")
      .attr("x", cx).attr("y", d => y(d.max) - 8)
      .attr("text-anchor", (d, i) => (i === 0 ? "start" : "end"))
      .text(d => kr(d.median));

    // hover targets: full column
    g.selectAll(".hit").data(data).join("rect")
      .attr("x", d => x(d.year) - (x.step() - x.bandwidth()) / 2).attr("width", x.step())
      .attr("y", 0).attr("height", h).attr("fill", "transparent")
      .on("mousemove", (e, d) => showTip(e,
        `<div class="tooltip__title">${d.year}</div>` +
        row("Median", kr(d.median), "var(--red)") +
        row("Laveste", kr(d.min)) + row("Høyeste", kr(d.max)) +
        row("Uker målt", d.weeks)))
      .on("mouseleave", hideTip);

    const sparse = data.filter(d => d.weeks < 5).map(d => d.year);
    document.getElementById("note-yearly").textContent = sparse.length
      ? `Blekere søyler (${sparse.join(", ")}): færre enn fem målte uker det året.`
      : "";
  }

  /* =======================================================================
     2) Playground line chart
        opts = { view: 'median'|'chains'|'normal', from: year|null,
                 axis: 'time'|'index', zero: bool, chains: Set }
     ======================================================================= */
  function playground(el, legendEl, opts) {
    const weeks = Data.weeks.filter(w => !opts.from || w.year >= opts.from);
    const m = { top: 16, right: 70, bottom: 28, left: 48 };
    const { svg, g, w, h } = svgFor(el, el.clientWidth < 500 ? 320 : 380, m);

    // ---- x scale: real time, or every observation equally spaced
    const useTime = opts.axis === "time";
    const x = useTime
      ? d3.scaleUtc().domain(d3.extent(weeks, d => d.date)).range([0, w])
      : d3.scaleLinear().domain([0, weeks.length - 1]).range([0, w]);
    const xOf = d => (useTime ? x(d.date) : x(weeks.indexOf(d)));

    // ---- y scale
    const allPrices = weeks.flatMap(wk => Object.values(wk.prices));
    const yMin = opts.zero ? 0 : Math.floor(d3.min(allPrices) / 5) * 5 - 5;
    const y = d3.scaleLinear().domain([Math.max(0, yMin), Math.ceil(d3.max(allPrices) / 10) * 10]).range([h, 0]).nice();
    yGrid(g, y, w, 6);

    // ---- x axis labels (years)
    const axis = g.append("g").attr("class", "axis");
    if (useTime) {
      const ticks = x.ticks(d3.utcYear.every(w < 500 ? 2 : 1));
      axis.selectAll("text").data(ticks).join("text")
        .attr("x", d => x(d)).attr("y", h + 18).attr("text-anchor", "middle")
        .text(d => d.getUTCFullYear());
    } else {
      // first observation of each year
      const firsts = weeks.filter((d, i) => i === 0 || weeks[i - 1].year !== d.year);
      let lastX = -Infinity;
      axis.selectAll("text").data(firsts.filter(d => {
        const px = xOf(d); if (px - lastX < 34) return false; lastX = px; return true;
      })).join("text")
        .attr("x", xOf).attr("y", h + 18).attr("text-anchor", "start").text(d => d.year);
    }

    // ---- shade long gaps (> 10 weeks without data) on the time axis
    const isGap = (a, b) => useTime && (b.date - a.date) > 10 * 7 * 864e5;
    if (useTime) {
      weeks.forEach((d, i) => {
        if (i && isGap(weeks[i - 1], d)) {
          g.insert("rect", ":first-child").attr("class", "gap-band")
            .attr("x", xOf(weeks[i - 1])).attr("width", xOf(d) - xOf(weeks[i - 1]))
            .attr("y", 0).attr("height", h);
        }
      });
    }

    // line generator that breaks across gaps, drawn with step-after (prices hold for a week)
    const lineFor = accessor => {
      const pts = [];
      weeks.forEach((d, i) => {
        if (i && isGap(weeks[i - 1], d)) pts.push(null);
        const v = accessor(d);
        pts.push(v == null ? null : { d, v });
      });
      return d3.line().defined(p => p).x(p => xOf(p.d)).y(p => y(p.v))
        .curve(useTime ? d3.curveLinear : d3.curveStepAfter)(pts);
    };

    const legend = [];
    let series = []; // for tooltip

    if (opts.view === "median") {
      // band = cheapest–dearest chain that week
      const area = [];
      weeks.forEach((d, i) => { if (i && isGap(weeks[i - 1], d)) area.push(null); area.push(d); });
      g.append("path")
        .attr("d", d3.area().defined(d => d).x(xOf).y0(d => y(d.min)).y1(d => y(d.max))
          .curve(useTime ? d3.curveLinear : d3.curveStepAfter)(area))
        .attr("fill", "var(--red)").attr("opacity", 0.12);
      g.append("path").attr("d", lineFor(d => d.median))
        .attr("fill", "none").attr("stroke", "var(--red)").attr("stroke-width", 2.5)
        .attr("stroke-linejoin", "round");
      const last = weeks[weeks.length - 1];
      g.append("text").attr("class", "label label--strong")
        .attr("x", xOf(last) + 6).attr("y", y(last.median)).attr("dy", "0.32em").text(kr(last.median));
      legend.push({ label: "Median av kjedene", color: "var(--red)" },
        { label: "Billigste–dyreste kjede", color: "var(--red)", band: true });
      series = [{ key: "Median", color: "var(--red)", get: d => d.median },
        { key: "Billigst", get: d => d.min }, { key: "Dyrest", get: d => d.max }];

    } else if (opts.view === "chains") {
      const chains = Data.CHAINS.filter(c => opts.chains.has(c));
      chains.forEach(c => {
        g.append("path").attr("d", lineFor(d => d.prices[c]))
          .attr("fill", "none").attr("stroke", Data.CHAIN_COLOR[c]).attr("stroke-width", 2)
          .attr("stroke-linejoin", "round").attr("opacity", 0.9);
        legend.push({ label: c, color: Data.CHAIN_COLOR[c] });
      });
      series = chains.map(c => ({ key: c, color: Data.CHAIN_COLOR[c], get: d => d.prices[c] }));

    } else if (opts.view === "normal") {
      const rows = Data.rows.filter(r => !opts.from || r.year >= opts.from);
      // normal-price step per year
      const yrs = Data.years.filter(yr => !opts.from || yr.year >= opts.from);
      yrs.forEach(yr => {
        const ws = weeks.filter(d => d.year === yr.year);
        if (!ws.length) return;
        const x0 = xOf(ws[0]), x1 = Math.max(xOf(ws[ws.length - 1]), x0 + 4);
        g.append("line").attr("x1", x0).attr("x2", x1)
          .attr("y1", y(yr.normal)).attr("y2", y(yr.normal))
          .attr("stroke", "var(--ink)").attr("stroke-width", 2).attr("stroke-linecap", "round");
      });
      g.append("g").selectAll("circle").data(rows).join("circle")
        .attr("cx", r => xOf(weeks.find(wk => wk.label === r.label)))
        .attr("cy", r => y(r.price)).attr("r", 3.5)
        .attr("fill", r => (r.isDeal ? "var(--red)" : "var(--muted-mark)"))
        .attr("stroke", "var(--surface-2)").attr("stroke-width", 1);
      legend.push({ label: "Normalpris (året)", color: "var(--ink)" },
        { label: "Tilbud", color: "var(--red)", dot: true },
        { label: "Vanlig pris", color: "var(--muted-mark)", dot: true });
      series = [{ key: "Median", color: "var(--red)", get: d => d.median },
        { key: "Normalpris", get: d => Data.yearByNum.get(d.year).normal }];
    }

    // ---- legend (HTML, below chart)
    legendEl.innerHTML = legend.map(l => `<span class="legend__item"><span class="legend__swatch${l.dot ? " legend__swatch--dot" : ""}" style="background:${l.color};${l.band ? "height:10px;opacity:.25" : ""}"></span>${l.label}</span>`).join("");

    // ---- crosshair + tooltip
    const cross = g.append("line").attr("class", "crosshair").attr("y1", 0).attr("y2", h).style("display", "none");
    const dotsG = g.append("g");
    const xs = weeks.map(xOf);
    svg.append("rect")
      .attr("x", m.left).attr("y", m.top).attr("width", w).attr("height", h)
      .attr("fill", "transparent")
      .on("mousemove", function (e) {
        const [mx] = d3.pointer(e, g.node());
        const i = Math.max(0, Math.min(weeks.length - 1, d3.bisectCenter(xs, mx)));
        const d = weeks[i];
        cross.style("display", null).attr("x1", xs[i]).attr("x2", xs[i]);
        const pts = series.filter(s => s.color && s.get(d) != null);
        dotsG.selectAll("circle").data(pts).join("circle")
          .attr("cx", xs[i]).attr("cy", s => y(s.get(d))).attr("r", 4.5)
          .attr("fill", s => s.color).attr("stroke", "var(--bg)").attr("stroke-width", 2);
        const rowsHtml = series
          .map(s => ({ s, v: s.get(d) }))
          .filter(o => o.v != null)
          .sort((a, b) => (opts.view === "chains" ? b.v - a.v : 0))
          .map(o => row(o.s.key, kr(o.v), o.s.color)).join("");
        showTip(e, `<div class="tooltip__title">${fmtWeek(d)}</div>${rowsHtml}`);
      })
      .on("mouseleave", () => { cross.style("display", "none"); dotsG.selectAll("*").remove(); hideTip(); });
  }

  /* =======================================================================
     3) Deals strip plot: every observation, by year
     ======================================================================= */
  function deals(el) {
    const rows = Data.rows;
    const m = { top: 12, right: 12, bottom: 28, left: 48 };
    const { g, w, h } = svgFor(el, 320, m);
    const x = d3.scaleBand().domain(Data.years.map(d => d.year)).range([0, w]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 70]).range([h, 0]);
    yGrid(g, y, w, 7);

    const step = w < 420 ? 2 : 1;
    g.append("g").attr("class", "axis").selectAll("text")
      .data(Data.years.filter((d, i) => i % step === 0)).join("text")
      .attr("x", d => x(d.year) + x.bandwidth() / 2).attr("y", h + 18)
      .attr("text-anchor", "middle").text(d => d.year);

    // deterministic jitter so the chart doesn't jump on redraw
    const jitter = r => (((r.i * 7919 + Data.CHAINS.indexOf(r.chain) * 104729) % 1000) / 1000 - 0.5) * x.bandwidth() * 0.8;

    g.append("g").selectAll("circle").data(rows).join("circle")
      .attr("cx", r => x(r.year) + x.bandwidth() / 2 + jitter(r))
      .attr("cy", r => y(r.price)).attr("r", 3)
      .attr("fill", r => (r.isDeal ? "var(--red)" : "var(--muted-mark)"))
      .attr("opacity", r => (r.isDeal ? 0.9 : 0.6))
      .on("mousemove", (e, r) => showTip(e,
        `<div class="tooltip__title">${r.chain}</div>` + row(fmtWeek(r), kr(r.price)) +
        row(r.isDeal ? "Tilbud" : "Vanlig pris", `${Math.round((1 - r.price / r.normal) * 100)} % under`)))
      .on("mouseleave", hideTip);

    // normal price per year
    g.selectAll(".normal").data(Data.years).join("line")
      .attr("x1", d => x(d.year)).attr("x2", d => x(d.year) + x.bandwidth())
      .attr("y1", d => y(d.normal)).attr("y2", d => y(d.normal))
      .attr("stroke", "var(--ink)").attr("stroke-width", 2).attr("stroke-linecap", "round");
  }

  /* =======================================================================
     4) Latest week: horizontal bars per chain
     ======================================================================= */
  function latest(el, titleEl) {
    const wk = Data.last;
    const data = Object.entries(wk.prices).map(([chain, price]) => ({ chain, price }))
      .sort((a, b) => a.price - b.price);
    titleEl.textContent = `Siste måling: ${fmtWeek(wk).toLowerCase()}`;

    const rowH = 36;
    const m = { top: 4, right: 70, bottom: 4, left: 92 };
    const { g, w } = svgFor(el, data.length * rowH + m.top + m.bottom, m);
    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.price)]).range([0, w]);
    const y = d3.scaleBand().domain(data.map(d => d.chain)).range([0, data.length * rowH]).padding(0.3);

    g.selectAll("text.name").data(data).join("text")
      .attr("class", "label").attr("x", -10).attr("y", d => y(d.chain) + y.bandwidth() / 2)
      .attr("dy", "0.32em").attr("text-anchor", "end").text(d => d.chain);

    // bars: flat at the baseline, 4px rounded data-end
    const r = 4;
    g.selectAll("path.bar").data(data).join("path")
      .attr("d", d => {
        const x1 = x(d.price), y0 = y(d.chain), bh = y.bandwidth();
        return `M0,${y0}H${x1 - r}Q${x1},${y0} ${x1},${y0 + r}V${y0 + bh - r}Q${x1},${y0 + bh} ${x1 - r},${y0 + bh}H0Z`;
      })
      .attr("fill", d => (d.price === data[0].price ? "var(--red)" : "var(--muted-mark)"))
      .on("mousemove", (e, d) => showTip(e, `<div class="tooltip__title">${d.chain}</div>${row(fmtWeek(wk), kr(d.price))}`))
      .on("mouseleave", hideTip);

    g.selectAll("text.val").data(data).join("text")
      .attr("class", "label label--strong").attr("x", d => x(d.price) + 8)
      .attr("y", d => y(d.chain) + y.bandwidth() / 2).attr("dy", "0.32em")
      .text(d => kr(d.price));

    g.append("line").attr("class", "baseline").attr("x1", 0).attr("x2", 0)
      .attr("y1", 0).attr("y2", data.length * rowH);
  }

  return { yearly, playground, deals, latest };
})();
