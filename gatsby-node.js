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
				docs: path.resolve('src/templates/docTemplate.js')
			},
			regexr = {
				blog: RegExp(/\/src\/blog\//),
				caseStudy: RegExp(/\/src\/data\/\/case-studies/),
				client: RegExp(/\/src\/data\/\/clients/),
				docs: RegExp(/\/src\/docs\//)
			}

			let path = edge.node.fields.slug,
			component = false,
			context = {
				id
			}

			if(regexr.blog.test(filePath)) {
				if(edge.node.frontmatter.mainBlog == 'AimHigher') {
					path = 'blog' + edge.node.fields.slug
					component = templates.blog
				}
				else {
					return
				}
			}
			else if(regexr.caseStudy.test(filePath)) {
				path = 'portfolio' + edge.node.fields.slug
				component = templates.caseStudy
			}
			else if(regexr.client.test(filePath)) {
				path = 'clients' + edge.node.fields.slug + 'styleguide'
				component = templates.client
			}
			else if(regexr.docs.test(filePath)) {
				path = `docs${edge.node.fields.slug}`
				component = templates.docs
			}
			else {
				return
			}

			createPage({
				path: path,
				component: component,
				context: context,
			})
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
