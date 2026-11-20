// Runs once, after the dev server is up and before the specs load: crawl the site and save the
// page list for every worker to share.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import { baseURL, cacheFile, cacheKey, selectPages } from './utils/site.js';

export default async () => {
	const { pages, summary } = await selectPages();

	console.log(`[a11y] ${pages.length} pages from ${baseURL}`);
	summary.forEach((line) => console.log(`[a11y] ${line}`));

	mkdirSync(dirname(cacheFile), { recursive: true });
	writeFileSync(cacheFile, JSON.stringify({
		baseURL,
		key: cacheKey,
		pages,
	}, null, `\t`));
};
