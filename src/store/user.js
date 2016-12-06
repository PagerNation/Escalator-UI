import 'whatwg-fetch';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';


// ------------------------------------
// Actions
// ------------------------------------
export const fetchUser = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/5846fe065921bfae9fe28eea/').then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: json
        });
        resolve();
      });
    });
  }
};

export const fetchUserGroups = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/5846fe065921bfae9fe28eea/group').then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch({
          type: FETCH_GROUPS_SUCCESS,
          payload: json
        });
        resolve();
      });
    });
  }
};

export const addDevice = (device) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/5846fe065921bfae9fe28eea/device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
      }).then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch({
          type: ADD_DEVICE_SUCCESS,
          payload: json
        });
        resolve();
      });
    })
  }
};

export const deleteDevice = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/5846fe065921bfae9fe28eea/device/' + id, {
        method: 'DELETE'
      }).then((response) => {
        return response.json();
      }).then((json) => {
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
