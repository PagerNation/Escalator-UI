import 'whatwg-fetch';
import _ from 'lodash';
import { getJSON } from "../utils/apiRequest";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchGroupTickets = (searchFields) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {

      const params = _.map(searchFields, (v, k) =>
        encodeURIComponent(k) + '=' + encodeURIComponent(v)
      ).join('&');

      getJSON(`ticket/all?${params}`).then((response) =>{
        dispatch({
          type: FETCH_TICKETS_SUCCESS,
          payload: response
        });
        resolve();
      })
    })
  }
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TICKETS_SUCCESS]: (state, action) => {
    return action.payload;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
