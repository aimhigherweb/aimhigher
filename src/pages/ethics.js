import React from 'react';

import Layout from '../components/layout';

import { Content, Head1 } from '../components/layout/style';
import { CheckCircle } from 'react-feather';

const meta = {
	name: 'Code of Ethics | AimHigher Web Design',
	description: 'Trust the code',
	slug: 'ethics',
};

const Ethics = () => (
	<Layout meta={meta} wave>
		<Content>
			<Head1>Code of Ethics</Head1>
			<p>
				We take our commitments to you as our clients very seriously,
				therefore you can always rely on us to abide by the following:
			</p>
			<ul>
				<li>
					<CheckCircle />
					Our service is always helpful and friendly
				</li>
				<li>
					<CheckCircle />
					All enquiries will be responded to promptly
				</li>
				<li>
					<CheckCircle />
					No question is too simple or too complicated. And there's no
					such thing as a stupid question.
				</li>
				<li>
					<CheckCircle />
					We will always be honest with you.
				</li>
				<li>
					<CheckCircle />
					Our services are always good value for money.
				</li>
				<li>
					<CheckCircle />A full quote will be given upfront with no
					hidden costs.
				</li>
				<li>
					<CheckCircle />
					If you are ever unsatisfied with us in any way, we will
					endeavour to work towards a positive outcome.
				</li>
			</ul>
		</Content>
	</Layout>
);

export default Ethics;
