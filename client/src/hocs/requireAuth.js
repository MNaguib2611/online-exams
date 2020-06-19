import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RequireAuth = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('teacherToken')) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default RequireAuth;
