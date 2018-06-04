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
    }
}

class Main extends React.Component {
	render() {
		return (
			<Router basename="/">
				<ThemeProvider theme={aimhigherTheme}>
					<Fragment>
						<header>{<Header />}</header>
						<div>{<App />}</div>
						<footer>{<Footer />}</footer>
					</Fragment>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));