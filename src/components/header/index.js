import React, {Fragment, Component} from 'react';
import Helmet from 'react-helmet';

//Resources
import Background from '../../img/wave.svg';
import Favicon from '../../img/favicon.png';
import Logo from '../../img/logo.svg';

import {HeroBack, Item, LogoArea, Nav} from './style.js';

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

const Meta = () => {
    return (
        <Helmet>
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="shortcut icon" href={Favicon} />
            <link rel="icon" sizes="192x192" href={Favicon} />
            <link rel="apple-touch-icon" href={Favicon} />
            <meta name="theme-color" content="#1C75BC" />
            <link rel="mask-icon" href={Favicon} color="#1C75BC" />
            <base href="/" />
        </Helmet>
    );
};
  

class Header extends Component {
    render() {        
        return (
            <Fragment>
                <Meta />
                <HeroBack><Background/></HeroBack>
                <SiteTitle />
                <MainMenu />
            </Fragment>
        );
    };
};

const SiteTitle = () => (
    <LogoArea aria-label="Logo linked to homepage" href="/">
        <Logo/>
    </LogoArea>
);

const MainMenu = () => {
    let navItems = menuItems.map((navItem) => (
        <Item key={navItem.title} to={navItem.slug} className={'' + navItem.class}>
            {navItem.title}
        </Item>
    ));

    return (
        <Nav id="menu">
            {navItems}
        </Nav>
    );
}

export default Header;
