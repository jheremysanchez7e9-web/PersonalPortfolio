// Writes repos.json (stars + last update of every project card) for the site.
// The repo list comes from the data-repo="owner/name" attributes in index.html, so adding a card is enough.
// Run by .github/workflows/certs.yml (daily) or locally: node scripts/update-repos.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const repos = [...readFileSync('index.html', 'utf8').matchAll(/data-repo="([\w.-]+\/[\w.-]+)"/g)].map((m) => m[1]);
if (!repos.length) throw new Error('No data-repo attributes found in index.html');

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-repos-updater' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const out = {};
for (const full of repos) {
  const res = await fetch(`https://api.github.com/repos/${full}`, { headers });
  if (!res.ok) throw new Error(`GitHub responded HTTP ${res.status} for ${full}`);
  const r = await res.json();
  out[full] = { stars: r.stargazers_count, pushed: r.pushed_at };
}

writeFileSync('repos.json', JSON.stringify(out, null, 2) + '\n');
console.log(`repos.json: ${repos.length} repositories`);
