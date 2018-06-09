import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';

export const Nav = styled('nav')`
    display: flex;
        justify-content: space-between;
    width: 40%;
`;

export const SocialNav = styled(Nav)`
    width: 40%;
`;

export const Item = styled(NavLink)`
    border-radius: 10px;
    color: ${props => props.theme.colours.primary.light['75']};
    font-size: 0.8em;
    padding: 5px 7px;

    &:active, &:hover, &:focus {
        background: ${props => props.theme.colours.primary.light['10']};
        color: ${props => props.theme.colours.secondary.dark['90']};
    }
`;

export const ItemSocial = Item.withComponent('a');