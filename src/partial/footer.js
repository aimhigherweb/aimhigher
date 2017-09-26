import React from 'react';
import '../resources/footer.css';

//Resources
import {Codepen, Github, Facebook, Twitter} from 'react-feather';

const menuItems = [
    {
        'icon': <Codepen />,
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'icon': <Github />,
        'url': 'https://github.com/amykapernick/aimhigher-react',
    },
    {
        'icon': <Facebook />,
        'url': 'https://www.facebook.com/aimhigherwebdesign',
    },
    {
        'icon': <Twitter />,
        'url': 'https://twitter.com/amykate_94',
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
                    {navItem.icon}
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