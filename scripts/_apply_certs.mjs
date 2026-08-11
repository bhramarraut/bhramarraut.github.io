import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const parts = path.join(root, 'scripts', '_cert_parts');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');

const css = fs.readFileSync(path.join(parts, 'styles.css'), 'utf8');
const view = fs.readFileSync(path.join(parts, 'view.html'), 'utf8').trim() + '\n\n';
const data = fs.readFileSync(path.join(parts, 'data.js'), 'utf8').replace(/\s+$/, '');
const render = fs.readFileSync(path.join(parts, 'render.js'), 'utf8').replace(/\s+$/, '');

// Replace certifications CSS block
const newCss = /\/\* ===== CERTIFICATIONS \/ CREDENTIALS ===== \*\/[\s\S]*?(?=\/\* WORKBENCH \*\/\r?\n\/\* ===== SUPPORT LAB ===== \*\/)/;
const oldCss = /\/\* CERT \*\/\r?\n\.cert-feature\{[\s\S]*?\.cert-card:hover\{transform:translateY\(-2px\)\}\r?\n/;
if (newCss.test(html)) {
  html = html.replace(newCss, () => css + '\n');
} else if (oldCss.test(html)) {
  html = html.replace(oldCss, () => css + '\n');
} else if (!html.includes('#view-certifications {')) {
  html = html.replace('/* ===== SUPPORT LAB ===== */', () => css + '\n/* ===== SUPPORT LAB ===== */');
}

// Replace view
const viewRe = /<!-- VIEW: CERTIFICATIONS -->[\s\S]*?(?=<!-- VIEW: RESEARCH -->)/;
if (!viewRe.test(html)) throw new Error('Certifications view not found');
html = html.replace(viewRe, () => view);

// Replace credential data block (types + credentials + timeline)
const dataRe = /  const CREDENTIAL_TYPES = \{[\s\S]*?\];\r?\n\r?\n  const CREDENTIAL_TIMELINE = \[[\s\S]*?\];\r?\n/;
const dataReLegacy = /  const CREDENTIALS = \[[\s\S]*?\];\r?\n/;
if (dataRe.test(html)) {
  html = html.replace(dataRe, () => data + '\n\n');
} else if (dataReLegacy.test(html)) {
  html = html.replace(dataReLegacy, () => data + '\n\n');
} else {
  throw new Error('CREDENTIALS data not found');
}

// Replace renderCerts + openCert through COMMAND PALETTE
const renderRe = /  \/\/ CERTIFICATIONS\r?\n  function credentialTypeLabel\([\s\S]*?\n  function openCert\([\s\S]*?\n  \}\r?\n  \/\/ COMMAND PALETTE/;
const renderReLegacy = /  \/\/ CERTIFICATIONS\r?\n  function renderCerts\(\) \{[\s\S]*?\n  function openCert\([\s\S]*?\n  \}\r?\n  \/\/ COMMAND PALETTE/;
if (renderRe.test(html)) {
  html = html.replace(renderRe, () => render + '\n\n  // COMMAND PALETTE');
} else if (renderReLegacy.test(html)) {
  html = html.replace(renderReLegacy, () => render + '\n\n  // COMMAND PALETTE');
} else {
  throw new Error('renderCerts/openCert not found');
}

// Update route title
html = html.replace(
  "'certifications': { view: 'view-certifications', title: 'Certifications — Bhramar Raut', label: 'Certifications', contextGroup: 'PROOF', shortTitle: 'Certifications' }",
  "'certifications': { view: 'view-certifications', title: 'Certifications — Bhramar Raut', label: 'Certifications', contextGroup: 'PROOF', shortTitle: 'Certifications', description: 'External evidence of structured learning, technical foundations and professional development.' }"
);

// GSAP — only once
if (!html.includes('.credential-featured, .credential-card, .credential-bridge')) {
  html = html.replaceAll(
    '.lab-featured, .lab-card, .lab-panel, .knowledge-card',
    '.lab-featured, .lab-card, .lab-panel, .credential-featured, .credential-card, .credential-bridge, .knowledge-card'
  );
}

fs.writeFileSync(file, html);
console.log('Applied certifications redesign', fs.statSync(file).size);
console.log('has CREDENTIAL_TYPES', html.includes('CREDENTIAL_TYPES'));
console.log('has credential-featured', html.includes('credential-featured'));
console.log('has How to read', html.includes('How to read this page'));
console.log('old compact list', html.includes('cert-compact-list'));
console.log('duplicate CREDENTIALS', (html.match(/const CREDENTIALS =/g) || []).length);
