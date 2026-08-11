  // CERTIFICATIONS
  function credentialTypeLabel(type) {
    return CREDENTIAL_TYPES[type] || 'Credential';
  }

  function credentialStatusClass(status) {
    if (status === 'valid') return 'credential-status--valid';
    if (status === 'expired') return 'credential-status--expired';
    return 'credential-status--completed';
  }

  function renderCerts() {
    const grid = $('#cert-grid');
    if (!grid) return;

    const featured = CREDENTIALS.find(c => c.featured && c.id === 'psm1') || CREDENTIALS.find(c => c.featured);
    const relevant = CREDENTIALS.filter(c => c.relevance === 'foundational').sort((a, b) => a.priority - b.priority);
    const supporting = CREDENTIALS.filter(c => c.relevance === 'supporting' || c.relevance === 'earlier').sort((a, b) => a.priority - b.priority);

    const timelineHtml = `
      <section class="credentials-section" aria-labelledby="cred-timeline-heading">
        <div class="credentials-section-head">
          <p class="mono-label">02 / Journey</p>
          <h2 id="cred-timeline-heading">Learning / credential journey</h2>
          <p>Formal learning milestones — not employment history.</p>
        </div>
        <ol class="credential-timeline">
          ${CREDENTIAL_TIMELINE.map(item => `
            <li class="credential-timeline-item${item.current ? ' credential-timeline-item--now' : ''}">
              <span class="credential-timeline-when">${esc(item.when)}</span>
              <div>
                <strong>${esc(item.label)}</strong>
                <span>${esc(item.detail)}</span>
              </div>
            </li>
          `).join('')}
        </ol>
      </section>`;

    const featuredHtml = featured ? `
      <section class="credentials-section" aria-labelledby="cred-featured-heading">
        <div class="credentials-section-head">
          <p class="mono-label">01 / Current credential</p>
          <h2 id="cred-featured-heading">Professional certification</h2>
        </div>
        <article class="credential-featured">
          <div class="credential-featured-main">
            <p class="mono-label">${esc(credentialTypeLabel(featured.type))}</p>
            <h2>${esc(featured.name)}</h2>
            <p class="credential-featured-short">${esc(featured.shortTitle || '')}</p>
            <p class="credential-featured-issuer">${esc(featured.issuer)} · ${esc(featured.issuedLabel || featured.year)}</p>
            <p class="credential-featured-summary">${esc(featured.summary || '')}</p>
          </div>
          <div class="credential-featured-side">
            <div>
              <p class="mono-label">Status</p>
              <p class="credential-status ${credentialStatusClass(featured.status)}" aria-label="Status: ${esc(featured.statusLabel)}">${esc(featured.statusLabel)}</p>
            </div>
            <div>
              <p class="mono-label">Issuer</p>
              <p>${esc(featured.issuer)}</p>
            </div>
            <div>
              <p class="mono-label">What it supports</p>
              <p>${esc(featured.supports || '')}</p>
            </div>
            <div>
              <p class="mono-label">Evidence</p>
              <button type="button" class="btn btn-primary btn-sm" data-cert-id="${esc(featured.id)}">View ${esc(featured.shortTitle || featured.name)} credential</button>
            </div>
          </div>
        </article>
      </section>` : '';

    const relevantHtml = `
      <section class="credentials-section" aria-labelledby="cred-relevant-heading">
        <div class="credentials-section-head">
          <p class="mono-label">03 / Role-relevant foundations</p>
          <h2 id="cred-relevant-heading">Currently relevant credentials</h2>
          <p>Technical foundations most useful for Product/Application Support and Implementation positioning.</p>
        </div>
        <div class="credential-grid">
          ${relevant.map(c => `
            <button type="button" class="credential-card${c.status === 'expired' ? ' credential-card--history' : ''}" data-cert-id="${esc(c.id)}">
              <div class="credential-card-top">
                <span class="credential-type">${esc(credentialTypeLabel(c.type))}</span>
                <span class="credential-status ${credentialStatusClass(c.status)}" aria-label="Status: ${esc(c.statusLabel)}">${esc(c.statusLabel)}</span>
              </div>
              <h3>${esc(c.name)}</h3>
              <p class="credential-card-meta">${esc(c.issuer)} · ${esc(c.issuedLabel || c.year)}${c.score ? ' · Exam score ' + esc(c.score) : ''}</p>
              <p class="credential-card-supports">${esc(c.supports || c.summary || '')}</p>
              <span class="credential-card-cta">View ${esc(c.shortTitle || 'credential')} evidence →</span>
            </button>
          `).join('')}
        </div>
      </section>`;

    const supportingHtml = `
      <section class="credentials-section" aria-labelledby="cred-support-heading">
        <div class="credentials-section-head">
          <p class="mono-label">04 / Supporting / earlier learning</p>
          <h2 id="cred-support-heading">Secondary credentials</h2>
          <p>Legitimate learning evidence with lower visual priority for current role targeting.</p>
        </div>
        <ul class="credential-list">
          ${supporting.map(c => `
            <li>
              <button type="button" data-cert-id="${esc(c.id)}" aria-label="View ${esc(c.name)} credential">
                <strong>${esc(c.name)}</strong>
                <span>${esc(c.issuer)} · ${esc(c.issuedLabel || c.year)}</span>
              </button>
              <span>${esc(c.summary || '')}</span>
              <span class="credential-type">${esc(credentialTypeLabel(c.type))}</span>
            </li>
          `).join('')}
        </ul>
      </section>`;

    const lineageHtml = `
      <section class="credentials-section" aria-labelledby="cred-lineage-heading">
        <div class="credentials-section-head">
          <p class="mono-label">05 / From credential to practice</p>
          <h2 id="cred-lineage-heading">How formal learning connects</h2>
        </div>
        <div class="credential-lineage">
          <article class="credential-lineage-item">
            <h3>Scrum</h3>
            <p>PSM I → framework knowledge → delivery visibility, requirements and validation mindset in project work.</p>
          </article>
          <article class="credential-lineage-item">
            <h3>Cloud</h3>
            <p>AWS Essentials → AWS Cloud Practitioner (historical) → current cloud / platform refresh in Learning.</p>
          </article>
          <article class="credential-lineage-item">
            <h3>Software / data</h3>
            <p>Java Full Stack training → IBM SQL course → practical SQL, REST and Postman building now.</p>
          </article>
        </div>
      </section>`;

    const bridgeHtml = `
      <section class="credentials-section" aria-labelledby="cred-bridge-heading">
        <div class="credential-bridge">
          <h2 id="cred-bridge-heading">Credentials are one part of the evidence</h2>
          <p>See how these foundations are being developed into practice — and where applied work already exists.</p>
          <div class="credential-bridge-actions">
            <a class="btn btn-primary" href="#/learning" data-nav-link="learning">View Learning</a>
            <a class="btn btn-ghost" href="#/projects" data-nav-link="projects">Projects</a>
            <a class="btn btn-ghost" href="#/capabilities" data-nav-link="capabilities">Capabilities</a>
            <a class="btn btn-ghost" href="#/support-lab" data-nav-link="support-lab">Support Lab</a>
          </div>
        </div>
      </section>`;

    grid.innerHTML = featuredHtml + timelineHtml + relevantHtml + supportingHtml + lineageHtml + bridgeHtml;

    $$('[data-cert-id]', grid).forEach(el => {
      el.addEventListener('click', () => openCert(el.dataset.certId));
      if (el.tagName === 'BUTTON') {
        el.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCert(el.dataset.certId);
          }
        });
      }
    });
    bindNavLinks(grid);
  }

  function openCert(id) {
    const c = CREDENTIALS.find(x => x.id === id);
    if (!c) return;
    certDialogLastFocus = document.activeElement;
    const dlg = $('#cert-dialog');
    const title = c.shortTitle ? `${c.name} (${c.shortTitle})` : c.name;
    $('#cert-dialog-title').textContent = title;
    const body = $('#cert-dialog-body');
    body.innerHTML = '';
    const link = $('#cert-dialog-link');
    link.href = c.file;
    link.textContent = 'Open ' + (c.shortTitle || 'credential') + ' PDF in new tab';
    link.setAttribute('aria-label', 'Open ' + c.name + ' PDF in new tab');

    const meta = document.createElement('p');
    meta.className = 'cert-dialog-meta';
    meta.textContent = [
      credentialTypeLabel(c.type),
      c.issuer,
      c.issuedLabel || c.year,
      c.statusLabel,
      c.score ? 'Exam score ' + c.score : null
    ].filter(Boolean).join(' · ');
    body.appendChild(meta);

    if (c.supports) {
      const supports = document.createElement('p');
      supports.className = 'cert-dialog-meta';
      supports.textContent = 'Supports: ' + c.supports;
      body.appendChild(supports);
    }

    if (c.file.toLowerCase().endsWith('.pdf')) {
      const shell = document.createElement('div');
      shell.className = 'cert-preview-shell';
      const obj = document.createElement('object');
      obj.className = 'cert-pdf';
      obj.data = c.file;
      obj.type = 'application/pdf';
      const fallback = document.createElement('p');
      fallback.className = 'cert-fallback';
      const fallbackLink = document.createElement('a');
      fallbackLink.href = c.file;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      fallbackLink.textContent = 'Open certificate PDF';
      fallback.append('PDF preview is unavailable in this browser. ', fallbackLink);
      obj.appendChild(fallback);
      shell.appendChild(obj);
      body.appendChild(shell);
    } else {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = c.file;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Open file';
      p.appendChild(a);
      body.appendChild(p);
    }
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }
