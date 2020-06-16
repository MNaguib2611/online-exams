/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export const TeacherRegister = (props) => {
  return (
    <div>
      <div className='teacher-register'>
        <h2 className='text-center form-title'>
          <i className='fas fa-user-tie'></i> Register
        </h2>

        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name' />
        </div>

        <div className='form-group'>
          <input type='email' className='form-control' placeholder='Email' />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='password'
          />
        </div>
        <div className='mb-3 text-right'>
          <a
            href='#'
            className='toggleForm text-orange'
            onClick={() => props.toggleTeacherForm()}
          >
            sign in?
          </a>
        </div>
        <button className='btn btn-block btn-blue'> REGISTER</button>
      </div>
    </div>
  );
};
