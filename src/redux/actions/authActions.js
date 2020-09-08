import axios from 'axios';
import {
  AUTH_SUCCESS,
  LOGOUT
} from "../actionTypes";

export const authSuccess = idToken => {
  return {
    type: AUTH_SUCCESS,
    payload: idToken
  }
}

export const logout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  localStorage.removeItem('expiresIn');

  return {
    type: LOGOUT
  }
}

/* THUNK */

export const auth = (email, password, isLogin) => async dispatch => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  }

  const url = isLogin ?
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMheNS1NSAy0K9L7cq5k-P3eu5DZ4JFg0' :
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMheNS1NSAy0K9L7cq5k-P3eu5DZ4JFg0'

  const response = await axios.post(url, authData);
  const data = response.data;

  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

  localStorage.setItem('idToken', data.idToken);
  localStorage.setItem('localId', data.localId);
  localStorage.setItem('expiresIn', expirationDate);

  dispatch(authSuccess(data.idToken));
  dispatch(endSession(data.expiresIn));
}

export const endSession = time => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000)
}

export const autoLogin = () => dispatch => {
  const token = localStorage.getItem('idToken');
  const expirationDate = new Date(localStorage.getItem('expiresIn'));
  if (token && expirationDate >= new Date()) {
    dispatch(authSuccess(token));
    dispatch(endSession((expirationDate.getTime() - new Date()) / 1000));
  }
}