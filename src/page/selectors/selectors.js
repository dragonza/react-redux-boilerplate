import { createSelector } from 'reselect';

export const laneListSelector = state => state.get('laneList');

export const noteListSelector = state => state.get('noteList');
export const noteIdListByLane = (state, props) => {
  return props.lane.get('notes');
};

export const makeLaneListSelector = () =>
  createSelector(laneListSelector, laneList => laneList);

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
