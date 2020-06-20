/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { useContext, useState, useEffect } from 'react';
import DateCountdown from 'react-date-countdown-timer';
import { ExamContext } from '../../context/examContext';
import Question from '../../components/StudentExam/Question';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';

export const Exam = (props) => {
  const context = useContext(ExamContext);
  const [answers, setAnswers] = useState();
  const [showDate, setShowDate] = useState(false);
  const history = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDate(true);
      setCanSubmit(true);
    }, 500);
    if (localStorage.getItem('answers' + context.exam.exam._id)) {
      setAnswers(
        JSON.parse(localStorage.getItem('answers' + context.exam.exam._id))
      );
    } else {
      const questionsIds = context.exam.exam.questions.map(
        (question) => question._id
      );
      const answersMap = {};
      questionsIds.forEach((id) => (answersMap[id] = null));
      localStorage.setItem(
        'answers' + context.exam.exam._id,
        JSON.stringify(answersMap)
      );
      setAnswers(answersMap);
    }
  }, []);
  const sendExam = () => {
    const answersToSubmit = [];
    let msg = 'Are you sure you want to submit the Answers?';
    let shortMsg = '';
    Object.keys(answers).forEach((key) => {
      if (!answers[key])
        shortMsg = 'There is one or more question without an answer';
      answersToSubmit.push({ _id: key, answer: answers[key] });
    });

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
                      '/students/answers',
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
                      props.getData();
                      history.push('/score');
                    })
                    .catch((err) => {
                      onClose();
                      localStorage.removeItem(
                        'answers' + context.exam.exam._id
                      );
                      console.log(err);
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
  };

  const handleNewAnswer = (id, answer) => {
    const newAnswers = { ...answers };
    newAnswers[id] = answer;
    localStorage.setItem(
      'answers' + context.exam.exam._id,
      JSON.stringify(newAnswers)
    );
    setAnswers(newAnswers);
    console.log(localStorage.getItem('answers' + context.exam.exam._id));
  };

  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3 className='text-capitalize'>
                  {context.exam.exam.name} Exam
                </h3>
                <h6>
                  Remaining Time:
                  {(showDate && (
                    <DateCountdown
                      dateTo={new Date(
                        new Date(context.exam.student.startedAt).setMinutes(
                          new Date(
                            context.exam.student.startedAt
                          ).getMinutes() + context.exam.exam.duration
                        )
                      ).toString()}
                      callback={() => {
                        if (canSubmit) sendExam();
                      }}
                    />
                  )) || <span> Hours : Minutes : Seconds</span>}
                </h6>
              </div>
              <div className='body'>
                {(answers &&
                  context.exam.exam.questions.map((question, index) => (
                    <Question
                      key={question._id}
                      question={question}
                      handleNewAnswer={handleNewAnswer}
                      answer={answers[question._id]}
                      visibleQuestion={index + 1 == currentQuestion}
                    />
                  ))) || <h1>Loading</h1>}

                <div className='pagination_rounded d-flex justify-content-around'>
                  <ul>
                    <li>
                      <a
                        href='#'
                        onClick={() => {
                          if (currentQuestion > 1) {
                            setCurrentQuestion(currentQuestion - 1);
                          }
                        }}
                        className={
                          currentQuestion == 1 ? 'disabled prev' : 'prev'
                        }
                      >
                        <i className='fa fa-angle-left' aria-hidden='true'></i>{' '}
                        Prev
                      </a>
                    </li>

                    {context.exam.exam.questions.map((question, index) => (
                      <li key={question._id}>
                        <a
                          onClick={() => {
                            setCurrentQuestion(index + 1);
                          }}
                          href='#'
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
                        href='#'
                        onClick={() => {
                          if (
                            currentQuestion < context.exam.exam.questions.length
                          ) {
                            setCurrentQuestion(currentQuestion + 1);
                          }
                        }}
                        className={
                          currentQuestion == context.exam.exam.questions.length
                            ? 'disabled next'
                            : 'next'
                        }
                      >
                        Next
                        <i className='fa fa-angle-right' aria-hidden='true'></i>
                      </a>
                    </li>
                  </ul>
                  <div>
                    <button className='btn btn-blue' onClick={sendExam}>
                      Submit Exam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
