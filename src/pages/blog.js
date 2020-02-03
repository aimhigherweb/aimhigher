import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

import { Content, Head1 } from '../components/layout/style'
import { Article, ArticleFeed, ArticleTitle, Date, Excerpt, ShareIcons, FeatureImage } from '../styles/blog'
import { Facebook, Twitter } from 'react-feather'

export default class Blog extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allContentfulBlogPost,
			meta = {
				name: 'Blog | AimHigher Web Design',
				description: 'Information and general musings of the staff at AimHigher Web Design about building websites',
				slug: 'blog',
			}

		return (
			<Layout meta={meta} wave>
				<Content>
					<Head1>Blog</Head1>
					<ArticleFeed>
						{posts.map(({ node: post }) => {
							let articleLink = `${data.site.siteMetadata.siteUrl}${meta.slug}${post.slug}`,
								facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
								twitterLink =
									`https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`,
									updated = post.updatedDate || post.publishDate || post.updatedAt

							return (
								<Article id={post.contentful_id} key={post.contentful_id}>
									<FeatureImage>
										<Img fixed={post.featuredImage.localFile.childImageSharp.fixed} />
									</FeatureImage>
									<header>
										<ArticleTitle>
											<Link id={post.contentful_id} to={`/blog/${post.slug}`}>
												{post.title}
											</Link>
										</ArticleTitle>
										<Date>{updated}</Date>
									</header>
									<Excerpt>{post.body.childMarkdownRemark.excerpt}</Excerpt>
									<ShareIcons>
										<a href={facebookLink} target="_blank">
											{<Facebook />}
										</a>
										<a href={twitterLink} target="_blank">
											{<Twitter />}
										</a>
									</ShareIcons>
								</Article>
							)
						})}
					</ArticleFeed>
				</Content>
			</Layout>
		)
	}
}

Blog.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export const pageQuery = graphql`
	query blogQuery {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}
		allContentfulBlogPost(
			sort: { order: DESC, fields: updatedAt }
			filter: {blog: {in: "AimHigher"}}
		) {
			edges {
				node {
					title
					tags
					publishDate(formatString: "DD MMM YYYY")
					updatedAt(formatString: "DD MMM YYYY")
					updatedDate(formatString: "DD MMM YYYY")
					createdAt(formatString: "DD MMM YYYY")
					contentful_id
					slug
					blog
					description {
						description
					}
					body {
						childMarkdownRemark {
							excerpt(format: PLAIN, pruneLength: 400)
						}
					}
					featuredImage {
						localFile {
							childImageSharp {
								fixed(width: 500) {
									...GatsbyImageSharpFixed_withWebp
								}
							}
						}
					}
				}
			}
		}
	}
`
