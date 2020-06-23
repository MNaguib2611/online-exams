import React, { useState } from 'react';
import axios from '../../../axios';

const Enroll = () => {
  const [examKey, setExamKey] = useState('');
  const [error, setError] = useState('');

  const handleExamKey = (e) => {
    setExamKey(e.target.value);
  };

  const fetchExam = () => {
    axios
      .post('/students/enroll', { key: examKey })
      .then((exam) => {
        console.log(exam.data);
        // setExam(exam.data.exam);
        // history.push('/rules');
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    fetchExam();
  };

  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3>Enter exam key to start</h3>
              </div>
              <div className='body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='enter exam key'
                      value={examKey}
                      onChange={handleExamKey}
                    />
                  </div>

                  {error && <p className='text-danger'>{error}</p>}
                  <button className='btn  btn-primary btn-blue' type='submit'>
                    Enroll
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;
