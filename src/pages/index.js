import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Header from '../img/banners/header_home.svg';
import HomeBanner from '../img/graphics/homeDesk.svg';
import styles from '../styles/home.module.scss';

const IndexPage = ({ data }) => {
	const { sections, banner: { childMarkdownRemark: banner } } = data;
	const { edges: blocks } = sections;

	return (
		<Layout {...{
			altHeader: {
				HeaderCurve: () => (<Header className={styles.header} />),
				lightNav: true
			}
		}}>
			<section className={styles.banner}>
				<blockquote>
					<h1 dangerouslySetInnerHTML={{ __html: banner.frontmatter.tagline }} />
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: banner.html }}
					/>
					<a className={styles.cta} href={banner.frontmatter.cta.link}>
						{banner.frontmatter.cta.text}
					</a>
				</blockquote>
				<HomeBanner className={styles.banner_graphic} />
			</section>
			{blocks.map((block) => (
				<section key={block.node.id}>
					<div dangerouslySetInnerHTML={{ __html: block.node.childMarkdownRemark.html }} />
				</section>
			))}
		</Layout>
	);
};

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
`;

export default IndexPage;
