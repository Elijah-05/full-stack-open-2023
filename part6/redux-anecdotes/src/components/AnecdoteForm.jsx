import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdoteService";

let timeout;
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecedote = async (e) => {
    clearTimeout(timeout);
    e.preventDefault();
    const value = e.target.anecedote.value;
    e.target.anecedote.value = "";
    const anecdote = await anecdoteService.createAnecdote({
      content: value,
      votes: 0,
    });
    dispatch(newAnecdote(anecdote));
    dispatch(newNotification("New anecdote note is created!"));
    timeout = setTimeout(() => dispatch(resetNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecedote}>
        <div>
          <input name="anecedote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
