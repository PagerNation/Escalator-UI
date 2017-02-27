import 'whatwg-fetch';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { getJSON, postJSON, putJSON, deleteObject } from '../utils/apiRequest';
import { LOG_IN_FAILURE, SIGN_UP_FAILURE } from "./api";

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const REORDER_DEVICES_SUCCESS = "REORDER_DEVICES_SUCCESS";


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
    });
  }
};

export const signUp = (name, email, password, passwordConfirm) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      if (password !== passwordConfirm) {
        dispatch({
          type: SIGN_UP_FAILURE,
          payload: "Passwords do not match."
        });
      } else {
        postJSON('auth/signup', {name, email, password}).then((response) => {
          dispatch({
            type: LOG_IN_SUCCESS,
            payload: response
          });
          resolve();
        }).catch((response) => {
          dispatch({
            type: SIGN_UP_FAILURE,
            payload: response
          });
          resolve();
        });
      }
    });
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
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      getJSON(`user/${userId}/`).then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const updateProfile = (profile) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      putJSON(`user/${userId}/`, profile).then((response) => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
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
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      postJSON(`user/${userId}/device`, device).then((response) => {
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
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      deleteObject(`user/${userId}/device/${id}`).then((json) => {
        dispatch({
          type: DELETE_DEVICE_SUCCESS,
          payload: json
        });
        resolve();
      });
    })
  }
};

export const reorderDevices = (ids) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      putJSON(`user/${userId}/devices/`, {sortOrder: ids}).then((response) => {
        dispatch({
          type: REORDER_DEVICES_SUCCESS,
          payload: response
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
  [REORDER_DEVICES_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [FETCH_GROUPS_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state);
    newState.groups = action.payload.groups;
    return newState;
  },
  [UPDATE_PROFILE_SUCCESS]: (state, action) => {
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
