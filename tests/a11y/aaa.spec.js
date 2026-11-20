// WCAG 2.2 AAA success criteria that axe doesn't test, checked on every page.
import { test } from '@playwright/test';

import { expectNoIssues, gotoPage, note } from './utils/a11y.js';
import install from './utils/browser.js';
import pages from './utils/pages.js';

for (const path of pages) {
	test.describe(path, () => {
		test.beforeEach(async ({ page }) => {
			await gotoPage(page, path);
			await install(page);
		});

		test(`2.5.5 Target Size (Enhanced): targets are at least 44 × 44px`, async ({ page }, testInfo) => {
			await expectNoIssues(testInfo, `Targets smaller than 44 × 44px`, await page.evaluate(() => window.__a11y.targetSize()));
		});

		test(`2.4.9 Link Purpose (Link Only): link text makes sense on its own`, async ({ page }, testInfo) => {
			await expectNoIssues(testInfo, `Unclear link text`, await page.evaluate(() => window.__a11y.linkPurpose()));
		});

		test(`3.2.5 Change on Request: links warn before opening a new window`, async ({ page }, testInfo) => {
			await expectNoIssues(testInfo, `Links that open new windows`, await page.evaluate(() => window.__a11y.newWindowWarnings()));
		});

		test(`2.4.10 Section Headings: headings start at h1 and don't skip levels`, async ({ page }, testInfo) => {
			const { issues, h1s } = await page.evaluate(() => window.__a11y.headings());

			if (h1s > 1) note(testInfo, `${h1s} level 1 headings; check each one is a top-level heading for the page`);

			await expectNoIssues(testInfo, `Heading structure`, issues);
		});

		test(`1.4.8 Visual Presentation: line height, spacing, line length, alignment`, async ({ page }, testInfo) => {
			await expectNoIssues(testInfo, `Text presentation`, await page.evaluate(() => window.__a11y.visualPresentation()));
		});

		test(`3.1.4 Abbreviations and 3.1.5 Reading Level (manual review)`, async ({ page }, testInfo) => {
			const abbreviations = await page.evaluate(() => window.__a11y.abbreviations());
			const reading = await page.evaluate(() => window.__a11y.readingLevel());

			if (abbreviations.length) {
				note(testInfo, `3.1.4: no expansion (<abbr title> or "Full Name (ABBR)") for ${abbreviations.join(`, `)}`);
			}

			// 3.1.5 asks for lower secondary level (about grade 9), or a simpler version alongside
			if (reading && reading.grade > 9) {
				note(testInfo, `3.1.5: main content reads at about grade ${reading.grade} (${reading.words} words); AAA asks for grade 9 or a simpler summary`);
			}

			await testInfo.attach(`language.json`, { body: JSON.stringify({ abbreviations, reading }, null, `\t`), contentType: `application/json` });
		});
	});
}
