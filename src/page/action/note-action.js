import { Map } from 'immutable';
import { SET_DATA, REMOVE_DATA, ADD_DATA } from '../../store/data-action';

const path = 'noteList';

export const updateNote = (id, text) => {
  return SET_DATA({
    _path: `${path}.${id}.task`,
    _value: text
  });
};

export const addNote = text => {
  const id = Math.ceil(new Date()); // get random number
  return ADD_DATA({
    _path: `${path}.${id}`,
    _value: Map({
      id,
      task: text
    })
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _path: path,
    _value: ids
  });
};
