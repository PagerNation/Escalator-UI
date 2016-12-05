import 'whatwg-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUser = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/582cdb4f58afe7001d0dac5f/').then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: json
        });
        resolve();
      });
    })
  }
};

export const addDevice = (device) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/582cdb4f58afe7001d0dac5f/device', {
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [ADD_DEVICE_SUCCESS]: (state, action) => {
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
