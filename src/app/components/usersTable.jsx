import React from 'react';
import PropTypes from 'prop-types';
import User from './user';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';

const UserTable = ({ users, selectedSort, onSort, onToggleBookMark, onDelete, ...rest }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
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
      // Обрати внимание: оборачиваем в КРУГЛЫЕ скобки
      component: (user) => (
        <button type="button" className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      ),
    },
  };
  return (
    <table className="table">
      {/* что за конструкция {...{onSort, selectedSort, columns}} ?? */}
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
      {/* <tbody>
        {users.map((user) => (
          // почему передаем ...user, а не просто user?
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody> */}
    </table>
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
