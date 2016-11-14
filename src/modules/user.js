// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER = 'FETCH_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUser() {
  return {
    type: FETCH_USER,
    payload: value
  }
}

export const actions = {
  fetchUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER]: (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {

};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
