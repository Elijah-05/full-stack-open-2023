import { useState } from "react";

const Button = ({ label, handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      {label}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? ((good - bad) / total).toFixed(2) : 0;
  const positive = total ? ((good / total) * 100).toFixed(2) : 0;
  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={total} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleVoteGood = () => {
    setGood(good + 1);
  };

  const handleVoteNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleVoteBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label="Good" handleClick={handleVoteGood} />
      <Button label={"Neutral"} handleClick={handleVoteNeutral} />
      <Button label={"bad"} handleClick={handleVoteBad} />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
