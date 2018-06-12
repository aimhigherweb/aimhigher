import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';

export const LogoArea = styled('a')`    
    svg {
        display: block;
        height: auto;
            max-height: 15vh;
        margin: 0 auto;
        padding: 20px;
        width: 70vw;
    }

    @media (min-width: ${props => props.theme.values.screens.small}) {
        height: auto;
            max-height: 15vh;
        padding: 20px;
        width: 32vw;
    }
`;


export const Nav = styled('nav')`
    display: flex;
        flex-direction: column;
        justify-content: space-between;
    padding-top: ${props => props.theme.values.header.height.small};
    position: absolute;
        top: 0;
        right: 0;

    @media (min-width: ${props => props.theme.values.screens.small}) {
        display: flex;
            flex-direction: row;
        padding: 40px 20px 10px;
        position: relative;
    }

    #close {
        display: none;
    }

    &:target {
        a {
            display: block;
        }

        #close {
            display: block;
        }

        #hamburger {
            display: none;
        }
    }
`;

export const Item = styled(NavLink)`
    background: #fff;
    border-top: 3px solid ${props => props.theme.colours.primary.dark['75']};
    border-left: 3px solid ${props => props.theme.colours.primary.dark['75']};
    color: ${props => props.theme.colours.primary.dark['75']};
    display: none;
    font: ${props => props.theme.fonts.headings};
    font-size: 1.5em;
    font-weight: 700;
    padding: 15px 30px;
    text-align: right;
    text-decoration: none;

    &:last-child {
        border-bottom: 3px solid ${props => props.theme.colours.primary.dark['75']};
    }

    &:active, &:hover, &:focus {
        background: ${props => props.theme.colours.secondary.dark['90']};
        border-bottom-color: ${props => props.theme.colours.secondary.dark['90']};
        border-left-color: ${props => props.theme.colours.secondary.dark['90']};
        color: #fff;
    }

    svg {
        max-width: unset;
    }

    @media (min-width: ${props => props.theme.values.screens.small}) {
        background: transparent;
        border-right: 2px solid ${props => props.theme.colours.neutral.light['75']};
        border-bottom-color: transparent;
        color: #fff;
        display: block;
        font-size: 1.1em;
        font-weight: 500;
        padding: 0 10px;
        text-align: left;

        &:first-child {
            border-left: 2px solid ${props => props.theme.colours.neutral.light['75']};
        }

        &:active, &:hover, &:focus {
            background: transparent;
            border-bottom-color: ${props => props.theme.colours.secondary.dark['90']};
            color: ${props => props.theme.colours.primary.dark['90']};
        }
    } 
`;

export const Hamburger = styled('a')`
    background: transparent;
    border: none;
    color: #fff;
    padding: 5px;
    position: absolute;
        top: calc(0.5 * ${props => props.theme.values.header.height.small} - 10px);
        right: 20px;
    text-decoration: none;

    svg {
        max-width: unset;
    }
`;