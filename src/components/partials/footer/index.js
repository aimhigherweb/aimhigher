import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import FooterCurve from '../../../img/banners/footer.svg';
import FooterNav from '../../parts/nav/footer';
import Social from '../../parts/nav/social';
import styles from './footer.module.scss';

const Footer = () => (
	<StaticQuery
		query={graphql`
			query {
				footer: allFile(
					filter: {
						name: {
							eq: "footer"
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
				social: allFile(
					filter: {
						name: {
							eq: "social"
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
								icon
							}
						}
					}
				}
				footerCurve: file(
					sourceInstanceName: {
						eq: "images"
					}, 
					relativeDirectory: {
						eq: "banners"
					}, 
					name: {
						eq: "footer"
					}
				) {
					publicURL
				}
			}
		`}
		render={({ footer, social, footerCurve }) => (
			<footer className={styles.footer} style={{ '--backgroundCurve': `url(${footerCurve.publicURL})` }}>
				<FooterCurve className={styles.banner} id="footerCurve" />
				<FooterNav items={footer.edges[0].node.childrenMenus} />

				<Social items={social.edges[0].node.childrenMenus} />
			</footer>
		)}
	/>
);

export default Footer;
