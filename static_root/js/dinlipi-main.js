/* Dinlipi — Main JavaScript */

// Feature tabs
document.querySelectorAll('.feat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.feat-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.feat-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// FAQ accordion + category filter
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

function filterFaq(key) {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  const visible = items.filter(item => item.getAttribute('data-cat') === key);

  items.forEach(item => {
    item.classList.remove('faq-switch-in', 'faq-switch-show', 'open');
    item.style.removeProperty('--faq-delay');
    if (item.getAttribute('data-cat') !== key) {
      item.classList.add('faq-hidden');
    } else {
      item.classList.remove('faq-hidden');
    }
  });

  // Animate the newly selected category in with a gentle stagger.
  visible.forEach((item, index) => {
    item.classList.add('faq-switch-in');
    item.style.setProperty('--faq-delay', `${index * 70}ms`);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      visible.forEach(item => item.classList.add('faq-switch-show'));
    });
  });

  const first = visible[0];
  if (first) {
    setTimeout(() => first.classList.add('open'), 180);
  }
}
// Default: show General only
filterFaq('general');

document.querySelectorAll('.faq-cat').forEach(cat => {
  cat.addEventListener('click', () => {
    document.querySelectorAll('.faq-cat').forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
    filterFaq(cat.getAttribute('data-cat'));
  });
});

// Reusable section reveal (adds .in-view once)
function revealOnView(id) {
  const sec = document.getElementById(id);
  if (!sec) return;
  if (!('IntersectionObserver' in window)) {
    sec.classList.add('in-view');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10px 0px' });
  io.observe(sec);
}

// Features (modules), FAQ, Pricing — down to up reveal
revealOnView('modules');
revealOnView('faq');
revealOnView('pricing');

// Enterprise pricing calculator
(function () {
  const input = document.getElementById('entEmpCount');
  const totalEl = document.getElementById('entTotal');
  const tierEl = document.getElementById('entTier');
  if (!input) return;

  let customVal = 0;
  const supportVal = 5000;

  function tierPrice(n) {
    if (!n || n < 1) return null;
    if (n <= 20) return 1000;
    if (n <= 50) return 2000;
    if (n <= 100) return 4000;
    // enterprise scale approx
    return Math.ceil(n / 100) * 4000;
  }

  function update() {
    const n = parseInt(input.value, 10);
    const tier = tierPrice(n);
    if (tier == null) {
      tierEl.textContent = '—';
      totalEl.textContent = '—';
      return;
    }
    tierEl.textContent = 'BDT ' + tier.toLocaleString();
    const custom = typeof customVal === 'number' ? customVal : 0;
    const total = tier + supportVal + custom;
    totalEl.textContent = total.toLocaleString();
  }

  input.addEventListener('input', update);

  document.querySelectorAll('.ent-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.getAttribute('data-group');
      document.querySelectorAll('.ent-option[data-group="' + group + '"]').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      if (group === 'custom') {
        const v = opt.getAttribute('data-value');
        customVal = v === 'ondemand' ? 0 : parseInt(v, 10) || 0;
      }
      update();
    });
  });
})();

// Why Dinlipi feature rows — left/right reveal
(function () {
  const rows = document.querySelectorAll('#features .feature-row');
  if (!rows.length) return;
  if (!('IntersectionObserver' in window)) {
    rows.forEach(r => r.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
  rows.forEach(r => io.observe(r));
})();

// Activate a modules tab by data-tab key
function activateModuleTab(key) {
  if (!key) return;
  const tab = document.querySelector('.feat-tab[data-tab="' + key + '"]');
  const panel = document.getElementById('panel-' + key);
  if (!tab || !panel) return;
  document.querySelectorAll('.feat-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.feat-panel').forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  panel.classList.add('active');
}

// Smooth scroll (+ open matching module tab from footer)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const tabKey = a.getAttribute('data-module-tab');
      if (tabKey) {
        // slight delay so scroll starts, then reveal the panel
        setTimeout(function () { activateModuleTab(tabKey); }, 280);
      }
    }
  });
});

/* ======================================== */
/* Mobile nav toggle                        */
/* ======================================== */

(function () {
  var btn = document.querySelector('.mobile-toggle');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-nav-links');
  links.id = links.id || 'mobile-nav-links';
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '☰';
    });
  });
})();

/* ======================================== */
/* WhatsApp float — keep visible            */
/* ======================================== */

(function () {
  var btn = document.querySelector('a.wa-float');
  if (!btn) return;
  // Always keep button visible — clear any bad inline positions
  function reset() {
    btn.style.setProperty('position', 'fixed', 'important');
    btn.style.setProperty('display', 'flex', 'important');
    btn.style.setProperty('visibility', 'visible', 'important');
    btn.style.setProperty('opacity', '1', 'important');
    btn.style.setProperty('z-index', '99999', 'important');
    btn.style.setProperty('pointer-events', 'auto', 'important');
    var pad = 16;
    var safeBottom = 0;
    var safeRight = 0;
    try {
      if (window.visualViewport) {
        var vv = window.visualViewport;
        // How much of layout viewport is below the visible area
        var below = Math.max(0, window.innerHeight - (vv.offsetTop + vv.height));
        var rightHidden = Math.max(0, window.innerWidth - (vv.offsetLeft + vv.width));
        // Cap so we never push the button off-screen
        below = Math.min(below, 120);
        rightHidden = Math.min(rightHidden, 80);
        safeBottom = below;
        safeRight = rightHidden;
      }
    } catch (e) {}
    btn.style.setProperty('bottom', (pad + safeBottom) + 'px', 'important');
    btn.style.setProperty('right', (pad + safeRight) + 'px', 'important');
    btn.style.setProperty('left', 'auto', 'important');
    btn.style.setProperty('top', 'auto', 'important');
  }
  reset();
  window.addEventListener('resize', reset);
  window.addEventListener('orientationchange', reset);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', reset);
    window.visualViewport.addEventListener('scroll', reset);
  }
  // re-apply after load (some mobile browsers shift chrome late)
  setTimeout(reset, 300);
  setTimeout(reset, 1000);
})();

/* ======================================== */
/* Radial feature section                   */
/* ======================================== */

(function () {
  var logo = document.getElementById('rs-logo');
  var navLogo = document.querySelector('.logo img');
  if (logo && navLogo && navLogo.src) logo.src = navLogo.src;
})();

(function () {
  const features = {
    attendance: {
      title: "Attendance",
      desc: "Track presence, correct records, and manage schedules with precision.",
      icon: "🕐",
      items: ["Attendance Log","Absent Log","Attendance Pull (Auto Import)","In & Out Time Correction","Manual Check-in & Check-out Entry","Movement Attendance","Roster Planning","Work Hour Control","Shift Setup"]
    },
    leave: {
      title: "Leave Management",
      desc: "Apply, approve and track leave balances with full history.",
      icon: "📅",
      items: ["Leave Application","Leave Approvals","Leave Balance","Earn Leave"]
    },
    movement: {
      title: "Movement Register",
      desc: "Record and approve official movements with full history tracking.",
      icon: "🚶",
      items: ["Movement Approvals","Movement Entry","Movement History"]
    },
    employee: {
      title: "Employee Management",
      desc: "Complete employee records, documents, transfers and career progression.",
      icon: "👥",
      items: ["All Employees","ID Card","Transfer","Promotion","Employee Documents (File)","Employee Projections","Biometric ID Delete"]
    },
    reports: {
      title: "Reports",
      desc: "Attendance, leave, payroll and employee reports — audit ready.",
      icon: "📊",
      items: ["Attendance Report","Problematic Attendance Report","Absent Report","Attendance Summary Report","Daily Attendance","Multiple Employee Monthly Attendance","Employee / Leftee / New / Resign Reports","Employee Projection Report","Intime Outtime Missing Report","Late Report"]
    },
    payroll: {
      title: "Payroll",
      desc: "Salary sheets, bonuses, increments, advances, loans and EL calculation.",
      icon: "💰",
      items: ["Create Salary Sheet","Running / Salary Sheet Update","Eid Bonus & Edit","Night / Tiffin Bill Adjustment","Lunch Bill Entry","Advance Salary","Increment Entry & Approval","Special Increment Entry","Salary Sheet Delete / Submission","EL Calculation"]
    },
    rbac: {
      title: "RBAC",
      desc: "Fine-grained permissions and multi-level access control.",
      icon: "🔒",
      items: ["Permission","Designation Permission Create","User Permission","User Setup","Branch Admin","Mother Admin","Regular User","Sister Admin","Special User"]
    },
    settings: {
      title: "Settings",
      desc: "Devices, benefits, holidays, leave setup and approval levels.",
      icon: "⚙️",
      items: ["Add Attendance Device","Attendance Device","Benefits & Benefit Type","Increment Approval","Increment Approval User","Holiday List & Holiday Setup","Leave Setup","Salary Rules","Employee Approval Level","Employee Approval Level User"]
    },
    report: {
      title: "Report",
      desc: "Quick access to key operational and compliance reports.",
      icon: "📋",
      items: ["Attendance Report","Absent Report","Late Report","Daily Attendance","Salary Sheet Report","Leave Summary Report"]
    }
  };

  const wrap = document.getElementById('rs-radial');
  const nodes = document.querySelectorAll('.rs-node');
  const orbit = document.getElementById('rs-orbit');
  const center = document.getElementById('rs-center');
  const details = document.getElementById('rs-details');
  const dTitle = document.getElementById('rs-d-title');
  const dDesc = document.getElementById('rs-d-desc');
  const dList = document.getElementById('rs-d-list');
  const dIcon = document.getElementById('rs-d-icon');

  if (!wrap || !orbit || !center || !details || !nodes.length) return;

  // Radius always comes from the real wrapper size.
  // 520px desktop -> 195px, 340px tablet -> 128px, 300px mobile -> 113px
  function getFinalRadius() {
    var size = wrap.offsetWidth || 0;
    if (!size) {
      var vw = window.innerWidth;
      size = vw <= 768 ? Math.min(300, vw - 32)
           : vw <= 960 ? Math.min(340, vw - 32)
           : 520;
    }
    return Math.round((size / 2) * 0.75);
  }

  function setNode(node, radius, opacity, scale) {
    node.style.setProperty('--radius', radius + 'px');
    node.style.setProperty('--opacity', opacity);
    node.style.setProperty('--scale', scale);
    node.style.setProperty('--angle', node.dataset.angle + 'deg');
  }

  // Initial collapsed state
  nodes.forEach(function (n) {
    n.style.transition = 'none';
    setNode(n, 0, 0, 0.2);
  });

  var rsExpanded = false;
  var animTimer = null;
  var expandTimers = [];

  function clearAnimTimers() {
    if (animTimer) { clearTimeout(animTimer); animTimer = null; }
    expandTimers.forEach(function (id) { clearTimeout(id); });
    expandTimers = [];
  }

  function relayoutNodes() {
    if (!rsExpanded) return;
    var R = getFinalRadius();
    nodes.forEach(function (n) { setNode(n, R, 1, 1); });
  }

  function selectFeature(node) {
    nodes.forEach(function (n) { n.classList.remove('active'); });
    node.classList.add('active');

    var data = features[node.dataset.key];
    if (!data) return;

    details.classList.remove('visible');

    setTimeout(function () {
      if (dIcon) dIcon.textContent = data.icon;
      if (dTitle) dTitle.textContent = data.title;
      if (dDesc) dDesc.textContent = data.desc;

      if (dList) {
        dList.className = data.items.length >= 5 ? '' : 'few';
        dList.innerHTML = data.items.map(function (item, i) {
          return '<li style="transition-delay: ' + (0.08 + i * 0.055) + 's">' +
                   '<span class="rs-check-circle" style="transition-delay: ' + (0.12 + i * 0.055) + 's">✓</span>' +
                   '<span>' + item + '</span>' +
                 '</li>';
        }).join('');
      }

      requestAnimationFrame(function () { details.classList.add('visible'); });
    }, 160);
  }

  function expandAnimation() {
    clearAnimTimers();
    rsExpanded = false;

    orbit.classList.remove('spinning');
    details.classList.remove('visible');
    nodes.forEach(function (n) { n.classList.remove('active'); });
    center.classList.remove('pulse');

    nodes.forEach(function (n) {
      n.style.transition = 'none';
      setNode(n, 0, 0, 0.2);
    });
    void orbit.offsetWidth;

    center.classList.add('pulse');

    var RADIUS = getFinalRadius();

    nodes.forEach(function (node, i) {
      node.style.transition =
        'transform 0.95s cubic-bezier(0.34, 1.4, 0.64, 1) ' + (i * 0.08) + 's, ' +
        'opacity 0.5s ease ' + (i * 0.08) + 's';
      expandTimers.push(setTimeout(function () {
        setNode(node, RADIUS, 1, 1);
      }, 60));
    });

    var totalExpandTime = 60 + (nodes.length * 80) + 950;
    animTimer = setTimeout(function () {
      rsExpanded = true;
      relayoutNodes(); // final correction with the settled size
      orbit.classList.add('spinning');
      selectFeature(nodes[0]);
    }, totalExpandTime);
  }

  nodes.forEach(function (node) {
    node.addEventListener('click', function () { selectFeature(node); });
  });

  center.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    expandAnimation();
  });

  // Keep nodes correct on resize / rotation / mobile address bar change
  window.addEventListener('resize', relayoutNodes);
  window.addEventListener('orientationchange', function () {
    setTimeout(relayoutNodes, 250);
  });
  if ('ResizeObserver' in window) {
    var lastW = 0;
    new ResizeObserver(function (entries) {
      var w = Math.round(entries[0].contentRect.width);
      if (w && w !== lastW) {
        lastW = w;
        relayoutNodes();
      }
    }).observe(wrap);
  }

  // Run expand animation only when the section enters the viewport
  var sec = document.getElementById('radial-feature-section');
  var started = false;
  function start() {
    if (started) return;
    started = true;
    setTimeout(expandAnimation, 200);
  }
  if (!sec || !('IntersectionObserver' in window)) {
    start();
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        start();
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
  io.observe(sec);
})();

/* ======================================== */
/* Hero dashboard animation                 */
/* ======================================== */

(function () {
  var nav = document.getElementById('hero-side-nav');
  if (!nav) return;
  var items = nav.querySelectorAll('.hero-side-item');
  var kpis = document.querySelectorAll('.hero-kpi-card');
  var panels = document.querySelectorAll('.hero-content-panel');
  var playing = false;
  function play() {
    items.forEach(function (el) { el.classList.remove('in'); });
    kpis.forEach(function (el) { el.classList.remove('in'); });
    panels.forEach(function (el) { el.classList.remove('in'); });
    void nav.offsetWidth;
    items.forEach(function (el) { el.classList.add('in'); });
    // KPI cards drop from above
    setTimeout(function () {
      kpis.forEach(function (el) { el.classList.add('in'); });
    }, 180);
    // Rest of dashboard content slides up
    setTimeout(function () {
      panels.forEach(function (el) { el.classList.add('in'); });
    }, 420);
  }
  function loop() {
    play();
    setInterval(play, 6200);
  }
  if (!('IntersectionObserver' in window)) { loop(); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !playing) {
        playing = true;
        loop();
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  var root = document.querySelector('.hero-dash') || nav;
  io.observe(root);
})();

/* ======================================== */
/* Mobile nav — backdrop close + scroll lock */
/* ======================================== */

(function () {
  function initMobileNav() {
    var btn = document.querySelector('.mobile-toggle');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    // Close nav when clicking backdrop (outside nav on mobile)
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !btn.contains(e.target)) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
    // Lock body scroll while open
    btn.addEventListener('click', function () {
      var open = links.classList.contains('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Restore scroll on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.style.overflow = '';
      });
    });
    // Restore scroll on resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        links.classList.remove('open');
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();