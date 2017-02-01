import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON, postJSON, deleteObject } from '../utils/apiRequest';
import {LOG_IN_FAILURE} from "./api";

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';


// ------------------------------------
// Actions
// ------------------------------------
export const logIn = (email, password) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      postJSON('auth/login', {email, password}).then((response) => {
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: response
        });
        resolve();
      }).catch((response) => {
        dispatch({
          type: LOG_IN_FAILURE,
          payload: response
        });
        resolve();
      });
    })
  }
};

export const logOut = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LOG_OUT
    });
  }
};

export const fetchUser = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON('user/5888fb6ca7583615bf9aa5c9/').then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const fetchUserGroups = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      getJSON('user/5888fb6ca7583615bf9aa5c9/group').then((response) => {
        dispatch({
          type: FETCH_GROUPS_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const addDevice = (device) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      postJSON('user/5888fb6ca7583615bf9aa5c9/device', device).then((response) => {
        dispatch({
          type: ADD_DEVICE_SUCCESS,
          payload: response
        });
        resolve();
      });
    })
  }
};

export const deleteDevice = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      deleteObject('user/5888fb6ca7583615bf9aa5c9/device/' + id).then((json) => {
        dispatch({
          type: DELETE_DEVICE_SUCCESS,
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
  [LOG_IN_SUCCESS]: (state, action) => {
    localStorage.setItem('escalatorToken', action.payload.token);
    return action.payload.user;
  },
  [LOG_OUT]: (state, action) => {
    localStorage.removeItem('escalatorToken');
    return null;
  },
  [FETCH_USER_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [ADD_DEVICE_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [DELETE_DEVICE_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [FETCH_GROUPS_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state);
    newState.groups = action.payload.groups;
    return newState;
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
