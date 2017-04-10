import 'whatwg-fetch';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { getJSON, postJSON, putJSON, deleteObject } from '../utils/apiRequest';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_OTHER_USER_SUCCESS = 'FETCH_OTHER_USER_SUCCESS';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const UPDATE_USER_ADMIN_SUCCESS = 'UPDATE_USER_ADMIN_SUCCESS';


// ------------------------------------
// Actions
// ------------------------------------
export const fetchOtherUser = (userId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON(`user/${userId}/`).then((response) => {
        dispatch({
          type: FETCH_OTHER_USER_SUCCESS,
          payload: response,
          userId
        });
        resolve();
      });
    });
  }
};

export const searchByName = (query) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON(`user/searchByName/${query}`).then((response) => {
        dispatch({
          type: SEARCH_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const updateUserAdmin = (userId, profile) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      putJSON(`user/${userId}/`, profile).then((response) => {
        dispatch({
          type: UPDATE_USER_ADMIN_SUCCESS,
          payload: response,
          userId
        });
        resolve();
      });
    });
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_OTHER_USER_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state);
    newState.users[action.userId] = action.payload;
    return newState;
  },
  [SEARCH_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state, {searchResults: action.payload});
    return newState;
  },
  [UPDATE_USER_ADMIN_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state);
    newState.users[action.userId] = action.payload;
    newState.searchResults = [];
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: {},
  searchResults: []
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
