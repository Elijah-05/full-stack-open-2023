import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = null;
      return state;
    },
  },
});

export const saveUser = (user) => {
  return async (dispatch) => {
    await dispatch(userReducer.actions.newUser(user));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    await dispatch(userReducer.actions.removeUser());
  };
};

export default userReducer.reducer;
