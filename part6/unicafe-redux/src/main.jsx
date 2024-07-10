import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const handleOk = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const handleBad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const handleReset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
