import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import {Feed} from '../layouts/feed.js';
import {Article} from '../layouts/article.js';

export class App extends Component {
  render() {
    return (        
        <Fragment>
          <Route path="/" exact component={Feed} />
          <Route path="/:id" component={Article} />
        </Fragment>
    );
  }
};