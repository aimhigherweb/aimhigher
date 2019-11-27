import styled, { keyframes } from 'styled-components'

export const Hero = styled('div')`
	color: ${props => props.theme.colours.primary.dark['75']};
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: ${props => props.theme.fonts.headings};
	font-size: 1.5em;
	height: 60vh;
	position: relative;
	top: calc(-1 * ${props => props.theme.values.header.height.small});
	z-index: 1;

	blockquote {
		font-size: 1em;
		margin: calc(0.5 * ${props => props.theme.values.header.height.small}) 0 0;
	}

	@media (min-width: ${props => props.theme.values.screens.small}) {
		height: 60vh;
		top: calc(-1 * ${props => props.theme.values.header.height.medium});
	}

	@media (min-width: ${props => props.theme.values.screens.medium}) {
		top: calc(-1 * ${props => props.theme.values.header.height.large});

		blockquote {
			font-size: 1.4em;
		}
	}

	@media (min-width: ${props => props.theme.values.screens.realbig}) {
		blockquote {
			font-size: 1.7em;
		}
	}
`

export const HeroContent = styled('div')`
	--icon-size: auto;

	padding: calc(0.5 * ${props => props.theme.values.header.height.medium}) 15px 0;
	position: relative;

	@media (min-width: ${props => props.theme.values.screens.small}) {
		padding: calc(1.5 * ${props => props.theme.values.header.height.medium}) 30px 0;
	}

	@media (min-width: ${props => props.theme.values.screens.medium}) {
		padding: calc(1.5 * ${props => props.theme.values.header.height.large}) 30px 0;
	}
`

const personThinking = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const personIdea = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

export const HomeGraphic = styled('div')`
	clip-path: polygon(
		-1.45% 54.49%,
		15.93% 52.35%,
		15.93% 37.43%,
		13.06% 17.68%,
		19.7% 6.29%,
		44.76% 12.49%,
		46.16% 5.29%,
		51.57% 0.39%,
		60.93% -0.47%,
		70.19% -0.83%,
		72.78% 4.81%,
		76.81% 9.19%,
		81.82% 4.74%,
		89.35% 8.51%,
		91.72% 23.53%,
		97.64% 35.66%,
		91.71% 50.16%,
		100% 51.58%,
		99.54% 63.88%,
		85.92% 64.44%,
		82.08% 76.61%,
		74.66% 90.14%,
		75.1% 97.49%,
		1.45% 97.8%,
		1.7% 88.46%,
		4.36% 85.83%
	);
	float: right;
	shape-outside: polygon(
		-1.45% 54.49%,
		15.93% 52.35%,
		15.93% 37.43%,
		13.06% 17.68%,
		19.7% 6.29%,
		44.76% 12.49%,
		46.16% 5.29%,
		51.57% 0.39%,
		60.93% -0.47%,
		70.19% -0.83%,
		72.78% 4.81%,
		76.81% 9.19%,
		81.82% 4.74%,
		89.35% 8.51%,
		91.72% 23.53%,
		97.64% 35.66%,
		91.71% 50.16%,
		100% 51.58%,
		99.54% 63.88%,
		85.92% 64.44%,
		82.08% 76.61%,
		74.66% 90.14%,
		75.1% 97.49%,
		1.45% 97.8%,
		1.7% 88.46%,
		4.36% 85.83%
	);
	width: 60%;

	#epiphany {
		animation-name: ${personIdea};
	}

	#thinking {
		animation-name: ${personThinking};
	}

	#epiphany,
	#thinking {
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-timing-function: steps(1, end);
	}

	@media (min-width: ${props => props.theme.values.screens.medium}) {
		margin-top: -30px;
	}
`

export const HomeContent = styled('div')`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	font-size: 1.2em;
	line-height: 1.5;
	margin: 0 auto;
	padding: 20px;

	p {
		width: 55%;

		&:nth-of-type(2n) {
			text-align: right;
		}
	}

	@media (min-width: ${props => props.theme.values.screens.small}) {
		font-size: 1.4em;
		width: 90%;
		max-width: 1200px;
	}

	@media (min-width: ${props => props.theme.values.screens.medium}) {
		font-size: 1.5em;

		p {
			border-left: 2px solid ${props => props.theme.colours.primary.main};
			padding-left: 10px;

			&:nth-of-type(2n) {
				border-left: none;
				border-right: 2px solid ${props => props.theme.colours.primary.main};
				padding-left: 0;
				padding-right: 10px;
			}
		}
	}

	@media (min-width: ${props => props.theme.values.screens.large}) {
		font-size: 1.7em;

		p {
			border-width: 4px;

			&:nth-of-type(2n) {
				border-right-width: 4px;
			}
		}
	}
`

export const ContentSVG = styled('div')`
	height: auto;
	width: 40%;

	svg {
		height: auto;
		max-height: 250px;
		width: auto;
	}

	@media (min-width: ${props => props.theme.values.screens.small}) {
	}
`
