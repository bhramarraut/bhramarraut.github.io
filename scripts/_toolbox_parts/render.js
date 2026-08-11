  // TOOLBOX
  function toolLevelMeta(level) {
    return TOOL_LEVELS[level] || TOOL_LEVELS.awareness;
  }

  function renderToolboxFlagships() {
    const root = $('#toolbox-flagships');
    if (!root) return;
    const flagships = TOOLBOX.filter(t => t.flagship);
    root.innerHTML = flagships.map(tool => {
      const lvl = toolLevelMeta(tool.level);
      const evidence = (tool.evidence || []).map(e =>
        `<a href="${esc(e.href)}" data-nav-link="${esc(e.path)}">${esc(e.label)} →</a>`
      ).join(' ');
      return `
        <article class="toolbox-flagship" id="tool-${esc(tool.id)}">
          <div class="toolbox-flagship-head">
            <h3>${esc(tool.name)}</h3>
            <span class="toolbox-level toolbox-level--${esc(lvl.id)}">${esc(lvl.short)}</span>
          </div>
          <p class="toolbox-flagship-purpose">${esc(tool.purpose || '')}</p>
          <p class="toolbox-flagship-purpose"><strong>Used for:</strong> ${esc(tool.usedFor || '')}</p>
          <details>
            <summary>View decision details</summary>
            <div class="toolbox-decision">
              <div><h4>Why it fits</h4><p>${esc(tool.why || '')}</p></div>
              <div><h4>Watch for</h4><p>${esc(tool.watch || '')}</p></div>
              <div><h4>When I'd choose something else</h4><p>${esc(tool.whenElse || '')}</p></div>
              ${tool.alternatives?.length ? `<div><h4>Common alternatives</h4><ul>${tool.alternatives.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>` : ''}
            </div>
          </details>
          ${evidence ? `<div class="toolbox-flagship-evidence">${evidence}</div>` : ''}
        </article>
      `;
    }).join('');
    bindNavLinks(root);
  }

  function renderToolbox() {
    const root = $('#toolbox-grid');
    if (!root) return;
    renderToolboxFlagships();

    const primary = TOOLBOX.filter(t => !t.utility);
    const utilities = TOOLBOX.filter(t => t.utility);

    root.innerHTML = TOOL_GROUPS.map(group => {
      const tools = primary.filter(t => t.group === group.id);
      if (!tools.length) return '';
      return `
        <section class="toolbox-dir-group" aria-labelledby="tb-group-${esc(group.id)}">
          <h3 id="tb-group-${esc(group.id)}">${esc(group.label)}</h3>
          <table class="toolbox-dir-table">
            <thead>
              <tr>
                <th scope="col">Tool</th>
                <th scope="col">Level</th>
                <th scope="col">Used for</th>
                <th scope="col">Evidence</th>
              </tr>
            </thead>
            <tbody>
              ${tools.map(tool => {
                const lvl = toolLevelMeta(tool.level);
                const evidence = (tool.evidence || []).slice(0, 2).map(e =>
                  `<a href="${esc(e.href)}" data-nav-link="${esc(e.path)}">${esc(e.label)}</a>`
                ).join(' · ') || '—';
                return `<tr>
                  <td>${esc(tool.name)}</td>
                  <td><span class="toolbox-level toolbox-level--${esc(lvl.id)}">${esc(lvl.short)}</span></td>
                  <td>${esc(tool.purpose || tool.usedFor || '')}</td>
                  <td>${evidence}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </section>
      `;
    }).join('') + `
      <aside class="toolbox-utility-shelf" aria-labelledby="tb-utility-heading">
        <h3 id="tb-utility-heading">Utility shelf</h3>
        <p>Practical familiarity — visually secondary to delivery and support tools.</p>
        <ul class="toolbox-utility-list">
          ${utilities.map(tool => {
            const lvl = toolLevelMeta(tool.level);
            return `<li><strong>${esc(tool.name)}</strong><span class="toolbox-level toolbox-level--${esc(lvl.id)}">${esc(lvl.short)}</span></li>`;
          }).join('')}
        </ul>
      </aside>
    `;
    bindNavLinks(root);
  }

  function initToolboxCompare() {
    const tabs = $$('.toolbox-compare-tab');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const need = tab.dataset.tbNeed;
        tabs.forEach(t => t.setAttribute('aria-pressed', String(t === tab)));
        $$('.toolbox-compare-panel').forEach(panel => {
          panel.hidden = panel.dataset.tbPanel !== need;
        });
      });
    });
  }
