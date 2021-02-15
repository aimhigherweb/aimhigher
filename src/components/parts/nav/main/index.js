import { Link } from 'gatsby';
import React, { useState } from 'react';

import Icon from '../../../../../lib/parts/icon';
import styles from './main.module.scss';

const Nav = ({ items }) => {
	const [open, setOpen] = useState(false);

	return (
		<nav className={styles.nav} open={open}>
			<button onClick={() => setOpen(!open)} className={styles.hamburger}>
				<Icon icon="hamburger" className={styles.menu} />
				<Icon icon="close" className={styles.close} />
				<span className="sr-only">Toggle Main Nav</span>
			</button>
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
};

export default Nav;
