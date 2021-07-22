import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import * as styles from './post.module.scss';

const BlogPost = ({ data }) => {
	const {
		title, content, featured, date, slug, description
	} = data.post;

	return (
		<Layout {...{
			meta: {
				title,
				description,
				slug: `/blog/${slug}`,
				image: featured
			}
		}}>
			<article className={styles.content}>
				<Squiggle className={styles.squiggle} />
				<h1>{title}</h1>
				<p>{date}</p>
				<img className={styles.featured} src={`${process.env.GATSBY_BLOG_IMAGES}${featured.src}`} />
				<div className={styles.post} dangerouslySetInnerHTML={{ __html: content }} />
				<Flower className={styles.flower} />
				<Paw className={styles.paw} />
			</article>
		</Layout>
	);
};

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		post(id: {eq: $id}) {
			featured {
				src
			}
			title
			description
			slug
			content
			date(formatString: "DD MMM YYYY")
		}
	}
`;

export default BlogPost;
