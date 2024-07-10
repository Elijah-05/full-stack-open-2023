import { useState } from "react";

const Button = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

const MostVote = ({ vote, anecdote }) => {
  const maxVoteValue = Math.max(...vote);
  console.log("MaxVoteValue:", maxVoteValue);
  return (
    <>
      <p>{anecdote[vote.indexOf(maxVoteValue)]}</p>
      <p>has {maxVoteValue} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);

  console.log("Selected:", selected);
  console.log("Vote:", vote);

  const handleVote = () => {
    const updatedVote = [...vote];
    updatedVote[selected] += 1;
    setVote(updatedVote);
    console.log("Vote:", vote);
  };

  const handleRandomAnecdote = () => {
    const randomNum = Math.floor(Math.random() * 8);
    console.log("Random:", randomNum);
    setSelected(randomNum);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button label={"vote"} onClick={handleVote} />
      <Button label={"next anecdote"} onClick={handleRandomAnecdote} />
      <h2>Anecdote with most vote</h2>
      <MostVote vote={vote} anecdote={anecdotes} />
    </div>
  );
};

export default App;
