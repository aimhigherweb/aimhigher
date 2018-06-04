import React, {Fragment, Component} from 'react';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

//Resources
import {menuItems} from '../app/index.js';
import { Menu } from 'react-feather';
import Favicon from '../../img/favicon.png';
import Logo from '../../img/logo.svg';

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
            <SiteTitle />
            <MainMenu />
          </Fragment>
        );
    };
};

const SiteTitle = () => (
	<div className="site-logo">
		<a aria-label="Logo linked to homepage" href="/">
			<Logo />
		</a>
	</div>
);

const MainMenu = () => {
    let navItems = menuItems.map((navItem) => {
        if(!navItem.hideNav) {
            return (
                <NavLink key={navItem.title} to={navItem.slug} className={'' + navItem.class} activeClassName="current">
                    {navItem.title}
                </NavLink>
            );
        };
    });

    return (
        <nav id="nav-main" className="menu main">
            <a className="hamburger" href="#menu">
                <Menu />
            </a>
            {navItems}
        </nav>
    );
}

export default Header;
