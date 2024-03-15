import React, { useState, useEffect } from 'react';
import Pagination from '../../common/pagination';
import PropTypes from 'prop-types';
import API from '../../../API';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import _ from 'lodash';
import SearchField from '../../SearchField';

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

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
        if (userId === user._id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );
  };

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') {
      setSearchQuery('');
    }
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleSearch = (event) => {
    const { target } = event;
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  if (users) {
    const paginate = (items, pageNumber, pageSize) => {
      const startIndex = (pageNumber - 1) * pageSize;
      return [...items].splice(startIndex, pageSize);
    };
    const filteredUsers = searchQuery
      ? users.filter((item) =>
          item.name.toLocaleLowerCase().trim().includes(searchQuery.toLocaleLowerCase())
        )
      : selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;
    const count = filteredUsers.length;
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
              Очистить
            </button>
          </div>
        )}
        <div className="d-fle flex-column">
          <SearchStatus length={count} />
          <SearchField onChange={handleSearch} />
          {count > 0 && (
            <>
              <UserTable
                users={userCrop}
                onSort={handleSort}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookmark}
                selectedSort={sortBy}
              />
            </>
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
  }
  return 'Loading...';
};

UsersListPage.propTypes = {
  users: PropTypes.array,
  length: PropTypes.number,
};

export default UsersListPage;
