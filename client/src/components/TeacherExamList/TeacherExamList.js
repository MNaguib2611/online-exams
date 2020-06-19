import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';

const TeacherExamList = (props) => {
  const { addToast } = useToasts();

  const handleCopy = (key) => {
    const el = document.createElement('textarea');
    el.value = key;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    addToast('Exam Key Copied', { appearance: 'success' });

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
                    <td>{exam.name}</td>
                    <td className='exam-key'>
                      <span
                        onClick={() => {
                          handleCopy(exam.key);
                        }}
                      >
                        {exam.key}
                      </span>
                    </td>
                    <td>{exam.createdAt}</td>
                    <td>
                      <Link
                        to={'/teacher/' + exam._id + '/edit'}
                        className='action'
                      >
                        <i className='fas fa-eye'></i>
                      </Link>

                      <Link
                        to={'/teacher/' + exam._id + '/edit'}
                        className='action'
                      >
                        <i className='fas fa-pen'></i>
                      </Link>

                      <a href='#' className='action'>
                        <i className='fas fa-trash'></i>
                      </a>
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
