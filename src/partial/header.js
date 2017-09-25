import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import ReactSVG from 'react-svg';

//Components
import {App} from '../App.js';

//Resources
import {Menu} from 'react-feather';
import '../resources/header.css';

//Variables
export const menuItems = [
    {
        slug: '/',
        title: 'Home',
        component: 'Home'
    },
    {
        slug: 'about-us',
        title: 'About Us',
        component: 'About'
    },
    {
        slug: 'products-services',
        title: 'Products and Services',
        component: 'ProductsServices'
    },
    {
        slug: 'portfolio',
        title: 'Portfolio',
        component: 'Portfolio'
    },
    {
        slug: 'faq',
        title: 'FAQ',
        component: 'FAQ'
    },
    {
        slug: 'code-of-ethics',
        title: 'Code of Ethics',
        component: 'CodeEthics'
    },
    {
        slug: 'contact',
        title: 'Contact',
        component: 'Contact'
    },
];

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

class SiteTitle extends React.Component {
    render() {
        return(
            <div className="site-logo">
                <a href="/">
                    <ReactSVG path="/img/logo.svg" />
                </a>
            </div>
        );
    };
};

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
                <li>
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