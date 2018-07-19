import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg';
import {ThemeProvider} from 'emotion-theming';

// Components
import {FaFacebookSquare, FaTwitterSquare, FaInstagram} from 'react-icons/lib/fa';
import {aimhigherTheme} from '../../index.js';
import {Meta} from '../parts/index.js';

import {Content, Head1, Head2, Head3, Head4, Head5} from '../../global.js';
import {FlexBlock, Icons, Set, Swatch, TypoContent} from './style.js';

//Resources
import Logo from '../../img/logo.svg';

const meta = {
    name: 'Style Guides | AimHigher Web Design',
    description: "Want to know more about the style guides we make?",
    slug: 'style-guide'
};
 
export const StyleGuide = () => {
    return (
        <Fragment>
            <Meta {...meta} />
            <Content>
                <Head1>Style Guide</Head1>
                <Typography theme={aimhigherTheme} />
                <ColourSwatches theme={aimhigherTheme} />
            </Content>
        </Fragment>
    );
};

export class ColourSwatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colours: {
                primary: this.props.theme.colours.primary.main, 
                secondary: this.props.theme.colours.secondary.main, 
                neutral: this.props.theme.colours.neutral.main,
            },
            colourTheme: {},
            names: ['primary', 'secondary', 'neutral'],
        };
    };

    luminanace(r, g, b) {
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow( (v + 0.055) / 1.055, 2.4 );
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    componentWillMount() {
        let colours = this.state.colours,
            colourTheme = {
                primary: {
                    main: this.state.colours.primary.main,
                },
                secondary: {
                    main: this.state.colours.primary.main,
                },
                neutral: {
                    main: this.state.colours.primary.main,
                },
            };

        console.log(colours);

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
                    colourTheme[key][cols] = colours[key][cols].hex;
                    
                    colours[key][cols].variant = (rgbVal[0] * 0.299) + (rgbVal[1] * 0.587) + (rgbVal[2] * 0.114);

                    if(colours[key][cols].variant >= 186) {
                        colours[key][cols].ratio = (this.luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
                        / (this.luminanace(255, 255, 255) + 0.05);
                    }
                    else {
                        colours[key][cols].ratio = (this.luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
                        / (this.luminanace(0, 0, 0) + 0.05);
                    };
                };

                for (var opts in colours[key][cols]) {
                    if(colours[key][cols] !== colours[key].main) {
                        let rgbVal = [
                            colours[key][cols][opts].rgb[0], 
                            colours[key][cols][opts].rgb[1], 
                            colours[key][cols][opts].rgb[2],
                        ];
        
                        colours[key][cols][opts].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2]);
        
                        colours[key][cols][opts].variant = (rgbVal[0] * 0.299) + (rgbVal[1] * 0.587) + (rgbVal[2] * 0.114);

                        if(colours[key][cols][opts].variant >= 186) {
                            colours[key][cols][opts].ratio = (this.luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
                            / (this.luminanace(255, 255, 255) + 0.05);
                        }
                        else {
                            colours[key][cols][opts].ratio = (this.luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
                            / (this.luminanace(0, 0, 0) + 0.05);
                        };
                    };
                };
            };
        };
        // console.log(colourTheme);
        this.setState({
            colours: colours,
            colourTheme: colourTheme,
        });
    };

    render() {
        let devMode = false;
        if (window.location.href.indexOf("#dev") > -1) {
            devMode = true;
        }

        let colours = this.state.colours;
        let colNames = this.state.names[0];

        let colArray = [colours.primary, colours.secondary, colours.neutral];

        let keys = 0;

        let colSets = colArray.map(set => {
            keys ++;
            // console.log(set);
            return (
                <ColourSet key={keys} set={set} devMode={devMode} />
            );
        });
        
        let colVars = '';

        for(var i = 0; i < 3; i++) { //Primary, secondary and neutral
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

            // console.log(colVars);
        };

        return (
            <div>
                <h3>Colours</h3>
                {colSets}
            </div>
        );
    };
};

const ColourSwatch = ({cols, devMode}) => {
    let thisCols = cols,
        thisHex = thisCols.hex,
        vars = thisCols.variant,
        ratio = thisCols.ratio,
        opts = thisCols.name;

    if(devMode) {
        <DevColours {...thisCols} />
    };

    if(vars >= 186) {
        if(ratio >= 4.5) {
            return (
                <Swatch light color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
        else if(ratio >= 3) {
            return (
                <Swatch light conditional color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
        else {
            return (
                <Swatch light fail color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
    }
    else {
        if(ratio >= 4.5) {
            return (
                <Swatch dark color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
        else if(ratio >= 3) {
            return (
                <Swatch dark conditional color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
        else {
            return (
                <Swatch dark fail color={thisHex} opts={opts}>
                    <p>{thisHex}</p>
                </Swatch>
            );
        }
    };
};

const ColourGroup = ({colgroup, vars, devMode}) => {
    let colArray = [];

    for (var opts in colgroup) {
        colArray.unshift(colgroup[opts]);
    };

    let colSwatches = colArray.map(swatch => {
        return (
            <ColourSwatch key={swatch.name} cols={swatch} devMode={devMode} />
        );
    });

    return (
        <Fragment>
            {colSwatches}
        </Fragment>
    );
};

const ColourSet = ({set, devMode}) => {
    let colGroupLight, colGroupDark, colMain;

    colGroupLight = set.light;
    colGroupDark = set.dark;
    colMain = set.main;

    return (
        <Set>
            <ColourSwatch cols={colMain} />
                {colMain.hex != "#ffffff" &&
                    <ColourGroup colgroup={colGroupLight} vars='light' devMode={devMode} />
                }
                {colMain.hex != "#000000" &&
                    <ColourGroup colgroup={colGroupDark} vars='dark' devMode={devMode} />
                }
        </Set>
    );
};

const DevColours = (colours) => {
    console.log(colours);

    return null;
};

export const Typography = ({logo, ori, theme, clientName}) => {
    let clientLogo = Logo, 
        logoOri = 'landscape';

    if (logo) {
        clientLogo = logo;
        logoOri = ori;
    };

    return (
        <ThemeProvider theme={theme}>
            <TypoContent>
                <FlexBlock med={logoOri == 'portrait' && true}>
                    <figure>
                        <ReactSVG path={clientLogo} />
                        <figcaption>This is what an image caption will look like, not all images will have captions though.</figcaption>
                    </figure>
                    <div>
                        <Head1>Heading 1</Head1>
                        <p>Traditionally, you'll only see one Heading 1 per page. It's the main page title, the name of the page.</p>
                        <p>Every page should have a H1 as they're used for SEO and screen readers</p>
                        <Head2>Heading 2</Head2>
                        <p>Heading 2 helps to define the other sections within the page so you can have multiple H2's within a page</p>
                        <Head3>Heading 3</Head3>
                        <p>This is a third level heading, H3. This is the last level heading that you use on a regular basis (otherwise things can look a little cluttered).</p>
                        <Head4>Heading 4</Head4>
                        <Head5>Heading 5</Head5>
                    </div>
                </FlexBlock>
                <hr />
                <Head4>Content Sections</Head4>
                <FlexBlock lrg>
                    <p>This is a paragraph. This is how most of your content will look on your website. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to</p>
                    <blockquote>
                        This is a blockquote. These are often used to show breakout text, like you should see with a quote in a newspaper or magazine.
                    </blockquote>
                </FlexBlock>
                <h4 className="section-title">Lists</h4>
                <FlexBlock med>
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
                </FlexBlock>
                <FlexBlock med>
                    <div>
                        <h4 className="section-title">Icons</h4>
                        <Icons>
                            <FaFacebookSquare />
                            <FaTwitterSquare />
                            <FaInstagram />
                        </Icons>
                    </div>
                    <div>
                        <h4>Form</h4>
                        <form>
                            <label>Input Field</label>
                            <input type="text" />
                            <button>Button</button>
                        </form>
                    </div>
                </FlexBlock>
            </TypoContent>
        </ThemeProvider>
    );
}