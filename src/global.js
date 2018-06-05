import { injectGlobal } from 'emotion';
import styled from 'react-emotion';

injectGlobal`
    * {
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        src: url('../fonts/SpaceMono-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: italic;
        font-weight: 400;
        src: url('../fonts/SpaceMono-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 700;
        src: url('../fonts/SpaceMono-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Space Mono';
        font-style: italic;
        font-weight: 700;
        src: url('../fonts/SpaceMono-BoldItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 100;
        src: url('../fonts/Roboto-Thin.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 100;
        src: url('../fonts/Roboto-ThinItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: url('../fonts/Roboto-Light.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 300;
        src: url('../fonts/Roboto-Light.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: url('../fonts/Roboto-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        src: url('../fonts/Roboto-Italic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: url('../fonts/Roboto-Medium.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 500;
        src: url('../fonts/Roboto-MediumItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: url('../fonts/Roboto-Bold.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 700;
        src: url('../fonts/Roboto-BoldItalic.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 900;
        src: url('../fonts/Roboto-Black.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 900;
        src: url('../fonts/Roboto-BlackItalic.ttf') format('truetype');
    }
`

export const Globals = styled('div')`
    color: ${props => props.theme.colours.neutral.main}; 
    font: ${props => props.theme.fonts.regular};
    fontSize: 14px;
    lineHeight: 1.4;
    minHeight: 100vh;
    margin: 0;
    overflowX: hidden;
    position: absolute;
    width: 100%;
        max-width: 100vw;
`;

export const Head1 = styled('h1')`
    color: ${props => props.theme.colours.primary.dark['90']};
    font: ${props => props.theme.fonts.headings};
    fontSize: 2em;
    textAlign: center;
`;

export const Head2 = styled('h2')`
    color: ${props => props.theme.colours.primary.dark['90']};
    font: ${props => props.theme.fonts.headings};
    fontSize: 1.6em;
`;

export const Head3 = styled('h3')`
    color: ${props => props.theme.colours.primary.dark['50']};
    font: ${props => props.theme.fonts.headings};
    fontSize: 1.3em;
`;

export const Link = styled('a')`
    color: ${props => props.theme.colours.primary.main};
    
    &:hover {
        color: ${props => props.theme.colours.secondary.main};
    }
`;