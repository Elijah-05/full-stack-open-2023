import PropTypes from "prop-types";

const Caution = ({ caption }) => {
  if (!caption?.message) {
    return null;
  }
  return (
    <div
      style={{
        color: "white",
        borderRadius: "10px",
        padding: "12px 18px",
        marginTop: "20px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: caption?.error ? "rgba(200,0,20)" : "green",
      }}
    >
      {caption?.message}
    </div>
  );
};

Caution.displayName = "Caution";
Caution.propTypes = {
  caption: PropTypes.object,
};

export default Caution;
