import '../../../lib/styles/global.scss';

import React, { Fragment } from 'react';

import DevStyles from '../partials/devStyles';
import Footer from '../partials/footer';
import Header from '../partials/header';
import Meta from '../parts/meta';
import styles from './layout.module.scss';

const Layout = ({
	children, meta, header, footer
}) => (
	<Fragment>
		{process.env.NODE_ENV === `development`
			&& <DevStyles />
		}
		<Meta {...meta} />
		<Header {...header} />
		<main className={styles.content}>
			{children}
		</main>
		<Footer {...footer} />
	</Fragment>
);

export default Layout;
