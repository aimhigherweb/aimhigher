import React from 'react';
import {render} from 'react-snapshot';

//Import components
import {Header} from './partial/header.js';
import {App} from './App.js';
import {Footer} from './partial/footer.js';

//Resources
import './resources/global.css';

render(<Header />, document.getElementById('header'));

render(<App />, document.getElementById('main'));

render(<Footer />, document.getElementById('footer'));

