import { useSelector } from "react-redux";

const Notification = () => {
  const anecdotes = useSelector(({ notes }) => notes);
  const notificationMessage = useSelector(
    ({ notification: { message } }) => message
  );

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (!notificationMessage || anecdotes.length === 0) return <></>;

  return <div style={style}>{notificationMessage}</div>;
};

export default Notification;
