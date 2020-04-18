import styled from 'styled-components'

import { Content } from '../components/layout/style'

export const DocContent = styled(Content)`
	max-width: 1000px;

	.gatsby-resp-image-wrapper {
		margin: 20px 0;

		img {
			max-height: unset;
		}
	}

	img, figure {
		border: 2px solid ${props => props.theme.colours.primary.main};
	}

	figure {
		padding: 10px 10px 0;
		width: auto;

		.gatsby-resp-image-wrapper {
			margin: 0;
		}

		img {
			border: none;
		}

		figcaption {
			border-top: 2px solid ${props => props.theme.colours.primary.main};
			margin: 10px -10px 0;
			padding: 10px 20px;
		}
	}

	table {
		border-collapse: collapse;
		text-align: left;

		tbody {
			tr {
				&:nth-child(2n - 1) {
					background: ${props => props.theme.colours.primary.light[10]};
				}
			}
		}

		td {
			color: ${props => props.theme.colours.neutral.dark[75]};
			border: 1px solid ${props => props.theme.colours.primary.light[50]};
			padding: 5px 10px;
		}

		th {
			color: ${props => props.theme.colours.primary.dark[50]};
			padding: 10px 15px;
		}
	}
`
