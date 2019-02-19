import { Map } from "immutable";
import {
  CREATE_DATA,
  REMOVE_DATA,
  UPDATE_DATA
} from "../../../store/data-action";
import {
  CREATE_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  ADD_NOTE_SAGA
} from "./constant";
import { basePath } from "../constant";
// _type should matching with the action creator name
const path = `${basePath}.noteList`;

export const updateNote = (noteId, text) => {
  return UPDATE_DATA({
    _type: UPDATE_NOTE,
    _path: `${path}`,
    _subPath: `${noteId}.task`,
    _value: text
  });
};

export const addNote = (task, laneId) => {
  return {
    type: ADD_NOTE_SAGA,
    task,
    laneId
  };
};

export const addNoteToIdsList = id => {
  console.log("id", id);
  return CREATE_DATA({
    _type: `${CREATE_NOTE}/ADD_ID_TO_LIST`,
    _path: `${path}.byIds`,
    _value: id
  });
};

export const addNoteToMap = note => {
  return CREATE_DATA({
    _type: `${CREATE_NOTE}/ADD_NOTE_TO_MAP`,
    _path: `${path}.${note.id}`,
    _value: Map({ ...note })
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _type: REMOVE_NOTE,
    _path: path,
    _value: ids
  });
};
