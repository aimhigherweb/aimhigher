import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import Img from 'gatsby-image'

injectGlobal`
    * {
        box-sizing: border-box;
    }

    body {
        --icon-size: 24px;

        min-height: 100vh;
        margin: 0;
        overflow-x: hidden;
        max-width:100vw;
    }

    img, svg {
        max-height: 100%;
        max-width: 100%;
    }

    svg {
        height: var(--icon-size);
            min-height: var(--icon-size);
        width: var(--icon-size);
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

export const Globals = styled.div`
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

export const Head2 = styled('h2')`
    color: ${props => props.theme.colours.primary.dark['90']};
    font: ${props => props.theme.fonts.headings};
    font-size: 1.6em;
    text-align: left;
`;

export const Head3 = styled('h3')`
    color: ${props => props.theme.colours.primary.dark['50']};
    font: ${props => props.theme.fonts.headings};
    font-size: 1.3em;
`;

export const Head4 = styled('h4')`
    color: ${props => props.theme.colours.primary.dark['50']};
    font: ${props => props.theme.fonts.headings};
    font-size: 1.2em;
`;

export const Head5 = styled('h5')`
    color: ${props => props.theme.colours.primary.dark['50']};
    font: ${props => props.theme.fonts.headings};
    font-size: 1.1em;
`;

export const Link = styled('a')`
    
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
    --link-background: ${props => props.theme.colours.secondary.light[10]};
    --link-colour: ${props => props.theme.colours.primary.main};
    --link-hover: ${props => props.theme.colours.secondary.dark[75]};

    background: rgba(255, 255, 255, 0.7);
    margin: 0 auto;
    overflow: hidden;
    padding: 10px 5%;
    width: 100%;
        max-width: 1500px;

    p, li {
        font-size: 18px;
    }

    a {
        
        color: var(--link-colour);
    
        &:hover {
            background: var(--link-background);
            color: var(--link-hover);
            text-decoration: none;
        }
    }

    @media (min-width: ${props => props.theme.values.screens.small}) {
        border-radius: 30px;
        padding: 30px;
        width: 90%;
    }
`;

export const Image = withProps({
    Tag: 'figure'
})(styled(Img)`
    &.right {
        float: right;
    }
`);

export const Form = styled('form')`
    margin: 0 auto;
    max-width: 500px;

    label, legend {
        color: ${props => props.theme.colours.primary.dark[75]};
        display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content:space-between;
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 10px;
    }

    input, textarea, select {
        background: ${props => props.theme.colours.primary.light[10]};
        border: 1.5px solid ${props => props.theme.colours.primary.dark[75]};
        box-shadow: none;
        font: ${props => props.theme.fonts.regular};
        font-size: 1em;
        flex-grow: 2;
        margin: 10px 0;
        padding: 5px 10px;
        max-width: 80%;
    }

    input[name="website"] {
        width: 100%;
            max-width: unset;
    }

    textarea {
        height: 10em;
        width: 100%;
            max-width: unset;
    }

    fieldset {
        border: none;
        margin: 0;
        padding: 0;
        max-width: 500px;

        label {
            display: inline-block;
            font-weight: normal;

            input {
                margin: 5px 10px;
            }
        }
    }

    button {
        --colour: ${props => props.theme.colours.primary.main};
        --colour2: #fff;

        border: 2px solid var(--colour);
        background: var(--colour2);
        color: var(--colour);
        cursor: pointer;
        font-size: 1.1em;
        font-weight: bold;
        padding: 10px 30px;

        &:active, &:hover, &:focus {
            --colour: #fff;
            --colour2: ${props => props.theme.colours.primary.main};
        }
    }
`;

export const FormWide =  styled(Form)`
    display: flex;
        flex-wrap: wrap;
    max-width: 800px;

    h2 {
        width: 100%;
    }

    label {
        flex-grow: 1;
        justify-content: flex-start;
        margin-right: 20px;

        input, select {
            margin-left: 10px;
        }
    }

    fieldset {
        width: 100%;
    }

    legend {
        width: 100%;
    }

    input[type="radio"], input[type="checkbox"] {
		&:checked, &:not(:checked) {
			position: absolute;
				left: -200vw;

			& + label {
				cursor: pointer;
				display: inline-block;
				font-weight: normal;
				line-height: 20px;
				margin-right: 10px;
				padding-left: 28px;
				position: relative;

				&:before, &:after {
					border-radius: 100%;
					content: '';
					position: absolute;
				}

				&:before {
					background: #fff;
					border: 1px solid ${props => props.theme.colours.neutral.light['50']};
					height: 18px;
					left: 0;
					top: 0;
					width: 18px;							
				}

				&:after {
					background: ${props => props.theme.colours.primary.main};
					height: 12px;
					top: 4px;
					left: 4px;
					transition: all 0.2s ease;
					width: 12px;
				}
			}
		}

		&:not(:checked) {
			& + label {
				&:after {
					opacity: 0;
					transform: scale(0);
				}
			}
		}

		&:checked {
			& + label {
				color: ${props => props.theme.colours.primary.main};

				&:after {
					opacity: 1;
					transform: scale(1);
				}
			}
		}
	}

	input[type="checkbox"] {
		&:checked, &:not(:checked) {
			& + label {
				&:before, &:after {
					border-radius: 0;
					content: '';
					position: absolute;
				}

				&:after {
					background: transparent;
					color: ${props => props.theme.colours.primary.main};
					content: '\002714';
					top: 0;
					left: 2px;
				}
			}
		}
	}
`