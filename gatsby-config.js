require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: 'AimHigher Web Design',
		description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
		siteUrl: 'https://aimhigherweb.design/',
	},
	plugins: [
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					// `gatsby-remark-relative-images`,
					{
						resolve: `@raae/gatsby-remark-oembed`,
					},
					// `gatsby-remark-figure-caption`,
					// 'gatsby-remark-copy-linked-files',
					{
						resolve: `gatsby-remark-images`,
						options: {
							showCaptions: true,
							maxWidth: 800,
							widthWebp: true,
						},
					},
				],
			},
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				displayName: true,
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				include: `/${__dirname}\/src\/img\/.*\.svg$/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-WW45VBB',
				includeInDevelopment: true,
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.GATSBY_SPACE_ID,
				accessToken: process.env.GATSBY_PREVIEW_KEY || process.env.GATSBY_API_KEY,
				host: process.env.GATSBY_PREVIEW_KEY ?`preview.contentful.com` : `cdn.contentful.com`,
				downloadLocal: true,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/clients`,
				name: 'client-details',
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/case-studies`,
				name: 'case-studies',
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/docs`,
				name: 'docs',
			},
		},
		'gatsby-plugin-netlify-cms',
	],
}
