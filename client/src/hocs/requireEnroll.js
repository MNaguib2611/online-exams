import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ExamContext } from '../context/examContext';
import axios from '../axios';

const RequireEnroll = ({ component: Component, ...rest }) => {
  const {exam,setExam}= useContext(ExamContext);
  const enrollmentData = JSON.parse(localStorage.getItem('enrollmentData'));
  const durationInMins = JSON.parse(localStorage.getItem('durationInMins'));
  
  return (
    <Route {...rest} render={
      props => {
        if (!localStorage.getItem('enrollmentData')) {
            return <Redirect to={
                        {
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                        }
                    } />
        } else {
            if(exam._id == null){
                const getExamDetails = async()=>{
                  await  axios
                .get(`/exams/${enrollmentData.examId}`)
                .then((exam) => {
                  durationInMins? setExam({...exam.data.exam,durationInMins}):setExam(exam)
                   
                })
                .catch((err) => {
                    console.log(err);
                });
                return <Component {...rest} {...props} />  

                }
                getExamDetails();
            }else{
                return <Component {...rest} {...props} />  
            }
        }
      }
    } />
  )
}

export default RequireEnroll;