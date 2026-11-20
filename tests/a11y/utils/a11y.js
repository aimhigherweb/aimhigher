import AxeBuilder from '@axe-core/playwright';
import axe from 'axe-core';
import { expect } from '@playwright/test';

import { isErrorPage } from './pages.js';

/**
 * Every axe tag for a WCAG 2.x success criterion up to AAA. axe has no `wcag21aaa`/`wcag22aaa` rules;
 * the AAA criteria it can't test are covered by the custom checks in this folder.
 */
export const wcagTags = [`wcag2a`, `wcag2aa`, `wcag2aaa`, `wcag21a`, `wcag21aa`, `wcag22aa`];

/** WCAG rules axe ships disabled as "experimental" */
const experimentalRules = [`css-orientation-lock`, `p-as-heading`, `table-fake-caption`, `td-has-header`];

/** Load a page and wait for it to settle (fonts change text size, and so contrast/overflow results) */
export const gotoPage = async (page, path) => {
	const res = await page.goto(path, { waitUntil: `load` });

	if (!isErrorPage(path)) expect(res?.ok(), `${path} returned ${res?.status()}`).toBe(true);

	// Dev-server extras that aren't part of the site: Astro's toolbar and the breakpoint badge.
	// The toolbar can be added after load, so it's also hidden with CSS, which catches it whenever it arrives.
	await page.evaluate(() => document.querySelectorAll(`astro-dev-toolbar, [data-dev-styles]`).forEach((el) => el.remove()));
	await page.addStyleTag({ content: `astro-dev-toolbar { display: none !important; }` });
	await page.evaluate(() => document.fonts.ready);
};

/** Put axe-core on the page, so checks can use its accessible-name and visibility helpers */
export const injectAxe = async (page) => {
	if (await page.evaluate(() => Boolean(window.axe))) return;

	await page.addScriptTag({ content: axe.source });
	await page.evaluate(() => window.axe.setup(document));
};

const formatNodes = (nodes) => nodes
	.slice(0, 10)
	.map(({ target, failureSummary }) => `    ${target.join(` > `)}\n      ${(failureSummary ?? ``).split(`\n`).join(`\n      `)}`)
	.join(`\n`) + (nodes.length > 10 ? `\n    …and ${nodes.length - 10} more` : ``);

export const formatViolations = (violations) => violations
	.map(({ id, impact, help, helpUrl, tags, nodes }) => {
		const criteria = tags.filter((tag) => /^wcag\d{3,}$/.test(tag)).map((tag) => tag.replace(/^wcag(\d)(\d)(\d+)$/, `$1.$2.$3`));

		return `[${impact}] ${id}: ${help}${criteria.length ? ` (WCAG ${criteria.join(`, `)})` : ``}\n  ${helpUrl}\n${formatNodes(nodes)}`;
	})
	.join(`\n\n`);

/**
 * Run axe and fail on any violation.
 * "Incomplete" results (things axe couldn't decide, like text over a background image) don't fail;
 * they're attached to the report and noted as annotations for a manual check.
 */
export const expectNoAxeViolations = async (page, testInfo, { tags = wcagTags, label = `axe` } = {}) => {
	const builder = new AxeBuilder({ page })
		.options({
			rules: Object.fromEntries(experimentalRules.map((rule) => [rule, { enabled: true }])),
		})
		.withTags(tags);
	const results = await builder.analyze();

	await testInfo.attach(`${label}.json`, {
		body: JSON.stringify({ violations: results.violations, incomplete: results.incomplete }, null, `\t`),
		contentType: `application/json`,
	});

	for (const { id, help, nodes } of results.incomplete) {
		testInfo.annotations.push({ type: `needs review`, description: `${id}: ${help} (${nodes.length} element${nodes.length === 1 ? `` : `s`})` });
	}

	expect(results.violations, formatViolations(results.violations)).toEqual([]);
};

/**
 * Fail with a readable list when a custom check finds problems.
 * `issues` is an array of strings, or objects with a `target` and `message`.
 */
export const expectNoIssues = async (testInfo, name, issues) => {
	if (issues.length) {
		await testInfo.attach(`${name}.json`, { body: JSON.stringify(issues, null, `\t`), contentType: `application/json` });
	}

	const list = issues
		.map((issue) => (typeof issue === `string` ? issue : `${issue.target}\n      ${issue.message}`))
		.map((line) => `  - ${line}`)
		
		.join(`\n`);

	expect(issues, `${name}:\n${list}`).toEqual([]);
};

/** Record something that needs a person to judge (not a failure) */
export const note = (testInfo, description) => {
	testInfo.annotations.push({ type: `needs review`, description });
};
