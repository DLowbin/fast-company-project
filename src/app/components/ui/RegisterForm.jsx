import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import API from '../../API';
import SelectField from '../common/form/SelectField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  const handleChange = (target) => {
    // console.log(target);
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
    profession: {
      isRequired: { message: 'Необходимо выбрать профессию.' },
    },
    license: {
      isRequired: { message: 'Необходимо выбрать профессию.' },
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

      <SelectField
        onChange={handleChange}
        options={professions}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
        label="Укажите вашу профессию."
        name="professions"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Укажите ваши качества."
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}>
        Соглашаюсь с <a>Лицензионным соглашением.</a>
      </CheckBoxField>
      <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
