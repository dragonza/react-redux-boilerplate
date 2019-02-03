import { createSelector } from 'reselect';


export const noteListSelector = state => state.getIn(['kanban', 'noteList']);
export const noteIdListByLane = (state, props) => {
  return props.lane.get('notes');
};

export const makeNoteListSelector = () =>
  createSelector(
    noteListSelector,
    noteIdListByLane,
    (noteList, noteIdByLane) => {
      return noteIdByLane
        .map(noteId => noteList.find(note => note.get('id') === noteId))
        .filter(Boolean);
    }
  );
