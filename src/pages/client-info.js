import React from 'react';

import Layout from '../components/layout';

import { FormWide, Content, Head1 } from '../components/layout/style';

const meta = {
	name: 'Client Info Form | AimHigher Web Design',
	description: 'Fill out your business information',
	slug: 'contact',
};

const ClientInfo = () => (
	<Layout meta={meta} wave>
		<Content>
			<Head1>Client Info</Head1>
			<FormWide
				name="client-info"
				method="post"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
			>
				<input type="hidden" name="bot-field" />
				<input type="hidden" name="form-name" value="client-info" />
				<h2>Your Details</h2>
				<label for="name">
					Name
					<input type="text" name="name" />
				</label>
				<label for="email">
					Email
					<input type="email" name="email" />
				</label>
				<label for="phone">
					Phone
					<input type="text" name="phone" />
				</label>
				<label for="bill-contact">
					Are you the best person to send invoices to?
					<fieldset>
						<input
							type="radio"
							id="bill-contact-yes"
							name="bill-contact"
						/>
						<label for="bill-contact-yes">Yes</label>
						<input
							type="radio"
							id="bill-contact-no"
							name="bill-contact"
						/>
						<label for="bill-contact-no">No</label>
						<input
							type="radio"
							id="bill-contact-maybe"
							name="bill-contact"
						/>
						<label for="bill-contact-maybe">
							Yes and someone else should get them too
						</label>
					</fieldset>
				</label>
				<h2>Alternate Contact</h2>
				<label for="name-alt">
					Name
					<input type="text" name="name-alt" />
				</label>
				<label for="email-alt">
					Email
					<input type="email" name="email-alt" />
				</label>
				<label for="phone-alt">
					Phone
					<input type="text" name="phone-alt" />
				</label>
				<h2>Company Details</h2>
				<label for="company">
					Company
					<input type="text" name="company" />
				</label>
				<label for="abn">
					ABN
					<input type="number" name="abn" />
				</label>
				<h2>Address</h2>
				<label for="street">
					Street Address
					<input type="text" name="street" />
				</label>
				<label for="city">
					Town/Suburb
					<input type="text" name="city" />
				</label>
				<label for="state">
					State
					<select name="state">
						<option value="act">Australia Capital Territory</option>
						<option value="nsw">New South Wales</option>
						<option value="nt">Northern Territory</option>
						<option value="qld">Queensland</option>
						<option value="sa">South Australia</option>
						<option value="tas">Tasmania</option>
						<option value="vic">Victoria</option>
						<option value="wa">Western Australia</option>
					</select>
				</label>
				<label for="post-code">
					Post Code
					<input type="number" name="post-code" />
				</label>
				<button type="submit">Submit</button>
			</FormWide>
		</Content>
	</Layout>
);

export default ClientInfo;
