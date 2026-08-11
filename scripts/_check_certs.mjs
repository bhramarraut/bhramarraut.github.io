import fs from 'fs';

const h = fs.readFileSync('index.html', 'utf8');
const scripts = [...h.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
for (const m of scripts) {
  if (/src=|ld\+json/i.test(m[1] || '')) continue;
  try {
    new Function(m[2]);
    console.log('JS OK', m[2].length);
  } catch (e) {
    console.error('JS FAIL', e.message);
    process.exit(1);
  }
}
console.log('types', (h.match(/const CREDENTIAL_TYPES/g) || []).length);
console.log('creds', (h.match(/const CREDENTIALS =/g) || []).length);
console.log('timeline', (h.match(/const CREDENTIAL_TIMELINE/g) || []).length);
console.log('has lineageHtml', h.includes('lineageHtml + bridgeHtml'));
console.log('dup expired meta', h.includes("expiresLabel ? ' · Expired"));
console.log('print actions hide', h.includes('.credential-bridge-actions'));
console.log('gsap credential', (h.match(/\.credential-featured, \.credential-card, \.credential-bridge/g) || []).length);
console.log('Supports in openCert', h.includes("Supports: ' + c.supports"));
