import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [credentials, setCredential] = useState({ username: "", password: "" });

  const handleChangeInput = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setCredential({ ...credentials, [target]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        password
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChangeInput}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
