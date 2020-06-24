import React, { useEffect, useState } from 'react';
import AnswersTable from '../../../components/AnswersTable/AnswersTable';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import Spinner from '../../../components/Loading/Loading';
export const Score = () => {
  const { id } = useParams();
  const [exam, setExam] = useState();
  const getExamScore = () => {
    axios
      .get('/students/exams/' + id + '/score', {
        headers: {
          'x-access-token': localStorage.getItem('studentToken'),
        },
      })
      .then((result) => {
        setExam(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getExamScore();
  }, []);
  return (
    (exam && (
      <section id='new-exam '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-2'>
              <div className='exam-card mt-5'>
                <div className='heading'>
                  <h3 className='text-capitalize'>
                    {' '}
                    {exam.examData.name} Exam Score
                  </h3>
                </div>
                <div className='body'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='d-flex'>
                        <strong className='mr-4'>Started at:</strong>
                        <p className='mr-4'>
                          {new Date(exam.examData.startedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className='d-flex'>
                        <strong className='mr-4'>Percentage:</strong>
                        <p className='mr-4'>{exam.examData.percentage} %</p>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='d-flex ml-5'>
                        <strong className='mr-4'>Score:</strong>
                        <p className='mr-4'>{exam.examData.score}</p>
                      </div>
                      <div className='d-flex ml-5'>
                        <strong className='mr-4'>Result:</strong>
                        <p className='mr-4'>
                          {(exam.examData.passed && (
                            <strong className='text-success'>Passed</strong>
                          )) || <strong className='text-danger'>Failed</strong>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-10 offset-1'>
              {exam.examData.showAnswers && (
                <AnswersTable examQuestions={exam.answers} />
              )}
            </div>
          </div>
        </div>
      </section>
    )) || <Spinner />
  );
};
