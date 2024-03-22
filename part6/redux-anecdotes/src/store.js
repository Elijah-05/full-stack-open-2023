import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./reducers/anecdoteReducer";
import filterSlice from "./reducers/filterReducer";
import notificationSlice from "./reducers/notificationReducer";

const reducer = configureStore({
  reducer: {
    notes: anecdoteSlice,
    filter: filterSlice,
    notification: notificationSlice,
  },
});

const store = reducer;

export default store;
