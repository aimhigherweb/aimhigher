import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import Header from '../header/index.js'
import Footer from '../footer/index.js'

import Logo from '../../img/logo.jpg'
import Favicon from '../../img/favicon.png'

import { Globals, Main, FooterCont } from './style.js'
import { HeadCont } from '../header/style.js'

export const aimhigherTheme = {
	colours: {
		primary: {
			main: '#007cbb',
			light: {
				90: '#1989c2',
				75: '#409dcc',
				50: '#80bedd',
				25: '#bfdeee',
				10: '#e6f2f8',
			},
			dark: {
				90: '#0070a8',
				75: '#005d8c',
				50: '#003e5e',
				25: '#001f2f',
				10: '#000c13',
			},
		},
		secondary: {
			main: '#00acbb',
			light: {
				90: '#19b4c2',
				75: '#40c1cc',
				50: '#80d6dd',
				25: '#bfeaee',
				10: '#e6f7f8',
			},
			dark: {
				90: '#009ba8',
				75: '#00818c',
				50: '#00565e',
				25: '#002b2f',
				10: '#001113',
			},
		},
		neutral: {
			main: '#4c4d4e',
			light: {
				90: '#5e5f60',
				75: '#797a7a',
				50: '#a6a6a7',
				25: '#d2d3d3',
				10: '#ededed',
			},
			dark: {
				90: '#444546',
				75: '#393a3b',
				50: '#262727',
				25: '#131314',
				10: '#080808',
			},
		},
		good: '#46be2d',
		warning: '#FF7900',
		fail: '#b50400',
	},
	fonts: {
		regular: 'Quicksand, Arial, sans-serif',
		headings: 'Lato, Arial, sans-serif',
		code: "'Source Code Pro', monospace",
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
		},
	},
}

const Layout = ({ children, meta, wave }) => {
	let isWave = false

	if (wave) {
		isWave = true
	}

	return (
		<Fragment>
			<ThemeProvider theme={aimhigherTheme}>
				<Fragment>
					<Globals />
					<Meta {...meta} />
					<HeadCont wave={isWave}>{<Header />}</HeadCont>
					<Main>{children}</Main>
					<FooterCont>{<Footer />}</FooterCont>
				</Fragment>
			</ThemeProvider>
		</Fragment>
	)
}

// eslint-disable-next-line one-var
const Meta = ({ name, description, slug, image }) => {
	let siteUrl = 'https://aimhigherweb.design'

	if (!image) {
		image = Logo
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
	)
}

export default Layout
