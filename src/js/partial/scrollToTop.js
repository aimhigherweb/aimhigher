import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
	componentWillUpdate() {
		let theseImages = document.getElementsByClassName('loaded');
		for (let i=0; i < theseImages.length; i++) {
			theseImages[i].classList.remove('loaded');
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);

			if (
				document.getElementsByClassName('main menu active').length > 0
			) {
				document.getElementById('nav-main').classList.remove('active');
			}
		}
		
		let theseImages = document.getElementsByClassName('placeholder');
			setTimeout(function() {
				for (let i=0; i < theseImages.length; i++) {
					theseImages[i].classList.add('loaded');
				};
			}, 
			1000);
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
