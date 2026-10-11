/* ==========================================================================
   main.js – year slider, play button and the numbers above the plate.
   ========================================================================== */

(() => {
  const $ = id => document.getElementById(id);
  const { FIRST_YEAR, LAST_YEAR, SPARSE, CHAIN, kr, ore } = Data;
  const slider = $("year");
  const playBtn = $("play");
  const base = Data.byYear.get(FIRST_YEAR);

  /* ---------- Year labels under the slider ---------- */
  const years = Data.years.map(d => d.year);
  $("ticks").innerHTML = years.map(y => `<span data-year="${y}">${y}</span>`).join("");

  /* ---------- Show one year ---------- */
  function setYear(year) {
    const d = Data.byYear.get(year);
    slider.value = year;
    slider.style.setProperty("--fill", `${((year - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR)) * 100}%`);
    document.querySelectorAll("#ticks span").forEach(s => s.classList.toggle("is-on", +s.dataset.year === year));

    const n = Plate.show(year);

    const verb = year === LAST_YEAR ? "koster" : "kostet";
    $("stat-main").innerHTML = `I ${year} ${verb} én rute <strong>${kr(d.piece)}</strong>`;

    const diff = d.piece - base.piece;
    $("stat-sub").innerHTML = year === FIRST_YEAR
      ? "Dra i linjen under for å se de andre årene."
      : Math.abs(diff) < 0.005
        ? `Det samme som i ${FIRST_YEAR}.`
        : `<strong class="${diff > 0 ? "up" : "down"}">${ore(Math.abs(diff))} ${diff > 0 ? "mer" : "mindre"}</strong> per rute enn i ${FIRST_YEAR}`;

    $("plate-label").innerHTML = year === FIRST_YEAR
      ? `Hele plata kostet <strong>${base.plate} kr</strong> hos ${CHAIN} i ${FIRST_YEAR}.`
      : n < Data.PIECES
        ? `For ${base.plate} kr, som plata kostet i ${FIRST_YEAR}, får du <strong>${n} av 24 ruter</strong> i ${year}.`
        : `For ${base.plate} kr, som plata kostet i ${FIRST_YEAR}, får du hele plata i ${year} (${d.plate} kr).`;

    const note = $("note");
    note.hidden = d.weeks >= SPARSE;
    note.textContent = `Obs: Bare ${d.weeks} målte ${d.weeks === 1 ? "uke" : "uker"} i ${year}, så tallet er usikkert.`;
  }

  slider.addEventListener("input", () => { stop(); setYear(+slider.value); });

  /* ---------- Play through the years ---------- */
  let timer = null;
  function stop() {
    clearInterval(timer); timer = null;
    playBtn.classList.remove("is-playing");
    playBtn.setAttribute("aria-label", "Spill av årene");
  }
  playBtn.addEventListener("click", () => {
    if (timer) return stop();
    let y = +slider.value >= LAST_YEAR ? FIRST_YEAR : +slider.value;
    setYear(y);
    playBtn.classList.add("is-playing");
    playBtn.setAttribute("aria-label", "Pause");
    timer = setInterval(() => {
      y += 1;
      setYear(y);
      if (y >= LAST_YEAR) stop();
    }, 900);
  });

  /* ---------- Start on the latest year ---------- */
  Plate.build();
  setYear(LAST_YEAR);
})();
