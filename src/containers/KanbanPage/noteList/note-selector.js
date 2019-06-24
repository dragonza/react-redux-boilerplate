import { createSelector } from "reselect";

const notesSelector = (state, ownProps) => {
  return state.getIn(["notes", "data"]).get(ownProps.noteId);
};

export const makeNoteSelector = () =>
  createSelector(notesSelector, note => note);
