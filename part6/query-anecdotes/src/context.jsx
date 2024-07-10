import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const actionTypes = {
  VOTE: "VOTE",
  CREATE: "CREATE",
  RESET: "RESET",
};

let timer;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.VOTE:
      return `anecdote ${action.payload} voted`;
    case actionTypes.CREATE:
      return action.payload;
    case actionTypes.RESET:
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const voteNotification = (message) => {
    clearTimeout(timer);
    notificationDispatch({ type: actionTypes.VOTE, payload: message });
    timer = setTimeout(
      () => notificationDispatch({ type: actionTypes.RESET }),
      5000
    );
    return () => clearTimeout(timer);
  };

  const createAnecdoteNotification = (message) => {
    clearTimeout(timer);
    notificationDispatch({ type: actionTypes.CREATE, payload: message });
    timer = setTimeout(
      () => notificationDispatch({ type: actionTypes.RESET }),
      5000
    );
    return () => clearTimeout(timer);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, voteNotification, createAnecdoteNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default NotificationContext;
