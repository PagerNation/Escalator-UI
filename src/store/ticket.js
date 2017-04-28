import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON, postJSON } from "../utils/apiRequest";
import querystring from 'querystring';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_OPEN_TICKETS_SUCCESS = 'FETCH_OPEN_TICKETS_SUCCESS';
export const FETCH_RECENT_TICKETS_SUCCESS = 'FETCH_RECENT_TICKETS_SUCCESS';
export const ACKNOWLEDGE_TICKET_SUCCESS = 'ACKNOWLEDGE_TICKET_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchGroupTickets = (searchFields) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const params = querystring.stringify(searchFields);

      getJSON(`ticket/all?${params}`).then((response) => {
        dispatch({
          type: FETCH_TICKETS_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const fetchOpenGroupTickets = (searchFields) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      searchFields.isOpen = true;
      const params = querystring.stringify(searchFields);

      getJSON(`ticket/all?${params}`).then((response) => {
        dispatch({
          type: FETCH_OPEN_TICKETS_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const fetchRecentGroupsTickets = (groups) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const params = querystring.stringify({ groups });

      getJSON(`ticket/recent?${params}`).then((response) => {
        dispatch({
          type: FETCH_RECENT_TICKETS_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
};

export const acknowledgeTicket = (ticketId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      postJSON(`ticket/${ticketId}`, {}).then((response) => {
        dispatch({
          type: ACKNOWLEDGE_TICKET_SUCCESS,
          payload: response
        });
        resolve();
      });
    });
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TICKETS_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state, { tickets: action.payload });
    return newState;
  },
  [FETCH_OPEN_TICKETS_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state, { openTickets: action.payload });
    return newState;
  },
  [FETCH_RECENT_TICKETS_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state, { tickets: action.payload });
    return newState;
  },
  [ACKNOWLEDGE_TICKET_SUCCESS]: (state, action) => {
    const newState = _.extend({}, state);
    const openTickets = [...state.openTickets];
    _.remove(openTickets, { _id: action.payload._id });
    newState.openTickets = openTickets;
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tickets: [],
  openTickets: []
};

export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
