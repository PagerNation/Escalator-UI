import 'whatwg-fetch';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN_FAILURE = "LOG_IN_ERROR";
export const CLEAR_LOG_IN_ERROR = "CLEAR_LOG_IN_ERROR";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const GLOBAL_ERROR = "GLOBAL_ERROR";
export const CLEAR_GLOBAL_ERROR = "CLEAR_GLOBAL_ERROR";


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

export const clearGlobalError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_GLOBAL_ERROR
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
  },
  [SIGN_UP_FAILURE]: (state, action) => {
    const newState = {};
    _.assign(newState, state, {signupError: action.payload});
    return newState;
  },
  [GLOBAL_ERROR]: (state, action) => {
    const newState = {};
    _.assign(newState, state, {globalError: action.payload});
    return newState;
  },
  [CLEAR_GLOBAL_ERROR]: (state, action) => {
    const newState = {};
    _.assign(newState, state, {globalError: null});
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
