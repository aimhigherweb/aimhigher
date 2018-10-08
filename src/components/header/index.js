import React, {Fragment, Component} from 'react';
import ReactSVG from 'react-svg';

//Resources
// import Background from '../../img/wave.svg';
// import Logo from '../../img/logo.svg';


import {HeroBack, Item, LogoArea, Nav} from './style.js';

const menuItems = [
    {
        slug: '/about',
        title: 'About',
    },
    {
        slug: '/services',
        title: 'Services',
        component: ProductsServices,
    },
    {
        slug: '/portfolio',
        title: 'Portfolio',
        component: Portfolio,
    },
    {
        slug: '/faq',
        title: 'FAQ',
    },
    {
        slug: '/blog',
        title: 'Blog',
        component: Feed,
    },
    {
          slug: '/contact',
          title: 'Contact',
    }
];

class Header extends Component {
    render() {        
        return (
            <Fragment>
                {/* <HeroBack path={Background} renumerateIRIElements={false} /> */}
                <SiteTitle />
                <MainMenu />
            </Fragment>
        );
    };
};

const SiteTitle = () => (
    <LogoArea aria-label="Logo linked to homepage" href="/">
        {/* <ReactSVG path={Logo} /> */}
    </LogoArea>
);

const MainMenu = () => {
    let navItems = menuItems.map((navItem) => {
        if(!navItem.hideNav) {
            return (
                <Item key={navItem.title} to={navItem.slug} className={'' + navItem.class} activeClassName="current">
                    {navItem.title}
                </Item>
            );
        };
    });

    return (
        <Nav id="menu">
            {navItems}
        </Nav>
    );
}

export default Header;
