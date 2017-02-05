import {combineReducers} from "redux";
import locationReducer from "./location";
import userReducer from './user';
import groupReducer from './group';
import otherUsersReducer from './other_users';
import api from './api';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    group: groupReducer,
    otherUsers: otherUsersReducer,
    api: api,
    ...asyncReducers
  })
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer
