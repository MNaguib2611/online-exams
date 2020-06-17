import React,{useState,useContext,useEffect} from 'react'; 
import { ExamContext } from '../../context/examContext';
import Question from './Question';
import Pagination from './Pagination';
import {Timer} from './Timer'
import axios from '../../axios';
import {useHistory } from "react-router-dom";
const transformObjectToArr=(obj)=>{
  let arr=[];
  let answerArrObj;
  Object.keys(obj).map((key)=>{
    answerArrObj={}
    answerArrObj[key]=obj[key]
    arr=[...arr,answerArrObj]
  })
  return arr
}


export const StudentExam = (props) => {
  const history = useHistory();
  const {exam,}= useContext(ExamContext);
  const [answers,setAnswers]= useState({});
  const [currentPage, setCurrentPage] = useState(1);
 
  


  useEffect(()=>{
    console.log("answersObj",answers);
  },[answers])



  const currentQuestion = exam.questions[currentPage-1]
  const paginate = pageNumber => setCurrentPage(pageNumber);

// 
// 
// 
// 
  //use this function to send answers to the backend server
  const sendExamToBeGraded =()=> {
    const answersArr =transformObjectToArr(answers) 
    console.log(answersArr);
    
  //   axios.post("answers",{ answers :answersArr}).then((grade) => {
    // localStorage.setItem('grade',JSON.stringify(grade));
            // history.push("/grade");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  }

// 
// 
// 


  const submitAnswers=()=>{
    if(Object.keys(answers).length < exam.questions.length) alert(`you have ${exam.questions.length-Object.keys(answers).length} unsolved questions`);
    else{
      sendExamToBeGraded() 
    }
  }







  return (
    <div>
    <Timer   timeIsUp={sendExamToBeGraded} />
      <Question
        currentQuestion={currentQuestion} 
        currentPage={currentPage} 
        answers={answers}
        setAnswers={setAnswers}
        />

      <Pagination
        totalQuestions={exam.questions.length}
        currentPage={currentPage}
        paginate={paginate}
      />

    <button className='btn btn-success text-light' onClick={submitAnswers}> Submit Answers</button>
    </div>
  );
};
