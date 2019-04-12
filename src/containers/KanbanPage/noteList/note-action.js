import { Map } from 'immutable';
import {
  CREATE_DATA,
  REMOVE_DATA,
  UPDATE_DATA,
} from '../../../store/data-action';
import {
  CREATE_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
} from './constant';
// _type should matching with the action creator name
const path = 'notes';

export const updateNote = (noteId, text) => {
  return UPDATE_DATA({
    _type: UPDATE_NOTE,
    _path: `${path}.data.${noteId}.task`,
    _value: text,
  });
};

export const addNote = task => {
  return CREATE_DATA({
    _type: CREATE_NOTE,
    _path: `notes.data.${task.id}`,
    _value: Map(task),
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _type: REMOVE_NOTE,
    _path: 'notes.data',
    _value: ids,
  });
};
