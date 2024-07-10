const Caption = ({ message }) => {
  if (message?.text?.trim()) {
    return (
      <div
        style={{
          backgroundColor: message.error ? "lightGray" : "lightGreen",
          color: message.error ? "red" : "black",
          border: `3px solid ${message.error ? "red" : "green"}`,
          padding: "8px 5px",
          fontSize: "1.5rem",
          marginBottom: "15px",
        }}
      >
        {message.text}
      </div>
    );
  }
};

export default Caption;
