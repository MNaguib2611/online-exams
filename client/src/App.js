import React, { useContext,useState } from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/Home/Home';
import { Exam } from './pages/Exam/Exam';
import { ExamRules } from './pages/ExamRules/ExamRules';
import { Score } from './pages/Score/Score';

import { StudentContext } from './context/studentContext';
import {ExamContext}  from './context/examContext';
import RequireEnroll from './hocs/requireEnroll'
import RequireNotEnroll from './hocs/requireNotEnroll'
function App() {
  const context = useContext(StudentContext);
  console.log(context);
  const [exam, setExam] = useState({});



  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>

        <ExamContext.Provider value={{ exam, setExam }}>

              <RequireNotEnroll exact path='/' component={Home}/>
             
              <RequireEnroll exact path='/exam' component={Exam}/>
              
              <RequireEnroll exact path='/rules' component={ExamRules}/>

              <RequireEnroll exact path='/score' component={Score}/>

        </ExamContext.Provider>         

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
