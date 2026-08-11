  function researchPdfUrl(page) {
    const base = RESEARCH.pdf;
    return page ? `${base}#page=${page}` : base;
  }

  function copyResearchCitation() {
    copyText(RESEARCH.citation, 'Citation');
  }

  function openResearchFigure(id) {
    const fig = RESEARCH.figures[id];
    if (!fig) return;
    const dlg = $('#research-figure-dialog');
    if (!dlg) {
      window.open(researchPdfUrl(fig.page), '_blank', 'noopener,noreferrer');
      return;
    }
    $('#research-figure-dialog-title').textContent = fig.title;
    const body = $('#research-figure-dialog-body');
    body.innerHTML = '';
    const meta = document.createElement('p');
    meta.className = 'text-sm text-secondary';
    meta.textContent = `Paper p. ${fig.page} · ${RESEARCH.journal} · ${RESEARCH.year}`;
    const summary = document.createElement('p');
    summary.className = 'text-sm';
    summary.style.marginTop = '12px';
    summary.style.lineHeight = '1.55';
    summary.textContent = fig.summary;
    const note = document.createElement('p');
    note.className = 'text-sm text-muted';
    note.style.marginTop = '12px';
    note.textContent = 'Original figure/table values are preserved in the PDF. This dialog does not recreate chart data.';
    body.append(meta, summary, note);
    const link = $('#research-figure-dialog-link');
    link.href = researchPdfUrl(fig.page);
    link.setAttribute('aria-label', `Open original paper at page ${fig.page}: ${fig.title}`);
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  function bindResearchPage() {
    const root = $('#view-research');
    if (!root || root.dataset.bound === '1') return;
    root.dataset.bound = '1';

    ['research-copy-citation', 'research-copy-citation-secondary', 'research-copy-citation-record']
      .forEach(id => {
        $(`#${id}`)?.addEventListener('click', copyResearchCitation);
      });

    $('#research-scroll-focus')?.addEventListener('click', () => {
      const target = $('#research-focus');
      if (!target) return;
      const owner = typeof getActiveScrollOwner === 'function' ? getActiveScrollOwner() : window;
      if (owner === window) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else {
        const ownerRect = owner.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        owner.scrollTo({ top: owner.scrollTop + (targetRect.top - ownerRect.top) - 24, behavior: 'smooth' });
      }
    });

    $$('[data-research-figure]', root).forEach(btn => {
      btn.addEventListener('click', () => openResearchFigure(btn.dataset.researchFigure));
    });

    $('#research-figure-dialog-close')?.addEventListener('click', () => {
      const dlg = $('#research-figure-dialog');
      if (dlg && typeof dlg.close === 'function') dlg.close();
      else dlg?.removeAttribute('open');
    });

    bindNavLinks(root);

    // Soft-check archival PDF presence (does not block the page).
    fetch(RESEARCH.pdf, { method: 'HEAD' }).then(res => {
      if (!res.ok) console.info('Research PDF not found at', RESEARCH.pdf, '— place the archival file to enable local evidence links.');
    }).catch(() => {
      console.info('Research PDF not reachable yet at', RESEARCH.pdf);
    });
  }
