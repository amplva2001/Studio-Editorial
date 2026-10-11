/* ==========================================================================
   chart.js – packed bubble chart (D3 v7).
   One bubble per chain. Area ∝ ordinary price. Colour = rise since 2019.
   Chart.draw(year, animate) redraws at the container's current width.
   ========================================================================== */

const Chart = (() => {
  const { kr, pct } = Data;
  const el = document.getElementById("chart");
  const tip = document.getElementById("tooltip");
  const root = document.getElementById("chocolate-widget");

  // Colour bins for the rise since 2019 (navy = flat, reds = big rise)
  const BINS = [
    { max: 0.10,     label: "Under 10 %", color: "var(--bin-1)" },
    { max: 0.25,     label: "10–25 %",    color: "var(--bin-2)" },
    { max: 0.40,     label: "25–40 %",    color: "var(--bin-3)" },
    { max: Infinity, label: "Over 40 %",  color: "var(--bin-4)" },
  ];
  const colorFor = change => BINS.find(b => change < b.max).color;

  // Bubbles are always packed in the same order so they don't swap places between years
  const ORDER = [...Data.CHAINS].sort(
    (a, b) => Data.price[b][Data.LAST_YEAR].price - Data.price[a][Data.LAST_YEAR].price
  );

  // Pack one year's bubbles with radius = k * sqrt(price), centred on (0,0)
  function layout(year, k) {
    const nodes = Data.forYear(year)
      .sort((a, b) => ORDER.indexOf(a.chain) - ORDER.indexOf(b.chain))
      .map(d => ({ ...d, r: k * Math.sqrt(d.price) }));
    d3.packSiblings(nodes);
    const enc = d3.packEnclose(nodes);
    nodes.forEach(n => { n.x -= enc.x; n.y -= enc.y; });
    return { nodes, R: enc.r };
  }

  // The largest year decides the scale, so bubbles grow honestly and never overflow
  const R_UNIT = d3.max(Data.YEARS, y => layout(y, 1).R);

  let svg, gBubbles, size;

  function setup() {
    el.innerHTML = "";
    size = Math.min(el.clientWidth, 520);
    svg = d3.select(el).append("svg")
      .attr("viewBox", `${-size / 2} ${-size / 2} ${size} ${size}`)
      .attr("width", size).attr("height", size)
      .attr("role", "img");
    // dotted outer ring, like a "container" for the year
    svg.append("circle").attr("class", "ring").attr("r", size / 2 - 4);
    gBubbles = svg.append("g");
  }

  function draw(year, animate = true) {
    if (!svg || Math.min(el.clientWidth, 520) !== size) setup();

    const k = ((size / 2 - 14) * 0.98) / R_UNIT;
    const { nodes } = layout(year, k);
    svg.attr("aria-label", `Boblediagram: ordinær pris per kjede i ${year}`);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = svg.transition().duration(animate && !reduceMotion ? 650 : 0).ease(d3.easeCubicOut);

    const g = gBubbles.selectAll("g.bubble").data(nodes, d => d.chain)
      .join(enter => {
        const e = enter.append("g").attr("class", "bubble")
          .attr("transform", d => `translate(${d.x},${d.y})`)
          .attr("tabindex", 0);
        e.append("circle").attr("r", 0);
        e.append("text").attr("class", "bubble__name").attr("text-anchor", "middle");
        e.append("text").attr("class", "bubble__price").attr("text-anchor", "middle");
        return e;
      });

    g.transition(t).attr("transform", d => `translate(${d.x},${d.y})`);
    g.select("circle").transition(t)
      .attr("r", d => d.r)
      .attr("fill", d => colorFor(d.change));

    // Labels scale with the bubble but stay readable
    const fs = d => Math.max(11, Math.min(17, d.r / 4.2));
    g.select(".bubble__name").transition(t)
      .attr("y", d => -fs(d) * 0.25)
      .style("font-size", d => `${fs(d)}px`)
      .text(d => d.chain);
    g.select(".bubble__price").transition(t)
      .attr("y", d => fs(d) * 1.05)
      .style("font-size", d => `${fs(d) * 0.9}px`)
      .text(d => kr(d.price));

    // Tooltip (mouse, touch and keyboard focus)
    g.on("pointerenter pointermove", (e, d) => showTip(d, e.clientX, e.clientY))
      .on("pointerleave blur", hideTip)
      .on("focus", function (e, d) {
        const b = this.getBoundingClientRect();
        showTip(d, b.left + b.width / 2, b.top + b.height / 2);
      });
  }

  function showTip(d, cx, cy) {
    tip.innerHTML =
      `<b>${d.chain}, ${d.year}</b>` +
      `<div><span>Ordinær pris</span><strong>${kr(d.price)}</strong></div>` +
      `<div><span>I ${Data.FIRST_YEAR}</span><strong>${kr(d.base)}</strong></div>` +
      `<div><span>Endring</span><strong>${pct(d.change)}</strong></div>`;
    tip.hidden = false;
    const box = root.getBoundingClientRect();
    const px = cx - box.left, py = cy - box.top, tw = tip.offsetWidth;
    tip.style.left = `${px + 14 + tw > box.width ? px - tw - 14 : px + 14}px`;
    tip.style.top = `${py + 14}px`;
  }
  function hideTip() { tip.hidden = true; }

  function legend(elLegend) {
    elLegend.innerHTML = `<span class="cw__legend-title">Økning siden ${Data.FIRST_YEAR}</span>` +
      BINS.map(b => `<span><i style="background:${b.color}"></i>${b.label}</span>`).join("");
  }

  return { draw, legend };
})();
