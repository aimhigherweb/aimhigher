import { Link } from 'gatsby';
import React from 'react';

import Icon from '../../../../lib/parts/icon';
import styles from './post.module.scss';

const Post = ({
	title, slug, date, description, featured
}) => (
	<article className={styles.post}>
		<div className={styles.image}>
			<img src={featured} alt="" />
		</div>
		<h2>
			<Link to={slug}>{title}</Link>
		</h2>
		<p className={styles.date}>{date}</p>
		<p className={styles.excerpt} dangerouslySetInnerHTML={{ __html: description }} />
		<ul className={styles.social}>
			<li>
				<a href={``} target="_blank">
					<Icon icon="twitter" />
					<span className="sr-only">Share on Twitter</span>
				</a>
			</li>
			<li>
				<a href={``} target="_blank">
					<Icon icon="facebook" />
					<span className="sr-only">Share on Facebook</span>
				</a>
			</li>
		</ul>
	</article>
);

export default Post;
