import { createSlice } from "@reduxjs/toolkit";

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
    resetNotification: () => {
      return { message: "" };
    },
  },
});

export const { newNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
