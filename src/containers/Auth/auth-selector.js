import { createSelector } from 'reselect';


const authErrorSelector = state => state.getIn(['auth', 'errorMessage']);

export const makeAuthErrorSelector = () => createSelector(
  authErrorSelector,
  errorMessage => errorMessage
);

const authTokenSelector = state => state.getIn(['auth', 'authenticated']);

export const makeAuthTokenSelector = () => createSelector(
  authTokenSelector,
  token => token
);
