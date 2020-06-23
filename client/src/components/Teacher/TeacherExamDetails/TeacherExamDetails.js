import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
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
  const [successPercent, setSuccessPercent] = useState();
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    setTitle(exam.name);
    setExamName(exam.name);
    setStartDate(new Date(exam.startDate));
    setEndDate(new Date(exam.endDate));
    setRules(exam.rules);
    setDuration(exam.duration);
    setSuccessPercent(exam.successPercent)
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
  const handleSuccessPercent = (e) => {
    setSuccessPercent(e.target.value);
  };

  const handleShowAnswers = () => {
   setShowAnswers(!showAnswers);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (successPercent<0 || successPercent>100 )
      return setError('please enter a valid success percentage');
      if (duration<0)
      return setError('please enter a valid exam duration');
    if (!successPercent || !duration ||!examName || !startDate || !endDate)
      return setError('please fill all fields');

    setError('');

    axios
      .put(
        '/exams/' + exam._id,
        { startDate, endDate, rules, name: examName, duration,successPercent ,showAnswers},
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
                  title = "exam name"
                />
              </div>

              <div className='form-group'>
                <textarea
                  value={rules}
                  className='form-control'
                  placeholder='exam rules'
                  onChange={handleExamRules}
                  title="rules"
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='enter duration in minutes'
                  value={duration}
                  onChange={handleExamDuration}
                  title="duration"
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='enter success percentage'
                  value={successPercent}
                  onChange={handleSuccessPercent}
                  title="success percentage"
                />
              </div>

              <div className='form-group'>
                <label className='mr-2'>Start Date:</label>
                <DateTimePicker
                  onChange={handleStartDate}
                  value={startDate}
                />
              </div>
              <div className='form-group'>
                <label className='mr-3'>End Date:</label>
                <DateTimePicker
                  onChange={handleEndDate}
                  value={endDate}
                />
              </div>
              <div className='form-group' title="students can see the correct answers after they finish the exam">
                    <label className='mr-3'>Show Answers</label>
                  <input
                  type="checkbox"
                  checked={showAnswers}
                  onChange={handleShowAnswers}
                  ></input>
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
