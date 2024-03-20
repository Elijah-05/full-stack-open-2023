import { useDispatch, useSelector } from "react-redux";
import { makeVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ notes, filter }) => {
    if (!filter.trim()) return notes;
    else
      return notes.filter((note) =>
        note.content.includes(filter.toLowerCase())
      );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(makeVote(id));
  };

  console.log("first");

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
