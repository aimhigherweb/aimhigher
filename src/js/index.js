import React from 'react';
import render from 'react-snapshot';
import {ReactDOM} from 'react-dom';

//Import components
import {Header} from './partial/header.js';
import {App} from './partial/app.js';
import {Footer} from './partial/footer.js';

//Resources
import './../scss/global.scss';

ReactDOM.render(<Header />, document.getElementById('header'));

ReactDOM.render(<App />, document.getElementById('main'));

ReactDOM.render(<Footer />, document.getElementById('footer'));

