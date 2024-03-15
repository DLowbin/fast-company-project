import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import API from '../../../API';
import TextField from '../../common/form/TextField';
import SelectField from '../../common/form/SelectField';
import MultiSelectField from '../../common/form/MultiSelectField';

const EditUserPage = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    qualities: [],
  });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { profession, qualities } = data;
    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
  };
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) return { _id: prof.value, name: prof.name };
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
  };
  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  useEffect(() => {
    setIsLoading(true);
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        name: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
      console.log(professionsList);
    });
    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id,
        qualities: transformData(qualities),
      }))
    );
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);
  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);
  // useEffect(() => {
  //   console.log(qualities);
  // }, [qualities]);
  // const handleShow = () => {
  //   console.log(users);
  // };
  // // user && console.log(user);
  // const handleReturn = () => {
  //   history.push('/users');
  // };
  // if (user) {
  //   return (
  //     <div className="card" style={{ width: 30 + 'em', margin: 40 + 'px', padding: 25 + 'px' }}>
  //       <h1 className="card-title">{user.name}</h1>
  //       <h2>{user.profession.name}</h2>
  //       <span>
  //         <Qualities qualities={user.qualities} />
  //       </span>
  //       <p>{`Completed meetings :${user.completedMeetings}`}</p>
  //       <h2>{`Rate :${user.rate}`}</h2>
  //       <button className="btn btn-primary" onClick={handleReturn}>
  //         Все пользователи
  //       </button>
  //     </div>
  //   );
  // } else {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 .offset-md-3 shadow p-5">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                value={data.name}
                onChange={handleChange}
                name="name"
                // error={errors.email}
              />
              <TextField
                label="Электронная почта"
                value={data.email}
                onChange={handleChange}
                name="email"
                // error={errors.email}
              />
              <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption="Choose"
                // error={errors.profession}
                value={data.profession}
                label="Укажите вашу профессию."
                name="profession"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Укажите ваши качества."
                defaultValue={data.qualities}
              />
              <button type="submit" disabled={false} className="btn btn-primary w-100 mx-auto">
                Обновить данные
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
