import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RequireNotEnroll = ({ component: Component, ...rest }) => {
  const enrollmentData = JSON.parse(localStorage.getItem('enrollmentData'));
  const teacherToken = localStorage.getItem('teacherToken');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!enrollmentData && !teacherToken) {
          return <Component {...rest} {...props} />;
        } else if (enrollmentData) {
          return (
            <Redirect
              to={{
                pathname: '/rules',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else if (teacherToken) {
          return (
            <Redirect
              to={{
                pathname: '/teacher',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default RequireNotEnroll;
