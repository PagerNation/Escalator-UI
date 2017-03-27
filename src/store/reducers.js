import {combineReducers} from "redux";
import locationReducer from "./location";
import userReducer from './user';
import groupReducer from './group';
import api from './api';
import groupSearch from './groupSearch';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    group: groupReducer,
    api,
    groupSearch,
    ...asyncReducers
  })
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
