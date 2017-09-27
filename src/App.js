import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

//Resources
import './resources/content.css';

//Components
// import {menuItems} from './partial/header.js';
import {Home} from './layouts/home.js';
import {About} from './layouts/about.js';
import {ProductsServices} from './layouts/products.js';
import {Portfolio} from './layouts/portfolio.js';
import {Faq} from './layouts/faq.js';
import {CodeEthics} from './layouts/ethics.js';
import {Contact} from './layouts/contact.js';

//Variables
export const menuItems = [
  {
      slug: '/',
      title: 'Home',
      component: () => <Home />,
  },
  {
      slug: '/about-us',
      title: 'About Us',
      component: () => <About />,
  },
  {
      slug: '/products-services',
      title: 'Products and Services',
      component: () => <ProductsServices />,
  },
  {
      slug: '/portfolio',
      title: 'Portfolio',
      component: () => <Portfolio />,
  },
  {
      slug: '/faq',
      title: 'FAQ',
      component: () => <Faq />,
  },
  {
      slug: '/code-of-ethics',
      title: 'Code of Ethics',
      component: () => <CodeEthics />,
  },
  {
      slug: '/contact',
      title: 'Contact',
      component: () => <Contact />,
  },
];

export class App extends Component {
  render() {
    let pages = menuItems.map(page => {
      return(
        <Route exact path={page.slug} component={page.component} />
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
