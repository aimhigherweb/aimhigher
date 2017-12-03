import React, { Component } from 'react';
import {Helmet} from 'react-helmet';

//Resources
import '../resources/styleGuide.css';

class Meta extends Component {
    render() {
        let name = 'Style Guides | AimHigher Web Design';
        let description ="Want to know more about the style guides we make?";
        let slug = 'style-guides';
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
        return (
            <div className="content">
                <Meta />
                <h1>Style Guides</h1>
                <h2>AimHigher Web Design</h2>
                <ColourSwatches primary="#1c75bc" supporting="#16a6b1" neutral="#5b5b5b" />
            </div>
        );
    }
};

class ColourSwatches extends Component {
    render() {
        let primary = this.props.primary;
        let colours = {
            primary: this.props.primary, 
            secondary: this.props.secondary, 
            neutral: this.props.neutral,
        };

        return (
            <div className="colour set">
                <div className="colour swatch main" style={{background: primary}} ></div>
                <div className="colour group light">
                    <div className="colour swatch 90"></div>
                    <div className="colour swatch 75"></div>
                    <div className="colour swatch 50"></div>
                    <div className="colour swatch 25"></div>
                    <div className="colour swatch 10"></div>
                </div>
                <div className="colour group dark">
                    <div className="colour swatch 90"></div>
                    <div className="colour swatch 75"></div>
                    <div className="colour swatch 50"></div>
                    <div className="colour swatch 25"></div>
                    <div className="colour swatch 10"></div>
                </div>
            </div>
        );
    };
};