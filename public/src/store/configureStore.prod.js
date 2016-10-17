import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

const middleware = applyMiddleware(thunk);
const store = autoRehydrate()(createStore)(rootReducer, middleware);
persistStore(store);

module.exports = function configureStore() {
  return store;
};
