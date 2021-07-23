import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

import Logo from '../../../../lib/parts/logo';
import DefaultHeader from '../../../img/banners/header_1.svg';
import Nav from "../../parts/nav/main";
import * as styles from './header.module.scss';

const Header = ({ HeaderCurve, lightNav }) => (
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
								external
								cta
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
					{HeaderCurve
						? <HeaderCurve />
						: <DefaultHeader className={styles.banner} />
					}
					<Link to="/" className={styles.logo}>
						<Logo version="white" />
						<span className="sr-only">Homepage</span>
					</Link>
					<Nav items={items} data-light={lightNav} />
				</header>
			);
		}}
	/>
);

export default Header;
