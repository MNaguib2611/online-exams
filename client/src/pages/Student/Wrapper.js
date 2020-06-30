import React, { useEffect } from 'react';
import requireAuth from '../../hocs/requireAuth';
import StudentHeader from '../../components/Student/StudentHeader/StudentHeader';
import StudentHome from './StudentHome/StudentHome';
import { StudentProfile } from './StudentHome/StudentProfile';
import { Switch, Route, useHistory } from 'react-router-dom';
import Enroll from './Enroll/Enroll';
import { ExamRules } from './ExamRules/ExamRules';
import { Exam } from './Exam/Exam';
import { Score } from './Score/Score';
import axios from '../../axios';

const Wrapper = () => {
  const history = useHistory();
  const checkVerification = () => {
    axios
      .get('/students/me', {
        headers: {
          'x-access-token': localStorage.getItem('studentToken'),
        },
      })
      .then(({ data }) => {
        if (!data.isVerified) {
          history.push('/verify/student');
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
      <StudentHeader />
      <Switch>
        <Route exact path='/student'>
          <StudentHome />
        </Route>
        <Route exact path='/student/profile'>
          <StudentProfile />
        </Route>
        <Route exact path='/student/enroll'>
          <Enroll />
        </Route>
        <Route exact path='/student/exams/:id/rules'>
          <ExamRules />
        </Route>
        <Route exact path='/student/exams/:id/started'>
          <Exam />
        </Route>
        <Route exact path='/student/exams/:id/score'>
          <Score />
        </Route>
      </Switch>
    </>
  );
};

export default requireAuth(Wrapper);
