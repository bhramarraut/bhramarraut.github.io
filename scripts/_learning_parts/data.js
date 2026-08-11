  const LEARNING_STAGES = {
    foundation: { id: 'foundation', label: 'Foundation' },
    practicing: { id: 'practicing', label: 'Practicing' },
    applying: { id: 'applying', label: 'Applying' },
    deepening: { id: 'deepening', label: 'Deepening' },
    queued: { id: 'queued', label: 'Queued' }
  };

  const LEARNING_SPRINT = {
    target: 'Improve readiness for Product/Application Support interviews and practical troubleshooting.',
    items: [
      { num: '01', title: 'Practical SQL', detail: 'Querying and data validation' },
      { num: '02', title: 'REST + Postman', detail: 'Requests, responses, JSON, auth basics' },
      { num: '03', title: 'ITSM + Jira Service Management', detail: 'Ticket workflow, incidents, queues, SLA concepts' },
      { num: '04', title: 'Linux fundamentals', detail: 'CLI, processes, services, logs, permissions' },
      { num: '05', title: 'Networking fundamentals', detail: 'DNS, ports, connectivity, HTTP' },
      { num: '06', title: 'Troubleshooting practice', detail: 'Structured reproduce → isolate → document loops' }
    ]
  };

  const LEARNING_TRACKS = [
    {
      id: 'support',
      num: '01',
      title: 'Support & Service Management',
      stage: 'practicing',
      why: 'Build systematic support thinking from issue intake through resolution, escalation and service improvement.',
      foundation: 'Troubleshooting frameworks · expected vs actual · issue reproduction · functional validation · documentation · RCA concepts · Incident / Problem / Change fundamentals',
      now: 'Ticket lifecycle · SLA · priority vs severity · escalation quality · ITSM fundamentals · Jira Service Management concepts',
      next: 'ServiceNow fundamentals · queues / assignment · knowledge management · request / incident workflow · service catalog concepts · basic support reporting',
      later: 'Platform-specific support patterns · L2 troubleshooting depth · service operations maturity',
      outcome: 'Handle increasingly structured support workflows and communicate useful technical evidence across support/engineering boundaries.',
      nextProof: 'Structured incident / ticket workflow simulation — planned',
      knowledge: ['approach-application-issue', 'expected-vs-actual-bug-report', 'what-is-sla', 'priority-vs-severity', 'incident-problem-change', 'rca-not-restart', 'support-escalation-structure'],
      evidence: [{ label: 'Support notes', href: '#/knowledge', path: 'knowledge' }]
    },
    {
      id: 'systems',
      num: '02',
      title: 'Systems & Endpoints',
      stage: 'practicing',
      why: 'Understand the environments where users actually experience application problems.',
      foundation: 'Windows troubleshooting · macOS troubleshooting · application installation · startup behaviour · local utilities · device-level diagnostics',
      now: 'Linux fundamentals · processes · services · permissions · filesystem · logs · package management · command line',
      next: 'Windows deeper diagnostics · Linux service troubleshooting · cross-platform application behaviour · system/resource investigation',
      later: 'Deeper platform endpoint patterns for support scenarios',
      outcome: 'Troubleshoot beyond the application UI and reason about operating-system conditions that may affect application behaviour.',
      nextProof: 'Service / log investigation lab — planned',
      knowledge: ['windows-troubleshooting-checklist', 'windows-startup-troubleshooting', 'windows-commands-toolkit', 'debian-fedora-ubuntu', 'popos-vs-ubuntu'],
      evidence: [{ label: 'Windows notes', href: '#/knowledge/windows-troubleshooting-checklist', path: 'knowledge/windows-troubleshooting-checklist' }]
    },
    {
      id: 'data-api',
      num: '03',
      title: 'Data & APIs',
      stage: 'practicing',
      why: 'Move from UI-only troubleshooting toward understanding application data and request/response behaviour.',
      foundation: 'Relational concepts · HTTP status awareness · JSON familiarity',
      now: 'Practical SQL (SELECT, WHERE, JOIN, GROUP BY, ORDER BY, aggregations) · REST fundamentals · HTTP methods · headers · Postman · request/response inspection',
      next: 'API authentication concepts · pagination · filters · error responses · collections · environment variables · data-state validation',
      later: 'API integration troubleshooting · cross-system data flow · implementation validation',
      outcome: 'Trace an issue one layer deeper — from visible behaviour toward API response and data state.',
      nextProof: 'SQL support-data investigation + API troubleshooting lab — planned',
      knowledge: [],
      evidence: [{ label: 'Support Lab (HTTP)', href: '#/support-lab', path: 'support-lab' }]
    },
    {
      id: 'networking',
      num: '04',
      title: 'Networking & Platform',
      stage: 'practicing',
      why: 'Understand connectivity as part of application support — so environment problems are not mistaken for product defects.',
      foundation: 'Client/server mental model · basic HTTP awareness',
      now: 'DNS · IP addressing · ports · HTTP/HTTPS · latency/timeouts · firewall awareness · proxy/VPN concepts · ping / nslookup / tracert familiarity',
      next: 'TLS/certificate fundamentals · reverse proxy concepts · load balancer concepts · network path troubleshooting',
      later: 'Richer platform networking patterns for SaaS support',
      outcome: 'Differentiate application behaviour from connectivity/environment problems.',
      nextProof: 'DNS investigation lab — planned',
      knowledge: ['dns-troubleshooting'],
      evidence: [{ label: 'DNS note', href: '#/knowledge/dns-troubleshooting', path: 'knowledge/dns-troubleshooting' }]
    },
    {
      id: 'cloud-devops',
      num: '05',
      title: 'Cloud & DevOps Foundations',
      stage: 'foundation',
      why: 'Understand where modern applications run and how deployment/configuration changes can influence support behaviour — not DevOps engineering positioning.',
      foundation: 'AWS Cloud Practitioner history · cloud concepts · compute/storage/networking · IAM concepts · shared responsibility',
      now: 'AWS fundamentals refresh · IAM · EC2/S3/VPC/CloudWatch concepts · Git / version-control workflow practice',
      next: 'GCP fundamentals · CI/CD concepts · containers/Docker fundamentals · deployment lifecycle · observability (logs, metrics, monitoring, alerts)',
      later: 'Enough modern SaaS runtime/deployment literacy to support and implement platforms more effectively',
      outcome: 'Map support symptoms to cloud/platform layers without claiming infrastructure ownership.',
      nextProof: 'Cloud concept refresh note — planned',
      knowledge: [],
      evidence: [{ label: 'Certifications', href: '#/certifications', path: 'certifications' }]
    },
    {
      id: 'ops-analytics',
      num: '06',
      title: 'Operations & Analytics',
      stage: 'queued',
      why: 'Use structured data for operational visibility — Support Ops, Product Ops and implementation reporting — not a separate Data Analyst career track.',
      foundation: 'Excel working knowledge',
      now: 'Queued behind SQL/API/ITSM/Linux/Networking sprint',
      next: 'Advanced Excel refresh · Power Query · PivotTables · structured reporting · Power BI basics · operational reporting',
      later: 'Connect SQL + support data into repeatable operational views',
      outcome: 'Turn operational data into structured reporting and actionable visibility.',
      nextProof: 'Operational reporting mini-lab — planned',
      knowledge: [],
      evidence: []
    },
    {
      id: 'ai-implementation',
      num: '07',
      title: 'AI & Implementation',
      stage: 'applying',
      why: 'Use AI as an implementation and reasoning accelerator without confusing AI output with human expertise.',
      foundation: 'Cursor · OpenAI Codex · Antigravity · Ollama · requirements decomposition · functional validation · fix verification',
      now: 'Better acceptance criteria · tool selection · local vs hosted models · context management · validation discipline',
      next: 'AI-assisted support workflows · documentation automation · issue analysis assistance · knowledge retrieval',
      later: 'Responsible AI-supported implementation processes',
      outcome: 'Accelerate implementation and analysis while keeping requirements, judgment, testing and accountability human-owned.',
      nextProof: 'Continue documenting AI-assisted delivery patterns in Knowledge',
      knowledge: ['ai-agents-without-fake-coding', 'ai-assisted-requirements', 'ai-acceptance-criteria', 'agentic-vs-conventional-coding'],
      evidence: [
        { label: 'Skillverse', href: '#/projects/skillverse', path: 'projects/skillverse' },
        { label: 'Catalyx', href: '#/projects/catalyx', path: 'projects/catalyx' }
      ]
    }
  ];

  const LEARNING_CONVERGENCE = [
    {
      title: 'Application Support',
      equation: 'Systems + Networking + HTTP/API + SQL + ITSM',
      result: 'Better issue isolation and escalation quality'
    },
    {
      title: 'Platform Support',
      equation: 'Linux + Cloud + Networking + APIs + Observability',
      result: 'Deeper understanding of how SaaS platforms run'
    },
    {
      title: 'Implementation',
      equation: 'Requirements + Workflows + APIs + Data + Cloud concepts + Documentation',
      result: 'Better configuration, validation and handover'
    },
    {
      title: 'Support Operations',
      equation: 'ITSM + Excel + SQL + Power Query / BI',
      result: 'Better operational reporting and process visibility'
    },
    {
      title: 'AI-Assisted Delivery',
      equation: 'Requirements + AI tools + Validation + Documentation + Work tracking',
      result: 'Faster delivery with human accountability'
    }
  ];

  const LEARNING_FOUNDATIONS = [
    { title: 'Java / Full Stack', detail: 'Wipro Velocity / StackRoute · 2022', label: 'Foundation' },
    { title: 'AWS', detail: 'Cloud Practitioner · earned 2023 · expired Apr 2026', label: 'Certification history' },
    { title: 'Scrum', detail: 'PSM I · 2026', label: 'Credential' },
    { title: 'AI-assisted delivery', detail: 'Skillverse + Catalyx · 2026', label: 'Applied project work' },
    { title: 'Systems', detail: 'Windows / macOS troubleshooting', label: 'Practical familiarity' },
    { title: 'Work tracking', detail: 'OpenProject on delivery work', label: 'Used in workflow' }
  ];

  const LEARNING_JOURNEY = [
    { when: '2022', text: 'Java Full Stack foundation — Wipro Velocity / StackRoute' },
    { when: '2023', text: 'AWS Cloud Practitioner — cloud concepts foundation' },
    { when: '2026', text: 'PSM I · AI-assisted product delivery on Skillverse + Catalyx' },
    { when: 'Now', text: 'SQL · APIs/Postman · ITSM/JSM · Linux · Networking' },
    { when: 'Next', text: 'Cloud refresh · monitoring · DevOps foundations · ServiceNow fundamentals' },
    { when: 'Later', text: 'Implementation depth · integrations · platform troubleshooting' }
  ];
