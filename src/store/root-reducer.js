import { combineReducers } from 'redux-immutable';
import { reduceReducers } from '../utils/store';
// import reducer from '../page/reducer/reducer';
import dataReducer from './data-reducer';
import defaultState from './default-state';
// add new reducer
const reducers = {};

const defaultReducer = (s = {}) => s;

// https://github.com/reduxjs/redux/issues/1994 prevent this warning
// Preserve initial state for not-yet-loaded reducers
// http://nicolasgallagher.com/redux-modules-and-code-splitting/
const finalCombinedReducers = combineReducers(
  Object.keys(defaultState.toJS()).reduce((result, key) => {
    return Object.assign({}, result, {
      [key]: reducers[key] ? reducers[key] : defaultReducer
    });
  }, reducers)
); // eslint-disable-line
const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
export default rootReducer;
