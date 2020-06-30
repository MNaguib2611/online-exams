import React, { useEffect } from 'react';
import TeacherHeader from '../../components/Teacher/TeacherHeader/TeacherHeader';
import { Route, Switch, useHistory } from 'react-router-dom';
import TeacherNewExam from './TeacherNewExam/TeacherNewExam';
import TeacherHome from './TeacherHome/TeacherHome';
import { TeacherProfile } from './TeacherHome/TeacherProfile';
import TeacherEditExam from './TeacherEditExam/TeacherEditExam';
import TeacherExamStatus from './TeacherExamStatus/TeacherExamStatus';
import requireAuth from '../../hocs/requireAuth';
import SendKey from './SendKey/SendKey';
import axios from '../../axios';

const Wrapper = (props) => {
  const history = useHistory();
  const checkVerification = () => {
    axios
      .get('/teacher/me', {
        headers: {
          'x-access-token': localStorage.getItem('teacherToken'),
        },
      })
      .then(({ data }) => {
        console.log(data);
        if (!data.isVerified) {
          history.push('/verify/teacher');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkVerification();
    return () => {};
  }, []);

  return (
    <>
      <TeacherHeader />
      <Switch>
        <Route exact path='/teacher'>
          <TeacherHome />
        </Route>
        <Route exact path='/teacher/profile'>
          <TeacherProfile />
        </Route>
        <Route exact path='/teacher/exams/new'>
          <TeacherNewExam />
        </Route>
        <Route exact path='/teacher/exams/:id/edit'>
          <TeacherEditExam />
        </Route>

        <Route exact path='/teacher/exams/:id'>
          <TeacherExamStatus />
        </Route>
        <Route exact path='/teacher/exams/:id/sendKey'>
          <SendKey />
        </Route>
      </Switch>
    </>
  );
};

export default requireAuth(Wrapper);
