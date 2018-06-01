import React from 'react';

//Resources
import {Share2, Github} from 'react-feather';


const menuItems = [
    {
        'name': 'github',
        'icon': <Github />,
        'url': 'https://github.com/AimHigher-Web-Design/prismic-blog',
    }
];

export class Footer extends React.Component {
    render() {
        return (
            <FooterMenu />
        );
    };
};

class FooterMenu extends React.Component {
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
                <span className="social-link share"><Share2 /></span>
                {navItems}
            </nav>
        );
    };
};
