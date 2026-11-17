// Writes repos.json for the site:
//  - stars + last update of every project card (cards in index.html carry data-repo="owner/name");
//  - an auto-generated card for every NEW public repo with GitHub Pages in OWNERS, so new projects
//    appear on the portfolio without editing HTML. Opt a repo out with the GitHub topic "no-portfolio".
// Repos whose screenshot is missing are listed in .shots-todo.json for scripts/screenshot.mjs.
// Run by .github/workflows/certs.yml (daily) or locally: node scripts/update-repos.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const OWNERS = ['jheremysebastian17', 'jheremysanchez7e9-web'];
const SKIP = /^(PersonalPortfolio|FRPortfolio_JSM|.*\.github\.io)$/i; // portfolios themselves, not projects

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-repos-updater' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
async function gh(path) {
  const res = await fetch(`https://api.github.com/${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub responded HTTP ${res.status} for ${path}`);
  return res.json();
}

const html = readFileSync('index.html', 'utf8');
const manual = [...html.matchAll(/data-repo="([\w.-]+\/[\w.-]+)"/g)].map((m) => m[1]);
if (!manual.length) throw new Error('No data-repo attributes found in index.html');

const all = (await Promise.all(OWNERS.map((o) => gh(`users/${o}/repos?per_page=100&type=owner`)))).flat();
const byName = new Map(all.map((r) => [r.full_name, r]));

// Category used by the filter buttons (sec, sys, web, game), guessed from topics + description.
function categories(r) {
  const text = `${(r.topics ?? []).join(' ')} ${r.description ?? ''}`.toLowerCase();
  const cats = [];
  if (/secur|cyber|cve|exploit|firewall|pentest|ctf|blue-team|red-team|malware|threat|password/.test(text)) cats.push('sec');
  if (/network|sysadmin|linux|server|infra|vlan|datacenter|docker|devops|bash/.test(text)) cats.push('sys');
  if (/game|chess|puzzle|quiz/.test(text)) cats.push('game');
  if (r.has_pages || !cats.length) cats.push('web');
  return cats.join(' ');
}
const pretty = (topic) => topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const out = {};
const shotsTodo = [];
for (const full of manual) {
  const r = byName.get(full) ?? (await gh(`repos/${full}`)); // falls back for repos outside OWNERS
  out[full] = { stars: r.stargazers_count, pushed: r.pushed_at };
}

const fresh = all
  .filter((r) => !r.fork && !r.archived && !r.private && r.has_pages && !SKIP.test(r.name))
  .filter((r) => !manual.includes(r.full_name) && !(r.topics ?? []).includes('no-portfolio'))
  .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)); // newest first
for (const r of fresh) {
  const demo = r.homepage || `https://${r.owner.login.toLowerCase()}.github.io/${r.name}/`;
  const image = `img/projects/${slug(r.name)}.jpg`;
  if (!existsSync(image)) shotsTodo.push({ url: demo, path: image });
  out[r.full_name] = {
    stars: r.stargazers_count,
    pushed: r.pushed_at,
    card: {
      title: r.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]+/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase()),
      description: r.description ?? '',
      demo,
      repo: r.html_url,
      image,
      cat: categories(r),
      tags: [r.language, ...(r.topics ?? []).slice(0, 2).map(pretty)].filter(Boolean).slice(0, 3),
    },
  };
}

writeFileSync('repos.json', JSON.stringify(out, null, 2) + '\n');
writeFileSync('.shots-todo.json', JSON.stringify(shotsTodo));
console.log(`repos.json: ${manual.length} manual cards, ${fresh.length} auto cards, ${shotsTodo.length} screenshots to take`);
