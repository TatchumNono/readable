import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Post from './components/Post';
import PostCategory from './components/PostCategory';

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/:category/:id" component={Post} />
          <Route path="/:category" component={PostCategory} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
