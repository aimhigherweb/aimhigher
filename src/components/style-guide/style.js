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
		font-size: 0.7em;
	}

	@media (min-width: 50em) {
		font-size: 15px;
	}

	@media (min-width: 60em) {
		font-size: 18px;
	}
`

export const Set = styled('div')`
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
	--btn-back: var(--colour-primary);
	--btn-border: var(--btn-back);
	--btn-text: #fff;

	background: var(--btn-back);
	border: 3px solid var(--btn-border);
	color: var(--btn-text);
	cursor: pointer;
	display: inline-block;
	font: var(--font-regular);
	font-size: 1.1em;
	margin: 10px;
	padding: 5px 15px;

	&:active,
	&:hover,
	&:focus {
		--btn-back: #fff;
		--btn-border: var(--colour-primary);
		--btn-text: var(--btn-border);
	}
`

export const PrimaryButton = styled(Button)`
	--btn-back: var(--colour-secondary);

	&:active,
	&:hover,
	&:focus {
		--btn-border: var(--colour-secondary);
	}
`

export const SecondaryButton = styled(Button)`
	--btn-back: #fff;
	--btn-border: var(--colour-primary);
	--btn-text: var(--btn-border);

	&:active,
	&:hover,
	&:focus {
		--btn-back: var(--colour-primary);
		--btn-border: var(--btn-back);
		--btn-text: #fff;
	}
`

export const NeutralButton = styled(Button)`
	--btn-back: transparent;
	--btn-border: transparent;
	--btn-text: var(--colour-primary);

	text-decoration: underline;

	&:active,
	&:hover,
	&:focus {
		--btn-back: var(--colour-primary);
		--btn-text: #fff;

		text-decoration: none;
	}
`

export const Icons = styled('div')`
	--icon-size: 40px;
	--icon-colour: var(--colour-primary);

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

export const Variants = styled('div')`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 30px;

	label:not(:first-child) {
		--btn-back: transparent;
		--btn-border: ${props => props.theme.colours.neutral.main};
		--btn-text: ${props => props.theme.colours.neutral.main};

		border: 2px solid var(--btn-border);
		background: var(--btn-back);
		color: var(--btn-text);
		margin: 5px;
		padding: 5px 10px;

		&:active,
		&:hover,
		&:focus {
			--btn-back: ${props => props.theme.colours.primary.main};
			--btn-border: ${props => props.theme.colours.primary.main};
			--btn-text: #fff;
		}
	}

	input {
		display: none;
	}

	input:checked + label {
		--btn-back: ${props => props.theme.colours.secondary.main};
		--btn-border: ${props => props.theme.colours.secondary.main};
		--btn-text: #fff;
	}

	span {
		font-family: var(--font);
	}
`

export const StyleSect = styled('div')`
	display: grid;
	font: var(--font-regular);
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

export const StyleHead = styled('h2')`
	background: #fff;
	color: var(--colour-primary);
	display: inline-block;
	font: var(--font-headings);
	font-size: 1.2em;
	font-weight: normal;
	margin: 0 auto;
	padding: 0 10px;
	position: relative;
	top: -0.7em;
	text-transform: lowercase;
`

export const Colours = styled('div')`
	border: 2px solid var(--colour-primary);
	grid-area: colours;
	padding: 0 20px 20px;

	&:only-child {
		grid-column: 1 / -1;
	}
`
export const Fonts = styled('div')`
	border: 2px solid var(--colour-primary);
	border-left: none;
	grid-area: fonts;
	padding: 0 20px 20px;

	div {
		margin: 20px 0;

		&:first-of-type {
			font: var(--font-headings);
			font-size: 1em;
		}

		&:nth-of-type(2) {
			font: var(--font-regular);
		}

		p {
			font-size: 0.8em;
			line-height: 1;
			font-weight: normal;

			&:first-child {
				font-size: 2em;
				margin: 0;
			}
		}
	}
`

export const Headings = styled('div')`
	border: 2px solid var(--colour-primary);
	border-left: none;
	border-top: none;
	font: var(--font-headings);
	font-size: 1em;
	grid-area: heading;
	padding: 0 20px 20px;

	*:not(:first-child) {
		font-family: inherit;
	}

	h1 {
		color: var(--colour-primary);
		text-align: left;
	}

	h2 {
		color: var(--colour-primary-dark-90);
	}

	h2 {
		color: var(--colour-primary-dark-90);
		font-weight: normal;
	}

	h3,
	h4,
	h5 {
		color: var(--colour-primary-dark-50);
		font-weight: normal;
	}
`

export const Buttons = styled('div')`
	border: 2px solid var(--colour-primary);
	border-left: none;
	border-top: none;
	grid-area: buttons;
	padding: 0 20px 20px;
`

export const Links = styled('div')`
	border: 2px solid var(--colour-primary);
	border-left: none;
	border-top: none;
	grid-area: links;
	padding: 0 20px 20px;
`

export const Typo = styled('div')`
	border: 2px solid var(--colour-primary);
	border-top: none;
	grid-area: typo;
	padding: 0 20px 20px;
`

export const Images = styled('div')`
	border: 2px solid var(--colour-primary);
	border-top: none;
	grid-area: images;
	padding: 0 20px 20px;
`

export const Forms = styled('form')`
	border: 2px solid var(--colour-primary);
	border-top: none;
	grid-area: forms;
	padding: 0 20px 20px;
`
