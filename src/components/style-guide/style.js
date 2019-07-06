import styled from 'styled-components'

export const Swatch = styled('div')`
	grid-column: ${props => (props.opts === 'main' ? '1 / -1' : 'span 1')};
	background: ${props => props.color};
	border: 3px solid ${props => props.color};
	border-color: ${props => props.status === 'fail' && props.theme.colours.fail};
	border-color: ${props => props.status === 'conditional' && props.theme.colours.warning};
	color: ${props => (props.variant === 'light' ? '#000000' : '#FFFFFF')};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	position: relative;

	p {
		font-size: 1em;
	}

	@media (min-width: 50em) {
		font-size: 15px;
	}

	@media (min-width: 60em) {
		font-size: 18px;
	}
`

export const Set = styled('div')`
	--min: 60px;
	--max: 1fr;

	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: 100px;
	grid-auto-rows: minmax(45px, min-content);
	margin-bottom: 30px;

	h3 {
		font-size: 1em;
		margin-bottom: 0;
		text-transform: capitalize;
	}
`

const Button = styled('button')`
	--btn-back: var(--colourPrimary);
	--btn-border: var(--btn-back);
	--btn-text: #fff;

	background: var(--btn-back);
	border: 3px solid var(--btn-border);
	color: var(--btn-text);
	cursor: pointer;
	display: inline-block;
	font-size: 1.1em;
	margin: 10px;
	padding: 5px 15px;

	&:active,
	&:hover,
	&:focus {
		--btn-back: #fff;
		--btn-border: var(--colourPrimary);
		--btn-text: var(--btn-border);
	}
`

export const PrimaryButton = styled(Button)`
	--btn-back: var(--colourSecondary);

	&:active,
	&:hover,
	&:focus {
		--btn-border: var(--colourSecondary);
	}
`

export const SecondaryButton = styled(Button)`
	--btn-back: #fff;
	--btn-border: var(--colourPrimary);
	--btn-text: var(--btn-border);

	&:active,
	&:hover,
	&:focus {
		--btn-back: var(--colourPrimary);
		--btn-border: var(--btn-back);
		--btn-text: #fff;
	}
`

export const NeutralButton = styled(Button)`
	--btn-back: transparent;
	--btn-border: transparent;
	--btn-text: var(--colourPrimary);

	text-decoration: underline;

	&:active,
	&:hover,
	&:focus {
		--btn-back: var(--colourPrimary);
		--btn-text: #fff;

		text-decoration: none;
	}
`

export const Icons = styled('div')`
	--icon-size: 40px;
	--icon-colour: var(--colourPrimary);

	display: flex;

	svg {
		color: var(--icon-colour);

		&:active,
		&:hover,
		&:focus {
			--icon-colour: ${props => props.theme.colours.secondary.main};

			cursor: pointer;
		}
	}
`

export const StyleSect = styled('div')`
	--fontRegular: ${props => props.theme.fonts.regular};
	--fontHeadings: ${props => props.theme.fonts.headings};
	--colourPrimary: ${props => props.theme.colours.primary.main};
	--colourSecondary: ${props => props.theme.colours.secondary.main};

	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(auto-fit, auto);
	grid-template-areas:
		'colours fonts fonts'
		'colours heading heading'
		'colours buttons links'
		'typo typo typo'
		'images images images'
		'forms forms forms';
`
export const Colours = styled('div')`
	border: 2px solid var(--colourPrimary);
	grid-area: colours;
	padding: 0 20px 20px;

	h2 {
		background: #fff;
		color: var(--colourPrimary);
		display: inline-block;
		font-size: 1.2em;
		font-weight: normal;
		margin: 0 auto;
		padding: 0 10px;
		position: relative;
		top: -0.7em;
		text-transform: lowercase;
	}

	&:only-child {
		grid-column: 1 / -1;
	}
`
export const Fonts = styled('div')`
	grid-area: fonts;
`

export const Headings = styled('div')`
	grid-area: heading;
`

export const Typo = styled('div')`
	grid-area: typo;
`

export const Buttons = styled('div')`
	grid-area: buttons;
`

export const Links = styled('div')`
	grid-area: links;
`

export const Images = styled('div')`
	grid-area: images;
`

export const Forms = styled('form')`
	grid-area: forms;
`
