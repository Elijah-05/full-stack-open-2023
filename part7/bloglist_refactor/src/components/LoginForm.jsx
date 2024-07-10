import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [credentials, setCredential] = useState({ username: '', password: '' });

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
    <div style={{ display: 'flex', alignItems: 'center', padding: '25px' }}>
      <form
        style={{ margin: '10px 0', minWidth: '300px' }}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChangeInput}
            style={{
              padding: '6px 2px',
              margin: '4px 4px',
              borderRadius: '3px',
              border: 'none',
              width: '100%',
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChangeInput}
            style={{
              padding: '6px 2px',
              margin: '4px 4px',
              borderRadius: '3px',
              border: 'none',
              width: '100%',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#3688C9',
            color: 'white',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
