/**
 * Netflix Content Intelligence & Machine Learning Platform — Ultra 3D Motion System
 * Modules:
 * 1. Celestial Solar-Orbit 3D Particle Canvas with Gravitational Nova Shockwaves
 * 2. 3D "Stitching" Load Assembly Sequence
 * 3. Cursor-Tracking Cybernetic Floating HUD Inspection Dialog
 * 4. Interactive 3D Perspective Card Tilt with Specular Glare Follow
 * 5. Animated KPI Counter Ticker with Quartic Easing
 * 6. Live Recommender, Classifier & Executive Chart.js Visuals
 */

document.addEventListener('DOMContentLoaded', () => {
  initCelestialCanvas();
  init3DAssembly();
  initHUDInspector();
  init3DTilt();
  initCounters();
  initTabs();
  initRecommender();
  initClassifier();
  initCharts();
});

/* ==========================================================================
   1. Celestial Solar-Orbit 3D Particle Canvas with Gravitational Shockwaves
   ========================================================================== */
function initCelestialCanvas() {
  const canvas = document.getElementById('celestial-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse interaction state
  let mouse = { x: width * 0.5, y: height * 0.4, isHovered: false };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isHovered = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
  });

  // Shockwave ripples spawned on click
  const shockwaves = [];
  const sparks = [];

  window.addEventListener('click', (e) => {
    // Spawn expanding shockwave ring
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 10,
      maxRadius: Math.max(width, height) * 0.35,
      alpha: 0.9,
      speed: 6.5,
      color: '#E50914'
    });

    // Spawn burst of stellar sparks
    const sparkCount = 20;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5);
      const speed = 2.5 + Math.random() * 4.5;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2,
        alpha: 1,
        life: 0,
        maxLife: 40 + Math.random() * 25,
        color: i % 2 === 0 ? '#E50914' : (i % 3 === 0 ? '#F59E0B' : '#06B6D4')
      });
    }
  });

  // 3D Starfield Nodes (Constellation Network)
  const starCount = 95;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: 100 + Math.random() * 900,
      baseRadius: 1 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.3 ? '#FFFFFF' : (Math.random() > 0.5 ? '#FF5454' : '#60A5FA')
    });
  }

  // 4 Concentric Planetary Orbits representing the 4 ML Paradigms
  const orbits = [
    { name: 'Recommender', radiusX: 160, radiusY: 90, angle: 0, speed: 0.012, color: '#06B6D4', size: 5.5, glow: 'rgba(6, 182, 212, 0.7)' },
    { name: 'Classifier', radiusX: 250, radiusY: 140, angle: 1.8, speed: 0.0085, color: '#F59E0B', size: 6.5, glow: 'rgba(245, 158, 11, 0.7)' },
    { name: 'Segmentation', radiusX: 340, radiusY: 190, angle: 3.5, speed: 0.006, color: '#10B981', size: 5, glow: 'rgba(16, 185, 129, 0.7)' },
    { name: 'Analytics', radiusX: 430, radiusY: 240, angle: 5.2, speed: 0.0042, color: '#8B5CF6', size: 7, glow: 'rgba(139, 92, 246, 0.7)' }
  ];

  let tick = 0;

  function render() {
    tick += 0.016;
    ctx.clearRect(0, 0, width, height);

    // Singularity center point (smoothly floats near center top)
    const centerX = width * 0.5;
    const centerY = Math.min(height * 0.32, 260);

    // --- 1. Draw Planetary Orbit Trajectories & Planets ---
    orbits.forEach((orbit, idx) => {
      orbit.angle += orbit.speed;

      // Draw faint elliptical orbit track
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbit.radiusX, orbit.radiusY, -0.15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.035 + idx * 0.01})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compute planet 3D coordinates on tilted ellipse
      const cosA = Math.cos(orbit.angle);
      const sinA = Math.sin(orbit.angle);
      const tilt = -0.15;
      const px = centerX + orbit.radiusX * cosA * Math.cos(tilt) - orbit.radiusY * sinA * Math.sin(tilt);
      const py = centerY + orbit.radiusX * cosA * Math.sin(tilt) + orbit.radiusY * sinA * Math.cos(tilt);

      // Planet Glow Aura
      const aura = ctx.createRadialGradient(px, py, 0, px, py, orbit.size * 3.5);
      aura.addColorStop(0, orbit.glow);
      aura.addColorStop(1, 'transparent');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(px, py, orbit.size * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Planet Solid Core
      ctx.beginPath();
      ctx.arc(px, py, orbit.size, 0, Math.PI * 2);
      ctx.fillStyle = orbit.color;
      ctx.shadowColor = orbit.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // --- 2. Central Singularity Core (Netflix ML Crimson Singularity) ---
    const corePulse = 1 + Math.sin(tick * 2.5) * 0.08;
    const coreRadius = 24 * corePulse;
    const coreAura = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 90 * corePulse);
    coreAura.addColorStop(0, 'rgba(229, 9, 20, 0.7)');
    coreAura.addColorStop(0.3, 'rgba(229, 9, 20, 0.25)');
    coreAura.addColorStop(1, 'transparent');

    ctx.fillStyle = coreAura;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 90 * corePulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#E50914';
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;

    // --- 3. 3D Constellation Stars & Distance Interlinks ---
    const focalLength = 400;
    const projectedStars = [];

    stars.forEach(star => {
      // Gentle drift
      star.x += star.vx;
      star.y += star.vy;
      if (star.x < -width * 0.7) star.x = width * 0.7;
      if (star.x > width * 0.7) star.x = -width * 0.7;
      if (star.y < -height * 0.7) star.y = height * 0.7;
      if (star.y > height * 0.7) star.y = -height * 0.7;

      // Mouse gravity deflection
      if (mouse.isHovered) {
        const dx = (star.x + width * 0.5) - mouse.x;
        const dy = (star.y + height * 0.5) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 1) {
          const force = (140 - dist) * 0.002;
          star.x += (dx / dist) * force * 10;
          star.y += (dy / dist) * force * 10;
        }
      }

      // 3D Perspective Projection
      const scale = focalLength / star.z;
      const screenX = star.x * scale + width * 0.5;
      const screenY = star.y * scale + height * 0.5;
      const r = Math.max(0.6, star.baseRadius * scale);

      projectedStars.push({ x: screenX, y: screenY, r, color: star.color, alpha: Math.min(1, scale * 1.5) });

      // Draw star
      ctx.beginPath();
      ctx.arc(screenX, screenY, r, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.min(0.85, Math.max(0.1, scale * 1.2));
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw proximity lines between nearest stars
    for (let i = 0; i < projectedStars.length; i++) {
      for (let j = i + 1; j < projectedStars.length; j++) {
        const dx = projectedStars[i].x - projectedStars[j].x;
        const dy = projectedStars[i].y - projectedStars[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 75) {
          ctx.beginPath();
          ctx.moveTo(projectedStars[i].x, projectedStars[i].y);
          ctx.lineTo(projectedStars[j].x, projectedStars[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - d / 75)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // --- 4. Render Active Click Shockwaves ---
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.016;

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(229, 9, 20, ${sw.alpha * 0.8})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#FF4550';
      ctx.shadowBlur = 18;
      ctx.stroke();

      // Outer refraction wave
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // --- 5. Render Active Sparks ---
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy *= 0.94;
      s.life++;
      s.alpha = 1 - s.life / s.maxLife;

      if (s.life >= s.maxLife || s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * (1 - s.life / s.maxLife), 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   2. 3D "Stitching" Load Assembly Sequence
   ========================================================================== */
function init3DAssembly() {
  // Trigger laser scan line
  const laser = document.querySelector('.laser-scanner-line');
  if (laser) {
    laser.style.animation = 'laserScan 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
  }

  // Staggered 3D construction schedule
  const assembleItems = [
    { selector: '.navbar-wrapper', delay: 40 },
    { selector: '.hero-card', delay: 180 },
    { selector: '.kpi-card:nth-child(1)', delay: 300 },
    { selector: '.kpi-card:nth-child(2)', delay: 380 },
    { selector: '.kpi-card:nth-child(3)', delay: 460 },
    { selector: '.kpi-card:nth-child(4)', delay: 540 },
    { selector: '.kpi-card:nth-child(5)', delay: 620 },
    { selector: '.section-headline', delay: 700 },
    { selector: '.overview-card, .search-card-wrapper, .classifier-form-card, .archetype-card, .bi-chart-card', delay: 780 }
  ];

  assembleItems.forEach(({ selector, delay }) => {
    setTimeout(() => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('assemble-3d');
        requestAnimationFrame(() => {
          el.classList.add('assembled');
        });
      });
    }, delay);
  });
}

/* ==========================================================================
   3. Cybernetic Floating 3D HUD Inspection Dialog
   ========================================================================== */
function initHUDInspector() {
  const inspector = document.getElementById('hud-inspector');
  if (!inspector) return;

  const catEl = inspector.querySelector('.hud-category-text');
  const statusEl = inspector.querySelector('.hud-status-badge');
  const titleEl = inspector.querySelector('.hud-title');
  const metricValEl = inspector.querySelector('.hud-metric-value');
  const metricLblEl = inspector.querySelector('.hud-metric-label');
  const specsListEl = inspector.querySelector('.hud-specs-list');

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let isVisible = false;

  // Smooth lerp tracking loop
  function updateHUDPosition() {
    if (isVisible) {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      // Keep within viewport bounds
      const hudW = 330;
      const hudH = 220;
      let clampedX = currentX + 22;
      let clampedY = currentY + 18;

      if (clampedX + hudW > window.innerWidth - 16) {
        clampedX = currentX - hudW - 22;
      }
      if (clampedY + hudH > window.innerHeight - 16) {
        clampedY = currentY - hudH - 18;
      }

      inspector.style.left = `${clampedX.toFixed(1)}px`;
      inspector.style.top = `${clampedY.toFixed(1)}px`;
    }
    requestAnimationFrame(updateHUDPosition);
  }
  requestAnimationFrame(updateHUDPosition);

  // Bind HUD trigger events to all elements with data-hud-*
  function bindHUDElements(root = document) {
    const targets = root.querySelectorAll('[data-hud-title]');

    targets.forEach(el => {
      if (el._hudBound) return;
      el._hudBound = true;

      el.addEventListener('mouseenter', (e) => {
        isVisible = true;
        targetX = currentX = e.clientX;
        targetY = currentY = e.clientY;

        // Populate HUD data
        if (catEl) catEl.textContent = el.dataset.hudCategory || 'TELEMETRY';
        if (statusEl) statusEl.textContent = el.dataset.hudStatus || 'OPTIMAL';
        if (titleEl) titleEl.textContent = el.dataset.hudTitle || '';
        if (metricValEl) metricValEl.textContent = el.dataset.hudMetric || '';
        if (metricLblEl) metricLblEl.textContent = el.dataset.hudMetricLabel || '';

        // Populate specs list
        if (specsListEl) {
          const specsRaw = el.dataset.hudSpecs || '';
          if (specsRaw) {
            const items = specsRaw.split(';').map(s => s.trim()).filter(Boolean);
            specsListEl.innerHTML = items.map(item => {
              const parts = item.split(':');
              if (parts.length > 1) {
                return `<li><span class="bullet">▸</span> <strong>${escapeHtml(parts[0])}:</strong> ${escapeHtml(parts.slice(1).join(':'))}</li>`;
              }
              return `<li><span class="bullet">▸</span> ${escapeHtml(item)}</li>`;
            }).join('');
          } else {
            specsListEl.innerHTML = '';
          }
        }

        inspector.classList.add('active');
      });

      el.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      });

      el.addEventListener('mouseleave', () => {
        isVisible = false;
        inspector.classList.remove('active');
      });
    });
  }

  bindHUDElements();
  window._bindHUDElements = bindHUDElements;
}

/* ==========================================================================
   4. Interactive 3D Perspective Card Tilt with Dynamic Specular Glare
   ========================================================================== */
function init3DTilt(rootElement = document) {
  const cards = rootElement.querySelectorAll('.card-3d, [data-tilt]');

  cards.forEach(card => {
    if (card._tiltBound) return;
    card._tiltBound = true;

    let glare = card.querySelector('.glare-overlay');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'glare-overlay';
      card.appendChild(glare);
    }

    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.25s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;

      const maxTilt = 10;
      const rotX = (-normY * maxTilt).toFixed(2);
      const rotY = (normX * maxTilt).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px) scale3d(1.018, 1.018, 1.018)`;

      const glareX = ((normX + 0.5) * 100).toFixed(1);
      const glareY = ((normY + 0.5) * 100).toFixed(1);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    });
  });
}

/* ==========================================================================
   5. Animated KPI Counter Ticker with Quartic Easing
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  counters.forEach(counter => {
    const rawTarget = counter.dataset.target;
    if (!rawTarget) return;

    const targetVal = parseFloat(rawTarget);
    const suffix = counter.dataset.suffix || '';
    const isDecimal = rawTarget.includes('.');
    const duration = 1400;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentVal = easedProgress * targetVal;

      if (isDecimal) {
        counter.textContent = currentVal.toFixed(1) + suffix;
      } else {
        counter.textContent = Math.floor(currentVal).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          counter.textContent = targetVal.toFixed(1) + suffix;
        } else {
          counter.textContent = Math.round(targetVal).toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(step);
  });
}

/* ==========================================================================
   6. Tab Navigation & View Transitions
   ========================================================================== */
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = tab.dataset.target;
      const targetPane = document.getElementById(targetId);

      if (targetPane) {
        targetPane.classList.add('active');
        init3DTilt(targetPane);
        if (window._bindHUDElements) window._bindHUDElements(targetPane);
      }

      if (targetId === 'tab-analytics') {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 60);
      }
    });
  });
}

/* ==========================================================================
   7. Task 1: Live Recommendation Engine
   ========================================================================== */
function initRecommender() {
  const searchInput = document.getElementById('search-title');
  const autocompleteList = document.getElementById('autocomplete-list');
  const btnSearch = document.getElementById('btn-get-recs');
  const typeFilter = document.getElementById('filter-type');
  const presetChips = document.querySelectorAll('.preset-chip-btn');

  if (!searchInput) return;

  let debounceTimeout = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    const q = searchInput.value.trim();
    if (q.length < 2) {
      autocompleteList.style.display = 'none';
      return;
    }

    debounceTimeout = setTimeout(async () => {
      try {
        const resp = await fetch(`/api/titles?q=${encodeURIComponent(q)}`);
        const titles = await resp.json();
        if (titles && titles.length > 0) {
          autocompleteList.innerHTML = titles
            .map(t => `<div class="autocomplete-row" data-title="${escapeHtml(t)}">${escapeHtml(t)}</div>`)
            .join('');
          autocompleteList.style.display = 'block';

          autocompleteList.querySelectorAll('.autocomplete-row').forEach(item => {
            item.addEventListener('click', () => {
              searchInput.value = item.dataset.title;
              autocompleteList.style.display = 'none';
              fetchRecommendations(item.dataset.title);
            });
          });
        } else {
          autocompleteList.style.display = 'none';
        }
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    }, 180);
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.style.display = 'none';
    }
  });

  btnSearch.addEventListener('click', () => {
    const title = searchInput.value.trim();
    if (title) fetchRecommendations(title);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      autocompleteList.style.display = 'none';
      const title = searchInput.value.trim();
      if (title) fetchRecommendations(title);
    }
  });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const title = chip.dataset.title;
      searchInput.value = title;
      autocompleteList.style.display = 'none';
      fetchRecommendations(title);
    });
  });

  typeFilter.addEventListener('change', () => {
    const title = searchInput.value.trim();
    if (title) fetchRecommendations(title);
  });

  fetchRecommendations('Stranger Things');
}

async function fetchRecommendations(title) {
  const recsContainer = document.getElementById('recs-container');
  const typeFilter = document.getElementById('filter-type').value;
  const statusMsg = document.getElementById('recs-status-msg');

  statusMsg.innerHTML = `<span style="color: var(--accent-gold);">🔍 Computing cosine similarity vectors for <strong>"${escapeHtml(title)}"</strong>...</span>`;
  recsContainer.innerHTML = '';

  try {
    const filterParam = typeFilter !== 'All' ? `&type=${encodeURIComponent(typeFilter)}` : '';
    const resp = await fetch(`/api/recommend?title=${encodeURIComponent(title)}&top_n=6${filterParam}`);
    const data = await resp.json();

    if (data.error || !data.recommendations || data.recommendations.length === 0) {
      statusMsg.innerHTML = `<span style="color: #FF5454;">⚠️ ${escapeHtml(data.error || 'No recommendations found.')}</span>`;
      return;
    }

    statusMsg.innerHTML = `Showing <strong>${data.recommendations.length}</strong> semantic matches for <strong>"${escapeHtml(title)}"</strong>:`;

    recsContainer.innerHTML = data.recommendations.map(r => `
      <div class="movie-card card-3d" data-tilt
           data-hud-category="CONTENT SOUP NLP"
           data-hud-title="${escapeHtml(r.title)}"
           data-hud-metric="${r.match_score_pct}%"
           data-hud-metric-label="Cosine Similarity"
           data-hud-status="MATCH RANKED"
           data-hud-specs="Format: ${escapeHtml(r.type)};Year: ${escapeHtml(r.release_year || 'N/A')};Director: ${escapeHtml(r.director || 'Unknown')};Soup Weights: Genre x2 + Cast + Director">
        <div class="glare-overlay"></div>
        <div>
          <div class="card-top-row">
            <h4 class="movie-card-title">${escapeHtml(r.title)}</h4>
            <span class="match-score-badge">${r.match_score_pct}% MATCH</span>
          </div>
          <div class="card-meta-chips">
            <span class="meta-chip">${escapeHtml(r.type)}</span>
            <span class="meta-chip">${escapeHtml(r.release_year || 'N/A')}</span>
          </div>
          <div class="genres-pill-row">${escapeHtml(r.listed_in)}</div>
          <p class="synopsis-text">${escapeHtml(r.description)}</p>
        </div>
        <div class="card-author-footer">
          <strong>Director:</strong> ${escapeHtml(r.director || 'Unknown')}
        </div>
      </div>
    `).join('');

    init3DTilt(recsContainer);
    if (window._bindHUDElements) window._bindHUDElements(recsContainer);
  } catch (err) {
    statusMsg.innerHTML = `<span style="color: #FF5454;">⚠️ Error connecting to recommendation service.</span>`;
    console.error(err);
  }
}

/* ==========================================================================
   8. Task 2: Live Content Type Classifier
   ========================================================================== */
function initClassifier() {
  const btnPredict = document.getElementById('btn-run-predict');
  if (!btnPredict) return;

  btnPredict.addEventListener('click', async () => {
    const title = document.getElementById('input-title').value.trim() || 'Untitled Project';
    const country = document.getElementById('input-country').value;
    const rating = document.getElementById('input-rating').value;
    const releaseYear = document.getElementById('input-year').value;
    const description = document.getElementById('input-desc').value.trim();

    const genreCheckboxes = document.querySelectorAll('input[name="genre-check"]:checked');
    const genres = Array.from(genreCheckboxes).map(cb => cb.value);

    if (genres.length === 0) {
      alert('Please select at least one genre tag.');
      return;
    }

    btnPredict.disabled = true;
    btnPredict.innerHTML = '⚡ Running Scikit-Learn Inference...';

    try {
      const resp = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          genres: genres,
          country: country,
          rating: rating,
          release_year: releaseYear,
          description: description
        })
      });

      const data = await resp.json();

      const badge = document.getElementById('pred-result-badge');
      const meterFill = document.getElementById('pred-meter-fill');
      const moviePct = document.getElementById('pred-movie-pct');
      const tvPct = document.getElementById('pred-tv-pct');
      const confText = document.getElementById('pred-confidence-text');

      if (!resp.ok || data.error) {
        badge.textContent = 'Error';
        badge.style.background = '#FF5454';
        confText.innerHTML = `<span style="color: #FF5454;">Prediction failed: ${escapeHtml(data.error || 'Unknown error')}</span>`;
        return;
      }

      badge.textContent = data.prediction;
      if (data.prediction === 'Movie') {
        badge.style.background = 'linear-gradient(135deg, var(--netflix-red), #FF4550)';
      } else {
        badge.style.background = 'linear-gradient(135deg, #1E40AF, #3B82F6)';
      }

      moviePct.textContent = `${data.movie_probability}%`;
      tvPct.textContent = `${data.tv_show_probability}%`;
      meterFill.style.width = `${data.movie_probability}%`;

      confText.innerHTML = `Model Confidence: <strong>${data.confidence}%</strong> (${data.prediction} Likelihood)`;
    } catch (err) {
      console.error('Classification error:', err);
      alert('Failed to connect to classifier API.');
    } finally {
      btnPredict.disabled = false;
      btnPredict.innerHTML = '⚡ Run Machine Learning Prediction';
    }
  });
}

/* ==========================================================================
   9. Task 6: Interactive Chart.js Visual Dashboard
   ========================================================================== */
let chartsInitialized = false;

async function initCharts() {
  if (chartsInitialized) return;

  try {
    const resp = await fetch('/api/analytics');
    const data = await resp.json();
    if (!data.yearly || !data.yearly.years) return;

    renderCatalogGrowthChart(data.yearly);
    renderCountryChart(data.countries);
    renderRatingChart(data.ratings);
    renderLongitudinalTrendChart(data.yearly);
    chartsInitialized = true;
  } catch (err) {
    console.error('Failed to load chart analytics:', err);
  }
}

function renderCatalogGrowthChart(yearly) {
  const ctx = document.getElementById('chart-growth');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: yearly.years,
      datasets: [
        {
          label: 'Movies Added',
          data: yearly.movies,
          backgroundColor: '#E50914',
          borderRadius: 4
        },
        {
          label: 'TV Shows Added',
          data: yearly.tv_shows,
          backgroundColor: '#3B82F6',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } },
        y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } }
      },
      plugins: {
        legend: { labels: { color: '#F8FAFC', font: { family: 'Plus Jakarta Sans', weight: '700' } } }
      }
    }
  });
}

function renderCountryChart(countries) {
  const ctx = document.getElementById('chart-countries');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries.labels,
      datasets: [{
        label: 'Titles Produced',
        data: countries.counts,
        backgroundColor: '#F59E0B',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderRatingChart(ratings) {
  const ctx = document.getElementById('chart-ratings');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ratings.labels,
      datasets: [{
        data: ratings.counts,
        backgroundColor: ['#E50914', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'],
        borderColor: '#12141C',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { color: '#F8FAFC', font: { family: 'Plus Jakarta Sans', weight: '600' } } }
      }
    }
  });
}

function renderLongitudinalTrendChart(yearly) {
  const ctx = document.getElementById('chart-trends');
  if (!ctx) return;

  const totalPerYear = yearly.years.map((_, i) => yearly.movies[i] + yearly.tv_shows[i]);
  const movieShare = yearly.years.map((_, i) => totalPerYear[i] ? parseFloat(((yearly.movies[i] / totalPerYear[i]) * 100).toFixed(1)) : 0);
  const tvShare = yearly.years.map((_, i) => totalPerYear[i] ? parseFloat(((yearly.tv_shows[i] / totalPerYear[i]) * 100).toFixed(1)) : 0);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: yearly.years,
      datasets: [
        {
          label: 'Movie Share (%)',
          data: movieShare,
          borderColor: '#E50914',
          backgroundColor: 'rgba(229, 9, 20, 0.1)',
          fill: true,
          tension: 0.35,
          pointRadius: 3
        },
        {
          label: 'TV Show Share (%)',
          data: tvShare,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.35,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } },
        y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } }
      },
      plugins: {
        legend: { labels: { color: '#F8FAFC', font: { family: 'Plus Jakarta Sans', weight: '700' } } }
      }
    }
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
