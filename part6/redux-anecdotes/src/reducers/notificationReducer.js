import { createSlice } from "@reduxjs/toolkit";

let timer;

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification: (state, action) => {
      state.message = action.payload;
    },
    resetNotification: (state) => {
      state.message = "";
    },
  },
});

export const setNotification = (content, duration) => {
  clearTimeout(timer);
  return async (dispatch) => {
    dispatch(newNotification(content));
    timer = setTimeout(() => dispatch(resetNotification()), duration * 1000);
  };
};

export const { newNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
