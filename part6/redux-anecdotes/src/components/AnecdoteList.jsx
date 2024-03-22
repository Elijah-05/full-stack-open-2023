import { useDispatch, useSelector } from "react-redux";
import { makeVote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  resetNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ notes, filter }) => {
    if (!filter.trim()) return notes;
    else
      return notes.filter((note) =>
        note.content.toLowerCase().includes(filter)
      );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const findNote = anecdotes.find((anecdote) => anecdote.id === id).content;
    dispatch(makeVote(id));

    dispatch(newNotification(`You voted "${findNote}"`));
    setTimeout(() => dispatch(resetNotification()), 5000);
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
