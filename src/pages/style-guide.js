import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import { Content, Head1 } from '../components/layout/style'

const meta = {
	name: 'About | AimHigher Web Design',
	description:
		'Who are we? Where did we come from? What are we even doing here?',
	slug: 'about',
}

// eslint-disable-next-line one-var
const StyleGuide = () => (
	<Layout>
		<Head1>Style Guide</Head1>
	</Layout>
)

export default StyleGuide
