import * as immutable from '../utils/immutable';
import { dataActionConst } from './data-action';

export default function dataReducer(state = {}, action) {
  if (Object.keys(dataActionConst).includes(action.type)) {
    const type = action.type.replace('_DATA', '').toLowerCase();
    return immutable[type](state, action.meta._path, action.payload);
  }
  return state;
}
