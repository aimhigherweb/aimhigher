import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Service from '../../components/parts/service';
import Header from '../../img/banners/header_2.svg';
import Blocks from '../../img/graphics/blocks.svg';
import styles from './services.module.scss';

const ServicesPage = ({ data }) => {
	const { html, frontmatter } = data.content.childMarkdownRemark;
	const { title, meta } = frontmatter;
	const services = data.services.edges.map(({ node }) => ({
		...node.childMarkdownRemark,
		...node.childMarkdownRemark.frontmatter
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
				<h1>{title}</h1>
				<Blocks className={styles.blocks} />
				<div className={styles.blurb} dangerouslySetInnerHTML={{ __html: html }} />

				<ul className={styles.services}>
					{services.map((service) => (
						<Service key={service.title} {...service} />
					))}
				</ul>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query {
		content: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "services"
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
				eq: "services"
			}
		) {
			publicURL
		}
		services: allFile(
			filter: {
				sourceInstanceName: {
					eq: "content"
				},
				relativeDirectory: {
					eq: "services"
				},
				name: {
					ne: "index"
				}
			}
			sort: {
				order: ASC, 
				fields: childMarkdownRemark___frontmatter___order
			}
		) {
			edges {
				node {
					childMarkdownRemark {
						html
						frontmatter {
							title
							icon
						}
					}
				}
			}
		}
	}
`;

export default ServicesPage;
