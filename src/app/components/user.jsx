import React from 'react';
import BookMark from './common/bookmark';
import Qualitie from './ui/qualities/qualitie';
import PropTypes from 'prop-types';

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Qualitie key={qual._id} {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
        {/* Почему onToggleBookmark через callback?+ */}
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  qualities: PropTypes.array,
  profession: PropTypes.object,
  completedMeetings: PropTypes.number,
  rate: PropTypes.number,
  onDelete: PropTypes.func,
  bookmark: PropTypes.bool,
  onToggleBookMark: PropTypes.func,
  length: PropTypes.number,
};

export default User;
