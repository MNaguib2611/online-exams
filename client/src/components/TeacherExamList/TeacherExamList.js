import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const TeacherExamList = (props) => {
  const { addToast } = useToasts();

  const handleExamDelete = (id) => {
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
                    .delete('/exams/' + id, {
                      headers: {
                        'x-access-token': localStorage.getItem('teacherToken'),
                      },
                    })
                    .then((res) => {
                      onClose();
                      props.fetchExams();
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
  const handleCopy = (key) => {
    const el = document.createElement('textarea');
    el.value = key;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    addToast('Exam Key Copied', {
      appearance: 'info',
      autoDismiss: true,
    });

    el.remove();
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
                    <h3 className='text-center'>My Exams</h3>
                  </th>
                </tr>
                <tr>
                  <th>Exam Name</th>
                  <th>Exam Key</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.exams.map((exam) => (
                  <tr key={exam._id}>
                    <td><Link exact to={`/exam/${exam._id}/${exam.name}`}>{exam.name}</Link></td>
                    <td className='exam-key'>
                      <span
                        onClick={() => {
                          handleCopy(exam.key);
                        }}
                      >
                        {exam.key}
                      </span>
                    </td>
                    <td>{new Date(exam.createdAt).toDateString()}</td>
                    <td>
                      <Link
                        to={'/teacher/' + exam._id + '/edit'}
                        className='action'
                      >
                        <i className='fas fa-pen'></i>
                      </Link>

                      <span
                        className='action'
                        onClick={() => {
                          handleExamDelete(exam._id);
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherExamList;
