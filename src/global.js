import { injectGlobal } from 'emotion';
import styled from 'react-emotion';

//Importing Images
function importAll(r) {
    let fonts = {};
    r.keys().map((item, index) => { fonts[item.replace('./', '')] = r(item); });
    return fonts;
}
  
const fonts = importAll(require.context('./fonts', false, /\.(ttf)$/));

injectGlobal`
    * {
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        margin: 0;
        overflow-x: hidden;
        max-width:100vw;
    }

    img, svg {
        max-height: 100%;
        max-width: 100%;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        src: url('./fonts/SpaceMono-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: italic;
        font-weight: 400;
        src: url('./fonts/SpaceMono-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 700;
        src: url('./fonts/SpaceMono-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: italic;
        font-weight: 700;
        src: url('./fonts/SpaceMono-BoldItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 100;
        src: url('./fonts/Roboto-Thin.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 100;
        src: url('./fonts/Roboto-ThinItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: url('./fonts/Roboto-Light.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 300;
        src: url('./fonts/Roboto-Light.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: url('./fonts/Roboto-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        src: url('./fonts/Roboto-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: url('./fonts/Roboto-Medium.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 500;
        src: url('./fonts/Roboto-MediumItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: url('./fonts/Roboto-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 700;
        src: url('./fonts/Roboto-BoldItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 900;
        src: url('./fonts/Roboto-Black.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 900;
        src: url('./fonts/Roboto-BlackItalic.ttf') format('truetype');
    }
`

export const Globals = styled('div')`
    --primary: ${props => props.theme.colours.primary.main};
    --secondary: ${props => props.theme.colours.secondary.main};

    color: ${props => props.theme.colours.neutral.main}; 
    font: ${props => props.theme.fonts.regular};
    font-size: 16px;
    line-height: 1.4;
    min-height: 100vh;
    margin: 0;
    overflow-x: hidden;
    position: absolute;
    width: 100%;
        max-width: 100vw;
`;

export const Head1 = styled('h1')`
    color: ${props => props.theme.colours.primary.dark['90']};
    font: ${props => props.theme.fonts.headings};
    font-size: 2em;
    text-align: center;
`;

export const Head2 = styled(Head1)`
    font-size: 1.6em;
    text-align: left;
`;

export const Head3 = styled(Head2)`
    color: ${props => props.theme.colours.primary.dark['50']};
    font-size: 1.3em;
`;

export const Head4 = styled(Head3)`
    font-size: 1.2em;
`;

export const Head5 = styled(Head4)`
    font-size: 1.1em;
`;

export const Link = styled('a')`
    color: ${props => props.theme.colours.primary.main};
    
    &:hover {
        color: ${props => props.theme.colours.secondary.main};
    }
`;

export const FooterCont = styled('footer')`
    display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    padding: 10px 20px;

    @media (min-width: ${props => props.theme.values.screens.small}) {
        flex-direction: row;
    }

    @media (min-width: ${props => props.theme.values.screens.realbig}) {
        margin: 0 auto;
        max-width: 1200px;
    }
`;

export const Main = styled('main')`
    min-height: 55vh;
    margin: 0 auto;
    max-width: ${props => props.theme.values.widths.content};
`;

export const FigCaption = styled('figcaption')`
    border-right: 2px solid ${props => props.theme.colours.primary.main};
    color: ${props => props.theme.colours.primary.dark['75']};
    font-size: 0.9em;
    padding-right: 10px;
    text-align: right;
`;

export const Content = styled('div')`
    background: rgba(255, 255, 255, 0.7);
    border-radius: 30px;
    margin: 0 auto;
    overflow: hidden;
    padding: 30px;
    width: 90%;
        max-width: 1500px;
`;