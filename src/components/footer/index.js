import React, {Component, Fragment} from 'react';

//Resources
import {Codepen, Github, Facebook, Twitter, Mail, Instagram} from 'react-feather';
import footerMenu from '../../components/app/index.js';

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
                <FooterMenu />
            </Fragment>
        );
    };
};

const FooterMenu = () => {
    let navItems = menuItems.map((navItem) => {
        return(
            <a href={navItem.url} key={navItem.name} target="_blank" className={'social-link ' + navItem.name}>
                {navItem.icon}
            </a>
        );
    });

    return (
        <nav className="social">
            {navItems}
        </nav>
    );
};

const FooterSocial = () => {
    let navItems = menuItems.map((navItem) => {
        return (
            <a
                aria-label={navItem.name + ' link'}
                href={navItem.url}
                key={navItem.name}
                target="_blank"
                className={'social-link ' + navItem.name}
            >
                {navItem.icon}
            </a>
        );
    });

    return <nav className="social">{navItems}</nav>;
};


export default Footer;