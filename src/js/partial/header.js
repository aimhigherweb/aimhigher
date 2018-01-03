import React from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import ReactSVG from 'react-svg';

//Components
import {App} from './app.js';
import {menuItems} from '../data/navItems.js';

//Resources
import Logo from '../../img/logo.svg';
import {Menu} from 'react-feather';
import '../../scss/partials/header.scss';

export class Header extends React.Component {
    render() {
        return (
          <div className="inner">
            <SiteTitle />
            <MainMenu />
          </div>
        );
    };
};

const SiteTitle = (
    <div className="site-logo">
        <a href="/">
            <ReactSVG path={Logo} />
        </a>
    </div>
);

class MainMenu extends React.Component {
    mobileMenu() {
        if(document.getElementsByClassName('main menu active').length < 1) {
            document.getElementById('nav-main').classList.add('active');
        }
        else {
            document.getElementById('nav-main').classList.remove('active');
        };
    };
    

    render() {
        let navItems = menuItems.map(navItem => {
            return(
                <li key={navItem.title}>
                    <NavLink to={navItem.slug} onClick={<App />} activeClassName="current">
                        {navItem.title}
                    </NavLink>
                </li>
            );
        });

        return (
            <nav id="nav-main" className="menu main">
                <a href="#" className="hamburger" onClick={this.mobileMenu}>
                    <Menu />
                </a>
                <Router>
                    <ul>
                        {navItems}
                    </ul>
                </Router>
            </nav>
        );
    };
};