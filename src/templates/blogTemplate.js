import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import { Content, Head1 } from '../components/layout/style'
import { Article, ArticleIntro, Date, ShareIcons } from '../styles/article'

import { Facebook, Twitter } from 'react-feather'

export const BlogPostTemplate = ({
	content, title, slug, publishDate, siteUrl
}) => {
	const articleLink = `${siteUrl}${slug}`,
	facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
	twitterLink = `https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`

	const intro = (
		<ShareIcons>
			<a
				href={facebookLink}
				target="_blank"
				className="facebook share-link"
			>
				{<Facebook />}
			</a>
			<a
				href={twitterLink}
				target="_blank"
				className="twitter share-link"
			>
				{<Twitter />}
			</a>
		</ShareIcons>
	)

	return (
		<Article>
			<header>
				<Head1>{title}</Head1>
				<ArticleIntro>
					{intro}
					<Date dateTime={publishDate}>{publishDate}</Date>
				</ArticleIntro>
			</header>
			<main dangerouslySetInnerHTML={{ __html: content }} />
			<Link to="/" className="back end">
				Back to Article Feed
			</Link>
		</Article>
	)
}

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data,
		blogPost = {
			content: post.html,
			title: post.frontmatter.title,
			slug: post.fields.slug,
			publishDate: post.frontmatter.date,
			siteUrl: data.site.siteMetadata.siteUrl,
		},
		meta = {
			name: post.frontmatter.title + ' | ' + data.site.siteMetadata.title,
			description: post.frontmatter.description,
			slug: data.site.siteMetadata.siteUrl + post.fields.slug,
		}

	return (
		<Layout meta={meta} wave>
			<Content>
				<BlogPostTemplate {...blogPost} />
			</Content>
		</Layout>
	)
}

export default BlogPost

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
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
			frontmatter {
				date(formatString: "DD MMM YYYY")
				title
				description
				featured
			}
			html
		}
	}
`
