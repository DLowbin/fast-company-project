import React from 'react';

const Qualitie = ({ ...qual }) => {
  return <span className={'badge m-1 text-bg-' + qual.color}>{qual.name}</span>;
};

export default Qualitie;
