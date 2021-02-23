import React, {Fragment} from 'react'

import {Form, Input, Label, Button, Checkbox, FieldGroup, TextArea, Legend} from '../../../../lib/parts/forms'
import {FAQ} from '../../../../lib'

const Typo = () => (
	<Fragment>
		<section>
			<h2>Typo</h2>
			<div>
				<p>AimHigher Web will enhance the investment of your business with a modern and professional website. We specialise in building websites for small- to medium-sized businesses throughout Australia.</p>
				<p>We handle everything from breaking down your needs through development to domain registration.</p>
				<p>AimHigher also offers ongoing services and maintenance to all clients. We are committed to our clients’ satisfaction and carry this into all ongoing and post contract support.</p>
			</div>
		</section>
		<section>
			<h2>FAQs</h2>
			<FAQ
				title="What is Search Engine Optimisation (SEO)?
				"
			>
				<p>Search Engine Optimisation (SEO) affects how you show on Google searches & your position in those searches. SEO refers to this happening "organically", by "earning" your position in the results rather than using services such as Google AdWords to appear near the top.</p>
				<p>In general, the higher up the page you are, the more visitors you will receive to your site (when is the last time you clicked on a link on the second page of Google?).</p>
			</FAQ>
			<FAQ
				title="I want to manage the site myself, but I'm not great with technology..."
			>
				<p>Our focus is to make your life simple, and accessible. Many of our websites are built on WordPress which provides a friendly interface for any non-technical users. WordPress is the #1 CMS (Content Management System) used worldwide that makes up 35% of all the websites on the Internet.</p>
				<p>We value your autonomy at AimHigher, what we build <em>for you</em> is for you.</p>
				<p>However if you get stuck or need help (or find self managing is taking too much time), we also offer differing levels of website management from support only all the way to full website management!</p>
			</FAQ>
			<FAQ
				title="How long does it take to get a website up and running?"
			>
				<p>This depends on the complexity of your site and how much you have to start with. On average, time to launch is two months from engagement.</p>
			</FAQ>
		</section>
		<section>
			<h2>Forms</h2>
			<Form name="contact-form">
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" type="text" placeholder="Full Name" />
				<Label htmlFor="email">Email</Label>
				<Input id="email" name="email" type="email" placeholder="hello@domain.com" />
				<Label htmlFor="phone">Phone</Label>
				<Input id="phone" name="phone" type="text" />
				<FieldGroup>
					<Legend>What are you looking for?</Legend>
					<Checkbox type="checkbox" name="work" value="build" defaultChecked>
						Website Build
					</Checkbox>
					<Checkbox type="checkbox" name="edit" value="editing">
						Website Editing
					</Checkbox>
					<Checkbox type="checkbox" name="host" value="hosting">
						Website Hosting
					</Checkbox>
					<Checkbox type="checkbox" name="support" value="support">
						Support
					</Checkbox>
					<Checkbox type="checkbox" name="other" value="other">
						Something Else
					</Checkbox>
				</FieldGroup>
				<FieldGroup>
					<Legend>How do you want to be contacted?</Legend>
					<Checkbox type="radio" defaultChecked>
						Email
					</Checkbox>
					<Checkbox type="radio">
						Phone
					</Checkbox>
				</FieldGroup>
				<Label htmlFor="message">Message</Label>
				<TextArea id="message"></TextArea>
				<Button>Submit</Button>
			</Form>
		</section>
	</Fragment>
)

export default Typo