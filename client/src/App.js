import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/Home/Home';
import { Exam } from './pages/Exam/Exam';
import { ExamRules } from './pages/ExamRules/ExamRules';
import { StudentContext } from './context/studentContext';
function App() {
  const context = useContext(StudentContext);

  console.log(context);

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/exam' exact>
            <Exam />
          </Route>

          <Route path='/rules' exact>
            <ExamRules />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
