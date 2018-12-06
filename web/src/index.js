import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';
import rootReducer from './reducers/rootReducer';
import setAuthorisationToken from './utils/setAuthorisationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import './index.css';

import { ApolloProvider } from "react-apollo";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true
  }
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwtToken');
  if (token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  return forward(operation);
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

// const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
//   reconnect: true,
// });
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   authLink.concat(httpLink),
//   wsClient,
// );

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: link,
  cache: new InMemoryCache(),
  // link: networkInterfaceWithSubscriptions,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorisationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <ApolloProvider store={store} client={client}>
    {/* <Provider store={store}> */}
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
    {/* </Provider>, */}
  </ApolloProvider>,
  document.getElementById('root'));
