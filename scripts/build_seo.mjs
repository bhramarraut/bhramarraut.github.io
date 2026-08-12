import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '_site');
const BASE_URL = 'https://bhramarraut.github.io';

// Ensure output directory exists and is clean
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUT_DIR);

// SEO Metadata mapping
const SEO_ROUTES = {
  'home': { 
    path: '/', 
    title: 'Bhramar Raut | Product Support & Application Support Portfolio',
    desc: 'Former Wipro Project Engineer targeting Product Support, Application Support and Implementation roles. PSM I certified with project-based experience in functional validation, SaaS workflows, troubleshooting and AI-assisted product delivery.',
    viewId: 'view-home',
    type: 'ProfilePage'
  },
  'profile': { 
    path: '/profile/', 
    title: 'About Bhramar Raut | Product Support & Implementation',
    desc: 'Origin, approach, and principles of Bhramar Raut. Former Wipro Project Engineer focused on product delivery, functional validation and support operations.',
    viewId: 'view-profile',
    type: 'ProfilePage'
  },
  'experience': { 
    path: '/experience/', 
    title: 'Experience | Bhramar Raut — Former Wipro Project Engineer',
    desc: 'Career journey of Bhramar Raut, including Wipro Project Engineer experience, project-based product delivery, business operations and engineering internship experience.',
    viewId: 'view-experience',
    type: 'ProfilePage'
  },
  'projects': { 
    path: '/projects/', 
    title: 'Product Support & SaaS Validation Projects | Bhramar Raut',
    desc: 'Selected work by Bhramar Raut across Skillverse.in, Catalyx, BrickBillion Properties and engineering/research projects, with emphasis on workflows, functional validation and structured delivery.',
    viewId: 'view-projects',
    type: 'CollectionPage'
  },
  'projects/skillverse': { 
    path: '/projects/skillverse/', 
    title: 'Skillverse.in Case Study | Functional Validation & AI-Assisted Delivery',
    desc: 'Case study on functional validation and AI-assisted delivery for Skillverse.in by Bhramar Raut.',
    viewId: 'view-project-skillverse',
    type: 'Article'
  },
  'projects/catalyx': { 
    path: '/projects/catalyx/', 
    title: 'Catalyx Case Study | SaaS Workflow & Role-Based Validation',
    desc: 'Case study on SaaS workflow validation and role-based access testing for Catalyx by Bhramar Raut.',
    viewId: 'view-project-catalyx',
    type: 'Article'
  },
  'capabilities': { 
    path: '/capabilities/', 
    title: 'Product & Application Support Capabilities | Bhramar Raut',
    desc: 'Core capabilities in application support, product support, troubleshooting, documentation, and workflow validation by Bhramar Raut.',
    viewId: 'view-capabilities',
    type: 'WebPage'
  },
  'knowledge': { 
    path: '/knowledge/', 
    title: 'Product Support, ITSM & Troubleshooting Notes | Bhramar Raut',
    desc: 'Practical notes by Bhramar Raut on application support, troubleshooting, ITSM, SaaS workflows, Windows, AI-assisted delivery, Scrum and technical tools.',
    viewId: 'view-knowledge',
    type: 'CollectionPage'
  },
  'toolbox': { 
    path: '/toolbox/', 
    title: 'Support, Open-Source & Delivery Tooling | Bhramar Raut',
    desc: 'Support, open-source and product delivery tooling curated by Bhramar Raut. Focus on problem-solving workflows over software logos.',
    viewId: 'view-toolbox',
    type: 'WebPage'
  },
  'learning': { 
    path: '/learning/', 
    title: 'Technical Learning Roadmap | SQL, APIs, ITSM & Linux | Bhramar Raut',
    desc: 'Continuous technical learning roadmap of Bhramar Raut covering SQL fundamentals, REST APIs, ITSM, Jira Service Management, Linux, and Cloud.',
    viewId: 'view-learning',
    type: 'WebPage'
  },
  'support-lab': { 
    path: '/support-lab/', 
    title: 'Application Support Troubleshooting Lab | Bhramar Raut',
    desc: 'Hands-on application support troubleshooting lab by Bhramar Raut.',
    viewId: 'view-support-lab',
    type: 'WebPage'
  },
  'certifications': { 
    path: '/certifications/', 
    title: 'Certifications | PSM I, AWS, SQL & Java | Bhramar Raut',
    desc: 'Professional certifications of Bhramar Raut, including Professional Scrum Master I (PSM I), AWS Cloud Practitioner, IBM SQL, and Java Full Stack.',
    viewId: 'view-certifications',
    type: 'WebPage'
  },
  'research': { 
    path: '/research/', 
    title: 'Construction Sector COVID-19 Research | Bhramar Raut',
    desc: 'A team study of construction-sector disruption during COVID-19 — from economic impact to project recovery measures.',
    viewId: 'view-research',
    type: 'ScholarlyArticle'
  },
  'recruiter': { 
    path: '/recruiter/', 
    title: 'Bhramar Raut Resume | Product Support & Implementation',
    desc: 'Concise recruiter profile for Bhramar Raut covering Wipro experience, product-support capabilities, project work, certifications and current technical direction.',
    viewId: 'view-recruiter',
    type: 'ProfilePage'
  },
  'contact': { 
    path: '/contact/', 
    title: 'Contact Bhramar Raut | Product Support & Implementation',
    desc: 'Contact information for Bhramar Raut. Seeking roles in Product Support, Application Support, and Implementation.',
    viewId: 'view-contact',
    type: 'ContactPage'
  },
  '404': { 
    path: '/404.html', 
    title: 'Page Not Found | Bhramar Raut',
    desc: 'The requested page could not be found.',
    viewId: 'view-404',
    type: 'WebPage'
  }
};

const INDEX_HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Copy static files/dirs
const staticAssets = ['assets', 'data', 'knowledge', 'support-lab', 'Profile Pic', 'knowledge-index.json', 'CNAME'];
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
staticAssets.forEach(asset => copyRecursiveSync(path.join(ROOT, asset), path.join(OUT_DIR, asset)));
copyRecursiveSync(path.join(ROOT, 'index.html'), path.join(OUT_DIR, 'index.html'));

let sitemapUrls = [];

function escapeHtml(unsafe) {
  return (unsafe || '').toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateSchema(routeObj, articleData = null) {
  let schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Bhramar Raut",
        "url": BASE_URL,
        "image": `${BASE_URL}/assets/og/bhramar-raut-portfolio.jpg`,
        "jobTitle": "Product Support & Implementation",
        "description": "Former Wipro Project Engineer targeting Product Support, Application Support and Implementation roles. PSM I certified.",
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "Shri Ramdeobaba College of Engineering and Management" },
        "sameAs": ["https://www.linkedin.com/in/bhramarraut", "https://github.com/bhramarraut"]
      }
    ]
  };

  if (routeObj.type === 'ProfilePage' || routeObj.type === 'WebPage' || routeObj.type === 'CollectionPage' || routeObj.type === 'ContactPage') {
    schema["@graph"].push({
      "@type": routeObj.type,
      "mainEntity": { "@id": `${BASE_URL}/#person` },
      "url": `${BASE_URL}${routeObj.path}`
    });
  } else if (routeObj.type === 'ScholarlyArticle') {
    schema["@graph"].push({
      "@type": "ScholarlyArticle",
      "headline": "Economic Impact on Construction Sector Due to COVID-19",
      "author": [
        { "@type": "Person", "name": "Monica R Seth" },
        { "@type": "Person", "name": "Kunal Gupta" },
        { "@type": "Person", "name": "Akshat Waghmare" },
        { "@type": "Person", "name": "Arudati Manhas" },
        { "@type": "Person", "name": "Sumit Mishra" },
        { "@type": "Person", "@id": `${BASE_URL}/#person` }
      ],
      "datePublished": "2020",
      "url": `${BASE_URL}${routeObj.path}`
    });
  }

  if (routeObj.type === 'Article' || (articleData && articleData.slug)) {
    let articleType = "TechArticle";
    let headline = articleData ? articleData.title : routeObj.title;
    let desc = articleData ? articleData.description : routeObj.desc;
    let url = `${BASE_URL}${routeObj.path}`;
    
    let articleSchema = {
      "@type": articleType,
      "headline": headline,
      "description": desc,
      "author": { "@id": `${BASE_URL}/#person` },
      "mainEntityOfPage": { "@type": "WebPage", "@id": url },
      "url": url
    };
    if (articleData && articleData.updated) {
      articleSchema["dateModified"] = articleData.updated;
    }
    schema["@graph"].push(articleSchema);
  }

  // Breadcrumb Schema
  if (routeObj.path !== '/' && routeObj.path !== '/404.html') {
    let parts = routeObj.path.split('/').filter(Boolean);
    let breadcrumbList = {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        }
      ]
    };
    
    let currentPath = '';
    for (let i = 0; i < parts.length; i++) {
      currentPath += '/' + parts[i];
      let name = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
      if (articleData && i === parts.length - 1) name = articleData.title;
      
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": i + 2,
        "name": name.replace(/-/g, ' '),
        "item": `${BASE_URL}${currentPath}/`
      });
    }
    schema["@graph"].push(breadcrumbList);
  }

  return JSON.stringify(schema, null, 2);
}

function injectMetadata(html, routeObj, articleData = null) {
  let title = articleData ? `${articleData.title} | Bhramar Raut` : routeObj.title;
  let desc = articleData ? articleData.description : routeObj.desc;
  let url = `${BASE_URL}${routeObj.path}`;
  let ogType = articleData ? 'article' : (routeObj.path === '/404.html' ? 'website' : 'website');

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta id="meta-description" name="description" content=".*?">/s, 
    `<meta id="meta-description" name="description" content="${escapeHtml(desc)}">`);
  
  // Replace OG Tags
  html = html.replace(/<meta property="og:type" content=".*?">/s, `<meta property="og:type" content="${ogType}">`);
  html = html.replace(/<meta id="og-title" property="og:title" content=".*?">/s, `<meta id="og-title" property="og:title" content="${escapeHtml(title)}">`);
  html = html.replace(/<meta id="og-description" property="og:description" content=".*?">/s, `<meta id="og-description" property="og:description" content="${escapeHtml(desc)}">`);
  html = html.replace(/<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${url}">`);
  
  // Replace Twitter Tags
  html = html.replace(/<meta id="twitter-title" name="twitter:title" content=".*?">/s, `<meta id="twitter-title" name="twitter:title" content="${escapeHtml(title)}">`);
  html = html.replace(/<meta id="twitter-description" name="twitter:description" content=".*?">/s, `<meta id="twitter-description" name="twitter:description" content="${escapeHtml(desc)}">`);
  
  // Canonical
  html = html.replace(/<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="${url}">`);

  // Strip non-active views to ensure Google indexes correctly
  const viewsToKeep = [routeObj.viewId];
  html = html.replace(/<section id="(view-[^"]+)" class="view(?: active)?"[\s\S]*?<\/section>\s*(?=<!-- VIEW:|<\/main>)/gi, (match, viewId) => {
    if (viewsToKeep.includes(viewId)) {
      // Make it active
      return match.replace(/class="view"/, 'class="view active"');
    }
    return '';
  });

  // Inject Schema
  const schemaStr = generateSchema(routeObj, articleData);
  html = html.replace(/<script type="application\/ld\+json">.*?<\/script>/s, `<script type="application/ld+json">\n${schemaStr}\n</script>`);

  return html;
}

// Generate Static Core Routes
for (const [key, routeObj] of Object.entries(SEO_ROUTES)) {
  let html = injectMetadata(INDEX_HTML, routeObj);
  
  // Create directory
  let destPath;
  if (routeObj.path === '/') destPath = path.join(OUT_DIR, 'index.html');
  else if (routeObj.path.endsWith('.html')) destPath = path.join(OUT_DIR, routeObj.path);
  else {
    fs.mkdirSync(path.join(OUT_DIR, routeObj.path), { recursive: true });
    destPath = path.join(OUT_DIR, routeObj.path, 'index.html');
  }

  fs.writeFileSync(destPath, html, 'utf8');
  
  if (routeObj.path !== '/404.html') {
    sitemapUrls.push({ url: `${BASE_URL}${routeObj.path}` });
  }
}

// Generate Knowledge Articles
const knowledgeIndex = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge-index.json'), 'utf8'));
for (const article of knowledgeIndex.articles) {
  const routeObj = {
    path: `/knowledge/${article.slug}/`,
    title: article.title,
    desc: article.description,
    viewId: 'view-knowledge-article',
    type: 'Article'
  };

  let html = injectMetadata(INDEX_HTML, routeObj, article);
  
  // Inject article body HTML into the container
  const articleHtml = `
      <div class="article-shell">
        <nav class="breadcrumb"><a href="/knowledge/" data-nav-link="knowledge">Knowledge</a><span>/</span><span>${escapeHtml(article.title)}</span></nav>
        <div class="article-layout">
          <div class="article-main">
            <header class="article-header">
              <p class="article-kicker">Knowledge / ${escapeHtml(article.category)}</p>
              <h1 id="article-heading">${escapeHtml(article.title)}</h1>
              <p class="article-deck">${escapeHtml(article.deck || article.summary)}</p>
            </header>
            <div class="article-body">${article.bodyHtml}</div>
          </div>
        </div>
      </div>
  `;
  
  html = html.replace(/<div class="page-inner" id="article-container"><\/div>/, `<div class="page-inner" id="article-container">\n${articleHtml}\n</div>`);

  fs.mkdirSync(path.join(OUT_DIR, routeObj.path), { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, routeObj.path, 'index.html'), html, 'utf8');

  sitemapUrls.push({ url: `${BASE_URL}${routeObj.path}`, lastmod: article.updated });
}

// Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
for (const loc of sitemapUrls) {
  sitemapXml += `  <url>\n    <loc>${loc.url}</loc>\n`;
  if (loc.lastmod) sitemapXml += `    <lastmod>${loc.lastmod}</lastmod>\n`;
  sitemapXml += `  </url>\n`;
}
sitemapXml += `</urlset>\n`;
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robotsTxt, 'utf8');

console.log('SEO build completed successfully. Output in _site/');
