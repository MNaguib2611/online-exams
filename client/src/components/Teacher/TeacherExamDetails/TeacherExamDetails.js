import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';
import Spinner from '../../Spinner/Spinner';

const TeacherExamDetails = ({ exam }) => {
  const { addToast } = useToasts();

  const [title, setTitle] = useState('');
  const [examName, setExamName] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rules, setRules] = useState('');
  const [duration, setDuration] = useState();

  useEffect(() => {
    setTitle(exam.name);
    setExamName(exam.name);
    setStartDate(new Date(exam.startDate));
    setEndDate(new Date(exam.endDate));
    setRules(exam.rules);
    setDuration(exam.duration);
  }, []);
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

  const handleExamDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examName || !startDate || !endDate)
      return setError('please fill all fields');

    setError('');

    axios
      .put(
        '/exams/' + exam._id,
        { startDate, endDate, rules, name: examName, duration },
        {
          headers: {
            'x-access-token': localStorage.getItem('teacherToken'),
          },
        }
      )
      .then((result) => {
        setTitle(examName);
        addToast('Exam Saved Successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    (exam && (
      <div className='col-md-8 offset-2'>
        <div className='exam-card mt-5'>
          <div className='heading'>
            <h3 className='text-capitalize'> {title + ' Exam'}</h3>
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
                <input
                  type='number'
                  className='form-control'
                  placeholder='enter duration in minutes'
                  value={duration}
                  onChange={handleExamDuration}
                />
              </div>

              <div className='form-group'>
                <label className='mr-2'>Start Date:</label>
                <DatePicker selected={startDate} onChange={handleStartDate} />
              </div>
              <div className='form-group'>
                <label className='mr-3'>End Date:</label>
                <DatePicker selected={endDate} onChange={handleEndDate} />
              </div>
              {error && <p className='text-danger'>{error}</p>}
              <button className='btn  btn-primary btn-blue' type='submit'>
                Save Exam
              </button>
            </form>
          </div>
        </div>
      </div>
    )) || <Spinner/>
  );
};

export default TeacherExamDetails;
