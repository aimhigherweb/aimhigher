import styled from 'react-emotion';

export const Folio = styled('div')`
    display: flex;
        flex-wrap: wrap;
        justify-items: center;
`;

export const Site = styled('div')`
    background: ${props => props.theme.colours.secondary.light[10]};
    border-radius: 20px;
    margin: 15px;
    padding: 20px;
    width: desk + width.tab;
`;

export const Mocks = styled('div')`
    position: relative;

    img, svg {
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

export const Frame = styled('div')`
    position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    z-index: calc(var(--index-image) + 2);
`;


export const Desktop = styled(ImageContainer)`
    --height-container: ${props => props.values.height.desk.main};
    --width-container: ${props => props.values.desk};
    --height-image: ${props => props.values.width.desk.img} * ${props => props.values.ratio.desk.img};
    --width-image: ${props => props.values.width.desk.img.main};
    --offset-top: ${props => props.values.top.desk.main};
    --offset-left: ${props => props.values.left.desk.main};
    --index-image: 5;

    position: relative;
`;

export const Tablet = styled(ImageContainer)`
    --height-container: height.tab;
    --width-container: width.tab;
    --height-image: width.tab.img * ratio.tab.img;
    --width-image: width.tab.img;
    --offset-top: top.tab;
    --offset-left: left.tab;
    --index-image: 10;

    right: 30px;
    bottom: 0;
`;

export const Mobile = styled(ImageContainer)`
    --height-container: height.mob;
    --width-container: width.mob;
    --height-image: width.mob.img * ratio.mob.img;
    --width-image: width.mob.img;
    --offset-top: top.mob;
    --offset-left: left.mob;
    --index-image: 15;

    bottom: 0;
    right: 0;
`;