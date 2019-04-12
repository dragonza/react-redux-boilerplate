import {
  CREATE_DATA,
  UPDATE_DATA,
  REMOVE_DATA,
} from '../../../store/data-action';
import { UPDATE_LANE, REMOVE_LANE, DETACH_NOTE, ATTACH_NOTE } from './constant';

const path = `lanes`;

export const updateLane = (laneId, text) => {
  return UPDATE_DATA({
    _type: UPDATE_LANE,
    _path: `${path}.data.${laneId}.name`,
    _value: text,
  });
};

export const attachNoteToLane = (laneId, noteId) => {
  return CREATE_DATA({
    _type: ATTACH_NOTE,
    _path: `${path}.data.${laneId}.notes`,
    _value: noteId,
  });
};

export const detachFromLane = (laneId, noteId) => {
  return REMOVE_DATA({
    _type: DETACH_NOTE,
    _path: `lanes.data.${laneId}.notes`,
    _value: [noteId],
  });
};

export const deleteLane = laneId => {
  return REMOVE_DATA({
    _type: REMOVE_LANE,
    _value: laneId,
    _path: 'lanes.data',
  });
};


// for saga
export const moveNote = payload => {
  return {
    type: 'MOVE_NOTE',
    ...payload,
  };
};
