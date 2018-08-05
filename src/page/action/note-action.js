import { SET_DATA, REMOVE_DATA } from '../../store/data-action';

// get we get dynamic path?
const path = 'noteList';

export const updateNote = (id, text) => {
  return SET_DATA({
    _path: `${path}.${id}.task`,
    _value: text
  });
};

export const addNote = text => {
  const id = Math.ceil(new Date()); // get random number
  return SET_DATA({

    _path: `${path}.${id}`,
    _value: {
      id,
      task: text
    }
  });
};

export const deleteNote = ids => {
  return REMOVE_DATA({
    _path: path,
    _value: ids
  });
};
