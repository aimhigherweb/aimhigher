import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = (meta) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
						description
						siteUrl
					}
				}
				favicon: file(
					sourceInstanceName: {
						eq: "images"
					}, 
					name: {
						eq: "favicon"
					}
				) {
					publicURL
				}
				social: file(
					sourceInstanceName: {
						eq: "images"
					}, 
					relativeDirectory: {
						eq: "social"
					}, 
					name: {
						eq: "default"
					}
				) {
					publicURL
				}
			}
		`}
		render={({ site: { siteMetadata }, favicon, social }) => {
			const title = meta?.title || siteMetadata.title;
			const description = meta?.description || siteMetadata.description;
			const { siteUrl } = siteMetadata;
			const slug = meta?.slug || ``;
			const image = `${siteUrl}${meta?.image || social.publicURL}`;

			return (
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={description} />

					<meta charset="utf-8" />
					<meta http-equiv="x-ua-compatible" content="ie=edge" />
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
					<link rel="shortcut icon" href={favicon.publicURL} />
					<link rel="icon" sizes="192x192" href={favicon.publicURL} />
					<link rel="apple-touch-icon" href={favicon.publicURL} />
					<meta name="theme-color" content="#1C75BC" />
					<link rel="mask-icon" href={favicon.publicURL} color="#1C75BC" />
					<base href="/" />
					<link rel="canonical" href={`${siteUrl}${slug}`} />

					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={image} />
					<meta name="author" content="AimHigher Web" />
					<meta property="og:url" content="https://aimhigherweb.dev" />

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@amys_kapers" />
					<meta property="twitter:image" content={image} />
					<meta name="twitter:creator" content="@amys_kapers" />
					<meta property="twitter:title" content={title} />
					<meta property="twitter:description" content={description} />
					<meta property="twitter:image" content={image} />
					<script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site={process.env.GATSBY_FATHOM_SITEID} defer></script>
				</Helmet>
			);
		}}
	/>
);

export default Meta;
