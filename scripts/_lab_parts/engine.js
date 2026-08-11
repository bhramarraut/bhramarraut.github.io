  // SUPPORT LAB
  let SUPPORT_LAB_DATA = { version: 1, featured: '', categories: [], scenarios: [] };
  let supportLabReady = false;
  let supportLabFilter = 'all';
  let labRuntime = null;
  const LAB_STORAGE_KEY = 'supportLabProgress_v1';

  function getLabScenario(slug) {
    return (SUPPORT_LAB_DATA.scenarios || []).find(s => s.slug === slug) || null;
  }

  function loadLabProgress() {
    try {
      return JSON.parse(localStorage.getItem(LAB_STORAGE_KEY) || '{}') || {};
    } catch (_) {
      return {};
    }
  }

  function saveLabProgress(map) {
    try {
      localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(map));
    } catch (_) { /* ignore quota / private mode */ }
  }

  function persistLabRuntime() {
    if (!labRuntime) return;
    const map = loadLabProgress();
    map[labRuntime.slug] = {
      completed: labRuntime.completed,
      taken: Array.from(labRuntime.taken),
      evidence: labRuntime.evidence,
      log: labRuntime.log,
      hypotheses: labRuntime.hypotheses,
      lastFeedback: labRuntime.lastFeedback || '',
      lastSnippet: labRuntime.lastSnippet || ''
    };
    saveLabProgress(map);
  }

  async function loadSupportLabData() {
    try {
      const res = await fetch('data/support-lab.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      SUPPORT_LAB_DATA = await res.json();
      supportLabReady = true;
    } catch (err) {
      supportLabReady = false;
      console.error('[support-lab] Failed to load data/support-lab.json', err);
      SUPPORT_LAB_DATA = { version: 1, featured: '', categories: [{ id: 'all', label: 'All' }], scenarios: [] };
    }
    return SUPPORT_LAB_DATA;
  }

  function createLabRuntime(scenario, saved) {
    const hyp = {};
    (scenario.hypotheses || []).forEach(h => {
      hyp[h.id] = (saved && saved.hypotheses && saved.hypotheses[h.id]) || 'unknown';
    });
    return {
      slug: scenario.slug,
      taken: new Set((saved && saved.taken) || []),
      evidence: (saved && saved.evidence) || [],
      log: (saved && saved.log) || [],
      hypotheses: hyp,
      completed: Boolean(saved && saved.completed),
      noteUnlocked: false,
      validationUnlocked: false,
      lastFeedback: (saved && saved.lastFeedback) || '',
      lastSnippet: (saved && saved.lastSnippet) || ''
    };
  }

  function labEvidenceCount(rt) {
    return (rt.evidence || []).length;
  }

  function labCanDocument(scenario, rt) {
    const need = (scenario.completion && scenario.completion.minEvidence) || 3;
    return labEvidenceCount(rt) >= need;
  }

  function renderLabLanding() {
    const landing = $('#lab-landing');
    const workspace = $('#lab-workspace');
    if (landing) landing.hidden = false;
    if (workspace) {
      workspace.hidden = true;
      workspace.innerHTML = '';
    }
    labRuntime = null;

    const featuredRoot = $('#lab-featured');
    const filtersRoot = $('#lab-filters');
    const libraryRoot = $('#lab-library');
    if (!featuredRoot || !filtersRoot || !libraryRoot) return;

    if (!supportLabReady || !(SUPPORT_LAB_DATA.scenarios || []).length) {
      featuredRoot.innerHTML = '<p class="lab-empty">Support Lab scenarios could not be loaded. Serve this folder over HTTP so <code>data/support-lab.json</code> is available.</p>';
      filtersRoot.innerHTML = '';
      libraryRoot.innerHTML = '';
      return;
    }

    const featured = getLabScenario(SUPPORT_LAB_DATA.featured) || (SUPPORT_LAB_DATA.scenarios || []).find(s => s.status === 'available');
    if (featured) {
      featuredRoot.innerHTML = `
        <p class="mono-label" id="lab-featured-heading">Featured lab</p>
        <h3>${esc(featured.title)}</h3>
        <p class="lab-featured-report">“${esc(featured.report || featured.summary)}”</p>
        <p><strong>Objective:</strong> ${esc(featured.objective || '')}</p>
        <div class="lab-featured-meta">
          <span>${esc((featured.difficulty || '').toUpperCase())}</span>
          <span>${esc((featured.layers || []).join(' · '))}</span>
          <span>${esc((featured.skills || []).slice(0, 4).join(' · '))}</span>
        </div>
        <button type="button" class="btn btn-primary" data-lab-start="${esc(featured.slug)}">Start investigation</button>
      `;
      featuredRoot.querySelector('[data-lab-start]')?.addEventListener('click', () => {
        navigate('support-lab/' + featured.slug, true);
      });
    }

    const cats = SUPPORT_LAB_DATA.categories || [{ id: 'all', label: 'All' }];
    filtersRoot.innerHTML = cats.map(c => `
      <button type="button" class="lab-filter" data-lab-filter="${esc(c.id)}" aria-pressed="${String(supportLabFilter === c.id)}">${esc(c.label)}</button>
    `).join('');
    $$('.lab-filter', filtersRoot).forEach(btn => {
      btn.addEventListener('click', () => {
        supportLabFilter = btn.dataset.labFilter || 'all';
        renderLabLanding();
      });
    });

    const progress = loadLabProgress();
    const list = (SUPPORT_LAB_DATA.scenarios || []).filter(s => {
      if (supportLabFilter === 'all') return true;
      return s.category === supportLabFilter;
    });

    libraryRoot.innerHTML = list.map(s => {
      const planned = s.status === 'planned' || s.status === 'building';
      const done = progress[s.slug]?.completed;
      const meta = `${(s.difficulty || '').toUpperCase()} · ${(s.status || 'available').toUpperCase()}${done ? ' · COMPLETED LOCALLY' : ''}`;
      if (planned) {
        return `
          <article class="lab-card is-planned" aria-disabled="true">
            <div class="lab-card-top"><span>${esc((s.category || '').toUpperCase())}</span><span>${esc(meta)}</span></div>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.summary || 'Queued practice scenario.')}</p>
            <span class="lab-card-cta">Planned</span>
          </article>
        `;
      }
      return `
        <a class="lab-card" href="#/support-lab/${esc(s.slug)}" data-nav-link="support-lab/${esc(s.slug)}">
          <div class="lab-card-top"><span>${esc((s.category || '').toUpperCase())}</span><span>${esc(meta)}</span></div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.summary || '')}</p>
          <span class="lab-card-cta">Start lab →</span>
        </a>
      `;
    }).join('') || '<p class="lab-empty">No scenarios in this filter.</p>';

    bindNavLinks(libraryRoot);
  }

  function buildLabSupportNote(scenario, rt) {
    const env = scenario.environment || {};
    const evidence = (rt.evidence || []).map((e, i) => `E${String(i + 1).padStart(2, '0')}  ${e}`).join('\n') || '—';
    const hyp = (scenario.hypotheses || [])
      .map(h => `- ${h.label}: ${rt.hypotheses[h.id] || 'unknown'}`)
      .join('\n');
    return [
      'SUPPORT NOTE (SIMULATION)',
      'Summary: ' + scenario.title,
      'Environment: ' + [env.env, env.browser, env.role].filter(Boolean).join(' · '),
      env.record ? ('Record: ' + env.record) : null,
      'Impact: ' + (scenario.impact || '—'),
      '',
      'Initial report:',
      scenario.report || scenario.summary || '—',
      '',
      'Objective:',
      scenario.objective || '—',
      '',
      'Evidence:',
      evidence,
      '',
      'Working hypotheses:',
      hyp || '—',
      '',
      'Tests performed:',
      (rt.log || []).map(l => `- ${l.label}: ${l.result}`).join('\n') || '—',
      '',
      'Next action: Continue investigation or escalate with evidence above.',
      '',
      'Label: Practice simulation — not production incident history.'
    ].filter(x => x !== null).join('\n');
  }

  function buildLabReport(scenario, rt) {
    return [
      'LAB REPORT',
      'Scenario: ' + scenario.title,
      'Slug: ' + scenario.slug,
      'Difficulty: ' + (scenario.difficulty || ''),
      '',
      'Objective:',
      scenario.objective || '',
      '',
      'Investigation:',
      (rt.log || []).map((l, i) => `${String(i + 1).padStart(2, '0')}  ${l.label}\n→ ${l.result}`).join('\n\n') || '—',
      '',
      'Key evidence:',
      (rt.evidence || []).map((e, i) => `- E${i + 1}: ${e}`).join('\n') || '—',
      '',
      'Working hypothesis states:',
      (scenario.hypotheses || []).map(h => `- ${h.label}: ${rt.hypotheses[h.id] || 'unknown'}`).join('\n') || '—',
      '',
      'Status: ' + (rt.completed ? 'Completed simulation (local)' : 'In progress'),
      '',
      'Practice note: This is a simulation for structured troubleshooting practice.'
    ].join('\n');
  }

  function buildLabMarkdown(scenario, rt) {
    const today = new Date().toISOString().slice(0, 10);
    return [
      '---',
      `lab: "${scenario.title.replace(/"/g, '\\"')}"`,
      `date: ${today}`,
      'type: "support-practice"',
      `status: "${rt.completed ? 'completed' : 'in-progress'}"`,
      '---',
      '',
      `# ${scenario.title}`,
      '',
      '## Scenario',
      '',
      scenario.summary || '',
      '',
      '> ' + (scenario.report || ''),
      '',
      '## Evidence',
      '',
      ...(rt.evidence || []).map((e, i) => `${i + 1}. ${e}`),
      '',
      '## Investigation log',
      '',
      ...(rt.log || []).map(l => `- **${l.label}** — ${l.result}`),
      '',
      '## Working hypotheses',
      '',
      ...(scenario.hypotheses || []).map(h => `- ${h.label}: ${rt.hypotheses[h.id] || 'unknown'}`),
      '',
      '## Label',
      '',
      'Practice simulation — not production incident history.',
      ''
    ].join('\n');
  }

  function takeLabAction(scenario, actionId) {
    if (!labRuntime) return;
    const action = (scenario.actions || []).find(a => a.id === actionId);
    if (!action) return;
    if (labRuntime.taken.has(actionId)) return;

    labRuntime.taken.add(actionId);
    labRuntime.log.push({
      label: action.label,
      result: action.result || '',
      value: action.value || 'useful',
      feedback: action.feedback || ''
    });
    if (action.evidence) labRuntime.evidence.push(action.evidence);
    if (action.hypothesisEffects) {
      Object.entries(action.hypothesisEffects).forEach(([hid, effect]) => {
        labRuntime.hypotheses[hid] = effect;
      });
    }
    labRuntime.lastFeedback = `${(action.value || 'useful').toUpperCase()} — ${action.feedback || ''}`.trim();
    labRuntime.lastSnippet = action.snippet || '';

    if (labCanDocument(scenario, labRuntime)) labRuntime.noteUnlocked = true;
    if (scenario.completion?.unlockValidation && labEvidenceCount(labRuntime) >= (scenario.completion.minEvidence || 3)) {
      labRuntime.validationUnlocked = true;
    }
    if (action.id === 'prepare-escalation' || action.id === 'generate-report' || action.id === 'complete-validation') {
      labRuntime.completed = true;
    }
    persistLabRuntime();
    renderLabWorkspace(scenario);
  }

  function renderLabWorkspace(scenario) {
    const landing = $('#lab-landing');
    const workspace = $('#lab-workspace');
    if (!workspace) return;
    if (landing) landing.hidden = true;
    workspace.hidden = false;

    const saved = loadLabProgress()[scenario.slug];
    if (!labRuntime || labRuntime.slug !== scenario.slug) {
      labRuntime = createLabRuntime(scenario, saved);
      if (labCanDocument(scenario, labRuntime)) labRuntime.noteUnlocked = true;
    }

    const rt = labRuntime;
    const actions = (scenario.actions || []).filter(a => !rt.taken.has(a.id));
    const relatedK = (scenario.relatedKnowledge || [])
      .map(slug => {
        const a = ARTICLES.find(x => x.slug === slug);
        return a ? { label: a.title, href: '#/knowledge/' + slug, path: 'knowledge/' + slug } : null;
      })
      .filter(Boolean);
    const relatedP = (scenario.relatedProjects || []).map(id => ({
      label: id === 'catalyx' ? 'Catalyx' : id === 'skillverse' ? 'Skillverse' : id,
      href: '#/projects/' + id,
      path: 'projects/' + id
    }));

    const note = buildLabSupportNote(scenario, rt);
    const report = buildLabReport(scenario, rt);

    workspace.innerHTML = `
      <div class="lab-ws-nav">
        <a href="#/support-lab" class="btn-text" data-nav-link="support-lab">← Back to scenarios</a>
        <button type="button" class="btn btn-ghost btn-sm" id="lab-reset">Reset lab</button>
      </div>
      <header class="lab-ws-header">
        <div>
          <p class="mono-label">Lab · ${esc((scenario.difficulty || '').toUpperCase())} · Simulation</p>
          <h2 id="lab-heading">${esc(scenario.title)}</h2>
        </div>
        <p class="mono-label">${esc((scenario.layers || []).join(' · '))}</p>
      </header>
      ${scenario.note ? `<p class="lab-micro">${esc(scenario.note)}</p>` : ''}

      <div class="lab-ws-grid">
        <section class="lab-panel" aria-labelledby="lab-context-heading">
          <h3 id="lab-context-heading">Scenario</h3>
          <dl>
            <dt>Initial report</dt>
            <dd>“${esc(scenario.report || scenario.summary || '')}”</dd>
            <dt>Objective</dt>
            <dd>${esc(scenario.objective || '')}</dd>
            <dt>Impact</dt>
            <dd>${esc(scenario.impact || '—')}</dd>
            <dt>Environment</dt>
            <dd>${esc([scenario.environment?.env, scenario.environment?.browser, scenario.environment?.role, scenario.environment?.record].filter(Boolean).join(' · ') || '—')}</dd>
            <dt>Tools in this lab</dt>
            <dd>${esc((scenario.tools || []).join(' · ') || '—')}</dd>
          </dl>
          <h3 style="margin-top:16px">Triage context</h3>
          <ul class="lab-triage">
            ${(scenario.triage || []).map(t => `<li><strong>${esc(t.question)}</strong>${esc(t.answer)}</li>`).join('') || '<li class="lab-empty">No triage prompts.</li>'}
          </ul>
        </section>

        <section class="lab-panel lab-panel--evidence" aria-labelledby="lab-evidence-heading">
          <h3 id="lab-evidence-heading">Evidence</h3>
          <ul class="lab-evidence-list">
            ${rt.evidence.length ? rt.evidence.map((e, i) => `<li><span class="mono-label">E${String(i + 1).padStart(2, '0')}</span>${esc(e)}</li>`).join('') : '<li class="lab-empty">No evidence yet — take an investigation action.</li>'}
          </ul>
          <h3 style="margin-top:16px">Hypotheses</h3>
          <ul class="lab-hypotheses">
            ${(scenario.hypotheses || []).map(h => {
              const state = rt.hypotheses[h.id] || 'unknown';
              const label = state === 'more' ? 'More plausible' : state === 'less' ? 'Less plausible' : 'Unknown';
              return `<li><span>${esc(h.label)}</span><span class="lab-hyp-state ${state === 'more' ? 'is-more' : state === 'less' ? 'is-less' : ''}">${esc(label)}</span></li>`;
            }).join('') || '<li class="lab-empty">None listed.</li>'}
          </ul>
        </section>
      </div>

      <section class="lab-panel" aria-labelledby="lab-actions-heading">
        <h3 id="lab-actions-heading">Investigation actions</h3>
        <p class="lab-empty" style="margin-bottom:10px">Change one variable at a time. Prefer high-information tests that narrow uncertainty.</p>
        <div class="lab-actions">
          ${actions.length ? actions.map(a => `<button type="button" class="lab-action" data-lab-action="${esc(a.id)}">${esc(a.label)}</button>`).join('') : '<p class="lab-empty">All listed actions taken. Review evidence and documentation below.</p>'}
        </div>
        ${rt.lastFeedback ? `<p class="lab-action-feedback">${esc(rt.lastFeedback)}</p>` : ''}
        ${rt.lastSnippet ? `<pre class="lab-snippet">${esc(rt.lastSnippet)}</pre>` : ''}
      </section>

      <section class="lab-panel" aria-labelledby="lab-log-heading">
        <h3 id="lab-log-heading">Investigation log</h3>
        <ol class="lab-log">
          ${rt.log.length ? rt.log.map((l, i) => `<li><span class="mono-label">Step ${String(i + 1).padStart(2, '0')} · ${(l.value || '').toUpperCase()}</span><strong>${esc(l.label)}</strong><div>${esc(l.result)}</div></li>`).join('') : '<li class="lab-empty">Log is empty.</li>'}
        </ol>
      </section>

      <section class="lab-panel" aria-labelledby="lab-doc-heading">
        <h3 id="lab-doc-heading">Support note / lab report</h3>
        ${labCanDocument(scenario, rt) ? `
          <p class="lab-empty" style="margin-bottom:10px">Enough evidence to draft a structured note. Refine as you continue.</p>
          <pre class="lab-doc" id="lab-doc-text">${esc(note)}</pre>
          <div class="lab-toolbar">
            <button type="button" class="btn btn-primary btn-sm" id="lab-copy-note">Copy support note</button>
            <button type="button" class="btn btn-ghost btn-sm" id="lab-copy-report">Copy lab report</button>
            <button type="button" class="btn btn-ghost btn-sm" id="lab-copy-md">Copy as Markdown</button>
          </div>
          <pre class="lab-report" id="lab-report-text" hidden>${esc(report)}</pre>
        ` : `<p class="lab-empty">Documentation unlocks after about ${(scenario.completion && scenario.completion.minEvidence) || 3} evidence items. Keep investigating.</p>`}
        ${scenario.completion?.fixMessage && rt.validationUnlocked ? `<p class="lab-action-feedback" style="margin-top:12px"><strong>Simulated update:</strong> ${esc(scenario.completion.fixMessage)}</p>` : ''}
      </section>

      <section class="lab-panel" aria-labelledby="lab-related-heading">
        <h3 id="lab-related-heading">Related</h3>
        <div class="lab-related">
          ${relatedK.map(l => `<a href="${esc(l.href)}" data-nav-link="${esc(l.path)}">${esc(l.label)} →</a>`).join('')}
          ${relatedP.map(l => `<a href="${esc(l.href)}" data-nav-link="${esc(l.path)}">${esc(l.label)} →</a>`).join('')}
          <a href="#/learning" data-nav-link="learning">Learning system →</a>
          <a href="#/toolbox" data-nav-link="toolbox">Toolbox →</a>
        </div>
      </section>
    `;

    bindNavLinks(workspace);

    $$('[data-lab-action]', workspace).forEach(btn => {
      btn.addEventListener('click', () => takeLabAction(scenario, btn.dataset.labAction));
    });

    $('#lab-reset')?.addEventListener('click', () => {
      if (rt.log.length && !window.confirm('Reset this lab? Investigation progress for this scenario will be cleared locally.')) return;
      const map = loadLabProgress();
      delete map[scenario.slug];
      saveLabProgress(map);
      labRuntime = createLabRuntime(scenario, null);
      renderLabWorkspace(scenario);
    });

    $('#lab-copy-note')?.addEventListener('click', () => copyText(note, 'Support note'));
    $('#lab-copy-report')?.addEventListener('click', () => copyText(report, 'Lab report'));
    $('#lab-copy-md')?.addEventListener('click', () => copyText(buildLabMarkdown(scenario, rt), 'Markdown'));
  }

  function showSupportLab(slug) {
    const view = $('#view-support-lab');
    if (!view) return;
    $$('.view').forEach(v => v.classList.remove('active'));
    view.classList.add('active');
    updateNav('support-lab');

    if (!slug) {
      updatePageMeta('Support Lab — Bhramar Raut', 'Practice troubleshooting simulations across application, API, systems, networking and service workflows.');
      updateTopbarContext('support-lab');
      renderLabLanding();
      return;
    }

    const scenario = getLabScenario(slug);
    if (!scenario || (scenario.status !== 'available' && scenario.status !== 'building')) {
      showRoute('404');
      return;
    }
    updatePageMeta(scenario.title + ' — Support Lab — Bhramar Raut', scenario.summary || scenario.title);
    updateTopbarContext('support-lab/' + slug, scenario.title);
    renderLabWorkspace(scenario);
  }

  async function initSupportLab() {
    await loadSupportLabData();
  }
