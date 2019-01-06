import { Map } from 'immutable';
import { SET_DATA, REMOVE_DATA, ADD_DATA } from '../../store/data-action';
// _type should matching with the action creator name
const path = 'noteList';

export const updateNote = (id, text) => {
  return SET_DATA({
    _type: `${path}/UPDATE_NOTE`,
    _path: `${path}.${id}.task`,
    _value: text
  });
};

export const addNote = text => {
  // get random number
  const id = Math.ceil(new Date());
  return ADD_DATA({
    _type: `${path}/ADD_NOTE`,
    _path: `${path}.${id}`,
    _value: Map({
      id,
      task: text
    })
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _type: `${path}/DELETE_NOTE`,
    _path: path,
    _value: ids
  });
};
