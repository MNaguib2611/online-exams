/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';

export const TeacherLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) setError('please fill all fields');

    axios
      .post('teacher/login', { email, password })
      .then((result) => {
        localStorage.setItem('teacherToken', result.data.token);
        history.push('/teacher');
      })
      .catch((err) => {
        setError('invalid credentials');
      });
  };

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
          <button className='btn btn-block btn-blue' type='submit'>
            SING IN
          </button>
        </form>
      </div>
    </div>
  );
};
