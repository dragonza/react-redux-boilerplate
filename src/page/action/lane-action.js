import {
  SET_DATA,
  REMOVE_DATA,
  MERGE_DATA,
  REARRANGE_DATA
} from '../../store/data-action';

const path = 'laneList';

export const addLane = text => {
  const id = Math.ceil(new Date());
  return SET_DATA({
    _path: `${path}.${id}`,
    _value: {
      id,
      name: text,
      notes: []
    }
  });
};

export const updateLane = (id, text) => {
  return SET_DATA({
    _path: `${path}.${id}.name`,
    _value: text
  });
};

export const attachNoteToLane = (laneId, noteId) => {
  return MERGE_DATA({
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const detachFromLane = (laneId, noteId) => {
  return REMOVE_DATA({
    _path: `${path}.${laneId}.notes`,
    _value: noteId
  });
};

export const deleteLane = laneId => {
  return REMOVE_DATA({
    _path: path,
    _value: laneId
  });
};

export const arrangeNote = ({ sourceNoteIndex, targetNoteIndex, laneId }) => {
  return REARRANGE_DATA({
    _path: `${path}.${laneId}.notes`,
    _value: {
      sourceIndex: sourceNoteIndex,
      targetIndex: targetNoteIndex
    }
  });
};

export const moveNote = payload => {
  return {
    type: 'MOVE_NOTE',
    ...payload
  };
};
