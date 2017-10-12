import React from 'react';
import '../resources/footer.css';

//Resources
import {Codepen, Github, Facebook, Twitter, Mail} from 'react-feather';

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
        'url': 'https://twitter.com/amykate_94',
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
                {navItems}
            </nav>
        );
    };
};