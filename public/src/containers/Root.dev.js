import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { createStore, combineReducers } from 'redux'
import * as rootReducer from '../reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App';
import Login from './Login';

import Suppliers from '../layouts/Suppliers/Suppliers';
import QuoteSpecifics from '../layouts/QuoteSpecifics/QuoteSpecifics';
import ViewQuotes from '../layouts/ViewQuotes/ViewQuotes';

module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="suppliers" component={Suppliers}/>
              <Route path="quoteSpecifics" component={QuoteSpecifics}/>
              <Route path="viewQuotes" component={ViewQuotes}/>
            </Route>
          </Router>
        </div>
      </Provider>
    );
  }
};

