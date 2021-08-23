import React from 'react';

import Laptop from '../../../img/desktop.svg';
import Mobile from '../../../img/mobile.svg';
import Tablet from '../../../img/tablet.svg';
import * as styles from './screenshots.module.scss';

const Screenshots = ({ laptop, mobile, tablet }) => {
	console.log();

	return (
		<ul className={styles.screenshots}>
			{laptop
				&& <li className={`${styles.laptop} ${styles.image}`}>
					<Laptop />
					<img src={laptop.url} />
				</li>
			}
			{tablet
				&& <li className={`${styles.tablet} ${styles.image}`}>
					<Tablet />
					<img src={tablet.url} />
				</li>
			}
			{mobile
				&& <li className={`${styles.mobile} ${styles.image}`}>
					<Mobile />
					<img src={mobile.url} />
				</li>
			}

		</ul>
	);
};

export default Screenshots;
