# Hvor mye koster en rute?

An interactive graphic to drop into an existing news article about chocolate prices. It shows what one piece (rute) of a Freia Melkesjokolade 200 g costs at Rema 1000, year by year from 2014 to 2026.

**How it works for the reader**

- One chart: a plate of 24 pieces, 8 across and 3 down, made from the chocolate-piece image.
- The plate cost 27 kr at Rema 1000 in 2014. For the chosen year, the pieces you can still buy for those 27 kr are full colour, and the rest are faded. In 2026 that is 16 of 24 pieces.
- Above the plate: "I 2026 koster én rute 1,67 kr" and "54 øre mer per rute enn i 2014".
- Below: a red year bar to drag, or a play button that runs through the years.

**How the numbers are made**

1. Take Rema 1000's average price for the year: every registered weekly price, offers included.
2. Round it up to whole kroner. For example, 39,90 kr becomes 40 kr.
3. Divide by 24 pieces. 40 kr / 24 = 1,67 kr per piece.

2016–2019 have only 1–4 measured weeks, so the widget shows a warning for those years. 2017 looks cheap only because both measured weeks were offer weeks.

## Open it

Double-click `index.html`. It works straight from the folder and needs no libraries, only the Roboto font from Google Fonts.

## Folder structure

```
index.html                     the widget markup (everything sits inside <figure class="cw">)
style/
  style.css                    tokens (colours, font) + all widget styles, scoped under .cw
script/
  data.js                      Rema 1000 yearly average -> rounded plate price -> price per piece
  plate.js                     the 8 x 3 plate, with faded pieces (the one chart)
  main.js                      year slider, play button, the numbers above the plate
assets/
  img/
    sjokoladebit.png           the chocolate piece, cropped tight (used by the widget)
    sjokoladebit-original.png  the piece as supplied
  data/
    chocolate.json             raw data as scraped (weeks x chains, 2013–2026)
    chocolate.csv              same data, one row per chain per week
    chocolate.js               same as the JSON, loaded by the page
```

## Putting it in the article

Copy the `<figure class="cw">…</figure>` block into the article, and add the stylesheet and the scripts in the same order as in `index.html`. Keep the `assets/img` path working: the stylesheet points to `../assets/img/sjokoladebit.png`. The `body { … }` rule at the top of `style.css` is only for the standalone preview, so leave it out in the article.

## Things to try

- Another chain: change `CHAIN` in `script/data.js` (Kiwi, Coop Extra, Coop Obs, Meny, Spar), and update the caption.
- Another start year: change `FIRST_YEAR` in `script/data.js` and the `min` on the slider in `index.html`.
- Colours are the tokens at the top of `style/style.css`.
