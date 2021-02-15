import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

import Logo from '../../../../lib/parts/logo';
import Nav from "../../parts/nav/main";
import styles from './header.module.scss';

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
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						<Logo />
						<span className="sr-only">Homepage</span>
					</Link>
					<Nav items={items} />
				</header>
			);
		}}
	/>
);

export default Header;
