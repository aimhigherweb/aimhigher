import styled from 'react-emotion';
import ReactSVG from 'react-svg';

export const ImageContainer = styled('figure')`
    float: ${props => props.custom.float};
    height: ${props => props.custom.dimensions.height};
    margin: 0 10px;
    position: relative;
    width: ${props => props.custom.dimensions.width};
`;

export const Image = styled('img')`
    max-height: 90vh;
`;

export const Placeholder = styled(ReactSVG)`
    svg {
        height: auto;
        position: absolute;
            top: 0;
            left: 0;
        width: 100%;
    }
`;