import { fileURLToPath } from 'node:url';

import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField } from 'astro/config';

import externalLinks from '../src/utils/externalLinks.js';

// Project root (this file lives in config/)
const root = fileURLToPath(new URL(`..`, import.meta.url));

export default defineConfig({
	site: `https://aimhigherweb.design`,
	integrations: [sitemap()],
	markdown: {
		processor: satteri({ hastPlugins: [externalLinks] }),
	},
	env: {
		schema: {
			STRAPI_API_URL: envField.string({ context: `server`, access: `secret`, optional: true }),
			STRAPI_TOKEN: envField.string({ context: `server`, access: `secret`, optional: true }),
			FATHOM_SITE_ID: envField.string({ context: `server`, access: `public`, optional: true }),
			GTM_ID: envField.string({ context: `server`, access: `public`, optional: true }),
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// Lets any stylesheet `@use "lib/styles/variables"` without relative paths
					loadPaths: [root],
				},
			},
		},
	},
});
