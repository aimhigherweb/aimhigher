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
