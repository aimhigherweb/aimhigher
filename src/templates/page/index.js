import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import styles from './page.module.scss';

const StaticPage = ({ data }) => {
	const {
		html, frontmatter: { title, meta }
	} = data.file.childMarkdownRemark;

	return (
		<Layout {...{
			meta
		}}>
			<article className={styles.content}>
				<Squiggle className={styles.squiggle} />
				<h1>{title}</h1>
				<div className={styles.page} dangerouslySetInnerHTML={{ __html: html }} />
				<Flower className={styles.flower} />
				<Paw className={styles.paw} />
			</article>
		</Layout>
	);
};

export const pageQuery = graphql`
	query PageByID($id: String!) {
		file(id: {eq: $id}) {
			childMarkdownRemark {
				frontmatter {
					title
					meta {
						title
						description
						slug
					}
				}
				html
			}
		}
	}
`;

export default StaticPage;
