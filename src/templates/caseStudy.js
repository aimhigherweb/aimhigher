import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import { Content, Head1, Image } from '../components/layout/style'

// eslint-disable-next-line one-var
const CaseStudy = ({ data }) => {
	let study = data.markdownRemark.frontmatter,
		blurb = data.markdownRemark.html,
		siteUrl = 'http://' + study.domain

	if (study.https) {
		siteUrl = 'https://' + study.domain
	}

	const meta = {
		name: study.title + ' - Case Study | AimHigher Web Design',
		description: "We've done a bit of work with this group, find out what we did...",
		slug: '/portfolio/' + data.markdownRemark.fields.slug,
	}

	return (
		<Layout meta={meta} wave>
			<Content>
				<Head1>Client Page {study.title}</Head1>
				{study.live && (
					<a href={siteUrl} target="_blank">
						{study.domain}
					</a>
				)}
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
