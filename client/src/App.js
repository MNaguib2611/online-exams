import React, { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/Home/Home';
import { Exam } from './pages/Exam/Exam';
import { ExamRules } from './pages/ExamRules/ExamRules';
import { Score } from './pages/Score/Score';
import { ExamContext } from './context/examContext';
import RequireEnroll from './hocs/requireEnroll';
import RequireNotEnroll from './hocs/requireNotEnroll';
import RequireAuth from './hocs/requireAuth';
import TeacherHome from './pages/TeacherHome/TeacherHome';
import { TeacherContext } from './context/teacherContext';
import TeacherHeader from './components/TeacherHeader/TeacherHeader';
import TeacherNewExam from './pages/TeacherNewExam/TeacherNewExam';
import TeacherEditExam from './pages/TeacherEditExam/TeacherEditExam';
import TeacherExamStatus from "./pages/TeacherExamStatus/TeacherExamStatus.js";

function App() {
  const [exam, setExam] = useState({});
  const [teacher, setTeacher] = useState({});

  return (
    <div className='App'>
      <BrowserRouter>
        <ExamContext.Provider value={{ exam, setExam }}>
          <Switch>
            <RequireNotEnroll exact path='/' component={Home} />
            <RequireEnroll exact path='/exam' component={Exam} />
            <RequireEnroll exact path='/rules' component={ExamRules} />
            <RequireEnroll exact path='/score' component={Score} />

            <TeacherContext.Provider value={{ teacher, setTeacher }}>
              <RequireAuth component={TeacherHeader} />
              <ToastProvider autoDismissTimeout={2000}>
                <RequireAuth exact path='/teacher' component={TeacherHome} />
                <RequireAuth
                  exact
                  path='/teacher/new'
                  component={TeacherNewExam}
                />

                <RequireAuth 
                  exact 
                  path="/exam/:id/:examName" 
                  component={TeacherExamStatus}
                />

                <RequireAuth
                  exact
                  path='/teacher/:id/edit'
                  component={TeacherEditExam}
                />
              </ToastProvider>
            </TeacherContext.Provider>
          </Switch>
        </ExamContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
