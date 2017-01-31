import 'whatwg-fetch';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN_FAILURE = "LOG_IN_ERROR";
export const CLEAR_LOG_IN_ERROR = "CLEAR_LOG_IN_ERROR";


// ------------------------------------
// Actions
// ------------------------------------
export const clearLoginError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_LOG_IN_ERROR
    });
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN_FAILURE]: (state, action) => {
    const newState = {};
    _.assign(newState, state, {loginError: action.payload});
    return newState;
  },
  [CLEAR_LOG_IN_ERROR]: (state, action) => {
    const newState = {};
    _.assign(newState, state, {loginError: null});
    return newState;
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
