import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
// import './resources/ethics.css';

export class CodeEthics extends Component {
    render() {
        return (
            <div>
                 <Helmet>
                    <title> Code of Ethics | AimHigher Web Design</title>
                    <meta name="description" content="Contact us today to see how we can help your business" />
                    <link rel="canonical" href="https://aimhigherwebdesign.com.au/contact" />

                    {/* Facebook */}
                    <meta property="og:url" content="https://aimhigherwebdesign.com.au/contact" />
                    
                    <meta property="og:title" content="Contact Us | AimHigher Web Design" />
                    <meta property="og:image" content="https://aimhigherwebdesign.com.au/img/logo.png" />
                    <meta property="og:description" content="Contact us today to see how we can help your business" />

                    {/* Twitter */}
                    <meta name="twitter:url" content='https://aimhigherwebdesign.com.au/contact' />
                    <meta name="twitter:title" content="Contact Us | AimHigher Web Design" />
                    <meta name="twitter:description" content="Contact us today to see how we can help your business" />
                    <meta name="twitter:image" content="https://aimhigherwebdesign.com.au/img/logo.png" />
                </Helmet>
                <h1>Code of Ethics</h1>
                <h2>Hello World</h2>
            </div>
        );
    }
};