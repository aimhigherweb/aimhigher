import { Link } from 'gatsby';
import React from 'react';

import {format, parse} from 'date-fns'


import Icon from '../../../../lib/parts/icon';
import * as styles from './post.module.scss';

const Post = ({
	title, slug, date, description, featured, url
}) => (
	<article className={styles.post}>
		<div className={styles.image}>
			<img src={featured.url} alt={featured?.alternativeText || ""} />
		</div>
		<h2>
			<Link to={`/blog/${slug}`}>{title}</Link>
		</h2>
		<p className={styles.date}>
			{format(
				parse(
					date, 
					'yyyy-MM-dd', 
					new Date()
				), 
				'dd MMM'
			)}
		</p>
		<p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: description }} />
		<ul className={styles.social}>
			<li>
				<a href={`https://twitter.com/intent/tweet?text=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${url}/${slug}`} target="_blank">
					<Icon icon="twitter" />
					<span className="sr-only">Share on Twitter</span>
				</a>
			</li>
			<li>
				<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}/${slug}`} target="_blank">
					<Icon icon="facebook" />
					<span className="sr-only">Share on Facebook</span>
				</a>
			</li>
		</ul>
	</article>
);

export default Post;
