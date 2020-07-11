import { combineReducers, createStore } from "redux";
import { getAsyncDataReducer } from "./asyncReducer";

const stateProperty = ['Current Weather', '5 Day Forecast', 'Autocomplete', 'Geoposition'];

let allAsyncReducers = stateProperty.reduce(
  (acc, stateProperty) => {
    acc[stateProperty] = getAsyncDataReducer(stateProperty);
    return acc;
  },
  {}
);

export const store = createStore(combineReducers(allAsyncReducers));
