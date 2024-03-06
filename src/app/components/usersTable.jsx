import React from 'react';
import PropTypes from 'prop-types';
import User from './user';
import TableHeader from './tableHeader';

const UserTable = ({ users, selectedSort, onSort, ...rest }) => {
  const columns = {
    name: { iter: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    professions: { iter: 'profession.name', name: 'Профессия' },
    completedMeetings: { iter: 'completedMeetings', name: 'Встретился, раз' },
    rate: { iter: 'rate', name: 'Оценка' },
    bookmark: { iter: 'bookmark', name: 'Избранное' },
    delete: {},
  };
  return (
    <table className="table">
      {/* что за конструкция {...{onSort, selectedSort, columns}} ?? */}
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <tbody>
        {users.map((user) => (
          // почему передаем ...user, а не просто user?
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
};

export default UserTable;
