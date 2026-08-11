  const TOOL_LEVELS = {
    used: { id: 'used', label: 'Used', short: 'USED' },
    foundation: { id: 'foundation', label: 'Foundation', short: 'FOUNDATION' },
    building: { id: 'building', label: 'Building', short: 'BUILDING' },
    awareness: { id: 'awareness', label: 'Awareness', short: 'AWARENESS' }
  };

  const TOOL_GROUPS = [
    { id: 'build', label: 'Build & iterate' },
    { id: 'plan', label: 'Plan & document' },
    { id: 'investigate', label: 'Investigate & validate' },
    { id: 'infrastructure', label: 'Infrastructure & cloud' },
    { id: 'security', label: 'Security learning' }
  ];

  const TOOLBOX = [
    {
      id: 'openproject', name: 'OpenProject', group: 'plan', level: 'used', flagship: true, utility: false,
      purpose: 'Work-item visibility, statuses, priorities and delivery tracking.',
      usedFor: 'Work items, status, priorities, dependencies and delivery tracking during AI-assisted product delivery.',
      why: 'Structured project management with an open-source ecosystem — an option I would evaluate when teams want delivery visibility without immediate suite lock-in.',
      watch: 'Hosting and administration if self-managed; team adoption; integration requirements.',
      whenElse: 'Organization already standardized; deep marketplace integrations needed; managed support required.',
      alternatives: ['Commercial work-management suites (e.g. Jira-class tools)'],
      evidence: [
        { label: 'Skillverse', href: '#/projects/skillverse', path: 'projects/skillverse' },
        { label: 'Catalyx', href: '#/projects/catalyx', path: 'projects/catalyx' },
        { label: 'OpenProject note', href: '#/knowledge/openproject-work-tracking', path: 'knowledge/openproject-work-tracking' }
      ]
    },
    {
      id: 'obsidian', name: 'Obsidian', group: 'plan', level: 'used', flagship: true, utility: false,
      purpose: 'Local-first knowledge management with plain Markdown.',
      usedFor: 'Professional notes, wiki links, frontmatter and the portfolio knowledge publishing workflow.',
      why: 'Plain Markdown, offline use, wiki links, portable files, Git-friendly and low lock-in.',
      watch: 'Team collaboration, permission workflows and central administration need additional architecture.',
      whenElse: 'Non-technical teams needing managed multi-user editing, comments and organizational permissions by default.',
      alternatives: ['Confluence / Notion-style collaborative platforms'],
      evidence: [
        { label: 'Knowledge system', href: '#/knowledge', path: 'knowledge' },
        { label: 'Obsidian note', href: '#/knowledge/obsidian-knowledge-management', path: 'knowledge/obsidian-knowledge-management' }
      ]
    },
    {
      id: 'cursor', name: 'Cursor', group: 'build', level: 'used', flagship: true, utility: false,
      purpose: 'AI-assisted implementation, exploration and iteration against requirements.',
      usedFor: 'AI-assisted implementation review and iteration on Skillverse and Catalyx workflows.',
      why: 'Fast iteration when requirements and acceptance criteria are explicit.',
      watch: 'Does not replace requirements ownership, testing or acceptance judgment.',
      whenElse: 'When the work is primarily operational support rather than implementation iteration.',
      alternatives: ['Other AI coding assistants / hosted agent workflows'],
      evidence: [
        { label: 'Skillverse', href: '#/projects/skillverse', path: 'projects/skillverse' },
        { label: 'Catalyx', href: '#/projects/catalyx', path: 'projects/catalyx' }
      ]
    },
    {
      id: 'codex', name: 'OpenAI Codex', group: 'build', level: 'used', flagship: true, utility: false,
      purpose: 'AI-assisted implementation and exploration against structured requirements.',
      usedFor: 'AI-generated implementation support with human validation on project work.',
      why: 'Useful for accelerating implementation drafts when I own workflow definition and fix verification.',
      watch: 'Not evidence of standalone software-engineering ownership; validation remains human.',
      whenElse: 'When local-only constraints or different model characteristics matter more.',
      alternatives: ['Other hosted model / coding-agent options'],
      evidence: [
        { label: 'Skillverse', href: '#/projects/skillverse', path: 'projects/skillverse' },
        { label: 'Catalyx', href: '#/projects/catalyx', path: 'projects/catalyx' }
      ]
    },
    {
      id: 'ollama', name: 'Ollama', group: 'build', level: 'used', flagship: true, utility: false,
      purpose: 'Run compatible language models locally for experimentation.',
      usedFor: 'Local-model experimentation and privacy-conscious AI trials during product delivery work.',
      why: 'Local execution, privacy, model flexibility and reduced hosted dependency for suitable tasks.',
      watch: 'Hardware requirements, model quality, memory constraints and local maintenance.',
      whenElse: 'Best model quality required, limited local hardware, or managed scale/infrastructure needed.',
      alternatives: ['Hosted model APIs / commercial AI assistants'],
      evidence: [
        { label: 'Projects', href: '#/projects', path: 'projects' },
        { label: 'AI notes', href: '#/knowledge/ai-agents-without-fake-coding', path: 'knowledge/ai-agents-without-fake-coding' }
      ]
    },
    {
      id: 'antigravity', name: 'Antigravity', group: 'build', level: 'used', flagship: false, utility: false,
      purpose: 'AI-assisted build tooling used in project delivery.',
      usedFor: 'Part of the AI-assisted implementation toolchain on Skillverse / Catalyx.',
      evidence: [{ label: 'Projects', href: '#/projects', path: 'projects' }]
    },
    {
      id: 'excel', name: 'Excel', group: 'plan', level: 'foundation', flagship: true, utility: false,
      purpose: 'Structured tables, tracking and lightweight analysis.',
      usedFor: 'Working knowledge for lists, tracking and analysis where a spreadsheet is adequate.',
      why: 'Often the simplest adequate tool for small structured datasets.',
      watch: 'Becomes fragile as collaboration, audit and scale requirements grow.',
      whenElse: 'Shared systems of record, stronger permissions or multi-user workflows are required.',
      alternatives: ['Dedicated work-management or BI tools'],
      evidence: []
    },
    {
      id: 'git', name: 'Git', group: 'plan', level: 'building', flagship: false, utility: false,
      purpose: 'Version history and collaboration on source and content.',
      usedFor: 'Building practical depth through knowledge publishing and project workflows.',
      evidence: [{ label: 'Knowledge publishing', href: '#/knowledge', path: 'knowledge' }]
    },
    {
      id: 'windows', name: 'Windows', group: 'investigate', level: 'used', flagship: true, utility: false,
      purpose: 'Endpoint environment for diagnostics and daily technical work.',
      usedFor: 'Processes/services awareness, startup behaviour, networking basics, installs, permissions and practical troubleshooting.',
      why: 'Support work often starts on the operating system the user actually has.',
      watch: 'Depth is troubleshooting-oriented, not enterprise endpoint administration ownership.',
      whenElse: 'When the environment is primarily Linux-server or specialized appliance-based.',
      alternatives: ['macOS / Linux depending on environment'],
      evidence: [{ label: 'Windows troubleshooting', href: '#/knowledge/windows-troubleshooting-checklist', path: 'knowledge/windows-troubleshooting-checklist' }]
    },
    {
      id: 'macos', name: 'macOS', group: 'investigate', level: 'used', flagship: false, utility: false,
      purpose: 'Cross-platform familiarity for client-side troubleshooting contexts.',
      usedFor: 'Practical use and basic diagnostics alongside Windows work.',
      evidence: []
    },
    {
      id: 'postman', name: 'Postman', group: 'investigate', level: 'building', flagship: false, utility: false,
      purpose: 'Inspect and reproduce API behaviour.',
      usedFor: 'Actively building toward application/support readiness — not production API ownership.',
      evidence: []
    },
    {
      id: 'sql', name: 'SQL', group: 'investigate', level: 'building', flagship: false, utility: false,
      purpose: 'Validate records, filters and application data states.',
      usedFor: 'Refreshing and practicing toward support/data validation use — IBM coursework foundation with active rebuild.',
      evidence: []
    },
    {
      id: 'linux', name: 'Linux', group: 'infrastructure', level: 'building', flagship: false, utility: false,
      purpose: 'Basic service and system diagnostics.',
      usedFor: 'Building foundational comfort for support/implementation environments.',
      evidence: [{ label: 'Distro comparison', href: '#/knowledge/debian-fedora-ubuntu', path: 'knowledge/debian-fedora-ubuntu' }]
    },
    {
      id: 'aws', name: 'AWS', group: 'infrastructure', level: 'foundation', flagship: false, utility: false,
      purpose: 'Cloud concepts and service mental models.',
      usedFor: 'Previous Cloud Practitioner certification (earned 2023, expired Apr 2026) — foundation, not current production ops claim.',
      evidence: [{ label: 'Certifications', href: '#/certifications', path: 'certifications' }]
    },
    {
      id: 'java', name: 'Java', group: 'build', level: 'foundation', flagship: false, utility: false,
      purpose: 'Application architecture and backend concepts from formal training.',
      usedFor: 'Wipro Velocity / StackRoute Java Full Stack foundation — may require refresh for hands-on coding.',
      evidence: [{ label: 'Certifications', href: '#/certifications', path: 'certifications' }]
    },
    {
      id: 'localsend', name: 'LocalSend', group: 'plan', level: 'used', flagship: true, utility: false,
      purpose: 'Quick cross-platform file transfer on a local network.',
      usedFor: 'Same-network device-to-device transfer without an intermediate cloud upload.',
      why: 'Simple, local, cross-platform — a narrow tool for a narrow problem.',
      watch: 'Not for remote collaboration, long-term storage or enterprise retention/audit workflows.',
      whenElse: 'Distributed teams, persistent sharing controls or compliance retention are required.',
      alternatives: ['Drive / OneDrive-type cloud services'],
      evidence: [
        { label: 'LocalSend note', href: '#/knowledge/localsend-comparison', path: 'knowledge/localsend-comparison' },
        { label: 'Local file sharing', href: '#/knowledge/local-file-sharing', path: 'knowledge/local-file-sharing' }
      ]
    },
    {
      id: '7zip', name: '7-Zip', group: 'plan', level: 'used', flagship: false, utility: true,
      purpose: 'Archive creation and extraction.',
      usedFor: 'Practical utility familiarity.',
      evidence: [{ label: 'Zip utilities', href: '#/knowledge/zip-utilities-comparison', path: 'knowledge/zip-utilities-comparison' }]
    },
    {
      id: 'vlc', name: 'VLC', group: 'plan', level: 'used', flagship: false, utility: true,
      purpose: 'Broad media playback.',
      usedFor: 'Practical utility familiarity.',
      evidence: [{ label: 'VLC vs PotPlayer', href: '#/knowledge/vlc-vs-potplayer', path: 'knowledge/vlc-vs-potplayer' }]
    },
    {
      id: 'rufus', name: 'Rufus', group: 'plan', level: 'awareness', flagship: false, utility: true,
      purpose: 'Bootable USB creation.',
      usedFor: 'Conceptual familiarity with imaging / USB tooling.',
      evidence: [{ label: 'Rufus vs balenaEtcher', href: '#/knowledge/rufus-vs-balenaetcher', path: 'knowledge/rufus-vs-balenaetcher' }]
    },
    {
      id: 'zap', name: 'OWASP ZAP', group: 'security', level: 'awareness', flagship: false, utility: false,
      purpose: 'Security testing awareness for web applications.',
      usedFor: 'Learning / awareness — not positioning as a security tester.',
      evidence: [{ label: 'OWASP ZAP note', href: '#/knowledge/owasp-zap', path: 'knowledge/owasp-zap' }]
    }
  ];
