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
						fileAbsolutePath
						fields {
							slug
						}
						frontmatter {
							title
							mainBlog
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
			const id = edge.node.id,
				filePath = edge.node.fileAbsolutePath,
				templates = {
					blog: path.resolve('src/templates/blogTemplate.js'),
					caseStudy: path.resolve('src/templates/caseStudy.js'),
					client: path.resolve('src/templates/styleGuide.js'),
					docs: path.resolve('src/templates/docTemplate.js'),
				},
				regexr = {
					blog: '/src/blog/',
					caseStudy: '/src/data/case-studies',
					client: '/src/data/clients',
					docs: '/src/docs/',
				}

			let slugPath = edge.node.fields.slug,
				component = false,
				context = {
					id,
				}

			if (RegExp(regexr.blog).test(filePath)) {
				if (edge.node.frontmatter.mainBlog == 'AimHigher') {
					slugPath = 'blog' + edge.node.fields.slug
					component = templates.blog
				} else {
					return
				}
			} else if (RegExp(regexr.caseStudy).test(filePath)) {
				slugPath = 'portfolio' + edge.node.fields.slug
				component = templates.caseStudy
			} else if (RegExp(regexr.client).test(filePath)) {
				slugPath = 'clients' + edge.node.fields.slug + 'styleguide'
				component = templates.client
				context.clientId = edge.node.frontmatter.title
			} else if (RegExp(regexr.docs).test(filePath)) {
				slugPath = `docs${edge.node.fields.slug}`
				component = templates.docs
			} else {
				return
			}

			if (component) {
				createPage({
					path: slugPath,
					component: component,
					context: context,
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
