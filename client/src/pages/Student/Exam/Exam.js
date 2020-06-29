/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import DateCountdown from 'react-date-countdown-timer';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from '../../../axios';
import { useHistory, useParams } from 'react-router-dom';
import Question from '../../../components/Student/Question/Question';
import { useToasts } from 'react-toast-notifications';
import Loading from '../../../components/Loading/Loading';
import CalcSc from '../../../components/CalcSc/CalcSc';
import Notes from '../../../components/Notes/Notes';

var timeIsUp = false;

export const Exam = (props) => {
  const { addToast } = useToasts();

  const [helpers, setHelpers] = useState(false);

  const [answers, setAnswers] = useState();
  const [showDate, setShowDate] = useState(false);
  const history = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);

  const [exam, setExam] = useState();
  const [studentExam, setStudentExam] = useState();
  const { id } = useParams();

  const startExam = () => {
    axios
      .patch(
        '/students/startExam/' + id,
        {},
        {
          headers: {
            'x-access-token': localStorage.getItem('studentToken'),
          },
        }
      )
      .then((result) => {
        setExam(result.data.exam);
        setStudentExam(result.data.studentExam);
        setShowDate(true);
        setCanSubmit(true);
      })
      .catch((err) => {
        addToast(err.response.data.msg, {
          appearance: 'error',
          autoDismiss: true,
        });
        history.push('/student');
        console.log(err);
      });
  };
  useEffect(() => {
    setHelpers(localStorage.getItem('helpers') === 'true' || false);
    startExam();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('answers' + id)) {
      setAnswers(JSON.parse(localStorage.getItem('answers' + id)));
    } else if (exam) {
      console.log(exam);
      const questionsIds = exam.questions.map((question) => question._id);
      const answersMap = {};
      questionsIds.forEach((id) => (answersMap[id] = null));
      localStorage.setItem('answers' + id, JSON.stringify(answersMap));
      setAnswers(answersMap);
    }
  }, [exam]);
  const sendExam = () => {
    const answersToSubmit = [];
    let msg = 'Are you sure you want to submit the Answers?';
    let shortMsg = '';
    Object.keys(answers).forEach((key) => {
      if (!answers[key])
        shortMsg = 'There is one or more question without an answer';
      answersToSubmit.push({ _id: key, answer: answers[key] });
    });

    if (timeIsUp) {
      axios
        .post(
          '/students/exams/' + id + '/answers/',
          { answers: answersToSubmit },
          {
            headers: {
              'x-access-token': localStorage.getItem('studentToken'),
            },
          }
        )
        .then((res) => {
          history.push('/student/exams/' + id + '/score');

          addToast('time is up, exam was submitted automatically', {
            appearance: 'error',
            autoDismiss: true,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='exam-card'>
              <div className='heading'>
                <h5>{msg}</h5>
              </div>
              <div className='body'>
                {shortMsg && (
                  <p className='text-danger'>
                    {shortMsg}
                    <i className='fas fa-exclamation-triangle'></i>
                  </p>
                )}
                <button
                  className='btn btn-blue mr-2'
                  onClick={() => {
                    axios
                      .post(
                        '/students/exams/' + id + '/answers/',
                        { answers: answersToSubmit },
                        {
                          headers: {
                            'x-access-token': localStorage.getItem(
                              'studentToken'
                            ),
                          },
                        }
                      )
                      .then((res) => {
                        onClose();
                        history.push('/student/exams/' + id + '/score');
                      })
                      .catch((err) => {
                        console.log(err.response);
                        // onClose();
                        // localStorage.removeItem('answers' + exam._id);
                        // localStorage.removeItem('studentToken');
                        // localStorage.removeItem('answers' + exam._id);
                        // history.push('/');
                      });
                  }}
                >
                  Yes!
                </button>
                <button className='btn btn-danger' onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          );
        },
      });
    }
  };

  const handleNewAnswer = (id, answer) => {
    const newAnswers = { ...answers };
    newAnswers[id] = answer;
    localStorage.setItem('answers' + exam._id, JSON.stringify(newAnswers));
    setAnswers(newAnswers);
    console.log(localStorage.getItem('answers' + exam._id));
  };

  return (
    (exam && (
      <section id='new-exam'>
        <div className='container-fluid mt-5'>
          <div className='row'>
            {helpers && (
              <div className='col-md-4'>
                <Notes />
                <CalcSc />
              </div>
            )}

            <div className='col-md-2'>
              <button
                className='btn btn-blue'
                onClick={() => {
                  localStorage.setItem('helpers', !helpers);
                  setHelpers(!helpers);
                }}
              >
                {(helpers && 'Hide Helpers') || 'Show Helpers'}
              </button>
            </div>

            <div className={helpers ? 'col-md-6' : 'col-md-8'}>
              <div className='exam-card'>
                <div className='heading'>
                  <h3 className='text-capitalize'>{exam.name} Exam</h3>
                  <h6>
                    Remaining Time:
                    {(showDate && (
                      <DateCountdown
                        dateTo={new Date(
                          new Date(studentExam.startedAt).setSeconds(
                            new Date(studentExam.startedAt).getSeconds() +
                              exam.duration * 60 -
                              3
                          )
                        ).toString()}
                        callback={() => {
                          timeIsUp = true;
                          if (canSubmit && timeIsUp) sendExam();
                        }}
                      />
                    )) || <span> Hours : Minutes : Seconds</span>}
                  </h6>
                </div>
                <div className='body'>
                  {answers &&
                    exam.questions.map((question, index) => (
                      <Question
                        key={question._id}
                        question={question}
                        handleNewAnswer={handleNewAnswer}
                        answer={answers[question._id]}
                        visibleQuestion={index + 1 == currentQuestion}
                      />
                    ))}

                  <div className='pagination_rounded d-flex justify-content-around'>
                    <ul>
                      <li>
                        <a
                          href='#new-exam'
                          onClick={() => {
                            if (currentQuestion > 1) {
                              setCurrentQuestion(currentQuestion - 1);
                            }
                          }}
                          className={
                            currentQuestion == 1 ? 'disabled prev' : 'prev'
                          }
                        >
                          <i
                            className='fa fa-angle-left'
                            aria-hidden='true'
                          ></i>{' '}
                          Prev
                        </a>
                      </li>

                      {exam.questions.map((question, index) => (
                        <li key={question._id}>
                          <a
                            onClick={() => {
                              setCurrentQuestion(index + 1);
                            }}
                            href='#new-exam'
                            className={
                              currentQuestion == index + 1 ? 'active' : ''
                            }
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}

                      <li>
                        <a
                          href='#new-exam'
                          onClick={() => {
                            if (currentQuestion < exam.questions.length) {
                              setCurrentQuestion(currentQuestion + 1);
                            }
                          }}
                          className={
                            currentQuestion == exam.questions.length
                              ? 'disabled next'
                              : 'next'
                          }
                        >
                          Next
                          <i
                            className='fa fa-angle-right'
                            aria-hidden='true'
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-blue' onClick={sendExam}>
                      Submit Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )) || <Loading />
  );
};
