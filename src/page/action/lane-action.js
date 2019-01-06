import { Map, List } from 'immutable';
import {
  ADD_DATA,
  SET_DATA,
  REMOVE_DATA,
  // MERGE_DATA,
  REARRANGE_DATA
} from '../../store/data-action';

const path = 'laneList';

export const addLane = text => {
  const id = Math.ceil(new Date());
  return ADD_DATA({
    _type: `${path}/ADD_LANE`,
    _path: `${path}.${id}`,
    _value: Map({
      id,
      name: text,
      notes: List([])
    })
  });
};

export const updateLane = (id, text) => {
  return SET_DATA({
    _type: `${path}/UPDATE_LANE`,
    _path: `${path}.${id}.name`,
    _value: text
  });
};

export const attachNoteToLane = (laneId, noteId) => {
  return ADD_DATA({
    _type: `${path}/ATTACH_NOTE_TO_LANE`,
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const detachFromLane = (laneId, noteId) => {
  return REMOVE_DATA({
    _type: `${path}/DETACH_FROM_LANE`,
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const deleteLane = laneId => {
  return REMOVE_DATA({
    _type: `${path}/DELETE_LANE`,
    _path: path,
    _value: laneId
  });
};

export const arrangeNote = ({ sourceNoteIndex, targetNoteIndex, laneId }) => {
  return REARRANGE_DATA({
    _type: `${path}/REARRANGE_NOTE`,
    _path: `${path}.${laneId}.notes`,
    _value: {
      sourceIndex: sourceNoteIndex,
      targetIndex: targetNoteIndex
    }
  });
};

// for saga
export const moveNote = payload => {
  return {
    type: 'MOVE_NOTE',
    ...payload
  };
};
