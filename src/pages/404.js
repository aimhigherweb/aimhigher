import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import { Content, Head1 } from '../components/layout/style'

const meta = {
	name: 'Page Not Found | AimHigher Web Design',
	description: 'Whoops, something went wrong',
	slug: '404',
}

// eslint-disable-next-line one-var
const FourOhFour = () => (
	<Layout meta={meta} wave>
		<Content>
			<Head1>404 - Page Not Found</Head1>
			<p>
				Whoops! Looks like that page may have moved or doesn't exist. Try going back <Link to="/">home</Link> or navigating to anther page
				from the menu above.
			</p>
		</Content>
	</Layout>
)
export default FourOhFour
