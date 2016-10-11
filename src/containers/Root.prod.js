import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { createStore, combineReducers } from 'redux'
import * as rootReducer from '../reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App';

module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
          </Route>
        </Router>
      </Provider>
    );
  }
};

