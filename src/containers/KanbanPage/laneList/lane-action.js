import { Map, List } from 'immutable';
import uuid from 'uuid/v4'
import {
  CREATE_DATA,
  UPDATE_DATA,
  REMOVE_DATA,
  // MERGE_DATA,
} from '../../../store/data-action';
import { CREATE, UPDATE, REMOVE } from './constant';
import { basePath } from "../constant";
const path = `${basePath}.laneList`;

export const addLane = text => {
  const id = uuid();
  // return {
  //   type: 'CREATE_LANE_TEST',
  //   payload: {
  //     id,
  //     name: text,
  //     notes: List([])
  //   }
  // }
  return CREATE_DATA({
    _type: CREATE,
    _path: `${path}.laneMap`,
    _value: Map({
      id,
      name: text,
      notes: List([])
    })
  });
};

export const updateLane = (laneId, text) => {
  return UPDATE_DATA({
    _type: UPDATE,
    _path: `${path}`,
    _subPath: `${laneId}.name`,
    _value: text
  });
};

export const attachNoteToLane = (laneId, noteId) => {
  console.log('laneId', laneId);
  return CREATE_DATA({
    _type: `${CREATE}/ATTACH_NOTE_TO_LANE`,
    _path: `${path}.laneMap.${laneId}.notes`,
    _value: noteId
  });
};

export const detachFromLane = (laneId, noteId) => {
  return REMOVE_DATA({
    _type: `${REMOVE}/DETACH_NOTE`,
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const deleteLane = laneId => {
  return REMOVE_DATA({
    _type: `${REMOVE}/DELETE_LANE`,
    _path: path,
    _value: laneId
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
    type: 'MOVE_NOTE',
    ...payload
  };
};
