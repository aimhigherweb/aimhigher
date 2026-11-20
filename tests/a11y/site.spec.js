// Checks across the whole site rather than one page at a time.
//   2.4.2 Page Titled: every page has its own title
//   3.1.1 Language of Page: every page sets one
//   3.2.3 Consistent Navigation / 3.2.4 Consistent Identification: shared nav is the same everywhere
import { test } from '@playwright/test';

import { expectNoIssues } from './utils/a11y.js';
import pages, { isErrorPage } from './utils/pages.js';

test.describe.configure({ mode: `serial` });

/** Every page's title, language and navigation landmarks */
let site;

test.beforeAll(async ({ browser }) => {
	test.setTimeout(30_000 + pages.length * 5_000);

	const page = await browser.newPage();

	site = [];

	for (const path of pages) {
		await page.goto(path, { waitUntil: `domcontentloaded` });

		site.push({
			path,
			...await page.evaluate(() => ({
				title: document.title.trim(),
				lang: document.documentElement.lang,
				navs: [...document.querySelectorAll(`nav, [role="navigation"]`)].map((nav) => ({
					label: nav.getAttribute(`aria-label`) || document.getElementById(nav.getAttribute(`aria-labelledby`))?.innerText.trim() || `(unlabelled)`,
					links: [...nav.querySelectorAll(`a[href]`)].map((a) => ({
						name: (a.getAttribute(`aria-label`) || a.innerText).trim().replace(/\s+/g, ` `),
						// Same-site links by path (so BASE_URL doesn't matter), others by full URL
						href: ((url) => (url.origin === location.origin ? url.pathname : url.origin + url.pathname).replace(/(.)\/$/, `$1`))(new URL(a.href)),
						rel: a.rel,
					})),
				})),
			})),
		});
	}

	await page.close();
});

test(`2.4.2 Page Titled: every page has a unique title`, async ({}, testInfo) => {
	const issues = [];
	const byTitle = Map.groupBy(site.filter(({ path }) => !isErrorPage(path)), ({ title }) => title);

	for (const [title, matches] of byTitle) {
		if (!title) issues.push(`no <title>: ${matches.map(({ path }) => path).join(`, `)}`);
		else if (matches.length > 1) issues.push(`"${title}" is the title of ${matches.map(({ path }) => path).join(`, `)}`);
	}

	await expectNoIssues(testInfo, `Page titles`, issues);
});

test(`3.1.1 Language of Page: every page declares its language`, async ({}, testInfo) => {
	await expectNoIssues(testInfo, `Pages without a lang`, site.filter(({ lang }) => !lang).map(({ path }) => path));
});

test(`3.2.3 Consistent Navigation: shared navigation is in the same order on every page`, async ({}, testInfo) => {
	const issues = [];
	const labels = new Set(site.flatMap(({ navs }) => navs.map(({ label }) => label)));

	for (const label of labels) {
		const withNav = site.filter(({ navs }) => navs.some((nav) => nav.label === label));

		// Navigation on only a few pages (e.g. pagination) isn't site-wide navigation
		if (withNav.length < site.length / 2) continue;

		const signature = ({ navs }) => JSON.stringify(navs.find((nav) => nav.label === label).links);
		const counts = Map.groupBy(withNav, signature);
		const [expected] = [...counts.entries()].sort((a, b) => b[1].length - a[1].length)[0];

		for (const entry of withNav) {
			if (signature(entry) !== expected) {
				issues.push({ target: `${entry.path} nav "${label}"`, message: `links differ from most pages:\n        expected ${expected}\n        found    ${signature(entry)}` });
			}
		}

		for (const { path } of site.filter((entry) => !withNav.includes(entry) && !isErrorPage(entry.path))) {
			issues.push({ target: path, message: `missing nav "${label}", which ${withNav.length} other pages have` });
		}
	}

	await expectNoIssues(testInfo, `Inconsistent navigation`, issues);
});

test(`3.2.4 Consistent Identification: a nav link keeps its name on every page`, async ({}, testInfo) => {
	const names = new Map();

	for (const { navs } of site) {
		for (const { label, links } of navs) {
			for (const { name, href, rel } of links) {
				// Relative links (pagination's next/prev) point somewhere different on each page, so their
				// function is the rel, not the destination: "Next" and "2" can share an href but aren't the same component
				const relative = rel.split(` `).find((value) => [`next`, `prev`].includes(value));
				const key = relative ? `nav "${label}" → rel=${relative}` : `nav "${label}" → ${href}`;

				if (!names.has(key)) names.set(key, new Set());
				names.get(key).add(name);
			}
		}
	}

	const issues = [...names]
		.filter(([, set]) => set.size > 1)
		.map(([key, set]) => ({ target: key, message: `named ${[...set].map((name) => `"${name}"`).join(`, `)} on different pages` }));

	await expectNoIssues(testInfo, `Inconsistently named navigation links`, issues);
});
