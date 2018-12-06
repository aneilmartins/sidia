/* eslint-disable no-param-reassign */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from './reducers/rootReducer';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
  connectionParams: {}
})

const networkInterfaceWithSubs = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs
});

const middlewares = [client.middleware(), thunk, createLogger()];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
