import { createSelector } from 'reselect';

export const laneListSelector = state => Object.values(state.laneList);

export const noteListSelector = state => Object.values(state.noteList);
export const noteIdListByLane = (state, props) => props.lane.notes;

export const makeLaneListSelector = () =>
  createSelector(laneListSelector, laneList => laneList);

export const makeNoteListSelector = () =>
  createSelector(
    noteListSelector,
    noteIdListByLane,
    (noteList, noteIdByLane) => {
      return noteIdByLane
        .map(noteId => noteList.find(note => note.id === noteId))
        .filter(Boolean);
    }
  );
