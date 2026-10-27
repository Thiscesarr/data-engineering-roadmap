(() => {
  'use strict';

  /* =========================================================
   * Dados
   * ======================================================= */
  const PHASES = window.ROADMAP_PHASES.slice().sort((a, b) => a.num - b.num);
  const ANSWERS = window.ROADMAP_ANSWERS || {};
  const KW = window.ROADMAP_KW || {};
  const TOPICS = [];
  const TOPIC = {};
  const PHASE = {};
  PHASES.forEach(p => {
    PHASE[p.id] = p;
    p.topics.forEach(t => {
      t.phase = p;
      t.learn = t.learn || [];
      t.practice = t.practice || [];
      t.resources = t.resources || [];
      t.questions = t.questions || [];
      t.answers = ANSWERS[t.id] || [];
      t.order = TOPICS.length;
      TOPICS.push(t);
      TOPIC[t.id] = t;
    });
  });

  const LEVELS = {
    base: { label: 'Base', color: '#94a3b8', desc: 'Do zero: como aprender, inglês, matemática e o papel do DE.' },
    junior: { label: 'Júnior', color: '#3ddc84', desc: 'Computação, Python e SQL sólidos. Você entrega tarefas.' },
    pleno: { label: 'Pleno', color: '#4ea8ff', desc: 'Modelagem, Spark, pipelines, streaming e cloud. Você entrega projetos.' },
    senior: { label: 'Sênior', color: '#b18cff', desc: 'Produção, governança, arquitetura. Você define soluções.' },
    staff: { label: 'Especialista / Staff', color: '#ffb547', desc: 'Internals, liderança e estratégia. Você muda a organização.' },
    carreira: { label: 'Carreira internacional', color: '#ff7eb6', desc: 'Trilha paralela: currículo, entrevistas, vistos e negociação.' }
  };
  const LEVEL_ORDER = ['base', 'junior', 'pleno', 'senior', 'staff', 'carreira'];
  const RATE_LABEL = ['Não sei', 'Parcial', 'Domino'];
  const RATE_COLOR = ['var(--danger)', 'var(--warn)', 'var(--ok)'];

  /* =========================================================
   * Ícones (SVG inline, traço)
   * ======================================================= */
  const ICONS = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.7 1.5A4 4 0 0 0 6 19z"/>',
    book: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h10"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
    doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    dollar: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
    logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h12"/>'
  };
  const icon = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* =========================================================
   * Estado local (localStorage) + carimbos de tempo para sync
   * ======================================================= */
  const KEY = 'deroadmap:v1';
  const blank = () => ({ t: {}, q: {}, v: {}, h: [], log: {}, pj: {}, weekly: 12, wu: 0, started: Date.now(), resetAt: 0 });
  let S = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object') return Object.assign(blank(), s);
    } catch (e) { /* storage indisponível */ }
    return blank();
  }
  let saveTimer = null;
  function flushLocal() {
    clearTimeout(saveTimer);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flushLocal, 200);
    schedulePush();
  }
  window.addEventListener('beforeunload', flushLocal);
  window.addEventListener('pagehide', flushLocal);

  const now = () => Date.now();
  const dayKey = (d = new Date()) =>
    d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function bump() { const k = dayKey(); S.log[k] = (S.log[k] || 0) + 1; }
  const topicState = id => S.t[id] || (S.t[id] = { l: {}, p: {}, u: 0 });
  const qKey = (tid, i) => tid + ':' + i;
  function setQ(k, patch) { S.q[k] = Object.assign({}, S.q[k], patch, { u: now() }); }

  // Serialização canônica (chaves ordenadas) para comparar estados
  function stable(v) {
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}';
    return JSON.stringify(v);
  }

  // Merge de dois estados: por item, vence o mais recente (u). Respeita "zerar progresso" (resetAt).
  function mergeState(a, b) {
    a = Object.assign(blank(), a || {});
    b = Object.assign(blank(), b || {});
    const r = blank();
    r.resetAt = Math.max(a.resetAt || 0, b.resetAt || 0);
    r.started = Math.min(a.started || Infinity, b.started || Infinity);
    if (!isFinite(r.started)) r.started = now();
    const pick = (x, y) => (!x ? y : !y ? x : ((y.u || 0) > (x.u || 0) ? y : x));
    ['t', 'q', 'pj'].forEach(key => {
      const keys = new Set([...Object.keys(a[key] || {}), ...Object.keys(b[key] || {})]);
      keys.forEach(k => {
        const v = pick(a[key][k], b[key][k]);
        if (v && (v.u || 0) >= r.resetAt) r[key][k] = v;
      });
    });
    const resetDay = r.resetAt ? dayKey(new Date(r.resetAt)) : '';
    new Set([...Object.keys(a.log), ...Object.keys(b.log)]).forEach(d => {
      if (d >= resetDay) r.log[d] = Math.max(a.log[d] || 0, b.log[d] || 0);
    });
    new Set([...Object.keys(a.v), ...Object.keys(b.v)]).forEach(id => {
      const ts = Math.max(a.v[id] || 0, b.v[id] || 0);
      if (ts >= r.resetAt) r.v[id] = ts;
    });
    const seen = new Set();
    r.h = [...a.h, ...b.h].filter(x => x && x.ts >= r.resetAt && !seen.has(x.id + '@' + x.ts) && seen.add(x.id + '@' + x.ts))
      .sort((x, y) => y.ts - x.ts).slice(0, 300);
    const w = (b.wu || 0) > (a.wu || 0) ? b : a;
    r.weekly = w.weekly; r.wu = w.wu || 0;
    return r;
  }

  /* =========================================================
   * Sincronização (login com Google via Firebase)
   * ======================================================= */
  const CLOUD = { state: 'off', user: null, api: null, unsub: null, pushTimer: null, lastSync: 0, error: '' };

  async function cloudInit() {
    if (!window.FIREBASE_CONFIG) { CLOUD.state = 'unconfigured'; updateSyncUI(); return; }
    CLOUD.state = 'loading'; updateSyncUI();
    try {
      const mod = await import('./sync.js');
      CLOUD.api = await mod.createSync(window.FIREBASE_CONFIG);
    } catch (e) {
      CLOUD.state = 'error'; CLOUD.error = 'Não foi possível carregar o Firebase: ' + e.message; updateSyncUI(); return;
    }
    CLOUD.api.onUser(user => {
      CLOUD.user = user;
      if (CLOUD.unsub) { CLOUD.unsub(); CLOUD.unsub = null; }
      if (user) {
        CLOUD.state = 'busy';
        CLOUD.unsub = CLOUD.api.subscribe(user.uid, onRemote, err => { CLOUD.state = 'error'; CLOUD.error = err.message; updateSyncUI(); });
      } else CLOUD.state = 'signedout';
      updateSyncUI();
    });
  }
  function onRemote(remote) {
    const merged = remote ? mergeState(S, remote) : mergeState(S, null);
    if (stable(merged) !== stable(S)) { S = merged; flushLocal(); softRender(); }
    CLOUD.state = 'on'; CLOUD.lastSync = now(); updateSyncUI();
    if (!remote || stable(merged) !== stable(mergeState(remote, null))) schedulePush(0);
  }
  function schedulePush(delay = 2500) {
    if (!CLOUD.user || !CLOUD.api) return;
    clearTimeout(CLOUD.pushTimer);
    CLOUD.pushTimer = setTimeout(doPush, delay);
  }
  async function doPush() {
    if (!CLOUD.user) return;
    CLOUD.state = 'busy'; updateSyncUI();
    try {
      flushLocal();
      const merged = await CLOUD.api.write(CLOUD.user.uid, remote => mergeState(S, remote));
      if (stable(merged) !== stable(S)) { S = merged; flushLocal(); softRender(); }
      CLOUD.state = 'on'; CLOUD.lastSync = now();
    } catch (e) {
      CLOUD.state = 'error'; CLOUD.error = e.message;
    }
    updateSyncUI();
  }
  function updateSyncUI() {
    const dot = document.getElementById('sync-dot');
    if (dot) {
      dot.className = 'sync-dot' + ({ on: ' on', busy: ' busy', loading: ' busy', error: ' err' }[CLOUD.state] || '');
      dot.parentElement.title = {
        on: 'Sincronizado com ' + (CLOUD.user && CLOUD.user.email || 'sua conta'),
        busy: 'Sincronizando…', loading: 'Carregando…', error: 'Erro de sincronização',
        signedout: 'Entre com Google para sincronizar', unconfigured: 'Sincronização não configurada'
      }[CLOUD.state] || 'Sincronização';
    }
    if (currentRoute().name === 'progresso') {
      const box = document.getElementById('sync-box');
      if (box) box.innerHTML = syncBoxHtml();
    }
  }
  window.addEventListener('focus', () => { if (CLOUD.user) schedulePush(300); });

  /* =========================================================
   * Idioma (tradução automática via Google Translate)
   * ======================================================= */
  const LANG = (() => { try { return localStorage.getItem('deroadmap:lang') || 'pt'; } catch (e) { return 'pt'; } })();
  function clearTransCookies() {
    const exp = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    const h = location.hostname;
    document.cookie = 'googtrans' + exp;
    document.cookie = 'googtrans' + exp + '; domain=' + h;
    document.cookie = 'googtrans' + exp + '; domain=.' + h;
  }
  function setLang(l) {
    try { localStorage.setItem('deroadmap:lang', l); } catch (e) { /* ignore */ }
    clearTransCookies();
    if (l === 'en') document.cookie = 'googtrans=/pt/en; path=/';
    flushLocal();
    location.reload();
  }
  if (LANG === 'en') {
    // Nomes de nível que a tradução automática erra ("Pleno" → "Full")
    Object.assign(LEVELS.base, { label: 'Foundations' });
    Object.assign(LEVELS.junior, { label: 'Junior' });
    Object.assign(LEVELS.pleno, { label: 'Mid-level' });
    Object.assign(LEVELS.senior, { label: 'Senior' });
    Object.assign(LEVELS.staff, { label: 'Expert / Staff' });
    Object.assign(LEVELS.carreira, { label: 'International career' });
    document.cookie = 'googtrans=/pt/en; path=/';
    document.documentElement.lang = 'en';
    window.gtInit = () => {
      try { new window.google.translate.TranslateElement({ pageLanguage: 'pt', includedLanguages: 'en', autoDisplay: false }, 'gt-el'); } catch (e) { /* ignore */ }
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=gtInit';
    s.async = true;
    document.head.appendChild(s);
  } else clearTransCookies();

  /* =========================================================
   * Progresso
   * ======================================================= */
  const countOn = (obj, n) => { let c = 0; for (let i = 0; i < n; i++) if (obj && obj[i]) c++; return c; };
  function topicStats(t) {
    const st = S.t[t.id] || { l: {}, p: {} };
    const l = countOn(st.l, t.learn.length);
    const p = countOn(st.p, t.practice.length);
    let q2 = 0, q1 = 0, q0 = 0, qa = 0;
    t.questions.forEach((_, i) => {
      const r = S.q[qKey(t.id, i)];
      if (!r) return;
      if (r.r === 2) q2++; else if (r.r === 1) q1++; else if (r.r === 0) q0++;
      if (r.a && r.a.trim()) qa++;
    });
    const total = t.learn.length + t.practice.length + t.questions.length;
    const done = l + p + q2 + q1 * 0.5;
    const pct = total ? done / total : 0;
    return { l, p, q2, q1, q0, qa, total, done, pct, status: pct >= 0.999 ? 2 : (done > 0 ? 1 : 0) };
  }
  function groupStats(topics) {
    let total = 0, done = 0, hours = 0, hoursLeft = 0, tDone = 0, q2 = 0, qTotal = 0;
    topics.forEach(t => {
      const s = topicStats(t);
      total += s.total; done += s.done;
      hours += t.hours || 0; hoursLeft += (t.hours || 0) * (1 - s.pct);
      if (s.status === 2) tDone++;
      q2 += s.q2; qTotal += t.questions.length;
    });
    return { total, done, pct: total ? done / total : 0, hours, hoursLeft, tDone, tCount: topics.length, q2, qTotal };
  }
  const phaseStats = p => groupStats(p.topics);
  const pctTxt = x => Math.round(x * 100) + '%';

  /* =========================================================
   * Helpers de HTML
   * ======================================================= */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = s => esc(s)
    .replace(/`([^`]+)`/g, '<code translate="no">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  const $ = sel => document.querySelector(sel);
  const main = $('#main');
  const sidebar = $('#sidebar');
  const pad2 = n => String(n).padStart(2, '0');

  function ring(pct, size = 56, stroke = 5) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="bg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="fg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-linecap="round"
        style="--c:${c}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" style="font-size:${size < 60 ? 11 : 15}px">${Math.round(pct * 100)}%</text>
    </svg>`;
  }
  const bar = (pct, thin) => `<div class="bar${thin ? ' thin' : ''}"><i style="width:${(pct * 100).toFixed(1)}%"></i></div>`;
  const levelBadge = lv => `<span class="badge" translate="no" style="--c:${LEVELS[lv].color}">${esc(LEVELS[lv].label)}</span>`;
  const fmtHours = h => h >= 1 ? Math.round(h) + 'h' : '<1h';
  const fmtDate = ts => new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  const fmtDateTime = ts => new Date(ts).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  function resKind(url) {
    if (/youtube\.com|youtu\.be/.test(url)) return 'vídeo';
    if (/oreilly\.com|amazon\.|manning\.com|dataintensive\.net|databass\.dev|pragprog|terraformupandrunning|dynamodbbook|erinmeyer/.test(url)) return 'livro';
    if (/github\.com/.test(url)) return 'repo';
    if (/coursera|udemy|edx|skillbuilder|academy|learn\.|cloudskillsboost|exercism|training/.test(url)) return 'curso';
    if (/docs?\.|documentation|\/docs/.test(url)) return 'docs';
    return 'link';
  }
  const crumbs = parts => `<nav class="crumbs">${parts.map((p, i) => (i ? '<span class="sep">/</span>' : '') + (p[1] ? `<a href="${p[1]}">${esc(p[0])}</a>` : `<span>${esc(p[0])}</span>`)).join('')}</nav>`;
  const sectionTitle = (idx, title, hint) => `<div class="section-title"><h2>${idx ? `<span class="idx">${idx}</span>` : ''}${esc(title)}</h2>${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* =========================================================
   * Sidebar
   * ======================================================= */
  function renderSidebar(route) {
    const active = r => route.name === r ? ' active' : '';
    const curPhase = route.name === 'fase' ? route.id : (route.name === 'topico' && TOPIC[route.id] ? TOPIC[route.id].phase.id : null);
    let html = `
      <div class="nav-group">
        <a class="nav-link${active('home')}" href="#/"><span class="num">${icon('home')}</span><span class="t">Painel</span></a>
        <a class="nav-link${active('revisao')}" href="#/revisao"><span class="num">${icon('repeat')}</span><span class="t">Revisão ativa</span></a>
        <a class="nav-link${active('progresso')}" href="#/progresso"><span class="num">${icon('cloud')}</span><span class="t">Progresso & sincronização</span></a>
      </div>`;
    LEVEL_ORDER.forEach(lv => {
      const ps = PHASES.filter(p => p.level === lv);
      if (!ps.length) return;
      html += `<div class="nav-group"><div class="nav-label" translate="no" style="--c:${LEVELS[lv].color}">${esc(LEVELS[lv].label)}</div>`;
      ps.forEach(p => {
        const s = phaseStats(p);
        const isCur = p.id === curPhase;
        html += `<a class="nav-link${route.name === 'fase' && isCur ? ' active' : ''}${s.pct >= 0.999 ? ' done' : ''}" href="#/fase/${p.id}">
          <span class="num">${pad2(p.num)}</span><span class="t">${esc(p.title)}</span><span class="pct">${pctTxt(s.pct)}</span></a>`;
        if (isCur) {
          html += '<div class="nav-sub">' + p.topics.map(t => {
            const ts = topicStats(t);
            return `<a class="${route.name === 'topico' && route.id === t.id ? 'active' : ''}" href="#/topico/${t.id}"><span class="dot s${ts.status}"></span>${esc(t.title)}</a>`;
          }).join('') + '</div>';
        }
      });
      html += '</div>';
    });
    sidebar.innerHTML = html;
  }

  /* =========================================================
   * Views
   * ======================================================= */
  function nextTopic() {
    return TOPICS.find(t => !t.ongoing && t.phase.level !== 'carreira' && topicStats(t).status < 2) || TOPICS.find(t => topicStats(t).status < 2);
  }
  function lastVisited() {
    const last = S.h[0];
    return last && TOPIC[last.id] ? TOPIC[last.id] : null;
  }
  function streak() {
    let n = 0;
    const d = new Date();
    if (!S.log[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.log[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function heatmap(weeks = 26) {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - (weeks * 7 - 1) - start.getDay());
    let cells = '';
    const d = new Date(start);
    while (d <= end) {
      const v = S.log[dayKey(d)] || 0;
      const lv = v === 0 ? '' : v < 3 ? 'l1' : v < 8 ? 'l2' : v < 16 ? 'l3' : 'l4';
      cells += `<i class="${lv}" title="${d.toLocaleDateString('pt-BR')}: ${v} ações"></i>`;
      d.setDate(d.getDate() + 1);
    }
    return `<div class="heat">${cells}</div>`;
  }

  function viewHome() {
    const g = groupStats(TOPICS);
    const nxt = nextTopic();
    const last = lastVisited();
    const weekly = Math.max(1, Number(S.weekly) || 12);
    const weeksLeft = g.hoursLeft / weekly;
    const eta = new Date(now() + weeksLeft * 7 * 864e5);
    const answered = Object.values(S.q).filter(x => x && x.a && x.a.trim()).length;
    let i = 0;

    const ladder = LEVEL_ORDER.map(lv => {
      const s = groupStats(TOPICS.filter(t => t.phase.level === lv));
      return `<div class="card rung rise" style="--c:${LEVELS[lv].color};--i:${i++}">
        <h4 translate="no">${esc(LEVELS[lv].label)}</h4>
        <div class="faint">${esc(LEVELS[lv].desc)}</div>
        <div style="margin-top:12px">${bar(s.pct, true)}</div>
        <div class="faint mono" style="margin-top:6px">${pctTxt(s.pct)} · ${s.tDone}/${s.tCount}</div>
      </div>`;
    }).join('');

    const phaseCards = PHASES.map((p, j) => {
      const s = phaseStats(p);
      return `<a class="card phase-card rise" style="--i:${j}" href="#/fase/${p.id}">
        <div class="top"><span class="n">FASE_${pad2(p.num)}</span>${levelBadge(p.level)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        ${bar(s.pct, true)}
        <div class="meta"><span>${s.tDone}/${s.tCount} tópicos · ${s.q2}/${s.qTotal} perguntas</span><span>~${fmtHours(s.hours)}</span></div>
      </a>`;
    }).join('');

    main.innerHTML = `<div class="container view">
      <section class="card hero">
        <div class="term" translate="no"><span class="p">~/roadmap</span><span>$</span><span class="s">train --from zero --to staff --target "US$10K/mo" --visa relocation</span><span class="caret"></span></div>
        <h1>Engenharia de Dados,<br><em>do zero ao Especialista.</em></h1>
        <p>${PHASES.length} fases, ${TOPICS.length} tópicos e ${g.qTotal} perguntas de validação, cada uma com resposta de referência. Estude, pratique, responda por escrito e só depois confira a resposta.</p>
        <div class="goal-row">
          <span class="chip">${icon('target')}Senior/Staff Data Engineer</span>
          <span class="chip">${icon('dollar')}US$ 10K+/mês</span>
          <span class="chip">${icon('send')}Relocation visa</span>
          <span class="chip">${icon('clock')}~${Math.round(g.hours)}h estimadas</span>
        </div>
      </section>

      <section class="section grid g4 stats">
        <div class="card stat rise" style="--i:0"><div class="k">Progresso geral</div><div class="v">${pctTxt(g.pct)}</div>${bar(g.pct)}</div>
        <div class="card stat rise" style="--i:1"><div class="k">Tópicos concluídos</div><div class="v">${g.tDone}<small> / ${g.tCount}</small></div>${bar(g.tDone / g.tCount)}</div>
        <div class="card stat rise" style="--i:2"><div class="k">Perguntas dominadas</div><div class="v">${g.q2}<small> / ${g.qTotal}</small></div>${bar(g.q2 / g.qTotal)}</div>
        <div class="card stat rise" style="--i:3"><div class="k">Sequência</div><div class="v">${streak()}<small> dias</small></div><div class="faint small mono">${answered} respostas escritas</div></div>
      </section>

      <section class="section grid g2">
        <div class="card next-card rise" style="--i:0">
          ${nxt ? ring(topicStats(nxt).pct) : ring(1)}
          <div class="body">
            <div class="eyebrow">próximo passo</div>
            ${nxt ? `<h3>${esc(nxt.title)}</h3><div class="faint small mono">fase ${pad2(nxt.phase.num)} · ${esc(nxt.phase.title)}</div>
            <a class="btn primary sm" style="margin-top:12px" href="#/topico/${nxt.id}">Estudar agora →</a>` : '<h3>Trilha concluída</h3>'}
          </div>
        </div>
        <div class="card next-card rise" style="--i:1">
          ${last ? ring(topicStats(last).pct) : ring(0)}
          <div class="body">
            <div class="eyebrow">continuar de onde parou</div>
            ${last ? `<h3>${esc(last.title)}</h3><div class="faint small mono">acessado ${fmtDateTime(S.h[0].ts)}</div>
            <a class="btn sm" style="margin-top:12px" href="#/topico/${last.id}">Retomar</a>` : '<h3>Nenhum tópico acessado ainda</h3><div class="faint small">Comece pela Fase 0.</div>'}
          </div>
        </div>
      </section>

      <section class="section">
        ${sectionTitle('01', 'Escada de senioridade', 'carreira roda em paralelo')}
        <div class="ladder">${ladder}</div>
      </section>

      <section class="section">
        ${sectionTitle('02', 'Fases', 'siga em ordem')}
        <div class="grid g3">${phaseCards}</div>
      </section>

      <section class="section grid g2">
        <div class="card">
          ${sectionTitle('', 'Atividade', 'últimas 26 semanas')}
          ${heatmap()}
          <div class="faint small" style="margin-top:10px">Cada item marcado, pergunta avaliada ou resposta escrita conta como uma ação.</div>
        </div>
        <div class="card">
          ${sectionTitle('', 'Projeção')}
          <div class="muted">Estudando <input class="inline-input" type="number" min="1" max="80" value="${weekly}" data-act="weekly" aria-label="Horas por semana"> h/semana,
          faltam <b>~${Math.round(g.hoursLeft)}h</b> (${Math.ceil(weeksLeft)} semanas). Conclusão prevista: <b>${fmtDate(eta)}</b>.</div>
          <div class="faint small" style="margin-top:10px">Estimativas para aprender de verdade, incluindo prática. Trabalho e faculdade aceleram muita coisa.</div>
        </div>
      </section>

      <section class="section">
        ${sectionTitle('03', 'Como usar esta trilha')}
        <ol class="method">
          <li class="card rise" style="--i:0"><b>Estude</b>Siga o "Como estudar" de cada tópico e marque cada item só quando conseguir explicá-lo.</li>
          <li class="card rise" style="--i:1"><b>Pratique</b>Sem código rodando no GitHub, não conta.</li>
          <li class="card rise" style="--i:2"><b>Responda por escrito</b>Escreva a resposta antes de abrir a de referência. Escrever expõe o que você não sabe.</li>
          <li class="card rise" style="--i:3"><b>Confira e avalie</b>Compare com a resposta de referência e avalie com honestidade: "Domino" só se você responderia numa entrevista.</li>
          <li class="card rise" style="--i:4"><b>Revise toda semana</b>A Revisão ativa traz de volta o que está fraco e o que você não vê há mais tempo.</li>
          <li class="card rise" style="--i:5"><b>Construa o projeto</b>O projeto de cada fase é a prova pública de que você sabe.</li>
        </ol>
      </section>
    </div>`;
  }

  function viewPhase(id) {
    const p = PHASE[id];
    if (!p) return viewNotFound();
    const s = phaseStats(p);
    const pj = S.pj[p.id] || {};
    const idx = PHASES.indexOf(p);
    const prev = PHASES[idx - 1], next = PHASES[idx + 1];

    const topics = p.topics.map((t, i) => {
      const ts = topicStats(t);
      return `<a class="card topic-card s${ts.status} rise" style="--i:${i}" href="#/topico/${t.id}">
        <div class="idx">${ts.status === 2 ? icon('check') : p.num + '.' + (i + 1)}</div>
        <div class="body">
          <h3>${esc(t.title)}</h3>
          <p>${fmt(t.summary)}</p>
          <div class="meta"><span>~${fmtHours(t.hours)}</span><span>${t.learn.length} conceitos</span><span>${t.practice.length} práticas</span><span>${ts.q2}/${t.questions.length} dominadas</span></div>
          ${bar(ts.pct, true)}
        </div>
      </a>`;
    }).join('');

    const project = p.project ? `<section class="section">
      <div class="card project">
        <div class="eyebrow">projeto da fase · portfólio</div>
        <h3>${esc(p.project.title)}</h3>
        <p class="muted" style="margin-top:0">${fmt(p.project.description)}</p>
        <ul class="checklist">${p.project.deliverables.map((d, i) => `<li><label><input type="checkbox" data-act="pj" data-p="${p.id}" data-i="${i}" ${pj[i] ? 'checked' : ''}><span>${fmt(d)}</span></label></li>`).join('')}</ul>
      </div></section>` : '';

    main.innerHTML = `<div class="container view">
      ${crumbs([['roadmap', '#/'], ['fase-' + pad2(p.num)]])}
      <div class="page-head">
        <div>
          <div class="eyebrow">FASE_${pad2(p.num)}</div>
          <h1>${esc(p.title)}</h1>
          <p class="lead">${fmt(p.summary)}</p>
          <div class="meta-row">${levelBadge(p.level)}<span class="chip">${icon('clock')}${esc(p.duration)}</span><span class="chip">~${fmtHours(s.hours)} de estudo</span><span class="chip">${p.topics.length} tópicos · ${s.qTotal} perguntas</span></div>
        </div>
        ${ring(s.pct, 88, 6)}
      </div>
      ${p.why ? `<div class="card why"><b>Por que esta fase importa</b>${fmt(p.why)}</div>` : ''}
      ${p.outcomes ? `<section class="section">${sectionTitle('01', 'Ao final você deve conseguir')}
        <div class="card"><ul class="outcomes">${p.outcomes.map(o => `<li>${fmt(o)}</li>`).join('')}</ul></div></section>` : ''}
      <section class="section">
        ${sectionTitle('02', 'Tópicos', `${s.tDone}/${s.tCount} concluídos`)}
        <div class="grid">${topics}</div>
      </section>
      ${project}
      <nav class="pager">
        ${prev ? `<a class="card" href="#/fase/${prev.id}"><span class="faint">← fase ${pad2(prev.num)}</span>${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="card next" href="#/fase/${next.id}"><span class="faint">fase ${pad2(next.num)} →</span>${esc(next.title)}</a>` : ''}
      </nav>
    </div>`;
  }

  /* ---------- Perguntas ---------- */
  const openAnswers = new Set();
  const revealed = new Set();

  function questionHtml(t, i, q) {
    const k = qKey(t.id, i);
    const st = S.q[k] || {};
    const r = st.r;
    const open = openAnswers.has(k);
    const rev = revealed.has(k);
    const hasAns = st.a && st.a.trim();
    const ref = t.answers[i];
    return `<div class="card q ${r != null ? 'r' + r : ''}" id="q-${k.replace(':', '-')}">
      <div class="q-head"><span class="q-num">${pad2(i + 1)}</span><div class="q-text">${fmt(q)}</div></div>
      <div class="q-actions">
        ${[0, 1, 2].map(n => `<button class="rate r${n}${r === n ? ' on' : ''}" data-act="rate" data-k="${k}" data-r="${n}">${RATE_LABEL[n]}</button>`).join('')}
        <span class="sep"></span>
        <button class="link-btn${open ? ' on' : ''}" data-act="toggle-ans" data-k="${k}">${icon('pen')}Minha resposta</button>
        ${ref ? `<button class="link-btn${rev ? ' on' : ''}" data-act="reveal" data-k="${k}">${icon('eye')}${rev ? 'Ocultar resposta' : 'Ver resposta'}</button>` : ''}
        ${hasAns && !open ? '<span class="has-ans">● salva</span>' : ''}
      </div>
      <div class="collapse answer${open ? ' open' : ''}" data-box="ans"><div><div class="pad">
        <textarea class="ans" translate="no" data-act="answer" data-k="${k}" placeholder="Explique com suas palavras, como numa entrevista: conceito, exemplo, trade-offs e quando NÃO usar.">${esc(st.a || '')}</textarea>
        <div class="faint">Salvo automaticamente${CLOUD.user ? ' e sincronizado' : ''}. Escreva antes de ver a resposta de referência.</div>
      </div></div></div>
      ${ref ? `<div class="collapse answer${rev ? ' open' : ''}" data-box="ref"><div><div class="pad">
        <div class="ref"><div class="lbl">${icon('check')}Resposta de referência</div>${fmt(ref)}
          <div class="tip">Compare com a sua: você cobriu os pontos centrais e os trade-offs? Depois avalie: Não sei, Parcial ou Domino.${st.ts ? ` Última avaliação em ${fmtDate(st.ts)}.` : ''}</div>
        </div>
      </div></div></div>` : ''}
    </div>`;
  }
  const qSummary = (s, t) =>
    `<span class="legend" style="--c:var(--ok)"><b>${s.q2}</b>&nbsp;domino</span><span class="legend" style="--c:var(--warn)"><b>${s.q1}</b>&nbsp;parcial</span><span class="legend" style="--c:var(--danger)"><b>${s.q0}</b>&nbsp;não sei</span><span class="legend" style="--c:var(--text-3)"><b>${t.questions.length - s.q2 - s.q1 - s.q0}</b>&nbsp;pendentes</span>`;

  function howToHtml(t) {
    const q = encodeURIComponent(KW[t.id] || t.title);
    const links = [
      ['doc', 'Buscar documentação', 'docs oficiais', `https://www.google.com/search?q=${q}+official+documentation`],
      ['book', 'Buscar livros', 'google books', `https://www.google.com/search?tbm=bks&q=${q}`],
      ['play', 'Ver aulas', 'youtube', `https://www.youtube.com/results?search_query=${q}+explained`],
      ['cap', 'Cursos', 'class central', `https://www.classcentral.com/search?q=${q}`],
      ['news', 'Artigos técnicos', 'blogs de engenharia', `https://www.google.com/search?q=${q}+engineering+blog`],
      ['code', 'Código e projetos', 'github', `https://github.com/search?q=${q}&type=repositories&s=stars&o=desc`],
      ['help', 'Perguntas de entrevista', 'google', `https://www.google.com/search?q=${q}+interview+questions`],
      ['globe', 'Discussões', 'reddit', `https://www.google.com/search?q=${q}+site%3Areddit.com`]
    ];
    return `<div class="howto">
      <div class="card">
        <ol class="steps">
          <li><span><b>Mapa geral.</b> Leia o "Por que importa" e a introdução da documentação oficial para saber o que existe.</span></li>
          <li><span><b>Intuição.</b> Assista 1 ou 2 aulas curtas para entender o conceito visualmente.</span></li>
          <li><span><b>Profundidade.</b> Leia o capítulo do livro indicado em Fontes e anote no seu learning-log.</span></li>
          <li><span><b>Prática.</b> Faça o "Mão na massa" sem tutorial, consultando só a documentação.</span></li>
          <li><span><b>Validação.</b> Responda as perguntas por escrito antes de ver a resposta de referência.</span></li>
          <li><span><b>Ensinar.</b> Explique em voz alta ou escreva um resumo em inglês (técnica Feynman).</span></li>
        </ol>
      </div>
      <div class="search-links">${links.map(([ic, label, sub, url]) =>
        `<a href="${url}" target="_blank" rel="noopener">${icon(ic)}<span>${label}<small>${sub}</small></span></a>`).join('')}</div>
    </div>`;
  }

  function viewTopic(id) {
    const t = TOPIC[id];
    if (!t) return viewNotFound();
    const p = t.phase;
    const st = topicState(t.id);
    const s = topicStats(t);
    const prev = TOPICS[t.order - 1], next = TOPICS[t.order + 1];
    const pos = p.topics.indexOf(t) + 1;

    S.v[t.id] = now();
    if (!S.h.length || S.h[0].id !== t.id) {
      S.h.unshift({ id: t.id, ts: now() });
      S.h = S.h.slice(0, 300);
    } else S.h[0].ts = now();
    save();

    const list = (items, kind) => `<ul class="checklist">${items.map((x, i) =>
      `<li><label><input type="checkbox" data-act="check" data-t="${t.id}" data-kind="${kind}" data-i="${i}" ${st[kind][i] ? 'checked' : ''}><span>${fmt(x)}</span></label></li>`).join('')}</ul>`;
    let n = 0;
    const idx = () => pad2(++n);

    main.innerHTML = `<div class="container view">
      ${crumbs([['roadmap', '#/'], ['fase-' + pad2(p.num), '#/fase/' + p.id], [t.id]])}
      <div class="page-head">
        <div>
          <div class="eyebrow">TÓPICO_${p.num}.${pos} <span class="faint">· ${esc(p.title)}</span></div>
          <h1>${esc(t.title)}</h1>
          <p class="lead">${fmt(t.summary)}</p>
          <div class="meta-row">${levelBadge(p.level)}<span class="chip">${icon('clock')}~${fmtHours(t.hours)}</span>${t.ongoing ? `<span class="chip">${icon('repeat')}contínuo</span>` : ''}
            <span class="chip">${s.l}/${t.learn.length} conceitos</span><span class="chip">${s.p}/${t.practice.length} práticas</span></div>
        </div>
        <div id="topic-ring">${ring(s.pct, 88, 6)}</div>
      </div>
      ${t.why ? `<div class="card why"><b>Por que importa</b>${fmt(t.why)}</div>` : ''}

      <section class="section">
        ${sectionTitle(idx(), 'O que estudar', 'marque quando conseguir explicar')}
        <div class="card">${list(t.learn, 'l')}</div>
      </section>

      ${t.practice.length ? `<section class="section">
        ${sectionTitle(idx(), 'Mão na massa', 'código no GitHub ou não conta')}
        <div class="card">${list(t.practice, 'p')}</div>
      </section>` : ''}

      <section class="section">
        ${sectionTitle(idx(), 'Como estudar', 'roteiro + buscas prontas')}
        ${howToHtml(t)}
      </section>

      ${t.resources.length ? `<section class="section">
        ${sectionTitle(idx(), 'Fontes', 'docs oficiais e livros primeiro')}
        <ul class="res-list">${t.resources.map(([name, url]) => `<li><a class="card" href="${esc(url)}" target="_blank" rel="noopener"><span class="k">${resKind(url)}</span><span>${esc(name)}</span><span class="ext">${icon('ext')}</span></a></li>`).join('')}</ul>
      </section>` : ''}

      <section class="section">
        ${sectionTitle(idx(), 'Perguntas de validação', `<span class="q-summary" id="q-summary">${qSummary(s, t)}</span>`)}
        <div>${t.questions.map((q, i) => questionHtml(t, i, q)).join('')}</div>
      </section>

      <nav class="pager">
        ${prev ? `<a class="card" href="#/topico/${prev.id}"><span class="faint">← anterior · fase ${pad2(prev.phase.num)}</span>${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="card next" href="#/topico/${next.id}"><span class="faint">próximo · fase ${pad2(next.phase.num)} →</span>${esc(next.title)}</a>` : ''}
      </nav>
    </div>`;
  }

  /* ---------- Revisão ativa ---------- */
  const quiz = { scope: 'started', cur: null, recent: [], count: 0, tally: [0, 0, 0], revealed: false };

  function quizPool(scope) {
    const pool = [];
    TOPICS.forEach(t => {
      if (scope.startsWith('fase:') && t.phase.id !== scope.slice(5)) return;
      if (scope === 'started' && topicStats(t).status === 0) return;
      t.questions.forEach((q, i) => {
        const st = S.q[qKey(t.id, i)];
        if (scope === 'weak' && !(st && (st.r === 0 || st.r === 1))) return;
        pool.push({ t, i, q, st });
      });
    });
    return pool;
  }
  function pickQuestion() {
    let pool = quizPool(quiz.scope);
    const filtered = pool.filter(x => !quiz.recent.includes(qKey(x.t.id, x.i)));
    if (filtered.length) pool = filtered;
    if (!pool.length) return null;
    const weights = pool.map(x => {
      const st = x.st;
      if (!st || st.r == null) return 3;
      const days = st.ts ? (now() - st.ts) / 864e5 : 30;
      if (st.r === 0) return 5 + days / 3;
      if (st.r === 1) return 2.5 + days / 5;
      return 0.4 + days / 14;
    });
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  function viewQuiz(full = true) {
    if (!quiz.cur) { quiz.cur = pickQuestion(); quiz.revealed = false; }
    const c = quiz.cur;
    const opts = [
      ['started', 'Tópicos que já comecei'],
      ['all', 'Todas as perguntas'],
      ['weak', 'Só pontos fracos (não sei / parcial)'],
      ...PHASES.map(p => ['fase:' + p.id, `Fase ${p.num} · ${p.title}`])
    ].map(([v, l]) => `<option value="${v}"${quiz.scope === v ? ' selected' : ''}>${esc(l)}</option>`).join('');

    let body;
    if (!c) {
      body = `<div class="card quiz-card"><h3>Nenhuma pergunta neste filtro</h3>
        <p class="muted">${quiz.scope === 'started' ? 'Você ainda não começou nenhum tópico. Marque algum item de estudo ou escolha "Todas as perguntas".' : quiz.scope === 'weak' ? 'Nenhum ponto fraco registrado. Bom sinal, ou faltam perguntas para avaliar.' : 'Escolha outro filtro.'}</p></div>`;
    } else {
      const k = qKey(c.t.id, c.i);
      const st = S.q[k] || {};
      const ref = c.t.answers[c.i];
      body = `<div class="card quiz-card flip">
        <div class="eyebrow">FASE_${pad2(c.t.phase.num)} <span class="faint">· ${esc(c.t.title)}</span></div>
        <div class="qtext">${fmt(c.q)}</div>
        <textarea class="ans" translate="no" data-act="answer" data-k="${k}" placeholder="Responda por escrito ou em voz alta ANTES de revelar. Idealmente em inglês.">${esc(st.a || '')}</textarea>
        <div class="faint small mono" style="margin-top:8px">${st.r != null ? `última avaliação: ${RATE_LABEL[st.r]} · ${fmtDate(st.ts)}` : 'ainda não avaliada'} · <a href="#/topico/${c.t.id}">abrir tópico</a></div>
        ${quiz.revealed ? `
          <div class="ref"><div class="lbl">${icon('check')}Resposta de referência</div>${ref ? fmt(ref) : 'Sem resposta de referência.'}</div>
          <div class="quiz-rates">${[0, 1, 2].map(n => `<button class="rate r${n}" data-act="quiz-rate" data-r="${n}">${RATE_LABEL[n]} <span class="kbd">${n + 1}</span></button>`).join('')}</div>
        ` : `<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn primary" data-act="quiz-reveal">${icon('eye')}Revelar resposta <span class="kbd" style="color:inherit;border-color:currentColor">R</span></button>
          </div>`}
        <div style="text-align:center;margin-top:14px"><button class="link-btn" data-act="quiz-skip">Pular →</button></div>
      </div>`;
    }
    main.innerHTML = `<div class="container quiz${full ? ' view' : ''}">
      ${crumbs([['roadmap', '#/'], ['revisao']])}
      <h1 style="font-size:32px;margin-bottom:8px">Revisão ativa</h1>
      <p class="muted" style="margin-top:0">Tente lembrar antes de ver a resposta: é isso que fixa o conteúdo. As perguntas marcadas como fracas, e as que você não vê há mais tempo, aparecem com mais frequência.</p>
      <div class="quiz-bar">
        <select data-act="quiz-scope" aria-label="Filtro">${opts}</select>
        <span class="chip">sessão ${quiz.count} · <span class="legend" style="--c:var(--ok)">${quiz.tally[2]}</span> <span class="legend" style="--c:var(--warn)">${quiz.tally[1]}</span> <span class="legend" style="--c:var(--danger)">${quiz.tally[0]}</span></span>
      </div>
      ${body}
    </div>`;
  }
  function quizRate(r) {
    const c = quiz.cur;
    if (!c) return;
    const k = qKey(c.t.id, c.i);
    setQ(k, { r, ts: now() });
    bump(); save();
    quiz.count++; quiz.tally[r]++;
    quiz.recent.unshift(k); quiz.recent = quiz.recent.slice(0, 8);
    quiz.cur = pickQuestion(); quiz.revealed = false;
    viewQuiz(false);
    renderSidebar(currentRoute());
  }

  /* ---------- Progresso & sincronização ---------- */
  function syncBoxHtml() {
    const cfgSteps = `<ol class="setup">
        <li>Acesse <a href="https://console.firebase.google.com/" target="_blank" rel="noopener">console.firebase.google.com</a> e crie um projeto (pode desativar o Analytics).</li>
        <li><b>Build → Authentication → Get started</b> → em Sign-in method, ative <b>Google</b>.</li>
        <li>Em <b>Authentication → Settings → Authorized domains</b>, adicione <code>${esc(location.hostname)}</code>.</li>
        <li><b>Build → Firestore Database → Create database</b> (modo produção). Na aba <b>Rules</b>, cole as regras abaixo e publique.</li>
        <li><b>Project settings → Your apps → Web (&lt;/&gt;)</b>, registre o app e copie o objeto <code>firebaseConfig</code> para <code>data/firebase-config.js</code>.</li>
      </ol>
      <pre class="code" translate="no">rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null &amp;&amp; request.auth.uid == uid;
    }
  }
}</pre>`;
    switch (CLOUD.state) {
      case 'unconfigured':
        return `<div class="eyebrow">sincronização · não configurada</div>
          <h3 style="margin:8px 0 6px">Ative o login com Google (uma vez, ~5 min)</h3>
          <p class="muted" style="margin-top:0">O progresso fica salvo neste navegador. Para usar o mesmo progresso no celular e no computador, conecte um projeto Firebase gratuito:</p>${cfgSteps}`;
      case 'loading':
        return '<div class="eyebrow">sincronização</div><p class="muted">Carregando…</p>';
      case 'error':
        return `<div class="eyebrow" style="color:var(--danger)">sincronização · erro</div>
          <p class="muted">${esc(CLOUD.error)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${CLOUD.user ? `<button class="btn sm" data-act="sync-now">Tentar de novo</button><button class="btn sm" data-act="logout">${icon('logout')}Sair</button>` : `<button class="btn primary" data-act="login">Entrar com Google</button>`}</div>`;
      case 'signedout':
        return `<div class="eyebrow">sincronização</div>
          <h3 style="margin:8px 0 6px">Use o mesmo progresso no celular e no computador</h3>
          <p class="muted" style="margin-top:0">Entre com a mesma conta Google nos dois aparelhos. Checklists, avaliações, respostas escritas, histórico e sequência ficam sincronizados automaticamente, sem perder o que já está neste navegador.</p>
          <button class="btn primary" data-act="login">${googleG()}Entrar com Google</button>`;
      default: {
        const u = CLOUD.user || {};
        return `<div class="eyebrow">sincronização · ${CLOUD.state === 'busy' ? 'sincronizando…' : 'ativa'}</div>
          <div class="account" style="margin-top:10px">
            ${u.photo ? `<img class="avatar" src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">` : `<span class="avatar"></span>`}
            <div style="flex:1;min-width:0"><b>${esc(u.name || 'Conectado')}</b><div class="faint small mono">${esc(u.email || '')}</div>
              <div class="faint small">${CLOUD.lastSync ? 'Última sincronização: ' + fmtDateTime(CLOUD.lastSync) : ''}</div></div>
            <button class="btn sm" data-act="sync-now">${icon('repeat')}Sincronizar agora</button>
            <button class="btn sm" data-act="logout">${icon('logout')}Sair</button>
          </div>`;
      }
    }
  }
  const googleG = () => '<svg class="i" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" opacity=".9"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" opacity=".75"/><path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" opacity=".6"/><path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9z" opacity=".45"/></svg>';

  function viewData() {
    const rows = PHASES.map(p => {
      const s = phaseStats(p);
      return `<tr><td><a href="#/fase/${p.id}">${p.num}. ${esc(p.title)}</a></td><td>${levelBadge(p.level)}</td>
        <td class="num">${s.tDone}/${s.tCount}</td><td class="num">${s.q2}/${s.qTotal}</td><td class="num">${Math.round(s.hours - s.hoursLeft)}/${Math.round(s.hours)}h</td><td class="num">${pctTxt(s.pct)}</td></tr>`;
    }).join('');
    const hist = S.h.slice(0, 60).filter(x => TOPIC[x.id]).map(x =>
      `<tr><td class="faint small mono">${fmtDateTime(x.ts)}</td><td><a href="#/topico/${x.id}">${esc(TOPIC[x.id].title)}</a></td><td class="faint small mono">fase ${pad2(TOPIC[x.id].phase.num)}</td></tr>`).join('');
    const weak = [];
    TOPICS.forEach(t => t.questions.forEach((q, i) => { const st = S.q[qKey(t.id, i)]; if (st && st.r === 0) weak.push({ t, q, i }); }));

    main.innerHTML = `<div class="container view">
      ${crumbs([['roadmap', '#/'], ['progresso']])}
      <h1 style="font-size:32px;margin-bottom:18px">Progresso & sincronização</h1>

      <div class="card" id="sync-box">${syncBoxHtml()}</div>

      <section class="section">
        ${sectionTitle('01', 'Onde seu progresso fica salvo')}
        <div class="card muted" style="font-size:14.5px">
          Tudo o que você faz (itens marcados, avaliações das perguntas, respostas escritas, histórico de acessos e dias estudados) é salvo no
          <b>armazenamento local deste navegador</b> (localStorage), no instante em que acontece. Com o <b>login com Google</b> ativo, uma cópia vai
          para a sua conta (Firebase), só acessível por você, e é mesclada automaticamente com os outros aparelhos: em cada item vale a alteração mais recente.
          Sem login, limpar os dados do navegador apaga o progresso. Nesse caso, exporte um backup de vez em quando.
        </div>
      </section>

      <section class="section">
        ${sectionTitle('02', 'Backup manual')}
        <div class="card" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <button class="btn" data-act="export">${icon('download')}Exportar (.json)</button>
          <label class="btn">${icon('upload')}Importar backup<input type="file" accept="application/json,.json" data-act="import" hidden></label>
          <button class="btn danger" data-act="reset" style="margin-left:auto">Zerar progresso</button>
        </div>
        <div class="faint small mono" style="margin-top:8px">início ${fmtDate(S.started)} · ${Object.keys(S.log).length} dias com estudo · ${Object.values(S.log).reduce((a, b) => a + b, 0)} ações</div>
      </section>

      <section class="section">${sectionTitle('03', 'Progresso por fase')}
        <div class="card table-wrap"><table class="table"><thead><tr><th>Fase</th><th>Nível</th><th>Tópicos</th><th>Perguntas</th><th>Horas</th><th>%</th></tr></thead><tbody>${rows}</tbody></table></div>
      </section>

      <section class="section">${sectionTitle('04', 'Pontos fracos', 'perguntas marcadas como "Não sei"')}
        ${weak.length ? `<div class="card">${weak.slice(0, 40).map(w => `<div style="padding:10px 0;border-bottom:1px solid var(--line)"><a href="#/topico/${w.t.id}" class="faint small mono">${esc(w.t.title)}</a><div>${fmt(w.q)}</div></div>`).join('')}</div>` : '<div class="card muted">Nenhuma ainda.</div>'}
      </section>

      <section class="section">${sectionTitle('05', 'Últimos acessos')}
        ${hist ? `<div class="card table-wrap"><table class="table"><tbody>${hist}</tbody></table></div>` : '<div class="card muted">Nenhum acesso registrado.</div>'}
      </section>
    </div>`;
  }

  /* ---------- Busca ---------- */
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function viewSearch(q) {
    const nq = norm(q.trim());
    const hl = s => {
      const out = esc(s);
      if (!q.trim()) return out;
      const re = new RegExp('(' + esc(q.trim()).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return out.replace(re, '<mark>$1</mark>');
    };
    const hits = [];
    if (nq.length >= 2) {
      TOPICS.forEach(t => {
        const fields = [['Tópico', t.title], ['Resumo', t.summary], ...t.learn.map(x => ['Conceito', x]), ...t.practice.map(x => ['Prática', x]), ...t.questions.map(x => ['Pergunta', x])];
        const m = fields.filter(([, v]) => norm(v).includes(nq));
        if (m.length) hits.push({ t, m, score: (norm(t.title).includes(nq) ? 100 : 0) + m.length });
      });
      hits.sort((a, b) => b.score - a.score);
    }
    main.innerHTML = `<div class="container view">
      ${crumbs([['roadmap', '#/'], ['busca']])}
      <h1 style="font-size:28px;margin-bottom:18px">Resultados para “${esc(q)}”</h1>
      ${nq.length < 2 ? '<div class="card muted">Digite pelo menos 2 caracteres.</div>' : hits.length ? hits.slice(0, 50).map((h, i) => `
        <a class="card hit rise" style="--i:${Math.min(i, 10)}" href="#/topico/${h.t.id}">
          <div class="faint">fase ${pad2(h.t.phase.num)} · ${esc(h.t.phase.title)}</div>
          <b>${hl(h.t.title)}</b>
          ${h.m.filter(([k]) => k !== 'Tópico').slice(0, 3).map(([k, v]) => `<div class="small muted" style="margin-top:4px"><span class="faint">${k}:</span> ${hl(v)}</div>`).join('')}
        </a>`).join('') : '<div class="card muted">Nada encontrado.</div>'}
    </div>`;
  }

  function viewNotFound() {
    main.innerHTML = '<div class="container view"><div class="card"><h2>Página não encontrada</h2><p class="muted"><a href="#/">Voltar ao painel</a></p></div></div>';
  }

  /* =========================================================
   * Router
   * ======================================================= */
  function currentRoute() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    if (!parts.length) return { name: 'home' };
    const [a, ...rest] = parts;
    if (a === 'fase') return { name: 'fase', id: rest[0] };
    if (a === 'topico') return { name: 'topico', id: rest[0] };
    if (a === 'revisao') return { name: 'revisao' };
    if (a === 'progresso') return { name: 'progresso' };
    if (a === 'busca') return { name: 'busca', q: decodeURIComponent(rest.join('/')) };
    return { name: '404' };
  }
  function render(keepScroll) {
    const r = currentRoute();
    const y = window.scrollY;
    switch (r.name) {
      case 'home': viewHome(); break;
      case 'fase': viewPhase(r.id); break;
      case 'topico': viewTopic(r.id); break;
      case 'revisao': viewQuiz(); break;
      case 'progresso': viewData(); break;
      case 'busca': viewSearch(r.q); break;
      default: viewNotFound();
    }
    if (keepScroll) {
      const v = main.querySelector('.view');
      if (v) v.classList.remove('view');
      main.querySelectorAll('.rise').forEach(el => el.classList.remove('rise'));
      main.querySelectorAll('.bar > i, .ring .fg').forEach(el => { el.style.animation = 'none'; });
    }
    renderSidebar(r);
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.bottom-nav [data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === r.name));
    if (keepScroll) window.scrollTo(0, y);
    else if (r.name !== 'busca') window.scrollTo(0, 0);
    const titleBits = { fase: PHASE[r.id] && PHASE[r.id].title, topico: TOPIC[r.id] && TOPIC[r.id].title, revisao: 'Revisão ativa', progresso: 'Progresso & sincronização', busca: 'Busca' };
    document.title = (titleBits[r.name] ? titleBits[r.name] + ' · ' : '') + 'Data Engineering Roadmap';
  }
  // Re-render após dados remotos, sem atrapalhar quem está digitando
  function softRender() {
    const a = document.activeElement;
    if (a && a.tagName === 'TEXTAREA') { renderSidebar(currentRoute()); return; }
    render(true);
  }
  window.addEventListener('hashchange', () => render(false));

  function refreshTopicMeta(t) {
    const s = topicStats(t);
    const ringEl = $('#topic-ring');
    if (ringEl) ringEl.innerHTML = ring(s.pct, 88, 6);
    const sum = $('#q-summary');
    if (sum) sum.innerHTML = qSummary(s, t);
    renderSidebar(currentRoute());
  }
  function rerenderQuestion(k) {
    const [tid, i] = k.split(':');
    const t = TOPIC[tid];
    const box = document.getElementById('q-' + k.replace(':', '-'));
    if (t && box) box.outerHTML = questionHtml(t, Number(i), t.questions[Number(i)]);
    return t;
  }

  /* =========================================================
   * Eventos
   * ======================================================= */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act;

    if (act === 'menu') { document.body.classList.toggle('menu-open'); return; }
    if (act === 'theme') {
      const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', cur);
      try { localStorage.setItem('deroadmap:theme', cur); } catch (err) { /* ignore */ }
      return;
    }
    if (act === 'lang') { setLang(LANG === 'en' ? 'pt' : 'en'); return; }
    if (act === 'rate') {
      const k = el.dataset.k, r = Number(el.dataset.r);
      const prev = S.q[k] || {};
      setQ(k, prev.r === r ? { r: null, ts: null } : { r, ts: now() });
      bump(); save();
      const t = rerenderQuestion(k);
      if (t) refreshTopicMeta(t);
      return;
    }
    if (act === 'toggle-ans' || act === 'reveal') {
      const k = el.dataset.k;
      const set = act === 'reveal' ? revealed : openAnswers;
      const opening = !set.has(k);
      if (opening) set.add(k); else set.delete(k);
      const box = document.getElementById('q-' + k.replace(':', '-'));
      if (!box) return;
      const c = box.querySelector(`[data-box="${act === 'reveal' ? 'ref' : 'ans'}"]`);
      if (c) c.classList.toggle('open', opening);
      el.classList.toggle('on', opening);
      if (act === 'reveal') el.innerHTML = icon('eye') + (opening ? 'Ocultar resposta' : 'Ver resposta');
      if (act === 'toggle-ans' && opening) { const ta = box.querySelector('textarea'); if (ta) setTimeout(() => ta.focus({ preventScroll: true }), 120); }
      return;
    }
    if (act === 'quiz-reveal') { quiz.revealed = true; viewQuiz(false); return; }
    if (act === 'quiz-rate') { quizRate(Number(el.dataset.r)); return; }
    if (act === 'quiz-skip') { if (quiz.cur) quiz.recent.unshift(qKey(quiz.cur.t.id, quiz.cur.i)); quiz.cur = pickQuestion(); quiz.revealed = false; viewQuiz(false); return; }
    if (act === 'login') {
      if (!CLOUD.api) return;
      CLOUD.api.signIn().catch(err => { CLOUD.error = err.message; toast('Não foi possível entrar: ' + (err.code || err.message)); });
      return;
    }
    if (act === 'logout') { if (CLOUD.api) CLOUD.api.signOut(); toast('Você saiu. O progresso continua salvo neste navegador.'); return; }
    if (act === 'sync-now') { doPush(); return; }
    if (act === 'export') {
      flushLocal();
      const blob = new Blob([JSON.stringify({ app: 'deroadmap', version: 2, exportedAt: new Date().toISOString(), state: S }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `de-roadmap-progresso-${dayKey()}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Backup exportado');
      return;
    }
    if (act === 'reset') {
      if (confirm('Zerar TODO o progresso, respostas e histórico (inclusive na sincronização)? Exporte um backup antes. Não dá para desfazer.')) {
        S = blank(); S.resetAt = now(); flushLocal(); schedulePush(0); render(false); toast('Progresso zerado');
      }
    }
  });

  document.addEventListener('change', e => {
    const el = e.target;
    const act = el.dataset && el.dataset.act;
    if (act === 'check') {
      const st = topicState(el.dataset.t);
      st[el.dataset.kind][el.dataset.i] = el.checked;
      st.u = now();
      if (el.checked) bump();
      save();
      const t = TOPIC[el.dataset.t];
      if (t) refreshTopicMeta(t);
    } else if (act === 'pj') {
      const p = S.pj[el.dataset.p] || (S.pj[el.dataset.p] = {});
      p[el.dataset.i] = el.checked;
      p.u = now();
      if (el.checked) bump();
      save();
    } else if (act === 'weekly') {
      S.weekly = Math.min(80, Math.max(1, Number(el.value) || 12));
      S.wu = now();
      save(); render(true);
    } else if (act === 'quiz-scope') {
      quiz.scope = el.value; quiz.cur = null; quiz.recent = []; viewQuiz(false);
    } else if (act === 'import') {
      const f = el.files && el.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          const st = data && data.state ? data.state : data;
          if (!st || typeof st !== 'object' || !st.t || !st.q) throw new Error('formato');
          if (!confirm('Mesclar este backup com o progresso atual? (Em cada item vale a alteração mais recente.)')) return;
          S = mergeState(S, st); flushLocal(); schedulePush(0); render(false); toast('Backup importado');
        } catch (err) { toast('Arquivo inválido'); }
      };
      reader.readAsText(f);
      el.value = '';
    }
  });

  let ansTimer;
  document.addEventListener('input', e => {
    const el = e.target;
    if (el.dataset && el.dataset.act === 'answer') {
      setQ(el.dataset.k, { a: el.value });
      clearTimeout(ansTimer);
      ansTimer = setTimeout(() => { bump(); save(); }, 700);
    }
  });

  // Luz que acompanha o cursor nos cards
  let rafId = 0;
  document.addEventListener('pointermove', e => {
    if (rafId || e.pointerType !== 'mouse') return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const c = e.target.closest && e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }, { passive: true });

  // Busca
  const search = $('#search');
  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const v = search.value;
      if (v.trim()) location.hash = '#/busca/' + encodeURIComponent(v);
      else if (currentRoute().name === 'busca') location.hash = '#/';
    }, 180);
  });

  // Atalhos: "/" busca; na revisão, R revela e 1/2/3 avaliam
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement && document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); search.focus(); return; }
    if (e.key === 'Escape') { document.body.classList.remove('menu-open'); if (typing) document.activeElement.blur(); return; }
    if (typing || currentRoute().name !== 'revisao' || e.ctrlKey || e.metaKey) return;
    if ((e.key === 'r' || e.key === 'R') && quiz.cur && !quiz.revealed) { quiz.revealed = true; viewQuiz(false); return; }
    if (['1', '2', '3'].includes(e.key) && quiz.revealed) quizRate(Number(e.key) - 1);
  });

  // Rótulo do botão de idioma
  const langBtn = document.querySelector('[data-act="lang"]');
  if (langBtn) langBtn.innerHTML = icon('globe') + (LANG === 'en' ? '<b>EN</b>' : '<b>PT</b>');

  render(false);
  cloudInit();
})();
