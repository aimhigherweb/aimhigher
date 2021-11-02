import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React from 'react';

const Partners = ({ partners, className }) => (
	<ul className={className}>
		{partners.map(({name, url, logo}) => {
			return (
				<li key={name}>
					<a href={url} target="_blank" rel="nofollow">
						<img
							src={logo.url}
							alt={`Logo for ${name}`}
						/>
					</a>
				</li>
			);
		})}
	</ul>
);

export default Partners;
