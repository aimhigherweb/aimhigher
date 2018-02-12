import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ReactSVG from 'react-svg';

//Resources
import '../../scss/layouts/home.scss';
import { ChevronsDown } from 'react-feather';
import BackgroundPlaceholder from '../../img/parallax/unsplash.svg';

class Meta extends Component {
	render() {
		let name = 'AimHigher Web Design';
		let description =
			'AimHigher Web Design bridges the gap between technology and business throughout Australia.';
		let slug = '';
		let image =
			'https://aimhigherwebdesign.com.au/img/logo.png';
		return (
			<Helmet>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link
					rel="canonical"
					href={
						'https://aimhigherwebdesign.com.au/' +
						slug
					}
				/>

				{/* Facebook */}
				<meta
					property="og:url"
					content={
						'https://aimhigherwebdesign.com.au/' +
						slug
					}
				/>

				<meta property="og:title" content={name} />
				<meta property="og:image" content={image} />
				<meta
					property="og:description"
					content={description}
				/>

				{/* Twitter */}
				<meta
					name="twitter:url"
					content={
						'https://aimhigherwebdesign.com.au/' +
						slug
					}
				/>
				<meta name="twitter:title" content={name} />
				<meta
					name="twitter:description"
					content={description}
				/>
				<meta name="twitter:image" content={image} />
			</Helmet>
		);
	}
}

export class Home extends Component {
	render() {
		return (
			<section className="parallax home">
				<Meta />
				<div className="bcg slide-1 intro">
					<ReactSVG path={BackgroundPlaceholder} className="placeholder home" />
				</div>
				<div className="container slide-1 intro">
					<div className="scroll">
						<a aria-label="Click to scroll" href="#slide-1-content">
							<ChevronsDown />
						</a>
					</div>
					<div id="slide-1-content" className="content link-content">
						<p>
							AimHigher Web Design is based in
							Perth and specialises in designing
							modern and professional websites that
							can be easily maintained by anyone,
							regardless of their technical skill.
							We also provide a full website
							management service.
						</p>
						<p>
							AimHigher Web Design bridges the gap
							between technology and business
							throughout Australia. We are experts
							in search engine optimisation
							(SEO)—in other words, the little
							tricks that get your business to the
							top of internet searches.
						</p>
						<p>
							We also provide prompt and efficient
							after-sales technical support to keep
							your website working for you, while
							you get on with business.
						</p>
					</div>
				</div>
			</section>
		);
	}
}
