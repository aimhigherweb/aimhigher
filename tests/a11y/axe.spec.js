// axe-core scans of every page: WCAG 2.0–2.2 A, AA and AAA rules, in the page's initial state and
// with collapsed content opened.
import { test } from '@playwright/test';

import { expectNoAxeViolations, gotoPage } from './utils/a11y.js';
import install from './utils/browser.js';
import pages from './utils/pages.js';

for (const path of pages) {
	test.describe(path, () => {
		test(`axe: WCAG 2.2 AAA`, async ({ page }, testInfo) => {
			await gotoPage(page, path);
			await expectNoAxeViolations(page, testInfo);
		});

		test(`axe: WCAG 2.2 AAA, with menus and disclosures open`, async ({ page }, testInfo) => {
			await gotoPage(page, path);
			await install(page);

			const toggle = page.locator(`[data-main-nav] > button`);

			if (await toggle.isVisible()) await toggle.click();
			await page.evaluate(() => window.__a11y.expandAll());

			await expectNoAxeViolations(page, testInfo, { label: `axe-expanded` });
		});

		test(`axe: best practices`, async ({ page }, testInfo) => {
			await gotoPage(page, path);
			await expectNoAxeViolations(page, testInfo, { tags: [`best-practice`], label: `axe-best-practice` });
		});
	});
}
