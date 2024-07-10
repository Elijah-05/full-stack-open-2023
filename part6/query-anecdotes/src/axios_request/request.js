import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getAnecdote = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const createAnecdote = async (content) => {
  const response = await axios.post(BASE_URL, { content, votes: 0 });
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  const response = await axios.patch(BASE_URL + `/${anecdote.id}`, {
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export { getAnecdote, createAnecdote, voteAnecdote };
