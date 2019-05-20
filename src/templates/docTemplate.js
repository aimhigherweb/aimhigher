import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Content, Head1 } from '../components/layout/style'
import { Article, ArticleIntro, Date } from '../styles/article'


export const DocTemplate = ({
	content,
	title,
	updateDate,
}) => {

	return (
		<Article>
			<header>
				<Head1>{title}</Head1>
				<ArticleIntro>
					<Date dateTime={updateDate}>{updateDate}</Date>
				</ArticleIntro>
			</header>
			<main dangerouslySetInnerHTML={{ __html: content }} />
		</Article>
	)
}

const Doc = ({ data }) => {
	const { markdownRemark: post } = data,
		doc = {
			content: post.html,
			title: post.frontmatter.title,
			updateDate: post.frontmatter.updateDate,
		},
		meta = {
			name: post.frontmatter.title + ' | Documentation | ' + data.site.siteMetadata.title,
			description: `Documentation for AimHigher clients - ${post.frontmatter.title}`,
			slug: data.site.siteMetadata.siteUrl + post.fields.slug,
		}

	return (
		<Layout meta={meta}>
			<Content>
				<DocTemplate {...doc} />
			</Content>
		</Layout>
	)
}

export default Doc

export const pageQuery = graphql`
	query DocByID($id: String!) {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		markdownRemark(id: { eq: $id }) {
			fields {
				slug
			}
			html
			frontmatter {
				updateDate(formatString: "DD MMM YYYY")
				title
			}
		}
	}
`
