import  { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import userProfile from './profile';
import user from './user';

export default combineReducers({
  flashMessages,
  auth,
  userProfile,
  user
});