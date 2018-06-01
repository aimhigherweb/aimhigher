import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Feed from '../../layouts/feed/index.js';
import Article from '../../layouts/article/index.js';

class App extends Component {
  render() {
    return (        
        <Fragment>
          <Route path="/" exact component={Feed} />
          <Route path="/:id" component={Article} />
        </Fragment>
    );
  }
};

export default App;