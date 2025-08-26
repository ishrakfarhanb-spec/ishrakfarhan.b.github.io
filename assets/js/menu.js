function setupActiveLink() {
  try {
    const links = document.querySelectorAll('nav.nav .nav-link');
    const here = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').trim();
      if (href && href === here) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  } catch (e) {}
}

function setupMenuToggle(root=document) {
  const toggle = root.querySelector('.nav-toggle');
  const nav = root.querySelector('#site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Run after header injection
document.addEventListener('header:loaded', () => {
  setupMenuToggle(document);
  setupActiveLink();
});

// Also run if header is inline
document.addEventListener('DOMContentLoaded', () => {
  setupMenuToggle(document);
  setupActiveLink();
});
