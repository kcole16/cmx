import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import {persistStore, autoRehydrate} from 'redux-persist'

/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
const store = autoRehydrate()(createStore)(rootReducer, middleware);
persistStore(store);

module.exports = function configureStore() {
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }
  return store;
};
