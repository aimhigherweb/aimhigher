import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { StyleSect } from '../components/style-guide/style'
import { Content, Head1, Image } from '../components/layout/style'
import { PrimaryButton } from '../components/style-guide/style'

import Globals from '../components/style-guide/fonts'

class StyleGuide extends React.Component {
	render() {
		const { data } = this.props,
			clientInfo = data.markdownRemark.frontmatter,
			meta = {
				name: `${clientInfo.title} Style Guide | ${data.site.siteMetadata.title}`,
				description: 'Want to know more about the style guides we make?',
				slug: this.props.location.pathname,
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

		if (clientInfo.fonts[1]) {
			let variants = [],
				j = -1
			for (let i = 1; i < clientInfo.fonts.length; i++) {
				variants[i] = clientInfo.fonts[i]
			}
			// variantFonts = variants.map(font => {
			// 	j++
			// 	return (
			// 		<PrimaryButton key={j} onClick={() => this.variantsChange(variants[j])}>
			// 			Variant {j + 1}
			// 		</PrimaryButton>
			// 	)
			// })

			// theme.fonts = {
			// 	light: '300 1em ' + fonts[0].fontRegular,
			// 	regular: '400 1em ' + fonts[0].fontRegular,
			// 	bold: '700 1em ' + fonts[0].fontRegular,
			// 	headings: '700 1.5em ' + fonts[0].fontHeading,
			// }
		}

		return (
			<Layout meta={meta}>
				<Fragment>
					<Globals />
					<Content>
						<Head1>{clientInfo.title} Style Guide</Head1>
						{variantFonts && variantFonts}
						<StyleSect>
							<ColourSwatches theme={theme} />
							{!clientInfo.hideTypography && (
								<Typography theme={theme} type={clientInfo.logoType} logo={clientInfo.logo} ori={clientInfo.logoOri} />
							)}
						</StyleSect>
					</Content>
				</Fragment>
			</Layout>
		)
	}
}

export const pageQuery = graphql`
	query($id: String!) {
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
				logo {
					relativePath
					childImageSharp {
						fluid(maxHeight: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
				logoType
				domain
				live
				https
				hideTypography
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

export default StyleGuide
