import React, { useState, useContext } from 'react';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';

export const StudentRegister = (props) => {
  const [error, setError] = useState('');
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSchool = (e) => {
    setSchool(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = () => {
    axios
      .post('/students/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        school,
      })
      .then((result) => {
        addToast('Account Created Successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
        props.toggleStudentForm();
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    register();
  };

  return (
    <div>
      <h2 className='text-center form-title'>
        <i className='fas fa-user-graduate'></i> Register
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
            type='text'
            className='form-control'
            placeholder='Enter your first name'
            value={firstName}
            onChange={handleFirstName}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your last name'
            value={lastName}
            onChange={handleLastName}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your school'
            value={school}
            onChange={handleSchool}
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
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Enter your password again'
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <div className='mb-3 text-right'>
          <a
            href='#'
            className='toggleForm text-orange'
            onClick={() => props.toggleStudentForm()}
          >
            sign in?
          </a>
        </div>
        {error && <p className='ml-3 text-danger'>{error}</p>}
        <button className='btn btn-block btn-primary btn-blue' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};
