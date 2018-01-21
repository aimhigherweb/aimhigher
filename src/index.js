import React, {Component} from 'react';
// import render from 'react-snapshot';
import ReactDOM from 'react-dom';

//Import components
// import {Header} from './js/partial/header.js';
// import {App} from './js/partial/app.js';
// import {Footer} from './js/partial/footer.js';

//Resources
// import './scss/global.scss';

// ReactDOM.render(<Header />, document.getElementById('header'));

class App extends Component {
    render() {
  
      return (
        <h1>Hello World!</h1>
      );
    }
};

ReactDOM.render(<App />, document.getElementById('main'));

// ReactDOM.render(<Footer />, document.getElementById('footer'));

// if (module.hot) {
//     module.hot.dispose(function () {
//         //Module is about to be replaced
//     });

//     module.hot.accept(function () {
//         //module or one of it's dependencies was just updated
//     });
// };

