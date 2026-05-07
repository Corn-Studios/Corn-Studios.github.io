/* ═══════════════════════════════════════════════
   CORN STUDIOS — script.js
   Features: custom cursor, nav scroll, star field,
   scroll reveal, page transitions, hamburger menu,
   shooting meteor animation
═══════════════════════════════════════════════ */

// ─── CUSTOM CURSOR ────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  if (cursor && ring) {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !ring) return;
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
    ring.style.width    = '48px';
    ring.style.height   = '48px';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursor || !ring) return;
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '32px';
    ring.style.height   = '32px';
  });
});

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

// ─── PAGE TRANSITIONS ─────────────────────────
const overlay = document.getElementById('pageTransition');

// Fade in on load
window.addEventListener('DOMContentLoaded', () => {
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.transition = 'none';
    // Force reflow then fade out
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '0';
      });
    });
  }
});

// Intercept internal link clicks → fade out then navigate
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href) return;

  // Skip: external links, anchors, mailto, empty
  if (
    href.startsWith('http') ||
    href.startsWith('#')    ||
    href.startsWith('mailto') ||
    link.target === '_blank'
  ) return;

  e.preventDefault();
  if (!overlay) { location.href = href; return; }

  overlay.style.transition = 'opacity 0.35s ease';
  overlay.style.opacity = '1';

  setTimeout(() => { location.href = href; }, 360);
});

// ─── HAMBURGER MENU ───────────────────────────
const hamburger      = document.getElementById('hamburger');
const mobileOverlay  = document.getElementById('mobileNavOverlay');

// Populate mobile nav with same links as desktop
if (hamburger && mobileOverlay) {
  // Build mobile nav links
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
    const isOpen = hamburger.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close on link click (transition handles the rest)
  mobileOverlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // Close on overlay background click
  mobileOverlay.addEventListener('click', e => {
    if (e.target === mobileOverlay) toggleMenu(false);
  });
}

// ─── SHOOTING METEOR ANIMATION ────────────────
function spawnMeteor() {
  const trail = document.createElement('div');
  trail.className = 'meteor-trail';

  // Random start position across the top ~40% of the screen
  const startX = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.1;
  const startY = Math.random() * window.innerHeight * 0.3;

  // Angle: shooting diagonally downward (30–50 degrees)
  const angleDeg = 30 + Math.random() * 20;
  const angleRad = (angleDeg * Math.PI) / 180;
  const distance = 400 + Math.random() * 300;
  const tx = Math.cos(angleRad) * distance;
  const ty = Math.sin(angleRad) * distance;
  const duration = 900 + Math.random() * 600; // ms

  trail.style.cssText = `
    left: ${startX}px;
    top: ${startY}px;
    --angle: ${angleDeg}deg;
    --tx: ${tx}px;
    --ty: ${ty}px;
    width: ${80 + Math.random() * 60}px;
    animation: meteorShoot ${duration}ms ease-out forwards;
  `;

  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), duration + 100);
}

// Fire first meteor after a short delay, then every 4–8s randomly
setTimeout(() => {
  spawnMeteor();
  setInterval(() => {
    spawnMeteor();
    // Occasionally fire a second one shortly after
    if (Math.random() > 0.6) {
      setTimeout(spawnMeteor, 300 + Math.random() * 400);
    }
  }, 4000 + Math.random() * 4000);
}, 1500);