import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import axios from '../../../axios';
const SendKeyForm = (props) => {
  let history = useHistory();
  const { addToast } = useToasts();
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const handleSchool = (e) => {
    setSchool(e.target.value);
  };
  const handleGrade = (e) => {
    setGrade(e.target.value);
  };

  useEffect(() => {
    console.log(props);
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!school || !grade) return setError('please fill all fields');

    setError('');

    axios
      .post(
        '/teacher/sendKey',
        { examName: props.exam.name, examKey: props.exam.key, school, grade },
        {
          headers: {
            'x-access-token': localStorage.getItem('teacherToken'),
          },
        }
      )
      .then((result) => {
        addToast('Key Sent Successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
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
                <h3 className='text-capitalize'>
                  Send {props.exam.name} Exam Key
                </h3>
              </div>
              <div className='body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='enter school'
                      value={school}
                      onChange={handleSchool}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='enter grade'
                      value={grade}
                      onChange={handleGrade}
                    />
                  </div>

                  {error && <p className='text-danger'>{error}</p>}
                  <button className='btn  btn-primary btn-blue' type='submit'>
                    Send Exam
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

export default SendKeyForm;
