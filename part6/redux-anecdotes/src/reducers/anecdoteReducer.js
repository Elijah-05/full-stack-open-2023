import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    makeVote(state, action) {
      const toBeVoted = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      const votedAnecdote = {
        ...toBeVoted,
        votes: toBeVoted.votes + 1,
      };
      return state
        .map((anecdote) =>
          anecdote.id === action.payload ? votedAnecdote : anecdote
        )
        .sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload));
    },
  },
});

export const { makeVote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// const anecedoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);
//   switch (action.type) {
//     case "VOTE":
//       return state
//         .slice(0)
//         .map((ancedote) =>
//           ancedote.id === action.payload.id
//             ? { ...ancedote, votes: ancedote.votes + 1 }
//             : ancedote
//         )
//         .sort((a, b) => b.votes - a.votes);
//     case "CREATE":
//       return state.concat(asObject(action.payload.content));
//     default:
//       return state;
//   }
// };

// export const makeVote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

// export const createAnecedote = (content) => {
//   return {
//     type: "CREATE",
//     payload: { content },
//   };
// };

// export default anecedoteReducer;
