require(`dotenv`).config();

module.exports = {
	flags: {
		DEV_SSR: false
	},
	siteMetadata: {
		title: `AimHigher Web`,
		description: `Together, Online, Aim Higher. Bridging the gap between businesses and website technologies`,
		siteUrl: `https://aimhigherweb.design`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				cssLoaderOptions: {
					import: false,
					esModule: true,
					modules: true
				},
				additionalData: `
					@use "lib/styles/variables.scss" as var;
					@use "lib/styles/mixins.scss";
				`,
				sourceMap: true,
				sassOptions: {
					includePaths: [`lib`],
				}
			}
		},
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: [`${__dirname}/lib/img`, `${__dirname}/src/img`]
				}
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/img`

			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/lib/img`

			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `content`,
				path: `${__dirname}/_data/content`

			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `menus`,
				path: `${__dirname}/_data/menus`
			}
		},
		{
			resolve: `gatsby-source-remote-file`,
			options: {
				url: process.env.GATSBY_BLOG_FEED,
				name: `posts`,
				ext: `.json`
			},
		},
		{
			resolve: `gatsby-source-graphql`,
			options: {
				typeName: `aimHigherCms`,
				fieldName: `cms`,
				url: process.env.GATSBY_STRAPI_API_URL,
				headers: {
					Authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
				},
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-transformer-json`,
			options: {
				typeName: `menus`,
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {

			}
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-html-attributes`,
			options: {
				lang: `en-AU`
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`,
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: process.env.GTM,
				includeInDevelopment: false,
			},
		},
	]
};
