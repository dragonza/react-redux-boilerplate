import { fromJS } from 'immutable';
import { SIGNUP_SAGA, SIGNUP_FAILED, SIGNUP_SUCCESS, SIGNUP_LOADING, SIGNOUT, SIGNIN_SAGA} from './auth-constant';
import { UPDATE_DATA } from '../../store/data-action';

const path = 'auth';
export const signUp = formProps => {
  return {
    type: SIGNUP_SAGA,
    formProps,
  };
};

export const signUpLoading = loading => {
  return UPDATE_DATA({
    _type: SIGNUP_LOADING,
    _path: `${path}.loading`,
    _value: loading,
  })
};


export const signUpSuccess = payload => {
  return UPDATE_DATA({
    _type: SIGNUP_SUCCESS,
    _path: `${path}`,
    _value: fromJS(payload),
  });
};

export const signUpFailed = (payload = {}) => {
  return UPDATE_DATA({
    _type: SIGNUP_FAILED,
    _path: path,
    _value: fromJS(payload),
  });
};


export const signout = () => {
  localStorage.removeItem('token');
  return UPDATE_DATA({
    _type: SIGNOUT,
    _path: `${path}.authenticated`,
    _value: '',
  })
};

export const signIn = formProps => {
  return {
    type: SIGNIN_SAGA,
    formProps,
  };
};
