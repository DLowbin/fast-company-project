import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select ' + (error ? 'is-invalid' : '');
  };
  let optionsArray;
  if (options) {
    optionsArray =
      !Array.isArray(options) && typeof (options === 'object')
        ? Object.keys(options).map((optionName) => ({
            name: options[optionName].name,
            value: options[optionName]._id,
          }))
        : options;
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        value={value}
        id={name}
        name="profession"
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
};

export default SelectField;
