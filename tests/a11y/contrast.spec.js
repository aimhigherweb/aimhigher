// 1.4.6 Contrast (Enhanced): text against what's actually behind it, measured from pixels
// (see utils/contrast.js). Covers text over the gradient blobs, illustrations and images that axe
// and pa11y can't measure. Runs at every screen size, since the shapes move between breakpoints.
import { test } from '@playwright/test';

import { expectNoIssues, gotoPage, note } from './utils/a11y.js';
import install from './utils/browser.js';
import { hideText, measureContrast, thresholds } from './utils/contrast.js';
import pages from './utils/pages.js';

const format = (value) => `${value.toFixed(2)}:1`;

for (const path of pages) {
	test(`${path} 1.4.6 Contrast (Enhanced): text over its real background`, async ({ page }, testInfo) => {
		await gotoPage(page, path);
		await install(page);

		const targets = await page.evaluate(() => window.__a11y.contrastTargets());
		const scale = await page.evaluate(() => window.devicePixelRatio);

		await page.addStyleTag({ content: hideText });

		const background = await page.screenshot({ fullPage: true, animations: `disabled`, caret: `hide` });
		const results = measureContrast({ background, targets, scale });
		const issues = [];

		for (const result of results) {
			if (!result.measured || result.low >= result.required) continue;

			const aa = thresholds.aa[result.large ? `large` : `normal`];
			const { colors } = result;
			const painted = await page.evaluate((point) => window.__a11y.paintedAt(point), result.lowPoint);
			const message = `text ${colors.text}: ${format(result.low)} at its worst, on ${colors.low}`
				+ ` (${Math.round(result.failingShare * 100)}% of the background is under ${format(result.required)}; median ${format(result.median)} on ${colors.median})`
				+ `${result.large ? `, large text` : ``}; needs ${format(result.required)}`
				+ `${result.low < aa ? `, and fails AA ${format(aa)} too` : ``}`
				+ `\n        failing background colours: ${colors.failing.map(({ color, ratio }) => `${color} (${format(ratio)})`).join(`, `)}`
				+ `\n        at ${Math.round(result.lowPoint.x)}, ${Math.round(result.lowPoint.y)}px: ${painted}`;

			// A shadow or outline may be what makes it readable, which this can't measure
			if (result.review.length) {
				note(testInfo, `${result.description}: ${message}, but it has ${result.review.join(` and `)}; check by eye`);
				continue;
			}

			issues.push({ target: result.description, message });
		}

		await testInfo.attach(`contrast.json`, {
			// Glyph boxes are bulky and only needed for the measurement
			body: JSON.stringify(results, (key, value) => (key === `rects` ? undefined : value), `\t`),
			contentType: `application/json`,
		});
		await expectNoIssues(testInfo, `Text contrast`, issues);
	});
}
