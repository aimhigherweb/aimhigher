import React, { Component, Fragment, useState } from 'react'
import { ThemeProvider } from 'styled-components'

// Components
import { Facebook, Instagram, Twitter } from 'react-feather'
import calculateColours from './functions'
import { Head1, Head2, Head3, Head4, Head5, Image } from '../layout/style'
import {
	Fonts,
	Headings,
	Typo,
	Buttons,
	Links,
	Images,
	Forms,
	FlexBlock,
	Icons,
	Set,
	StyleHead,
	Swatch,
	TypoContent,
	PrimaryButton,
	SecondaryButton,
	NeutralButton,
	Colours,
	Modal
} from './style.js'

// Resources
import Logo from '../../img/logo.svg'

export class ColourSwatches extends Component {
	render() {
		const openModal = (e) => {
			document.querySelector('.modal').classList.add('open')
		}

		let mainColours = {
				primary: this.props.theme.colours.primary.main,
				secondary: this.props.theme.colours.secondary.main,
				neutral: this.props.theme.colours.neutral.main,
			},
			names = ['primary', 'secondary', 'neutral'],
			colours = calculateColours(mainColours),
			colNames = names[0],
			colArray = [colours.primary, colours.secondary, colours.neutral],
			keys = 0,
			colSets = colArray.map(set => {
				keys++
				return <ColourSet key={keys} group={keys} set={set} />
			}),
			// eslint-disable-next-line no-unused-vars
			colVars = ''

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
			<Colours>
				<StyleHead><button onClick={openModal}>Colours</button></StyleHead>
				{colSets}
				<StyleModal {...colours} />
			</Colours>
		)
	}
}

export const StyleModal = ({primary, secondary, neutral}) => {
	const theme = {
		colours: {
			primary, secondary, neutral
		}
	},
	closeModal = (e) => {
		document.querySelector('.modal').classList.remove('open')
	}


	let sass =``
	

	Object.keys(theme.colours).forEach(set => {
		Object.keys(theme.colours[set]).forEach(ver => {
			if(theme.colours[set][ver].hex) {
				sass = `${sass}$${set}: ${theme.colours[set][ver].hex};\n`;
			}
			else {
				Object.keys(theme.colours[set][ver]).forEach(shade => {
					sass = `${sass}$${set}_${ver}_${shade}: ${theme.colours[set][ver][shade].hex};\n`;
				})
			}
		})
	})

	return (
		<Modal className="modal">
			<button onClick={closeModal}>Close</button>
			<h2>Sass Variables</h2>
			<pre>{sass}</pre>
			<h2>Theme Object</h2>
			<pre>{JSON.stringify(theme, null, 1)}</pre>
		</Modal>
	)
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
			<h3>{setGroup}</h3>
		</Set>
	)
}

export const Typography = ({ logo, ori, type, theme, clientName, fonts }) => {
	let ClientLogo = logo ? logo : Logo,
		logoOri = ori ? ori : 'landscape',
		logoType = type ? type : 'svg'

	if (logo && !logo.childImageSharp) {
		let logoPath = `../../img/cms/see-me-after-logo.svg`
		// ClientLogo = require(logoPath)
		ClientLogo = () => <img src={`../img/${logo.relativePath}`} />
		// console.log(ClientLogo)
	}

	return (
		<Fragment>
			<Fonts>
				<StyleHead>Fonts</StyleHead>
				<div>
					<p>{clientName}</p>
					<p>{fonts.heading}</p>
				</div>
				<div>
					<p>{clientName}</p>
					<p>{fonts.regular}</p>
				</div>
			</Fonts>
			<Headings>
				<StyleHead>Headings</StyleHead>
				<Head1>Heading 1</Head1>
				<Head2>Heading 2</Head2>
				<Head3>Heading 3</Head3>
				<Head4>Heading 4</Head4>
				<Head5>Heading 5</Head5>
			</Headings>
			<Typo>
				<StyleHead>Typography</StyleHead>
				<p>Traditionally, you'll only see one Heading 1 per page. It's the main page title, the name of the page.</p>
				<p>Every page should have a H1 as they're used for SEO and screen readers</p>
				<p>Heading 2 helps to define the other sections within the page so you can have multiple H2's within a page</p>
				<p>
					There will also be some content that's <strong>bold</strong>, some that's <em>italic</em> and even some that's{' '}
					<strong>
						<em>bold and italic</em>
					</strong>
					.
				</p>
				<p>
					This is a paragraph. This is how most of your content will look on your website. Far far away, behind the word mountains, far from
					the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
					Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.
					It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no
					control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem
					Ipsum decided to
				</p>
				<blockquote>
					This is a blockquote. These are often used to show breakout text, like you should see with a quote in a newspaper or magazine.
				</blockquote>
				<hr />
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
			</Typo>
			<Buttons>
				<StyleHead>Buttons</StyleHead>
				<PrimaryButton>Primary Button</PrimaryButton>
				<SecondaryButton>Secondary Button</SecondaryButton>
				<NeutralButton>Neutral Button</NeutralButton>
			</Buttons>
			<Links>
				<StyleHead>Icons</StyleHead>
				<Icons>
					<Facebook />
					<Twitter />
					<Instagram />
				</Icons>
			</Links>
			<Images>
				<StyleHead>Images</StyleHead>
				<figure>
					{logoType === 'svg' ? <ClientLogo /> : <Image fluid={logo.childImageSharp.fluid} />}
					<figcaption>This is what an image caption will look like, not all images will have captions though.</figcaption>
				</figure>
			</Images>
			<Forms>
				<StyleHead>Forms</StyleHead>
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
			</Forms>
		</Fragment>
	)
}
