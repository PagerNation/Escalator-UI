import 'whatwg-fetch';
import _ from 'lodash';
import {getJSON} from "../utils/apiRequest";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';

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


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_GROUP_SUCCESS]: (state, action) => {
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
