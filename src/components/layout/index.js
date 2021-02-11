import '../../../lib/styles/global.scss';

import React, { Fragment } from 'react';

import Footer from '../partials/footer';
import Header from '../partials/header';
import Meta from '../parts/meta';

const Layout = ({ children, meta }) => (
	<Fragment>
		<Meta {...meta} />
		<Header />
		<main>
			{children}
		</main>
		<Footer />
	</Fragment>
);

export default Layout;
