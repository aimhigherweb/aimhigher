// Zoom, text spacing and motion on every page:
//   1.4.4 Resize Text / 1.4.10 Reflow: usable at 200% and 400% zoom without scrolling sideways
//   1.4.12 Text Spacing: nothing is cut off with wider letter, word, line and paragraph spacing
//   2.2.2 Pause, Stop, Hide / 2.3.3 Animation from Interactions
import { test } from '@playwright/test';

import { expectNoIssues, gotoPage } from './utils/a11y.js';
import install from './utils/browser.js';
import pages from './utils/pages.js';

// 1280 × 1024 at 200% and 400% zoom
const zooms = [
	{ zoom: `200%`, viewport: { width: 640, height: 512 } },
	{ zoom: `400%`, viewport: { width: 320, height: 256 } },
];

// The text spacing bookmarklet from the 1.4.12 Understanding doc
const textSpacing = `
	* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
	p { margin-bottom: 2em !important; }
`;

for (const path of pages) {
	test.describe(path, () => {
		for (const { zoom, viewport } of zooms) {
			test(`1.4.10 Reflow: no sideways scrolling at ${zoom} zoom (${viewport.width}px)`, async ({ page }, testInfo) => {
				test.skip(testInfo.project.name !== `desktop`, `zoom levels are relative to the desktop screen`);

				await page.setViewportSize(viewport);
				await gotoPage(page, path);
				await install(page);

				await expectNoIssues(testInfo, `Content wider than ${viewport.width}px`, await page.evaluate(() => window.__a11y.overflow()));
			});
		}

		test(`1.4.12 Text Spacing: no text is cut off with increased spacing`, async ({ page }, testInfo) => {
			await gotoPage(page, path);
			await page.addStyleTag({ content: textSpacing });
			await install(page);

			const issues = [
				...await page.evaluate(() => window.__a11y.clippedText()),
				...await page.evaluate(() => window.__a11y.overflow()),
			];

			await expectNoIssues(testInfo, `Text cut off by increased spacing`, issues);
		});

		test(`2.2.2 Pause, Stop, Hide: nothing moves forever`, async ({ page }, testInfo) => {
			await gotoPage(page, path);
			await install(page);

			await expectNoIssues(testInfo, `Endless motion`, await page.evaluate(() => window.__a11y.animations({ reducedMotion: false })));
		});

		test(`2.3.3 Animation from Interactions: reduced motion stops movement`, async ({ page }, testInfo) => {
			await page.emulateMedia({ reducedMotion: `reduce` });
			await gotoPage(page, path);
			await install(page);

			const issues = await page.evaluate(() => window.__a11y.animations({ reducedMotion: true }));
			const targets = await page.evaluate(() => window.__a11y.hoverTargets());

			// Hover and focus each control, catching transitions they trigger
			for (let i = 0; i < targets; i++) {
				const target = page.locator(`[data-a11y-hover="${i}"]`);

				await target.hover({ force: true, timeout: 2_000 }).catch(() => {});
				await target.focus({ timeout: 2_000 }).catch(() => {});
				issues.push(...await page.evaluate(() => window.__a11y.animations({ reducedMotion: true })));
			}

			const unique = [...new Map(issues.map((issue) => [`${issue.target}${issue.message}`, issue])).values()];

			await expectNoIssues(testInfo, `Motion with prefers-reduced-motion: reduce`, unique);
		});
	});
}
