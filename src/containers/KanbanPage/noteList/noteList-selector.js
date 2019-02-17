import { createSelector } from "reselect";
import {
  laneListSelector,
  laneItemIdSelector
} from "../laneList/laneList-selector";

export const noteListSelector = state => state.getIn(["kanban", "noteList"]);
// export const noteIdListByLane = (state, props) => {
//   console.log('props', props);
//   console.log('laneListSelector', laneListSelector);
//   return laneListSelector[props.laneId].get('notes');
// };
export const noteIdListByLane = createSelector(
  laneListSelector,
  laneItemIdSelector,
  (laneList, laneId) => {
    return laneList.get(laneId.toString()).get('notes');
  }
);

export const makeNoteIdListByLane = () =>
  createSelector(noteIdListByLane, noteIdListByLane => noteIdListByLane)

export const makeNoteListSelector = () =>
  createSelector(
    noteListSelector,
    noteIdListByLane,
    (noteList, noteIdByLane) => {
      return noteIdByLane
        .map(noteId => noteList.find(note => note.get("id") === noteId))
        .filter(Boolean);
    }
  );
