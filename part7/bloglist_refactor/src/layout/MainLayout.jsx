import React, { useEffect } from 'react';
import Caption from '../components/Caption';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { logOutUser, saveUser } from '../reducers/userReducer';
import LoginForm from '../components/LoginForm';
import blogService from '../services/blogService';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/loginService';

const MainLayout = () => {
  const notification = useSelector(({ notification }) => notification);
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) {
      dispatch(saveUser(JSON.parse(stringifiedUser)));
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(saveUser(user));
      blogService.setToken(user.token);
      dispatch(
        setNotification({ text: `Successfully Loged in`, error: false }),
      );
    } catch (error) {
      console.log('unable to post log in request: ', error);
      dispatch(
        setNotification({ text: `${error.response?.data.error}`, error: true }),
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logOutUser());
  };

  return (
    <div style={{ padding: '' }}>
      {user ? (
        <>
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#343A40',
              color: 'white',
              padding: '12px 14px',
            }}
          >
            <h3>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '15px',
                }}
              >
                Blogs
              </Link>
            </h3>

            <h3>
              <Link
                to="/users"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                users
              </Link>
            </h3>

            <h3 style={{}}>
              <span style={{ color: 'green' }}>{user?.name}</span>{' '}
              <span style={{ opacity: '50%' }}>logged in</span>{' '}
              <button
                style={{
                  margin: '0 8px',
                  padding: '8px 14px',
                  backgroundColor: '#007BFF',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                }}
                onClick={handleLogOut}
              >
                Log out
              </button>
            </h3>
          </header>
          <Caption message={notification} />
          <h1 style={{ padding: '10px', backgroundColor: 'lightgray' }}>
            Blog App
          </h1>
          <Outlet />
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              marginTop: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Login to application</h2>
            <Caption message={notification} />
            <LoginForm handleLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
