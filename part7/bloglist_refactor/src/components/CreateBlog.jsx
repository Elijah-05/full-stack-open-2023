import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlog = forwardRef(({ handleSubmitBlog }, ref) => {
  const [blogContent, setBlogContent] = useState({
    title: '',
    author: '',
    url: '',
  });

  const resetInputs = () => {
    setBlogContent({
      title: '',
      author: '',
      url: '',
    });
  };

  useImperativeHandle(ref, () => {
    return {
      resetInputs,
    };
  });

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmitBlog(blogContent);
  };

  const handleOnChangeBlogContent = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setBlogContent({ ...blogContent, [key]: value });
  };

  return (
    <form onSubmit={submitForm}>
      <h2>Create new blog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 450px' }}>
        Title
        <input
          type="text"
          name="title"
          value={blogContent.title}
          onChange={handleOnChangeBlogContent}
          style={{
            padding: '3px 2px',
            margin: '2px 4px',
            borderRadius: '3px',
            border: 'none',
          }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 450px' }}>
        Author
        <input
          type="text"
          name="author"
          value={blogContent.author}
          onChange={handleOnChangeBlogContent}
          style={{
            padding: '3px 2px',
            margin: '2px 4px',
            borderRadius: '3px',
            border: 'none',
          }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 450px' }}>
        URL
        <input
          type="text"
          name="url"
          value={blogContent.url}
          onChange={handleOnChangeBlogContent}
          style={{
            padding: '3px 2px',
            margin: '2px 4px',
            borderRadius: '3px',
            border: 'none',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'green',
          color: 'white',
          padding: '6px 28px',
          margin: '10px 0',
          width: '100%',
          maxWidth: '180px',
        }}
      >
        Create
      </button>
    </form>
  );
});

CreateBlog.displayName = 'CreateBlog';
CreateBlog.propTypes = {
  handleSubmitBlog: PropTypes.func.isRequired,
};

export default CreateBlog;
