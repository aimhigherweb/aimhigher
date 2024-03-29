import React from 'react';

import * as styles from './imageBlob.module.scss';

const ImageBlob = ({ image }) => (
	<svg viewBox="0 0 649 661" className={styles.image}>
		<defs>
			<clipPath id="image_blob" clipPathUnits="objectBoundingBox">
				<path d="M0.973,0.668 c-0.028,0.063,-0.073,0.122,-0.12,0.169 c-0.141,0.141,-0.357,0.222,-0.549,0.122 c-0.136,-0.07,-0.242,-0.242,-0.279,-0.383 C-0.014,0.43,0.004,0.329,0.085,0.204 C0.189,0.048,0.377,-0.072,0.544,0.06 c0.07,0.055,0.131,0.12,0.205,0.173 c0.067,0.049,0.158,0.085,0.208,0.152 c0.065,0.091,0.058,0.192,0.016,0.284" />
			</clipPath>
		</defs>
		<image href={image} preserveAspectRatio="none" />
	</svg>

);

export default ImageBlob;
