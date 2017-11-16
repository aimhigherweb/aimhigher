import React from 'react';
import ReactDOM from 'react-dom';


//Import components
import {Header} from './partial/header.js';
import {App} from './App.js';
import {Footer} from './partial/footer.js';

//Resources
import './resources/global.css';

ReactDOM.render(<Header />, document.getElementById('header'));

ReactDOM.render(<App />, document.getElementById('main'));

ReactDOM.render(<Footer />, document.getElementById('footer'));

