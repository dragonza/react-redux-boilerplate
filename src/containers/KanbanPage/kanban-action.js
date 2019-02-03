import { UPDATE_DATA } from "../../store/data-action";
import { fromJS } from "immutable";
import { basePath } from "./constant";
import { UPDATE } from "./constant";

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

// function fromJSOrdered(js) {
//   return typeof js !== 'object' || js === null ? js :
//     Array.isArray(js) ?
//       Seq(js).map(fromJSOrdered).toList() :
//       Seq(js).map(fromJSOrdered).toOrderedMap();
// }
