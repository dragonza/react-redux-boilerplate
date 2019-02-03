import { createSelector } from "reselect";

export const laneListSelector = state => state.getIn(["kanban", "laneList"]);
export const kanbanLoadingSelector = state =>
  state.getIn(["kanban", "loading"]);
export const kanbanErrorSelector = state => state.getIn(["kanban", "error"]);

export const makeLaneListSelector = () =>
  createSelector(laneListSelector, laneList => {
    return laneList;
  });

export const makeKanbanLoadingSelector = () =>
  createSelector(kanbanLoadingSelector, loading => loading);

export const makeKanbanErrorSelector = () =>
  createSelector(kanbanErrorSelector, error => error);
