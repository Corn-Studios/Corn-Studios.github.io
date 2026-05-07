// ─── PAGE TRANSITIONS ─────────────────────────
const overlay = document.getElementById('pageTransition');

// Fade in on load
window.addEventListener('DOMContentLoaded', () => {
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.transition = 'none';
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

// ─── SHOOTING METEOR ANIMATION ────────────────
function spawnMeteor() {
  const trail = document.createElement('div');
  trail.className = 'meteor-trail';

  const startX = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.1;
  const startY = Math.random() * window.innerHeight * 0.3;

  const angleDeg = 30 + Math.random() * 20;
  const angleRad = (angleDeg * Math.PI) / 180;
  const distance = 400 + Math.random() * 300;
  const tx = Math.cos(angleRad) * distance;
  const ty = Math.sin(angleRad) * distance;
  const duration = 900 + Math.random() * 600;

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

// First meteor after short delay, then every 4–8s
setTimeout(() => {
  spawnMeteor();
  setInterval(() => {
    spawnMeteor();
    if (Math.random() > 0.6) {
      setTimeout(spawnMeteor, 300 + Math.random() * 400);
    }
  }, 4000 + Math.random() * 4000);
}, 1500);
