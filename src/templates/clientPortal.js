import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import { Content, Head1, Head2 } from '../components/layout/style'

class ClientPortal extends React.Component {
	render() {
		const { data } = this.props,
			clientInfo = data.markdownRemark.frontmatter,
			clientDocs = data.docs.edges == [] ? false : data.docs.edges,
			meta = {
				name: clientInfo.title + ' Client Info | ' + data.site.title,
				description: "All the links you'll need for your website and documentation",
				slug: `/clients/${data.markdownRemark.fields.slug}`,
			}

		return (
			<Layout meta={meta}>
				<Content>
					<Head1>{clientInfo.title}</Head1>
					<Link to={`${meta.slug}/style-guide`}>Style Guide</Link>
					{clientDocs && (
						<Fragment>
							<Head2>Documentation</Head2>
							<ul>
								{clientDocs.map(doc => (
									<li>
										<Link to={`docs/${doc.node.frontmatter.section.replace(' ', '-').toLowerCase()}${doc.node.fields.slug}`}>
											{doc.node.frontmatter.title}
										</Link>
									</li>
								))}
							</ul>
						</Fragment>
					)}
				</Content>
			</Layout>
		)
	}
}

export const pageQuery = graphql`
	query($clientId: String!, $id: String!) {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			fields {
				slug
			}
			frontmatter {
				title
				domain
				live
				https
			}
		}
		docs: allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/src/docs/" }, frontmatter: { selectClient: { in: [$clientId] } } }
			sort: { order: ASC, fields: [frontmatter___section, frontmatter___title] }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						section
					}
				}
			}
		}
	}
`

export default ClientPortal
