import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../axios';
const NewExamForm = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  const [examName, setExamName] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rules, setRules] = useState('');

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleExamName = (e) => {
    setExamName(e.target.value);
  };

  const handleExamRules = (e) => {
    setRules(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examName || !startDate || !endDate)
      return setError('please fill all fields');

    setError('');

    axios
      .post(
        '/exams',
        { startDate, endDate, rules, name: examName },
        {
          headers: {
            'x-access-token': localStorage.getItem('teacherToken'),
          },
        }
      )
      .then((result) => {
        addToast('Exam Added Successfully', { appearance: 'success' });
        history.push('/teacher');
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3>Create New Exam</h3>
              </div>
              <div className='body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='enter exam name'
                      value={examName}
                      onChange={handleExamName}
                    />
                  </div>

                  <div className='form-group'>
                    <textarea
                      value={rules}
                      className='form-control'
                      placeholder='exam rules'
                      onChange={handleExamRules}
                    />
                  </div>
                  <div className='form-group'>
                    <label className='mr-2'>Start Date:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDate}
                    />
                  </div>
                  <div className='form-group'>
                    <label className='mr-3'>End Date:</label>
                    <DatePicker selected={endDate} onChange={handleEndDate} />
                  </div>
                  {error && <p className='text-danger'>{error}</p>}
                  <button className='btn  btn-primary btn-blue' type='submit'>
                    Create Exam
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

export default NewExamForm;
