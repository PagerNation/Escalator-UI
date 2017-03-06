import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON, deleteObject } from "../utils/apiRequest";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchGroup = (groupId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON('group/' + groupId).then((response) => {
        dispatch({
          type: FETCH_GROUP_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const leaveGroup = (groupName, userId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      deleteObject(`group/${groupName}/user/${userId}`).then((json) => {
        dispatch({
          type: LEAVE_GROUP_SUCCESS,
          payload: json
        });
        resolve();
      });
    })
  }
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_GROUP_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [LEAVE_GROUP_SUCCESS]: (state, action) => {
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

export default function groupReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
