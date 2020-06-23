import React, { useState, useContext } from 'react';
import axios from '../../../axios';
import { useHistory } from 'react-router-dom';

export const StudentLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    axios
      .post('/students/login', {
        email,
        password,
      })
      .then((result) => {
        localStorage.setItem('studentToken', result.data.token);
        history.push('/student');
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login();
  };

  return (
    <div>
      <h2 className='text-center form-title'>
        <i className='fas fa-user-graduate'></i> Sing in
      </h2>
      <form onSubmit={handleSubmit} id='student-form'>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmail}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Enter your password'
            value={password}
            onChange={handlePassword}
            required
          />
        </div>
        <div className='mb-3 text-right'>
          <a
            href='#'
            className='toggleForm text-orange'
            onClick={() => props.toggleStudentForm()}
          >
            create account?
          </a>
        </div>
        {error && <p className='ml-3 text-danger'>error{error}</p>}
        <button className='btn btn-block btn-primary btn-blue' type='submit'>
          Sing in
        </button>
      </form>
    </div>
  );
};
