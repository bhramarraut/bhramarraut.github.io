  // LEARNING
  function learningStageMeta(stage) {
    return LEARNING_STAGES[stage] || LEARNING_STAGES.queued;
  }

  function learningArticleLink(slug) {
    const article = ARTICLES.find(a => a.slug === slug);
    if (!article) return null;
    return { label: article.title, href: '#/knowledge/' + slug, path: 'knowledge/' + slug };
  }

  function renderLearningSprint() {
    const root = $('#learning-sprint');
    if (!root) return;
    root.innerHTML = `
      <ol class="learning-sprint-list">
        ${LEARNING_SPRINT.items.map(item => `
          <li>
            <span class="learning-sprint-num">${esc(item.num)}</span>
            <div>
              <strong>${esc(item.title)}</strong>
              <span>${esc(item.detail)}</span>
            </div>
          </li>
        `).join('')}
      </ol>
      <p class="learning-sprint-target"><strong>Target outcome</strong>${esc(LEARNING_SPRINT.target)}</p>
    `;
  }

  function renderLearningTracks() {
    const root = $('#learning-tracks');
    if (!root) return;
    root.innerHTML = LEARNING_TRACKS.map(track => {
      const stage = learningStageMeta(track.stage);
      const related = (track.knowledge || [])
        .map(learningArticleLink)
        .filter(Boolean)
        .slice(0, 4);
      const evidence = (track.evidence || []).concat(related);
      return `
        <article class="learning-track" id="learning-track-${esc(track.id)}" aria-labelledby="learning-track-title-${esc(track.id)}">
          <div class="learning-track-top">
            <span class="learning-track-num">Track ${esc(track.num)}</span>
            <span class="learning-stage learning-stage--${esc(stage.id)}">${esc(stage.label)}</span>
          </div>
          <h3 id="learning-track-title-${esc(track.id)}">${esc(track.title)}</h3>
          <p class="learning-track-why"><strong>Why this matters:</strong> ${esc(track.why)}</p>
          <div class="learning-track-body">
            <ol class="learning-track-rail" aria-label="${esc(track.title)} progression">
              <li>
                <span class="mono-label">Foundation</span>
                <strong>Base</strong>
                <p>${esc(track.foundation)}</p>
              </li>
              <li class="is-current">
                <span class="mono-label">● Building now</span>
                <strong>Current</strong>
                <p>${esc(track.now)}</p>
              </li>
              <li>
                <span class="mono-label">○ Next milestone</span>
                <strong>Next</strong>
                <p>${esc(track.next)}</p>
              </li>
              <li>
                <span class="mono-label">Later</span>
                <strong>Horizon</strong>
                <p>${esc(track.later)}</p>
              </li>
            </ol>
            <div class="learning-track-meta">
              <h4>What this unlocks</h4>
              <p>${esc(track.outcome)}</p>
              <h4>Next proof</h4>
              <p>${esc(track.nextProof || 'Planned')}</p>
              ${evidence.length ? `<h4>Evidence / notes</h4><div class="learning-track-links">${evidence.map(e =>
                `<a href="${esc(e.href)}" data-nav-link="${esc(e.path)}">${esc(e.label)} →</a>`
              ).join('')}</div>` : '<h4>Evidence / notes</h4><p>Planned</p>'}
            </div>
          </div>
        </article>
      `;
    }).join('');
    bindNavLinks(root);
  }

  function renderLearningConvergence() {
    const root = $('#learning-convergence');
    if (!root) return;
    root.innerHTML = LEARNING_CONVERGENCE.map(item => `
      <article class="learning-convergence-item">
        <h3>${esc(item.title)}</h3>
        <p class="learning-convergence-eq">${esc(item.equation)}</p>
        <p>→ ${esc(item.result)}</p>
      </article>
    `).join('');
  }

  function renderLearningFoundations() {
    const root = $('#learning-foundations');
    if (!root) return;
    root.innerHTML = LEARNING_FOUNDATIONS.map(item => `
      <li>
        <strong>${esc(item.title)}</strong>
        <span>${esc(item.detail)}</span>
        <span class="learning-stage learning-stage--foundation">${esc(item.label)}</span>
      </li>
    `).join('');
  }

  function renderLearningJourney() {
    const root = $('#learning-journey');
    if (!root) return;
    root.innerHTML = LEARNING_JOURNEY.map(item => `
      <li>
        <span class="learning-journey-when">${esc(item.when)}</span>
        <span>${esc(item.text)}</span>
      </li>
    `).join('');
  }

  function renderLearning() {
    renderLearningSprint();
    renderLearningTracks();
    renderLearningConvergence();
    renderLearningFoundations();
    renderLearningJourney();
  }
