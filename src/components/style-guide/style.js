import styled from 'react-emotion';

export const Swatch = styled('div')`
    background: ${props => props.color};
    border: 1px solid #000;
    border-color: ${props => props.fail && props.theme.colours.fail};
    border-color: ${props => props.conditional && props.theme.colours.warning};
    border-radius: 10px;
    color: ${props => props.light ? '#000000' : '#FFFFFF'};
    display: flex;
        align-items: center;
        justify-content: center;
    height: ${props => props.opts == 'main' ? '16vw' : '8vw'};
    margin-right: 4vw;
    position: relative;
    width: ${props => props.opts == 'main' ? '16vw' : '8vw'};
`;