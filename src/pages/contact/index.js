import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Form from '../../components/parts/form';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import * as styles from './contact.module.scss';

const ContactPage = ({ data, path }) => {
	const { html, frontmatter } = data.content.childMarkdownRemark;
	const { title, meta } = frontmatter;

	return (
		<Layout {...{
			meta: {
				...meta,
				image: data.social.publicURL
			}
		}}>
			<div className={styles.content}>
				<Squiggle className={styles.squiggle} />
				<h1>{title}</h1>
				<div className={styles.blurb} dangerouslySetInnerHTML={{ __html: html }} />
				<Form
					{...{
						name: `contact`,
						location: path,
					}}
				/>
				<Flower className={styles.flower} />
				<Paw className={styles.paw} />
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
				eq: "contact"
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
				eq: "contact"
			}
		) {
			publicURL
		}
	}
`;

export default ContactPage;
