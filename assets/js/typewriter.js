document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Aspiring Finance Professional",
    "Musician",
    "Reader",
    "Creative Artist"
  ];
  
  const el = document.getElementById("typewriter");
  let phraseIndex = 0;
  let letterIndex = 0;
  let deleting = false;
  let speed = 100; // typing speed in ms

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === currentPhrase.length) {
        deleting = true;
        speed = 1500; // pause before deleting
      }
    } else {
      el.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      speed = 60; // faster delete
      if (letterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 300; // pause before typing next phrase
      }
    }

    setTimeout(type, speed);
  }

  type();
});
