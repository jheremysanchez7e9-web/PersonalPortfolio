// Takes the missing project screenshots listed in .shots-todo.json (written by update-repos.mjs).
// Needs Playwright: npm i --no-save playwright && npx playwright install --with-deps chromium
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const todo = JSON.parse(readFileSync('.shots-todo.json', 'utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, colorScheme: 'dark' });
for (const { url, path } of todo) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500); // let intro animations settle
    await page.screenshot({ path, type: 'jpeg', quality: 70 });
    console.log(`ok   ${path}`);
  } catch (e) {
    console.log(`fail ${url}: ${e.message.split('\n')[0]}`); // the card shows without an image; retried next run
  }
}
await browser.close();
