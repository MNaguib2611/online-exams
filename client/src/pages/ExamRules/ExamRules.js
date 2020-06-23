import React, { useContext, useEffect } from 'react';
import { ExamContext } from '../../context/examContext';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';

export const ExamRules = (props) => {
  // const context = useContext(ExamContext);
  const { exam, setExam } = useContext(ExamContext);

  const history = useHistory();
  const startExam = () => {
    axios
      .patch(
        '/students/startExam',
        {},
        {
          headers: {
            'x-access-token': localStorage.getItem('studentToken'),
          },
        }
      )
      .then((result) => {
        setExam(result.data.exam);
        props.getData();
      }).then((result) => {
       history.push('/exam');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   console.log(context);
  // }, []);
  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3 className='text-capitalize'>
                  Welcome to {exam.exam.name} Exam
                </h3>
              </div>
              <div className='body'>
                <div className='d-flex'>
                  <div className='d-flex'>
                    <strong className='mr-4'>Exam Duration:</strong>
                    <p className='mr-4'>{exam.exam.duration} minutes</p>
                  </div>
                  <div className='d-flex'>
                    <strong className='mr-4'>Exam Passage Percentage:</strong>
                    <p className='mr-4'>{exam.exam.successPercent} %</p>
                  </div>
                  <div className='d-flex'>
                    <strong className='mr-4'>Exam End Date:</strong>
                    <p className='mr-4'>
                      {new Date(exam.exam.endDate).toDateString()}
                    </p>
                  </div>
                </div>
                <div className='d-flex'>
                  <strong className='mr-4'>Exam Rules:</strong>
                  <p className='mr-4'>{exam.exam.rules}</p>
                </div>

                <button className='btn btn-blue' onClick={startExam}>
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
