import React, { useState } from 'react';
import User from './user';
import Pagination from './pagination';
import PropTypes from 'prop-types';

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    // зачем spred (...items)
    return [...items].splice(startIndex, pageSize);
  };
  const userCrop = paginate(users, currentPage, pageSize);
  return (
    count > 0 && (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              // почему передаем ...user, а не просто user?
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </>
    )
  );
};

Users.propTypes = {
  users: PropTypes.array,
  length: PropTypes.number,
};

export default Users;
