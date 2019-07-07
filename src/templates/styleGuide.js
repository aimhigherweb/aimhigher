import React, { Fragment, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { StyleSect } from '../components/style-guide/style'
import { Content, Head1, Image } from '../components/layout/style'
import { PrimaryButton, Variants } from '../components/style-guide/style'
import calculateColours from '../components/style-guide/functions'
import Globals from '../components/style-guide/fonts'

const StyleGuide = ({ data }) => {
	const clientInfo = data.markdownRemark.frontmatter,
		meta = {
			name: `${clientInfo.title} Style Guide | ${data.site.siteMetadata.title}`,
			description: 'Want to know more about the style guides we make?',
			slug: `/clients/${data.markdownRemark.fields.slug}/style-guide`,
		},
		[fonts, setFonts] = useState(clientInfo.fonts[0]),
		toggleFonts = font => {
			setFonts(font)
		}

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
		colours = calculateColours({
			primary: theme.colours.primary.main,
			secondary: theme.colours.secondary.main,
			neutral: theme.colours.neutral.main,
		}),
		variantFonts = clientInfo.fonts[1] ? true : false,
		variables = {
			'--fontRegular': theme.fonts.regular,
			'--fontHeadings': theme.fonts.headings,
			'--colourPrimary': colours.primary.main.hex,
			'--colourPrimaryDark90': colours.primary.dark[90].hex,
			'--colourPrimaryDark50': colours.primary.dark[50].hex,
			'--colourSecondary': colours.secondary.main.hex,
			'--colourNeutral': colours.neutral.main.hex,
		},
		fontNames = {
			heading: fonts.fontHeading.substring(0, fonts.fontHeading.indexOf(',')).replace(/'/g, ''),
			regular: fonts.fontRegular.substring(0, fonts.fontRegular.indexOf(',')).replace(/'/g, ''),
		}

	if (variantFonts) {
		let variants = [],
			j = -1
		for (let i = 0; i < clientInfo.fonts.length; i++) {
			variants[i] = clientInfo.fonts[i]
		}
		variantFonts = variants.map(font => {
			let heading = font.fontHeading.substring(0, font.fontHeading.indexOf(',')).replace(/'/g, ''),
				body = font.fontRegular.substring(0, font.fontRegular.indexOf(',')).replace(/'/g, '')

			return (
				<Fragment key={`${heading}&${body}`}>
					<input type="radio" name="fonts" id={`${heading}&${body}`} onChange={() => toggleFonts(font)} />
					<label htmlFor={`${heading}&${body}`}>
						<span style={{ '--font': font.fontHeading }}>{heading}</span> & <span style={{ '--font': font.fontRegular }}>{body}</span>
					</label>
				</Fragment>
			)
		})
	}

	return (
		<Layout meta={meta}>
			<Fragment>
				<Globals />
				<Content>
					<Head1>{clientInfo.title} Style Guide</Head1>
					{variantFonts && (
						<Variants>
							<label>
								There are a few different options for fonts, toggle through the options below and see which one works best for you
							</label>
							{variantFonts}
						</Variants>
					)}
					<StyleSect style={variables}>
						<ColourSwatches theme={theme} />
						{!clientInfo.hideTypography && (
							<Typography
								theme={theme}
								clientName={clientInfo.title}
								fonts={fontNames}
								type={clientInfo.logoType}
								logo={clientInfo.logo}
								ori={clientInfo.logoOri}
							/>
						)}
					</StyleSect>
				</Content>
			</Fragment>
		</Layout>
	)
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
