window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
