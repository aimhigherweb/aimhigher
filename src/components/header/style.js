import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';

export const LogoArea = styled('a')`    
    svg {
        display: block;
        height: auto;
            max-height: 15vh;
        margin: 0 auto;
        padding: 20px;
        width: 32vw;
    }
`;


export const Nav = styled('nav')`
    display: none;
        justify-content: space-between;
    padding: 40px 20px 10px;

    @media (min-width: 40rem) {
        display: flex;
    }

    &:target {
        display: flex;
    }
`;

export const Item = styled(NavLink)`
    border-bottom: 3px solid transparent;
    border-right: 2px solid ${props => props.theme.colours.neutral.light['75']};
    color: #ffffff;
    font: ${props => props.theme.fonts.headings};
    font-size: 1.1em;
    font-weight: 500;
    padding: 0 10px;
    text-decoration: none;

    &:first-child {
        border-left: 2px solid ${props => props.theme.colours.neutral.light['75']};
    }

    &:active, &:hover, &:focus {
        border-bottom-color: ${props => props.theme.colours.secondary.dark['90']};
        color: ${props => props.theme.colours.primary.dark['90']};
    }

    svg {
        max-width: unset;
    }
`;

const MobileButton = Item.withComponent('a');

export const Hamburger = styled(MobileButton)`
    border: none;
`;