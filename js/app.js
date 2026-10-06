(() => {
  'use strict';

  const STORAGE_KEY = 'tko-life-plan-v1';

  const CATEGORIES = {
    financial: { badge: 'การเงิน (Financial)', tab: 'การเงิน', radar: 'การเงิน', color: '#34d399' },
    career:    { badge: 'งาน & เทคโนโลยี (Career & Tech)', tab: 'งาน & AI/IoT', radar: 'การงาน & AI/IoT', color: '#60a5fa' },
    health:    { badge: 'สุขภาพกาย & จิตใจ (Health & Mind)', tab: 'สุขภาพ', radar: 'สุขภาพกาย/จิต', color: '#fb5c70' },
    family:    { badge: 'ครอบครัว & ความสัมพันธ์ (Family)', tab: 'ครอบครัว', radar: 'ครอบครัว', color: '#fbbf24' }
  };
  const TONES = { blue: '#3b82f6', green: '#34d399', red: '#fb5c70', purple: '#b38cff', amber: '#fbbf24' };

  // ---------- Icons (Lucide-style, inline SVG) ----------
  const ICONS = {
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    chip: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    bot: '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'
  };
  const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const num = (v) => (v === null || v === undefined || v === '' || isNaN(Number(v)) ? null : Number(v));

  // รับได้ทั้งไฟล์สำรองของเวอร์ชันนี้ และไฟล์สำรองจากเวอร์ชัน Gemini เดิม
  // (targetYear, week, glucose) — ส่วนที่ไม่มีในไฟล์จะใช้ค่าจาก data.js
  function normalize(d) {
    if (!d || !Array.isArray(d.okrs) || !Array.isArray(d.metrics)) return null;
    const base = clone(DEFAULT_DATA);
    const okrs = d.okrs.map((o, i) => ({
      id: o.id || `okr-${i + 1}`,
      category: CATEGORIES[o.category] ? o.category : 'financial',
      target: num(o.target ?? o.targetYear) ?? '',
      progress: Math.min(100, Math.max(0, num(o.progress) ?? 0)),
      title: String(o.title || ''),
      keyResults: Array.isArray(o.keyResults) ? o.keyResults.map(String) : []
    }));
    const metrics = d.metrics.map((m, i) => ({
      label: String(m.label ?? m.week ?? `สัปดาห์ ${i + 1}`),
      weight: num(m.weight),
      sugar: num(m.sugar ?? m.glucose),
      familyHours: num(m.familyHours),
      learnHours: num(m.learnHours),
      debt: num(m.debt)
    }));
    return {
      version: 1,
      profile: d.profile || base.profile,
      stats: Array.isArray(d.stats) ? d.stats : base.stats,
      simulator: Array.isArray(d.simulator) ? d.simulator : base.simulator,
      okrs,
      metrics
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = normalize(JSON.parse(raw));
        if (d) return d;
      }
    } catch (e) { /* storage unavailable */ }
    return normalize(DEFAULT_DATA);
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  let state = load();
  let filter = 'all';
  let radarChart, lineChart;

  // ---------- Header ----------
  function renderHeader() {
    const p = state.profile || DEFAULT_DATA.profile;
    $('#appTitle').textContent = p.title;
    $('#appSubtitle').textContent = p.subtitle;
    document.title = p.title;
    $('#headerGoals').innerHTML = (p.headerGoals || []).map((g) =>
      `<div class="header-goal">${esc(g.label)}<strong class="tone-${esc(g.tone)}">${esc(g.value)}</strong></div>`
    ).join('');
  }

  // ---------- Stat cards ----------
  function renderStats() {
    $('#stats').innerHTML = state.stats.map((s) => {
      const tone = TONES[s.tone] || TONES.blue;
      const bottom = s.progress
        ? `<div class="stat-progress">
             <div class="stat-progress-row"><span>${esc(s.progress.label)}</span><span>${esc(s.progress.percent)}%</span></div>
             <div class="bar"><span style="width:${Math.min(100, Math.max(0, s.progress.percent))}%"></span></div>
           </div>`
        : `<p class="stat-sub">${esc(s.sub)}</p>`;
      return `<article class="card stat" style="--tone:${tone}">
          <p class="stat-label">${esc(s.label)}</p>
          <p class="stat-value tone-${esc(s.valueTone || s.tone)}">${esc(s.value)}</p>
          <span class="stat-icon">${icon(s.icon)}</span>
          ${bottom}
        </article>`;
    }).join('');
  }

  // ---------- Charts ----------
  function pillarScores() {
    return Object.keys(CATEGORIES).map((key) => {
      const items = state.okrs.filter((o) => o.category === key);
      if (!items.length) return 0;
      return Math.round(items.reduce((sum, o) => sum + Number(o.progress || 0), 0) / items.length);
    });
  }

  function setupChartDefaults() {
    Chart.defaults.font.family = '"Prompt", system-ui, sans-serif';
    Chart.defaults.color = '#8e9ab0';
    Chart.defaults.borderColor = 'rgba(148,163,184,0.1)';
  }

  function renderRadar() {
    const data = pillarScores();
    if (radarChart) {
      radarChart.data.datasets[0].data = data;
      radarChart.update(reducedMotion ? 'none' : undefined);
      return;
    }
    radarChart = new Chart($('#radarChart'), {
      type: 'radar',
      data: {
        labels: Object.values(CATEGORIES).map((c) => c.radar),
        datasets: [{
          label: 'ความคืบหน้า (%)',
          data,
          backgroundColor: 'rgba(59,130,246,0.35)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointBackgroundColor: '#e6eaf2',
          pointBorderColor: '#3b82f6',
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: reducedMotion ? false : undefined,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { stepSize: 20, backdropColor: 'transparent', color: '#66728a', font: { size: 9 } },
            angleLines: { color: 'rgba(148,163,184,0.15)' },
            grid: { color: 'rgba(148,163,184,0.15)' },
            pointLabels: { color: '#c7cfdd', font: { size: 11 } }
          }
        }
      }
    });
  }

  function lineDatasets() {
    const m = state.metrics;
    const sets = [
      {
        label: 'น้ำหนักตัว (kg) [เป้า ≤ 80]',
        data: m.map((r) => r.weight),
        borderColor: '#fb5c70', backgroundColor: '#fb5c70',
        yAxisID: 'y', tension: 0.3, borderWidth: 2.5, pointRadius: 3
      },
      {
        label: 'ระดับน้ำตาล (mg/dL) [เป้า ≤ 120]',
        data: m.map((r) => r.sugar),
        borderColor: '#3b82f6', backgroundColor: '#3b82f6',
        yAxisID: 'y1', tension: 0.3, borderWidth: 2.5, pointRadius: 3
      }
    ];
    const hasVal = (key) => m.some((r) => r[key] !== null && r[key] !== undefined);
    if (hasVal('familyHours')) {
      sets.push({
        label: 'เวลาครอบครัว (ชม./สัปดาห์)', data: m.map((r) => r.familyHours),
        borderColor: '#fbbf24', backgroundColor: '#fbbf24', yAxisID: 'yHours',
        tension: 0.3, borderWidth: 2, pointRadius: 3, spanGaps: true, hidden: true
      });
    }
    if (hasVal('learnHours')) {
      sets.push({
        label: 'เวลาเรียนรู้ (ชม./สัปดาห์)', data: m.map((r) => r.learnHours),
        borderColor: '#b38cff', backgroundColor: '#b38cff', yAxisID: 'yHours',
        tension: 0.3, borderWidth: 2, pointRadius: 3, spanGaps: true, hidden: true
      });
    }
    if (hasVal('debt')) {
      sets.push({
        label: 'ยอดหนี้คงเหลือ (บาท)',
        data: m.map((r) => (r.debt === '' ? null : r.debt)),
        borderColor: '#34d399', backgroundColor: '#34d399', borderDash: [5, 4],
        yAxisID: 'yDebt', tension: 0.3, borderWidth: 2, pointRadius: 3, spanGaps: true
      });
    }
    return sets;
  }

  function renderLine() {
    const labels = state.metrics.map((r) => r.label);
    const datasets = lineDatasets();
    if (lineChart) {
      lineChart.data.labels = labels;
      lineChart.data.datasets = datasets;
      lineChart.update(reducedMotion ? 'none' : undefined);
      return;
    }
    lineChart = new Chart($('#lineChart'), {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: reducedMotion ? false : undefined,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 26, boxHeight: 10, color: '#c7cfdd', font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed.y;
                const unit = ctx.dataset.yAxisID === 'yHours' ? ' ชม.' : '';
                if (v === null || v === undefined) return null;
                return `${ctx.dataset.label}: ${ctx.dataset.yAxisID === 'yDebt' ? v.toLocaleString('th-TH') : v}${unit}`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(148,163,184,0.08)' } },
          y: { position: 'left', ticks: { color: '#fb5c70' }, grid: { color: 'rgba(148,163,184,0.08)' } },
          y1: { position: 'right', ticks: { color: '#60a5fa' }, grid: { drawOnChartArea: false } },
          yDebt: { display: false, position: 'right', grid: { drawOnChartArea: false } },
          yHours: { display: false, min: 0, grid: { drawOnChartArea: false } }
        }
      }
    });
  }

  // ---------- OKRs ----------
  function renderTabs() {
    const tabs = [{ key: 'all', label: 'ทั้งหมด' }].concat(
      Object.entries(CATEGORIES).map(([key, c]) => ({ key, label: c.tab }))
    );
    $('#okrTabs').innerHTML = tabs.map((t) =>
      `<button class="tab" role="tab" type="button" data-filter="${t.key}" aria-selected="${t.key === filter}">${esc(t.label)}</button>`
    ).join('');
  }

  function setRangeFill(input) {
    input.style.setProperty('--val', `${input.value}%`);
  }

  function renderOkrs() {
    const grid = $('#okrGrid');
    grid.innerHTML = '';
    state.okrs
      .filter((o) => filter === 'all' || o.category === filter)
      .forEach((o) => {
        const c = CATEGORIES[o.category] || CATEGORIES.financial;
        const el = document.createElement('article');
        el.className = 'card okr';
        el.style.setProperty('--tone', c.color);
        el.innerHTML = `
          <div class="okr-top">
            <span class="badge">${esc(c.badge)}</span>
            <span class="okr-target">Target: ${esc(o.target)}</span>
          </div>
          <h3 class="okr-title">${esc(o.title)}</h3>
          <ul class="okr-krs">${o.keyResults.map((kr) => `<li>${icon('check')}<span>${esc(kr)}</span></li>`).join('')}</ul>
          <div class="okr-progress">
            <div class="okr-progress-row"><span>ความคืบหน้า (Progress)</span><span class="okr-pct">${o.progress}%</span></div>
            <input type="range" min="0" max="100" step="5" value="${o.progress}" aria-label="ความคืบหน้า: ${esc(o.title)}">
          </div>`;
        const range = el.querySelector('input[type="range"]');
        const pct = el.querySelector('.okr-pct');
        setRangeFill(range);
        range.addEventListener('input', () => {
          o.progress = Number(range.value);
          pct.textContent = `${o.progress}%`;
          setRangeFill(range);
          renderRadar();
        });
        range.addEventListener('change', save);
        grid.appendChild(el);
      });
  }

  // ---------- Simulator ----------
  function formatMetric(m, value) {
    const v = Number(value).toFixed(m.decimals ?? 1);
    return `${esc(m.label)}: <b>${esc(m.prefix || '')}${v}${esc(m.unit || '')}${esc(m.suffix || '')}</b>`;
  }

  function renderSim() {
    const items = state.simulator || DEFAULT_DATA.simulator;
    $('#simGrid').innerHTML = items.map((s, i) => `
      <div class="sim-card">
        <div class="sim-card-top">
          <span class="sim-name">${icon(s.icon)}${esc(s.name)}</span>
          <span class="sim-status tone-${esc(s.statusTone)}">${esc(s.status)}</span>
        </div>
        <p class="sim-desc">${esc(s.desc)}</p>
        <div class="sim-metric" data-sim="${i}">${formatMetric(s.metric, s.metric.value)}</div>
      </div>`).join('');

    if (reducedMotion) return;
    const live = items.map((s) => s.metric.value);
    setInterval(() => {
      items.forEach((s, i) => {
        const m = s.metric;
        const next = live[i] + (Math.random() * 2 - 1) * (m.jitter || 0);
        live[i] = Math.min(m.max ?? next, Math.max(m.min ?? next, next));
        const node = document.querySelector(`[data-sim="${i}"]`);
        if (node) node.innerHTML = formatMetric(m, live[i]);
      });
    }, 3000);
  }

  // ---------- Record modal ----------
  function setupModal() {
    const modal = $('#recordModal');
    const form = $('#recordForm');
    $('#btnAddRecord').addEventListener('click', () => {
      form.reset();
      $('#fLabel').value = `สัปดาห์ ${state.metrics.length + 1}`;
      modal.showModal();
    });
    form.addEventListener('submit', (e) => {
      if (e.submitter && e.submitter.value === 'cancel') return;
      const fd = new FormData(form);
      const debtRaw = fd.get('debt');
      state.metrics.push({
        label: String(fd.get('label')).trim() || `สัปดาห์ ${state.metrics.length + 1}`,
        weight: Number(fd.get('weight')),
        sugar: Number(fd.get('sugar')),
        familyHours: num(fd.get('familyHours')),
        learnHours: num(fd.get('learnHours')),
        debt: debtRaw === '' || debtRaw === null ? null : Number(debtRaw)
      });
      save();
      renderLine();
      toast('บันทึกค่าสัปดาห์ใหม่แล้ว');
    });
  }

  // ---------- Backup / restore / reset ----------
  function setupDataActions() {
    $('#btnBackup').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tko-life-plan-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast('ดาวน์โหลดไฟล์สำรองแล้ว');
    });

    const input = $('#restoreInput');
    $('#btnRestore').addEventListener('click', () => input.click());
    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];
      input.value = '';
      if (!file) return;
      try {
        const data = normalize(JSON.parse(await file.text()));
        if (!data) throw new Error('invalid');
        state = data;
        save();
        renderAll();
        toast('นำเข้าไฟล์สำรองแล้ว');
      } catch (e) {
        toast('ไฟล์ไม่ถูกต้อง: ต้องเป็นไฟล์ .json ที่ได้จากปุ่มสำรองข้อมูล');
      }
    });

    $('#btnReset').addEventListener('click', () => {
      if (!confirm('ล้างค่าที่ปรับไว้ทั้งหมดและกลับไปใช้ข้อมูลเริ่มต้นจาก data.js?')) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      state = normalize(DEFAULT_DATA);
      renderAll();
      toast('รีเซ็ตเป็นค่าเริ่มต้นแล้ว');
    });
  }

  // ---------- Init ----------
  function renderAll() {
    renderHeader();
    renderStats();
    renderTabs();
    renderOkrs();
    if (window.Chart) { renderRadar(); renderLine(); }
  }

  function init() {
    document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

    $('#okrTabs').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filter = btn.dataset.filter;
      renderTabs();
      renderOkrs();
    });

    if (typeof Chart === 'undefined') {
      document.querySelectorAll('.chart-box').forEach((b) => {
        b.innerHTML = '<p class="panel-sub">โหลดไลบรารีกราฟไม่สำเร็จ ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า</p>';
      });
    } else {
      setupChartDefaults();
    }

    renderHeader();
    renderStats();
    renderTabs();
    renderOkrs();
    if (window.Chart) { renderRadar(); renderLine(); }
    renderSim();
    setupModal();
    setupDataActions();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

