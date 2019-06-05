import React, { Component, Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'

// Components
import { Facebook, Instagram, Twitter } from 'react-feather'

import { Head1, Head2, Head3, Head4, Head5, Image } from '../layout/style'
import { FlexBlock, Icons, Set, Swatch, TypoContent, PrimaryButton, SecondaryButton, NeutralButton } from './style.js'

// Resources
import Logo from '../../img/logo.svg'

export class ColourSwatches extends Component {
	calculateColours(colours) {
		let colourTheme = {
			primary: {
				main: colours.primary.main,
			},
			secondary: {
				main: colours.primary.main,
			},
			neutral: {
				main: colours.primary.main,
			},
		}

		for (let key in colours) {
			const hexToRgb = function(str) {
					if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(str)) {
						let hex = str.substr(1)
						hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex
						let rgb = parseInt(hex, 16)
						return [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255]
					}

					return false
				},
				rgbToHex = (r, g, b) =>
					'#' +
					[r, g, b]
						.map(x => {
							const hex = x.toString(16)
							return hex.length === 1 ? '0' + hex : hex
						})
						.join('')

			let colourMain = hexToRgb(colours[key]),
				convert = function(rgb, opacity, variant) {
					let r = [],
						colour

					if (variant === 'light') {
						colour = 255
					} else if (variant === 'dark') {
						colour = 0
					}

					for (let i = 0; i < 3; i++) {
						r[i] = Math.round(opacity * rgb[i] + (1 - opacity) * colour)
					}

					return r
				},
				luminanace = function(r, g, b) {
					let a = [r, g, b].map(function(v) {
						v /= 255
						return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
					})
					return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
				}

			colours[key] = {
				main: {
					name: 'main',
					rgb: colourMain,
				},
				light: {
					90: {
						name: '90',
						rgb: convert(colourMain, 0.9, 'light'),
					},
					75: {
						name: '75',
						rgb: convert(colourMain, 0.75, 'light'),
					},
					50: {
						name: '50',
						rgb: convert(colourMain, 0.5, 'light'),
					},
					25: {
						name: '25',
						rgb: convert(colourMain, 0.25, 'light'),
					},
					10: {
						name: '10',
						rgb: convert(colourMain, 0.1, 'light'),
					},
				},
				dark: {
					90: {
						name: '90',
						rgb: convert(colourMain, 0.9, 'dark'),
					},
					75: {
						name: '75',
						rgb: convert(colourMain, 0.75, 'dark'),
					},
					50: {
						name: '50',
						rgb: convert(colourMain, 0.5, 'dark'),
					},
					25: {
						name: '25',
						rgb: convert(colourMain, 0.25, 'dark'),
					},
					10: {
						name: '10',
						rgb: convert(colourMain, 0.1, 'dark'),
					},
				},
			}

			for (let cols in colours[key]) {
				let a11yPoint = 100

				if (colours[key][cols] === colours[key].main) {
					let rgbVal = [colours[key][cols].rgb[0], colours[key][cols].rgb[1], colours[key][cols].rgb[2]]

					colours[key][cols].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2])
					colourTheme[key][cols] = colours[key][cols].hex

					colours[key][cols].variant = rgbVal[0] * 0.299 + rgbVal[1] * 0.587 + rgbVal[2] * 0.114

					if (colours[key][cols].variant >= a11yPoint) {
						colours[key][cols].ratio = (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05) / (luminanace(0, 0, 0) + 0.05)
					} else {
						colours[key][cols].ratio = (luminanace(255, 255, 255) + 0.05) / (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
					}
				}

				for (let opts in colours[key][cols]) {
					if (colours[key][cols] !== colours[key].main) {
						let rgbVal = [colours[key][cols][opts].rgb[0], colours[key][cols][opts].rgb[1], colours[key][cols][opts].rgb[2]]

						colours[key][cols][opts].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2])

						colours[key][cols][opts].variant = rgbVal[0] * 0.299 + rgbVal[1] * 0.587 + rgbVal[2] * 0.114

						if (colours[key][cols][opts].variant >= a11yPoint) {
							colours[key][cols][opts].ratio = (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05) / (luminanace(0, 0, 0) + 0.05)
						} else {
							colours[key][cols][opts].ratio = (luminanace(255, 255, 255) + 0.05) / (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
						}
					}
				}
			}
		}
		return colours
	}

	render() {
		// console.log(this.props)
		let mainColours = {
				primary: this.props.theme.colours.primary.main,
				secondary: this.props.theme.colours.secondary.main,
				neutral: this.props.theme.colours.neutral.main,
			},
			names = ['primary', 'secondary', 'neutral'],
			colours = this.calculateColours(mainColours),
			colNames = names[0],
			colArray = [colours.primary, colours.secondary, colours.neutral],
			keys = 0,
			colSets = colArray.map(set => {
				keys++
				return <ColourSet key={keys} group={keys} set={set} />
			}),
			// eslint-disable-next-line no-unused-vars
			colVars = ''

		// console.log(colours)

		for (let i = 0; i < 3; i++) {
			// Primary, secondary and neutral
			for (let colSet in colArray[i]) {
				// Light, dark and main
				if (colArray[i][colSet].name) {
					// If it's main
					let thisCols = '$' + colArray[i][colSet].name + ':' + colArray[i][colSet].hex

					colVars += thisCols
				} else {
					// Loops through light and dark groups
					for (let colGroup in colArray[i][colSet]) {
						let thisCols = '$' + colNames[i] + '_' + colArray[i][colSet][colGroup].name + ':' + colArray[i][colSet][colGroup].hex

						colVars += thisCols
					}
				}
			}
		}

		return (
			<div>
				<h3>Colours</h3>
				{colSets}
			</div>
		)
	}
}

const ColourSwatch = ({ cols, group }) => {
	let thisCols = cols,
		thisHex = thisCols.hex,
		vars = thisCols.variant,
		ratio = thisCols.ratio,
		opts = thisCols.name,
		variant = 'dark',
		status = 'fail'

	if (vars >= 100) {
		variant = 'light'
	}

	if (ratio >= 4.5) {
		status = false
	} else if (ratio >= 3) {
		status = 'conditional'
	}

	return (
		<Swatch data-variant={variant} data-opts={opts} data-group={group} variant={variant} status={status} color={thisHex} opts={opts}>
			<p>{thisHex}</p>
		</Swatch>
	)
}

// eslint-disable-next-line one-var
const ColourGroup = ({ colgroup, vars, group }) => {
	let colArray = []

	for (let opts in colgroup) {
		colArray.unshift(colgroup[opts])
	}

	let colSwatches = colArray.map(swatch => {
		return <ColourSwatch key={swatch.name} cols={swatch} group={group} />
	})

	return <Fragment>{colSwatches}</Fragment>
}

// eslint-disable-next-line one-var
const ColourSet = ({ set, group }) => {
	let colGroupLight, colGroupDark, colMain, setGroup

	colGroupLight = set.light
	colGroupDark = set.dark
	colMain = set.main

	switch (group) {
		case 1:
			setGroup = 'primary'
			break
		case 2:
			setGroup = 'secondary'
			break
		case 3:
			setGroup = 'neutral'
			break
	}

	return (
		<Set>
			<ColourSwatch group={setGroup} cols={colMain} />
			{colMain.hex !== '#ffffff' && <ColourGroup group={setGroup} colgroup={colGroupLight} vars="light" />}
			{colMain.hex !== '#000000' && <ColourGroup group={setGroup} colgroup={colGroupDark} vars="dark" />}
		</Set>
	)
}

export const Typography = ({ logo, ori, type, theme, clientName }) => {
	let ClientLogo = logo ? logo : Logo,
		logoOri = ori ? oro : 'landscape',
		logoType = type ? type : 'svg'

	if (logo && !logo.childImageSharp) {
		let logoPath = `../../img/cms/see-me-after-logo.svg`
		// ClientLogo = require(logoPath)
		ClientLogo = () => <img src={`../img/${logo.relativePath}`} />
		// console.log(ClientLogo)
	}

	return (
		<ThemeProvider theme={theme}>
			<TypoContent>
				<FlexBlock med={logoOri === 'portrait' && true}>
					<figure>
						{logoType === 'svg' ? <ClientLogo /> : <Image fluid={logo.childImageSharp.fluid} />}
						<figcaption>This is what an image caption will look like, not all images will have captions though.</figcaption>
					</figure>
					<div>
						<Head1>Heading 1</Head1>
						<p>Traditionally, you'll only see one Heading 1 per page. It's the main page title, the name of the page.</p>
						<p>Every page should have a H1 as they're used for SEO and screen readers</p>
						<Head2>Heading 2</Head2>
						<p>Heading 2 helps to define the other sections within the page so you can have multiple H2's within a page</p>
						<p>
							There will also be some content that's <strong>bold</strong>, some that's <em>italic</em> and even some that's{' '}
							<strong>
								<em>bold and italic</em>
							</strong>
							.
						</p>
						<Head3>Heading 3</Head3>
						<p>
							This is a third level heading, H3. This is the last level heading that you use on a regular basis (otherwise things can
							look a little cluttered).
						</p>
						<Head4>Heading 4</Head4>
						<Head5>Heading 5</Head5>
					</div>
				</FlexBlock>
				<hr />
				<Head4>Content Sections</Head4>
				<FlexBlock lrg>
					<p>
						This is a paragraph. This is how most of your content will look on your website. Far far away, behind the word mountains, far
						from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
						coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the
						necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the
						all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of
						blind text by the name of Lorem Ipsum decided to
					</p>
					<blockquote>
						This is a blockquote. These are often used to show breakout text, like you should see with a quote in a newspaper or magazine.
					</blockquote>
				</FlexBlock>

				<FlexBlock sml>
					<ul>
						<li>This</li>
						<li>is a</li>
						<li>bulleted</li>
						<li>list</li>
					</ul>
					<ol>
						<li>This</li>
						<li>is a</li>
						<li>numbered</li>
						<li>list</li>
					</ol>
					<Icons>
						<Facebook />
						<Twitter />
						<Instagram />
					</Icons>
				</FlexBlock>
				<div>
					<h4>Form</h4>
					<form>
						<label>
							Input Field
							<input type="text" />
						</label>
						<label>
							Checkbox
							<input type="checkbox" />
						</label>
						<label>
							Radio Button
							<input type="radio" />
						</label>
						<label>
							Text Message Field
							<textarea />
						</label>
						<PrimaryButton>Primary Button</PrimaryButton>
						<SecondaryButton>Secondary Button</SecondaryButton>
						<NeutralButton>Neutral Button/Link</NeutralButton>
					</form>
				</div>
			</TypoContent>
		</ThemeProvider>
	)
}
