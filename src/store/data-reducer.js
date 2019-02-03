import * as immutable from '../utils/immutable';
import { Map } from 'immutable'
import { dataActionConst } from './data-action';

export default function dataReducer(state = Map({}), action) {
  let type = action.type;
  for (let dataType of Object.keys(dataActionConst)) {
    const i = action.type.includes(dataType);
    if (i) {
      type =  dataType.replace('_DATA', '').toLowerCase();
      return immutable[type](state, action.meta._path, action.payload, action.meta._subPath);
    }
  }
  // if (Object.keys(dataActionConst).includes(action.type)) {
  //
  //   const type = action.type.replace('_DATA', '').toLowerCase();
  //   return immutable[type](state, action.meta._path, action.payload);
  // }
  return state;
}
