import React from 'react';

//Resources
import {Menu} from 'react-feather';
import '../resources/header.css';

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
            return(
                <li>
                    <a href={navItem.slug} target="_blank" >
                        {navItem.title}
                    </a>
                </li>
            );
        });

        return (
            <nav id="nav-main" className="menu main">
                <a href="#" className="hamburger" onClick={this.mobileMenu}>
                    <Menu />
                </a>
                <ul>
                    {navItems}
                </ul>
            </nav>
        );
    };
};