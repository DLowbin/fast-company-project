import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ onChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Найти пользователя"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={onChange}></input>
    </div>
  );
};

SearchField.propTypes = {
  onChange: PropTypes.func,
};

export default SearchField;
