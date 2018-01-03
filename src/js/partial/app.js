import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


//Resources
import '../../scss/content.scss';
import routeItems from '../data/navItems.js';

//Components
import {Home} from '../layouts/home.js';
import {About} from '../layouts/about.js';
import {ProductsServices} from '../layouts/products.js';
import {Portfolio} from '../layouts/portfolio.js';
import {Faq} from '../layouts/faq.js';
import {CodeEthics} from '../layouts/ethics.js';
import {Contact} from '../layouts/contact.js';
import {Terms} from '../layouts/terms.js';
import {Privacy} from '../layouts/privacy.js';
import {StyleGuide} from '../layouts/styleGuide.js';

//Client Pages
import {WondaiCountry} from '../clientPortal/wondaiCountryFestival/main.js';
import {SocialPilot} from '../clientPortal/wondaiCountryFestival/socialpilot.js';
import {GlenrockHay} from '../clientPortal/glenrockHay/main.js';


export class App extends Component {
  render() {
    window.onscroll = function() {
      const perHeight = window.innerHeight * 0.3;
      if(document.documentElement.scrollTop > perHeight) {
          document.getElementById('root').classList.add('scrolled');
      }
      else {
          document.getElementById('root').classList.remove('scrolled');
      };
    };

    document.getElementById('root').classList.remove('style-guide');

    let pages = routeItems.map(page => {
      return(
        <div key={page.title}>
          <Route exact path={page.slug} component={page.component} key={page.slug} />
        </div>
      );
    });

    return (
      <Router>
        <div className="container">
          {pages}
        </div>
      </Router>
    );
  }
}
