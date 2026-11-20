import { chromium, devices } from '@playwright/test';
const b = await chromium.launch();
const page = await (await b.newContext({ ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } })).newPage();
await page.goto('http://localhost:4321/blog/generating-ssl-certificates/', { waitUntil: 'load' });
const f = () => page.evaluate(() => { const i = document.querySelector('img'); const r = i.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), h: Math.round(r.height), natural: i.naturalHeight, complete: i.complete, inPost: !!i.closest('article'), docH: document.documentElement.scrollHeight }; });
console.log(await f());
