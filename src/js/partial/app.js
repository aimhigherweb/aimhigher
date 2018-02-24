import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

//Resources
import '../../scss/content.scss';
import favicons from '../../img/favicons/*';

//Components
import { Home } from '../layouts/home.js';
import { About } from '../layouts/about.js';
import { ProductsServices } from '../layouts/products.js';
import { Portfolio } from '../layouts/portfolio.js';
import { Faq } from '../layouts/faq.js';
import { CodeEthics } from '../layouts/ethics.js';
import { Contact } from '../layouts/contact.js';
import { Terms } from '../layouts/terms.js';
import { Privacy } from '../layouts/privacy.js';
import { StyleGuide } from '../layouts/styleGuide.js';

//Client Pages
import { WondaiCountry } from '../clientPortal/wondaiCountryFestival/main.js';
import { SocialPilot } from '../clientPortal/wondaiCountryFestival/socialpilot.js';
import { GlenrockHay } from '../clientPortal/glenrockHay/main.js';
import { Bitgenics } from '../clientPortal/bitgenics/main.js';
import { Owlkeyme } from '../clientPortal/owlkeyme/main.js';

// Variables
export const menuItems = [
	{
		slug: '/',
		title: 'Home',
		component: () => <Home />,
		class: 'hidden',
	},
	{
		slug: '/about-us',
		title: 'About Us',
		component: () => <About />,
	},
	{
		slug: '/services',
		title: 'Services',
		component: () => <ProductsServices />,
	},
	{
		slug: '/portfolio',
		title: 'Portfolio',
		component: () => <Portfolio />,
	},
	{
		slug: '/faq',
		title: 'FAQ',
		component: () => <Faq />,
	},
	{
		slug: '/code-of-ethics',
		title: 'Code of Ethics',
		component: () => <CodeEthics />,
	},
	{
		slug: '/contact',
		title: 'Contact',
		component: () => <Contact />,
	},
];

export const legalItems = [
	{
		slug: '/privacy',
		title: 'Privacy Policy',
		component: () => <Privacy />,
	},
	{
		slug: '/terms',
		title: 'Terms of Use',
		component: () => <Terms />,
	},
];

const hiddenPages = [
	{
		slug: '/style-guide',
		title: 'Style Guide',
		component: () => <StyleGuide />,
	},
];

const clientPages = [
	{
		slug: '/wondai-country-festival',
		title: 'Wondai Country Running Festival',
		component: () => <WondaiCountry />,
	},
	{
		slug: '/wondai-country-festival/socialpilot',
		title: 'SocialPilot Instructions - Wondai Country Running Festival',
		component: () => <SocialPilot />,
	},
	{
		slug: '/glenrock-hay',
		title: 'Glenrock Hay',
		component: () => <GlenrockHay />,
	},
	{
		slug: '/bitgenics',
		title: 'Bitgenics',
		component: () => <Bitgenics />,
	},
	{
		slug: '/owlkeyme',
		title: 'Owlkeyme',
		component: () => <Owlkeyme />,
	},
];

const routeItems = menuItems
	.concat(legalItems)
	.concat(hiddenPages)
	.concat(clientPages);

class Meta extends Component {
	render() {
		return (
			<Helmet>
				<link rel="shortcut icon" href={favicons['favicon.png']} />
				<link rel="icon" type="image/png" sizes="16x16" href={favicons['favicon-16.png']} />
				<link rel="icon" type="image/png" sizes="32x32" href={favicons['favicon-32.png']} />
				<link rel="icon" type="image/png" sizes="96x96" href={favicons['favicon-96.png']} />

				<link rel="apple-touch-icon" href={favicons['favicon-180.png']} />
				<meta name="theme-color" content="#1C75BC" />
				<link rel="icon" sizes="192x192" href={favicons['favicon-192.png']} />
			</Helmet>
		);
	}
}

export class App extends Component {
	render() {
		window.onscroll = function() {
			const perHeight = window.innerHeight * 0.3;
			if (document.documentElement.scrollTop > perHeight) {
				document.getElementById('root').classList.add('scrolled');
			} else {
				document.getElementById('root').classList.remove('scrolled');
			}
		};

		document.getElementById('root').classList.remove('style-guide');

		let pages = routeItems.map((page) => {
			return (
				<Route
					exact
					path={page.slug}
					component={page.component}
					key={page.slug}
				/>
			);
		});

		return (
			<div className="container">
				<Meta />
				<Switch>{pages}</Switch>
			</div>
		);
	}
}
