import styled from 'react-emotion';

import {Content} from '../../global.js';

export const Swatch = styled('div')`
    grid-column: ${props => props.opts == 'main' ? 'span 2' : 'span 1'};
    grid-row: ${props => props.opts == 'main' ? 'span 2' : 'span 1'};
    background: ${props => props.color};
    border: 3px solid ${props => props.color};
    border-color: ${props => props.fail && props.theme.colours.fail};
    border-color: ${props => props.conditional && props.theme.colours.warning};
    border-radius: 10px;
    color: ${props => props.light ? '#000000' : '#FFFFFF'};
    display: flex;
        align-items: center;
        justify-content: center;
    position: relative;
`;

export const Set = styled('div')`
    --min: 12vw;
    --max: 190px;
    --gap: 20px;

    display: grid;
        grid-gap: var(--gap);
        grid-template-columns: repeat(7, minmax(var(--min), var(--max)));
        grid-template-rows: repeat(2, 1fr));
    height: calc((var(--min) * 2) + var(--gap));
        max-height: calc((var(--max) * 2) + var(--gap));
    margin-bottom: var(--gap);
`;

export const TypoContent = styled(Content)`
    --icon-size: auto;

    figcaption {
        border-left: 5px solid ${props => props.theme.colours.primary.main};
        font: ${props => props.theme.fonts.headings};
        font-size: 0.9em;
        font-weight: normal;
        padding-left: 5px;
    }

    blockquote {
        border-right: 5px solid ${props => props.theme.colours.secondary.main};
        font: ${props => props.theme.fonts.headings};
        font-size: 1.2em;
        padding-right: 10px;
        text-align: right;
    }

    form {
        label {
            color: ${props => props.theme.colours.primary.dark[90]};
            font-weight: bold;
            margin-right: 10px;
        }

        input {
            background: ${props => props.theme.colours.primary.light[10]};
            border: 1px solid ${props => props.theme.colours.primary.dark[75]};
            padding: 5px 10px;
        }

        button {
            --btn-back: ${props => props.theme.colours.primary.dark[90]};
            --btn-border: var(--btn-back);
            --btn-text: #fff;

            background: var(--btn-back);
            border: 3px solid var(--btn-border);
            color: var(--btn-text);
            cursor: pointer;
            font-size: 1.1em;
            margin-top: 10px;
            padding: 5px 15px;

            &:active, &:hover, &:focus {
                --btn-back: #fff;
                --btn-border: ${props => props.theme.colours.primary.dark[90]};
                --btn-text: var(--btn-border);
            }
        }
    }
`;

export const Icons = styled('div')`
    --icon-size: 40px;
    --icon-colour: ${props => props.theme.colours.primary.main};

    display: flex;

    svg {
        color: var(--icon-colour);

        &:active, &:hover, &:focus {
            --icon-colour: ${props => props.theme.colours.secondary.main};

            cursor: pointer;
        }
    }
`;