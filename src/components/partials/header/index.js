import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

import Logo from '../../../../lib/parts/logo';

const Header = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: allFile(
					filter: {
						name: {
							eq: "main"
						}
						sourceInstanceName: {
							eq: "menus"
						}
					}
				) {
					edges {
						node {
							childrenMenus {
								label
								link
							}
						}
					}
				}
			}
		`}
		render={({ menu }) => {
			const items = menu.edges[0].node.childrenMenus;

			return (
				<header>
					<Link to="/">
						<Logo />
						<span className="sr-only">Link to homepage</span>
					</Link>
					<nav>
						<ul>
							{items.map(({ label, link }) => (
								<li key={label}>
									<Link to={link} activeClassName="current">{label}</Link>
								</li>
							))}
						</ul>
					</nav>
				</header>
			);
		}}
	/>
);

export default Header;
