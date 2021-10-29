require(`dotenv`).config();

const path = require(`path`);

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	if ([`build-javascript`, `develop`].includes(stage)) {
		const config = getConfig();
		const miniCssExtractPlugin = config.plugins.find(
			(plugin) => plugin.constructor.name === `MiniCssExtractPlugin`
		);
		if (miniCssExtractPlugin) {
			miniCssExtractPlugin.options.ignoreOrder = true;
		}
		actions.replaceWebpackConfig(config);
	}
};

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
		{
			posts: cms {
				blogPosts {
					slug
					id
				}
			}
			pages: allFile(
				filter: {
					sourceInstanceName: {
						eq: "content"
					},
					relativeDirectory: {
						eq: "static"
					}
				}
			) {
				edges {
					node {
						id
						name
					}
				}
			}
			services: allFile(
				filter: {
					sourceInstanceName: {
						eq: "content"
					}, 
					relativeDirectory: {
						eq: "services"
					}, 
					name: {
						nin: [
							"index", 
							"other"
						]
					}
				}
			) {
				edges {
					node {
						id
						name
						childMarkdownRemark {
							id
							html
						}
					}
				}
			}
		}
	`).then((result) => {
		if (result.errors) {
			result.errors.forEach((e) => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const { posts, pages, services } = result.data;

		posts.blogPosts.forEach(({ id, slug }) => {
			createPage({
				path: `blog/${slug}`,
				component: path.resolve(`./src/templates/post/index.js`),
				context: {
					id: id,
				}
			});
		});

		pages.edges.forEach(({ node }) => {
			createPage({
				path: `${node.name}`,
				component: path.resolve(`./src/templates/page/index.js`),
				context: {
					id: node.id,
				}
			});
		});

		services.edges.forEach(({ node }) => {
			if (node.childMarkdownRemark?.html !== ``) {
				createPage({
					path: `services/${node.name}`,
					component: path.resolve(`./src/templates/service/index.js`),
					context: {
						id: node.childMarkdownRemark.id,
					}
				});
			}
		});
	});
};