import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ProfilePage from './components/profile/ProfilePage';
import NotFound from './components/common/NotFound';
// higher order components used to protect client side routing
import tweetRedirect from './utils/tweetRedirect';
import loginRedirect from './utils/loginRedirect';
import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';
import HomePage from './components/tweets/HomePage';

export default (
  <App>
    <NavigationBar />
    <FlashMessagesList />
    <Switch>
      <Route exact path="/" component={Greetings} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={loginRedirect(LoginPage)} />
      <Route path="/tweets" component={tweetRedirect(HomePage)} />
      <Route path="/profile/:id" component={tweetRedirect(ProfilePage)} />
      <Route path="/my-profile" component={tweetRedirect(ProfilePage)} />
      <Route component={NotFound} />
    </Switch>
  </App>
);


    