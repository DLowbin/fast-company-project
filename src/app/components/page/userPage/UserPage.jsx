import React, { useState, useEffect } from 'react';
import API from '../../../API';
import PropTypes from 'prop-types';
import Qualities from '../../ui/qualities';
import { useHistory } from 'react-router-dom';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleEdit = () => {
    history.push(history.location.pathname + '/edit');
  };
  if (user) {
    return (
      <div className="card" style={{ width: 30 + 'em', margin: 40 + 'px', padding: 25 + 'px' }}>
        <h1 className="card-title">{user.name}</h1>
        <h2>{user.profession.name}</h2>
        <span>
          <Qualities qualities={user.qualities} />
        </span>
        <p>{`Completed meetings :${user.completedMeetings}`}</p>
        <h2>{`Rate :${user.rate}`}</h2>
        <button className="btn btn-primary" onClick={handleEdit}>
          Редактировать данные
        </button>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string,
  history: PropTypes.object,
};

export default UserPage;
