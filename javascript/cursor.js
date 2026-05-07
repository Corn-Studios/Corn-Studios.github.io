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
