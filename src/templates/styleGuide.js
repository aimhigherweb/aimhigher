import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { Content, Head1 } from '../components/layout/style'
import { PrimaryButton } from '../components/style-guide/style'

import '../components/style-guide/fonts'

class ClientPortal extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			theme: {}
		}
	}
	variantsChange (variant) {
		let theme = this.state.theme
		theme.fonts = {
			light: '300 1em ' + variant.fontRegular,
			regular: '400 1em ' + variant.fontRegular,
			bold: '700 1em ' + variant.fontRegular,
			headings: '700 1.5em ' + variant.fontHeading,
		}

		this.setState({
			theme: theme
		})

		console.log(this.state.theme)
	}

	render () {
		const { data } = this.props,
			clientInfo = data.markdownRemark.frontmatter,
			meta = {
				name: clientInfo.title + ' Style Guide | ' + data.site.title,
				description: 'Want to know more about the style guides we make?',
				slug: 'style-guide'
			},
			fonts = clientInfo.fonts[0]
		let theme = {
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
			},
		 variantFonts = false

		 this.setState({
			theme: theme
		})

		if (clientInfo.fonts[1]) {
			let variants = [],
				j = -1
			for (let i = 1; i < clientInfo.fonts.length; i++) {
				variants[i] = clientInfo.fonts[i]
			}
			variantFonts = variants.map(font => {
				j++
				return (
					<PrimaryButton key={j} onClick={() => this.variantsChange(variants[j])}>Variant {j + 1}</PrimaryButton>
				)
			})
		}

		let thisTheme = this.state.theme

		return (
			<Layout meta={meta}>
				<Content>
					<Head1>{clientInfo.title} Style Guide</Head1>
					{variantFonts && variantFonts}
					<Typography theme={thisTheme} logo={clientInfo.logo} />
					<ColourSwatches theme={thisTheme} />
				</Content>
			</Layout>
		)
	}
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
