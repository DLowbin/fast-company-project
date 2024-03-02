import React, { useState, useEffect } from 'react';
import User from './user';
import Pagination from './pagination';
import PropTypes from 'prop-types';
// import API from '../API/index';
import API from '../API/index2';
import GroupList from './groupList';
import SearchStatus from './searchStatus';

const Users = ({ users, ...rest }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    // зачем spred (...items)
    return [...items].splice(startIndex, pageSize);
  };
  const filteredUsers = selectedProf
    ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : users;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            {''}
            Очистить
          </button>
        </div>
      )}
      <div className="d-fle flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
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
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  length: PropTypes.number,
};

export default Users;
