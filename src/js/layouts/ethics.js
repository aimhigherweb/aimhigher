import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { CheckCircle } from 'react-feather';

//Resources
import '../../scss/layouts/ethics.scss';

class Meta extends Component {
	render() {
		let name = 'Code of Ethics | AimHigher Web Design';
		let description = 'Trust the code';
		let slug = 'code-of-ethics';
		let image = 'https://aimhigherwebdesign.com.au/img/logo.png';
		return (
			<Helmet>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link
					rel="canonical"
					href={'https://aimhigherwebdesign.com.au/' + slug}
				/>

				{/* Facebook */}
				<meta
					property="og:url"
					content={'https://aimhigherwebdesign.com.au/' + slug}
				/>

				<meta property="og:title" content={name} />
				<meta property="og:image" content={image} />
				<meta property="og:description" content={description} />

				{/* Twitter */}
				<meta
					name="twitter:url"
					content={'https://aimhigherwebdesign.com.au/' + slug}
				/>
				<meta name="twitter:title" content={name} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
			</Helmet>
		);
	}
}

export class CodeEthics extends Component {
	render() {
		return (
			<div className="content">
				<Meta />
				<h1>Code of Ethics</h1>
				<p>
					We take our commitments to you as our clients very
					seriously, therefore you can always rely on us to abide by
					the following:
				</p>
				<ul>
					<li>
						<CheckCircle />Our service is always helpful and
						friendly
					</li>
					<li>
						<CheckCircle />All enquiries will be responded to within
						one business day
					</li>
					<li>
						<CheckCircle />No question is too simple or too
						complicated. And there's no such thing as a stupid
						question.
					</li>
					<li>
						<CheckCircle />We will always be honest with you.
					</li>
					<li>
						<CheckCircle />Our services are always good value for
						money.
					</li>
					<li>
						<CheckCircle />A full quote will be given upfront with
						no hidden costs.
					</li>
					<li>
						<CheckCircle />If you are ever unsatisfied with us in
						any way, we will endeavour to work towards a positive
						outcome.
					</li>
				</ul>
			</div>
		);
	}
}
