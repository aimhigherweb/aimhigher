const path = require('path'),
	{ createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							templateKey
							tags
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()))
			return Promise.reject(result.errors)
		}

		const data = result.data.allMarkdownRemark.edges

		data.forEach(edge => {
			const id = edge.node.id

			if (edge.node.frontmatter.templateKey == 'client') {
				createPage({
					path: 'clients' + edge.node.fields.slug + 'styleguide',
					component: path.resolve(`src/templates/styleGuide.js`),
					// additional data can be passed via context
					context: {
						id,
					},
				})
			} else if (
				edge.node.frontmatter.templateKey === 'blog-post' &&
				edge.node.frontmatter.tags.includes('AimHigher')
			) {
				createPage({
					path: 'blog' + edge.node.fields.slug,
					component: path.resolve(`src/templates/blogTemplate.js`),
					// additional data can be passed via context
					context: {
						id,
					},
				})
			} else if (edge.node.frontmatter.templateKey === 'case-study') {
				createPage({
					path: 'portfolio' + edge.node.fields.slug,
					component: path.resolve(`src/templates/caseStudy.js`),
					// additional data can be passed via context
					context: {
						id,
					},
				})
			}
		})
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
