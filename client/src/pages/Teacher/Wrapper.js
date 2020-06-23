import React from 'react';
import TeacherHeader from '../../components/Teacher/TeacherHeader/TeacherHeader';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TeacherNewExam from './TeacherNewExam/TeacherNewExam';
import TeacherHome from './TeacherHome/TeacherHome';
import TeacherEditExam from './TeacherEditExam/TeacherEditExam';
import TeacherExamStatus from './TeacherExamStatus/TeacherExamStatus';
import requireAuth from '../../hocs/requireAuth';

const Wrapper = (props) => {
  return (
    <>
      <TeacherHeader />
      <Switch>
        <Route exact path='/teacher'>
          <TeacherHome />
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
      </Switch>
    </>
  );
};

export default requireAuth(Wrapper);
