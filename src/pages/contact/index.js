import { graphql } from 'gatsby';
import React from 'react';

import {
	Button, Checkbox, FieldGroup,
	Form, Input, Label, Legend, TextArea
} from '../../../lib/parts/forms';
import Layout from '../../components/layout';
import Flower from '../../img/illustrations/flower_2.svg';
import Paw from '../../img/illustrations/paw.svg';
import Squiggle from '../../img/illustrations/squiggle.svg';
import * as styles from './contact.module.scss';

const ContactPage = ({ data }) => {
	const { html, frontmatter } = data.content.childMarkdownRemark;
	const { title, meta } = frontmatter;

	return (
		<Layout {...{
			meta: {
				...meta,
				image: data.social.publicURL
			}
		}}>
			<div className={styles.content}>
				<Squiggle className={styles.squiggle} />
				<h1>{title}</h1>
				<div className={styles.blurb} dangerouslySetInnerHTML={{ __html: html }} />
				{/* TODO: Check the form actually works */}
				<Form
					method="post"
					netlify-honeypot="bot-field"
					data-netlify="true"
					name="contact"
				>
					<input type="hidden" name="bot-field" />
					<input type="hidden" name="form-name" value="contact" />
					<Label htmlFor="name" required>Name</Label>
					<Input
						id="name"
						name="name"
						placeholder="Full Name"
						required
						autoComplete="name"
					/>
					<Label htmlFor="email" required>Email</Label>
					<Input
						id="email"
						name="email"
						placeholder="hello@domain.com"
						type="email"
						required
						autoComplete="email"
						inputMode="email"
					/>
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						name="phone"
						autoComplete="tel"
						inputMode="tel"
					/>
					<Label htmlFor="website">Do you have an existing website? Or a Facebook page?</Label>
					<Input
						id="website"
						name="website"
						autoComplete="on"
						inputMode="url"
						placeholder="URL"
					/>
					<FieldGroup>
						<Legend>What services are you looking for?</Legend>
						<Checkbox
							id="build"
							value="build"
							name="services"
						>
							New Website Build
						</Checkbox>
						<Checkbox
							id="ecommerce"
							value="ecommerce"
							name="services"
						>
							Ecommerce/Online Store
						</Checkbox>
						<Checkbox
							id="development"
							value="development"
							name="services"
						>
							Website Updates
						</Checkbox>
						<Checkbox
							id="hosting"
							value="hosting"
							name="services"
						>
							Website Hosting
						</Checkbox>
						<Checkbox
							id="support"
							value="support"
							name="services"
						>
							Support/Maintenance
						</Checkbox>
						<Checkbox
							id="other"
							value="other"
							name="services"
						>
							Something Else
						</Checkbox>
					</FieldGroup>
					<Label htmlFor="message">Message</Label>
					<TextArea id="message" name="message" />
					<Button type="submit">Submit</Button>
				</Form>
				<Flower className={styles.flower} />
				<Paw className={styles.paw} />
			</div>
		</Layout>
	);
};

export const query = graphql`
	query {
		content: file(
			sourceInstanceName: {
				eq: "content"
			}, 
			relativeDirectory: {
				eq: "contact"
			}, 
			name: {
				eq: "index"
			}
		) {
			childMarkdownRemark {
				frontmatter {
					title
					meta {
						description
						slug
						title
					}
				}
				html
			}
		} 
		social: file(
			sourceInstanceName: {
				eq: "images"
			}, 
			relativeDirectory: {
				eq: "social"
			}, 
			name: {
				eq: "contact"
			}
		) {
			publicURL
		}
	}
`;

export default ContactPage;
