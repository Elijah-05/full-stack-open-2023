import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Caption from "./components/Caption";
import loginService from "./services/loginService";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [caption, setCaption] = useState({});
  const [user, setUser] = useState(null);
  const createRef = useRef(null);
  const clearFieldRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAllBlogs();
      setBlogs(blogs);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const stringifiedUser = localStorage.getItem("user");
    if (stringifiedUser) {
      setUser(JSON.parse(stringifiedUser));
    }
  }, []);

  console.log("blogs: ", blogs);

  const handleLogin = async (credentials) => {
    handleClearCaption();
    try {
      const user = await loginService.login(credentials);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("user:##", user);
      setUser(user);
      blogService.setToken(user.token);
    } catch (error) {
      setCaption({ text: `${error.response.data.error}`, error: true });
    } finally {
      handleClearCaption();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSubmitBlog = async (blogContent) => {
    try {
      const response = await blogService.createBlog(blogContent);
      console.log("response", response);
      const updatedBlog = {
        ...response,
        user,
      };
      delete updatedBlog.user.token;
      setBlogs(blogs.concat(updatedBlog));
      setCaption({
        text: `a new blog ${response.title} by ${response.author}`,
      });
      createRef.current.toggleShowContent();
      clearFieldRef.current.resetInputs();
    } catch (error) {
      console.log("first", error);
      setCaption({ text: `${error.response.data.error}`, error: true });
    } finally {
      handleClearCaption();
    }
  };

  const handleDeleteBlog = async (blog_id) => {
    try {
      blogService.deleteBlog(blog_id);
      const filtered = blogs.filter((blog) => blog.id !== blog_id);
      setBlogs(filtered);
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
      console.log("like response: ", response);
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: response.likes } : blog
        )
      );
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleClearCaption = () => {
    setTimeout(() => setCaption(null), 4000);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          <Caption message={caption} />
          <h4>
            {user?.name} logged in{" "}
            <button onClick={handleLogOut}>Log out</button>
          </h4>
          <Togglable buttonLabel={"Create new blog"} ref={createRef}>
            <CreateBlog
              handleSubmitBlog={handleSubmitBlog}
              ref={clearFieldRef}
            />
          </Togglable>
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
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
          <Caption message={caption} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
