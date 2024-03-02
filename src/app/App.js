import React, { useEffect, useState } from 'react';
import api from './API/index';
import API from './API/index2';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) => {
        // почему возвращаем ...user, а не просто user?
        if (userId === user._id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );
  };

  return (
    users && (
      <div>
        <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookmark} />
      </div>
    )
  );
};

export default App;
