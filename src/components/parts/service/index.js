import React from 'react';

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

const Service = ({ html, title, icon }) => (
	<li className={styles.service}>
		<h2>{title}</h2>
		<div className={styles.description} dangerouslySetInnerHTML={{ __html: html }} />
		<div className={styles.icon}>
			<Circle className={styles.circle} />
			<Icon icon={icon} />
		</div>
	</li>
);

const Icon = ({ icon }) => {
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
