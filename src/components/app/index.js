import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Home from '../../layouts/home/index.js';
import StandardPage from '../../layouts/standard/index.js';
import ProductsServices from '../../layouts/services/index.js';
import Portfolio from '../../layouts/portfolio/index.js';
import Faq from '../../layouts/faq/index.js';
import Feed from '../../layouts/blog/index.js';
import Article from '../../layouts/blog/article/index.js';
// import StyleGuide from '../../components/styleGuide/index.js';

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
  },
  // {
	// 	slug: '/style-guide',
	// 	title: 'Style Guide',
  //   component: StyleGuide,
  //   hideNav: true,
  // },
  {
    title: 'Default Page',
    component: StandardPage,
    hideNav: true,
  },
];

export const legalItems = [
  {
    slug: '/privacy',
    title: 'Privacy Policy',
  },
  {
    slug: '/terms',
    title: 'Terms and Conditions',
  }
];

const routeItems = menuItems.concat(legalItems);

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
      else if (page.component) {
        return (
          <Route path={page.slug} exact component={page.component} key={page.slug} />
        );
      };
    });
    return (        
      <Switch>
            {pages}
            <Route component={StandardPage} />
      </Switch>
    );
  }
};

export default App;