import { useSelector } from "react-redux";

const Notification = () => {
  const notificationMessage = useSelector(
    ({ notification: { message } }) => message
  );

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  if (notificationMessage) {
    return <div style={style}>{notificationMessage}</div>;
  }

  return <></>;
};

export default Notification;
