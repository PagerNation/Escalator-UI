import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON, postJSON, deleteObject } from '../utils/apiRequest';
import {LOG_IN_FAILURE} from "./api";

// ------------------------------------
// Constants
// ------------------------------------
//export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
//export const LOG_OUT = 'LOG_OUT';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
//export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';
//export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
//export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';


// ------------------------------------
// Actions
// ------------------------------------
export const fetchOtherUser = () => {
  console.log('hit')
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON('user/5841d4a610b9621c9152b1e3/').then((response) => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: response
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
  [FETCH_USERS_SUCCESS]: (state, action) => {
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
