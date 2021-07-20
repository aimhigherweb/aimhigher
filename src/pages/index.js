import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Footer from '../img/banners/footer_home.svg';
import Header from '../img/banners/header_home.svg';
import About from '../img/graphics/about.svg';
import Devices from '../img/graphics/devices.svg';
import HomeBanner from '../img/graphics/homeDesk.svg';
import Website from '../img/graphics/website.svg';
import Heart from '../img/illustrations/heart.svg';
import Leaf from '../img/illustrations/leaf_thin.svg';
import Squiggle from '../img/illustrations/squiggle.svg';
import * as styles from '../styles/home.module.scss';

const IndexPage = ({ data }) => {
	const { sections, banner: { childMarkdownRemark: banner } } = data;
	const blocks = sections.edges.map(({ node }) => node.childMarkdownRemark);

	return (
		<Layout {...{
			header: {
				HeaderCurve: () => (<Header className={styles.header} />),
				lightNav: true
			},
			footer: {
				FooterCurve: () => (<Footer className={styles.footer} />),
				footerImage: data.footer.publicURL,
				lightNav: true,
				customClass: styles.footer_image
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
			<section className={styles.section}>
				<Squiggle className={styles.squiggle} />
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: blocks[0].html }}
				/>
				<Website className={styles.graphic} />
				<Heart className={styles.heart} />
			</section>
			<section className={styles.section}>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: blocks[1].html }}
				/>
				<Devices className={styles.graphic} />
			</section>
			<section className={styles.section}>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: blocks[2].html }}
				/>
				<About className={styles.graphic} />
				<Leaf className={styles.leaf} />
			</section>

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
						frontmatter {
							image
						}
					}
				}
			}
		}
		footer: file(
			sourceInstanceName: {
				eq: "images"
			}, 
			relativeDirectory: {
				eq: "banners"
			}, 
			name: {
				eq: "footer_home"
			}
		) {
			publicURL
		}
	}
`;

export default IndexPage;
