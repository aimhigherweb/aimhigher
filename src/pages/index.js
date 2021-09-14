import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Header from '../img/banners/header_home.svg';
import About from '../img/graphics/about.svg';
import Devices from '../img/graphics/devices.svg';
import HomeBanner from '../img/graphics/homeDesk.svg';
import Website from '../img/graphics/website.svg';
import Heart from '../img/illustrations/heart.svg';
import Leaf from '../img/illustrations/leaf_thin.svg';
import Squiggle from '../img/illustrations/squiggle.svg';
import {
	bannerGraphic, buttons, content, cta, graphic, header, heart, 	homeBanner, leaf, section, squiggle
} from '../styles/home.module.scss';

const IndexPage = ({ data }) => {
	const { sections, banner: { childMarkdownRemark: banner } } = data;
	const blocks = sections.edges.map(({ node }) => node.childMarkdownRemark);

	return (
		<Layout {...{
			header: {
				HeaderCurve: () => (<Header className={header} />),
				lightNav: true
			},
			footer: {
				footerImage: data.footer.publicURL,
				lightNav: true,
				variation: `home`
			}
		}}>
			<section className={homeBanner}>
				<blockquote>
					<h1 dangerouslySetInnerHTML={{ __html: banner.frontmatter.tagline }} />
					<div
						className={content}
						dangerouslySetInnerHTML={{ __html: banner.html }}
					/>
					<ul className={buttons}>
						{banner.frontmatter.cta.map((link) => (
							<li>
								<a className={cta} href={link.link} target={link.external ? `_blank` : `_self`}>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</blockquote>
				<HomeBanner className={bannerGraphic} />
			</section>
			<section className={section}>
				<Squiggle className={squiggle} />
				<div className={content} >
					<div dangerouslySetInnerHTML={{ __html: blocks[0].html }} />
					<ul className={buttons}>
						{blocks[0].frontmatter.cta.map((link) => (
							<li>
								<a className={cta} href={link.link} target={link.external ? `_blank` : `_self`}>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</div>

				<Website className={graphic} />
				<Heart className={heart} />
			</section>
			<section className={section}>
				<div className={content} >
					<div dangerouslySetInnerHTML={{ __html: blocks[1].html }} />
					<ul className={buttons}>
						{blocks[1].frontmatter.cta.map((link) => (
							<li>
								<a className={cta} href={link.link} target={link.external ? `_blank` : `_self`}>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</div>
				<Devices className={graphic} />
			</section>
			<section className={section}>
				<div className={content} >
					<div dangerouslySetInnerHTML={{ __html: blocks[2].html }} />
					<ul className={buttons}>
						{blocks[2].frontmatter.cta.map((link) => (
							<li>
								<a className={cta} href={link.link} target={link.external ? `_blank` : `_self`}>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</div>
				<About className={graphic} />
				<Leaf className={leaf} />
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
						external
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
							cta {
								link
								text
								external
							}
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
