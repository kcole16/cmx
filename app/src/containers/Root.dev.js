import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import * as rootReducer from '../reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App';

import Dashboard from '../layouts/Dashboard/Dashboard';
import Suppliers from '../layouts/Suppliers/Suppliers';
import QuoteSpecifics from '../layouts/QuoteSpecifics/QuoteSpecifics';
import ViewQuotes from '../layouts/ViewQuotes/ViewQuotes';
import Documents from '../layouts/Documents/Documents';

module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="suppliers" component={Suppliers}/>
            <Route path="quoteSpecifics" component={QuoteSpecifics}/>
            <Route path="viewQuotes" component={ViewQuotes}/>
            <Route path="documents" component={Documents}/>
          </Route>
        </Router>
      </Provider>
    );
  }
};

