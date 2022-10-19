import React from 'react';

import Icon from '../../../../../lib/parts/icon';
import * as styles from './social.module.scss';

const Nav = ({ items }) => (
	<nav aria-label="social-nav" className={styles.nav}>
		<ul>
			{items.map(({ label, icon, link }) => (
				<li key={label}>
					<a
						target="_blank"
						href={link}
						className={styles.item}
					>
						<Icon icon={icon} />
						<span className="sr-only">{label}</span>
					</a>
				</li>
			))}
		</ul>
	</nav>
);

export default Nav;
