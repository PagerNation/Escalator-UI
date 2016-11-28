import { injectReducer } from '../store/reducers';

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
  [FETCH_USER]: (state, action) => {
    // TODO: Use endpoint
    return {
      id: '693d9a0698aff95c',
      name: 'Kevin Moses',
      email: 'kwm4385@rit.edu',
      groups: [{
        type: "Group",
        ref: 'Some group'
      },
        {
          type: "Group",
          ref: 'Awesome Group'
        }],
      devices: [{
        name: 'Cell',
        type: 'sms',
        contactInformation: '585-328-5354',
        createdAt: Date.now()
      }]
    };
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

injectReducer(store, {
  key: 'user',
  reducer: userReducer
});
