import React, {Fragment} from 'react'

import Header from '../partials/header'
import Footer from '../partials/footer'

import '../../../lib/styles/global.scss'

const Layout = ({children}) => (
	<Fragment>
		<Header />
		<main>
			{children}
		</main>
		<Footer />
	</Fragment>
)

export default Layout