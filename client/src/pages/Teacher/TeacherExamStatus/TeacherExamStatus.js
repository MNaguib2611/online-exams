import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading/Loading.js';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';

const TeacherExamStatus = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get(`/teacher/getExamStatus/${id}`, {
        headers: { 'x-access-token': localStorage.getItem('teacherToken') },
      })
      .then((result) => {
        console.log(result.data);
        setLoading(false);
        console.log(result);
        setExamData(result.data.exam);
        setStudents(result.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let data;

  if (loading) {
    data = <div className='container'>{<Loading />}</div>;
  } else {
    data = (
      <div className='container mt-5'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th colSpan='5'>
                <h3 className='text-center'>
                  Students Who have submitted the {examData} exam.
                </h3>
              </th>
            </tr>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Score</th>
              <th scope='col'>Email</th>
            </tr>
          </thead>
          {students.length > 0 ? (
            <tbody>
              {students.map((student) => {
                return (
                  <tr>
                    <td>{student.name}</td>
                    <td>{student.score}</td>
                    <td>{student.email}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan='5'>
                  <h3 className='text-center text-warning'>
                    No submitted Students .
                  </h3>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  }

  return data;
};

export default TeacherExamStatus;
