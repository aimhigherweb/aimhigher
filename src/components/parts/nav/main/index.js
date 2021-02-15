import { Link } from 'gatsby';
import React from 'react';

import styles from './main.module.scss';

const Nav = ({ items }) => (
	<nav className={styles.nav}>
		<ul>
			{items.map(({ label, link }) => (
				<li key={label}>
					<Link
						to={link}
						activeClassName="current"
						className={styles.item}
					>{label}</Link>
				</li>
			))}
		</ul>
	</nav>
);

export default Nav;
