import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React from 'react';

const Partners = ({ partners, className }) => (
	<ul className={className}>
		{partners.map(({ node: { name, childImageSharp, publicURL } }) => {
			const url = `https://${name.replace(`$`, `/`)}`;
			return (
				<li key={name}>
					<a href={url} target="_blank" rel="nofollow">
						{childImageSharp
							? <GatsbyImage
								image={childImageSharp.gatsbyImageData}
								alt={`Logo for ${url}`}
							/>
							: <img
								src={publicURL}
								alt={`Logo for ${url}`}
							/>
						}
					</a>
				</li>
			);
		})}
	</ul>
);

export default Partners;
