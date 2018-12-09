import React from 'react'
import { graphql } from 'gatsby'

import Layout, { aimhigherTheme } from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { Content, Head1 } from '../components/layout/style'

import '../components/style-guide/fonts'

const ClientPortal = ({ data }) => {
	const clientInfo = data.markdownRemark.frontmatter,
		meta = {
			name: clientInfo.title + ' Style Guide | ' + data.site.title,
			description: 'Want to know more about the style guides we make?',
			slug: 'style-guide'
		},
		fonts = clientInfo.fonts[0],
		theme = {
			colours: {
				primary: {
					main: clientInfo.colours[0].colourPrimary,
				},
				secondary: {
					main: clientInfo.colours[0].colourSecondary,
				},
				neutral: {
					main: clientInfo.colours[0].colourNeutral,
				},
			},
			fonts: {
				light: '300 1em ' + fonts.fontRegular,
				regular: '400 1em ' + fonts.fontRegular,
				bold: '700 1em ' + fonts.fontRegular,
				headings: '700 1.5em ' + fonts.fontHeading,
			},
		}

	console.log(clientInfo.fonts)

	return (
		<Layout meta={meta}>
			<Content>
				<Head1>{clientInfo.title} Style Guide</Head1>
				<Typography theme={theme} logo={clientInfo.logo} />
				<ColourSwatches theme={theme} />
			</Content>
		</Layout>
	)
}

export const pageQuery = graphql`
	query ClientByID($id: String!) {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			fields {
				slug
			}
			frontmatter {
				title
				logo
				logoOri
				domain
				live
				https
				colours {
					colourNeutral
					colourPrimary
					colourSecondary
				}
				fonts {
					fontHeading
					fontRegular
				}
			}
		}
	}
`

export default ClientPortal
