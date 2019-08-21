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
