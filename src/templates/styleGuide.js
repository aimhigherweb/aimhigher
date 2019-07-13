import React, { Fragment, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { StyleSect } from '../components/style-guide/style'
import { Content, Head1, Image } from '../components/layout/style'
import { PrimaryButton, Variants } from '../components/style-guide/style'
import calculateColours from '../components/style-guide/functions'
import Globals from '../components/style-guide/fonts'

import { aimhigherTheme } from '../components/layout'

const StyleGuide = ({ data }) => {
	const clientInfo = data.markdownRemark.frontmatter,
		defaultHeading = aimhigherTheme.fonts.headings,
		defaultFont = aimhigherTheme.fonts.regular,
		clientFonts = clientInfo.fonts
			? clientInfo.fonts
			: [
					{
						fontHeading: defaultHeading.substring(defaultHeading.indexOf('\u00027'), defaultHeading.length),
						fontRegular: defaultFont.substring(defaultFont.indexOf('\u00027'), defaultFont.length),
					},
			  ],
		meta = {
			name: `${clientInfo.title} Style Guide | ${data.site.siteMetadata.title}`,
			description: 'Want to know more about the style guides we make?',
			slug: `/clients/${data.markdownRemark.fields.slug}/style-guide`,
		},
		[fonts, setFonts] = useState(clientFonts[0]),
		toggleFonts = font => {
			setFonts(font)
		}

	console.log(clientFonts)

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
		variantFonts = clientFonts[1] ? true : false,
		variables = {
			'--font-regular': theme.fonts.regular,
			'--font-headings': theme.fonts.headings,
			'--colour-primary': colours.primary.main.hex,
			'--colour-primary-dark-90': colours.primary.dark[90].hex,
			'--colour-primary-dark-50': colours.primary.dark[50].hex,
			'--colour-secondary': colours.secondary.main.hex,
			'--colour-neutral': colours.neutral.main.hex,
		},
		fontNames = {
			heading: fonts.fontHeading.substring(0, fonts.fontHeading.indexOf(',')).replace(/'/g, ''),
			regular: fonts.fontRegular.substring(0, fonts.fontRegular.indexOf(',')).replace(/'/g, ''),
		}

	if (variantFonts) {
		let variants = [],
			j = -1
		for (let i = 0; i < clientFonts.length; i++) {
			variants[i] = clientFonts[i]
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
				logo
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

// {
// 	relativePath
// 	childImageSharp {
// 		fluid(maxHeight: 300) {
// 			...GatsbyImageSharpFluid
// 		}
// 	}
// }
