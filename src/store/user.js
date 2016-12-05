import 'whatwg-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUser = () => {
  return (dispatch, getState) => {
// ------------------------------------
// Reducer
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

export const deleteDevice = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/582cdb4f58afe7001d0dac5f/device/' + id, {
        method: 'DELETE'
      }).then((response) => {
        return response.text();
      }).then((text) => {
        dispatch({
          type: DELETE_DEVICE_SUCCESS,  
          payload: id
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
    const newState = _.extend({}, state);
    _.remove(newState.devices, (device) => {
      device._id === action.payload;
    });
    return newState;
  }
};

// ------------------------------------
const initialState = null;

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.warn(handler && handler(state, action));
  return handler ? handler(state, action) : state;
};
