import React, {Component, Fragment} from 'react';

//Resources
import {Codepen, Github, Facebook, Twitter, Mail, Instagram} from 'react-feather';
import legalItems from '../app/index.js';

const menuItems = [
	{
		name: 'codepen',
		icon: <Codepen />,
		url: 'https://codepen.io/aimhigherwebdesign-amy/',
	},
	{
		name: 'github',
		icon: <Github />,
		url: 'https://github.com/amykapernick/aimhigher-react',
	},
	{
		name: 'facebook',
		icon: <Facebook />,
		url: 'https://www.facebook.com/aimhigherwebdesign',
	},
	{
		name: 'twitter',
		icon: <Twitter />,
		url: 'https://twitter.com/aimhigherweb',
	},
	{
		name: 'instagram',
		icon: <Instagram />,
		url: 'https://www.instagram.com/aimhigherweb/',
	},
	{
		name: 'email',
		icon: <Mail />,
		url: 'mailto:inquiries@aimhigherwebdesign.com.au',
	},
];

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <h2>Footer</h2>
            </Fragment>
        );
    };
};


export default Footer;