import React, {Component, Fragment} from 'react';
import { NavLink } from 'react-router-dom';

//Resources
import {Codepen, Github, Facebook, Twitter, Mail, Instagram} from 'react-feather';
import {legalItems} from '../app/index.js';

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
			<NavLink key={legalItem.title} to={legalItem.slug} activeClassName="current">
				{legalItem.title}
			</NavLink>
		);
	});

	return (
		<nav id="nav-footer" className="menu footer">
			<NavLink to="/" activeClassName="current">
				Home
			</NavLink>
			{legalNav}
		</nav>
	);
};

const FooterSocial = () => {
	let socialNav = menuItems.map((menuItem) => {
		return (
			<a href={menuItem.url} key={menuItem.name} target="_blank" className={'social-link ' + menuItem.name}>
				{menuItem.icon}
			</a>
		);
	});

	return (
		<nav className="social">{socialNav}</nav>
	);
};

export default Footer;