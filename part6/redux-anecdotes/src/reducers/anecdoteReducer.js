import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const decendingSorter = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
  name: "note",
  initialState: [],
  reducers: {
    makeVote(state, action) {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote
        )
        .sort(decendingSorter);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote: (state, action) => {
      return action.payload.sort(decendingSorter);
    },
  },
});

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAnecdote();
    dispatch(setAnecdote(notes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote({
      content,
      votes: 0,
    });
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const voteRes = await anecdoteService.updateAnecdote(id);
    dispatch(makeVote(voteRes));
  };
};

export const { makeVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
