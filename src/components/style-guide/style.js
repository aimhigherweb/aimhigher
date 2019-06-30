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

export const TypoContent = styled('div')`
	--icon-size: auto;

	p {
		font: ${props => props.theme.fonts.regular};
	}

	img {
		max-height: 40vh;
	}

	figcaption {
		border-left: 5px solid ${props => props.theme.colours.primary.main};
		font: ${props => props.theme.fonts.headings};
		font-size: 0.9em;
		font-weight: normal;
		padding-left: 5px;
	}

	blockquote {
		border-right: 5px solid ${props => props.theme.colours.secondary.main};
		font: ${props => props.theme.fonts.headings};
		font-size: 1.2em;
		padding-right: 10px;
		text-align: right;
	}

	form {
		label {
			color: rgba(${props => props.theme.colours.primary.main}, 0.9);
			display: block;
			font-weight: bold;
			margin: 0 0 15px;

			input {
				margin-left: 10px;
			}
		}

		input {
			background: rgba(${props => props.theme.colours.primary.light}, 0.1);
			border: 1px solid rgba(${props => props.theme.colours.primary.dark}, 0.75);
			padding: 5px 10px;
		}

		textarea {
			display: block;
			margin-top: 10px;
			width: 100%;
			max-width: 300px;
		}
	}
`

const Button = styled('button')`
	--btn-back: rgba(${props => props.theme.colours.primary.dark}, 0.9);
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
		--btn-border: rgba(${props => props.theme.colours.primary.dark}, 0.9);
		--btn-text: var(--btn-border);
	}
`

export const PrimaryButton = styled(Button)`
	--btn-back: ${props => props.theme.colours.secondary.main};

	&:active,
	&:hover,
	&:focus {
		--btn-border: ${props => props.theme.colours.secondary.main};
	}
`

export const SecondaryButton = styled(Button)`
	--btn-back: #fff;
	--btn-border: ${props => props.theme.colours.primary.main};
	--btn-text: var(--btn-border);

	&:active,
	&:hover,
	&:focus {
		--btn-back: ${props => props.theme.colours.primary.main};
		--btn-border: var(--btn-back);
		--btn-text: #fff;
	}
`

export const NeutralButton = styled(Button)`
	--btn-back: transparent;
	--btn-border: transparent;
	--btn-text: ${props => props.theme.colours.primary.main};

	text-decoration: underline;

	&:active,
	&:hover,
	&:focus {
		--btn-back: ${props => props.theme.colours.primary.main};
		--btn-text: #fff;

		text-decoration: none;
	}
`

export const Icons = styled('div')`
	--icon-size: 40px;
	--icon-colour: ${props => props.theme.colours.primary.main};

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

export const FlexBlock = styled('div')`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	flex-wrap: ${props => props.sml && 'nowrap'};

	> * {
		flex: 1 1 auto;
	}

	@media (min-width: 40em) {
		flex-wrap: ${props => props.med && 'nowrap'};
	}

	@media (min-width: 80em) {
		flex-wrap: ${props => props.lrg && 'nowrap'};
	}
`
export const StyleSect = styled('div')`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`
export const Colours = styled('div')`
	border: 2px solid ${props => props.theme.colours.primary.main};
	padding: 0 20px 20px;

	h2 {
		background: #fff;
		color: ${props => props.theme.colours.primary.main};
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
