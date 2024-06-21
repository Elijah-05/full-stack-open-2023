import PropTypes from "prop-types";

const Caution = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red", border: '2px solid red', padding: '6px', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>{errorMessage}</div>;
};

Caution.displayName = "Caution";
Caution.propTypes = {
  errorMessage: PropTypes.string,
};

export default Caution;
