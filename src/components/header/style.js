import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';

export const LogoArea = styled('a')`    
    svg {
        display: block;
        height: 14vh;
        margin: 0 auto;
        padding: 20px;
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
    font: ${props => props.theme.fonts.headings};
    font-size: 1.1em;
    font-weight: 500;
    padding: 50px 5px 5px;
    text-decoration: none;

    &:active, &:hover, &:focus {
        border-color: ${props => props.theme.colours.secondary.dark['90']};
        color: ${props => props.theme.colours.secondary.dark['90']};
    }
`;