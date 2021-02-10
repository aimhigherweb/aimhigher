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
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `content`,
				path: `${__dirname}/_data/content`

			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {

			}
		}
	]
};
