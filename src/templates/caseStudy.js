import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Sites } from '../pages/portfolio'

import { Content, Head1, Image } from '../components/layout/style'

// eslint-disable-next-line one-var
const CaseStudy = ({ data }) => {
	const study = data.markdownRemark.frontmatter,
		blurb = data.markdownRemark.html,
		meta = {
			name: study.title + ' - Case Study | AimHigher Web Design',
			description: "We've done a bit of work with this group, find out what we did...",
			slug: '/portfolio/' + data.markdownRemark.fields.slug,
		},
		siteUrl = study.https ? `https://${study.domain}` : `http://${study.domain}`,
		siteList = [
			{
				name: study.title,
				slug: data.markdownRemark.fields.slug,
				url: study.domain,
				mobile: study.mobile,
				current: study.current,
				https: study.https,
			},
		],
		allImages = data.allFile.edges

	let images = {
		allFile: {
			edges: [],
		},
	}

	allImages.forEach(image => {
		if()
	})

	return (
		<Layout meta={meta} wave>
			<Content>
				<Head1>Case Study - {study.title}</Head1>
				{study.live && (
					<a href={siteUrl} target="_blank">
						{study.domain}
					</a>
				)}
				<Sites siteList={siteList} data={data} />
				<div className="blurb" dangerouslySetInnerHTML={{ __html: blurb }} />
			</Content>
		</Layout>
	)
}

export const pageQuery = graphql`
	query($id: String!) {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		allFile(filter: { extension: { regex: "/(png)/" }, relativeDirectory: { eq: "portfolio" } }) {
			edges {
				node {
					name
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			fields {
				slug
			}
			html
			frontmatter {
				title
				domain
				live
				https
			}
		}
	}
`

export default CaseStudy
