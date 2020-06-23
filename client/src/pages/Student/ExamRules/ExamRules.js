import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../../axios';
import Spinner from '../../../components/Spinner/Spinner';
export const ExamRules = (props) => {
  const history = useHistory();
  const [exam, setExamRules] = useState({});
  const { id } = useParams();

  const getRules = () => {
    axios
      .get('/students/examRules/' + id, {
        headers: {
          'x-access-token': localStorage.getItem('studentToken'),
        },
      })
      .then((res) => {
        setExamRules(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    (exam.rules && (
      <section id='new-exam'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-2'>
              <div className='exam-card mt-5'>
                <div className='heading'>
                  <h3 className='text-capitalize'>
                    Welcome to {exam.name} Exam
                  </h3>
                </div>
                <div className='body'>
                  <div className='d-flex'>
                    <div className='d-flex'>
                      <strong className='mr-4'>Exam Duration:</strong>
                      <p className='mr-4'> {exam.duration} minutes</p>
                    </div>
                    <div className='d-flex'>
                      <strong className='mr-4'>Exam End Date:</strong>
                      <p className='mr-4'>
                        {new Date(exam.endDate).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <strong className='mr-4'>Exam Rules:</strong>
                    <p className='mr-4'>{exam.rules}</p>
                  </div>

                  <button
                    className='btn btn-blue'
                    onClick={() => {
                      history.push('/student/exams/' + id + '/started');
                    }}
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )) || <Spinner />
  );
};
