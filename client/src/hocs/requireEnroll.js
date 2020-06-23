import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { ExamContext } from '../context/examContext';
import axios from '../axios';

const RequireEnroll = ({ component: Component, ...rest }) => {
  const { exam, setExam } = useContext(ExamContext);
  const history = useHistory();
  const getData = () => {
    axios
      .get('/students/examData', {
        headers: {
          'x-access-token': localStorage.getItem('studentToken'),
        },
      })
      .then((result) => {
        console.log("require Enrolled",result.data)
       const examData=result.data
        setExam(result.data);
        if (result.data.student.score !== null) {
          history.push('/score');
        }
      })
      .catch((err) => {
        localStorage.removeItem('studentToken');
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('studentToken')) {
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
          return (
            (exam && exam.exam && (
              <Component {...rest} {...props} getData={getData} />
            )) || <h1>Loading</h1>
          );
        }
      }}
    />
  );
};

export default RequireEnroll;
