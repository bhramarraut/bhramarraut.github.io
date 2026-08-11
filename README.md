# Bhramar Raut — Professional Portfolio

Personal portfolio of **Bhramar Raut**, a former Wipro Project Engineer currently building toward **Product Support, Application Support, SaaS Support, Implementation, and Product Operations** roles.

🌐 **Live Portfolio:** [bhramarraut.github.io](https://bhramarraut.github.io/)

---

## About Me

I am a Civil Engineering graduate from **Shri Ramdeobaba College of Engineering and Management (RCOEM), Nagpur**, with:

- 2+ years of employment at **Wipro Limited**
- Formal **Java Full Stack** training through Wipro Velocity / StackRoute
- **Professional Scrum Master I (PSM I)** certification
- AWS Cloud Practitioner certification history
- IBM SQL / Database coursework
- Project-based experience in **AI-assisted product delivery**
- Functional testing and UAT-style validation
- Requirements and workflow decomposition
- Issue reproduction and fix validation
- Technical documentation
- OpenProject work-item tracking
- Windows / macOS troubleshooting

I am currently strengthening practical knowledge in:

`SQL` · `REST APIs` · `Postman` · `HTTP` · `ITSM` · `Linux` · `Networking`

---

## Featured Product Work

### Skillverse.in

Multi-role EdTech product work involving:

- Registration and onboarding
- Authentication
- Courses
- Library
- Payments and entitlements
- Administration
- User-flow validation
- Functional testing
- Issue reproduction
- Expected-vs-actual documentation
- Fix validation

AI-assisted implementation tools included:

`Cursor` · `OpenAI Codex` · `Antigravity` · `Ollama`

---

### Catalyx

Admissions and revenue-operations product work covering **10+ operational modules** and **7 user-role concepts**.

Areas included:

- Lead management
- Follow-ups and tasks
- Counselors
- Branch management
- Campaigns
- Reporting
- Notifications
- Audit logs
- Permissions
- Administration
- Role-based access behavior

---

## Portfolio Features

The website includes:

- Recruiter-focused Home page
- Professional profile
- Career timeline
- Skillverse case study
- Catalyx case study
- Capabilities and skill matrix
- Certification viewer
- Research publication
- Technical knowledge center
- Support troubleshooting lab
- Tool and software knowledge base
- Learning roadmap
- Recruiter Mode
- Print / Save-as-PDF recruiter profile
- Dark / Light theme
- Responsive mobile design
- Command palette
- Client-side search
- SEO and structured data

---

## Certifications

Highlights include:

- **Professional Scrum Master I (PSM I)** — Scrum.org, 2026
- **AWS Certified Cloud Practitioner (CLF-C01)** — earned 2023
- **Databases and SQL for Data Science with Python** — IBM / Coursera
- **Certificate Program in Java Full Stack** — Wipro Velocity / StackRoute
- **AWS Cloud Practitioner Essentials** — AWS Training
- **Data Privacy Awareness** — Wipro
- **Fundamentals of Digital Marketing** — Google Digital Garage
- **Robotics: Aerial Robotics** — University of Pennsylvania / Coursera

> AWS Certified Cloud Practitioner credential expired in April 2026 and is presented as certification history rather than an active certification.

---

## Research

Co-author of:

**Economic Impact on Construction Sector Due to COVID-19**

Journal of Seybold Report  
Volume 15 · Issue 8 · 2020  
ISSN: 1533-9211

---

## Tech Behind This Portfolio

This site is intentionally built as a lightweight static portfolio using:

- HTML5
- CSS3
- Vanilla JavaScript
- GSAP
- Bootstrap Icons
- Montserrat
- GitHub Pages

No React, Next.js, backend, database, or CMS is required.

The UI stays vanilla HTML/CSS/JS in `index.html`. Knowledge content lives in Markdown (Obsidian-compatible) and is discovered via a generated manifest so the site stays deployable on GitHub Pages.

---

## Knowledge library (Obsidian → portfolio)

Source of truth: `knowledge/*.md` with YAML frontmatter.

```
knowledge/*.md
        ↓
node scripts/build_knowledge_index.mjs
        ↓
knowledge-index.json
        ↓
index.html Knowledge UI
```

**Local workflow**

1. Open `knowledge/` in Obsidian (or any Markdown editor).
2. Add or edit a note with frontmatter (`title`, `slug`, `category`, `tags`, `status`, etc.).
3. Rebuild the catalog:

```bash
node scripts/build_knowledge_index.mjs
```

4. Preview over HTTP (required — `fetch` will not work from `file://`):

```bash
npx --yes serve .
```

5. Commit both the Markdown and updated `knowledge-index.json` (or push Markdown only and let CI regenerate the index).

**CI:** `.github/workflows/build-knowledge-index.yml` rebuilds `knowledge-index.json` when `knowledge/**` changes and commits the result.

Do not embed articles in `index.html`. The browser never directory-scans `knowledge/`; it only loads the generated manifest.

---

## Career Direction

I am currently targeting opportunities such as:

- Product Support
- Application Support
- SaaS Support
- Technical Support
- Implementation Support
- Implementation Specialist
- Product Operations
- Project Coordination / PMO Support

My longer-term direction is toward technically deeper work involving:

**APIs · integrations · cloud · troubleshooting · implementation · solutions engineering**

---

## Contact

**Bhramar Raut**  
Pandhurna, Madhya Pradesh, India

📧 [raut.bhramar@gmail.com](mailto:raut.bhramar@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/bhramarraut)  
💻 [GitHub](https://github.com/bhramarraut)  
🌐 [Portfolio](https://bhramarraut.github.io/)

**Availability:** Immediate Joiner

---

## Note

This portfolio distinguishes between:

- formal employment
- project-based experience
- formal training
- hands-on knowledge
- foundational knowledge
- subjects currently being learned

The objective is to present **real work and evidence clearly without overstating production experience**.

---

© 2026 Bhramar Raut
