import React from 'react';
import ReactSVG from 'react-svg';

//Resources
import '../resources/header.css';
import logo from '../resources/logo.svg';

//Variables
const menuItems = [
    {
        slug: '',
        title: 'Home'
    },
    {
        slug: 'about-us',
        title: 'About Us'
    },
    {
        slug: 'products-services',
        title: 'Products and Services'
    },
    {
        slug: 'portfolio',
        title: 'Portfolio'
    },
    {
        slug: 'faq',
        title: 'FAQ'
    },
    {
        slug: 'code-of-ethics',
        title: 'Code of Ethics'
    },
    {
        slug: 'contact',
        title: 'Contact'
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
            <a href="/" target="_blank" >
                {<ReactSVG path="/resources/logo.svg" />}
            </a>
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
            let navSrc = "https://thewest.com.au/" + navItem;
            return(
                <li>
                    <a href={navSrc} target="_blank" >
                        {navItem}
                    </a>
                </li>
            );
        });

        return (
            <nav id="nav-main" className="menu main">
                <a href="#" className="hamburger" onClick={this.mobileMenu}>
                {<ReactSVG path="img/menu.svg" />}
                </a>
                <ul>
                    {navItems}
                </ul>
            </nav>
        );
    };
};