import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import user from './user';
import deals from './deals';

const rootReducer = combineReducers({
  user,
  deals,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
