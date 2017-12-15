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
            const hexToRgb = function(str) { 
                if ( /^#([0-9a-f]{3}|[0-9a-f]{6})$/ig.test(str) ) { 
                    var hex = str.substr(1);
                    hex = hex.length == 3 ? hex.replace(/(.)/g, '$1$1') : hex;
                    var rgb = parseInt(hex, 16);               
                    return [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255];
                } 
            
                return false; 
            }

            const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            }).join('');
          
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
                    r[i] = Math.round((opacity * rgb[i]) + ((1 - opacity) * colour));
                };

                return r;
            };

            colours[key] = {
                main: {
                    name: 'main',
                    rgb: colourMain,
                },
                light: {
                    90: {
                        name: '90',
                        rgb: convert(colourMain, 0.9, 'light')
                    },
                    75: {
                        name: '75',
                        rgb: convert(colourMain, 0.75, 'light'),
                    },
                    50: {
                        name: '50',
                        rgb: convert(colourMain, 0.5, 'light'),
                    },
                    25: {
                        name: '25',
                        rgb: convert(colourMain, 0.25, 'light'),
                    },
                    10: {
                        name: '10',
                        rgb: convert(colourMain, 0.1, 'light'),
                    },
                },
                dark: {
                    90: {
                        name: '90',
                        rgb: convert(colourMain, 0.9, 'dark'),
                    },
                    75: {
                        name: '75',
                        rgb: convert(colourMain, 0.75, 'dark'),
                    },
                    50: {
                        name: '50',
                        rgb: convert(colourMain, 0.5, 'dark'),
                    },
                    25: {
                        name: '25',
                        rgb: convert(colourMain, 0.25, 'dark'),
                    },
                    10: {
                        name: '10',
                        rgb: convert(colourMain, 0.1, 'dark'),
                    },
                },   
            };

            for (var cols in colours[key]) {
                if(colours[key][cols] == colours[key].main) {
                    let rgbVal = [
                        colours[key][cols].rgb[0], 
                        colours[key][cols].rgb[1], 
                        colours[key][cols].rgb[2],
                    ];

                    colours[key][cols].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2]);
                    
                    colours[key][cols].variant = (rgbVal[0] * 0.299) + (rgbVal[0] * 0.587) + (rgbVal[0] * 0.114);
                };

                for (var opts in colours[key][cols]) {
                    if(colours[key][cols] !== colours[key].main) {
                        let rgbVal = [
                            colours[key][cols][opts].rgb[0], 
                            colours[key][cols][opts].rgb[1], 
                            colours[key][cols][opts].rgb[2],
                        ];
        
                        colours[key][cols][opts].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2]);
        
                        colours[key][cols][opts].variant = (rgbVal[0] * 0.299) + (rgbVal[0] * 0.587) + (rgbVal[0] * 0.114);
                    };
                };
            };
        };
        this.setState({colours: colours});
    };

    render() {
        let colours = this.state.colours;

        let colArray = [colours.primary, colours.supporting, colours.neutral];

        let colSets = colArray.map(set => {
            return (
                <ColourSet set={set} />
            );
        });

        return (
            <div>
                {colSets}
            </div>
        );
    };
};

class ColourSwatch extends Component {
    render() {
        let thisCols = this.props.cols;
        let thisHex = thisCols.hex;
        let vars = thisCols.variant;
        let opts = thisCols.name;
        let type;

        if(vars >= 186) {
            type = 'light';
        }
        else {
            type = 'dark';
        };

        return (
            <div className={'colour swatch ' + opts + ' ' + type} style={{background: thisHex}}>
                <p>{thisHex}</p>
            </div>
        );
    };
};

class ColourGroup extends Component {
    render() {
        let colArray = [];

        for (var opts in this.props.colgroup) {
            colArray.unshift(this.props.colgroup[opts]);
        };

        let colSwatches = colArray.map(swatch => {
            return (
                <ColourSwatch key={swatch.name} cols={swatch} />
            );
        });

        return (
            <div className={'colour group ' + this.props.vars}>
                {colSwatches}
            </div>
        );
    };
};

class ColourSet extends Component {
    render() {
        let colGroupLight = this.props.set.light;
        let colGroupDark = this.props.set.dark;
        let colMain = this.props.set.main;

        return (
            <div className="colour set">
                <ColourSwatch cols={colMain} />
                <div className="colour group-container">
                    <ColourGroup colgroup={colGroupLight} vars='light' />
                    <ColourGroup colgroup={colGroupDark} vars='dark' />
                </div>
            </div>
        );
    };
};