import React from 'react'
import WebDev from '../img/products/web-dev.svg'
import Email from '../img/products/email.svg'
import Aftersale from '../img/products/aftersale.svg'
import WebHost from '../img/products/web-host.svg'
import Content from '../img/products/content.svg'
import Analytics from '../img/products/analytics.svg'
import HTTPS from '../img/products/https.svg'
import SEO from '../img/products/seo.svg'

const services = [
	{
		name: 'Website Development',
		slug: 'web-dev',
		graphic: <WebDev />,
		description:
			'We specialise in creating custom websites for you and your business. We work with each client individually to find and build the best solution for your needs.',
		price: '$3000',
	},
	{
		name: 'Email Hosting',
		slug: 'email',
		graphic: <Email />,
		description:
			'Get a custom email for your business (me@mybusiness.com.au). Hosting is provided through either Google G Suite or Microsoft Office 365 and includes online storage. Need Microsoft Office as well? We can bundle it in.',
		price: '$10/user/month',
	},
	{
		name: 'Ongoing Support and Maintenance',
		slug: 'aftersale',
		graphic: <Aftersale />,
		description:
			"Websites shouldn't just be 'set and forget'. We're always there for any questions that you have (except if it's 3am). We also offer customised maintenance plans to help manage your website, so you don't have to.",
		price: '$100/month',
	},
	{
		name: 'Website Hosting',
		slug: 'web-host',
		graphic: <WebHost />,
		description: "We can help you get your website online (and stay there). Don't worry about the technical aspects, let us do that for you.",
		price: '$25/month',
	},
	{
		name: 'Content Writing and Editing',
		slug: 'content',
		graphic: <Content />,
		description:
			'Having trouble stringing your website content together or just need someone to look over it? We can help read over your content, or research and write your website content for you.',
	},
	{
		name: 'Search Engine Optimisation',
		slug: 'seo',
		graphic: <SEO />,
		description: 'Search Engine Optimisation (SEO) helps you to appear in Google search results. Let us help you with your top-level SEO needs.',
	},
	{
		name: 'Google Analytics',
		slug: 'analytics',
		graphic: <Analytics />,
		description:
			'Want to know how your website is doing? We can provide custom event tracking for your website, generate regular customised reports and make recommendations.',
	},
	{
		name: 'HTTPS & SSL',
		slug: 'https',
		graphic: <HTTPS />,
		description: "Security is important. We can upgrade your website to be served over HTTPS (the 's' stands for secure).",
		price: '$200',
	},
]

export default services
