import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUsers } from '../services/userService';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const query = useQuery({ queryKey: ['users'], queryFn: getUsers });

  if (query.isLoading) {
    return <div>Loading users...</div>;
  }

  if (query.isFetched && query.data.length == 0) {
    return <div>No users data! try again refreshing the page!</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Users</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '150px auto' }}>
        <h3 style={{ paddingRight: '4px' }}>Names</h3>
        <h3>Blogs Created</h3>
      </div>
      {query.data.map((user) => {
        return (
          <div
            key={user.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px auto',
              margin: '8px 0',
            }}
          >
            <Link to={`${user.id}`} style={{ paddingRight: '4px' }}>
              {user.name}
            </Link>
            <h4>{user.blogs.length}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
