import React from 'react';
import PropTypes from 'prop-types';
import User from '../user';
import Table from '../common/table';
import BookMark from '../common/bookmark';
import Qualities from './qualities';
import { Link } from 'react-router-dom';

const UserTable = ({ users, selectedSort, onSort, onToggleBookMark, onDelete, ...rest }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
      ),
    },
    delete: {
      // Обрати внимание: оборачиваем в КРУГЛЫЕ скобки (метод)
      component: (user) => (
        <button type="button" className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      ),
    },
  };
  return (
    <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
    /* что за конструкция {...{onSort, selectedSort, columns}} ?? */
    // <TableHeader {...{ onSort, selectedSort, columns }} />
    // <TableBody {...{ columns, data: users }} />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;
