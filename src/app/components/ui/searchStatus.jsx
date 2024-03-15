import React from 'react';
import PropTypes from 'prop-types';

// Почему деструктурируем length ?

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number === 1 || number >= 5) {
      return ' человек тусанет с тобой';
    } else {
      return ' человека тусанут с тобой';
    }
  };
  return (
    <h1>
      <span className={'badge text-bg-' + (length !== 0 ? 'primary' : 'danger')}>
        {length !== 0 ? length + renderPhrase(length) : 'Никто не тусанет с тобой'}
      </span>
    </h1>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number,
};

export default SearchStatus;
