import axios from 'axios';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, GET_CURRENT_USER } from './types';

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function logout(user) {
  return dispatch => {
    dispatch(getCurrentUser());
    localStorage.removeItem('jwtToken');
    setAuthorisationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(token) {
  return dispatch => {
    dispatch(getCurrentUser());
    localStorage.setItem('jwtToken', token);
    setAuthorisationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  }
}