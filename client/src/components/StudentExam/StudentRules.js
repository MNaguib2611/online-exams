import React,{useContext} from 'react';
import { ExamContext } from '../../context/examContext';
import {useHistory } from "react-router-dom";

export const StudentRules = (props) => {
    const history = useHistory();
    const {exam,}= useContext(ExamContext);
    const startExam = ()=>{
        history.push("/exam");
    }

    return (
    <>
      {exam &&
      <div>
        <h1>{exam.name}</h1>
        <p>you have <strong style={{color:"green"}}>{exam.durationInMins}</strong> minutes to finsih this exam</p>
        <br/><br/>
        <h3>Exam Rules</h3>
        <ul>
        {exam.rules.map((rule)=> { return<p key={rule}> {rule}</p>} )}
        </ul>
        <div className="text-center">
            <a className='btn btn-success text-light' onClick={startExam}> start exam</a>
        </div>
        </div>
      }
    </>
  );
};
