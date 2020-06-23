import React, { useContext } from 'react';
import { ExamContext } from '../../context/examContext';
import { useHistory } from 'react-router-dom';
export const Score = () => {
  const context = useContext(ExamContext);
  const history = useHistory();
  console.log("adssdsa",context.exam.exam);
  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3 className='text-capitalize'>
                  {context.exam.exam.name} Exam Score
                </h3>
              </div>
              <div className='body'>
                <div className='d-flex'>
                  <strong className='mr-4'>Student Name:</strong>
                  <p className='mr-4'>{context.exam.student.name}</p>
                </div>
                <div className='d-flex'>
                  <strong className='mr-4'>Started at:</strong>
                  <p className='mr-4'>
                    {new Date(context.exam.student.startedAt).toLocaleString()}
                  </p>
                </div>
                <div className='d-flex'>
                  <strong className='mr-4'>Score:</strong>
                  <p className='mr-4'>
                  {context.exam.student.percentage} %
                  </p>
                </div>
                  <p className='mr-4'>
                  {(context.exam.student.percentage < context.exam.exam.successPercent&& <strong className="text-danger">you have failed  this exam</strong> )|| <strong className="text-success">you have passed  this exam</strong>}
                  </p>
                <button
                  className='btn btn-blue'
                  onClick={() => {
                    localStorage.removeItem('studentToken');
                    localStorage.removeItem('answers' + context.exam.exam._id);
                           

                    history.push('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
