import React from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import ReactSVG from 'react-svg';

//Components
import {App, menuItems} from '../App.js';

//Resources
import {Menu} from 'react-feather';
import '../resources/header.css';

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