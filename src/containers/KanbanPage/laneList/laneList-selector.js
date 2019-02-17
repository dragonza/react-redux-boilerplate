import { createSelector } from "reselect";
export const laneListSelector = (state) => {
  return  state.getIn(['kanban', 'laneList', 'laneMap'])
};
export const laneListIdsSelector = state => state.getIn(['kanban', 'laneList', 'byIds']);
export const laneListIdSelector = createSelector(laneListIdsSelector, laneListIds => {
  return laneListIds
});

export const laneItemIdSelector = (state, ownProps) => ownProps.laneId.toString();

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

export const makeLaneListIdsSelector = () =>
  createSelector(laneListIdSelector, laneListIds => laneListIds);


export const makeLaneItemSelector = () =>
  createSelector([laneListSelector, laneItemIdSelector], (laneList, laneItemId) => {
    return laneList.get(laneItemId)
  }
);
