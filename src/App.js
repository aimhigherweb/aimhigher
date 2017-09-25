import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

//Resources
import './resources/content.css';

//Components
import {menuItems} from './partial/header.js';
import {Home} from './layouts/home.js';
import {About} from './layouts/about.js';
import {ProductServices} from './layouts/products.js';
import {Portfolio} from './layouts/portfolio.js';
// import {FAQ} from './layouts/faq.js';
import {CodeEthics} from './layouts/ethics.js';
import {Contact} from './layouts/contact.js';

export class App extends Component {
  render() {
    // let pages = menuItems.map(page => {
    //   return(
    //     <Route path={page.slug} component={page.component} />
    //   );
    // });

    // console.log({pages});

    return (
          <Router>
            <div className="container">
              <Route exact path='/' component={Home} />
              <Route path='/about-us' component={About} />
              <Route path='/products-services' component={ProductServices} />
              <Route path='/portfolio' component={Portfolio} />
              {/* <Route path='faq' component={FAQ} /> */}
              <Route path='/code-of-ethics' component={CodeEthics} />
              <Route path='/contact' component={Contact} />
            </div>
          </Router>
    );
  }
}
