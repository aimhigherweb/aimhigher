import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

// Every markdown file under _data/content, keyed by its path, e.g. `services/development`
const content = defineCollection({
	loader: glob({
		pattern: `**/*.md`,
		base: `./_data/content`,
		generateId: ({ entry }) => entry.replace(/\.md$/, ``),
	}),
});

export const collections = { content };
