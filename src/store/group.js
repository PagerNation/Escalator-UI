import 'whatwg-fetch';
import _ from 'lodash';

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
      fetch(config.api_url + 'group/' + groupId).then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch({
          type: FETCH_GROUP_SUCCESS,
          payload: json
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
