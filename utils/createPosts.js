const createPosts = ({
	feed, node, createNodeId, createContentDigest, createNode
}) => {
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

module.exports = createPosts;
