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
import Underline from '../../img/illustrations/underline.svg';
import {
	contact, 	featuredImage, flower, form, pageContent, paw, post, squiggle,
	underline
} from './post.module.scss';

const BlogPost = ({ data }) => {
	const {
		title, content, featured, date, slug, description
	} = data.post;

	return (
		<Layout {...{
			meta: {
				title,
				description,
				slug: `/blog/${slug}`,
				image: featured
			}
		}}>
			<article className={pageContent}>
				<Squiggle className={squiggle} />
				<h1>{title}</h1>
				<p>{date}</p>
				<img className={featuredImage} src={`${process.env.GATSBY_BLOG_IMAGES}${featured.src}`} />
				<div className={post} dangerouslySetInnerHTML={{ __html: content }} />
				<div className={contact}>
					<div className={underline}>
						<Underline />
					</div>
					<h2>Need Help?</h2>
					<Form
						method="post"
						netlify-honeypot="bot-field"
						data-netlify="true"
						name="contact_blog"
						className={form}
					>
						<input type="hidden" name="bot-field" />
						<input type="hidden" name="form-name" value="contact_blog" />
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
				</div>
				<Flower className={flower} />
				<Paw className={paw} />
			</article>

		</Layout>
	);
};

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		post(id: {eq: $id}) {
			featured {
				src
			}
			title
			description
			slug
			content
			date(formatString: "DD MMM YYYY")
		}
	}
`;

export default BlogPost;
