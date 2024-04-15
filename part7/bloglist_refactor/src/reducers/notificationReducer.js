import { createSlice } from '@reduxjs/toolkit';

let timer;

const initialState = {
  error: false,
  text: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification: (state, action) => {
      state = action.payload;
      return state;
    },
    resetNotification: () => {
      return initialState;
    },
  },
});

export const setNotification = (content) => {
  clearTimeout(timer);
  return async (dispatch) => {
    dispatch(newNotification(content));
    timer = setTimeout(() => dispatch(resetNotification()), 4000);
  };
};

export const { newNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
