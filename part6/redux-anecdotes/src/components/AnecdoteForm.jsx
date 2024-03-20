import { useDispatch } from "react-redux";
import { createAnecedote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecedote = (e) => {
    e.preventDefault();
    const value = e.target.anecedote.value;
    e.target.anecedote.value = "";
    dispatch(createAnecedote(value));
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
