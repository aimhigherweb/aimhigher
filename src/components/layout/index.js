import React from "react"
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming';

import Header from '../header/index.js'
import Footer from '../footer/index.js'

import Logo from '../../img/logo.png';
import Favicon from '../../img/favicon.png';


import {Globals, Main, FooterCont} from './style.js';
import {HeadCont} from '../header/style.js';


export const aimhigherTheme = {
    colours: {
        primary: {
			main: '#1c75bc',
			light: {
				90: '#3283c3',
				75: '#5598cd',
				50: '#8dbadd',
				25: '#c6dcee',
				10: '#e8f1f8',
			},
			dark: {
				90: '#196aaa',
				75: '#15588d',
				50: '#0e3b5e',
				25: '#071d2f',
				10: '#030c13',
			}
		},
        secondary: {
			main: '#16a6b1',
			light: {
				90: '#2dafb9',
				75: '#50bcc5',
				50: '#8ad2d8',
				25: '#c5e9eb',
				10: '#e7f6f7',
			},
			dark: {
				90: '#1496a0',
				75: '#107c85',
				50: '#0b5359',
				25: '#062a2c',
				10: '#021112',
			}
		},
        neutral: {
			main: '#5b5b5b',
			light: {
				90: '#6b6b6b',
				75: '#848484',
				50: '#adadad',
				25: '#d6d6d6',
				10: '#eeeeee',
			},
			dark: {
				90: '#525252',
				75: '#444444',
				50: '#2e2e2e',
				25: '#171717',
				10: '#090909',
			}
		},
		good: '#46be2d',
		warning: '#FF7900',
		fail: '#b50400'
	},
	fonts: {
		light: "300 1em 'Roboto', Arial, sans-serif",
		regular: "400 1em 'Roboto', Arial, sans-serif",
		bold: "700 1em 'Roboto', Arial, sans-serif",
		headings: "700 1.5em 'Space Mono', monospace",
		code: "400 1em 'Space Mono', monospace"
	},
	values: {
		header: {
			height: {
				small: '10vh',
				medium: '20vh',
				large: '20vh',
			},
		},
		widths: {
			content: '1400px',
			headFoot: '1500px',
		},
		screens: {
			small: '40rem',
			medium: '50rem',
			large: '60rem',
			bigger: '70rem',
			realbig: '80rem',
		}
	}
}

const Layout = ({children, meta, wave}) => {
	let isWave = false;

	if(wave) {
		isWave = true;
	}

	return (
		<ThemeProvider theme={aimhigherTheme}>
			<Globals>
				<Meta {...meta} />
				<HeadCont wave={isWave}>{<Header />}</HeadCont>
				<Main>{children}</Main>
				<FooterCont>{<Footer />}</FooterCont>
			</Globals>
		</ThemeProvider>
	)
}

const Meta = ({name, description, slug, image}) => {
    let siteUrl = 'https://amygoestoperth.com.au';

    if (!image) {
        image = Logo;
    }
 
    return (
        <Helmet>
            <title>{name}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={siteUrl + slug} />

			<meta name="twitter:card" content="summary_large_image" />
            <link rel="shortcut icon" href={Favicon} />
            <link rel="icon" sizes="192x192" href={Favicon} />
            <link rel="apple-touch-icon" href={Favicon} />
            <meta name="theme-color" content="#1C75BC" />
            <link rel="mask-icon" href={Favicon} color="#1C75BC" />
            <base href="/" />

            {/* Facebook */}
            <meta property="og:url" content={siteUrl + slug} />
            
            <meta property="og:title" content={name} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:url" content={siteUrl + slug} />
            <meta name="twitter:title" content={name} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default Layout