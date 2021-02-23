import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React, { Fragment } from 'react';

import Layout from '../../components/layout';
import ImageBlob from '../../components/parts/imageBlob';
import Header from '../../img/banners/header_1.svg';
import Character from '../../img/graphics/desk.svg';
import Blob from '../../img/illustrations/blob_2.svg';
import Background from '../../img/illustrations/blob_background.svg';
import styles from './about.module.scss';

const AboutPage = ({ data }) => {
	const profile = data.profile.childImageSharp.resize.src;
	const { title, meta } = data.page.childMarkdownRemark.frontmatter;
	const aimhigher = data.aimhigher.childMarkdownRemark;
	const founder = data.founder.childMarkdownRemark;
	const partners = data.partners.childMarkdownRemark;
	const logos = data.logos.edges;

	console.log(logos);

	return (
		<Layout {...{
			header: {
				HeaderCurve: () => (<Header className={styles.header} />)
			},
			meta: {
				...meta,
				image: data.social.publicURL
			}
		}}>
			<h1 className="sr-only">{title}</h1>
			<section className={`${styles.section} ${styles.aimhigher}`}>
				<h2>{aimhigher.frontmatter.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: aimhigher.html }} />
				<Character className={styles.graphic} />
			</section>

			<section className={`${styles.section} ${styles.founder}`}>
				<Background className={styles.background} />
				<h2>{founder.frontmatter.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: founder.html }} />
				<div className={styles.image_blob}>
					<Blob className={styles.underlay} />
					<ImageBlob image={profile} />
				</div>
			</section>
			<section className={styles.section}>
				<h2>{partners.frontmatter.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: partners.html }} />
				<ul className={styles.logos}>
					{logos.map(({ node }) => (
						<Fragment>
							{node.childImageSharp
								? <Img fixed={node.childImageSharp.fixed} />
								: <img src={node.publicURL} />
							}
						</Fragment>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export const query = graphql`
	query {
		page: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "about"
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
			}
		} 
		aimhigher: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "about"
			}, 
			name: {
				eq: "aimhigher"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					title
				}
				html
			}
		} 
		founder: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "about"
			}, 
			name: {
				eq: "founder"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					title
				}
				html
			}
		} 
		partners: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "about"
			}, 
			name: {
				eq: "partners"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					title
				}
				html
			}
		} 
		profile: file(
			name: {
				eq: "amy_rem"
			}, 
			sourceInstanceName: {
				eq: "images"
			}
		) {
			name
			childImageSharp {
				resize(width: 700) {
					src
				}
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
				eq: "about"
			}
		) {
			publicURL
		}
		logos: allFile(
			filter: {
				relativeDirectory: {
					eq: "partners"
				}, 
				sourceInstanceName: {
					eq: "images"
				}
			}
		) {
			edges {
				node {
					name
					childImageSharp {
						fixed(height: 300) {
							...GatsbyImageSharpFixed_withWebp
						}
					}
					publicURL
				}
			}
		}
	}
`;

export default AboutPage;
