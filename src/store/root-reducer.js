import { reducer as formReducer } from 'redux-form/immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { combineReducers } from 'redux-immutable';
import { reduceReducers } from '../utils/reduceReducers';
import dataReducer from './data-reducer';
import defaultState from './default-state';
// add new reducer
const reducers = {
  form: formReducer
};
const defaultReducer = (s = {}) => s;

// https://github.com/reduxjs/redux/issues/1994 prevent this warning
// Preserve initial state for not-yet-loaded reducers
// http://nicolasgallagher.com/redux-modules-and-code-splitting/
// better than using reduce
const preserveInitialStateReducers = reducers => {
  const reducerNames = Object.keys(reducers);
  const preservedReducers = {
    ...reducers,
  };
  Object.keys(defaultState.toJS()).forEach(key => {
    if (!reducerNames.includes(key)) {
      preservedReducers[key] = defaultReducer;
    }
  });
  return preservedReducers;
};

const finalCombinedReducers = history =>
  combineReducers({
    router: connectRouter(history),
    ...preserveInitialStateReducers(reducers),
  });
const rootReducer = history =>
  reduceReducers(finalCombinedReducers(history), dataReducer);
export default rootReducer;
