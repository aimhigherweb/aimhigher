import React, {Component, Fragment} from 'react';

//Resources
import {Codepen, Github, Facebook, Twitter, Mail, Instagram} from 'react-feather';
import {legalItems} from '../app/index.js';

import {Item, ItemSocial, Nav, SocialNav} from './style.js';

const menuItems = [
	{
		name: 'codepen',
		icon: <Codepen />,
		url: 'https://codepen.io/aimhigherwebdesign-amy/',
	},
	{
		name: 'github',
		icon: <Github />,
		url: 'https://github.com/amykapernick/aimhigher-react',
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
		url: 'mailto:inquiries@aimhigherwebdesign.com.au',
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
    };
};

const FooterNav = () => {
	let legalNav = legalItems.map((legalItem) => {
		return (
			<Item key={legalItem.title} to={legalItem.slug} activeClassName="current">
				{legalItem.title}
			</Item>
		);
	});

	return (
		<Nav>
			<Item to="/" activeClassName="current">
				Home
			</Item>
			{legalNav}
		</Nav>
	);
};

const FooterSocial = () => {
	let socialNav = menuItems.map((menuItem) => {
		return (
			<ItemSocial href={menuItem.url} key={menuItem.name} target="_blank">
				{menuItem.icon}
			</ItemSocial>
		);
	});

	return (
		<SocialNav>{socialNav}</SocialNav>
	);
};

export default Footer;