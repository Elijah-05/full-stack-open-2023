import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Caption from './components/Caption';
import CreateBlog from './components/CreateBlog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import {
  createNewBlog,
  deleteBlog,
  initializeBlog,
  likeBlog,
} from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogService';
import loginService from './services/loginService';
import { logOutUser, saveUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector(({ notification }) => notification);
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);
  const createRef = useRef(null);
  const clearFieldRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedBlogs = await blogService.getAllBlogs();
      dispatch(initializeBlog(fetchedBlogs));
    }

    fetchData();
  }, []);

  useEffect(() => {
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) {
      // setUser(JSON.parse(stringifiedUser));
      dispatch(saveUser(stringifiedUser));
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
      dispatch(
        setNotification({ text: `${error.response.data.error}`, error: true }),
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logOutUser());
  };

  const handleSubmitBlog = async (blogContent) => {
    try {
      const response = await blogService.createBlog(blogContent);
      const updatedBlog = {
        ...response,
        user,
      };
      delete updatedBlog.user.token;
      dispatch(createNewBlog(updatedBlog));
      dispatch(
        setNotification({
          error: false,
          text: `a new blog ${response.title} by ${response.author}`,
        }),
      );
      createRef.current.toggleShowContent();
      clearFieldRef.current.resetInputs();
    } catch (error) {
      console.log('unable to create a new blog', error);
      dispatch(
        setNotification({ text: `${error.response.data.error}`, error: true }),
      );
    } finally {
      // handleClearCaption();
    }
  };

  const handleDeleteBlog = async (blog_id) => {
    try {
      const res = await blogService.deleteBlog(blog_id);
      console.log('res: : ', res);
      dispatch(deleteBlog(blog_id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeBlog = async (id) => {
    const targetedBlog = blogs.find((blog) => blog.id === id);
    const updatedBlog = {
      ...targetedBlog,
      likes: targetedBlog.likes + 1,
      user: targetedBlog.user?.id,
    };
    try {
      const response = await blogService.updateBlog(updatedBlog);
      console.log('like response: ', response);
      dispatch(likeBlog(response));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Caption message={notification} />
          <h4>
            {user?.name} logged in{' '}
            <button onClick={handleLogOut}>Log out</button>
          </h4>
          <Togglable buttonLabel={'Create new blog'} ref={createRef}>
            <CreateBlog
              handleSubmitBlog={handleSubmitBlog}
              ref={clearFieldRef}
            />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog?.id}
              blog={blog}
              user={user}
              handleDeleteBlog={handleDeleteBlog}
              handleLike={handleLikeBlog}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>Login to application</h2>
          <Caption message={notification} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
