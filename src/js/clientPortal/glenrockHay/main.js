import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components
import { StyleGuide } from './styleGuide';

//Resources
import '../../../scss/clientPortal/glenrockHay/styles.scss';

class Meta extends Component {
    render() {
        let name = 'Glenrock Hay - Client Information';
        let description ="Don't look through emails, it's all here";
        let slug = 'glenrock-hay';
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

export class GlenrockHay extends Component {
    render() {
        document.getElementById('root').classList.add('style-guide');

        return (
            <div className="content typography glenrockHay">
                <Meta />
                <h1>Glenrock Hay</h1>
                <div>
                    <StyleGuide />
                </div>
            </div>
        );
    }
};