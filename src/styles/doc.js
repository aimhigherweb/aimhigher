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
`
