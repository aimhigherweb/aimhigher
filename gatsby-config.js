module.exports = {
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
					include: `${__dirname}/lib/img`
				}
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
			resolve: `gatsby-transformer-json`,
			options: {
				typeName: `menus`,
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {

			}
		}
	]
};
