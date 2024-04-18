import React, { useEffect, useRef } from 'react';
import Caption from '../components/Caption';
import Togglable from '../components/Togglable';
import CreateBlog from '../components/CreateBlog';
import Blog from '../components/Blog';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewBlog,
  deleteBlog,
  initializeBlog,
  likeBlog,
} from '../reducers/blogReducer';
import { logOutUser, saveUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogService';

const LandingPage = () => {
  const notification = useSelector(({ notification }) => notification);
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const createRef = useRef(null);
  const clearFieldRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedBlogs = await blogService.getAllBlogs();
      dispatch(initializeBlog(fetchedBlogs));
    }

    fetchData();
  }, []);

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
      dispatch(likeBlog(response));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
      <Togglable buttonLabel={'Create new blog'} ref={createRef}>
        <CreateBlog handleSubmitBlog={handleSubmitBlog} ref={clearFieldRef} />
      </Togglable>
      <br />
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            key={blog?.id}
            blog={blog}
            user={user}
            handleDeleteBlog={handleDeleteBlog}
            handleLike={handleLikeBlog}
          />
        ))
      ) : (
        <div> No Blog Data! Try Refreshing...</div>
      )}
    </div>
  );
};

export default LandingPage;
