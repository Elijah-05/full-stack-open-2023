import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, user, handleDeleteBlog, handleLike }) => {
  const [showDetail, setShowDetail] = useState(false);

  const isOwner = user?.username === blog.user?.username;

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div
      data-testid="blogdiv"
      style={{
        padding: '8px 10px',
        margin: '4px',
        textDecoration: 'none',
        backgroundColor: '#46B948',
      }}
    >
      <Link
        to={`/blogs/${blog.id}`}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <span data-testid="blogtitle" className="blog-title">
          {blog?.title}
        </span>{' '}
        <span className="blog-author">{blog?.author}</span>
      </Link>
    </div>
  );
};

Blog.displayName = 'Blog';
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
