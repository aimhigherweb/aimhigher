import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ThemeProvider } from 'emotion-theming';


//Import components
import Header from './components/header/index.js';
import App from './components/app/index.js';
import Footer from './components/footer/index.js';

const customHistory = createBrowserHistory();

const theme = {
    colours: {
        primary: '#1C75BC',
        primary_light: '#6CA7D8',
        secondary: '#16A6B1',
        secondary_light: '#7CCED5',
        neutral: '#5B5B5B',
        neutral_light: '#D1D1D1'
    }
}

class Main extends React.Component {
	render() {
		return (
			<Router history={customHistory}>
				<ThemeProvider theme={theme}>
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