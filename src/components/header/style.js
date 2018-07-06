import styled from 'react-emotion';

import { NavLink } from 'react-router-dom';
import ReactSVG from 'react-svg';

export const HeadCont = styled('header')`
    display: flex;
        align-items: center;
        justify-content: flex-start;
    height: ${props => props.theme.values.header.height.small};
    position: relative;

    --primary: ${props => props.theme.colours.primary.main};
    --secondary: ${props => props.theme.colours.secondary.main};
    --wave-colour: transparent;
    --menu-colour: ${props => props.theme.colours.primary.dark['90']};

    --wave-colour: ${props => props.wave && 'url("#background-gradient")'};
    --menu-colour: ${props => props.wave && '#fff'};
    --primary: var(--menu-colour);
    --secondary: var(--menu-colour);

    @media (min-width: ${props => props.theme.values.screens.small}) {
        flex-wrap: wrap;
        justify-content: space-between;
        height: ${props => props.theme.values.header.height.medium};
    }
    @media (min-width: ${props => props.theme.values.screens.medium}) {
        align-items: center;
        flex-wrap: nowrap;
        min-height: ${props => props.theme.values.header.height.large};
    }
    @media (min-width: ${props => props.theme.values.screens.realbig}) {
        margin: 0 auto;
        max-width: ${props => props.theme.values.widths.headFoot};
    }
`;

export const LogoArea = styled('a')`  
    position: relative;
    z-index: 20;

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
        width: 40vw;
    }

    @media (min-width: ${props => props.theme.values.screens.medium}) {
        flex-grow: 1;
        height: auto;
            max-height: 15vh;
        width: 23vw;

        svg {
            padding: 10px 10px 10px 15px;
        }
    }

    @media (min-width: ${props => props.theme.values.screens.large}) {
        width: 30vw;

        svg {
            padding: 20px;
        }
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
    z-index: 20;

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

    @media (min-width: ${props => props.theme.values.screens.small}) {
        display: flex;
            flex-direction: row;
        margin-left: auto;
        padding: 0 10px;
        position: relative;
    }

    @media (min-width: ${props => props.theme.values.screens.medium}) {
        margin-left: 0;
        margin-top: 3vw;
    }

    @media (min-width: ${props => props.theme.values.screens.large}) {
        margin-top: 1vh;
        padding: 40px 20px 10px;
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
        color: #fff;
    }

    svg {
        max-width: unset;
    }

    @media (min-width: ${props => props.theme.values.screens.small}) {
        background: transparent;
        border: none;
        border-left: 2px solid ${props => props.theme.colours.neutral.light['75']};
        border-bottom: 3px solid transparent;
        color: var(--menu-colour);
        display: block;
        font-size: 1em;
        font-weight: 500;
        padding: 0 10px;
        text-align: left;

        &:last-child {
            border-bottom: 3px solid transparent;
            border-right: 2px solid ${props => props.theme.colours.neutral.light['75']};
        }

        &:active, &:hover, &:focus {
            background: transparent;
            border-bottom-color: ${props => props.theme.colours.secondary.dark['90']};
            color: ${props => props.theme.colours.primary.dark['90']};

            &:last-child {
                border-bottom-color: ${props => props.theme.colours.secondary.dark['90']};
            }
        }
    } 

    @media (min-width: ${props => props.theme.values.screens.large}) {
        font-size: 1.1em;
    }

    @media (min-width: ${props => props.theme.values.screens.bigger}) {
        font-size: 1.3em;
    }

    @media (min-width: ${props => props.theme.values.screens.realbig}) {
        font-size: 1.5em;
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

    @media (min-width: ${props => props.theme.values.screens.small}) {
        display: none;
    }
`;

export const HeroBack = styled(ReactSVG)`
    svg {
        height: auto;
            max-height: unset;
        margin-left: 50%;
        position: absolute;
            top: 0;
            left: -50vw;
        width: 400vh;
            max-width: unset;
        z-index: -1;
    }

    path {
        fill: var(--wave-colour);
    }
`;