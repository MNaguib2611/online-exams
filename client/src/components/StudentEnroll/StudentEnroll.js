import React, { useState } from 'react';
import axios from '../../axios';

export const StudentEnroll = () => {
  const [examKey, setExamKey] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleExamKey = (e) => {
    setExamKey(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const clearInputs = () => {
    setExamKey('');
    setName('');
    setEmail('');
  };

  const fetchExam = () => {
    axios
      .post('/students/enroll', { name, key: examKey, email })
      .then((exam) => {})
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your name'
            value={name}
            onChange={handleName}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmail}
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
