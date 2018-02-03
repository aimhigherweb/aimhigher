import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Components
import {ColourSwatches, Typography} from '../../layouts/styleGuide.js';

//Resources
import '../../resources/styleGuide.css';

class Meta extends Component {
    render() {
        let name = 'Style Guide - Glenrock Hay';
        let description ="Want to know more about the style guides we make?";
        let slug = 'style-guide';
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

export class StyleGuide extends Component {
    render() {
        let names= [
            'green',
            'lime',
            'black'
        ];

        return (
            <div className="content">
                <Meta />
                <Typography clientName="glenrockHay" />
                <ColourSwatches primary="#005b52" supporting="#00ff00" neutral="#000000" names={names} />
            </div>
        );
    }
};