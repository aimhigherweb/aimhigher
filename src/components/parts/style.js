import styled from 'styled-components'

export const ImageContainer = styled('figure')`
	float: ${props => props.custom.float};
	height: ${props => props.custom.dimensions.height};
	margin: 0 10px;
	position: relative;
	width: ${props => props.custom.dimensions.width};

	img {
		display: block;
		margin: 0 auto;
	}
`

export const Image = styled('img')`
	max-height: 90vh;
`

export const Placeholder = styled('div')`
	svg {
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
`

export const AccordionItem = styled('details')`
	--border: transparent;

	border: 2px solid var(--border);

	&:active,
	&:hover,
	&:focus,
	&[open] {
		--background: ${props => props.theme.colours.secondary.light[10]};
		--border: ${props => props.theme.colours.primary.dark['75']};
	}

	div {
		padding: 5px 25px;
	}
`

export const AccordionTitle = styled('summary')`
	background: var(--background);
	color: ${props => props.theme.colours.primary.dark['75']};
	cursor: pointer;
	display: flex;
	padding: 10px;
	text-decoration: none;
`
