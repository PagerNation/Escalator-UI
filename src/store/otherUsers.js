import 'whatwg-fetch';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { getJSON, postJSON, putJSON, deleteObject } from '../utils/apiRequest';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';


// ------------------------------------
// Actions
// ------------------------------------
export const fetchUser = (userId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      getJSON(`user/${userId}/`).then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
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
  [FETCH_USER_SUCCESS]: (state, action) => {
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
