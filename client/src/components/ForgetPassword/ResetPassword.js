import React, { useState } from 'react';
import axios from '../../axios';
import { useToasts } from 'react-toast-notifications';

export const ResetPassword = (props) => {
  const [error, setError] = useState('');
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  const register = () => {
    if ( password !== confirmPassword)
    return setError('passwords don\'t match');
    axios
      .put(`${props.resetURL}`, {
        email,
        code,
        password
      })
      .then((result) => {
        addToast('Password has been reset successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
        props.toggleForm(0);
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
            placeholder='Code that was emailed to you'
            value={code}
            onChange={handleCode}
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
            minLength="8"
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
            minLength="8"
          />
        </div>

        <div className='mb-3 text-right'>
          <a
            href='#'
            className='toggleForm text-orange'
            onClick={() => props.toggleForm(0)}
          >
            sign in?
          </a>
        </div>
        {error && <p className='ml-3 text-danger'>{error}</p>}
        <button className='btn btn-block btn-primary btn-blue' type='submit'>
           Reset Password
        </button>
      </form>
    </div>
  );
};
