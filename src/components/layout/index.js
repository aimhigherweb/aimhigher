import '../../../lib/styles/global.scss';

import React, { Fragment } from 'react';

import DevStyles from '../partials/devStyles';
import Meta from '../parts/meta';
import Header from '../partials/header';
import * as styles from './layout.module.scss';
import Footer from '../partials/footer';

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
