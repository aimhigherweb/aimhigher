// Components with state: the main nav toggle and forms.
import { expect, test } from '@playwright/test';

import { expectNoAxeViolations, expectNoIssues, gotoPage } from './utils/a11y.js';
import pages from './utils/pages.js';

test.describe(`main navigation`, () => {
	test(`works by keyboard and reports its state (4.1.2, 2.1.1)`, async ({ page }, testInfo) => {
		await gotoPage(page, `/`);

		const nav = page.locator(`[data-main-nav]`);
		const toggle = nav.locator(`> button`);
		const links = nav.getByRole(`link`);

		await expect(nav).toHaveAccessibleName(/\S/);

		if (!await toggle.isVisible()) {
			// Wide layout: links are always shown
			for (const link of await links.all()) await expect(link).toBeVisible();

			return;
		}

		await expect(toggle).toHaveAccessibleName(/\S/);
		await expect(toggle).toHaveAttribute(`aria-expanded`, `false`);
		await expect(links.first()).toBeHidden();

		// Closed menu links must be out of the tab order, not just invisible
		await toggle.focus();
		await page.keyboard.press(`Tab`);
		expect(await nav.evaluate((el) => el.contains(document.activeElement) && document.activeElement.tagName === `A`), `Tab moved into the closed menu`).toBe(false);

		await toggle.focus();
		await page.keyboard.press(`Enter`);
		await expect(toggle).toHaveAttribute(`aria-expanded`, `true`);
		for (const link of await links.all()) await expect(link).toBeVisible();

		await page.keyboard.press(`Tab`);
		await expect(links.first()).toBeFocused();

		await expectNoAxeViolations(page, testInfo, { label: `axe-nav-open` });

		await toggle.focus();
		await page.keyboard.press(`Space`);
		await expect(toggle).toHaveAttribute(`aria-expanded`, `false`);
		await expect(links.first()).toBeHidden();
	});
});

for (const path of pages) {
	test.describe(`${path} forms`, () => {
		test.beforeEach(async ({ page }) => {
			await gotoPage(page, path);
			test.skip(!await page.locator(`form`).count(), `no forms on this page`);
		});

		test(`3.3.2 Labels: every field has a visible label`, async ({ page }, testInfo) => {
			const issues = await page.locator(`form`).evaluateAll((forms) => forms.flatMap((form) => [...form.elements]
				.filter((el) => /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !/^(hidden|submit|button|reset|image)$/.test(el.type))
				// Fields nobody can see or reach (a display: none honeypot, label and all) don't need a label.
				// A hidden native checkbox behind a custom one is still checked, through its visible label
				.filter((el) => el.checkVisibility() || [...el.labels ?? []].some((label) => label.checkVisibility()))
				.filter((el) => {
					const labelled = [...el.labels ?? []];
					const ids = el.getAttribute(`aria-labelledby`)?.split(/\s+/) ?? [];

					labelled.push(...ids.map((id) => document.getElementById(id)).filter(Boolean));

					return !labelled.some((label) => label.checkVisibility() && label.innerText.trim() && label.getBoundingClientRect().width > 1);
				})
				.map((el) => ({
					target: `${el.tagName.toLowerCase()}[name="${el.name}"]`,
					message: el.placeholder ? `only labelled by its placeholder "${el.placeholder}"` : `has no visible label`,
				}))));

			await expectNoIssues(testInfo, `Fields without visible labels`, issues);
		});

		test(`3.3.1 / 3.3.3 / 3.3.6 Errors: an empty submission is caught and focus goes to the problem`, async ({ page }, testInfo) => {
			const form = page.locator(`form`).first();
			const submit = form.locator(`button[type="submit"], button:not([type]), input[type="submit"]`).first();

			test.skip(!await submit.count(), `form has no submit button`);
			test.skip(!await form.locator(`[required], [aria-required="true"]`).count(), `form has no required fields`);

			const url = page.url();

			await submit.focus();
			await page.keyboard.press(`Enter`);
			// Give a scripted validator a moment; native validation is synchronous
			await page.waitForTimeout(250);

			expect(page.url(), `an empty form was submitted`).toBe(url);

			const focus = await page.evaluate(() => {
				const el = document.activeElement;
				const described = (el.getAttribute(`aria-describedby`) ?? ``).split(/\s+/).map((id) => document.getElementById(id)?.innerText.trim()).filter(Boolean);
				const errormessage = el.getAttribute(`aria-errormessage`);

				return {
					tag: el.tagName,
					name: el.name,
					invalid: el.matches(`:invalid`) || el.getAttribute(`aria-invalid`) === `true`,
					// Native validation shows the browser's own message; a scripted one must expose its text
					message: el.validationMessage || described.join(` `) || (errormessage && document.getElementById(errormessage)?.innerText.trim()) || ``,
				};
			});

			expect(focus.invalid, `focus went to ${focus.tag.toLowerCase()} "${focus.name}", not an invalid field`).toBe(true);
			expect(focus.message, `the invalid field has no error message`).not.toBe(``);

			await expectNoAxeViolations(page, testInfo, { label: `axe-form-errors` });
		});

		test(`3.3.3 Error Suggestion: a badly formatted email address is caught`, async ({ page }) => {
			const email = page.locator(`form input[type="email"]`).first();

			test.skip(!await email.count(), `form has no email field`);

			await email.fill(`not-an-email`);

			expect(await email.evaluate((el) => el.matches(`:invalid`) && el.validationMessage.length > 0)).toBe(true);
		});
	});
}
