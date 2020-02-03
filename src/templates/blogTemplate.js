import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import { Content, Head1 } from '../components/layout/style'
import { Article, ArticleIntro, Date, ShareIcons } from '../styles/article'

import { Facebook, Twitter } from 'react-feather'

export const BlogPostTemplate = ({
	content, title, slug, blog, tags, publishDate, updateDate, siteUrl
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
					<Date dateTime={updateDate}>{updateDate}</Date>
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
	const { contentfulBlogPost: post } = data,
		blogPost = {
			content: post.body.childMarkdownRemark.html,
			title: post.title,
			slug: post.slug,
			publishDate: post.publishDate || post.createdAt,
			updateDate: post.updatedDate || post.publishDate || post.updatedAt,
			tags: post.tags,
			siteUrl: data.site.siteMetadata.siteUrl,
		},
		meta = {
			name: post.title + ' | ' + data.site.siteMetadata.title,
			description: post.description,
			slug: data.site.siteMetadata.siteUrl + post.slug,
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
		contentfulBlogPost(id: { eq: $id }) {
			title
			tags
			publishDate(formatString: "DD MMM YYYY")
			updatedAt(formatString: "DD MMM YYYY")
			updatedDate(formatString: "DD MMM YYYY")
			createdAt(formatString: "DD MMM YYYY")
			slug
			blog
			description {
				description
			}
			body {
				childMarkdownRemark {
					html
				}
			}
			featuredImage {
				file {
					url
				}
			}
		}
	}
`
