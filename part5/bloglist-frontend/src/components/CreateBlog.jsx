import React, { forwardRef, useImperativeHandle, useState } from "react";

const CreateBlog = forwardRef(({ handleSubmitBlog }, ref) => {
  const [blogContent, setBlogContent] = useState({
    title: "",
    author: "",
    url: "",
  });

  const resetInputs = () => {
    setBlogContent({
      title: "",
      author: "",
      url: "",
    });
  };

  useImperativeHandle(ref, () => {
    return {
      resetInputs,
    };
  });

  const handleOnChangeBlogContent = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setBlogContent({ ...blogContent, [key]: value });
  };

  return (
    <form onSubmit={(e) => handleSubmitBlog(e, blogContent)}>
      <h2>create new blog</h2>
      <div>
        title
        <input
          type="text"
          name="title"
          value={blogContent.title}
          onChange={handleOnChangeBlogContent}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={blogContent.author}
          onChange={handleOnChangeBlogContent}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={blogContent.url}
          onChange={handleOnChangeBlogContent}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
});

export default CreateBlog;
