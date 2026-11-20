// Tabs through every page like a keyboard user, checking:
//   2.1.1 / 2.1.3 Keyboard (No Exception): Tab reaches every interactive element
//   2.1.2 No Keyboard Trap: focus keeps moving and leaves the page
//   2.4.7 Focus Visible and 2.4.13 Focus Appearance: a big enough, high-contrast indicator (see utils/focus.js)
//   2.4.11 / 2.4.12 Focus Not Obscured (Enhanced): no part of the focused element is hidden
import { test } from '@playwright/test';

import { expectNoIssues, gotoPage } from './utils/a11y.js';
import install from './utils/browser.js';
import { clipFor, measureIndicator } from './utils/focus.js';
import pages from './utils/pages.js';

const shotOptions = { fullPage: true, animations: `disabled`, caret: `hide` };

for (const path of pages) {
	test(`${path} keyboard: reach everything, see focus, never get stuck`, async ({ page }, testInfo) => {
		await gotoPage(page, path);
		await install(page);

		const tabbables = await page.evaluate(() => window.__a11y.tabbables());

		test.skip(!tabbables.length, `nothing focusable on the page`);
		test.setTimeout(30_000 + tabbables.length * 1_000);

		const scale = await page.evaluate(() => window.devicePixelRatio);
		const size = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
		const baseline = await page.screenshot(shotOptions);
		const issues = [];
		const visited = [];
		let previous = null;

		for (let step = 0; step < tabbables.length + 3; step++) {
			await page.keyboard.press(`Tab`);
			// Let the browser finish scrolling the focused element into view
			await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

			const focus = await page.evaluate(() => window.__a11y.focused());

			// Focus left the page (it's on the browser UI); that's the end of the tab order
			if (!focus) {
				if (visited.length) break;
				continue;
			}

			const key = focus.index ?? focus.description;

			if (key === previous) {
				issues.push({ target: focus.description, message: `focus stays here when pressing Tab (2.1.2 keyboard trap)` });
				break;
			}

			if (visited.includes(key)) {
				// Back at the start without leaving the page means focus is cycling inside the page
				if (key !== visited[0]) issues.push({ target: focus.description, message: `focus came back here before reaching the end of the page (2.1.2)` });
				break;
			}

			visited.push(key);
			previous = key;

			if (focus.offscreen) {
				issues.push({ target: focus.description, message: `has focus but is off screen (2.4.7, 2.4.11)` });
				continue;
			}

			if (focus.covering.length) {
				issues.push({ target: focus.description, message: `partly covered by ${focus.covering.join(`, `)} while focused (2.4.11, 2.4.12)` });
			}
			else if (focus.partlyOffscreen) {
				issues.push({ target: focus.description, message: `partly outside the viewport while focused (2.4.12)` });
			}

			if (!focus.box.width || !focus.box.height) continue;

			const clip = clipFor(focus.box, size);
			const focused = await page.screenshot({ ...shotOptions, clip });
			const { changed, contrasting, required } = measureIndicator({ baseline, focused, clip, box: focus.box, scale });

			if (!changed) {
				issues.push({ target: focus.description, message: `no visible change when focused (2.4.7 Focus Visible)` });
			}
			else if (contrasting < required) {
				issues.push({
					target: focus.description,
					message: `focus indicator changes ${Math.round(contrasting)}px² at 3:1 contrast (${Math.round(changed)}px² in total); 2.4.13 needs ${Math.round(required)}px², a 2px outline's worth`,
				});
			}
		}

		const missed = tabbables.filter((_, i) => !visited.includes(String(i)));

		for (const description of missed) {
			issues.push({ target: description, message: `never received focus from Tab (2.1.1, 2.1.3)` });
		}

		await testInfo.attach(`tab-order.json`, { body: JSON.stringify({ tabbables, visited }, null, `\t`), contentType: `application/json` });
		await expectNoIssues(testInfo, `Keyboard and focus`, issues);
	});
}
