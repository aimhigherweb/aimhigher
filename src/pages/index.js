import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

const IndexPage = ({data}) => {
	const {sections, banner: {childMarkdownRemark: banner}} = data
	const {edges: blocks} = sections

	return (
		<Layout>
			<blockquote>
				<h1 dangerouslySetInnerHTML={{__html: banner.frontmatter.tagline}} />
				<div dangerouslySetInnerHTML={{__html: banner.html}} />
				<a href={banner.frontmatter.cta.link}>
					{banner.frontmatter.cta.text}
				</a>
			</blockquote>
			{blocks.map(block => (
				<section key={block.node.id}>
					<div dangerouslySetInnerHTML={{__html: block.node.childMarkdownRemark.html}} />
				</section>
			))}
		</Layout>
	)
}

export const query = graphql`
	query {
		banner: file(
			sourceInstanceName: {
				eq: "content"
			},
			relativeDirectory: {
				eq: "home"
			},
			name: {
				eq: "banner"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					tagline
					title
					cta {
						link
						text
					}
				}
				html
			}
		}
		sections: allFile(
			filter: {
				sourceInstanceName: {
					eq: "content"
				},
				relativeDirectory: {
					eq: "home"
				},
				name: {
					regex: "/section/"
				}
			}
			sort: {
				order: ASC, 
				fields: childMarkdownRemark___frontmatter___order
			}
		) {
			edges {
				node {
					id
					childMarkdownRemark {
						html
					}
				}
			}
		}
	}
`

export default IndexPage