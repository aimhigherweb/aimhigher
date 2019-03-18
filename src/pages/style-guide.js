import React from 'react'

import Layout, { aimhigherTheme } from '../components/layout'
import { ColourSwatches, Typography } from '../components/style-guide/index.js'
import { Content, Head1 } from '../components/layout/style'

const meta = {
	name: 'Style Guide | AimHigher Web Design',
	description: 'Want to know more about the style guides we make?',
	slug: 'style-guide'
}

// eslint-disable-next-line one-var
const StyleGuide = () => (
	<Layout meta={meta}>
		<Content>
			<Head1>Style Guide</Head1>
			<Typography theme={aimhigherTheme} />
			<ColourSwatches theme={aimhigherTheme} />
		</Content>
	</Layout>
)

export default StyleGuide
