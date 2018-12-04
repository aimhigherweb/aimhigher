import React from 'react'
import { graphql } from 'gatsby'

import Layout, { aimhigherTheme } from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { Content, Head1 } from '../components/layout/style'

const ClientPortal = ({ data }) => {
	const clientInfo = data.markdownRemark.frontmatter,
		meta = {
			name: clientInfo.title + ' Style Guide | ' + data.site.title,
			description: 'Want to know more about the style guides we make?',
			slug: 'style-guide'
		},
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
				light: '300 1em ' + clientInfo.fonts[0].fontRegular,
				regular: '400 1em ' + clientInfo.fonts[0].fontRegular,
				bold: '700 1em ' + clientInfo.fonts[0].fontRegular,
				headings: '700 1.5em ' + clientInfo.fonts[0].fontHeadings,
			},
		}

	return (
		<Layout meta={meta}>
			<Content>
				<Head1>{clientInfo.title} Style Guide</Head1>
				<Typography theme={theme} />
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
