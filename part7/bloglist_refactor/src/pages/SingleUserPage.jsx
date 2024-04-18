import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

const SingleUserPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const user = queryClient
    .getQueryData(['users'])
    ?.find((user) => user.id == id);

  if (!user) {
    return <div>something went wrong. go back!</div>;
  }
  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ marginBottom: '10px', color: 'blue' }}>{user.name}</h1>
      <h2>Added Blogs</h2>
      {user?.blogs?.length > 0 ? (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {user.blogs.map((blog) => {
            return (
              <li
                key={blog.id}
                style={{
                  marginLeft: '20px',
                  backgroundColor: '#8C5EA1',
                  padding: '4px',
                }}
              >
                {blog.title}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No Blog is created!</div>
      )}
    </div>
  );
};

export default SingleUserPage;
