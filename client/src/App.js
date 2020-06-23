import React, { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/Home/Home';
import { ExamContext } from './context/examContext';
import { TeacherContext } from './context/teacherContext';
import TeacherWrapper from './pages/Teacher/Wrapper';
import StudentWrapper from './pages/Student/Wrapper';

function App() {
  const [exam, setExam] = useState({});
  const [teacher, setTeacher] = useState({});

  return (
    <div className='App'>
      <BrowserRouter>
        <ToastProvider autoDismissTimeout={2000}>
          <ExamContext.Provider value={{ exam, setExam }}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <Route path='/student'>
                <StudentWrapper />
              </Route>

              <Route path='/teacher'>
                <TeacherContext.Provider value={{ teacher, setTeacher }}>
                  <TeacherWrapper />
                </TeacherContext.Provider>
              </Route>
            </Switch>
          </ExamContext.Provider>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
