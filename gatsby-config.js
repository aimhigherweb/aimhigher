module.exports = {
	plugins: [
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				implementation: require('sass'),
				additionalData: `
					@use "lib/styles/variables.scss" as var;
					@use "lib/styles/mixins.scss";
				` ,
				sourceMap: true,
				sassOptions: {
					includePaths: ["lib"],
				}
			}
		},
	]
}