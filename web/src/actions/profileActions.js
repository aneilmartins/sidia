import axios from 'axios';
import { REQUEST_PROFILE, RECEIVE_PROFILE, FETCH_PROFILE_ERROR } from './types';

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info
  }
}

