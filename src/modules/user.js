// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER = 'FETCH_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUser() {
  return {
    type: FETCH_USER
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER]: (state, action) => {
    // TODO: fetch from api
    return {
      id: '8bjfjs3rjeoflknfe3i',
      name: 'Kevin Moses',
      email: 'test@example.com',
      groups: [{
        type: 'Group',
        ref: 'My awesome group'
      },
      {
        type: 'Group',
        ref: 'Another group'
      }],
      devices: [{
        name: 'Personal cell',
        type: 'sms',
        contactInformation: '545-343-4353',
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
