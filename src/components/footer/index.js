import React, { Component, Fragment } from 'react';

//Resources
import { Codepen, Facebook, Twitter, Mail, Instagram } from 'react-feather';
import Github from '../../img/github.svg';

import { Item, ItemSocial, Nav, SocialNav } from './style.js';

const menuItems = [
	{
		name: 'codepen',
		icon: <Codepen />,
		url: 'https://codepen.io/aimhigherwebdesign-amy/',
	},
	{
		name: 'github',
		icon: <Github />,
		url: 'https://github.com/AimHigher-Web-Design/aimhigher',
	},
	{
		name: 'facebook',
		icon: <Facebook />,
		url: 'https://www.facebook.com/aimhigherwebdesign',
	},
	{
		name: 'twitter',
		icon: <Twitter />,
		url: 'https://twitter.com/aimhigherweb',
	},
	{
		name: 'instagram',
		icon: <Instagram />,
		url: 'https://www.instagram.com/aimhigherweb/',
	},
	{
		name: 'email',
		icon: <Mail />,
		url: 'mailto:inquiries@aimhigherweb.design',
	},
];

const legalItems = [
	{
		slug: '/privacy',
		title: 'Privacy Policy',
	},
	{
		slug: '/terms',
		title: 'Terms and Conditions',
	},
];

class Footer extends Component {
	render() {
		return (
			<Fragment>
				<FooterNav />
				<FooterSocial />
			</Fragment>
		);
	}
}

const FooterNav = () => {
	let legalNav = legalItems.map((legalItem) => {
		return (
			<Item key={legalItem.title} to={legalItem.slug}>
				{legalItem.title}
			</Item>
		);
	});

	return (
		<Nav>
			<Item to="/">Home</Item>
			{legalNav}
		</Nav>
	);
};

const FooterSocial = () => {
	let socialNav = menuItems.map((menuItem) => {
		return (
			<ItemSocial href={menuItem.url} key={menuItem.name} target="_blank">
				{menuItem.icon}
				<span>{menuItem.name}</span>
			</ItemSocial>
		);
	});

	return <SocialNav>{socialNav}</SocialNav>;
};

export default Footer;
