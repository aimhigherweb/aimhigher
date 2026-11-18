import { STRAPI_API_URL, STRAPI_TOKEN } from 'astro:env/server';

/**
 * Query the Strapi GraphQL API.
 * Without credentials (e.g. `npm run dev` without 1Password) it warns and returns `fallback`,
 * except in production builds, where missing content should fail the deploy.
 */
export const cms = async (query, fallback = {}) => {
	if (!STRAPI_API_URL) {
		if (import.meta.env.PROD) {
			throw new Error(`STRAPI_API_URL is not set; run the build through \`npm run build:local\` or set it in the GitHub Actions secrets`);
		}
		console.warn(`[cms] STRAPI_API_URL not set, using empty CMS data`);
		return fallback;
	}

	const res = await fetch(STRAPI_API_URL, {
		method: `POST`,
		headers: {
			'Content-Type': `application/json`,
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		body: JSON.stringify({ query }),
	});

	if (!res.ok) throw new Error(`[cms] ${res.status} ${res.statusText}`);

	const { data, errors } = await res.json();

	if (errors?.length) throw new Error(`[cms] ${errors.map((e) => e.message).join(`; `)}`);

	return data;
};

export default cms;
