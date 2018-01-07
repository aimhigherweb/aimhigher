import React from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';

// Components
import {App, legalItems} from './app.js';

//Resources
import '../../scss/partials/footer.scss';
import {Codepen, Github, Facebook, Twitter, Mail, Instagram} from 'react-feather';

const menuItems = [
    {
        'name': 'codepen',
        'icon': <Codepen />,
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'name': 'github',
        'icon': <Github />,
        'url': 'https://github.com/amykapernick/aimhigher-react',
    },
    {
        'name': 'facebook',
        'icon': <Facebook />,
        'url': 'https://www.facebook.com/aimhigherwebdesign',
    },
    {
        'name': 'twitter',
        'icon': <Twitter />,
        'url': 'https://twitter.com/aimhigherweb',
    },
    {
        'name': 'instagram',
        'icon': <Instagram />,
        'url': 'https://www.instagram.com/aimhigherweb/',
    },
    {
        'name': 'email',
        'icon': <Mail />,
        'url': 'mailto:inquiries@aimhigherwebdesign.com.au',
    },
];

export class Footer extends React.Component {
    render() {
        return (
            <div>
                <FooterMenu />
                <FooterSocial />
            </div>
        );
    };
};

class FooterMenu extends React.Component {
    render() {
        let navItems = legalItems.map(navItem => {
            return(
                <li key={navItem.title}>
                    <NavLink to={navItem.slug} onClick={<App />} activeClassName="current">
                        {navItem.title}
                    </NavLink>
                </li>
            );
        });

        return (
            <nav id="nav-footer" className="menu footer">
                <Router>
                    <ul>
                        <li>
                            <NavLink to='/' onClick={<App />} activeClassName="current">
                                Home
                            </NavLink>
                        </li>
                        {navItems}
                    </ul>
                </Router>
            </nav>
        );
    };
};

class FooterSocial extends React.Component {
    render() {
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
};