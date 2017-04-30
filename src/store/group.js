import 'whatwg-fetch';
import jwtDecode from 'jwt-decode';
import { getJSON, deleteObject, putJSON, postJSON } from "../utils/apiRequest";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';
export const UPDATE_EP_SUCCESS = 'UPDATE_EP_SUCCESS';
export const JOIN_REQUEST_SUCCESS = 'JOIN_REQUEST_SUCCESS';
export const JOIN_REQUEST_PROCESS_SUCCESS = 'JOIN_REQUEST_PROCESS_SUCCESS';

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

export const updateEscalationPolicy = (groupName, ep) => {
  console.log(ep);
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      putJSON(`group/${groupName}/escalationpolicy`, ep).then((response) => {
        dispatch({
          type: UPDATE_EP_SUCCESS,
          payload: response
        });
        resolve();
      });
    })
  }
};

export const joinRequest = (groupName) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const userId = jwtDecode(localStorage.getItem('escalatorToken')).id;
      postJSON(`group/${groupName}/request`, {userId}).then((response) => {
        dispatch({
          type: JOIN_REQUEST_SUCCESS,
          payload: response
        });
        resolve();
      });
    })
  }
};

export const processRequest = (groupName, userId, approved) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      putJSON(`group/${groupName}/request`, {userId, isAccepted: approved}).then((response) => {
        dispatch({
          type: JOIN_REQUEST_PROCESS_SUCCESS,
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
  [FETCH_GROUP_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [LEAVE_GROUP_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [UPDATE_EP_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [JOIN_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [JOIN_REQUEST_PROCESS_SUCCESS]: (state, action) => {
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
