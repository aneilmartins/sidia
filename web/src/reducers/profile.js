import { REQUEST_PROFILE, RECEIVE_PROFILE, FETCH_PROFILE_ERROR } from '../actions/types';

export default (state = { 
  isLoading: false,
  profile: {},
  errors: {}
}, action = {}) => {
  switch(action.type) {
    case FETCH_PROFILE_ERROR:
      return Object.assign({}, state, {
        errors: action.err,
        isLoading: false
      })
    case REQUEST_PROFILE:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {
        isLoading: false,
        profile: action.user.user,
        errors: {}
      })
    default: return state;
  }
}