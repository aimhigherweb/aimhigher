/**
 * Sätteri hast plugin (Astro 7's markdown processor): external links (http/https) in markdown
 * content open in a new tab
 */
export const externalLinks = {
	name: `external-links`,
	element: {
		filter: [`a`],
		visit(node, ctx) {
			const href = node.properties?.href;

			if (typeof href !== `string` || !/^https?:\/\//i.test(href)) return;

			ctx.setProperty(node, `target`, `_blank`);
			ctx.setProperty(node, `rel`, `noopener`);
		},
	},
};

export default externalLinks;
