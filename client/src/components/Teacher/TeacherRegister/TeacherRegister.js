import React, { useState } from 'react';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';
export const TeacherRegister = (props) => {
  const { addToast } = useToasts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {

    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) setError('please fill all fields')
    else{
      axios
      .post('teacher', { name,email, password })
      .then((result) => {
        addToast('Registeration Completed', {
          appearance: 'info',
          autoDismiss: true,
        });
        props.toggleTeacherForm(0)
      })
      .catch((err) => {
        setError(err.response.data);
      });
    }
  
  };

  return (
    <div>
      <div className='teacher-register'>
        <h2 className='text-center form-title'>
          <i className='fas fa-user-tie'></i> Register
        </h2>
       <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name' 
              value={name}
              onChange={handleName}
              minLength="3"
              required
          />
        </div>

        <div className='form-group'>
          <input type='email' className='form-control' placeholder='Email' 
              value={email}
              onChange={handleEmail}
              required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='password'
            value={password}
            onChange={handlePassword}
            required
            minLength="8"
          />
        </div>
        <div className='mb-3 text-right'>
          <a
            href='#'
            className='toggleForm text-orange'
            onClick={() => props.toggleTeacherForm(0)}
          >
            sign in?
          </a>
        </div>
        <p className='text-danger'>{error && error}</p>
        <button className='btn btn-block btn-blue'> REGISTER</button>
        </form>
      </div>
    </div>
  );
};
