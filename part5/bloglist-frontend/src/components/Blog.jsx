import { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog, user, handleDeleteBlog }) => {
  const [blogData, setBlogData] = useState(blog);
  const [showDetail, setShowDetail] = useState(false);

  const isOwner = user.username === blog.user.username;

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleLike = async () => {
    console.log("blogData: ", user?.id);
    const updatedBlog = {
      ...blogData,
      likes: blogData.likes + 1,
      user: blogData.user.id,
    };
    // console.log("updatedBlog: ", updatedBlog);
    try {
      const response = await blogService.updateBlog(updatedBlog);
      setBlogData({ ...blogData, likes: response.likes });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div style={{ border: "2px solid black", padding: "4px", margin: "4px" }}>
      <div>
        {blogData?.title} {blogData?.author}
        <button onClick={toggleShowDetail}>
          {showDetail ? "hide" : "view"}
        </button>
      </div>
      {showDetail && (
        <div>
          <p>{blogData.url}</p>
          <span>likes {blogData.likes} </span>
          <button onClick={handleLike}>like</button>
          <p>{blogData.user.username}</p>
          <button
            onClick={() => handleDeleteBlog(blog.id)}
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

export default Blog;
