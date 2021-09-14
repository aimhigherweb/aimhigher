import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Form from '../../components/parts/form';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import Underline from '../../img/illustrations/underline.svg';
import {
	contact, 	featuredImage, flower, form, pageContent, paw, post, squiggle,
	underline
} from './post.module.scss';

const BlogPost = ({ data, path }) => {
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
			<article className={pageContent}>
				<Squiggle className={squiggle} />
				<h1>{title}</h1>
				<p>{date}</p>
				<img className={featuredImage} src={`${process.env.GATSBY_BLOG_IMAGES}${featured.src}`} />
				<div className={post} dangerouslySetInnerHTML={{ __html: content }} />
				<div className={contact}>
					<div className={underline}>
						<Underline />
					</div>
					<h2>Need Help?</h2>
					<Form
						{...{
							name: `contact_blog`,
							location: path,
							className: form
						}}
					/>
				</div>
				<Flower className={flower} />
				<Paw className={paw} />
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
