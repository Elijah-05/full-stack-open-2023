const Caption = ({ message }) => {
  if (message?.text?.trim()) {
    return (
      <div
        style={{
          backgroundColor: message.error ? '#FFBDC6' : 'lightGreen',
          color: message.error ? 'red' : 'black',
          padding: '8px 5px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          margin: '10px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {message.text}
      </div>
    );
  }
};

export default Caption;
