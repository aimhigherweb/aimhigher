// The list of pages every spec loops over.
// global-setup.js crawls the site once and saves the list, so workers don't each crawl it again.
// Without that file (e.g. `playwright test --list`, which skips global setup), crawl here instead.
import { existsSync, readFileSync } from 'node:fs';

import { baseURL, cacheFile, cacheKey, selectPages } from './site.js';

const load = async () => {
	if (existsSync(cacheFile)) {
		const cached = JSON.parse(readFileSync(cacheFile, `utf8`));

		if (cached.baseURL === baseURL && cached.key === cacheKey) return cached.pages;
	}

	return (await selectPages()).pages;
};

export const pages = await load();

/** The 404 page loads with a 404 status, so it's exempt from the status check */
export const isErrorPage = (path) => /^\/404\/?$/.test(path);

export default pages;
