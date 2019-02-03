import { combineReducers } from 'redux-immutable';
import { reduceReducers } from '../utils/reduceReducers';
import { connectRouter } from 'connected-react-router/immutable'
// import reducer from '../page/reducer/reducer';
import laneListReducer from '../containers/KanbanPage/laneList/lanelist-reducer'
import dataReducer from './data-reducer';
import defaultState from './default-state';
// add new reducer
const reducers = {
  laneList: laneListReducer
};
const defaultReducer = (s = {}) => s;

// https://github.com/reduxjs/redux/issues/1994 prevent this warning
// Preserve initial state for not-yet-loaded reducers
// http://nicolasgallagher.com/redux-modules-and-code-splitting/
// better than using reduce
const preserveInitialStateReducers = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(defaultState.toJS()).forEach(key => {
    if (!reducerNames.includes(key)) {
      reducers[key] = defaultReducer;
    }
  });
  return {
    ...reducers
  }
};

const finalCombinedReducers = (history) => combineReducers({
  router: connectRouter(history),
  ...preserveInitialStateReducers(reducers)
}); // eslint-disable-line
const rootReducer = (history) => reduceReducers(finalCombinedReducers(history), dataReducer);
export default rootReducer;
