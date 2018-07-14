import React, {Fragment, Component} from 'react';
import Helmet from 'react-helmet';
import Media from 'react-media';
import ReactSVG from 'react-svg';

//Resources
import Background from '../../img/wave.svg';
import {menuItems} from '../app/index.js';
import { Menu, X } from 'react-feather';
import Favicon from '../../img/favicon.png';
import Logo from '../../img/logo.svg';


import {Hamburger, HeroBack, Item, LogoArea, Nav} from './style.js';

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
                <HeroBack path={Background} renumerateIRIElements={false} />
                <SiteTitle />
                <MainMenu />
            </Fragment>
        );
    };
};

const SiteTitle = () => (
    <LogoArea aria-label="Logo linked to homepage" href="/">
        <ReactSVG path={Logo} />
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
