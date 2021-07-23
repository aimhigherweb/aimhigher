require(`dotenv`).config();

const path = require(`path`);

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	if ([].includes(stage)) {
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
		}
	`).then((result) => {
		if (result.errors) {
			result.errors.forEach((e) => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const { posts, pages } = result.data;

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
	});
};

exports.onCreateNode = async ({
	node, loadNodeContent, createNodeId, actions: { createNode }, createContentDigest
}) => {
	if (node.name !== `posts`) return;

	const content = await loadNodeContent(node);
	const feed = JSON.parse(content);

	feed.items.forEach((post) => {
		const postNode = {
			...post,
			sourceInstanceName: node.name,
			id: createNodeId(`${node.id}${post.slug}`),
			parent: node.id,
			internal: {
				type: `Post`,
				contentDigest: createContentDigest(post)
			}
		};

		createNode(postNode);
	});
};
