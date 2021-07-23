import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import DefaultCurve from '../../../img/banners/footer.svg';
import FooterNav from '../../parts/nav/footer';
import Social from '../../parts/nav/social';
import { footerBackground, mainFooter } from './footer.module.scss';

const Footer = ({
	FooterCurve, footerImage, lightNav, variation
}) => (
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
				curveImage: file(
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
				site {
					siteMetadata {
						siteUrl
					}
				}
			}
		`}

		render={({
			footer, social, curveImage, site
		}) => {
			const curveURL = footerImage || curveImage.publicURL;

			return (
				<footer
					className={mainFooter}
					style={{
						'--backgroundCurve': `url('${site.siteMetadata.siteUrl}${curveURL}')`
					}}
					data-variation={variation}
					data-light={lightNav}
				>
					{FooterCurve
						? <FooterCurve />
						: <DefaultCurve className={footerBackground} />
					}
					<FooterNav items={footer.edges[0].node.childrenMenus} />

					<Social items={social.edges[0].node.childrenMenus} />
				</footer>
			);
		}}
	/>
);

export default Footer;
