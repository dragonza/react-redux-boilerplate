import { CREATE_DATA, UPDATE_DATA } from "../../store/data-action";
import { fromJS, Map } from "immutable";
import { basePath } from "./constant";
import { UPDATE } from "./constant";
import { ADD_LANE_SAGA, CREATE_LANE } from "./laneList/constant";


export const fetchKanban = () => {
  return UPDATE_DATA({
    _type: `${UPDATE}/LOAD_KANBAN`,
    _path: `${basePath}.loading`,
    _value: true
  });
  // return {
  //   type: FETCH_KANBAN
  // };
};

export function fetchKanbanSuccess(type, payload = {}) {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: basePath,
    _value: fromJS(payload)
  });
}

export function fetchKanbanFailed(type, payload = {}) {
  console.log("error", payload);
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${basePath}`,
    _value: fromJS(payload)
  });
}

export const addLane = name => {
  return {
    type: ADD_LANE_SAGA,
    name
  };
};

export const addLaneToMap = lane => {
  return CREATE_DATA({
    _type: `${CREATE_LANE}/ADD_LANE_TO_MAP`,
    _path: `${basePath}.laneList.laneMap.${lane.id}`,
    _value: Map({
      ...lane
    })
  });
};

export const addLaneToIdsList = laneId => {
  return CREATE_DATA({
    _type: `${CREATE_LANE}/ADD_ID_TO_LIST`,
    _path: `${basePath}.laneList.byIds`,
    _value: laneId
  });
};

// function fromJSOrdered(js) {
//   return typeof js !== 'object' || js === null ? js :
//     Array.isArray(js) ?
//       Seq(js).map(fromJSOrdered).toList() :
//       Seq(js).map(fromJSOrdered).toOrderedMap();
// }
