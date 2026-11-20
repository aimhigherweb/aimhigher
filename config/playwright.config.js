// Accessibility test suite (tests/a11y), checked against WCAG 2.2 AAA with Playwright, axe and pa11y.
// Runs against BASE_URL if it's set (a deploy preview or the live site), otherwise the local dev
// server. Run the `start` VS Code task first to get CMS content; without it the suite starts a plain
// `npm run dev`, where CMS pages are empty.
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';

import { baseURL, port } from '../tests/a11y/utils/site.js';

const root = fileURLToPath(new URL(`..`, import.meta.url));

/** Screen sizes every page is tested at */
const screens = {
	mobile: { ...devices[`Pixel 7`] },
	tablet: {
		...devices[`Desktop Chrome`],
		viewport: { width: 820, height: 1180 },
		deviceScaleFactor: 2,
		isMobile: true,
		hasTouch: true,
	},
	desktop: { ...devices[`Desktop Chrome`], viewport: { width: 1280, height: 800 } },
	ultrawide: { ...devices[`Desktop Chrome`], viewport: { width: 2560, height: 1080 } },
};

export default defineConfig({
	testDir: `${root}tests/a11y`,
	outputDir: `${root}tests/results`,
	globalSetup: `${root}tests/a11y/global-setup.js`,
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	// A11y checks are deterministic; a retry only papers over a real failure
	retries: 0,
	workers: process.env.CI ? 2 : 2,
	timeout: 60_000,
	reporter: [
		[process.env.CI ? `github` : `list`],
		[`html`, { outputFolder: `${root}tests/report`, open: `never` }],
		[`json`, { outputFile: `${root}tests/results/a11y.json` }],
	],
	use: {
		baseURL,
		// Lets the tests add axe-core to pages served with a Content-Security-Policy
		bypassCSP: true,
		trace: `retain-on-failure`,
		screenshot: `only-on-failure`,
	},
	projects: Object.entries(screens).map(([name, use]) => ({
		name,
		use,
		// Site-wide checks don't depend on screen size
		testIgnore: name === `desktop` ? undefined : `site.spec.js`,
	})),
	webServer: process.env.BASE_URL
		? undefined
		: {
			command: `npm run dev -- --port ${port}`,
			cwd: root,
			url: baseURL,
			// Use the dev server that's already running (e.g. the `start` task, with CMS content)
			reuseExistingServer: true,
			timeout: 60_000,
		},
});
