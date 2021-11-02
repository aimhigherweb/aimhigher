import { format, parse } from 'date-fns';
import React from 'react';

import Icon from '../../../../lib/parts/icon';
import Screenshots from '../siteScreenshots';
import * as styles from './site.module.scss';

const Site = ({
	github, launch, screenshots, website: { domain, live }
}) => {
	const date = parse(launch, `yyyy-MM-dd`, new Date());
	return (
		<article className={styles.site}>
			<Screenshots {...screenshots} />
			{live &&
				<h2>
					<a target="__blank" href={`//${domain}`}>{domain}</a>
				</h2>
			}
			<p className={styles.launch}>
				{live 
					? format(date, `MMMM yyyy`)
					: `Coming Soon`
				}
			</p>
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
