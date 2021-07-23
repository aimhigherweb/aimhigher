import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Footer from '../footer';

const FooterData = ({
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
		}) => (
			<Footer
				{...{
					footer,
					social,
					curveImage,
					site,
					FooterCurve,
					footerImage,
					lightNav,
					variation
				}}
			/>
		)}
	/>
);

export default FooterData;
