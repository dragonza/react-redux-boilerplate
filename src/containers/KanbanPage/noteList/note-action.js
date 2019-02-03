import { Map } from 'immutable';
import { CREATE_DATA, REMOVE_DATA, UPDATE_DATA } from '../../../store/data-action';
import { CREATE, UPDATE, REMOVE } from './constant';
import { basePath } from "../constant";
import uuid from 'uuid/v4';
// _type should matching with the action creator name
const path = `${basePath}.noteList`;

export const updateNote = (noteId, text) => {
  return UPDATE_DATA({
    _type: UPDATE,
    _path: `${path}`,
    _subPath: `${noteId}.task`,
    _value: text
  });
};

export const addNote = text => {
  // get random id
  const id = uuid();
  return CREATE_DATA({
    _type: CREATE,
    _path: `${path}`,
    _value: Map({
      id,
      task: text
    })
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _type: REMOVE,
    _path: path,
    _value: ids
  });
};
