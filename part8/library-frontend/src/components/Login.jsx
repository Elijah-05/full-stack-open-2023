import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { LOG_IN } from "../queries/queries";

const Login = ({ show, setCaption, setToken, setPage }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      setCaption({ message: error?.graphQLErrors[0].message, error: true });
    },
  });

  useEffect(() => {
    if (show && result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      setPage("authors");
      setCredentials({
        name: "",
        password: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  function handleInputChange(e) {
    const { value, name } = e;
    setCredentials((prevVal) => ({ ...prevVal, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    login({
      variables: { username: credentials.name, password: credentials.password },
    });
  }

  if (!show) {
    return null;
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={({ target }) => handleInputChange(target)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={({ target }) => handleInputChange(target)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.displayName = "Login";
Login.propTypes = {
  show: PropTypes.bool,
  setCaption: PropTypes.func,
  setToken: PropTypes.func,
  setPage: PropTypes.func,
};

export default Login;
