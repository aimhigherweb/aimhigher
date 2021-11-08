import React, { Fragment } from 'react';

import Form from '../form';
import Underline from '../../../img/illustrations/underline.svg';
import {
	contact, form, underline, ctaButton
} from './pageCta.module.scss';
import { Link } from 'gatsby';

const PageCTA = ({ cta, path }) => {
	if(!cta || cta == 'none') return <Fragment></Fragment>

	return (
		<Fragment>
			<div className={contact}>
				<div className={underline}>
					<Underline />
				</div>
				{cta === 'book_a_call'
					? <a
						href="https://savvycal.com/amyskapers/book-a-call"
						target="_blank"
						className={ctaButton}
					>
						Book a Call
					</a>
					: <Fragment>
						<h2>Need Help?</h2>
						<Form
							{...{
								name: `contact_blog`,
								location: path,
								className: form
							}}
						/>
					</Fragment>
				}
			</div>
		</Fragment>
	);
};

export default PageCTA;
