import { Link } from 'gatsby';
import React from 'react';

import { footerNav, footerNavItem } from './footer.module.scss';

const Nav = ({ items }) => (
	<nav className={footerNav}>
		<ul>
			{items.map(({ label, link }) => (
				<li key={label}>
					<Link
						to={link}
						className={footerNavItem}
					>
						{label}
					</Link>
				</li>
			))}
		</ul>
	</nav>
);

export default Nav;
