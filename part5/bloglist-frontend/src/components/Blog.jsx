import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, user, handleDeleteBlog, handleLike }) => {
  const [showDetail, setShowDetail] = useState(false);

  const isOwner = user?.username === blog.user?.username;

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div
      data-testid="blogdiv"
      style={{ border: "2px solid black", padding: "4px", margin: "4px" }}
    >
      <div>
        <span data-testid="blogtitle" className="blog-title">
          {blog?.title}
        </span>{" "}
        <span className="blog-author">{blog?.author}</span>
        <button data-testid="viewbtn" onClick={toggleShowDetail}>
          {showDetail ? "hide" : "view"}
        </button>
      </div>
      {showDetail && (
        <div>
          <p id="blog-url">{blog?.url}</p>
          <span data-testid="like-amount">likes {blog?.likes} </span>
          <button onClick={() => handleLike(blog?.id)}>like</button>
          <p>{blog.author}</p>
          <button
            onClick={() => handleDeleteBlog(blog?.id)}
            style={{
              display: isOwner ? "" : "none",
              backgroundColor: "red",
              borderRadius: "4px",
              border: "none",
              padding: "6px 10px",
              color: "white",
            }}
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
};

Blog.displayName = "Blog";
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
