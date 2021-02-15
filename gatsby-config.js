module.exports = {
	siteMetadata: {
		title: `AimHigher Web`,
		description: `Bridging the gap between businesses and website technologies`,
		url: `https://aimhigherweb.design`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-sass`,
			options: {
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
		}
	]
};
