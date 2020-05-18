require('dotenv').config()


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
						section
						colours {
							colourPrimary
						}
						fonts {
							fontRegular
						}
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
				filePath = edge.node.fileAbsolutePath

			if(!edge.node.fields) {
				return
			}

			if(RegExp(/\/src\/data\/clients/).test(filePath)) {
				createPage({
					path: `clients${edge.node.fields.slug}`,
					component: path.resolve('src/templates/clientPortal.js'),
					context: {
						id,
						clientId: edge.node.frontmatter.title
					}
				})

				if(edge.node.frontmatter.colours && edge.node.frontmatter.fonts) {
					createPage({
						path: `clients${edge.node.fields.slug}style-guide`,
						component: path.resolve('src/templates/styleGuide.js'),
						context: {
							id,
							clientId: edge.node.frontmatter.title
						}
					})
				}
			}
			else if(RegExp(/\/src\/data\/case-studies/).test(filePath)) {
				createPage({
					path: `portfolio${edge.node.fields.slug}`,
					component: path.resolve('src/templates/caseStudy.js'),
					context: {
						id,
					}
				})
			}
			else if(RegExp(/\/src\/docs\//).test(filePath)) {
				createPage({
					path: `docs/${edge.node.frontmatter.section.replace(/\s/g, '-').toLowerCase()}${edge.node.fields.slug}`,
					component: path.resolve('src/templates/docTemplate.js'),
					context: {
						id,
					}
				})
			}
			else if(RegExp(/\/src\/posts\//).test(filePath)) {
				createPage({
					path: `blog${edge.node.fields.slug}`,
					component: path.resolve('src/templates/blogTemplate.js'),
					context: {
						id,
					}
				})
			}
			else {
				return
			}
		})
})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions


	if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
