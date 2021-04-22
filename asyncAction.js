const redux = require('redux');
const applymiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS = 'FETCH_USERS';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

const fetchUserRequest = () => {
  return { type: FETCH_USERS };
};

const fetchUserSuccess = (users) => {
  return { type: SUCCESS, payload: users };
};

const fetchUserFail = (error) => {
  return { type: FAIL, payload: error };
};

const reduder = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FAIL:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get('https://jsonplaceholcer.typicode.com/users')
      .then((res) => {
        const users = res.data.map((users) => users.name);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFail(error));
      });
  };
};

const store = createStore(reduder, applymiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
