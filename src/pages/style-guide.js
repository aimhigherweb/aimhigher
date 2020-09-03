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
	let variables = {
			'--font-regular': aimhigherTheme.fonts.regular,
			'--font-headings': aimhigherTheme.fonts.headings,
			'--colour-primary': aimhigherTheme.colours.primary.main,
			'--colour-primary-dark-90': aimhigherTheme.colours.primary.dark[90],
			'--colour-primary-dark-50': aimhigherTheme.colours.primary.dark[50],
			'--colour-secondary': aimhigherTheme.colours.secondary.main,
			'--colour-neutral': aimhigherTheme.colours.neutral.main,
		},
		fontNames = {
			heading: 'Lato',
			regular: 'Quicksand',
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
