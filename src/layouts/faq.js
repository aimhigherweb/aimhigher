import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import '../resources/faq.css';

const accordion = [
    {
        title: 'What is a domain or a domain name?',
        slug: 'domain-name',
        content: 
            <div>
                <p>A domain name is the key part of your web address that visitors use to access your site - <span className="link">www.yourdomainhere.com</span> or <span className="link">www.yourdomainhere.com.au</span>.</p>      
                <p>Your domain name is also what is used when creating a related email address - <span className="link">john@yourdomainhere.com</span> or <span className="link">admin@yourdomainhere.com.au</span></p>
            </div>,
    },
    {
        title: '2',
        slug: '2',
        content: <p>Gsgdfsg</p>,
    },
    {
        title: '3',
        slug: '3',
        content: <p>dfsenseresg</p>,
    },
    {
        title: '4',
        slug: '4',
        content: <p>sbgtntent</p>,
    },
];

class Meta extends Component {
    render() {
        let name = 'FAQ | AimHigher Web Design';
        let description ="Have questions? We've already answered some of them for you.";
        let slug = 'faq';
        let image = 'https://aimhigherwebdesign.com.au/img/logo.png';
        return (
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={'https://aimhigherwebdesign.com.au/' + slug} />

                {/* Facebook */}
                <meta property="og:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                
                <meta property="og:title" content={name} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={description} />

                {/* Twitter */}
                <meta name="twitter:url" content={'https://aimhigherwebdesign.com.au/' + slug} />
                <meta name="twitter:title" content={name} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Helmet>
        );
    }
};

export class Faq extends Component {
    render() {
        return (
            <div className="content">
                <Meta />
                <h1>FAQ</h1>
                <Accordion />
            </div>
        );
    }
};

class Accordion extends Component {
    collapse(accordionItem) {
        console.log(accordionItem);
        let current = document.getElementsByClassName('active');
        while (current[0]) {
            current[0].classList.remove('active');
        };
        document.getElementById(accordionItem).classList.add('active');
    };

    render() {
        let children = accordion.map(child => {
            return(
                <div key={child.slug} id={child.slug} className="section" onClick={this.collapse.bind(this, child.slug)}>
                    <h3 className="title">{child.title}</h3>
                    <div className="content">{child.content}</div>
                </div>
            );
        });

        return (
            <div className="accordion">
                {children}
            </div>
        );
    };
};