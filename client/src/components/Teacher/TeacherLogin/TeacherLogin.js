/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from '../../../axios';
import { useHistory } from 'react-router-dom';

import LoginWithFacebook from '../../LoginWithFacebook/LoginWithFacebook.js';
import LoginWithGoogle from '../../LoginWithGoogle/LoginWithGoogle.js';

export const TeacherLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginMethod, setLoginMethod] = useState('');
  const [facebookID, setFacebookID] = useState('');
  const [name, setName] = useState('');
  let history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    setLoginMethod("normal");
    if (!email || !password) {
      setError('please fill all fields');
    } else {
      
      axios
      .post('teacher/login', { email, password, loginMethod })
      .then((result) => {
        localStorage.setItem('teacherToken', result.data.token);
        history.push('/teacher');
      })
      .catch((err) => {
        console.log(err);
        setError('invalid credentials');
      });

    }

  };

  const methods = {
    setError,
  }

  return (
    <div id='teacher-form'>
      <div className='teacher-login'>
        <h2 className='text-center form-title'>
          <i className='fas fa-user-tie'></i> Sign in
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='password'
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className='mb-3 text-right'>
            <a
              href='#'
              className='toggleForm text-orange'
              onClick={() => props.toggleTeacherForm()}
            >
              create account?
            </a>
          </div>
          <p className='text-danger'>{error && error}</p>
          <button
            className='btn btn-block btn-blue'
            type='button'
            onClick={handleSubmit}
          >
            SING IN
          </button>
        </form>
        <hr/>
        <LoginWithFacebook methods={methods} history={history}/>
        <hr />
        <LoginWithGoogle methods={methods} history={history} />
      </div>
    </div>
  );
};
