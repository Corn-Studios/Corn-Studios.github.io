// ─── NAV SCROLL ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── STAR FIELD ───────────────────────────────
const starsContainer = document.getElementById('heroStars');
if (starsContainer) {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size  = Math.random() * 3 + 1;
    const dur   = (Math.random() * 3 + 2).toFixed(1);
    const delay = (Math.random() * 4).toFixed(1);
    star.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;top:${Math.random()*80}%;
      --dur:${dur}s;--delay:${delay}s;
      opacity:${(Math.random()*0.6+0.2).toFixed(2)};
    `;
    starsContainer.appendChild(star);
  }
}

// ─── SCROLL REVEAL ────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── HAMBURGER MENU ───────────────────────────
const hamburger     = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileNavOverlay');

if (hamburger && mobileOverlay) {
  const currentPage = document.body.dataset.page;
  const navItems = [
    { label: 'Projects',    href: 'projects.html', page: 'projects' },
    { label: 'Corn Builds', href: 'builds.html',   page: 'builds'   },
    { label: 'About',       href: 'about.html',    page: 'about'    },
    { label: 'Contact',     href: 'contact.html',  page: 'contact'  },
  ];

  navItems.forEach((item, i) => {
    if (i > 0) {
      const div = document.createElement('div');
      div.className = 'mobile-nav-divider';
      mobileOverlay.appendChild(div);
    }
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    if (item.page === currentPage) a.classList.add('nav-active');
    mobileOverlay.appendChild(a);
  });

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    toggleMenu(!hamburger.classList.contains('open'));
  });

  mobileOverlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  mobileOverlay.addEventListener('click', e => {
    if (e.target === mobileOverlay) toggleMenu(false);
  });
}
