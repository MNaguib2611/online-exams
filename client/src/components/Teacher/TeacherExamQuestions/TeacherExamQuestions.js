import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from '../../axios';
const TeacherExamQuestions = ({ exam, handleShowForm,handleTrueORFalseForm, fetchExam }) => {
  const handleDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='exam-card'>
            <div className='heading'>
              <h5>Are you sure you want to delete this question?</h5>
            </div>
            <div className='body'>
              <button
                className='btn btn-blue mr-2'
                onClick={() => {
                  axios
                    .delete('/exams/' + exam._id + '/question/' + id, {
                      headers: {
                        'x-access-token': localStorage.getItem('teacherToken'),
                      },
                    })
                    .then((res) => {
                      onClose();
                      fetchExam();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Yes, Delete it!
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
  return (
    <section id='exam-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 offset-1'>
            <table className='table mt-5'>
              <thead>
                <tr>
                  <th colSpan='5'>
                    <h3 className='text-center'>{exam.name} Exam Questions</h3>
                  </th>
                </tr>
                <tr>
                  <th>Question</th>
                  <th>Choice (A)</th>
                  <th>Choice (B)</th>
                  <th>Choice (C)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exam.questions.map((question) => (
                  <tr key={question._id}>
                    <th>{question.questionStatement}</th>
                    {question.answers.map((answer) => (
                      <th key={answer}>{answer}</th>
                    ))}
                    {
                      question.answers.length===2 && <th key="None">-</th>
                    }

                    <th>
                      <span
                        className='action'
                        onClick={() => {
                          handleDelete(question._id);
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </span>
                    </th>
                  </tr>
                ))}

                <tr>
                  <td colSpan='5' className='text-center'>
                    <button className='btn btn-blue mr-2 mb-2' onClick={handleShowForm}>
                      Add New MCQ Question
                    </button>
                  
                    <button className='btn btn-blue mb-2' onClick={handleTrueORFalseForm}>
                      Add New  True/False Question
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherExamQuestions;
