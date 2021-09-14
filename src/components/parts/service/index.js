import { Link } from 'gatsby';
import React, { Fragment } from 'react';

import Analytics from '../../../img/icons/analytics.svg';
import Design from '../../../img/icons/design.svg';
import Handshake from '../../../img/icons/handshake.svg';
import Hosting from '../../../img/icons/hosting.svg';
import Monitor from '../../../img/icons/monitor.svg';
import Shopping from '../../../img/icons/shopping.svg';
import Twitter from '../../../img/icons/twitter.svg';
import Writing from '../../../img/icons/writing.svg';
import Circle from '../../../img/illustrations/circle.svg';
import * as styles from './service.module.scss';

const Service = ({
	html = ``, name, excerpt, title, icon
}) => (
	<li className={styles.service} data-linked={(html !== `` && excerpt) && true}>
		<h2>{title}</h2>
		{excerpt
			? <div className={styles.description}>
				<p dangerouslySetInnerHTML={{ __html: excerpt }} />
			</div>
			:		<div className={styles.description} dangerouslySetInnerHTML={{ __html: html }} />
		}
		<div className={styles.icon}>
			<Circle className={styles.circle} />
			<Icon icon={icon} />
		</div>
		{(html !== `` && excerpt) && <Link className={styles.link} to={name}>Find out more about {title}</Link>}
	</li>
);

export const Icon = ({ icon }) => {
	if (icon === `monitor`) {
		return <Monitor />;
	}

	if (icon === `analytics`) {
		return <Analytics />;
	}

	if (icon === `design`) {
		return <Design />;
	}

	if (icon === `handshake`) {
		return <Handshake />;
	}

	if (icon === `hosting`) {
		return <Hosting />;
	}

	if (icon === `twitter`) {
		return <Twitter />;
	}

	if (icon === `writing`) {
		return <Writing />;
	}

	if (icon === `shopping`) {
		return <Shopping />;
	}

	return <p>Invalid icon</p>;
};

export default Service;
