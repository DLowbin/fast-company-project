import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import PropTypes from 'prop-types';
// import API from '../API/index';
import API from '../API';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UserTable from './usersTable';
import _ from 'lodash';

const Users = ({ users, ...rest }) => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
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
  const handleSort = (item) => {
    setSortBy(item);
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

  // Почему сортировка работает, если в sortBy не path а iter

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
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
          <UserTable users={userCrop} {...rest} onSort={handleSort} selectedSort={sortBy} />
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
