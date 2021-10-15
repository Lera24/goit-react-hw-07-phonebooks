import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./contacts-action";
import { contactsApi } from "./contacts-fetch";

const reducerFilter = createReducer("", {
  [actions.filterItem]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  filter: reducerFilter,
});

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

export default store;
