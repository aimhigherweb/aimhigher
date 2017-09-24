import React from 'react';
import ReactSVG from 'react-svg';
import '../resources/footer.css';

const menuItems = [
    {
        'icon': 'img/codepen.svg',
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'icon': 'img/github.svg',
        'url': 'https://github.com/amykapernick/swm',
    },
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
                <a href={navItem.url} target="_blank" >
                    {<ReactSVG path={navItem.icon} />}
                </a>
            );
        });

        return (
            <div className="footer-links">
                {navItems}
            </div>
        );
    };
};