import React, { Fragment, Component } from 'react';

//Resources
import Background from '../../img/wave.svg';
import Logo from '../../img/logo.svg';

import { HeroBack, Item, LogoArea, Nav } from './style.js';

const menuItems = [
	{
		slug: '/about',
		title: 'About',
	},
	{
		slug: '/services',
		title: 'Services',
	},
	{
		slug: '/portfolio',
		title: 'Portfolio',
	},
	{
		slug: '/faq',
		title: 'FAQ',
	},
	{
		slug: '/blog',
		title: 'Blog',
	},
	{
		slug: '/contact',
		title: 'Contact',
	},
];

class Header extends Component {
	render() {
		return (
			<Fragment>
				<HeroBack>
					<Background />
				</HeroBack>
				<SiteTitle />
				<MainMenu />
			</Fragment>
		);
	}
}

const SiteTitle = () => (
	<LogoArea aria-label="Logo linked to homepage" href="/">
		<Logo />
	</LogoArea>
);

const MainMenu = () => {
	let navItems = menuItems.map((navItem) => (
		<Item
			key={navItem.title}
			to={navItem.slug}
			className={'' + navItem.class}
		>
			{navItem.title}
		</Item>
	));

	return <Nav id="menu">{navItems}</Nav>;
};

export default Header;
