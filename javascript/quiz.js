const RESULTS = {
  tier1: {
    label: 'TIER_01 — REMOTE',
    tier:  'Spec & Advise',
    desc:  "You don't need someone local — you just need a great parts list and the reasoning behind it. We'll put together a budget-optimized build tailored to your exact use case, with a full PCPartPicker link and written breakdown of every choice.",
    perks: [
      'Budget-optimized parts list',
      'Written reasoning per component',
      'PCPartPicker link included',
      'Follow-up Q&A included',
      'Available nationwide (remote)',
    ],
    cta: 'Get a Spec Quote →',
  },
  tier2: {
    label: 'TIER_02 — LOCAL',
    tier:  'Full Custom Build',
    desc:  "You want a machine built right, from the ground up. We source the parts, assemble everything, set up Windows, and run a full Win11 Optimizer pass so it's clean and fast before it ever reaches you.",
    perks: [
      'Parts sourcing & assembly',
      'Windows install & all drivers',
      'Win11 Optimizer pass (free)',
      'CornDownloader setup (free)',
      'Cable management included',
      'Post-build support & follow-up',
    ],
    cta: 'Start a Build →',
  },
  tier3: {
    label: 'TIER_03 — LOCAL',
    tier:  'Upgrade & Optimize',
    desc:  "Your current machine has more life left in it — it just needs the right upgrades and a proper optimization pass. We handle the hardware swap and run Win11 Optimizer so it feels like a new machine without the new-machine price.",
    perks: [
      'GPU, RAM, or SSD upgrades',
      'Win11 Optimizer full pass',
      'Debloat & telemetry removal',
      'Before/after benchmarks',
      'Dutchess County, NY area',
    ],
    cta: 'Book an Upgrade →',
  },
};

const QUESTIONS = [
  {
    question: 'Do you already have a PC?',
    sub: 'This helps us figure out whether you need a fresh build or an upgrade path.',
    options: [
      { icon: '🖥️', label: 'Yes, and it still works',  desc: 'Just getting slow or needs more power', value: 'has-pc'    },
      { icon: '📦', label: 'No — starting from scratch', desc: 'Blank slate, need a whole new machine',  value: 'no-pc'     },
      { icon: '🤷', label: "I'm not sure yet",           desc: "Still weighing my options",              value: 'unsure-pc' },
    ],
  },
  {
    question: 'Where are you located?',
    sub: 'Local builds are available in Dutchess County, NY. Remote spec consulting works for everyone.',
    options: [
      { icon: '📍', label: 'Dutchess County, NY area', desc: 'Can do an in-person build or upgrade', value: 'local'  },
      { icon: '🌐', label: 'Somewhere else',            desc: 'Remote spec consulting works great',  value: 'remote' },
    ],
  },
  {
    question: 'What do you mainly need help with?',
    sub: "Pick whatever best describes what's on your mind.",
    options: [
      { icon: '🧠', label: 'Figuring out what parts to buy', desc: "I have a budget but don't know what to get", value: 'advice'   },
      { icon: '🔧', label: 'Having it built for me',         desc: 'I want someone to do the whole thing',       value: 'build'    },
      { icon: '⚡', label: 'Upgrading what I have',          desc: 'Make my existing machine faster',             value: 'upgrade'  },
    ],
  },
];

/* ── Logic: given answers, pick a tier ── */
function pickResult(answers) {
  const [q1, q2, q3] = answers;

  // If they have a PC and want an upgrade → Tier 3
  if (q1 === 'has-pc' && q3 === 'upgrade') return 'tier3';

  // If they're remote or want advice → Tier 1
  if (q2 === 'remote' || q3 === 'advice') return 'tier1';

  // Local + build or unsure → Tier 2
  if (q2 === 'local' && (q3 === 'build' || q3 === 'upgrade')) return 'tier2';

  // Default: if no PC and local → Tier 2
  if (q1 === 'no-pc' && q2 === 'local') return 'tier2';

  // Fallback
  return 'tier1';
}

/* ── Build the quiz DOM ── */
function buildQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  let currentStep = 0;
  const answers = [];

  function renderProgress(activeIndex) {
    const dots = container.querySelectorAll('.quiz-progress-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('done',   i < activeIndex);
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  function showStep(index) {
    container.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const step = container.querySelector(`[data-step="${index}"]`);
    if (step) step.classList.add('active');
    renderProgress(index);
  }

  function showResult(key) {
    container.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    container.querySelectorAll('.quiz-progress-dot').forEach(d => d.classList.add('done'));
    const resultEl = container.querySelector('.quiz-result');
    const r = RESULTS[key];
    resultEl.querySelector('.quiz-result-label').textContent = r.label;
    resultEl.querySelector('.quiz-result-tier').textContent  = r.tier;
    resultEl.querySelector('.quiz-result-desc').textContent  = r.desc;
    const perksList = resultEl.querySelector('.quiz-result-perks');
    perksList.innerHTML = r.perks.map(p => `<li>${p}</li>`).join('');
    resultEl.querySelector('.quiz-result-cta').textContent = r.cta;
    resultEl.classList.add('active');
  }

  // ── Build HTML ──────────────────────────────────────────────
  let html = `<div class="quiz-progress">`;
  QUESTIONS.forEach((_, i) => {
    const cls = i === 0 ? 'active' : '';
    html += `<div class="quiz-progress-dot ${cls}"></div>`;
  });
  html += `</div>`;

  QUESTIONS.forEach((q, qi) => {
    html += `<div class="quiz-step${qi === 0 ? ' active' : ''}" data-step="${qi}">
      <p class="quiz-question">${q.question}</p>
      <p class="quiz-sub">${q.sub}</p>
      <div class="quiz-options">`;
    q.options.forEach(opt => {
      html += `<button class="quiz-option" data-value="${opt.value}">
        <span class="quiz-option-icon">${opt.icon}</span>
        <span>
          <span class="quiz-option-label">${opt.label}</span>
          <span class="quiz-option-desc">${opt.desc}</span>
        </span>
      </button>`;
    });
    html += `</div></div>`;
  });

  html += `<div class="quiz-result">
    <p class="quiz-result-label"></p>
    <h3 class="quiz-result-tier"></h3>
    <p class="quiz-result-desc"></p>
    <ul class="quiz-result-perks"></ul>
    <div class="quiz-result-actions">
      <a href="contact.html" class="btn btn-primary quiz-result-cta">Get in Touch →</a>
      <button class="quiz-restart">↩ Start over</button>
    </div>
  </div>`;

  container.innerHTML = html;

  // ── Event delegation ────────────────────────────────────────
  container.addEventListener('click', e => {
    // Option selected
    const optBtn = e.target.closest('.quiz-option');
    if (optBtn) {
      answers[currentStep] = optBtn.dataset.value;
      currentStep++;
      if (currentStep < QUESTIONS.length) {
        showStep(currentStep);
      } else {
        showResult(pickResult(answers));
      }
      return;
    }

    // Restart
    if (e.target.closest('.quiz-restart')) {
      answers.length = 0;
      currentStep = 0;
      container.querySelector('.quiz-result').classList.remove('active');
      showStep(0);
    }
  });
}

document.addEventListener('DOMContentLoaded', buildQuiz);
