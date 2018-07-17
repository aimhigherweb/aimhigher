import styled from 'react-emotion';
import ReactSVG from 'react-svg';

export const Folio = styled('div')`
    display: flex;
        flex-wrap: wrap;
        justify-items: center;
`;



export const Mocks = styled('div')`
    position: relative;

    img {
        height: var(--height-image);
        position: absolute;
            top: var(--offset-top);
            left: var(--offset-left);
        width: var(--width-image);
        z-index: calc(var(--index-image) + 1);
    }

    svg {
        max-height: unset;
        min-width: unset;
        max-width: unset;
        z-index: var(--index-image);
    }
`;

export const ImageContainer = styled('div')`
    border-style: none;
    height: var(--height-container);
    position: absolute;
    width: var(--width-container);
    z-index: var(--index-frame);
`;

export const Frame = styled(ReactSVG)`
    position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

    z-index: calc(var(--index-image) + 2);

    svg {
        position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
    }
`;


export const Desktop = styled(ImageContainer)`
    position: relative;
`;

export const Tablet = styled(ImageContainer)`
    right: 30px;
    bottom: 0;
`;

export const Mobile = styled(ImageContainer)`
    bottom: 0;
    right: 0;
`;

export const Site = styled('div')`
    background: ${props => props.theme.colours.secondary.light[10]};
    border-radius: 20px;
    margin: 15px;
    padding: 20px;
    width: calc(${props => props.sizes.width.desk} + ${props => props.sizes.width.tab});


    ${Desktop} {
        --height-container: ${props => props.sizes.height.desk};
        --width-container: ${props => props.sizes.width.desk};
        --width-image: ${props => props.sizes.width.deskImg};
        --offset-top: ${props => props.sizes.top.desk};
        --offset-left: ${props => props.sizes.left.desk};
        --index-image: 5;
    }
    
    ${Tablet} {
        --height-container: ${props => props.sizes.height.tab};
        --width-container: ${props => props.sizes.width.tab};
        --height-image: calc(${props => props.sizes.width.tabImg} * ${props => props.sizes.ratio.tab});
        --width-image: ${props => props.sizes.width.tabImg};
        --offset-top: ${props => props.sizes.top.tab};
        --offset-left: ${props => props.sizes.left.tab};
        --index-image: 10;
    }

    ${Mobile} {
        --height-container: ${props => props.sizes.height.mob};
        --width-container: ${props => props.sizes.width.mob};
        --height-image: calc(${props => props.sizes.width.mobImg} * ${props => props.sizes.ratio.mob});
        --width-image: ${props => props.sizes.width.mobImg};
        --offset-top: ${props => props.sizes.top.mob};
        --offset-left: ${props => props.sizes.left.mob};
        --index-image: 15;
    }

`;