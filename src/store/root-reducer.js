import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduceReducers } from '../utils/store';

import dataReducer from './data-reducer';
import defaultState from './default-state';

// Put new reducers here
const reducers = {
  router: routerReducer
};
const defaultReducer = (s = {}) => s;
// eslint-disable-next-line
const finalCombinedReducers = combineReducers(
  Object.keys(defaultState).reduce((result, key) => {
    return Object.assign({}, result, {
      [key]: reducers[key] ? reducers[key] : defaultReducer
    });
  }, reducers)
); // eslint-disable-line
const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
export default rootReducer;
