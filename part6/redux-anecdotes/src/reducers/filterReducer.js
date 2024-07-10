import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    makeFilter(state, action) {
      state = action.payload.toLowerCase();
      return state;
    },
  },
});

export const { makeFilter } = filterSlice.actions;
export default filterSlice.reducer;
