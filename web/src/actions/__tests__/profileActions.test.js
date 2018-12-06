import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as actions from "../profileActions";
import * as types from "../types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  const mock = new MockAdapter(axios);

  it("should call actions: REQUEST_PROFILE and RECEIVE_PROFILE and fetch the appropriate user and their data", () => {
    const id = 1;
    mock.onGet(`/api/user/${id}`).reply(200, {
      data: ["some user data"]
    });

    const expectedActions = [
      { type: types.REQUEST_PROFILE },
      { type: types.RECEIVE_PROFILE, user: { data: ["some user data"] } }
    ];
    const store = mockStore({ user: [] });

    return store.dispatch(actions.getUserProfile(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
