import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import CheckBoxField from '../common/form/CheckBoxField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOnline: false });
  const [errors, setErrors] = useState({});
  // const handleChange = (event) => {
  //   const { target } = event;
  //   setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  // };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения.' },
      isEmail: { message: 'Email введен неверно.' },
    },
    password: {
      isRequired: { message: 'Пароль введен неверно.' },
      isCapitalSymbol: { message: 'Пароль должен содержать как минимум одну заглавную букву.' },
      isContainDigit: { message: 'Пароль должен содержать как минимум одну цифру.' },
      min: { message: 'Длинна пароля должна быть не менее 8 символов.', value: 8 },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        value={data.email}
        onChange={handleChange}
        name="email"
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        value={data.password}
        onChange={handleChange}
        name="password"
        error={errors.password}
      />
      <CheckBoxField value={data.stayOnline} onChange={handleChange} name="stayOnline">
        Оставаться в сети
      </CheckBoxField>
      <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
