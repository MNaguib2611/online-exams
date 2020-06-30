import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

const ExamList = () => {
  const [examList, setExamList] = useState([]);

  const fetchExam = () => {
    axios
      .get('/students/myEnrolledExams/', {
        headers: {
          'x-access-token': localStorage.getItem('studentToken'),
        },
      })
      .then((res) => {
        console.log(res.data);
        setExamList(res.data.myExams);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchExam();
  }, []);
  return (
    <section id='exam-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 offset-1'>
            <table className='table mt-5'>
              <thead>
                <tr>
                  <th colSpan='5'>
                    <h3 className='text-center'>My Enrolled Exams</h3>
                  </th>
                </tr>
                <tr>
                  <th>Exam Name</th>
                  <th>Enrolled In</th>
                  <th>Score</th>
                  <th>Passed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examList.map((exam) => (
                  <tr key={exam._id}>
                    <td>{exam.name}</td>
                    <td>{new Date(exam.startedAt).toLocaleString()}</td>
                    <td>{exam.percentage.toFixed(1)}%</td>
                    <td>{exam.passed ? 'True' : 'False'}</td>
                    <td>
                      <Link
                        to={`student/exams/${exam.examId}/score`}
                        className='action'
                      >
                        <i className='fas fa-eye'></i>
                      </Link>
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

export default ExamList;
