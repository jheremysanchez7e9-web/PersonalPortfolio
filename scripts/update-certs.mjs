// Downloads the public Credly badges and writes certs.json for the site.
// Run by .github/workflows/certs.yml (daily) or locally: node scripts/update-certs.mjs
import { existsSync, writeFileSync } from 'node:fs';

const CREDLY_USER = 'jheremy-s-sanchez-morillo';
const https = (url) => (typeof url === 'string' && url.startsWith('https://') ? url : null);

const badges = [];
let url = `https://www.credly.com/users/${CREDLY_USER}/badges.json`;
while (url) {
  const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'portfolio-certs-updater' } });
  if (!res.ok) throw new Error(`Credly responded HTTP ${res.status}`);
  const page = await res.json();
  if (!Array.isArray(page.data)) throw new Error('Unexpected Credly response format');
  badges.push(...page.data);
  const next = page.metadata?.next_page_url;
  url = next ? new URL(next, url).href : null;
}

const certs = badges
  .filter((b) => b.state === 'accepted' && b.public)
  .map((b) => {
    const t = b.badge_template ?? {};
    const slug = String(t.vanity_slug ?? b.id).replace(/[^a-z0-9-]/gi, '');
    // Credly has no public PDF: an official one is linked only if it was added to certs/<slug>.pdf.
    const pdf = `certs/${slug}.pdf`;
    return {
      id: b.id,
      slug,
      title: t.name ?? '',
      issuer: b.issuer?.entities?.find((e) => e.primary)?.entity?.name ?? '',
      recipient: b.issued_to ?? '',
      issued: b.issued_at_date ?? null,
      expires: b.expires_at_date ?? null,
      image: https(b.image_url ?? t.image_url),
      description: t.description ?? '',
      skills: (t.skills ?? []).map((s) => s.name),
      url: `https://www.credly.com/badges/${encodeURIComponent(b.id)}/public_url`,
      pdf: existsSync(pdf) ? pdf : null,
    };
  })
  .sort((a, b) => String(b.issued).localeCompare(String(a.issued)));

// No timestamp in the file, so the workflow only commits when a badge actually changes.
writeFileSync('certs.json', JSON.stringify(certs, null, 2) + '\n');
console.log(`certs.json written: ${certs.length} certification(s)`);
