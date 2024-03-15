import React, { useState } from 'react';
import LoginForm from '../components/ui/LoginForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RegisterForm from '../components/ui/RegisterForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFomTtype = (params) => {
    setFormType((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 .offset-md-3 shadow p-5">
          {formType === 'register' ? (
            <>
              <h3 className="mb-3">Registration</h3>
              <RegisterForm />
              <p>
                Already have an account?{' '}
                <a role="button" onClick={toggleFomTtype}>
                  Sign in.
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-3">Login</h3>
              <LoginForm />
              <p>
                Dont have an account?{' '}
                <a role="button" onClick={toggleFomTtype}>
                  Register.
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
