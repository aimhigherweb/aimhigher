import React from 'react';

import DefaultCurve from '../../../img/banners/footer.svg';
import HomeFooter from '../../../img/banners/footer_home.svg';
import FooterNav from '../../parts/nav/footer';
import Social from '../../parts/nav/social';
import { footerBackground, mainFooter } from './footer.module.scss';

const Footer = ({
	footerImage, lightNav, variation, footer, social, curveImage, site
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
			{variation === `home`
				? <HomeFooter className={footerBackground} />
				: <DefaultCurve className={footerBackground} />
			}
			<FooterNav items={footer.edges[0].node.childrenMenus} />

			<Social items={social.edges[0].node.childrenMenus} />
		</footer>
	);
};

export default Footer;
