import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

let timeout;
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecedote = async (e) => {
    clearTimeout(timeout);
    e.preventDefault();
    const value = e.target.anecedote.value;
    e.target.anecedote.value = "";
    dispatch(newAnecdote(value));
    dispatch(setNotification("New anecdote note is created!", 5));
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
