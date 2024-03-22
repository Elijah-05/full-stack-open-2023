import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  resetNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecedote = (e) => {
    e.preventDefault();
    const value = e.target.anecedote.value;
    e.target.anecedote.value = "";
    dispatch(createAnecdote(value));
    dispatch(newNotification("New anecdote note is created!"));
    setTimeout(() => dispatch(resetNotification()), 5000);
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
