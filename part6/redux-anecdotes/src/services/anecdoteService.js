import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getAnecdote = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const createAnecdote = async (object) => {
  const response = await axios.post(BASE_URL, object);
  return response.data;
};

const updateAnecdote = async (id) => {
  const allAnecdotes = await getAnecdote();
  const anecdote = allAnecdotes.find((anecdote) => anecdote.id === id);
  if (anecdote) {
    const response = await axios.patch(BASE_URL + `/${id}`, {
      votes: anecdote.votes + 1,
    });
    return response.data;
  }
};

export default { getAnecdote, createAnecdote, updateAnecdote };
