import { format, parse } from 'date-fns';
import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import processMarkdown from '../../../lib/utils/markdown';
import Layout from '../../components/layout';
import PageCTA from '../../components/parts/pageCta';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import {
	authorHead, dateHead, flower, header,
	pageContent, paw, post, squiggle
} from './post.module.scss';

const BlogPost = ({ data, path }) => {
	const {
		title, content, featured, date, slug, description, author, canonical, cta
	} = data.cms.blogPost;
	const postDate = parse(date, `yyyy-MM-dd`, new Date());

	return (
		<Layout {...{
			meta: {
				title,
				description,
				slug: `/blog/${slug}`,
				image: featured.url
			}
		}}>
			{canonical
				&& <Helmet>
					<link rel="canonical" href={canonical} />
				</Helmet>
			}
			<article className={pageContent}>
				<Squiggle className={squiggle} />
				<header className={header}>
					<h1>{title}</h1>
					<p className={dateHead}>Posted on: <time dateTime={date}>{format(postDate, `dd MMM yyyy`)}</time></p>
					<p className={authorHead}>
						<a href={author.link} target="_blank">{author.name}</a>
						<img src={author.profile_image.url} alt="" />
					</p>
				</header>
				<div className={post} dangerouslySetInnerHTML={{ __html: processMarkdown(content) }} />
				<PageCTA
					{...{
						cta,
						path
					}}
				/>
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
