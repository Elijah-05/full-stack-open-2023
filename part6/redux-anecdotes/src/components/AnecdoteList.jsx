import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ notes, filter }) => {
    if (!filter.trim()) return notes;
    else
      return notes.filter((note) =>
        note.content.toLowerCase().includes(filter)
      );
  });
  const dispatch = useDispatch();

  const vote = async (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `You voted "${anecdotes.find((ane) => ane.id === id).content}"`,
        5
      )
    );
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
