import React from 'react';

const Partners = ({ partners, className }) => (
	<ul className={className}>
		{partners.map(({ node }) => (
			<li key={node.name}>
				<a href={`https://${node.name.replace(`$`, `/`)}`} target="_blank" rel="nofollow">
					{node.childImageSharp
						? <Img fixed={node.childImageSharp.fixed} />
						: <img src={node.publicURL} />
					}
				</a>
			</li>
		))}
	</ul>
);

export default Partners;
