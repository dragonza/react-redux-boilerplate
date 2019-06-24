import { CREATE_DATA, UPDATE_DATA } from '../../store/data-action';
import { fromJS, Map, List } from 'immutable';
import { basePath } from './constant';
import { UPDATE } from './constant';
import { CREATE_LANE } from './laneList/constant';
import uuid from 'uuid/v4';

export const fetchKanban = () => {
  return UPDATE_DATA({
    _type: `${UPDATE}/LOAD_KANBAN`,
    _path: `${basePath}.loading`,
    _value: true,
  });
};

export function fetchKanbanSuccess(type, payload = {}) {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: basePath,
    _value: fromJS(payload),
  });
}

export function fetchKanbanFailed(type, payload = {}) {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${basePath}`,
    _value: fromJS(payload),
  });
}

export const addLane = name => {
  const id = uuid();
  const newLane = Map({
    id,
    name,
    notes: List([]),
  });
  return CREATE_DATA({
    _type: CREATE_LANE,
    _path: `lanes.data.${id}`,
    _value: newLane,
  });
};

// function fromJSOrdered(js) {
//   return typeof js !== 'object' || js === null ? js :
//     Array.isArray(js) ?
//       Seq(js).map(fromJSOrdered).toList() :
//       Seq(js).map(fromJSOrdered).toOrderedMap();
// }
