import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Home from '../../layouts/home/index.js';
import About from '../../layouts/about/index.js';
import ProductsServices from '../../layouts/services/index.js';
import Portfolio from '../../layouts/portfolio/index.js';
import Faq from '../../layouts/faq/index.js';
import CodeEthics from '../../layouts/ethics/index.js';
import Feed from '../../layouts/blog/index.js';
import Article from '../../layouts/blog/article/index.js';
import Contact from '../../layouts/contact/index.js';
import Privacy from '../../layouts/privacy/index.js';
import Terms from '../../layouts/terms/index.js';
import StyleGuide from '../../components/styleGuide/index.js';

export const menuItems = [
  {
		slug: '/',
		title: 'Home',
		component: Home,
		hideNav: true,
  },
  {
		slug: '/about',
		title: 'About',
		component: About,
  },
  {
		slug: '/services',
		title: 'Services',
		component: ProductsServices,
  },
  {
		slug: '/portfolio',
		title: 'Portfolio',
		component: Portfolio,
  },
  {
		slug: '/ethics',
		title: 'Code of Ethics',
		component: CodeEthics,
  },
  {
		slug: '/blog',
		title: 'Blog',
    component: Feed,
    subPages: [
      {
        slug: '/:id',
        title: 'Article',
        component: Article,
        hideNav: true
      }
    ]
  },
  {
		slug: '/faq',
		title: 'FAQ',
		component: Faq,
  },
  {
		slug: '/contact',
		title: 'Contact',
		component: Contact,
  },
  {
		slug: '/style-guide',
		title: 'Style Guide',
    component: StyleGuide,
    hideNav: true,
  },
];

export const footerMenu = [
  {
    slug: '/privacy',
    title: 'Privacy Policy',
    component: Privacy
  },
  {
    slug: '/terms',
    title: 'Terms and Conditions',
    component: Terms
  }
];

const routeItems = menuItems.concat(footerMenu);

class App extends Component {
  render() {
    let pages = routeItems.map((page) => {
      if(page.subPages) {
        let subp = page.subPages;
        let subPages = subp.map((subpage) => {
          return (
            <Route path={page.slug + subpage.slug} exact component={subpage.component} key={subpage.slug} />
          );
        });

        return (
          <Fragment key={page.slug}>
            <Route path={page.slug} exact component={page.component} />
            {subPages}
          </Fragment>
        );
      }
      else {
        return (
          <Route path={page.slug} exact component={page.component} key={page.slug} />
        );
      }
    });
    
    return (        
        <Fragment>
          {pages}
        </Fragment>
    );
  }
};

export default App;