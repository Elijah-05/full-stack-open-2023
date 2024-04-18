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
    <div style={{ padding: '10px' }}>
      {user ? (
        <>
          <header style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3>
              <Link to="/" style={{ marginBottom: '10px' }}>
                blogs
              </Link>
            </h3>
            <h3>
              <Link to="/users" style={{ marginBottom: '10px' }}>
                users
              </Link>
            </h3>

            <h3 style={{ margin: '10px 0' }}>
              {user?.name} logged in{' '}
              <button onClick={handleLogOut}>Log out</button>
            </h3>
          </header>
          <Caption message={notification} />
          <h1 style={{ marginBottom: '10px' }}>Blog App</h1>
          <Outlet />
        </>
      ) : (
        <div>
          <h2 style={{ marginBottom: '10px' }}>Login to application</h2>
          <Caption message={notification} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
