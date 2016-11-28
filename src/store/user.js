import 'whatwg-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUser = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch(config.api_url + 'user/582cdb4f58afe7001d0dac5f/').then((response) =>{
        return response.json();
      }).then((json) => {
        dispatch(fetchUserSuccess(json));
        resolve();
      });
    })
  }
};

export function fetchUserSuccess(json) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: json
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_SUCCESS]: (state, action) => {
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
