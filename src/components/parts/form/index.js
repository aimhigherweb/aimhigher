import React from 'react';

import {
	Button, Checkbox, FieldGroup,
	Form, Input, Label, Legend, TextArea
} from '../../../../lib/parts/forms';

const ContactForm = ({ name = `contact`, className = ``, location = `` }) => (
	<Form
		method="post"
		netlify-honeypot="bot-field"
		data-netlify="true"
		name={name}
		className={className}
	>
		<input type="hidden" name="bot-field" />
		<input type="hidden" name="form-name" value={name} />
		<input type="hidden" name="form-location" value={location} />
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
);

export default ContactForm;
