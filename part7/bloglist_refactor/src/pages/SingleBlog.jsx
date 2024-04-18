import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import blogService from '../services/blogService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../services/userService';
import { getAllComments } from '../services/commentService';

const SingleBlog = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const [comment, setComment] = useState({});
  const user = useSelector(({ user }) => user);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getAllComments(id);
      setComment(res);
    })();
  }, []);

  const findBlog = blogs.find((blog) => blog.id === id);
  const isOwner = user?.username === findBlog?.user?.username;

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

  if (!findBlog) {
    return <div>Unable to get blog data</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', paddingBottom: '6px' }}>
        {findBlog.title} {findBlog.author}
      </h1>
      <div>
        <p>
          <a href={findBlog.url} id="blog-url">
            {findBlog?.url}
          </a>
        </p>
        <span data-testid="like-amount">{findBlog?.likes} likes </span>
        <button
          onClick={() => handleLikeBlog(findBlog?.id)}
          style={{ padding: '2px 8px' }}
        >
          like
        </button>
        <p>added by {findBlog.author}</p>
        <button
          onClick={() => handleDeleteBlog(findBlog?.id)}
          style={{
            display: isOwner ? '' : 'none',
            backgroundColor: 'red',
            borderRadius: '4px',
            border: 'none',
            padding: '4px 6px',
            marginTop: '10px',
            color: 'white',
          }}
        >
          remove
        </button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <h3>Comments</h3>
        {comment?.comments?.length > 0 ? (
          <ul style={{}}>
            {comment?.comments?.map((comment) => {
              return (
                <li key={comment} style={{ marginLeft: '20px' }}>
                  {comment}
                </li>
              );
            })}
          </ul>
        ) : (
          <div>No comments</div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
