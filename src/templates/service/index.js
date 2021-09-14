import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../../components/layout';
import Form from '../../components/parts/form';
import { Icon } from '../../components/parts/service';
import Circle from '../../img/illustrations/circle.svg';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import Underline from '../../img/illustrations/underline.svg';
import {
	circle,	contact, flower, form, iconStyles, pageContent, paw, post, squiggle, underline
} from './service.module.scss';

const Service = ({ data, path }) => {
	const {
		html, excerpt, frontmatter: { title, icon }
	} = data.markdownRemark;

	return (
		<Layout {...{
			meta: {
				title,
				description: excerpt,
				slug: path,
			}
		}}>
			<article className={pageContent}>
				<Squiggle className={squiggle} />
				<h1>{title}</h1>
				<div className={post}>
					<div className={iconStyles}>
						<Circle className={circle} />
						<Icon icon={icon} />
					</div>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</div>
				<div className={contact}>
					<div className={underline}>
						<Underline />
					</div>
					<h2>Get in Touch</h2>
					<Form
						{...{
							name: `contact_service`,
							location: path,
							className: form
						}}
					/>
				</div>
				<Flower className={flower} />
				<Paw className={paw} />
			</article>

		</Layout>
	);
};

export const pageQuery = graphql`
	query ServiceById($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			excerpt
			frontmatter {
				title
				icon
			}
		}
	}
`;

export default Service;
