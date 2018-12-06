import { SET_CURRENT_USER, GET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash.isempty';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) =>{
  switch(action.type) {
    case GET_CURRENT_USER:
      return Object.assign({}, state, {
        isLoading: true
      })
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        isLoading: false
      })
    default: return state;
  }
}