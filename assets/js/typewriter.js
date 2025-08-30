// assets/typewriter.js

document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Aspiring Finance Professional",
    "Musician",
    "Reader",
    "Creative Artist"
  ];

  const el = document.getElementById("typewriter");

  // Tunables (tweak to taste)
  const TYPE_DELAY = 85;      // ms per typed char
  const DELETE_DELAY = 45;    // ms per deleted char
  const PAUSE_AT_END = 1000;  // ms to hold full phrase
  const PAUSE_BETWEEN = 380;  // ms after clearing before next phrase

  // State
  let iPhrase = 0;
  let iChar = 0;
  let mode = "type";          // "type" | "pause-full" | "delete" | "pause-empty"
  let lastTick = 0;
  let acc = 0;

  function setText(n) {
    el.textContent = phrases[iPhrase].slice(0, n);
  }

  function loop(ts) {
    if (!lastTick) lastTick = ts;
    const dt = ts - lastTick;
    lastTick = ts;
    acc += dt;

    const current = phrases[iPhrase];

    switch (mode) {
      case "type": {
        if (acc >= TYPE_DELAY) {
          acc %= TYPE_DELAY;
          iChar++;
          setText(iChar);
          if (iChar >= current.length) {
            mode = "pause-full";
            acc = 0;
          }
        }
        break;
      }

      case "pause-full": {
        if (acc >= PAUSE_AT_END) {
          mode = "delete";
          acc = 0;
        }
        break;
      }

      case "delete": {
        if (acc >= DELETE_DELAY) {
          acc %= DELETE_DELAY;
          iChar--;
          setText(iChar);
          if (iChar <= 0) {
            mode = "pause-empty";
            acc = 0;
          }
        }
        break;
      }

      case "pause-empty": {
        if (acc >= PAUSE_BETWEEN) {
          iPhrase = (iPhrase + 1) % phrases.length;
          mode = "type";
          acc = 0;
        }
        break;
      }
    }

    requestAnimationFrame(loop);
  }

  function setText(n) {
  const txt = phrases[iPhrase].slice(0, n);
  el.textContent = txt || "\u00A0";  // non-breaking space when empty
}


  // Initialize
  setText(0);
  requestAnimationFrame(loop);
});
