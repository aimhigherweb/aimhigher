import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Form from '../../components/parts/form';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import Underline from '../../img/illustrations/underline.svg';
import {
	contact, 	 flower, form, pageContent, paw, post, squiggle,
	underline, authorHead, dateHead, header
} from './post.module.scss';

import processMarkdown from '../../../lib/utils/markdown'
import {format, parse} from 'date-fns'
import { Helmet } from 'react-helmet';

const BlogPost = ({ data, path }) => {
	const {
		title, content, featured, date, slug, description, author, canonical
	} = data.cms.blogPost;
	const postDate = parse(date, 'yyyy-MM-dd', new Date())

	return (
		<Layout {...{
			meta: {
				title,
				description,
				slug: `/blog/${slug}`,
				image: featured
			}
		}}>
			{canonical &&
				<Helmet>
					<link rel="canonical" href={canonical} />
				</Helmet>
			}
			<article className={pageContent}>
				<Squiggle className={squiggle} />
				<header className={header}>
					<h1>{title}</h1>
					<p className={dateHead}>Posted on: <time dateTime={date}>{format(postDate, 'dd MMM yyyy')}</time></p>
					<p className={authorHead}>
						<a href={author.link} target="_blank">{author.name}</a>
						<img src={author.profile_image.url} alt="" />
					</p>
				</header>
				<div className={post} dangerouslySetInnerHTML={{ __html: processMarkdown(content) }} />
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
	query BlogPostByID($id: ID!) {
		cms {
			blogPost(id: $id) {
				title
				slug
				description
				date
				featured {
					url
					alternativeText
					caption
				}
				cta
				canonical
				content
				categories
				author {
					name
					link
					profile_image {
						url
					}
				}
			}
		}
	}
`;

export default BlogPost;
