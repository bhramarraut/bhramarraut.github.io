/**
 * One-time migration: extract embedded ARTICLES from index.html into knowledge/*.md
 * Run: node scripts/extract_articles_to_md.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const outDir = path.join(root, 'knowledge');
fs.mkdirSync(outDir, { recursive: true });

function stripHtmlToMd(htmlBody) {
  let s = htmlBody;
  s = s.replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<h1[^>]*>/gi, '\n# ');
  s = s.replace(/<h2[^>]*>/gi, '\n## ');
  s = s.replace(/<h3[^>]*>/gi, '\n### ');
  s = s.replace(/<\/?strong>/gi, '**');
  s = s.replace(/<\/?b>/gi, '**');
  s = s.replace(/<\/?em>/gi, '_');
  s = s.replace(/<\/?i>/gi, '_');
  s = s.replace(/<code[^>]*>/gi, '`').replace(/<\/code>/gi, '`');
  s = s.replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  s = s.replace(/<li[^>]*>/gi, '- ');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

function yamlQuote(s) {
  if (s == null) return '""';
  const str = String(s);
  if (/[:#{}[\],&*?|>!%@`]/.test(str) || str.includes('\n') || str.includes('"')) {
    return JSON.stringify(str);
  }
  return JSON.stringify(str);
}

function yamlList(arr, indent = '  ') {
  if (!arr.length) return '[]';
  return '\n' + arr.map((x) => `${indent}- ${yamlQuote(x)}`).join('\n');
}

// Extract ARTICLE_BODY_APPROACH
const bodyMatch = html.match(/const ARTICLE_BODY_APPROACH = `([\s\S]*?)`;\s*\n\s*const ARTICLES/);
const approachHtml = bodyMatch ? bodyMatch[1] : '';

const featured = new Set();
for (const m of html.matchAll(/ARTICLES\.find\(a => a\.slug === '([^']+)'\)\.featured = true/g)) {
  featured.add(m[1]);
}

const startHereMatch = html.match(/const START_HERE = \[([^\]]+)\]/);
const startHere = startHereMatch
  ? [...startHereMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
  : [];

const relatedExtra = {};
const enrichMatch = html.match(/a\.related = \[([^\]]+)\]/);
if (enrichMatch) {
  relatedExtra['approach-application-issue'] = [...enrichMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

const artRe =
  /art\(\s*'([^']+)'\s*,\s*'((?:\\'|[^'])*)'\s*,\s*'([^']+)'\s*,\s*'((?:\\'|[^'])*)'\s*,\s*'((?:\\'|[^'])*)'\s*,\s*(\d+)\s*,\s*(ARTICLE_BODY_APPROACH|'((?:\\'|[^'])*)')\s*,\s*\[([^\]]*)\]\s*\)/g;

let order = 0;
let count = 0;
let m;
while ((m = artRe.exec(html)) !== null) {
  const slug = m[1];
  const title = m[2].replace(/\\'/g, "'");
  const category = m[3];
  const label = m[4].replace(/\\'/g, "'");
  const summary = m[5].replace(/\\'/g, "'");
  const minutes = Number(m[6]);
  const isApproach = m[7] === 'ARTICLE_BODY_APPROACH';
  const bodyHtml = isApproach ? approachHtml : (m[8] || '').replace(/\\'/g, "'").replace(/\\n/g, '\n');
  const keywords = [...m[9].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  order += 1;
  count += 1;

  const related = relatedExtra[slug] || [];
  const isStart = startHere.includes(slug);
  const isFeatured = featured.has(slug) || isStart;

  let markdownBody;
  if (isApproach) {
    // Preserve rich HTML structure inside Obsidian-compatible HTML blocks
    markdownBody =
      `> [!abstract] Framework\n> Reproduce → Observe → Isolate → Document → Validate\n\n` +
      `<!-- portfolio:html -->\n${bodyHtml}\n<!-- /portfolio:html -->\n`;
  } else {
    markdownBody = stripHtmlToMd(bodyHtml);
  }

  const fm = [
    '---',
    `title: ${yamlQuote(title)}`,
    `slug: ${yamlQuote(slug)}`,
    `description: ${yamlQuote(summary)}`,
    `category: ${yamlQuote(category)}`,
    `label: ${yamlQuote(label)}`,
    `tags:${yamlList(keywords.length ? keywords : [category])}`,
    `status: "published"`,
    `featured: ${isFeatured}`,
    `start_here: ${isStart}`,
    `order: ${isStart ? startHere.indexOf(slug) + 1 : 100 + order}`,
    `created: 2026-08-01`,
    `updated: 2026-08-12`,
    `reading_time: ${minutes}`,
    `level: "learning"`,
    `related:${related.length ? yamlList(related) : ' []'}`,
    '---',
    '',
    `# ${title}`,
    '',
    markdownBody,
    ''
  ].join('\n');

  fs.writeFileSync(path.join(outDir, `${slug}.md`), fm, 'utf8');
}

console.log(`Extracted ${count} articles into ${outDir}`);
console.log(`START_HERE (${startHere.length}): ${startHere.join(', ')}`);
