import { graphql } from 'gatsby';
import React from 'react';

import FAQ from '../../../lib/parts/faq';
import processMarkdown from '../../../lib/utils/markdown.js';
import Layout from '../../components/layout';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import * as styles from './faq.module.scss';

const FAQPage = ({ data }) => {
	const { faqs } = data.cms;
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
				{faqs.map(({ question, answer }) => (
					<FAQ title={question} key={question}>
						<div
							className={styles.faq}
							dangerouslySetInnerHTML={{ __html: processMarkdown(answer) }}
						/>
					</FAQ>
				))}
				<Flower className={styles.flower} />
				<Paw className={styles.paw} />
			</div>
		</Layout>
	);
};

export const query = graphql`
	query {
		cms {
			faqs {
				question
				answer
			}
		}
		content: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "faq"
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
				eq: "faq"
			}
		) {
			publicURL
		}
	}
`;

export default FAQPage;
