  const RESEARCH = {
    title: 'Economic Impact on Construction Sector Due to COVID-19',
    year: 2020,
    journal: 'Journal of Seybold Report',
    volume: 15,
    issue: 8,
    pages: '2522–2528',
    issn: '1533-9211',
    role: 'Co-author',
    institution: 'Department of Civil Engineering, Shri Ramdeobaba College of Engineering and Management, Nagpur',
    pdf: './assets/research/economic-impact-construction-covid19.pdf',
    authors: [
      { name: 'Dr Monica R Seth', role: 'Faculty / author' },
      { name: 'Kunal Gupta', role: 'Student co-author' },
      { name: 'Akshat Waghmare', role: 'Student co-author' },
      { name: 'Arudati Manhas', role: 'Student co-author' },
      { name: 'Sumit Mishra', role: 'Student co-author' },
      { name: 'Bhramar Raut', role: 'Student co-author', you: true }
    ],
    citation: 'Seth, M. R., Gupta, K., Waghmare, A., Manhas, A., Mishra, S., & Raut, B. (2020). Economic Impact on Construction Sector Due to COVID-19. Journal of Seybold Report, 15(8), 2522–2528.',
    figures: {
      gva: {
        title: 'GVA comparison',
        page: 4,
        summary: 'The paper presents sector GVA context used to frame construction’s economic exposure during lockdown. Open the PDF for the original figure and caption.'
      },
      dependencies: {
        title: 'Construction-sector dependencies',
        page: 4,
        summary: 'The paper maps sectors feeding into construction and sectors dependent on construction — showing ripple effects in both directions.'
      },
      labour: {
        title: 'Labour and materials pressure',
        page: 5,
        summary: 'Human and supply-side pressures discussed in the paper include migration/availability, wage pressure and material-price effects alongside project delay and cost themes.'
      },
      scenarios: {
        title: 'Scenario analysis',
        page: 6,
        summary: 'Multiple construction-sector scenarios compare potential effects on employment, investment and GVA. Aggregate ranges are summarised on this page; exact scenario cells remain in the original figure/table.'
      }
    },
    // Source ranges as reported in the 2020 paper / cited scenario analysis (historical).
    findings: [
      { id: 'gva', label: 'GVA', value: '15–34%', sourcePage: 6 },
      { id: 'investment', label: 'Investment', value: '13–30%', sourcePage: 6 },
      { id: 'employment', label: 'Employment', value: '11–25%', sourcePage: 6 },
      { id: 'delay', label: 'Project delay', value: '~2–3 months', sourcePage: 5 }
    ]
  };
