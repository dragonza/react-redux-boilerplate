export const AUTH_USER = 'auth/UPDATE_DATA/AUTH_USER';
export const SIGNUP_SAGA = 'auth/SIGNUP_SAGA';
export const SIGNIN_SAGA = 'auth/SIGNIN_SAGA';

export const SIGNUP_FAILED = 'auth/UPDATE_DATA/SIGNUP_FAILED';
export const SIGNUP_SUCCESS = 'auth/UPDATE_DATA/SIGNUP_SUCCESS';
export const SIGNUP_LOADING = 'auth/UPDATE_DATA/SIGNUP_LOADING';

export const SIGNIN_FAILED = 'auth/UPDATE_DATA/SIGNIN_FAILED';
export const SIGNIN_SUCCESS = 'auth/UPDATE_DATA/SIGNIN_SUCCESS';
export const SIGNIN_LOADING = 'auth/UPDATE_DATA/SIGNIN_LOADING';

export const SIGNOUT = 'auth/UPDATE_DATA/SIGNOUT';

export const commonRestrictions = {
  usernameMaxLength: 15,
  passwordMinLength: 8,
};

export const errorsText = {
  requireField: 'This field is required',
  invalidEmail: 'Invalid email address',
  userNameMaxLength: 'Must be 15 characters or less',
  passwordMinLength: 'Must be 8 characters or more',
  confirmPassWordNotMatch: 'Confirmed password does not matched',
};
