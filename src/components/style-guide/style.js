import styled from 'react-emotion';

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