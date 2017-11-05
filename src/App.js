import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


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
      meta: {
        title: 'AimHigher Web Design',
        description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
        canonical: 'https://aimhigherwebdesign.com.au',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/about-us',
      title: 'About Us',
      component: () => <About />,
      meta: {
        title: 'About Us | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/about-us',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/products-services',
      title: 'Products and Services',
      component: () => <ProductsServices />,
      meta: {
        title: 'Products & Services | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/product-services',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/portfolio',
      title: 'Portfolio',
      component: () => <Portfolio />,
      meta: {
        title: 'Portfolio | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/portfolio',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/faq',
      title: 'FAQ',
      component: () => <Faq />,
      meta: {
        title: 'FAQ | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/faq',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/code-of-ethics',
      title: 'Code of Ethics',
      component: () => <CodeEthics />,
      meta: {
        title: 'Code of Ethics | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/code-of-ethics',
        meta: {
          charset: 'utf-8',
        }
      }
  },
  {
      slug: '/contact',
      title: 'Contact',
      component: () => <Contact />,
      meta: {
        title: 'Contact | AimHigher Web Design',
        description: '',
        canonical: 'https://aimhigherwebdesign.com.au/contact',
        meta: {
          charset: 'utf-8',
        }
      }
  },
];

export class App extends Component {
  render() {
    window.onscroll = function() {
      const perHeight = window.innerHeight * 0.3;
      if(document.documentElement.scrollTop > perHeight) {
          document.getElementById('root').className = 'scrolled';
      }
      else {
          document.getElementById('root').classList.remove('scrolled');
      };
    };

    let pages = menuItems.map(page => {
      return(
          <Route exact path={page.slug} component={page.component} key={page.slug} />
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
