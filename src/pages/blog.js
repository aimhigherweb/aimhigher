import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

import { Content, Head1 } from '../components/layout/style';
import {
	Article,
	ArticleFeed,
	ArticleTitle,
	Date,
	Excerpt,
	ShareIcons,
	FeatureImage,
} from '../styles/blog';
import { Facebook, Twitter } from 'react-feather';

export default class Blog extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		const meta = {
			name: 'Blog | AimHigher Web Design',
			description:
				'Information and general musings of the staff at AimHigher Web Design about building websites',
			slug: 'blog',
		};

		return (
			<Layout meta={meta} wave>
				<Content>
					<Head1>Blog</Head1>
					<ArticleFeed>
						{posts.map(({ node: post }) => {
							let articleLink =
									data.site.siteMetadata.siteUrl +
									meta.slug +
									post.fields.slug,
								facebookLink =
									'https://www.facebook.com/sharer/sharer.php?u=' +
									articleLink,
								twitterLink =
									'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' +
									articleLink;

							return (
								<Article id={post.id} key={post.id}>
									<FeatureImage>
										<img
											src={post.frontmatter.featuredImage}
										/>
									</FeatureImage>
									<header>
										<ArticleTitle>
											<Link
												id={post.id}
												to={`/blog/${post.fields.slug}`}
											>
												{post.frontmatter.title}
											</Link>
										</ArticleTitle>
										<Date>
											{post.frontmatter.publishDate}
										</Date>
									</header>
									<Excerpt>{post.excerpt}</Excerpt>
									<ShareIcons>
										<a href={facebookLink} target="_blank">
											{<Facebook />}
										</a>
										<a href={twitterLink} target="_blank">
											{<Twitter />}
										</a>
									</ShareIcons>
								</Article>
							);
						})}
					</ArticleFeed>
				</Content>
			</Layout>
		);
	}
}

Blog.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
};

export const pageQuery = graphql`
	query blogQuery {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___updateDate] }
			filter: { frontmatter: { tags: { in: ["AimHigher"] } } }
		) {
			edges {
				node {
					id
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						publishDate(formatString: "DD MMM YYYY")
						tags
						featuredImage
					}
				}
			}
		}
	}
`;
