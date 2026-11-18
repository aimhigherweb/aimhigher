import { getCollection, getEntry } from 'astro:content';

/** A single markdown file from _data/content, as `{ ...frontmatter, html }` */
export const getContent = async (id) => {
	const entry = await getEntry(`content`, id);

	if (!entry) throw new Error(`Missing content file _data/content/${id}.md`);

	return { ...entry.data, html: entry.rendered?.html ?? `` };
};

/** All markdown files in a _data/content folder, sorted by their `order` frontmatter */
export const getFolder = async (folder, { exclude = [] } = {}) => {
	const entries = await getCollection(`content`, ({ id }) => id.startsWith(`${folder}/`));

	return entries
		.map((entry) => ({
			...entry.data,
			name: entry.id.slice(folder.length + 1),
			html: entry.rendered?.html ?? ``,
		}))
		.filter(({ name }) => !exclude.includes(name))
		.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

/** Plain-text summary of rendered HTML, matching gatsby-transformer-remark's `excerpt` */
export const excerpt = (html, length = 140) => {
	const text = html.replace(/<[^>]+>/g, ``).replace(/\s+/g, ` `).trim();

	if (text.length <= length) return text;

	return `${text.slice(0, length).replace(/\s+\S*$/, ``)}…`;
};
