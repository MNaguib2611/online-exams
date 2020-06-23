import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const StudentHeader = () => {
  const history = useHistory();
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <a className='navbar-brand'>
        <i className='fas fa-user-graduate'></i> Online Exams
      </a>
      <button
        className='navbar-toggler'
        data-target='#my-nav'
        data-toggle='collapse'
        aria-controls='my-nav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div id='my-nav' className='collapse navbar-collapse'>
        <ul className='navbar-nav ml-auto'>
          <li>
            <NavLink
              activeClassName='active'
              to='/student'
              className='nav-link d-flex flex-column justify-content-center align-items-center'
              exact
            >
              <i className='fas fa-list'></i>
              <span>Exam List</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              activeClassName='active'
              to='/student/enroll'
              className='nav-link d-flex flex-column justify-content-center align-items-center'
            >
              <i className='fas fa-pen'></i>
              <span>Enroll</span>
            </NavLink>
          </li>

          <li>
            <span
              className='nav-link d-flex flex-column justify-content-center align-items-center'
              onClick={() => {
                localStorage.removeItem('studentToken');
                history.push('/');
              }}
            >
              <i className='fas fa-sign-out-alt'></i>
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StudentHeader;
