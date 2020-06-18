import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

import { Content, Head1 } from '../components/layout/style'
import { Article, ArticleFeed, ArticleTitle, Date, Excerpt, ShareIcons, FeatureImage } from '../styles/blog'
import { Facebook, Twitter } from 'react-feather'

export default class Blog extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allMarkdownRemark,
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
							let articleLink = `${data.site.siteMetadata.siteUrl}${meta.slug}${post.fields.slug}`,
								facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
								twitterLink =
									`https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`

							return (
								<Article id={post.id} key={post.id}>
									<FeatureImage>
										<img src={post.frontmatter.featured} />
									</FeatureImage>
									<header>
										<ArticleTitle>
											<Link id={post.id} to={`/blog/${post.fields.slug}`}>
												{post.frontmatter.title}
											</Link>
										</ArticleTitle>
										<Date>{post.frontmatter.date}</Date>
									</header>
									<Excerpt dangerouslySetInnerHTML={{__html: post.excerpt}} />
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

export const pageQuery = graphql`
	query blogQuery {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}
		allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/posts/"}}, sort: {order: DESC, fields: [frontmatter___date]}) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "DD MMM YYYY")
						featured
					}
					id
					excerpt(format: HTML)
				}
			}
		}
	}
`
