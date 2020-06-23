import React from 'react';
import { Redirect } from 'react-router-dom';
export default (ChildComponent) => {
  const AuthGuard = (props) => {
    return (
      <>
        {!localStorage.getItem('studentToken') &&
          !localStorage.getItem('teacherToken') && <Redirect to='/' />}
        <ChildComponent {...props} />
      </>
    );
  };

  return AuthGuard;
};
