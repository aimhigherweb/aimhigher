import React from 'react';

import Laptop from '../../../img/desktop.svg';
import Mobile from '../../../img/mobile.svg';
import Tablet from '../../../img/tablet.svg';
import * as styles from './screenshots.module.scss';

const Screenshots = ({
	laptop, mobile, tablet, domain
}) => (
	<ul className={styles.screenshots}>
		{laptop
			&& <li className={`${styles.laptop} ${styles.image}`}>
				<Laptop />
				<img src={laptop.url} alt={`Screenshot of ${domain} website at desktop size`} />
			</li>
		}
		{tablet
			&& <li className={`${styles.tablet} ${styles.image}`}>
				<Tablet />
				<img src={tablet.url} alt={`Screenshot of ${domain} website at tablet size`} />
			</li>
		}
		{mobile
			&& <li className={`${styles.mobile} ${styles.image}`}>
				<Mobile />
				<img src={mobile.url} alt={`Screenshot of ${domain} website at mobile size`} />
			</li>
		}

	</ul>
);

export default Screenshots;
