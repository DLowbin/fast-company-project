import React, { useState } from 'react';
import api from './API/index';
import SearchStatus from '../app/components/searchStatus';
// import BookMark from '../app/components/bookmark';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) => {
        //почему возвращаем ...user, а не просто user?
        if (userId === user._id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookmark} />
    </div>
  );
};

export default App;
