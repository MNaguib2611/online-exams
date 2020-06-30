import React, { useState, useContext } from 'react';
import axios from '../../axios';
import { useToasts } from 'react-toast-notifications';

export const ForgetPassword = (props) => {
  const [error, setError] = useState('');
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const register = () => {
    axios
      .put(`${props.forgetURL}`, {
        email,
      })
      .then((result) => {
        addToast('Reset Code was sent to your email', {
          appearance: 'info',
          autoDismiss: true,
        });
        props.toggleForm(2);
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
      <h3 className='text-center form-title mt-3 mb-3'>
        Forgot your password?
      </h3>
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
          Send Reset Code
        </button>
      </form>
    </div>
  );
};
