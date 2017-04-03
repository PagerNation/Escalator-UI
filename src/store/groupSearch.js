import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON, deleteObject, putJSON } from "../utils/apiRequest";

// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH_GROUPS_SUCCESS = 'SEARCH_GROUPS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const searchGroups = (search) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON(`group/searchByName?groupName=${search}`).then((response) => {
        dispatch({
          type: SEARCH_GROUPS_SUCCESS,
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
  [SEARCH_GROUPS_SUCCESS]: (state, action) => {
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];

export default function groupSearchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
