const REPOS = [
  { slug: 'Corn-Studios/win11op',         key: 'win11op'         },
  { slug: 'Corn-Studios/CornDownloader',  key: 'CornDownloader'  },
  { slug: 'Corn-Studios/CornTools',       key: 'CornTools'       },
  { slug: 'Corn-Studios/CornWatch',       key: 'CornWatch'       },
];

async function fetchStars(slug) {
  const cacheKey = `gh_stars_${slug}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached !== null) return parseInt(cached, 10);

  try {
    const res = await fetch(`https://api.github.com/repos/${slug}`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    sessionStorage.setItem(cacheKey, data.stargazers_count);
    return data.stargazers_count;
  } catch {
    return null;
  }
}

function formatStars(n) {
  if (n === null) return '–';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

async function injectStars() {
  const widgets = document.querySelectorAll('[data-repo]');
  if (!widgets.length) return;

  // Kick off all fetches in parallel
  const results = await Promise.all(
    REPOS.map(r => fetchStars(r.slug).then(count => ({ key: r.key, count })))
  );

  const starMap = {};
  results.forEach(({ key, count }) => { starMap[key] = count; });

  widgets.forEach(widget => {
    const key = widget.dataset.repo;
    const countEl = widget.querySelector('.star-count');
    if (countEl && key in starMap) {
      countEl.textContent = formatStars(starMap[key]);
      countEl.classList.add('loaded');
    }
  });
}

document.addEventListener('DOMContentLoaded', injectStars);
