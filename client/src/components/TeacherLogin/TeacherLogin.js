/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

export const TeacherLogin = (props) => {
  return (
    <div id='teacher-form'>
      <div className='teacher-login'>
        <h2 className='text-center form-title'>
          <i className='fas fa-user-tie'></i> Sign in
        </h2>

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
            create account?
          </a>
        </div>
        <button className='btn btn-block btn-blue'> SING IN</button>
      </div>
    </div>
  );
};
