import React, { useState, useContext } from 'react';
import axios from '../../axios';
import { ExamContext } from '../../context/examContext';
import { useHistory } from 'react-router-dom';

export const StudentEnroll = () => {
  const history = useHistory();
  const [examKey, setExamKey] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { exam, setExam } = useContext(ExamContext);

  const handleExamKey = (e) => {
    setExamKey(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const fetchExam = () => {
    axios
      .post('/students/enroll', { name, key: examKey, email })
      .then((exam) => {
        console.log("asdas",exam.data);
        setExam(exam.data.exam);

        localStorage.setItem('studentToken', exam.data.token);
        history.push('/rules');
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    fetchExam();
  };

  return (
    <div>
      <h2 className='text-center form-title'>
        <i className='fas fa-user-graduate'></i> Student
      </h2>
      <form onSubmit={handleSubmit} id='student-form'>
        <div className=' form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter exam key'
            value={examKey}
            onChange={handleExamKey}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your name'
            value={name}
            onChange={handleName}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmail}
            required
          />
        </div>
        {error && <p className='ml-3 text-danger'>{error}</p>}
        <button className='btn btn-block btn-primary btn-blue' type='submit'>
          Fetch The Exam
        </button>
      </form>
    </div>
  );
};
