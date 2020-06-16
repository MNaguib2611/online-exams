import React,{useContext} from 'react';
import { ExamContext } from '../../context/examContext';



export const StudentRules = (props) => {
    const {exam,}= useContext(ExamContext);
    return (
        
    <>
      {exam &&
        <ul>
        <h1>{exam.name}</h1>
        {exam.rules.map((rule)=> { return<p key={rule}> {rule}</p>} )}
        </ul>
      }
    </>
  );
};
