// pa11y on every page at every screen size, with the settings in config/pa11y.config.json
// (WCAG2AAA, axe + HTML_CodeSniffer runners, and its ignore list). Errors fail the test;
// warnings and notices are things to check by hand, so they're listed in the report instead.
import { readFileSync } from 'node:fs';

import { chromium, test } from '@playwright/test';
import pa11y from 'pa11y';

import { expectNoIssues, note } from './utils/a11y.js';
import pages from './utils/pages.js';

const config = JSON.parse(readFileSync(new URL(`../../config/pa11y.config.json`, import.meta.url), `utf8`));
const { chromeLaunchConfig = {}, ...options } = config;

// The reporter settings are for the pa11y CLI (`npm run test:a11y`); results go in the Playwright report here
delete options.reporter;
delete options.reporterOutput;

for (const path of pages) {
	test(`${path} pa11y: ${options.standard} (${options.runners.join(` + `)})`, async ({ baseURL }, testInfo) => {
		const { viewport, deviceScaleFactor = 1, isMobile = false } = testInfo.project.use;

		test.setTimeout(options.timeout + 30_000);

		const results = await pa11y(new URL(path, baseURL).href, {
			...options,
			viewport: { ...viewport, deviceScaleFactor, isMobile },
			// The dev toolbar isn't part of the site
			hideElements: [options.hideElements, `astro-dev-toolbar`].filter(Boolean).join(`, `),
			chromeLaunchConfig: {
				...chromeLaunchConfig,
				// Playwright's Chromium, so pa11y needs no browser of its own. --no-sandbox matches how
				// Playwright launches it (Ubuntu's AppArmor blocks Chrome's sandbox for unregistered binaries).
				executablePath: chromium.executablePath(),
				args: [...chromeLaunchConfig.args ?? [], `--no-sandbox`],
			},
		});

		await testInfo.attach(`pa11y.json`, { body: JSON.stringify(results.issues, null, `\t`), contentType: `application/json` });

		const byType = Map.groupBy(results.issues, ({ type }) => type);

		for (const type of [`warning`, `notice`]) {
			const issues = byType.get(type) ?? [];

			if (issues.length) {
				const codes = [...new Set(issues.map(({ code }) => code))];

				note(testInfo, `pa11y: ${issues.length} ${type}${issues.length === 1 ? `` : `s`} (${codes.length} kinds); see pa11y.json`);
			}
		}

		// HTML_CodeSniffer can't see a background made of gradients or images (the blobs behind text), so it
		// reports a ratio of NaN:1. contrast.spec.js measures those against the rendered pixels instead, so
		// only those are skipped here; a contrast failure htmlcs did manage to measure still fails.
		const unmeasurable = ({ runner, code, message }) => runner === `htmlcs`
			&& /\.1_4_6\.G1[78]\.Fail$/.test(code)
			&& /contrast ratio of NaN:1/.test(message);
		const { skipped = [], errors = [] } = Object.groupBy(byType.get(`error`) ?? [], (issue) => (unmeasurable(issue) ? `skipped` : `errors`));

		if (skipped.length) {
			note(testInfo, `pa11y: ${skipped.length} htmlcs contrast check${skipped.length === 1 ? `` : `s`} couldn't measure the background (NaN:1); covered by contrast.spec.js`);
		}

		await expectNoIssues(testInfo, `pa11y errors`, errors.map(({ code, message, selector, runner }) => ({
			target: selector || `(page)`,
			message: `[${runner}] ${message}\n        ${code}`,
		})));
	});
}
