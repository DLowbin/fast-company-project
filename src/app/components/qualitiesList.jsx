import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './qualitie';

// если передать просто qualities, то возникает ошибка qualities.map is not a func. Почему?

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qual) => (
        <Qualitie key={qual._id} {...qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
