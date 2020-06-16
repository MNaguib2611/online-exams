import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RequireNotEnroll = ({ component: Component, ...rest }) => {
  const enrollmentData = JSON.parse(localStorage.getItem('enrollmentData'));

  return (
    <Route {...rest} render={
      props => {
        if (!enrollmentData) {
          return <Component {...rest} {...props} />  
        } else {
          return <Redirect to={
                        {
                        pathname: '/rules',
                        state: {
                            from: props.location
                        }
                        }
                    } />
        }
      }
    } />
  )
}

export default RequireNotEnroll;