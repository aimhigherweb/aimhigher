import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Site from '../../components/parts/site';
import Header from '../../img/banners/header_2.svg';
import Blob from '../../img/illustrations/blob.svg';
import Dots from '../../img/illustrations/dots.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import * as styles from './portfolio.module.scss';

const PortfolioPage = ({ data }) => {
	const { caseStudies } = data.cms;
	const { html, frontmatter } = data.content.childMarkdownRemark;
	const { title, meta } = frontmatter;

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
				<ul className={styles.sites}>
					{caseStudies.map((site) => (
						<li key={site._id} className={styles.site}>
							<Site {...site} />
						</li>
					))}
				</ul>
				<Dots className={styles.dots} />
				<Blob className={styles.blob} />
				<Squiggle className={styles.squiggle_2} />
			</div>
		</Layout>
	);
};

export const query = graphql`
	query {
		cms {
			caseStudies(
				where: {
					featured: true
				},
				sort: "launch:desc"
			) {
				github
				_id
				launch
				screenshots {
					laptop {
						url
					}
					tablet {
						url
					}
					mobile {
						url
					}
				}
				website {
					domain
					live
				}
			}
		}
		content: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "portfolio"
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
				eq: "portfolio"
			}
		) {
			publicURL
		}
	}
`;

export default PortfolioPage;
