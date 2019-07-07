import React from 'react'

import Layout, { aimhigherTheme } from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { StyleSect } from '../components/style-guide/style'
import { Content, Head1 } from '../components/layout/style'

const meta = {
	name: 'Style Guide | AimHigher Web Design',
	description: 'Want to know more about the style guides we make?',
	slug: 'style-guide',
}

// eslint-disable-next-line one-var
const StyleGuide = () => {
	console.log(aimhigherTheme)
	let variables = {
			'--fontRegular': aimhigherTheme.fonts.regular,
			'--fontHeadings': aimhigherTheme.fonts.headings,
			'--colourPrimary': aimhigherTheme.colours.primary.main,
			'--colourPrimaryDark90': aimhigherTheme.colours.primary.dark[90],
			'--colourPrimaryDark50': aimhigherTheme.colours.primary.dark[50],
			'--colourSecondary': aimhigherTheme.colours.secondary.main,
			'--colourNeutral': aimhigherTheme.colours.neutral.main,
		},
		fontNames = {
			heading: 'Space Mono',
			regular: 'Roboto',
		}
	return (
		<Layout meta={meta}>
			<Content>
				<Head1>Style Guide</Head1>
				<StyleSect style={variables}>
					<ColourSwatches theme={aimhigherTheme} />
					<Typography theme={aimhigherTheme} clientName="AimHigher Web Design" fonts={fontNames} />
				</StyleSect>
			</Content>
		</Layout>
	)
}

export default StyleGuide
