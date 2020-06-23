import React from 'react';
import { Redirect } from 'react-router-dom';
export default (ChildComponent) => {
  const GuestGuard = (props) => {
    return (
      <>
        {localStorage.getItem('studentToken') && <Redirect to='/student' />}

        {localStorage.getItem('teacherToken') && <Redirect to='/teacher' />}
        <ChildComponent {...props} />
      </>
    );
  };

  return GuestGuard;
};
