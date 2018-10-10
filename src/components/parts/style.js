import styled from 'react-emotion';

export const ImageContainer = styled('figure')`
    float: ${props => props.custom.float};
    height: ${props => props.custom.dimensions.height};
    margin: 0 10px;
    position: relative;
    width: ${props => props.custom.dimensions.width};

    img {
        display: block;
        margin: 0 auto;
    }
`;

export const Image = styled('img')`
    max-height: 90vh;
`;

export const Placeholder = styled('div')`
    svg {
        height: auto;
        position: absolute;
            top: 0;
            left: 0;
        width: 100%;
    }
`;

export const AccordionItem = styled('div')`
    --border: transparent;

    border: 2px solid var(--border);

    div {
            display: none;
    }

    &:active, &:hover, &:focus, &:target {
        --background: ${props => props.theme.colours.secondary.light[10]};
        --border: ${props => props.theme.colours.primary.dark['75']}; 

        .open {
            display: inline;
        }

        .close {
            display: none;
        }
    }

    &:target {        
        div {
            display: block;
        }
    }
`;

export const AccordionTitle = styled('a')`
    background: var(--background);
    color: ${props => props.theme.colours.primary.dark['75']};
    display: flex;
    padding: 10px;
    text-decoration: none;

    svg {
        color: inherit;
        height: 20px;
        margin-right: 10px;
        width: 20px;
            min-width: 20px;
            max-width: unset;
    }

    .open {
        display: none;
    }

    .close {
        display: inline;
    }
`;

export const AccordionContent = styled('div')`
    padding: 5px 25px;
`;