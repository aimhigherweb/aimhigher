import styled from 'react-emotion';
import ReactSVG from 'react-svg';
import { NavLink } from 'react-router-dom';

export const LogoSVG = styled(ReactSVG)`
    padding: 20px;
    
    svg {
        display: block;
        height: 20vh;
        margin: 0 auto;
        max-width: 1200px;
    }
`;


export const Nav = styled('nav')`
    display: flex;
        justify-content: space-between;
    padding: 10px 20px;
`;

export const Item = styled(NavLink)`
    border-bottom: 3px solid transparent;
    color: ${props => props.theme.colours.primary.dark['90']};
    font-size: 1.5em;
    font-weight: 500;
    padding: 10px 5px 5px;
    text-decoration: none;

    &:active, &:hover, &:focus {
        border-color: ${props => props.theme.colours.secondary.dark['90']};
        color: ${props => props.theme.colours.secondary.dark['90']};
    }
`;