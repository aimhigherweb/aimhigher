import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import ReactSVG from 'react-svg';

// Components
import {FaFacebookSquare, FaTwitterSquare, FaInstagram} from 'react-icons/lib/fa';

//Resources
import Logo from '../../img/logo.svg';
import '../../scss/partials/styleGuide.scss';


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
        let names=[
            'blue',
            'aqua',
            'grey'
        ];

        return (
            <div className="content">
                <Meta />
                <h1>Style Guides</h1>
                <h2>AimHigher Web Design</h2>
                <Typography />
                <ColourSwatches primary='#1c75bc' supporting='#16a6b1' neutral='#5b5b5b' names={names} />
            </div>
        );
    }
};

export class ColourSwatches extends Component {
    constructor() {
        super();
        this.state = {
            colours: {},
            names: [],
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
        this.setState({
            colours: colours,
            names: [this.props.names],
        });
    };

    render() {
        let colours = this.state.colours;
        let colNames = this.state.names[0];

        let colArray = [colours.primary, colours.supporting, colours.neutral];

        let colSets = colArray.map(set => {
            return (
                <ColourSet set={set} />
            );
        });

        // console.log(colours);

        let colVars = '';

        for(var i = 0; i < 3; i++) { //Primary, supporting and neutral
            for (var colSet in colArray[i]) { //Light, dark and main

                if (colArray[i][colSet].name) { //If it's main

                    let thisCols = '$' + colArray[i][colSet].name + ':' + colArray[i][colSet].hex;
                    
                    colVars += thisCols;
                }
                else { //Loops through light and dark groups
                    for (var colGroup in colArray[i][colSet]) {


                        let thisCols = '$' + colNames[i] + '_' + colArray[i][colSet][colGroup].name + ':' + colArray[i][colSet][colGroup].hex;
                        
                        colVars += thisCols;
    
                    };
                };
            };

            console.log(colVars);
        };

        return (
            <div>
                <h3>Colours</h3>
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

export class ColourSet extends Component {
    render() {
        let colGroupLight = this.props.set.light;
        let colGroupDark = this.props.set.dark;
        let colMain = this.props.set.main;


        return (
            <div className="colour set">
                <ColourSwatch cols={colMain} />
                <div className="colour group-container">
                    {colMain.hex != "#FFFFFF" &&
                        <ColourGroup colgroup={colGroupLight} vars='light' />
                    }
                    {colMain.hex != "#000000" &&
                        <ColourGroup colgroup={colGroupDark} vars='dark' />
                    }
                </div>
            </div>
        );
    };
};

export class Typography extends Component {
    render() {
        let clientLogo, logoOri;

        if (this.props.clientName) {
            clientLogo = this.props.logo;
            logoOri = this.props.ori;
        }
        else {
            clientLogo = Logo;
            logoOri = 'landscape';
        };

        return (
            <div>
                <h3 className="style-guide-heading">Typography</h3>
                <div className="typography">
                    <div className={"logo-headings " + logoOri}>
                        <div className={'logo ' + logoOri}>
                            <figure>
                                <ReactSVG path={clientLogo} />
                                <figcaption>This is what an image caption will look like, not all images will have captions though.</figcaption>
                            </figure>
                        </div>
                        <div className="headings">
                            <h1>Heading 1</h1>
                                <p>Traditionally, you'll only see one Heading 1 per page. It's the main page title, the name of the page.</p>
                                <p>Every page should have a H1 as they're used for SEO and screen readers</p>
                            <h2>Heading 2</h2>
                                <p>Heading 2 helps to define the other sections within the page so you can have multiple H2's within a page</p>
                            <h3>Heading 3</h3>
                                <p>This is a third level heading, H3. This is the last level heading that you use on a regular basis (otherwise things can look a little cluttered).</p>
                            <h4>Heading 4</h4>
                            <h5>Heading 5</h5>
                        </div>
                    </div>
                    <hr />
                    <div className="content-types">
                        <h4 className="section-titles">Content Sections</h4>
                        <p>This is a paragraph. This is how most of your content will look on your website. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to</p>
                        <blockquote>
                            This is a blockquote. These are often used to show breakout text, like you should see with a quote in a newspaper or magazine.
                        </blockquote>
                        <div className="section-container">
                            <div className="lists">
                                <h4 className="section-title">Lists</h4>
                                <ul>
                                    <li>This</li>
                                    <li>is a</li>
                                    <li>bulleted</li>
                                    <li>list</li>
                                </ul>
                                <ol>
                                    <li>This</li>
                                    <li>is a</li>
                                    <li>numbered</li>
                                    <li>list</li>
                                </ol>
                            </div>
                            <div className="icons">
                                <h4 className="section-title">Icons</h4>
                                <FaFacebookSquare />
                                <FaTwitterSquare />
                                <FaInstagram />
                            </div>
                        </div>
                        <div className="form">
                            <h4 className="section-title">Other Elements</h4>
                            <form>
                                <h5>Form</h5>
                                <input type="text" placeholder="Input Field" />
                                <button>Button</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}