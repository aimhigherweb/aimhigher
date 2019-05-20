import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const Nav = styled('nav')`
	display: flex;
	justify-content: space-between;
	padding: 10px;

	@media (min-width: ${(props) => props.theme.values.screens.small}) {
		padding: 0;
		width: 50%;
		max-width: 300px;
	}

	@media (min-width: ${(props) => props.theme.values.screens.medium}) {
		width: 40%;
	}
`;

export const SocialNav = styled(Nav)`
	padding: 10px;

	@media (min-width: ${(props) => props.theme.values.screens.small}) {
		padding: 0;
		width: 40%;
	}
`;

export const Item = styled(Link)`
	border-radius: 10px;
	color: ${(props) => props.theme.colours.primary.light['75']};
	font-size: 0.8em;
	padding: 5px 7px;

	&:active,
	&:hover,
	&:focus {
		background: ${(props) => props.theme.colours.primary.light['10']};
		color: ${(props) => props.theme.colours.secondary.dark['90']};
	}
`;

export const ItemSocial = Item.withComponent('a');
