import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as actions from "../tweetActions";
import * as types from "../types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  const mock = new MockAdapter(axios);
  const user = "test@gmail.com";

  // Mock succesful request for all tweets and a selected  user's tweets
  it("should call actions: REQUEST_TWEETS and RECEIVE_TWEETS and fetch a list of tweets", () => {
    mock
      .onGet("/api/tweets").reply(200, {
        data: ["some list of tweets"]
      })
      .onGet(`/api/selected-tweets/${user}`).reply(200, {
        data: ["some list of tweets"]
      });

    const expectedActions = [
      { type: types.REQUEST_TWEETS },
      { type: types.RECEIVE_TWEETS, tweets: { data: ["some list of tweets"] } }
    ];
    const store = mockStore({ tweets: [] });

    return store.dispatch(actions.getTweets()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      mock.reset();
    });
  });

  // Mock an unsuccessful request and subsequent error
  it("should call actions: REQUEST_TWEETS then FETCH_TWEETS_ERROR with an error returned in the form of an object", () => {
    mock
      .onGet("/api/tweets").networkError()

    const expectedActions = [
      { type: types.REQUEST_TWEETS },
      { type: types.FETCH_TWEETS_ERROR, err: "Error: Network Error" }
    ];
    const store = mockStore({ err: [] });

    return store.dispatch(actions.getTweets()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      mock.reset();
    });
  });

  // create a new tweet
  it("should call actions: CREATE_TWEET and post a new tweet for a verified user", () => {
  });
});
