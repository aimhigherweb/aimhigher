import { format, parse } from 'date-fns';
import { Link } from 'gatsby';
import React from 'react';

import Icon from '../../../../lib/parts/icon';
import * as styles from './site.module.scss';

const Site = ({
	github, launch, screenshots, website: { domain }
}) => {
	const date = parse(launch, `yyyy-MM-dd`, new Date());
	return (
		<article className={styles.site}>
			<h2>
				<a>{domain}</a>
			</h2>
			<p className={styles.launch}>{format(date, `MMMM yyyy`)}</p>
			{github
				&& <a href={github} target="_blank" className={styles.github}>
					<Icon icon="github" />
					<span className="sr-only">{domain} code repository on GitHub</span>
				</a>
			}
		</article>
	);
};

export default Site;
