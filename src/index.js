import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

//Components
import Header from './components/header/index.js';
import App from './components/app/index.js';
import Footer from './components/footer/index.js';

//Resources
import './global.js';
import {Globals, HeadCont, Main, FooterCont} from './global.js';


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
			}
		},
		screens: {
			small: '40rem',
		}
	}
}

class Root extends React.Component {
	render() {
		let home = false;
		switch (location.pathname) {
			case '/':
			case '/#':
			case '/#menu':
				home = true;
				break;
		}

		return (
			<Router basename="/">
				<ThemeProvider theme={aimhigherTheme}>
					<Globals>
						{home ?
							<HeadCont home>{<Header />}</HeadCont>
						:
							<HeadCont>{<Header />}</HeadCont>
						}
						<Main>{<App />}</Main>
						<FooterCont>{<Footer />}</FooterCont>
					</Globals>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));