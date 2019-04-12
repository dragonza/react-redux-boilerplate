import { fromJS } from 'immutable';
import * as immutable from '../utils/immutable';
import { dataActionConst } from './data-action';
import initialState from './default-state';

export default function dataReducer(state = fromJS(initialState), action) {
  let { type } = action;
  const dataActionConstList = Object.keys(dataActionConst);

  for (const dataType of dataActionConstList) {
    const i = type.includes(dataType);
    if (i) {
      type = dataType.replace('_DATA', '').toLowerCase();
      return immutable[type](
        state,
        action.meta._path,
        action.payload,
        action.meta._subPath,
      );
    }
  }
  return state;
}
