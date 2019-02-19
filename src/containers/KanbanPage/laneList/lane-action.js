import { Map, List } from "immutable";
import uuid from "uuid/v4";
import {
  CREATE_DATA,
  UPDATE_DATA,
  REMOVE_DATA
  // MERGE_DATA,
} from "../../../store/data-action";
import {
  CREATE_LANE,
  UPDATE_LANE,
  REMOVE_LANE,
  DELETE_LANE_SAGA,
  ADD_LANE_SAGA,
} from "./constant";
import { basePath } from "../constant";


const path = `${basePath}.laneList`;


export const updateLane = (laneId, text) => {
  return UPDATE_DATA({
    _type: UPDATE_LANE,
    _path: `${path}.laneMap.${laneId}.name`,
    _value: text
  });
};

export const attachNoteToLane = (laneId, noteId) => {
  console.log("laneId", laneId);
  return CREATE_DATA({
    _type: `${CREATE_LANE}/ATTACH_NOTE_TO_LANE`,
    _path: `${path}.laneMap.${laneId}.notes`,
    _value: noteId
  });
};

export const detachFromLane = (laneId, noteId) => {
  return REMOVE_DATA({
    _type: `${REMOVE_DATA}/DETACH_NOTE`,
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const deleteLane = laneId => {
  return {
    type: DELETE_LANE_SAGA,
    laneId
  };
};

export const deleteLaneFromMap = laneId => {
  return REMOVE_DATA({
    _type: `${REMOVE_LANE}/DELETE_LANE_FROM_MAP`,
    _path: `${path}.laneMap`,
    _value: List([laneId])
  });
};

export const deleteLaneIdFromList = laneId => {
  return REMOVE_DATA({
    _type: `${REMOVE_LANE}/DELETE_LANE_FROM_IDLIST`,
    _path: `${path}.byIds`,
    _value: List([laneId])
  });
};

// export const arrangeNote = ({ sourceNoteIndex, targetNoteIndex, laneId }) => {
//   return REARRANGE_DATA({
//     _type: `${REARRANGE}/REARRANGE_NOTE`,
//     _path: `${path}.${laneId}.notes`,
//     _value: {
//       sourceIndex: sourceNoteIndex,
//       targetIndex: targetNoteIndex
//     }
//   });
// };

// for saga
export const moveNote = payload => {
  return {
    type: "MOVE_NOTE",
    ...payload
  };
};
