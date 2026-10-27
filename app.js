(() => {
  'use strict';

  /* =========================================================
   * Dados
   * ======================================================= */
  const PHASES = window.ROADMAP_PHASES.slice().sort((a, b) => a.num - b.num);
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
      t.order = TOPICS.length;
      TOPICS.push(t);
      TOPIC[t.id] = t;
    });
  });

  const LEVELS = {
    base: { label: 'Base', color: '#94a3b8', desc: 'Do zero: como aprender, inglês, matemática e o papel do DE.' },
    junior: { label: 'Júnior', color: '#22c55e', desc: 'Computação, Python e SQL sólidos. Você entrega tarefas.' },
    pleno: { label: 'Pleno', color: '#3b82f6', desc: 'Modelagem, Spark, pipelines, streaming e cloud. Você entrega projetos.' },
    senior: { label: 'Sênior', color: '#a855f7', desc: 'Produção, governança, arquitetura. Você define soluções.' },
    staff: { label: 'Especialista / Staff', color: '#f59e0b', desc: 'Internals, liderança e estratégia. Você muda a organização.' },
    carreira: { label: 'Carreira internacional', color: '#ec4899', desc: 'Trilha paralela: currículo, entrevistas, vistos e negociação.' }
  };
  const LEVEL_ORDER = ['base', 'junior', 'pleno', 'senior', 'staff', 'carreira'];
  const RATE_LABEL = ['Não sei', 'Parcial', 'Domino'];

  /* =========================================================
   * Estado (localStorage)
   * ======================================================= */
  const KEY = 'deroadmap:v1';
  const blank = () => ({ t: {}, q: {}, v: {}, h: [], log: {}, pj: {}, weekly: 12, started: Date.now() });
  let S = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object') return Object.assign(blank(), s);
    } catch (e) { /* storage indisponível */ }
    return blank();
  }
  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, 200);
  }
  function flush() {
    clearTimeout(saveTimer);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }
  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);

  const dayKey = (d = new Date()) =>
    d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function bump() { const k = dayKey(); S.log[k] = (S.log[k] || 0) + 1; }
  const topicState = id => S.t[id] || (S.t[id] = { l: {}, p: {} });
  const qKey = (tid, i) => tid + ':' + i;

  /* =========================================================
   * Cálculo de progresso
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
    let total = 0, done = 0, hours = 0, hoursLeft = 0, tDone = 0, q2 = 0, qTotal = 0, started = 0;
    topics.forEach(t => {
      const s = topicStats(t);
      total += s.total; done += s.done;
      hours += t.hours || 0; hoursLeft += (t.hours || 0) * (1 - s.pct);
      if (s.status === 2) tDone++;
      if (s.status >= 1) started++;
      q2 += s.q2; qTotal += t.questions.length;
    });
    return { total, done, pct: total ? done / total : 0, hours, hoursLeft, tDone, tCount: topics.length, q2, qTotal, started };
  }
  const phaseStats = p => groupStats(p.topics);
  const pctTxt = x => Math.round(x * 100) + '%';

  /* =========================================================
   * Helpers de HTML
   * ======================================================= */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Mini-markdown: `código` e **negrito**
  const fmt = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const $ = sel => document.querySelector(sel);
  const main = $('#main');
  const sidebar = $('#sidebar');

  function ring(pct, size = 56, stroke = 6) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="bg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="fg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" style="font-size:${size < 50 ? 10 : 13}px">${Math.round(pct * 100)}%</text>
    </svg>`;
  }
  const bar = (pct, thin) => `<div class="bar${thin ? ' thin' : ''}"><i style="width:${(pct * 100).toFixed(1)}%"></i></div>`;
  const levelBadge = lv => `<span class="badge" style="--c:${LEVELS[lv].color}">${esc(LEVELS[lv].label)}</span>`;
  const fmtHours = h => h >= 1 ? Math.round(h) + 'h' : '<1h';
  const fmtDate = ts => new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  const fmtDateTime = ts => new Date(ts).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  function resKind(url) {
    if (/youtube\.com|youtu\.be/.test(url)) return 'vídeo';
    if (/oreilly\.com|amazon\.|manning\.com|dataintensive\.net|databass\.dev|pragprog/.test(url)) return 'livro';
    if (/github\.com/.test(url)) return 'repo';
    if (/coursera|udemy|edx|zoomcamp|skillbuilder|academy|learn\./.test(url)) return 'curso';
    return 'link';
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* =========================================================
   * Sidebar
   * ======================================================= */
  function renderSidebar(route) {
    const active = (r) => route.name === r ? ' active' : '';
    const curPhase = route.name === 'fase' ? route.id : (route.name === 'topico' && TOPIC[route.id] ? TOPIC[route.id].phase.id : null);
    let html = `
      <div class="nav-group">
        <a class="nav-link${active('home')}" href="#/"><span class="num">⌂</span><span class="t">Painel</span></a>
        <a class="nav-link${active('revisao')}" href="#/revisao"><span class="num">↻</span><span class="t">Revisão ativa (quiz)</span></a>
        <a class="nav-link${active('progresso')}" href="#/progresso"><span class="num">≡</span><span class="t">Histórico & backup</span></a>
      </div>`;
    LEVEL_ORDER.forEach(lv => {
      const ps = PHASES.filter(p => p.level === lv);
      if (!ps.length) return;
      html += `<div class="nav-group"><div class="nav-label" style="color:${LEVELS[lv].color}">${esc(LEVELS[lv].label)}</div>`;
      ps.forEach(p => {
        const s = phaseStats(p);
        const isCur = p.id === curPhase;
        html += `<a class="nav-link${route.name === 'fase' && isCur ? ' active' : ''}${s.pct >= 0.999 ? ' done' : ''}" href="#/fase/${p.id}">
          <span class="num">${p.num}</span><span class="t">${esc(p.title)}</span><span class="pct">${pctTxt(s.pct)}</span></a>`;
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
    const eta = new Date(Date.now() + weeksLeft * 7 * 864e5);
    const answered = Object.values(S.q).filter(x => x && x.a && x.a.trim()).length;

    const ladder = LEVEL_ORDER.map(lv => {
      const ts = TOPICS.filter(t => t.phase.level === lv);
      const s = groupStats(ts);
      return `<div class="rung" style="--c:${LEVELS[lv].color}">
        <h4>${esc(LEVELS[lv].label)}</h4>
        <div class="faint">${esc(LEVELS[lv].desc)}</div>
        <div style="margin-top:10px">${bar(s.pct, true)}</div>
        <div class="faint mono" style="margin-top:6px">${pctTxt(s.pct)} · ${s.tDone}/${s.tCount} tópicos</div>
      </div>`;
    }).join('');

    const phaseCards = PHASES.map(p => {
      const s = phaseStats(p);
      return `<a class="card phase-card" href="#/fase/${p.id}">
        <div class="top"><span class="n">FASE ${String(p.num).padStart(2, '0')}</span>${levelBadge(p.level)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        ${bar(s.pct, true)}
        <div class="meta"><span>${s.tDone}/${s.tCount} tópicos · ${s.q2}/${s.qTotal} perguntas</span><span>~${fmtHours(s.hours)}</span></div>
      </a>`;
    }).join('');

    main.innerHTML = `<div class="container">
      <section class="hero">
        <div class="eyebrow">Do zero ao Especialista · trilha completa</div>
        <h1>Engenharia de Dados em nível internacional</h1>
        <p>${PHASES.length} fases, ${TOPICS.length} tópicos e ${g.qTotal} perguntas de validação. Para cada tópico: o que estudar, prática, fontes e as perguntas que você tem que saber responder sem consultar nada. Se travar numa, ainda não aprendeu.</p>
        <div class="goal-row">
          <span class="chip">🎯 Meta: Senior/Staff Data Engineer</span>
          <span class="chip">💵 US$ 10K+/mês</span>
          <span class="chip">✈️ Relocation visa</span>
          <span class="chip">⏱️ ~${Math.round(g.hours)}h de estudo estimadas</span>
        </div>
      </section>

      <section class="section grid g4">
        <div class="card stat"><div class="k">Progresso geral</div><div class="v">${pctTxt(g.pct)}</div>${bar(g.pct)}</div>
        <div class="card stat"><div class="k">Tópicos concluídos</div><div class="v">${g.tDone}<small> / ${g.tCount}</small></div>${bar(g.tDone / g.tCount)}</div>
        <div class="card stat"><div class="k">Perguntas dominadas</div><div class="v">${g.q2}<small> / ${g.qTotal}</small></div>${bar(g.q2 / g.qTotal)}</div>
        <div class="card stat"><div class="k">Sequência de estudo</div><div class="v">${streak()}<small> dias</small></div><div class="faint small">${answered} respostas escritas</div></div>
      </section>

      <section class="section grid g2">
        <div class="card next-card">
          ${nxt ? ring(topicStats(nxt).pct) : ring(1)}
          <div class="body">
            <div class="eyebrow">Próximo passo recomendado</div>
            ${nxt ? `<h3>${esc(nxt.title)}</h3><div class="faint small">Fase ${nxt.phase.num} · ${esc(nxt.phase.title)}</div>
            <a class="btn primary sm" style="margin-top:10px" href="#/topico/${nxt.id}">Estudar agora →</a>` : '<h3>Trilha concluída 🎉</h3>'}
          </div>
        </div>
        <div class="card next-card">
          ${last ? ring(topicStats(last).pct) : ring(0)}
          <div class="body">
            <div class="eyebrow">Continuar de onde parou</div>
            ${last ? `<h3>${esc(last.title)}</h3><div class="faint small">Acessado em ${fmtDateTime(S.h[0].ts)}</div>
            <a class="btn sm" style="margin-top:10px" href="#/topico/${last.id}">Retomar</a>` : '<h3>Nenhum tópico acessado ainda</h3><div class="faint small">Comece pela Fase 0.</div>'}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title"><h2>Escada de senioridade</h2><span class="hint">Carreira roda em paralelo desde o início</span></div>
        <div class="ladder">${ladder}</div>
      </section>

      <section class="section">
        <div class="section-title"><h2>Fases</h2><span class="hint">Siga em ordem, sem pular. Volte sempre que uma pergunta travar</span></div>
        <div class="grid g3">${phaseCards}</div>
      </section>

      <section class="section grid g2">
        <div class="card">
          <div class="section-title" style="margin-bottom:10px"><h2>Atividade</h2><span class="hint">últimas 26 semanas</span></div>
          ${heatmap()}
          <div class="faint small" style="margin-top:8px">Cada marcação de checklist, avaliação de pergunta ou resposta escrita conta como uma ação.</div>
        </div>
        <div class="card">
          <div class="section-title" style="margin-bottom:10px"><h2>Projeção</h2></div>
          <div class="muted">Estudando <input class="inline-input mono" type="number" min="1" max="80" value="${weekly}" data-act="weekly"> horas/semana,
          faltam <b>~${Math.round(g.hoursLeft)}h</b> (${Math.ceil(weeksLeft)} semanas). Conclusão prevista: <b>${fmtDate(eta)}</b>.</div>
          <div class="faint small" style="margin-top:10px">As horas por tópico são estimativas para aprender de verdade, incluindo prática. Projetos e trabalho/faculdade aceleram muita coisa.</div>
        </div>
      </section>

      <section class="section">
        <div class="section-title"><h2>Como usar esta trilha</h2></div>
        <ol class="method" style="padding:0;margin:0">
          <li><b>Estude o "O que estudar"</b>Use as fontes indicadas. Marque cada item só quando conseguir explicá-lo a alguém.</li>
          <li><b>Faça a prática</b>Sem código rodando, não conta. Coloque tudo no GitHub.</li>
          <li><b>Responda por escrito</b>Abra "Minha resposta" e escreva antes de consultar qualquer fonte. Escrever expõe o que você não sabe.</li>
          <li><b>Avalie com honestidade</b>Use "Domino" só se você responderia isso numa entrevista em inglês, com exemplos e trade-offs.</li>
          <li><b>Revise toda semana</b>A Revisão ativa prioriza o que você marcou como fraco e o que não vê há mais tempo.</li>
          <li><b>Construa o projeto da fase</b>O projeto é a prova pública de que você sabe, e é o seu portfólio.</li>
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
      return `<a class="card topic-card s${ts.status}" href="#/topico/${t.id}">
        <div class="idx">${ts.status === 2 ? '✓' : p.num + '.' + (i + 1)}</div>
        <div class="body">
          <h3>${esc(t.title)}</h3>
          <p>${fmt(t.summary)}</p>
          <div class="meta"><span>~${fmtHours(t.hours)}</span><span>${t.learn.length} conceitos</span><span>${t.practice.length} práticas</span><span>${ts.q2}/${t.questions.length} perguntas dominadas</span></div>
          ${bar(ts.pct, true)}
        </div>
      </a>`;
    }).join('');

    const project = p.project ? `<section class="section">
      <div class="card project">
        <div class="eyebrow">Projeto da fase · portfólio</div>
        <h3>${esc(p.project.title)}</h3>
        <p class="muted" style="margin-top:0">${fmt(p.project.description)}</p>
        <ul class="checklist">${p.project.deliverables.map((d, i) => `<li><label><input type="checkbox" data-act="pj" data-p="${p.id}" data-i="${i}" ${pj[i] ? 'checked' : ''}><span>${fmt(d)}</span></label></li>`).join('')}</ul>
      </div></section>` : '';

    main.innerHTML = `<div class="container">
      <div class="crumbs"><a href="#/">Painel</a><span>›</span><span>Fase ${p.num}</span></div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Fase ${String(p.num).padStart(2, '0')}</div>
          <h1>${esc(p.title)}</h1>
          <p class="lead">${fmt(p.summary)}</p>
          <div class="meta-row">${levelBadge(p.level)}<span class="chip">⏱️ ${esc(p.duration)}</span><span class="chip">~${fmtHours(s.hours)} de estudo</span><span class="chip">${p.topics.length} tópicos · ${s.qTotal} perguntas</span></div>
        </div>
        ${ring(s.pct, 84, 8)}
      </div>
      ${p.why ? `<div class="why"><b>Por que esta fase importa:</b> ${fmt(p.why)}</div>` : ''}
      ${p.outcomes ? `<section class="section"><div class="section-title"><h2>Ao final você deve conseguir</h2></div>
        <div class="card"><ul class="outcomes">${p.outcomes.map(o => `<li>${fmt(o)}</li>`).join('')}</ul></div></section>` : ''}
      <section class="section">
        <div class="section-title"><h2>Tópicos</h2><span class="hint">${s.tDone}/${s.tCount} concluídos</span></div>
        <div class="grid">${topics}</div>
      </section>
      ${project}
      <nav class="pager">
        ${prev ? `<a href="#/fase/${prev.id}"><span class="faint">← Fase ${prev.num}</span>${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="next" href="#/fase/${next.id}"><span class="faint">Fase ${next.num} →</span>${esc(next.title)}</a>` : ''}
      </nav>
    </div>`;
  }

  const openAnswers = new Set();

  function questionHtml(t, i, q) {
    const k = qKey(t.id, i);
    const st = S.q[k] || {};
    const r = st.r;
    const open = openAnswers.has(k);
    const hasAns = st.a && st.a.trim();
    return `<div class="q ${r != null ? 'r' + r : ''}" id="q-${k.replace(':', '-')}">
      <div class="q-head"><span class="q-num">${String(i + 1).padStart(2, '0')}</span><div class="q-text">${fmt(q)}</div></div>
      <div class="q-actions">
        ${[0, 1, 2].map(n => `<button class="rate r${n}${r === n ? ' on' : ''}" data-act="rate" data-k="${k}" data-r="${n}">${RATE_LABEL[n]}</button>`).join('')}
        <button class="link-btn" data-act="toggle-ans" data-k="${k}">${open ? 'Fechar resposta' : 'Minha resposta'}</button>
        ${hasAns && !open ? '<span class="has-ans">✎ resposta salva</span>' : ''}
        ${st.ts ? `<span class="faint small">· avaliada ${fmtDate(st.ts)}</span>` : ''}
      </div>
      <div class="answer${open ? ' open' : ''}">
        <textarea data-act="answer" data-k="${k}" placeholder="Explique com suas palavras, como se fosse numa entrevista. Dê exemplo, trade-offs e quando NÃO usar.">${esc(st.a || '')}</textarea>
        <div class="faint">Salvo automaticamente neste navegador. Dica: depois de escrever, confira nas fontes e corrija.</div>
      </div>
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

    // histórico de acesso
    S.v[t.id] = Date.now();
    if (!S.h.length || S.h[0].id !== t.id) {
      S.h.unshift({ id: t.id, ts: Date.now() });
      S.h = S.h.slice(0, 300);
    } else S.h[0].ts = Date.now();
    save();

    const list = (items, kind) => `<ul class="checklist">${items.map((x, i) =>
      `<li><label><input type="checkbox" data-act="check" data-t="${t.id}" data-kind="${kind}" data-i="${i}" ${st[kind][i] ? 'checked' : ''}><span>${fmt(x)}</span></label></li>`).join('')}</ul>`;

    main.innerHTML = `<div class="container">
      <div class="crumbs"><a href="#/">Painel</a><span>›</span><a href="#/fase/${p.id}">Fase ${p.num} · ${esc(p.title)}</a><span>›</span><span>${p.num}.${pos}</span></div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Tópico ${p.num}.${pos}</div>
          <h1>${esc(t.title)}</h1>
          <p class="lead">${fmt(t.summary)}</p>
          <div class="meta-row">${levelBadge(p.level)}<span class="chip">⏱️ ~${fmtHours(t.hours)}</span>${t.ongoing ? '<span class="chip">🔁 contínuo, em paralelo com as outras fases</span>' : ''}
            <span class="chip">${s.l}/${t.learn.length} conceitos</span><span class="chip">${s.p}/${t.practice.length} práticas</span></div>
        </div>
        <div id="topic-ring">${ring(s.pct, 84, 8)}</div>
      </div>
      ${t.why ? `<div class="why"><b>Por que importa:</b> ${fmt(t.why)}</div>` : ''}

      <section class="section">
        <div class="section-title"><h2>O que estudar</h2><span class="hint">marque quando conseguir explicar</span></div>
        <div class="card">${list(t.learn, 'l')}</div>
      </section>

      ${t.practice.length ? `<section class="section">
        <div class="section-title"><h2>Mão na massa</h2><span class="hint">código no GitHub ou não conta</span></div>
        <div class="card">${list(t.practice, 'p')}</div>
      </section>` : ''}

      ${t.resources.length ? `<section class="section">
        <div class="section-title"><h2>Fontes</h2><span class="hint">priorize documentação oficial e livros</span></div>
        <ul class="res-list">${t.resources.map(([name, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener"><span class="k">${resKind(url)}</span><span>${esc(name)}</span><span class="ext">↗</span></a></li>`).join('')}</ul>
      </section>` : ''}

      <section class="section">
        <div class="section-title"><h2>Perguntas de validação</h2>
          <span class="q-summary" id="q-summary">${qSummary(s, t)}</span></div>
        <div>${t.questions.map((q, i) => questionHtml(t, i, q)).join('')}</div>
      </section>

      <nav class="pager">
        ${prev ? `<a href="#/topico/${prev.id}"><span class="faint">← Anterior · Fase ${prev.phase.num}</span>${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="next" href="#/topico/${next.id}"><span class="faint">Próximo · Fase ${next.phase.num} →</span>${esc(next.title)}</a>` : ''}
      </nav>
    </div>`;
  }
  const qSummary = (s, t) =>
    `<span>✅ <b>${s.q2}</b> domino</span><span>🟡 <b>${s.q1}</b> parcial</span><span>🔴 <b>${s.q0}</b> não sei</span><span>⚪ <b>${t.questions.length - s.q2 - s.q1 - s.q0}</b> pendentes</span>`;

  /* ---------- Revisão ativa ---------- */
  const quiz = { scope: 'started', cur: null, recent: [], count: 0, tally: [0, 0, 0] };

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
    const now = Date.now();
    const weights = pool.map(x => {
      const st = x.st;
      if (!st || st.r == null) return 3;
      const days = st.ts ? (now - st.ts) / 864e5 : 30;
      if (st.r === 0) return 5 + days / 3;
      if (st.r === 1) return 2.5 + days / 5;
      return 0.4 + days / 14;
    });
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }

  function viewQuiz() {
    if (!quiz.cur) quiz.cur = pickQuestion();
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
        <p class="muted">${quiz.scope === 'started' ? 'Você ainda não iniciou nenhum tópico. Marque algum item de estudo ou escolha "Todas as perguntas".' : quiz.scope === 'weak' ? 'Nenhum ponto fraco registrado. Bom sinal, ou falta avaliar mais perguntas.' : 'Escolha outro filtro.'}</p></div>`;
    } else {
      const k = qKey(c.t.id, c.i);
      const st = S.q[k] || {};
      body = `<div class="card quiz-card">
        <div class="eyebrow">Fase ${c.t.phase.num} · ${esc(c.t.title)}</div>
        <div class="qtext">${fmt(c.q)}</div>
        <textarea data-act="answer" data-k="${k}" placeholder="Responda em voz alta ou por escrito ANTES de olhar qualquer coisa. Idealmente em inglês.">${esc(st.a || '')}</textarea>
        <div class="faint small" style="margin-top:6px">${st.r != null ? `Última avaliação: <b>${RATE_LABEL[st.r]}</b> em ${fmtDate(st.ts)}` : 'Ainda não avaliada'} · <a href="#/topico/${c.t.id}">abrir tópico</a></div>
        <div class="quiz-rates">
          ${[0, 1, 2].map(n => `<button class="rate r${n}" data-act="quiz-rate" data-r="${n}">${RATE_LABEL[n]} <span class="kbd">${n + 1}</span></button>`).join('')}
        </div>
        <div style="text-align:center;margin-top:12px"><button class="link-btn" data-act="quiz-skip">Pular →</button></div>
      </div>`;
    }

    main.innerHTML = `<div class="container quiz">
      <div class="crumbs"><a href="#/">Painel</a><span>›</span><span>Revisão ativa</span></div>
      <h1 style="font-size:28px;font-weight:800;margin-bottom:6px">Revisão ativa</h1>
      <p class="muted" style="margin-top:0">Recuperar da memória é o que fixa o conteúdo. As perguntas que você marcou como fracas, e as que não vê há mais tempo, aparecem com mais frequência.</p>
      <div class="quiz-bar">
        <select data-act="quiz-scope" aria-label="Filtro">${opts}</select>
        <span class="chip">Nesta sessão: ${quiz.count} · ✅ ${quiz.tally[2]} · 🟡 ${quiz.tally[1]} · 🔴 ${quiz.tally[0]}</span>
      </div>
      ${body}
    </div>`;
  }

  function quizRate(r) {
    const c = quiz.cur;
    if (!c) return;
    const k = qKey(c.t.id, c.i);
    S.q[k] = Object.assign({}, S.q[k], { r, ts: Date.now() });
    bump(); save();
    quiz.count++; quiz.tally[r]++;
    quiz.recent.unshift(k); quiz.recent = quiz.recent.slice(0, 8);
    quiz.cur = pickQuestion();
    viewQuiz();
    renderSidebar(currentRoute());
  }

  /* ---------- Histórico & backup ---------- */
  function viewData() {
    const rows = PHASES.map(p => {
      const s = phaseStats(p);
      return `<tr><td><a href="#/fase/${p.id}">${p.num}. ${esc(p.title)}</a></td><td>${levelBadge(p.level)}</td>
        <td class="num">${s.tDone}/${s.tCount}</td><td class="num">${s.q2}/${s.qTotal}</td><td class="num">${Math.round(s.hours - s.hoursLeft)}/${Math.round(s.hours)}h</td><td class="num">${pctTxt(s.pct)}</td></tr>`;
    }).join('');
    const hist = S.h.slice(0, 60).filter(x => TOPIC[x.id]).map(x =>
      `<tr><td class="faint small mono">${fmtDateTime(x.ts)}</td><td><a href="#/topico/${x.id}">${esc(TOPIC[x.id].title)}</a></td><td class="faint small">Fase ${TOPIC[x.id].phase.num}</td></tr>`).join('');
    const weak = [];
    TOPICS.forEach(t => t.questions.forEach((q, i) => { const st = S.q[qKey(t.id, i)]; if (st && st.r === 0) weak.push({ t, q }); }));

    main.innerHTML = `<div class="container">
      <div class="crumbs"><a href="#/">Painel</a><span>›</span><span>Histórico & backup</span></div>
      <h1 style="font-size:28px;font-weight:800;margin-bottom:6px">Histórico & backup</h1>
      <p class="muted" style="margin-top:0">Seu progresso fica salvo no <b>localStorage</b> deste navegador. Exporte um backup de vez em quando, ou para levar o progresso para outro computador ou o celular.</p>
      <div class="card" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <button class="btn primary" data-act="export">⬇ Exportar progresso (.json)</button>
        <label class="btn">⬆ Importar backup<input type="file" accept="application/json,.json" data-act="import" hidden></label>
        <button class="btn danger" data-act="reset" style="margin-left:auto">Zerar progresso</button>
      </div>
      <div class="faint small" style="margin-top:8px">Começou em ${fmtDate(S.started)} · ${Object.keys(S.log).length} dias com estudo registrado · ${Object.values(S.log).reduce((a, b) => a + b, 0)} ações no total.</div>

      <section class="section"><div class="section-title"><h2>Progresso por fase</h2></div>
        <div class="card table-wrap"><table class="table"><thead><tr><th>Fase</th><th>Nível</th><th>Tópicos</th><th>Perguntas</th><th>Horas</th><th>%</th></tr></thead><tbody>${rows}</tbody></table></div>
      </section>

      <section class="section"><div class="section-title"><h2>Pontos fracos</h2><span class="hint">perguntas marcadas como "Não sei"</span></div>
        ${weak.length ? `<div class="card">${weak.slice(0, 40).map(w => `<div style="padding:8px 0;border-bottom:1px solid var(--border)"><a href="#/topico/${w.t.id}" class="faint small">${esc(w.t.title)}</a><div>${fmt(w.q)}</div></div>`).join('')}</div>` : '<div class="card muted">Nenhuma ainda.</div>'}
      </section>

      <section class="section"><div class="section-title"><h2>Últimos acessos</h2><span class="hint">o que você abriu e quando</span></div>
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
      const re = new RegExp('(' + q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
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
    main.innerHTML = `<div class="container">
      <div class="crumbs"><a href="#/">Painel</a><span>›</span><span>Busca</span></div>
      <h1 style="font-size:26px;font-weight:800;margin-bottom:16px">Resultados para “${esc(q)}”</h1>
      ${nq.length < 2 ? '<div class="card muted">Digite pelo menos 2 caracteres.</div>' : hits.length ? hits.slice(0, 50).map(h => `
        <a class="hit" href="#/topico/${h.t.id}">
          <div class="faint">Fase ${h.t.phase.num} · ${esc(h.t.phase.title)}</div>
          <b>${hl(h.t.title)}</b>
          ${h.m.filter(([k]) => k !== 'Tópico').slice(0, 3).map(([k, v]) => `<div class="small muted" style="margin-top:4px"><span class="faint">${k}:</span> ${hl(v)}</div>`).join('')}
        </a>`).join('') : '<div class="card muted">Nada encontrado.</div>'}
    </div>`;
  }

  function viewNotFound() {
    main.innerHTML = `<div class="container"><div class="card"><h2>Página não encontrada</h2><p class="muted"><a href="#/">Voltar ao painel</a></p></div></div>`;
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
    renderSidebar(r);
    document.body.classList.remove('menu-open');
    if (keepScroll) window.scrollTo(0, y);
    else if (r.name !== 'busca') window.scrollTo(0, 0);
    const titleBits = { fase: PHASE[r.id] && PHASE[r.id].title, topico: TOPIC[r.id] && TOPIC[r.id].title, revisao: 'Revisão ativa', progresso: 'Histórico & backup', busca: 'Busca' };
    document.title = (titleBits[r.name] ? titleBits[r.name] + ' · ' : '') + 'Data Engineering Roadmap';
  }
  window.addEventListener('hashchange', () => render(false));

  // Atualizações parciais na página de tópico (sem perder scroll/foco)
  function refreshTopicMeta(t) {
    const s = topicStats(t);
    const ringEl = $('#topic-ring');
    if (ringEl) ringEl.innerHTML = ring(s.pct, 84, 8);
    const sum = $('#q-summary');
    if (sum) sum.innerHTML = qSummary(s, t);
    renderSidebar(currentRoute());
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
    if (act === 'rate') {
      const k = el.dataset.k, r = Number(el.dataset.r);
      const prev = S.q[k] || {};
      S.q[k] = Object.assign({}, prev, prev.r === r ? { r: null, ts: null } : { r, ts: Date.now() });
      bump(); save();
      const [tid, i] = k.split(':');
      const t = TOPIC[tid];
      const box = document.getElementById('q-' + k.replace(':', '-'));
      if (t && box) {
        box.outerHTML = questionHtml(t, Number(i), t.questions[Number(i)]);
        refreshTopicMeta(t);
      }
      return;
    }
    if (act === 'toggle-ans') {
      const k = el.dataset.k;
      if (openAnswers.has(k)) openAnswers.delete(k); else openAnswers.add(k);
      const [tid, i] = k.split(':');
      const t = TOPIC[tid];
      const box = document.getElementById('q-' + k.replace(':', '-'));
      if (t && box) {
        box.outerHTML = questionHtml(t, Number(i), t.questions[Number(i)]);
        if (openAnswers.has(k)) { const ta = document.querySelector(`#q-${k.replace(':', '-')} textarea`); if (ta) ta.focus(); }
      }
      return;
    }
    if (act === 'quiz-rate') { quizRate(Number(el.dataset.r)); return; }
    if (act === 'quiz-skip') { if (quiz.cur) quiz.recent.unshift(qKey(quiz.cur.t.id, quiz.cur.i)); quiz.cur = pickQuestion(); viewQuiz(); return; }
    if (act === 'export') {
      flush();
      const blob = new Blob([JSON.stringify({ app: 'deroadmap', version: 1, exportedAt: new Date().toISOString(), state: S }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `de-roadmap-progresso-${dayKey()}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Backup exportado');
      return;
    }
    if (act === 'reset') {
      if (confirm('Zerar TODO o progresso, respostas e histórico deste navegador? Exporte um backup antes. Esta ação não pode ser desfeita.')) {
        S = blank(); flush(); render(false); toast('Progresso zerado');
      }
    }
  });

  document.addEventListener('change', e => {
    const el = e.target;
    const act = el.dataset && el.dataset.act;
    if (act === 'check') {
      const st = topicState(el.dataset.t);
      st[el.dataset.kind][el.dataset.i] = el.checked;
      if (el.checked) bump();
      save();
      const t = TOPIC[el.dataset.t];
      if (t) refreshTopicMeta(t);
    } else if (act === 'pj') {
      const p = S.pj[el.dataset.p] || (S.pj[el.dataset.p] = {});
      p[el.dataset.i] = el.checked;
      if (el.checked) bump();
      save();
    } else if (act === 'weekly') {
      S.weekly = Math.min(80, Math.max(1, Number(el.value) || 12));
      save(); render(true);
    } else if (act === 'quiz-scope') {
      quiz.scope = el.value; quiz.cur = null; quiz.recent = []; viewQuiz();
    } else if (act === 'import') {
      const f = el.files && el.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          const st = data && data.state ? data.state : data;
          if (!st || typeof st !== 'object' || !st.t || !st.q) throw new Error('formato');
          if (!confirm('Substituir o progresso atual por este backup?')) return;
          S = Object.assign(blank(), st); flush(); render(false); toast('Backup importado');
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
      const k = el.dataset.k;
      S.q[k] = Object.assign({}, S.q[k], { a: el.value });
      clearTimeout(ansTimer);
      ansTimer = setTimeout(() => { bump(); save(); }, 800);
    }
  });

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

  // Atalhos: "/" foca a busca; 1/2/3 avaliam na revisão
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement && document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); search.focus(); return; }
    if (e.key === 'Escape') { document.body.classList.remove('menu-open'); if (typing) document.activeElement.blur(); return; }
    if (!typing && currentRoute().name === 'revisao' && ['1', '2', '3'].includes(e.key)) quizRate(Number(e.key) - 1);
  });

  render(false);
})();
