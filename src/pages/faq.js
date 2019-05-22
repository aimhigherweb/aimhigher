import React from 'react'

import Layout from '../components/layout'

import { Content, Head1 } from '../components/layout/style'
import { Accordion } from '../components/parts'

const meta = {
	name: 'FAQ | AimHigher Web Design',
	description: "Have questions? We've already answered some of them for you.",
	slug: 'faq',
}

const FAQ = () => (
	<Layout meta={meta} wave>
		<Content>
			<Head1>Frequently Asked Questions</Head1>
			<Accordion items={accordion} />
		</Content>
	</Layout>
)

const accordion = [
	{
		title: 'What is a domain or a domain name?',
		slug: 'domain-name',
		content: (
			<div>
				<p>
					A domain name is the key part of your web address that visitors use to access your site -{' '}
					<span className="link">www.yourdomainhere.com</span> or <span className="link">www.yourdomainhere.com.au</span>.
				</p>
				<p>
					Your domain name is also what is used when creating a related email address -{' '}
					<span className="link">john@yourdomainhere.com</span> or <span className="link">admin@yourdomainhere.com.au</span>
				</p>
			</div>
		),
	},
	{
		title: 'What is Search Engine Optimisation (SEO)',
		slug: 'seo',
		content: (
			<div>
				<p>
					Search Engine Optimation (SEO) affects whether or not you come up for a particular Google search and how far up the page you are.
					SEO refers to this happening "organically", by "earning" your position in the results rather than using services such as Google
					AdWords to appear near the top.
				</p>
				<p>
					In general, the higher up the page you are, the more visitors you will receive to your site (when is the last time you clicked on
					a link on the second page of Google).{' '}
				</p>
			</div>
		),
	},
	{
		title: "I want to manage the site myself, but I'm not great with technology",
		slug: 'management',
		content: (
			<div>
				<p>
					The platform we host our sites on is simple and easy to use. It's designed so that anyone can edit or change the content on their
					site themselves.
				</p>
				<p>
					If you get stuck or need help (or don't want to manage the site yourself), we also offer differing levels of website management
					from support only to full website management.
				</p>
			</div>
		),
	},
	{
		title: 'How long does it take to get a website up and running',
		slug: 'time-frame',
		content: (
			<p>
				This depends on the complexity of your site and how much you have to start with. On average, time to launch is between a week and a
				month.
			</p>
		),
	},
	{
		title: 'How much will it cost? And do I have to pay that upfront?',
		slug: 'pricing',
		content: (
			<div>
				<p>
					This depends on a number of factors including the complexity of the website, the features you want, what level of support or
					management you would like.
				</p>
				<p>
					Prices start at around $3000 (including the first 2 months of ongoing costs) with monthly support plans starting at $100 (billed
					monthly/bimonthly/quarterly).
				</p>
				<p>
					We also know how hard it is to come up with a large amount upfront. We require a small deposit upfront and the rest will be billed
					just before the site goes live (depending on the size of the project. If you'd prefer, we can also arrange for a regular payment
					plan instead of a lump sum.
				</p>
				<p>
					<a href="/contact">Contact Us</a> for a quote today.
				</p>
			</div>
		),
	},
	{
		title: 'Can you design a logo for me?',
		slug: 'design',
		content: (
			<div>
				<p>
					While we don't design logos, we work with several freelance designers who do! <a href="/contact">Get in touch</a> with us to find
					out more and to meet one of our lovely freelancers.
				</p>
			</div>
		),
	},
	{
		title: 'I want to open an online store, can you help me?',
		slug: 'ecommerce',
		content: (
			<p>
				Yes, we can!. We build online stores that can accept a variety of payment methods such as PayPal, Direct Deposit and Credit Card. We
				can also integrate anywhere else you're selling things, such as Etsy.
			</p>
		),
	},
	{
		title: "I know what I want on my website, but I'm not great with words",
		slug: 'content',
		content: (
			<p>
				One of the services we offer is content research, writing and editing. We have a professional writer who will research similar
				websites and write high quality content for your site. Alternatively, they can just edit and expand on any existing content that you
				may already have.
			</p>
		),
	},
	{
		title: 'Can I get an email with my domain name?',
		slug: 'email-hosting',
		content: (
			<div>
				<p>Yes.</p>
				<p>
					We currently offer a variety of email hosting options through both GSuite (which includes multiple email addresses and 30GB of
					Google Drive storage) and Office365 (which includes multiple email addresses, access to Office Online apps and Office365 desktop
					programs).
				</p>
				<p>
					We also offer email hosting separately to our website design and hosting packages for those who want an email address but not a
					website (or aren't ready for a website yet).
				</p>
			</div>
		),
	},
	{
		title: "I get an email with my internet and I don't want to have to change it",
		slug: 'email-isp',
		content: (
			<div>
				<p>
					With the launch of NBN and NBN Satellite, a lot of business customers are switching internet service providers (ISPs) and finding
					that they now have to change their email address (eg. from <span className="link">businessname@bigpond.com</span> to{' '}
					<span className="link">businessname@skymesh.com</span>). Most of the ISPs will tell you that they can let you keep your email even
					if you switch to another provider (for a fee).
				</p>
				<p>
					With internet constantly changing within Australia, more and more companies will come into the market and for a more competitive
					price than existing companies. Most people will find themselves switching providers every few years as something more affordable
					or better becomes available elsewhere. All providers will offer an email with your account, but by keeping your main email
					separate from your ISP, it makes the changeover process much simpler.
				</p>
			</div>
		),
	},
]

export default FAQ
