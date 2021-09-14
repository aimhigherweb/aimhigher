require(`dotenv`).config();

const path = require(`path`);
const createPosts = require(`./utils/createPosts`);

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
			posts: allPost(filter: {blogs: {eq: "aimhigher"}}) {
				edges {
					node {
						slug
						id
					}
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

		posts.edges.forEach(({ node }) => {
			createPage({
				path: `blog/${node.slug}`,
				component: path.resolve(`./src/templates/post/index.js`),
				context: {
					id: node.id,
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

// exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
// 	const typeDefs = `
// 	  type aimHigherCms_CaseStudy implements Node @infer {
// 		launch: Date
// 	  }
// 	`;
// 	createTypes(typeDefs);
// };

exports.onCreateNode = async ({
	node, loadNodeContent, createNodeId, actions: { createNode }, createContentDigest
}) => {
	if (node.name === `posts`) {
		// console.log(node);
		const content = await loadNodeContent(node);
		const feed = JSON.parse(content);

		createPosts({
			feed, node, createNode, createNodeId, createContentDigest
		});
	}
};
