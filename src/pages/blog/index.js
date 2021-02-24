import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Post from '../../components/parts/post';
import Header from '../../img/banners/header_2.svg';
import Dots from '../../img/illustrations/dots.svg';
import Flower from '../../img/illustrations/flower.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import styles from './blog.module.scss';

const BlogPage = ({ data }) => {
	const { html, frontmatter } = data.content.childMarkdownRemark;
	const { title, meta } = frontmatter;
	const { siteUrl } = data.site.siteMetadata;
	const posts = data.posts.edges.map(({ node }) => ({
		...node,
		url: siteUrl
	}));

	return (
		<Layout {...{
			header: {
				HeaderCurve: () => (<Header className={styles.header} />),
				lightNav: true
			},
			meta: {
				...meta,
				image: data.social.publicURL
			}
		}}>
			<div className={styles.content}>
				<Squiggle className={styles.squiggle_1} />
				<h1>{title}</h1>

				<div className={styles.blurb} dangerouslySetInnerHTML={{ __html: html }} />

				<ul className={styles.posts}>
					{posts.map((post) => (
						<li className={styles.post} key={post.slug}>
							<Post {...post} />
						</li>
					))}
				</ul>
				<Dots className={styles.dots} />
				<Flower className={styles.flower} />
				<Squiggle className={styles.squiggle_2} />
			</div>
		</Layout>
	);
};

export const query = graphql`
	query {
		site {
			siteMetadata {
				siteUrl
			}
		}
		content: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "blog"
			}, 
			name: {
				eq: "index"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					title
					meta {
						description
						slug
						title
					}
				}
				html
			}
		} 
		social: file(
			sourceInstanceName: {
				eq: "images"
			}, 
			relativeDirectory: {
				eq: "social"
			}, 
			name: {
				eq: "blog"
			}
		) {
			publicURL
		}
		posts: allPost(
			filter: {
				blogs: {
					eq: "aimhigher"
				}
			}
		) {
			edges {
				node {
					slug
					title
					description
					date(formatString: "DD MMM YYYY")
					featured
				}
			}
		}
	}
`;

export default BlogPage;
