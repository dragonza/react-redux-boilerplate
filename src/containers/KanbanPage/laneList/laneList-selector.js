import { createSelector } from "reselect";

export const lanesDataSelector = (state) => {
  return  state.getIn(['lanes', 'data'])
};
export const makeLanesDataSelector = () =>
  createSelector(lanesDataSelector, lanesData => {
    return lanesData;
  });

