import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      // почему ...selectedSort?
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };
  return (
    // как исправить такое форматирование от prettier?
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            onClick={
              columns[column].path
                ? () => {
                    handleSort(columns[column].path);
                  }
                : undefined
            }
            // что за конструкция {...{ role: columns[column].path && 'button' }} ??
            {...{ role: columns[column].path && 'button' }}
            scope="col"
            key={column}>
            {columns[column].name}
          </th>
        ))}
        {/* <th
          onClick={() => {
            handleSort('name');
          }}
          scope="col">
          Имя
        </th>
        <th scope="col">Качества</th>
        <th
          onClick={() => {
            handleSort('profession.name');
          }}
          scope="col">
          Профессия
        </th>
        <th
          onClick={() => {
            handleSort('completedMeetings');
          }}
          scope="col">
          Встретился, раз
        </th>
        <th
          onClick={() => {
            handleSort('rate');
          }}
          scope="col">
          Оценка
        </th>
        <th
          onClick={() => {
            handleSort('bookmark');
          }}
          scope="col">
          Избранное
        </th>
        <th scope="col"></th> */}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
