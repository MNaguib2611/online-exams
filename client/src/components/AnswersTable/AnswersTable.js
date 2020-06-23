import React ,{useState,useEffect} from 'react';
import axios from '../../axios';

// import axios from '../../axios';
const AnswersTable = (props) => {
    const [examModelAnsers,setExamModelAnsers]=useState({});
    
      useEffect(() => {
        const fetchExamAnswers = () => {
            axios
              .get(
                `/students/getExamCorrectAnswers/${props.examID}`,
                {},
                {
                    headers: {
                      'x-access-token': localStorage.getItem(
                        'studentToken'
                      ),
                    },
                }
              )
              .then((answers) => {
                  console.log(answers.data);
                  setExamModelAnsers(answers.data.examAnswers)
              })
              .catch((err) => {
                console.log(err);
              });
          };
        fetchExamAnswers()
      },[])
  return (
    <section id='exam-list' >
      <div className='container '>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table mt-3 mb-5'>
              <thead>
                <tr>
                  <th colSpan='5'>
                    <h3 className='text-center'>Exam Questions</h3>
                  </th>
                </tr>
                <tr>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
              {
                props.examQuestions.map((question,index)=>(
                    <tr key={index+question.questionStatement} >
                        <td key="questionStatement">{question.questionStatement}</td>
                        <td key="YourAnswer">Your Answer</td>
                        <td key="Correct Answer">{examModelAnsers[question._id]}</td>
                    </tr>
                ))
              }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnswersTable;
