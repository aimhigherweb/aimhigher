#!/usr/bin/env node
// Check blog post markdown for heading structure (WCAG 2.4.10 Section Headings, AAA).
//
// usage: npm run test:headings
//   Checks every published post in Strapi (needs STRAPI_API_URL and STRAPI_TOKEN). The deploy workflow runs it
//   when a CMS update includes a blog post, and fails the build before deploying if there are issues.
//
// The post title is the page's h1, so content headings must start at h2, never use h1, and never skip a level
// on the way down (h2 → h4). Going back up any number of levels (h4 → h2) is fine. Exits with 1 on any issue.
import MarkdownIt from 'markdown-it';

// Same parser the post page renders with (lib/utils/markdown.js); its plugins don't change headings
const md = new MarkdownIt();

/** Headings in a post's markdown, in order, with 1-based line numbers */
const headings = (content) => {
	const tokens = md.parse(content ?? ``, {});

	return tokens.flatMap((token, i) => (token.type === `heading_open`
		? [{ level: Number(token.tag.slice(1)), text: tokens[i + 1].content.trim(), line: token.map[0] + 1 }]
		: []));
};

/** Structure problems in a post's markdown */
const checkHeadings = (content) => {
	const issues = [];
	let previous = 1;

	for (const { level, text, line } of headings(content)) {
		const label = `h${level} "${text}" (line ${line})`;

		if (!text) {
			issues.push(`Empty h${level} (line ${line})`);
		}

		if (level === 1) {
			issues.push(`${label}: the post title is the h1, so content headings start at h2`);
		}
		else if (level > previous + 1) {
			issues.push(`${label}: skips from h${previous} to h${level}, should be h${previous + 1}`);
		}

		previous = level;
	}

	return issues;
};

/** Every published blog post from Strapi */
const loadPosts = async () => {
	const { STRAPI_API_URL, STRAPI_TOKEN } = process.env;

	if (!STRAPI_API_URL) {
		console.error(`STRAPI_API_URL is not set; it's needed to fetch the blog posts`);
		process.exit(2);
	}

	const res = await fetch(STRAPI_API_URL, {
		method: `POST`,
		headers: {
			'Content-Type': `application/json`,
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		body: JSON.stringify({ query: `{ blogPosts(pagination: { limit: 100 }) { title slug content } }` }),
	});

	if (!res.ok) throw new Error(`[cms] ${res.status} ${res.statusText}`);

	const { data, errors } = await res.json();

	if (errors?.length) throw new Error(`[cms] ${errors.map((e) => e.message).join(`; `)}`);

	return data.blogPosts.map(({ title, slug, content }) => ({ name: `${title} (/blog/${slug})`, content }));
};

const posts = await loadPosts();
const failures = posts.map((post) => ({ ...post, issues: checkHeadings(post.content) })).filter(({ issues }) => issues.length);

for (const { name, issues } of failures) {
	console.log(`\n${name}`);

	for (const issue of issues) console.log(`  ✗ ${issue}`);

	// Annotations show on the GitHub Actions run summary, so the failure is visible without opening the log
	if (process.env.GITHUB_ACTIONS) console.log(`::error title=Blog headings: ${name}::${issues.join(`%0A`)}`);
}

console.log(`\n${posts.length - failures.length}/${posts.length} posts have valid headings`);

process.exit(failures.length ? 1 : 0);
