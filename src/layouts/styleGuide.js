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
    constructor() {
        super();
        this.state = {
            colours: {},
        };
    };

    componentWillMount() {
        let colours = {
            primary: this.props.primary, 
            supporting: this.props.supporting, 
            neutral: this.props.neutral,
        };

        for (var key in colours) {
            const hexToRgb = hex =>
            hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                       ,(m, r, g, b) => '#' + r + r + g + g + b + b)
              .substring(1).match(/.{2}/g)
              .map(x => parseInt(x, 16))
          
            let colourMain = hexToRgb(colours[key]);

            let convert = function(rgb, opacity, variant) {
                let r = [];
                let colour;

                if(variant == 'light') {
                    colour = 255;
                }
                else if(variant == 'dark') {
                    colour = 0;
                }
                else {
                    console.log('Error, please specify a valid colour variant; light or dark');
                };

                for(let i = 0; i < 3; i++) {
                    r[i] = Math.round(colour + ((1 - opacity) * rgb[i]));
                };

                return r;
            };

            // let light_90 = convert(colourMain, 0.9, 'light');

            colours[key] = {
                main: colourMain,
                light_90: convert(colourMain, 0.9, 'light'),
            };

        };

        this.setState({colours: colours});
    };

    render() {
        console.log(this.state.colours);

        return (
            <div className="colour set">
                <div className="colour swatch main" style={{background: this.state.colours.primary.main}} >{this.state.colours.primary.main}</div>
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