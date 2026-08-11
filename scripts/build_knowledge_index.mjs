/**
 * Build knowledge-index.json from knowledge/*.md
 * Run: node scripts/build_knowledge_index.mjs
 *
 * Mirrors scripts/build_knowledge_index.py for local/dev without Python.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');
const OUT_PATH = path.join(ROOT, 'knowledge-index.json');

const FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;
const WIKI_RE = /\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g;
const TAG_RE = /(?<!\w)#([A-Za-z0-9/_-]+)/g;
const HTML_BLOCK_RE = /<!--\s*portfolio:html\s*-->([\s\S]*?)<!--\s*\/portfolio:html\s*-->/gi;
const WORD_RE = /[A-Za-z0-9']+/g;

function parseFrontmatter(text) {
  const m = text.match(FRONTMATTER_RE);
  if (!m) return { meta: {}, body: text };
  const raw = m[1].replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const body = text.slice(m[0].length);
  const meta = {};
  let key = null;
  for (const line of raw.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && key) {
      if (!Array.isArray(meta[key])) meta[key] = meta[key] == null ? [] : [meta[key]];
      let v = listItem[1].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      meta[key].push(v);
      continue;
    }
    const km = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!km) continue;
    key = km[1];
    let val = km[2].trim();
    if (val === '' || val === '[]') {
      meta[key] = [];
      continue;
    }
    if (val === 'true' || val === 'false') {
      meta[key] = val === 'true';
      continue;
    }
    if (/^-?\d+$/.test(val)) {
      meta[key] = Number(val);
      continue;
    }
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      meta[key] = JSON.parse(val.includes('"') ? val : `"${val.slice(1, -1)}"`);
      // simpler:
      meta[key] = val.slice(1, -1);
      continue;
    }
    meta[key] = val;
  }
  return { meta, body };
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function estimateMinutes(text, override) {
  if (override != null && override !== '' && override !== 'auto') {
    const n = Number(override);
    if (!Number.isNaN(n)) return Math.max(1, n);
  }
  const words = (String(text).replace(/<[^>]+>/g, ' ').match(WORD_RE) || []).length;
  return Math.max(1, Math.round(words / 220) || 1);
}

function resolveWikiLinks(md, known) {
  return md.replace(WIKI_RE, (_, target, label) => {
    const labelText = (label || target).trim();
    let slug = slugify(target);
    if (!known.has(slug)) {
      const cand = target.trim();
      if (known.has(cand)) slug = cand;
      else return labelText;
    }
    return `<a href="#/knowledge/${slug}" data-nav-link="knowledge/${slug}">${labelText}</a>`;
  });
}

function inlineFormat(text) {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function naiveMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;
  let para = [];

  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p>${inlineFormat(para.join(' '))}</p>`);
    para = [];
  };
  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };

  for (const line of lines) {
    if (!line.trim()) { flushPara(); closeLists(); continue; }
    const hm = line.match(/^(#{1,3})\s+(.*)$/);
    if (hm) {
      flushPara(); closeLists();
      const level = hm[1].length;
      out.push(`<h${level}>${inlineFormat(hm[2])}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      if (inOl) { out.push('</ol>'); inOl = false; }
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inlineFormat(line.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${inlineFormat(line.replace(/^\d+\.\s+/, ''))}</li>`);
      continue;
    }
    if (line.trim().startsWith('>')) {
      flushPara(); closeLists();
      out.push(`<blockquote><p>${inlineFormat(line.replace(/^>\s?/, ''))}</p></blockquote>`);
      continue;
    }
    para.push(line.trim());
  }
  flushPara();
  closeLists();
  return out.join('\n');
}

function markdownToHtml(md) {
  const htmlParts = [];
  md = md.replace(HTML_BLOCK_RE, (_, html) => {
    htmlParts.push(html.trim());
    return `\n\n@@HTMLBLOCK${htmlParts.length - 1}@@\n\n`;
  });
  let html = naiveMarkdown(md);
  htmlParts.forEach((block, i) => {
    html = html.replace(`<p>@@HTMLBLOCK${i}@@</p>`, block).replace(`@@HTMLBLOCK${i}@@`, block);
  });
  return html;
}

function loadArticles() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) throw new Error(`Missing ${KNOWLEDGE_DIR}`);
  const files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith('.md')).sort();
  if (!files.length) throw new Error('No Markdown files found');

  const drafts = files.map((file) => {
    const text = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), 'utf8');
    const { meta, body } = parseFrontmatter(text);
    const slug = String(meta.slug || path.basename(file, '.md')).trim();
    return { file, meta, body, slug };
  });
  const known = new Set(drafts.map((d) => d.slug));

  const articles = [];
  for (const { file, meta, body, slug } of drafts) {
    const status = String(meta.status || 'published').toLowerCase();
    if (['draft', 'private', 'hidden'].includes(status)) continue;

    const title = String(meta.title || slug);
    const description = String(meta.description || meta.summary || '');
    const category = String(meta.category || 'tools').toLowerCase();
    const label = String(meta.label || 'NOTE');
    let tags = meta.tags || [];
    if (typeof tags === 'string') tags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    tags = tags.map(String);

    let related = meta.related || [];
    if (typeof related === 'string') related = [related];
    related = related.map((r) => String(r).trim()).filter(Boolean);

    let bodyLinked = resolveWikiLinks(body, known);
    bodyLinked = bodyLinked.replace(new RegExp(`^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n+`, 'i'), '');
    const html = markdownToHtml(bodyLinked);
    const minutes = estimateMinutes(`${body} ${description}`, meta.reading_time);

    // Obsidian inline tags only — ignore hash routes (#/knowledge/...) and numeric IDs (#1842)
    const mdForTags = body.replace(HTML_BLOCK_RE, ' ').replace(/```[\s\S]*?```/g, ' ');
    for (const tag of mdForTags.matchAll(TAG_RE)) {
      const t = tag[1];
      if (!t || t.startsWith('/') || /^\d+$/.test(t)) continue;
      if (!tags.includes(t)) tags.push(t);
    }

    articles.push({
      slug,
      title,
      description,
      summary: description,
      category,
      label,
      tags,
      keywords: tags,
      status: 'published',
      featured: Boolean(meta.featured),
      start_here: Boolean(meta.start_here),
      order: Number(meta.order || 999),
      created: String(meta.created || ''),
      updated: String(meta.updated || meta.created || ''),
      minutes,
      level: String(meta.level || 'learning'),
      aliases: meta.aliases || [],
      related,
      deck: String(meta.deck || description),
      path: `knowledge/${file}`,
      bodyHtml: html,
      content_hash: crypto.createHash('sha1').update(title + description + body).digest('hex').slice(0, 12)
    });
  }

  articles.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  return articles;
}

const articles = loadArticles();
const startHere = articles.filter((a) => a.start_here).sort((a, b) => a.order - b.order).map((a) => a.slug);
const categories = [...new Set(articles.map((a) => a.category))].sort();

const payload = {
  generated_at: new Date().toISOString(),
  generator: 'scripts/build_knowledge_index.mjs',
  count: articles.length,
  categories,
  start_here: startHere,
  articles
};

fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`[build_knowledge_index] Wrote ${OUT_PATH} (${articles.length} articles)`);
console.log(`[build_knowledge_index] Categories: ${categories.join(', ')}`);
console.log(`[build_knowledge_index] Start here: ${startHere.join(', ') || '(none)'}`);
